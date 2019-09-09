// Store our API endpoint inside queryUrl
var defaultURL = "http://127.0.0.1:5000/api_earthquake";

// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 4
});

// Add a tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

changeMapFunction = function( {label,value,map} ) {
  map.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
  });
  
d3.json(defaultURL).then(function(data) {

    var dataLabels = {
      '1965 to 1975': function(year) {
        return year  >= 1965 && year < 1975
      },
      '1975 to 1985': function(year) {
        return year >= 1975 && year < 1985
      },
      '1985 to 1995': function(year) {
        return year >= 1985 && year < 1995
      },
      '1995 to 2005': function(year) {
        return year >= 1995 && year < 2005
      },
      '2005 to 2015': function(year) {
        return year >= 2005 && year < 2015
      },
      '2015 to Present': function(year) {
        return year >= 2015
      },
    }

    var filteredData =  
      data.filter(earthquake => dataLabels[label](earthquake.Year))
        .map(earthquake => { return {
          location: [earthquake.Latitude, earthquake.Longitude],
          year: earthquake.Year,
          magnitude: earthquake.Magnitude,
          date: earthquake.Date}});
        console.log(filteredData)

      var markerArray = [];
      L.geoJson(filteredData, {
          onEachFeature: function onEachFeature(layer) {
            content = ("<h2> Date:  " + earthquake.Date + "</h2> <hr> <h3>Magnitude: " + earthquake.Magnitude + "</h3>")
            var popup = L.popup().setContent(content);
            layer.bindPopup(popup);
            markerArray.push(layer);
          }
      }).addTo(myMap);

  // L.marker(earthquake.location)
  //   .bindPopup("<h1> Year" + earthquake.year + "</h1> <hr> <h3>Magnitude " + earthquake.magnitude + "</h3>")
  //   .addTo(myMap);

    // filteredData.forEach((earthquake) => {
    //   L.marker(earthquake.location).addTo(myMap);
    // })
      // var markerGroup = L.featureGroup(markerArray);
      //           map.fitBounds(markerGroup.getBounds()).setZoom(12);
})
}
L.control.timelineSlider({
   timelineItems: ["1965 to 1975", "1975 to 1985", "1985 to 1995", "1995 to 2005", "2005 to 2015", "2015 to Present"], 
   changeMap: changeMapFunction })
 .addTo(myMap); 
