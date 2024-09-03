require(["esri/config", "esri/Map", "esri/views/MapView", "esri/WebMap", 
  "esri/widgets/Legend", 
  "esri/widgets/LayerList",
  "esri/geometry/Point",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
  "esri/layers/FeatureLayer",
  "esri/views/layers/LayerView",
  "esri/rest/support/Query",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol"], 
  function(esriConfig, Map, MapView, WebMap, Legend, LayerList, Point, Graphic, 
    GraphicsLayer, FeatureLayer, LayerView, Query, SimpleFillSymbol, SimpleLineSymbol) {

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
    // Task 2
    //   url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0"
    // id: 5cf54b36bedd460c8c8ecf5a9cfff737  myown feature service for wildfire
    // id: e2fecab55dc047f2a57714cfa9221477 WFS hosted from layer wildfire view
    // id: 4cc4ab73035a4805a03bdc3cdc056932   usa weather with time enabled widget

    // const map = new Map({
    // basemap: "hybrid" // basemap styles service
    // });

    //Instead of webmap we use WebMap class
    const webmap = new WebMap({
      portalItem: { // autocasts as new PortalItem()
        // id: "1793be3bf1b54796ac9c48cb7f754020"
        id: "29acc12bf6054b21a703f0ef07757dd8"
      }
    });

    const view = new MapView({
      map: webmap,
      center: [-79.46, 43.73], // Longitude, latitude
      zoom: 12, // Zoom level
      container: "viewDiv" // Div element
    });

  // Simple click on Map to show coordinates
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
        // url: 'https://services2.arcgis.com/rDdKyyk7uludsLpI/arcgis/rest/services/Hazards_Public/FeatureServer'
        // url: 'https://vicgis.maps.arcgis.com/apps/mapviewer/index.html?webmap=730c84ccdbc9496ab7aebdfe5de45c82'
        url: 'https://services6.arcgis.com/9fJwrQb0Ck2g6rbJ/arcgis/rest/services/From_files_hosted_feature_layer_view/FeatureServer'
      });

  view.when().then(() => {

    // layer.queryFeatureCount().then(function (numFeatures) {
    //   //total count to the console
    //   document.getElementById("layerResult").textContent = numFeatures;
    //   console.log(numFeatures);
    // })
      // below does not show value?
    // view.whenLayerView(layer).then(function(LayerView) {
    //   //do simething with LayerView, by ex, zoom
    //   LayerView.watch("updating", function (value){
    //     if (!value){
    //       LayerView.queryFeatureCount().then(function(numFeaturess){
    //         //total count from layerView
    //         document.getElementById("layerViewResult").textContent = numFeaturess;
    //         console.log(numFeaturess);
    //       });
    //     }
    //   });
    // });
  });
  // query Feature result using parameter from our Input 
  view.ui.add(document.getElementById("customPopup"), "top-right");
  // document.getElementById("queryBtn").addEventListener("click", queryFeatureLayer);
  
  // view.on("click", queryFeatureLayer);

  // function queryFeatureLayer(){
  //   // let featureName = document.getElementById("searchInput").value;
  //   // alert(featureName);
  //   // console.log(featureName);
  //   // //create query for the layer
  //     let query = layer.createQuery();
  //   // //define the parameters for he query
  //   // query.where = "1=1";

  //   // // works when enter site name 'Four Cast' - responds with city name
  //   // query.where = `site = '${featureName}'`;
  //   // query.outFields =["*"];
  //   // query.returnGeometry = true;
  //   // //execute the query
  //   // layer.queryFeatures(query).then((result) => {
  //   //   console.log(result);
  //   //   result.features.map((feature) => {
  //   //     let cityName = feature.attributes["city"];
  //   //     document.getElementById("queryResultInfo").textContent = `${featureName} is in ${cityName} city`
  //   //   })

  //   // works when enter sity name 'Guelf' - responds with site center name
  //   // query.where = `city = '${featureName}'`;
  //   query.where = "1=1";
  //   query.outFields =["*"];
  //   query.returnGeometry = true;
  //   //execute the query
  //   layer.queryFeatures(query).then((result) => {
  //     console.log(result);
  //     result.features.map((feature) => {
  //       let sitePercent = feature.attributes["tcc_v"];
  //       document.getElementById("queryResultInfo").textContent = `poligon canopy percentage ${sitePercent}`;

  //       // let latPoint = feature.attributes["lat"];
  //       // let longPoint = feature.attributes["long"];
  //       // let newPoint = new Point({
  //       //   longitude: `${longPoint}`,
  //       //   latitude: `${latPoint}`,
  //       // });
  //       //  //create a point graphic
  //       //  const pointGraphic = new Graphic({
  //       //   geometry: newPoint,
  //       //  }) 
  //       //  let newGraphicLayer = new GraphicsLayer({});
  //       //  view.graphics.add(pointGraphic);
  //       //  view.map.add(newGraphicLayer);


  //     });
  //   });
  // }






});