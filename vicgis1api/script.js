require(["esri/config", "esri/Map", "esri/views/MapView", "esri/WebMap"],
   function(esriConfig, Map, MapView, WebMap) {

    esriConfig.apiKeyAA = "..PTxy8BH1VEsoebNVZXo8HurA00kGrEUM88Me3K5X12dKEX4TMcmo0W5Wax2c5rnRwj-D4jZce2c7SyOloOm4jt6233p_p2PIiu95_P_u0z4qgefMAUj5pxwcOumkpAUl1GWo797V1TSq6liHwqLGbBz7NJhkfayFFu_lWOAgnerk9kzxdhqv8g9xUpRCAl8Gu1ZHRzkO6ZNKnoZORzJDIwN-Pg3_Cwh7ZIYEpsKzAoQSyz0ll4WcJBscktusFy0dPPAT1_IjObyirT";
    // const map = new Map({
    //   basemap: "arcgis/topographic" // basemap styles service
    // });

    // csv data from https://health-infobase.canada.ca/supervised-consumption-sites/#a4
    //layer id: 00b16a15fb8d40e5871641ac73c6da19  for csv layer imported in arcgis
    // web map id: 4d60688e31844dcdbc81bd6487f293ec  drug sites use
    // webmap id: cf35269c59cd45cc9bfae3480c0a64d7 webmap of transcanadian trails
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
});