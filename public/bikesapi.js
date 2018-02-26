
var bikeArr = [];
var url = 'https://api.citybik.es/v2/networks/citybikes-helsinki';

$(document).ready(function() {
  retrieveBikeInfo();
})

function retrieveBikeInfo() {
  $.getJSON(url, {
    tags: 'HSL-citybikes',
    format: 'json'
  }).done(function(data) {
    $.each(data.network.stations, function(index, station) {
      bikeArr.push(station);
    });
  });
  console.log('Bike data retrieved succesfully...');
}

function getBikedata() {
  return bikeArr;
}

function getLocations() {
  var locationsArr = [];
  $.each(bikeArr, function(index, station) {
    locationsArr.push([station.latitude, station.longitude]);
  });
  return locationsArr;
}
