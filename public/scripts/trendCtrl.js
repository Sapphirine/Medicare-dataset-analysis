app.controller('trendCtrl', function($scope,$http) {
    console.log('trend under control..');
    
        $scope.sample = function() {
        console.log('hi trend');
        ///Call API
        
        $http.get("/data/trend.json")
        .success(function(data){
            data = JSON.parse(JSON.stringify(data));
            
            console.log(data);
    
    var chart = AmCharts.makeChart( "trenddiv", {
  "type": "serial",
  "theme": "none",
  "dataProvider": data,
  "valueAxes": [ {
    "gridColor": "#FFFFFF",
    "gridAlpha": 0.2,
    "dashLength": 0
  } ],
  "gridAboveGraphs": true,
  "startDuration": 1,
  "graphs": [ {
    "balloonText": "[[category]]: <b>[[value]]</b>",
    "fillAlphas": 0.8,
    "lineAlpha": 0.2,
    "type": "column",
    "valueField": "value"
  } ],
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  },
  "categoryField": "id",
  "categoryAxis": {
    "gridPosition": "start",
    "gridAlpha": 0,
    "tickPosition": "start",
    "tickLength": 20
  },
  "export": {
    "enabled": true
  }
        
           

} );
        })
            .error(function(err){
            console.log(err);
        });
        };
             $scope.sample();

    
    
});