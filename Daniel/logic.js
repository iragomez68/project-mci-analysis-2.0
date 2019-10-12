// Store our API endpoint inside queryUrl
// Store our API endpoint inside queryUrl
var link = "City_Wards_Data.geojson";

// Perform a GET request to the query URL
d3.json(link, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
   layer.bindPopup("<h3>" + feature.properties.AREA_NAME  + "ID"+ feature.properties.AREA_ID +
      "</h3><hr><p>" + new Date(feature.properties.DATE_EFFECTIVE) + "</p>");
  }
 // Called on each feature
   function onEachFeature(feature, layer) {
    // Set mouse events to change map styling
    layer.on({
      // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
      mouseover: function (event) {
        layer = event.target;
        layer.setStyle({
          fillOpacity: 0.9
        });
      },
      // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
      mouseout: function (event) {
        layer = event.target;
        layer.setStyle({
          fillOpacity: 0.5
        });
      },
      // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
   /*    click: function (event) {
        map.fitBounds(event.target.getBounds());
      } */
    });

    // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
  for (var i = 0; i < link.length; i++) {
    var info = link[i];
    L.marker(link.feature)
    .bindPopup("<h1>" + link.feature + "</h1> <hr> <h3>AREA_NAME " + link.properties + "</h3>")
  // .addTo(myMap);
}


    // Giving each feature a pop-up with information pertinent to it
   // layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");

//   }
// Define a function we want to run once for each feature in the features array
// Give each feature a popup describing the place and time of the earthquake
  //function onEachFeature(feature, layer) 
 // {
   layer.bindPopup("<h3>" + feature.properties.AREA_NAME  + "ID"+ feature.properties.AREA_ID +
    "</h3><hr><p>" + new Date(feature.properties.DATE_EFFECTIVE) + "</p>");
}
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
 
/*       // Satellite layer
  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" , {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
   }); */

   let satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?" +
   "access_token=pk.eyJ1IjoiZGF2aXNjYXJkd2VsbCIsImEiOiJjamViam4yMHEwZHJ4MnJvN3kweGhkeXViIn0." +
   "A3IKm_S6COZzvBMTqLvukQ");

   let outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
   "access_token=pk.eyJ1IjoiZGF2aXNjYXJkd2VsbCIsImEiOiJjamViam4yMHEwZHJ4MnJvN3kweGhkeXViIn0." +
   "A3IKm_S6COZzvBMTqLvukQ");


  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
    "Satellite": satellite,
    "Outdoors": outdoors
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    MCI: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      43.6998, -79.2873
    ],
    zoom: 11,
    layers: [streetmap, earthquakes]
  });

    // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
    for (var i = 0; i < link.length; i++) {
        var info = link[i];
        L.marker(link.feature)
        .bindPopup("<h1>" + link.feature + "</h1> <hr> <h3>AREA_NAME " + link.properties + "</h3>")
  
    }      // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
