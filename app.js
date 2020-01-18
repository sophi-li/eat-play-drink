// Array of markers
let markers = [
    {
      coords:{lat:42.4668,lng:-70.9495},
      content:'<h1>Lynn MA</h1>',
      category: 'eat'
    },
    {
      coords:{lat:42.8584,lng:-70.9300},
      content:'<h1>Amesbury MA</h1>',
      category: 'play'
    },
    {
      coords:{lat:42.7762,lng:-71.0773},
      content:'<h1>Amesbury MA</h1>',
      category: 'drink'
    }
  ];

// Init gooMarkers to be able to use map setVisible property
let gooMarkers = [];


function initMap(){
    // Map options
    var options = {
      zoom:8,
      center:{lat:42.3601,lng:-71.0589}
    }

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);



    // Loop through markers
    for(var i = 0;i < markers.length;i++){
      // Add marker
      addMarker(markers[i]);
    }

    // Add Marker Function
    function addMarker(props){
      let marker = new google.maps.Marker({
        position:props.coords,
        map:map,
        category: props.category
      });

      gooMarkers.push(marker)

      // Check content
      if(props.content){
        var infoWindow = new google.maps.InfoWindow({
          content:props.content
        });

        marker.addListener('click', function(){
          infoWindow.open(map, marker);
        });
      }
    }
  }

filterMarkers = function(category) {
    for(i = 0; i < gooMarkers.length; i++) {
        if (gooMarkers[i].category === category || category.length === 0) {
            gooMarkers[i].setVisible(true)
        } else {
            gooMarkers[i].setVisible(false)
        }
    }
}