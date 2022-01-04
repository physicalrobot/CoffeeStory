function initAutocomplete() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: "roadmap",
    });
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);

    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    let markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach((marker) => {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();

        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }

            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };

            // Create a marker for each place.
            markers.push(
                new google.maps.Marker({
                    map,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                })
            );
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}




// function initMap() {
//     var map;

//     var location = {
//         lat: 40.70250918583776,
//         lng: -73.90170101739545
//     }
//     var options = {
//         zoom: 16,
//         center: location
//     }

//     // // add marker function ---------------
//     // function addMarker(coords) {
//     //     var marker = new google.maps.Marker({
//     //         position: coords,
//     //         map: map
//     //         // icon: 'src/images/clothtexture_7_64.png'

//     //     })


//     // }
//     // //add marker function test --------------
//     // addMarker({ lat: 40.70250918583776, lng: -73.90170101739545 });
//     // addMarker({ lat: 40.70079932028424, lng: - 73.90302281751553 });


//     if (navigator.geolocation) {
//         console.log('geolocation is here');

//         navigator.geolocation.getCurrentPosition((loc) => {
//             location.lat = loc.coords.latitude;
//             location.lng = loc.coords.longitude;

//             //write the new map
//             map = new google.maps.Map(document.getElementById('map'), options);

//         },
//             (err) => {
//                 console.log('user clicked no');
//                 map = new
//                     google.maps.Map(document.getElementById('map'), options);

//             })
//     } else {
//         console.log('geolocation not supported :(');
//         map = new
//             google.maps.Map(document.getElementById('map'), options);
//     }


//     autocomplete = new google.maps.places.Autocomplete(document.getElementById('input'),
//         {
//             componentRestrictions: { 'country': ['us'] },
//             fields: ['geometry', 'name'],
//             types: ['establishments']
//         })

//     autocomplete.addListener('place_changed', () => {
//         const place = autocomplete.getPlace();

//         var marker = new google.maps.Marker({
//             position: place.geometry.location,
//             title: place.name,
//             map: map
//         })

//     })
// }


