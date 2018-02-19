var map;
var from;
var to;

// Initialize map and center it to helsinki
function initMap() {
  console.log("Initialize map");
  var helsinki = { lat: 60.1699, lng: 24.9384 };
  map = new google.maps.Map($('#map')[0], {
    zoom: 10,
    center: helsinki
  });
}

// Wait 1.5 seconds before searching and placing marker
function findStartLocation() {
  setTimeout(function(){
    from = $('#from').val();
    placeMarker(from);
  }, 1500);
}

function findEndLocation() {
  setTimeout(function() {
    to = $('#to').val();
    placeMarker(to);
  }, 1500);
}

function placeMarker(pos) {
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({'address': pos}, function(results, status) {
  if (status === 'OK') {
    map.setCenter(results[0].geometry.location);
    var marker = new google.maps.Marker({
      map: map,
      position: results[0].geometry.location,
    });
    map.setZoom(14);
  } else {
    console.log('Geocode was not successful for the following reason: ' + status);
  }
  });
}
