
var bikeArr;
var url = 'https://api.citybik.es/v2/networks/citybikes-helsinki';

$(document).ready(function() {
  retrieveBikeInfo();
})

function retrieveBikeInfo() {
  $.getJSON(url, {
    tags: 'HSL-citybikes',
    format: 'json'
  }).done(function(data) {
    console.log(data);
    $.each(data.network.stations, function(station) {
      console.log(station.name);
    });
  });
  console.log('Bike data retrieved succesfully...');
}
