require(["esri/config", "esri/Map", "esri/views/MapView"], function(esriConfig, Map, MapView) {

    // esriConfig.apiKey = "YOUR_ACCESS_TOKEN";
    // const map = new Map({
    //   basemap: "arcgis/topographic" // basemap styles service
    // });

   // basemap 'hybrid' can be used  without apiKey
    const map = new Map({
    basemap: "hybrid" // basemap styles service
    });

    const view = new MapView({
      map: map,
      center: [-79.43, 43.72], // Longitude, latitude
      zoom: 5, // Zoom level
      container: "viewDiv" // Div element
    });
});