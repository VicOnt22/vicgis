require(["esri/config", "esri/Map", "esri/views/MapView"], function(esriConfig, Map, MapView) {

    // esriConfig.apiKeyAA = "..PTxy8BH1VEsoebNVZXo8HurA00kGrEUM88Me3K5X12dKEX4TMcmo0W5Wax2c5rnRwj-D4jZce2c7SyOloOm4jt6233p_p2PIiu95_P_u0z4qgefMAUj5pxwcOumkpAUl1GWo797V1TSq6liHwqLGbBz7NJhkfayFFu_lWOAgnerk9kzxdhqv8g9xUpRCAl8Gu1ZHRzkO6ZNKnoZORzJDIwN-Pg3_Cwh7ZIYEpsKzAoQSyz0ll4WcJBscktusFy0dPPAT1_IjObyirT";
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