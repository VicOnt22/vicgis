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

    //Instead of webmap we use WebMap class
    const webmap = new WebMap({
      portalItem: { // autocasts as new PortalItem()
        id: "69789526816646c2b51da5f8d1310fa0"
      }
    });

    const view = new MapView({
      map: webmap,
      center: [-79.43, 43.72], // Longitude, latitude
      zoom: 5, // Zoom level
      container: "viewDiv" // Div element
    });

      const layer = new FeatureLayer({
       url: 'https://services6.arcgis.com/9fJwrQb0Ck2g6rbJ/arcgis/rest/services/greenness_table_web/FeatureServer'
      });

webmap.add(layer);
// view.add(layer);

 view.when().then(() => {
  
        let featureTable = new FeatureTable({
        view: view,
        layer: layer,   
        container: "tableDiv"
        });

      });


      view.ui.add(document.getElementById("queryFeatures"), "top-left");
      view.ui.add(document.getElementById("customPopup"), "top-right");
      document.getElementById("queryBtn").addEventListener("click", queryFeatureLayer);

      function queryFeatureLayer(){

        let featureName = document.getElementById("searchInput").value;
        
        let query = layer.createQuery();
        //define the parameters for the query
        query.where = "1=1";
        query.outFields =["*"];
        // query.outFields = [`'${featureName}'`]
        // query.outFields =[featureName];

        query.returnGeometry = true;
        //execute the query
        let arr = [];
        let finalArr =[];
        let secondColArr=[];

        layer.queryFeatures(query).then((result) => {
          // console.log(result.fields);
          // console.log(featureName);
          
          result.features.flatMap((feature) => {
            let columnSelected = feature.attributes[featureName];
          
                arr.push(columnSelected);
                if (columnSelected !== -9999){
                  finalArr.push(columnSelected);
                }
                
                if (arr.length == 2000){
                  
                 let minValueb = Math.min(...finalArr);
                 let maxValueb = Math.max(...finalArr);
                 console.log("min = ", minValueb, "; max = ",maxValueb);
                 console.log("number of missing data = ", (arr.length - finalArr.length));
                 function getAverage(finalArr){
                  let sum = 0;
                  for (let i=0; i< finalArr.length; i++) {sum += finalArr[i];}
                  return sum / finalArr.length;
                 };
                 console.log ("Average = ", getAverage(finalArr));

                 document.getElementById("missData").textContent = `${(arr.length - finalArr.length)}`;
                 document.getElementById("minColumn").textContent = `${minValueb}`;
                 document.getElementById("maxColumn").textContent = `${maxValueb}`;
                 document.getElementById("averageColumn").textContent = `${getAverage(finalArr)}`;
                 document.getElementById("nameColumn").textContent = `"${featureName}"`;

                 // select records from second column that are equal or greater than average of 
                 // a selected column

                 // first find second column only - in the selection it will stay second as in ini



            
              };
              let columnsecondSelected = feature.attributes['green2'];
              if (columnSelected !== -9999){
               secondColArr.push(columnSelected);
             }
             if (arr.length == 2000){
              // console.log("secondcol: ", secondColArr);
             
             let resultSelection = secondColArr.filter(checkGreater);

             function getSAverage(finalArr){
              let sum = 0;
              for (let i=0; i< finalArr.length; i++) {sum += finalArr[i];}
              return sum / finalArr.length;
             };

             function checkGreater(secondColArr){
              return secondColArr >= getSAverage(finalArr);
             }
             let greatAverage = getSAverage(resultSelection);
             console.log("secondAverage: ", greatAverage);
             document.getElementById("averageSecColumn").textContent = `${greatAverage}`;

            };
          });
          
          
        });
        

      }

  
});