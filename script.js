//google map api------------------------------------------------------------------------------
function initAutocomplete() {

    var location = {
        lat: 40.70250918583776,
        lng: -73.90170101739545
    }

    var options = {
        zoom: 16,
        center: location,
        mapTypeId: "roadmap",

    }


    const map = new google.maps.Map(document.getElementById('map'), options);


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


        if (navigator.geolocation) {
            console.log('geolocation is here');

            navigator.geolocation.getCurrentPosition((loc) => {
                location.lat = loc.coords.latitude;
                location.lng = loc.coords.longitude;

                //write the new map
                map = new google.maps.Map(document.getElementById('map'), options);

            },
                (err) => {
                    console.log('user clicked no');
                    map = new
                        google.maps.Map(document.getElementById('map'), options);

                })
        } else {
            console.log('geolocation not supported :(');
            map = new
                google.maps.Map(document.getElementById('map'), options);
        }


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
//-------------------------------------------------------
function OnSubmitForm() {
    var experience = document.getElementById('exp');
    var check1 = document.getElementById('check1');
    var check2 = document.getElementById('check2');
    var button = document.getElementById('findcoffeebutton');
    var form = document.getElementById('myform')

    if (check1.checked == true) {
        console.log(check1.checked)
        window.location.hash = 'coldcoffeerec'
    }
    else if (check2.checked == true) {
        console.log(check2.checked)
        window.location.hash = 'hotcoffeerec'
    }
    form.reset();

}


function LessOn() {
    var experience = document.getElementById('exp');
    var check1 = document.getElementById('check1');
    var check2 = document.getElementById('check2');
    var button = document.getElementById('findcoffeebutton');
    var form = document.getElementById('myform')

    if (exp.value == 'Novice') {
        window.location.hash = 'biggiesmalls'
    } else if (exp.value == 'Intermediate') {
        window.location.hash = 'mediuminfo'
    } else if (exp.value == 'Expert') {
        window.location.hash = 'expertinfo'
    }
    form.reset();

}





