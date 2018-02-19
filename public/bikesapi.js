
var bikeArr = [];
var url = 'https://api.citybik.es/v2/networks/citybikes-helsinki';

$(document).ready(function() {
  retrieveBikeInfo();
  var checkExist = setInterval(function() {
   if (bikeArr["0"].name) {
      console.log("Exists! "+ bikeArr["0"].name);
      clearInterval(checkExist);
   }
}, 100); // check every 100ms
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
