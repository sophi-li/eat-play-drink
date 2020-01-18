// Array of markers
let markers = [
    {
      coords:{lat:37.7638,lng:-122.4690},
      content:'<h1>San Tung</h1>',
      category: 'eat'
    },
    {
      coords:{lat:37.7754,lng:-122.4377},
      content:'<h1>Emporium</h1>',
      category: 'play'
    },
    {
      coords:{lat:37.7399,lng:-122.4091},
      content:'<h1>Amesbury MA</h1>',
      category: 'drink'
    }
  ];

// Init gooMarkers to be able to use map setVisible property
let gooMarkers = [];


function initMap(){
    // Map options
    var options = {
      zoom:12,
      center:{lat:37.7749,lng:-122.4194}
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