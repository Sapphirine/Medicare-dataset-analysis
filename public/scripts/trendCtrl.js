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