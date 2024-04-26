document.getElementById('signin-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === '1' && password === 'abc') {
        var newTab = window.open();
        newTab.document.open();
        newTab.document.write(`<!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <title>Driver's Location</title>
                <script src="https://api.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.js"></script>
                <link href="https://api.mapbox.com/mapbox-gl-js/v2.4.1/mapbox-gl.css" rel="stylesheet">
                <style>
                    body { margin: 0; padding: 0; }
                    #map { position: absolute; top: 0; bottom: 0; width: 100%; }
                </style>
            </head>
            <body>
            <div id="map"></div>

            <script>
            mapboxgl.accessToken = 'YOUR API KEY';

// Create the map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-74.5, 40],
  zoom: 9
});

// Add navigation control to the map
map.addControl(new mapboxgl.NavigationControl());

// Declare variables to store previous location, path layer IDs, and colors
var previousLocation = null;
var previousPathLayerId = null;
var pathColors = ['blue', 'green', 'purple', 'teal', 'yellow', 'orange'];

// Function to create a new path layer with a unique color
function createNewPathLayer() {
  var colorIndex = Math.floor(Math.random() * pathColors.length);
  var color = pathColors[colorIndex];
  var pathLayerId = 'path-' + Date.now();
  
  map.addLayer({
    id: pathLayerId,
    type: 'line',
    source: {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: []
        }
      }
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': color,
      'line-width': 2
    }
  });

  return pathLayerId;
}

// Function to update the user's location and path
function updateUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var userLocation = [position.coords.longitude, position.coords.latitude];

      // Create a marker at the user's location
      var marker = new mapboxgl.Marker()
        .setLngLat(userLocation)
        .addTo(map);

      // Set the map center to the user's location
      map.setCenter(userLocation);

      // Create a new path layer with a unique color
      var newPathLayerId = createNewPathLayer();

      // Update previous path with new location coordinates and recolor it to red
      if (previousLocation && previousPathLayerId) {
        map.getSource(previousPathLayerId).setData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [previousLocation, userLocation]
          }
        });
        map.setPaintProperty(previousPathLayerId, 'line-color', 'red');
      }

      // Add the new location coordinates to the new path layer
      if (newPathLayerId) {
        map.getSource(newPathLayerId).setData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [previousLocation, userLocation]
          }
        });
      }

      // Update previous location and path layer ID with the current location
      previousLocation = userLocation;
      previousPathLayerId = newPathLayerId;
      

    });
  } else {
    alert('Geolocation is not supported by your browser');
  }
}

// Update the user's location initially
updateUserLocation();

// Periodically update the user's location
setInterval(updateUserLocation, 6000);


            
            </script>
            </body>
            </html>`);
        newTab.document.close();
    } else {
        alert('Invalid username or password');
    }
});
