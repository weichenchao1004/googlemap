/**
 * Created by chenchaowei on 3/15/15.
 */
/**
 * Created by chenchao on 3/5/15.
 */


document.addEventListener('DOMContentLoaded',function() {

    singleSearch();


    function singleSearch(){
        var button = document.querySelector('button');
        var university_container = document.querySelector('#singleschool');

        var input = document.querySelector('input');

        button.addEventListener('click',function() {

            var  locationInfo  = input.value;


            var xhr = new XMLHttpRequest();

            xhr.open('GET', '/schools/' + '"'+ locationInfo + '"');
          //  console.log('/schools/' + '"' + locationInfo + '"');

            xhr.setRequestHeader('accept', 'application/json');
            xhr.addEventListener('readystatechange', function () {
                if( xhr.readyState === 4 && xhr.status === 200 )
                  {

                    var schools = JSON.parse(xhr.responseText);
                    console.log(schools);

                    update(schools);

                    addSingleUniToView(university_container, schools[0]);
                }
            });

           xhr.send();
        })
    }
});

function addSingleUniToView(university_container,school){
    var school_div = createElement('div', university_container, '', 'school-container');
    createElement('span', school_div, 'Name: ' + school.Institution_Name + '|', 'school-name');
    createElement('span', school_div, 'City: ' + school.Institution_City + '|', 'school-city');
    createElement('span', school_div, 'Zip: ' + school.Institution_Zip + '|', 'school-zipcode');

}

function createElement(type, parent, innerHTML, className) {
    var element = document.createElement(type);
    if (innerHTML) element.innerHTML = innerHTML;
    if (className) element.className = className;
    if (parent) parent.appendChild(element);
    return element;
}

var geocoder;
var map;

function initialize(){
    geocoder = new google.maps.Geocoder();
    var myLatlng = new google.maps.LatLng(37.6,-95.665);

    var mapOptions = {
        zoom: 4,
        center: myLatlng
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

}


function codeAddress(address,callback){

            geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);

                        callback(null,{
                            lon:results[0].geometry.location.D,
                            lat:results[0].geometry.location.k
                        })

                    } else {
                        callback(new Error('Failed to get data ... '), null);
                    }

                    }

            )
}

function update(schools) {
    var myLatlng = new google.maps.LatLng(37.6,-95.665);
    var mapOptions = {
        zoom: 17,
        center: myLatlng
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var addressArray = [];

    for(var i = 0; i < schools.length; i++) {
        var address = schools[i].Institution_Name + ', ' + schools[i].Institution_Address + ', ' + schools[i].Institution_City + ', ' + schools[i].Institution_State;
        addressArray.push(address);
    }

    console.log(addressArray);

    var fns =  addressArray.map(function(ele){
        return codeAddress.bind(null,ele);
    });


    async.series(fns,function(err,results) {
       console.log(results);//lat lon object
    })
}
google.maps.event.addDomListener(window, 'load', initialize);
