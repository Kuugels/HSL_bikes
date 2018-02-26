var map;
var from = {address:String, marker:null, location:null};
var to = {address:String, marker:null, location:null};
var directionsService;
var directionsDisplay;

// Initialize map and center it to helsinki
function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  console.log("Initialize map");
  var helsinki = { lat: 60.1699, lng: 24.9384 };
  map = new google.maps.Map($('#map')[0], {
    zoom: 10,
    center: helsinki
  });
  directionsDisplay.setMap(map);
}

function findNearestBikeStop() {
  var bikes = getBikedata();
}

function calculateRoute() {
  from.marker.setMap(null);
  to.marker.setMap(null);
  if (from.location != null && to.location != null) {
     console.log("Calculating route...");
     var request = {
       origin: from.location,
       destination: to.location,
       travelMode: 'WALKING'
     };
     directionsService.route(request, function(result, status) {
       if (status == 'OK') {
         directionsDisplay.setDirections(result);
       }
     });
  }
}

// Wait 1.5 seconds before searching and placing marker
function findStartLocation() {
  setTimeout(function(){
    from.address = $('#from').val();
    placeMarker(from);
  }, 1500);
}

function findEndLocation() {
  setTimeout(function() {
    to.address = $('#to').val();
    placeMarker(to);
  }, 1500);
}

function placeMarker(pos) {
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({'address': pos.address}, function(results, status) {
  if (status === 'OK') {
    if (pos.marker && pos.marker.setMap) {
      pos.marker.setMap(null);
    }
    map.setCenter(results[0].geometry.location);
    pos.location = results[0].geometry.location;
    pos.marker = new google.maps.Marker({
      map: map,
      position: results[0].geometry.location,
    });
    map.setZoom(14);
  } else {
    console.log('Geocode was not successful for the following reason: ' + status);
  }
  });
}
