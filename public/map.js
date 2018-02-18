
// Initialize map and center it to helsinki
function initMap() {
  console.log("Initialize map");
  var helsinki = { lat: 60.1699, lng: 24.9384 };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: helsinki
  });
}
