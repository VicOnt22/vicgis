require(["esri/config", "esri/Map", "esri/views/MapView", "esri/WebMap", 
  "esri/widgets/Legend", 
  "esri/widgets/LayerList"], 
   function(esriConfig, Map, MapView, WebMap, Legend, LayerList) {

    // esriConfig.apiKeyAA = "..PTxy8BH1VEsoebNVZXo8HurA00kGrEUM88Me3K5X12dKEX4TMcmo0W5Wax2c5rnRwj-D4jZce2c7SyOloOm4jt6233p_p2PIiu95_P_u0z4qgefMAUj5pxwcOumkpAUl1GWo797V1TSq6liHwqLGbBz7NJhkfayFFu_lWOAgnerk9kzxdhqv8g9xUpRCAl8Gu1ZHRzkO6ZNKnoZORzJDIwN-Pg3_Cwh7ZIYEpsKzAoQSyz0ll4WcJBscktusFy0dPPAT1_IjObyirT";
    // const map = new Map({
    //   basemap: "arcgis/topographic" // basemap styles service
    // });

    // csv data from https://health-infobase.canada.ca/supervised-consumption-sites/#a4
    //layer id: 00b16a15fb8d40e5871641ac73c6da19  for csv layer imported in arcgis
    // webmap id: 4d60688e31844dcdbc81bd6487f293ec  drug sites use require Vic login as share is not public
    // webmap id: cf35269c59cd45cc9bfae3480c0a64d7 webmap of transcanadian trails from Content/LivingAtlas so is public
    // webmap id: 3b484bf1b7cf4e33beaca992bdfc3c2f  topographic map public also from LivingAtlas
    // webmap id: 230bcf5780b34f409686a0ca2c084804   wildfires Canada from Living Atlas
    // id: 0fa855d41cfd488c830b0a4942f710a8  same wildfire as public atals
    // same wildfire as service
    // https://services.arcgis.com/wjcPoefzjpzCgffS/arcgis/rest/services/Active_Wildfire_Perimeters_in_Canada_View/FeatureServer
  // basemap 'hybrid' can be used  without apiKey

    // const map = new Map({
    // basemap: "hybrid" // basemap styles service
    // });

    //Instead of webmap we use WebMap class
    const webmap = new WebMap({
      portalItem: { // autocasts as new PortalItem()
        id: "0fa855d41cfd488c830b0a4942f710a8"
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
      //create and add Legend vidget to the view
      const legendWidget = new Legend({
        view: view
      })
      view.ui.add(legendWidget, "bottom-left");

      // add LayerList widget
      // let layerList = new LayerList({
      //   view: view
      // })
      // view.ui.add(layerList, "top-left"); //already shows up ok, no change to html
   
      // now we extract layer name from webmap layers property to use in html dropdown
      // view.when().then(() => {
      //   webmap.layers.map((Layer)=>{
      //     console.log(Layer.title);
      //     let option = document.createElement("option");
      //     option.textContent = Layer.title;
      //     let select = document.getElementById("layerName")
      //     select.appendChild(option);
      //   })
      //   let lyrList = document.getElementById("lyrList");
      //   view.ui.add(lyrList, "bottom-right");

      // })



});