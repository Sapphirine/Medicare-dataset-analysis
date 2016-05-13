app.controller('spendCtrl', function($scope,$http) {
    console.log('spendCtrl under control..');
    
    
    $scope.sample = function() {
        console.log('hiiii');
        ///Call API
        
        $http.get("/data/map_total.json")
        .success(function(data){
            data = JSON.parse(JSON.stringify(data));
            var oldData = data
            
            console.log(data);
            var newData = [];
            
            mx=data[0]["value"];
            mn=data[0]["value"];
            for(i in data){
                if (data[i]["value"]>mx){
                    mx=data[i]["value"];}
                if (data[i]["value"]<mn){
                    mn=data[i]["value"];}
            }
            for(i in data){
                data[i]["value"]/=11.5;
            }
            
//            console.log(newData);
            //Plotting the map
            var map = AmCharts.makeChart( "chartdiv1", {
              type: "map",
              "theme": "none",

              colorSteps: 10,

              dataProvider: {
                map: "usaLow",
                areas: data
            },

              areasSettings: {
                autoZoom: true,
                "balloonText": "[[title]]: <strong>[[value]]</strong>"
              },

              valueLegend: {
                right: 10,
                minValue: mn,
                maxValue: mx
              },

              "export": {
                "enabled": true
              }

            } );
        })
        .error(function(err){
            console.log(err);
        });
        
        $http.get("/data/map_reg.json")
        .success(function(data){
            data = JSON.parse(JSON.stringify(data));
            var oldData = data
            
            console.log(data);
            var newData = [];
            
            mx=data[0]["value"];
            mn=data[0]["value"];
            for(i in data){
                if (data[i]["value"]>mx){
                    mx=data[i]["value"];}
                if (data[i]["value"]<mn){
                    mn=data[i]["value"];}
            }
            for(i in data){
                data[i]["value"]/=11.5;
            }
            
//            console.log(newData);
            //Plotting the map
            var map = AmCharts.makeChart( "chartdiv2", {
              type: "map",
              "theme": "none",

              colorSteps: 10,

              dataProvider: {
                map: "usaLow",
                areas: data
            },

              areasSettings: {
                autoZoom: true,
                "balloonText": "[[title]]: <strong>[[value]]</strong>"
              },

              valueLegend: {
                right: 10,
                minValue: mn,
                maxValue: mx
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