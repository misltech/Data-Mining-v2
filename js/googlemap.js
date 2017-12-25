
function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('location')),
    { types: ['geocode'] });

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

}
//google stuff ^^^

function locationEncoder(location) { //Handles location

var lat = 0;
var lon = 0;
var res = encodeURIComponent(location);

  var settings = {
    "async": false,
    "crossDomain": true,
    "url": "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDXxwQQFKd1MnsNS7uM2CaZHPdQO6KSeAE&address=" + res + "",
    "method": "POST"
  }

  $.ajax(settings).done(function (response) {

    if (response.status == "OK") {  //if gets data from google 
      lat = response.results[0].geometry.location.lat;  //store lat
      lon = response.results[0].geometry.location.lng;  //store lon
    }

    else{
      alert(response.status);
    }

    FlickrRequest(lat,lon);  //hand off to flickr.js
  });
}
