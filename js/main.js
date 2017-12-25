var keyword; 
var locationinput; 
var thisObject; 
var larray = [], graphdata = [], Chartlabel = [], bckg = [], knownlocations = [], graphtest = [];
var executed = false;
var step = 0;
var smile = 0;
var wasshown;


//************************************************/
//                 Initializations              //
/* flickr api */ fAPI = "12a89bbffb51e4d3c9a0d7d0487a597c";
/* googlemaps api */ gmaps = "AIzaSyDXxwQQFKd1MnsNS7uM2CaZHPdQO6KSeAE";
/* face++ api 1* */ fpApi1= "wFWG_FRfUrjhQGlPeJ9azjAH6UVQospR";
/* face++ api 2* */ fpApi2 = "mL2l6w_rHAeVnsrvYQy19mQ8EttOxfFo";
/*************************************************/

$(document).ready(function () { //It begins here

  var indexOfCurrent, counter = 0;

  $('.query-submit').click(function () {

    keyword = $("#keyword").val();  //get keyword from textbox
    locationinput = $("#location").val();  // get location from textbox

    if (locationinput == null && keyword == null) {  //check to see if keyword/ location is filled out
      alert("please complete all fields"); //if not alert and do nothing
    }
    else {  //when filled out

      $(".loadercontainer").css("display", "block"); //show loading animation

      if ($('.charts').css("display") == "block") {  //if the charts is already being shown 
        $('.charts').hide();                        //hide it
        $('#compute').html('compute results');      //change the text of compute back to compute results.
      }
      locationEncoder(locationinput); //hand off location from text to google maps.js
    }
  });


  $('#compute').click(function () {  // Handles everything with graphs data / visibility
    
  
    $('.gallery-container').toggle();   //toggles on or off the gallery of images returned with data
    $('.charts').toggle();    //toggles charts current state
    $(this).html($(this).html() == 'go back' ? 'compute results' : 'go back');  //does the renaming of the button.

    if($('#page-selection').css("display") == "block"){   //Handles pagination button
      $('#page-selection').css("display","none");  //hides so that user doesnt click on next page while on graph screen. to prevent critical failure
      wasshown = true;  //condition to hold. Determines to toggle back to normal state.
    }
    else{
      if(wasshown == true && $('#page-selection').css("display") == "none"){ //if was hidden and pagination was hidden
        $('#page-selection').css("display", "block");  //set state back to visible  
          wasshown =false;   //return to false. cycle repeats for each clicks
      }
    }

    if($('.gallery-container').css("display") == "none"){    // Does graph computation when gallery contain is hidden. Prevents funky stufff

    knownlocations = [];  // clears array on each click of compute
    graphdata = []; // clears array on each click of compute
    Chartlabel = []; // clears array on each click of compute
    bckg = []; // clears array on each click of compute
    executed = false; //condition
    $('.chartsdetails').empty(); //empty chart deets

    $.each(larray, function (position, value) { //sorts through larray. contains data about locations and smile data

      if (IsValidArray(value)) {   //checks to see if location exist then populate data within this section. example london[0] every data with london will be stored as 
        knownlocations[indexOfCurrent].push(value);  //london[0][1], [0][2] , [0][3]
      }   // ^^ -push current value to this index . london example

      else {    //when value does not exist create a new section in array
        var arr = [];
        arr.push(value);
        knownlocations.push(arr); //push to knownlocation array
      }
    });

    function IsValidArray(value) {
      if (knownlocations.length > 0) {  //if not empty
        for (var i = 0; i < knownlocations.length; i++) {  //goes through to find where this location index is locationed
          if (knownlocations[i][0].location == value.location) {  //just checks the first index of each array to see if they mactch
            indexOfCurrent = i; //when they do store index.
            return true; //return true back to if statement
          }
        }
      }
      else { // if empty
        return false;  //creates an array inside knownlocations.
      }
    };

    $.each(knownlocations, function (position, value) { //goes through each knownlocation
      $.each(value, function (pos, val) {  //digging deeper into knownlocation
        if (!executed) {    //I want to execute this once
          bckg.push(getRandomColor());
          Chartlabel.push(val.location); //storing the location into label
          executed = true; //never runs again until next location from the begininning of knownlocations
        }
        smile += val.smile; //adds smile data
        step++;  //step/count for average calculation
      });
      //everything below runs after each data from each location is calculated
      smile = smile / step;    // at the very end of each of this
      graphdata.push(smile);  //push final data to graph data
      executed = false;  //sets executed to false to run that if statement again.
      smile = 0; //set value back to default
      step = 0;  //set value back to default.
    });

    console.log(knownlocations); //some debug stuff
    startGraph();  //hand off to graphs.js
    
    $.each(knownlocations, function (pos, val){

      $('.chartsdetails').append('<div class="col-md-4" style="border-radius: 10px; background:white; margin: 10px;"><p style="font-family: Zilla Slab;">faces detected and included in graph from <b>'+ $(this)[0].location +'</b><b style="color:green; margin-left: 5px;"> ' + $(this).length + '</b>&nbspfaces' + '</b></p></div>');
      //^^ shows what is inside at graph data for each location
    })


    }
  else{
    $('.chartsdetails').empty(); //clears chart details html section when image gallery is visible.
  }

  });

  function getRandomColor() {
    var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    return hue;

    //basic color randomizer
  }

  $('#help').click(function () {
    $('#helpModal').modal('show');  //activates help modal
  });
  
});

function showWarning() {
    $('#landingModal').modal('show'); //fix to only show once
  }
