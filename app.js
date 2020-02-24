// Array of places and metadata
const places = [
  {
    coords: { lat: 37.7638, lng: -122.469 },
    content:
      "<h3>San Tung</h3><p>Chinese restaurant with delicious dry fried chicken wings.</p><a href='https://goo.gl/maps/wiqva8qzW9bBoJRJ6' target='_blank'>Get directions</a>",
    category: "eat"
  },
  {
    coords: { lat: 37.7332, lng: -122.4344 },
    content:
      "<h3>One Wan Thai Restaurant</h3><p>Vast selection of delicious Thai curries, noodles, and soups with beautiful plating.</p><a href='https://goo.gl/maps/zCosF1XA5d2Mf1ReA' target='_blank'>Get directions</a> ",
    category: "eat"
  },
  {
    coords: { lat: 37.7819, lng: -122.4101 },
    content:
      "<h3>Tu Lan</h3><p>Hole-in-the-wall Vietnamese restaurant with the best beef salad.</p><a href='https://goo.gl/maps/aNMsAqpzZ9wzeaW89' target='_blank'>Get directions</a> ",
    category: "eat"
  },
  {
    coords: { lat: 37.7639, lng: -122.4673 },
    content:
      "<h3>Manna</h3><p>Hole-in-the-wall family-owned Korean restaurant with the best tofu soup.</p><a href='https://goo.gl/maps/TkAFCrGrswH76hmT8' target='_blank'>Get directions</a> ",
    category: "eat"
  },
  {
    coords: { lat: 37.8015, lng: -122.3975 },
    content:
      "<h3>Exploratorium</h3><p>Hands on science museum for all ages.</p><a href='https://goo.gl/maps/GhdjWJTFFnW6tUZB8' target='_blank'>Get directions</a>",
    category: "play"
  },
  {
    coords: { lat: 37.7699, lng: -122.4661 },
    content:
      "<h3>California Academy of Sciences</h3><p>Four-story science museum with rooftop garden in Golden Gate Park.</p><a href='https://goo.gl/maps/fYWNUDFHFaFsmBYs9' target='_blank'>Get directions</a>",
    category: "play"
  },
  {
    coords: { lat: 37.761, lng: -122.4126 },
    content:
      "<h3>Mission Cliffs</h3><p>Climbing gym with top-roping, bouldering, and fitness classes.</p><a href='https://goo.gl/maps/FiesP46PyEahaVxN6' target='_blank'>Get directions</a>",
    category: "play"
  },
  {
    coords: { lat: 37.7754, lng: -122.4377 },
    content:
      "<h3>Emporium</h3><p>Lively barcade with arcade games, pool, and air hockey.</p><a href='https://goo.gl/maps/aAFSMgJmVg3Lm8SJA' target='_blank'>Get directions</a>",
    category: "play"
  },
  {
    coords: { lat: 37.7399, lng: -122.4091 },
    content:
      "<h3>Bare Bottle</h3><p>Spacious brewery with wide selection of beers on tap, acrcade games, and rotating food trucks.</p><a href='https://goo.gl/maps/PmB4NdxAvxTkJohh6' target='_blank'>Get directions</a>",
    category: "drink"
  },
  {
    coords: { lat: 37.728263, lng: -122.404139 },
    content:
      "<h3>Fermet, Drink, Repeat</h3><p>Small brewery with a few beers and kombuchas on tap, board games, and bring your own food.</p><a href='https://goo.gl/maps/JG2skPodDpMS3y7y7' target='_blank'>Get directions</a>",
    category: "drink"
  },
  {
    coords: { lat: 37.757761, lng: -122.388084 },
    content:
      "<h3>Magnolia Brewing</h3><p>Spacious brewery with many IPAs on tap and snacks.</p><a href='https://goo.gl/maps/FGYYSRVHWDxr2oKp6' target='_blank'>Get directions</a>",
    category: "drink"
  },
  {
    coords: { lat: 37.784, lng: -122.4091 },
    content:
      "<h3>Mikkeller Bar</h3><p>Spacious gastropub with wide beer selection in downtown SF.</p><a href='https://goo.gl/maps/H2RR8ZA6PFPjb44EA' target='_blank'>Get directions</a>",
    category: "drink"
  }
];

// `categories` is our main data store. It is populated inside the
// `initMap` method. Once populated, its structure is:
//
// {
//   "eat": {
//     "button": <button object>,
//     "places": [
//       {
//         "marker": <google maps marker object",
//         "infoWindow": <google maps infoWindow object"
//       },
//       // ...
//     ],
//   },
//   "drink" {
//     // See above
//   },
//   // ...
// }
//
// It is used to group together all data and HTML elements
// for each category.
let categories = {};

function initMap() {
  let options = {
    zoom: 12,
    center: { lat: 37.7749, lng: -122.4194 }
  };
  let map = new google.maps.Map(document.getElementById("map"), options);

  // Populate `categories`, structured as above
  for (const p of places) {
    let marker = new google.maps.Marker({
      position: p.coords,
      map: map,
      category: p.category,
      content: p.content
    });

    let infoWindow = new google.maps.InfoWindow({
      content: p.content
    });
    marker.addListener("click", function() {
      infoWindow.open(map, marker);
    });

    // If this is the first time we have seen the current
    // place's category, initialize the entry in `categories`.
    categories[p.category] = categories[p.category] || {
      // Empty `places` array
      'places': [],
      // Grab the corresponding button from the DOM (we would
      // ideally do this in a separate step from the place
      // initialization) to keep everything distinct.
      'button': document.getElementById(p.category),
    }
    // Add the marker and infoWindow for this place to
    // the corresponding category's `places` array.
    categories[p.category].places.push({
      'marker': marker,
      'infoWindow': infoWindow,
    })

    // Close the infoWindow when user clicks on the map.
    google.maps.event.addListener(map, "click", function() {
      infoWindow.close();
    });
  }
}

// `filterFunc` is called when a category button is clicked.
// Its job is to hide/display markers and restyle buttons,
// depending on the category that was clicked.
let filterFunc = function(category) {
  for (const [cat, data] of Object.entries(categories)) {
    // `isSelected` represents whether the current category was
    // the one that was clicked.
    let isSelected = cat === category;

    // `isVisible` represents whether the current category's
    // markers should be visible. Note that if the
    // pseudo-category "reset" was clicked then all markers
    // should be made visible.
    let isVisible = isSelected || category === "reset"
    for (const place of data.places) {
      place.marker.setVisible(isVisible);
      place.infoWindow.close()
    }

    // Re-style the button, which we found in the DOM as part
    // of `initMap`.
    if (isSelected) {
      data.button.classList.add("active")
    }
    else {
      data.button.classList.remove("active")
    }
  }
};
