// Store our API endpoint inside queryUrl
var defaultURL = "http://127.0.0.1:5000/api_earthquake";
d3.json(defaultURL).then(function(data) {
  //console.log(data)
  // Once we get a response, send the data object to the createFeatures function
  createFeatures(data);
});


// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


var long = data.Longitude
var lat = data.Latitude
var magnitude = data.magnitude
var year = data.year

var earthquakes = [{
  location: [lat, long],
  year: year,
  magnitude: magnitude,
},
];

// Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
for (var i = 0; i < data.length; i++) {
  var earthquake = data[i];
  L.marker(earthquake.location)
    .bindPopup("<h1> Year" + earthquake.year + "</h1> <hr> <h3>Magnitude " + earthquake.magnitude + "</h3>")
    .addTo(myMap);
}
