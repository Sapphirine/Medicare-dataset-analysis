/***************************************************
Copyright (C) 2016  
Authors: Siri Haricharan
         Jivtesh Singh

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
*************************************************/

app.controller('recoCtrl', function($scope,$http) {
    console.log('reco under control..');
    $scope.hospitals = [];
    
    var mapCanvas = document.getElementById('map');
var mapOptions = {
  center: new google.maps.LatLng(0, 0),
  zoom: 2,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}
$scope.map = new google.maps.Map(mapCanvas, mapOptions);
    
    $scope.getData = function() {
        console.log($scope.inputZipCode);
        $http.get('/zipcode/'+ $scope.inputZipCode)
        .success(function(data) {
             console.log(data);
            data=data["data"]
            data = data.split("\n");
            $scope.hospitals = []
            for(i in data) {
                $scope.hospitals.push(data[i].split(","));
            }
            $scope.mp();
            console.log($scope.hospitals);
            
        })
        .error(function(err){
            console.log(err);
        });
    };
    
    $scope.mp = function() {
        for (i in $scope.hospitals){
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ $scope.hospitals[i][2].split(' ').join('+') +'+' +$scope.hospitals[i][3]  +'+' + $scope.hospitals[i][4] + '&components=country:US&key=')
            .success(function(data) {
                console.log(data);
                var loc = data["results"][0]["geometry"]["location"];
                //update ht map
                var marker = new google.maps.Marker({
                    position: loc,
                    map: $scope.map,
                });
            })
            .error(function(err){
            console.log(err);
        })
        }
          
    };
    
    //normalMapInitialize();
//    "https://maps.googleapis.com/maps/api/geocode/json?address=santa+cruz&components=country:ES&key=YOUR_API_KEY"

});

