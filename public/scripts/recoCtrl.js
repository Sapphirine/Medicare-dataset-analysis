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

