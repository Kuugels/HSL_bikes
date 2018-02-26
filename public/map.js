var map, marker, markers = [];
var from = {address:String, marker:null, location:null};
var to = {address:String, marker:null, location:null};
var directionsService;
var directionsDisplay;
var start = 20000, destination = 20000;

// Initialize map and center it to helsinki
function initMap() {
  $('#warn1').hide();
  $('#warn2').hide();
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  console.log("Initialize map");
  var helsinki = { lat: 60.1699, lng: 24.9384 };
  map = new google.maps.Map($('#map')[0], {
    zoom: 12,
    center: helsinki
  });

  marker = new google.maps.Marker();
  directionsDisplay.setMap(map);
  markersToBikeStops();
}

// Set marker to every bikestop
function markersToBikeStops() {
  var bikes = getBikedata();
  setTimeout(function() {
    $.each(bikes, function(index, bikestop) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(bikestop.latitude, bikestop.longitude),
        map: map,
        animation: google.maps.Animation.DROP
      });
      marker.setMap(map);
      markers.push(marker);
    });
  }, 1500);
}

// Finds nearest bike stop for start and end locations
function findNearestBikeStops() {
  var latlng1 = new google.maps.LatLng(from.location), latlng2, dist;
  var closestFromStart, closestFromDestination;

  $.each(markers, function(index, mark) {
    latlng2 = new google.maps.LatLng(mark.getPosition().lat(), mark.getPosition().lng());
    dist = google.maps.geometry.spherical.computeDistanceBetween(latlng1, latlng2);
    if (start > dist) {
      start = dist;
      closestFromStart = mark;
    }
  });

  latlng1 = new google.maps.LatLng(to.location);
  $.each(markers, function(index, mark) {
    latlng2 = new google.maps.LatLng(mark.getPosition().lat(), mark.getPosition().lng());
    dist = google.maps.geometry.spherical.computeDistanceBetween(latlng1, latlng2);
    if (destination > dist) {
      destination = dist;
      closestFromDestination = mark;
    }
  });
  console.log(start + " " + destination);
  return [{location:new google.maps.LatLng(closestFromStart.getPosition().lat(), closestFromStart.getPosition().lng())},
    {location:new google.maps.LatLng(closestFromDestination.getPosition().lat(), closestFromDestination.getPosition().lng())}];
}

// Calculates route
function calculateRoute(bikestop1, bikestop2) {
  var waypoints = findNearestBikeStops();
  if (from.location != null && to.location != null) {
    $('#warn1').hide();
    $('#warn2').hide();
    console.log("Calculating route...");
    var request = {
      origin: from.location,
      destination: to.location,
      travelMode: 'WALKING',
      waypoints: waypoints
    };
    directionsService.route(request, function(result, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(result);
      }
    });
  }else {
    if (from.location == null) {
      $('#warn1').show();
    }else if (to.location == null) {
      $('#warn2').show();
    }
  }

  $.each(markers, function(index, mark) {
    mark.setMap(null);
  });
}

function findStartLocation() {
  setTimeout(function(){
    from.address = $('#from').val();
    centerCamera(from);
  }, 1500);
}

function findEndLocation() {
  setTimeout(function() {
    to.address = $('#to').val();
    centerCamera(to);
  }, 1500);
}

// Centers camera and also uses geocoder to get coordinates
function centerCamera(pos) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'address': pos.address}, function(results, status) {
  if (status === 'OK') {

    map.setCenter(results[0].geometry.location);
    pos.location = {lat: results[0].geometry.location.lat(), lng:results[0].geometry.location.lng()};

    map.setZoom(14);
  } else {
    console.log('Geocode was not successful for the following reason: ' + status);
  }
});
}
