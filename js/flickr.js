var pagecount, 
myLAT, 
myLON, 
api_size, 
flickrAPI,
fAPI,
defaultsize, 
flickrOptions, 
totalImages;

function FlickrRequest(lat, lng) {

  if (lat != null) {
    myLAT = lat;
  }

  else {
    alert("latitude returned " + String(lat));
  }

  if (lng != null) {
    myLON = lng;
  }
   
  else {
    alert("longitude returned " + String(lng));
  }

  flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + fAPI + "&format=json&nojsoncallback=1";
  defaultsize = "Medium 640";

  flickrOptions = {
    tags: keyword,
    lat: myLAT,
    lon: myLON,
    per_page: 10,
    page: 1
  };

  $.getJSON(flickrAPI, flickrOptions, function (json) {
    SortPhotos(json);
    finish();  
  });


};

function SortPhotos(json) {
  if (json.photos.total == 0) {
    alert("I found no images!");
    $(".loadercontainer").css("display", "none"); //hide loader
    $('#page-selection').hide();  //high pagination
    $('#sresults').html("Results found: " + json.photos.total); //updates results
    return;  //end program.
  }

  if(json.photos.total > 100){
  
    $('#page-selection').show(); //show pagination
    totalImages = json.photos.total; 
    $('#sresults').html("Results found: " + json.photos.total);
  }
  else{
 
    $('#sresults').html("Results found: " + json.photos.total);  //we dont show pagination because theres less than 100. 
  }
  // else {
  //   $('#photo-result').empty();
  //   $('#page-selection').show();
  //   totalImages = json.photos.total;
  // }
  $('#photo-result').empty();

  $('#photo-result').empty();  //clear container for new data

  $.each(json.photos.photo, function (s1, myresult) {  //using sortphotos parameter data.. Seek photos 
    eachSize(myresult.id); //for each photo.. use id to get the image
  });
};


function eachSize(id) {
  var settings = {
    "async": false,
    "crossDomain": true,
    "url": "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+ fAPI +"&photo_id=" + id + "&format=json&nojsoncallback=1",
    "method": "POST",
  }

  $.ajax(settings).done(function (response) { // will return a list of images resolution with url 
    SortSizes(response);  //send this list to be sorted
  });
}

function SortSizes(size) {  // For each size. Choose the one that is set as my defaultsize field at the top of this page
  $.each(size.sizes.size, function (s2, myresult_size) {
    if (myresult_size.label == defaultsize) {
      initFace(myresult_size.source); // when found send to be processed by faceplusplus
    }
  });

}

function finish() {  //at the very end hide loader container.
  $(".loadercontainer").css("display", "none");
}
