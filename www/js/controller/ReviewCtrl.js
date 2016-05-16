app.controller("ReviewCtrl", function($scope, $rootScope, $cordovaSQLite) {

    $rootScope.$on('reset', function() {
            $scope.pieInit();
    });

    $scope.pieInit = function() {
        collectionReview = [];
        $scope.pieLabels = [];
        $scope.pieData = [];
        var total;
        var d = new Date();
        console.log(d);
        if(window.cordova) {
            var query = "SELECT SUM(durationHours) AS sumHours, SUM(durationMinutes) AS sumMinutes, categoryName FROM task GROUP BY categoryName";
            $cordovaSQLite.execute(dbApp,query).then(function(result) {
                if(result.rows.length > 0) {
                    for(var i = 0; i<result.rows.length; i++) {
                        obj = {
                            'categoryName': result.rows.item(i).categoryName,
                            'sumHours': result.rows.item(i).sumHours,
                            'sumMinutes': result.rows.item(i).sumMinutes
                        };
                        collectionReview.push(obj);
                    }
                    $scope.collectionReview=collectionReview;
                    collectionReview.forEach(function(element) {
                        //alert(element.categoryName);
                        //alert(element.sumHours);
                        $scope.pieLabels.push(element.categoryName);
                        $scope.pieData.push(Math.round((element.sumHours*60+element.sumMinutes)/6)/10);
                    });
                } else {
                    collectionReview = [];
                }
            }, function(error) {
                alert('error :' + error.message);
            });
        }
    }
    //$scope.pieLabels = ["Books","Movies","Sleeping", "Shower", "Cooking", "Work", "Walking", "Shopping"];
    //$scope.pieData = [3, 2.3, 1, 4, 3.5, 4, 5.2, 3.2];
    //$scope.pieBackgroundColor = ["#FF6384","#36A2EB","#FFCE56", "#FFCE56", "#FFCE56"];
    //$scope.pieHoverBackgroundColor = ["#FF6384","#36A2EB","#FFCE56"];
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
});
