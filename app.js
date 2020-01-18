// Array of markers
let markers = [
    {
      coords:{lat:37.7638,lng:-122.4690},
      content:'<h3>San Tung</h3><p>Chinese restaurant with delicious dry fried chicken wings.</p>',
      category: 'eat'
    },
    {
    coords:{lat:37.7332,lng:-122.4344},
    content:'<h3>One Wan Thai Restaurant</h3><p>Vast selection of delicious Thai curries, noodles, and soups with beautiful plating.</p>',
    category: 'eat'
    },
    {
      coords:{lat:37.8015,lng:-122.3975},
      content:'<h3>Exploratorium</h3><p>Hands on science museum for all ages.</p>',
      category: 'play'
    },
    {
      coords:{lat:37.7754,lng:-122.4377},
      content:'<h3>Emporium</h3><p>Lively barcade with arcade games, pool, and air hockey.</p>',
      category: 'play'
    },
    {
      coords:{lat:37.7399,lng:-122.4091},
      content:'<h3>Bare Bottle</h3><p>Spacious brewery with wide selection of beers on tap, acrcade games, and rotating food trucks.</p>',
      category: 'drink'
    },
    {
      coords:{lat:37.728263,lng:-122.404139},
      content:'<h3>Fermet, Drink, Repeat</h3><p>Small brewery with a few beers and kombuchas on tap, board games, and bring your own food.</p>',
      category: 'drink'
    },
    {
      coords:{lat:37.757761,lng:-122.388084,},
      content:'<h3>Magnolia Brewing</h3><p>Spacious brewery with many IPAs on tap and snacks.</p>',
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