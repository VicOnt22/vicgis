require(["esri/config", "esri/Map", "esri/views/MapView", "esri/WebMap", 
  "esri/widgets/Legend", 
  "esri/widgets/LayerList",
  "esri/geometry/Point",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/layers/FeatureLayer",
  "esri/views/layers/LayerView",
  "esri/rest/support/Query",
  "esri/widgets/FeatureTable"], 
  function(esriConfig, Map, MapView, WebMap, Legend, LayerList, Point, Graphic, 
    GraphicsLayer, FeatureLayer, LayerView, Query, FeatureTable) {

    // esriConfig.apiKeyAA = "..PTxy8BH1VEsoebNVZXo8HurA00kGrEUM88Me3K5X12dKEX4TMcmo0W5Wax2c5rnRwj-D4jZce2c7SyOloOm4jt6233p_p2PIiu95_P_u0z4qgefMAUj5pxwcOumkpAUl1GWo797V1TSq6liHwqLGbBz7NJhkfayFFu_lWOAgnerk9kzxdhqv8g9xUpRCAl8Gu1ZHRzkO6ZNKnoZORzJDIwN-Pg3_Cwh7ZIYEpsKzAoQSyz0ll4WcJBscktusFy0dPPAT1_IjObyirT";
    // const map = new Map({
    //   basemap: "arcgis/topographic" // basemap styles service
    // });

    // csv data from https://health-infobase.canada.ca/supervised-consumption-sites/#a4
    //layer id: 00b16a15fb8d40e5871641ac73c6da19  for csv layer imported in arcgis
    // webmap id: 4d60688e31844dcdbc81bd6487f293ec  drug sites use require Vic login as share is not public
    // webmap id: cf35269c59cd45cc9bfae3480c0a64d7 webmap of transcanadian trails from Content/LivingAtlas so is public
    // webmap id: 3b484bf1b7cf4e33beaca992bdfc3c2f  topographic map public also from LivingAtlas
  // basemap 'hybrid' can be used  without apiKey

    // const map = new Map({
    // basemap: "hybrid" // basemap styles service
    // });

    //Instead of webmap we use WebMap class
    const webmap = new WebMap({
      portalItem: { // autocasts as new PortalItem()
        id: "cf35269c59cd45cc9bfae3480c0a64d7"
      }
    });

    const view = new MapView({
      map: webmap,
      center: [-79.43, 43.72], // Longitude, latitude
      zoom: 5, // Zoom level
      container: "viewDiv" // Div element
    });

  
  // view.on("click", function(event){
  //   view.popup = null; //supress existing popup info
  //   let latitude =event.mapPoint.latitude;
  //   let longitude =event.mapPoint.longitude;
  //   // console.log(event);
  //   // console.log(latitude, longitude);
  //   document.getElementById("yCoordinate").textContent = latitude;
  //   document.getElementById("xCoordinate").textContent = longitude
  // });
  //     //create and add Legend vidget to the view
  //     const legendWidget = new Legend({
  //       view: view
  //     })
  //     view.ui.add(legendWidget, "bottom-left");

  //     // add LayerList widget
  //     let layerList = new LayerList({
  //       view: view
  //     })
  //     view.ui.add(layerList, "top-left"); //already shows up ok, no change to html
   
  //     // now we extract layer name from webmap layers property to use in html dropdown
  //     view.when().then(() => {
  //       webmap.layers.map((Layer)=>{
  //         console.log(Layer.title);
  //         let option = document.createElement("option");
  //         option.textContent = Layer.title;
  //         let select = document.getElementById("layerName")
  //         select.appendChild(option);
  //       })
  //       let lyrList = document.getElementById("lyrList");
  //       view.ui.add(lyrList, "bottom-right");
  //     })

  //     // graphics layer Point feature
  //     let newPointFeature = new Point({
  //       longitude: -78.2,
  //       latitude: 44.83,
  //     })
  //     const pointGraphic = new Graphic({
  //       geometry: newPointFeature,       // continue creating simple point graphic
  //     })
  //     let newGraphicsLayer = new GraphicsLayer({}); // create GraphicsLayer to which we add our point graphic
  //     newGraphicsLayer.graphics.add(pointGraphic);
  //     view.map.add(newGraphicsLayer); //add layer to the map- we see black dot!

     // add LayerList widget
      // let layerList = new LayerList({
      //   view: view
      // })
      // view.ui.add(layerList, "top-left"); //already shows up ok, no change to html

      const layer = new FeatureLayer({
        // url: 'https://services6.arcgis.com/9fJwrQb0Ck2g6rbJ/arcgis/rest/services/Scs_Map_layer_from_csv/FeatureServer'
        url: 'https://services2.arcgis.com/rDdKyyk7uludsLpI/arcgis/rest/services/Hazards_Public/FeatureServer'
      });

view.when().then(() => {

  layer.queryFeatureCount().then(function (numFeatures) {
    //total count to the console
    document.getElementById("layerResult").textContent = numFeatures;
    console.log(numFeatures);
  })
    // below does not show value?
  view.whenLayerView(layer).then(function(LayerView) {
    //do simething with LayerView, by ex, zoom
    LayerView.watch("updating", function (value){
      if (!value){
        LayerView.queryFeatureCount().then(function(numFeaturess){
          //total count from layerView
          document.getElementById("layerViewResult").textContent = numFeaturess;
          console.log(numFeaturess);
        });
      }
    });
  });
});
// // qyery Feature result using parameter from our Input 
// view.ui.add(document.getElementById("queryFeatures"), "top-left");
// document.getElementById("queryBtn").addEventListener("click", queryFeatureLayer);

// function queryFeatureLayer(){
  // let featureName = document.getElementById("searchInput").value;
  // alert(featureName);
  // console.log(featureName);
  // //create query for the layer
  // let query = layer.createQuery();
  // //define the parameters for he query
  // query.where = "1=1";

  // // works when enter site name 'Four Cast' - responds with city name
  // query.where = `site = '${featureName}'`;
  // query.outFields =["*"];
  // query.returnGeometry = true;
  // //execute the query
  // layer.queryFeatures(query).then((result) => {
  //   console.log(result);
  //   result.features.map((feature) => {
  //     let cityName = feature.attributes["city"];
  //     document.getElementById("queryResultInfo").textContent = `${featureName} is in ${cityName} city`
  //   })

  // // works when enter sity name 'Guelf' - responds with site center name
  // query.where = `city = '${featureName}'`;
  // query.outFields =["*"];
  // query.returnGeometry = true;
  // //execute the query
  // layer.queryFeatures(query).then((result) => {
  //   console.log(result);
  //   result.features.map((feature) => {
  //     let siteName = feature.attributes["site"];
  //     document.getElementById("queryResultInfo").textContent = `${featureName} has site named ${siteName}`
  //   });
  // });
    
// now we add working dropdown with actions after select from the list of layer names

//     // add LayerList widget
      // let layerList = new LayerList({
      //   view: view
      // })
      // view.ui.add(layerList, "top-left"); //already shows up ok, no change to html
   
  //     // now we extract layer name from webmap layers property to use in html dropdown
  let lyrList = document.getElementById("lyrList");
  view.ui.add(lyrList, "top-left");

      view.when().then(() => {
        webmap.layers.map((Layer)=>{
          // console.log(Layer.title);
          let option = document.createElement("option");
          option.textContent = Layer.title;
          let select = document.getElementById("layerName")
          select.appendChild(option);
        });
      });

      document.getElementById("layerName").addEventListener("change", getLayerName);
      function getLayerName (event){
        console.log(event.target.value);
        let lyrName = event.target.value;
        document.getElementById("tableDiv").innerHTML = null;  //clear previous selection
        // find a layer by its title
        const foundLayer = webmap.allLayers.find(function (layer){
          return layer.title === lyrName;
        });

      let featureTable = new FeatureTable({
       view: view,
       layer: foundLayer,   //layer from line 97 "hazards public Salesforce table"
       container: "tableDiv"
       });


      }
  






});