// Creating map object
var map = L.map("map", {
  center: [43.6998, -79.2873],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);


// Store our API endpoint inside queryUrl
var link = "City_Wards_Data.geojson";

// Grabbing our GeoJSON data..
d3.json(link, function (data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function (feature) {
      return {
        color: "blue",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
      /*   fillColor: chooseColor(feature.properties.borough),
        fillOpacity: 0.5,
        weight: 1.5 */
      };
    },
    // Called on each feature
    onEachFeature: function (feature, layer) {
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
        click: function (event) {
          map.fitBounds(event.target.getBounds());
        }
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
  
  }).addTo(map);
});


// for later
// Loop through the cities array and create one marker for each city object
/* for (var i = 0; i < countries.length; i++) {

  // Conditionals for countries points
  var color = "";
  if (countries[i].points > 200) {
    color = "yellow";
  }
  else if (countries[i].points > 100) {
    color = "blue";
  }
  else if (countries[i].points > 90) {
    color = "green";
  }
  else {
    color = "red";
  }

  // Add circles to map
  L.circle(countries[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: color,
    // Adjust radius
    radius: countries[i].points * 1500
  }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
}
 */




