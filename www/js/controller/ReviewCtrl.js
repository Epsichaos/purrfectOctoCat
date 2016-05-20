app.controller("ReviewCtrl", function($scope, $rootScope, $cordovaSQLite) {

    $rootScope.$on('reset', function() {
            $scope.pieInit();
            $scope.lineInit();
            //$scope.pieTodayInit();
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
/*
    $scope.pieTodayInit = function() {
        collectionReviewToday = [];
        $scope.pieLabelsToday = [];
        $scope.pieDataToday = [];
        var total;
        var d = new Date();
        console.log(d);
        if(window.cordova) {
            var query2 = "SELECT datetime(date) as date, SUM(durationHours) AS sumHours, SUM(durationMinutes) AS sumMinutes, categoryName FROM task GROUP BY categoryName";
            $cordovaSQLite.execute(dbApp,query2).then(function(result) {
                if(result.rows.length > 0) {
                    for(var i = 0; i<result.rows.length; i++) {
                        alert(result.rows.item(i).date);
                        obj = {
                            'date': result.rows.item(i).date,//new Date(result.rows.item(i).date),
                            'categoryName': result.rows.item(i).categoryName,
                            'sumHours': result.rows.item(i).sumHours,
                            'sumMinutes': result.rows.item(i).sumMinutes
                        };
                        collectionReviewToday.push(obj);
                    }
                    $scope.collectionReviewToday=collectionReview;
                    d = new Date();
                    day = d.getDate();
                    month = d.getMonth();
                    year = d.getFullYear();
                    collectionReviewToday.forEach(function(element) {
                        //alert(element.categoryName);
                        //alert(element.sumHours);
                        if(day==element.date.getDate()) {
                            $scope.pieLabelsToday.push(element.categoryName);
                            $scope.pieDataToday.push(Math.round((element.sumHours*60+element.sumMinutes)/6)/10);
                        }
                    });
                } else {
                    collectionReviewToday = [];
                }
            }, function(error) {
                alert('error :' + error.message);
            });
        }
    }
*/
    $scope.lineInit = function() {
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40]
        ];
        $scope.lineColors = ["#ef473a"];
    }
});
