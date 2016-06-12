app.controller("ReviewCtrl", function($scope, $rootScope, $cordovaSQLite) {

    $rootScope.$on('reset', function() {
        /*
            $scope.pieInit();
            $scope.getAlltasks();
            */
            $scope.initAll();
            //$scope.categorySelectorValidation('Shopping');
            //$scope.lineInit();
    });

    $scope.initAll = function() {
        $scope.pieInit();
        $scope.getAlltasks();
        $scope.categorySelectorValidation('Shopping');
    }

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
                        $scope.pieLabels.push(element.categoryName);
                        $scope.pieData.push(Math.round((element.sumHours*60+element.sumMinutes)/6)/10);
                    });
                    // disable animation
                    // TODO : solve animation bug while using 2 bdd calls :/
                    $scope.options = {
                        animation: false
                    };
                } else {
                    collectionReview = [];
                }
            }, function(error) {
                alert('error :' + error.message);
            });
        }
    }

    $scope.getAlltasks = function() {
        $scope.categoryCollection = [];
        categoryCollection = [];
        // if the device is an Android device
        if(window.cordova) {
            var query = "SELECT DISTINCT categoryName FROM task";
            $cordovaSQLite.execute(dbApp,query).then(function(result) {
                if(result.rows.length > 0) {
                    for(var i = 0; i<result.rows.length; i++) {
                        obj = {
                            'categoryName': result.rows.item(i).categoryName,
                        };
                        categoryCollection.push(obj);
                    }
                } else {
                    categoryCollection = [];
                }
            }, function(error) {
                alert('error' + error);
            });
            $scope.categoryCollection = categoryCollection;
        }
    }

    /*
    *
    */
    $scope.categorySelectorValidation = function(categorySelection) {
        //alert(categorySelection.categoryName);
        $scope.lineCategory = [];
        lineCategory = [];
        if(categorySelection.categoryName === undefined) {
            categoryName = categorySelection;
        }
        else {
            categoryName = categorySelection.categoryName;
        }

        if(window.cordova) {

            var queryLine = "SELECT date, SUM(durationHours) as sumHours, SUM(durationMinutes) as sumMinutes FROM task WHERE categoryName=? GROUP BY date ORDER BY date DESC";
            $cordovaSQLite.execute(dbApp,queryLine, [categoryName]).then(function(result) {
                todayDate = new Date();
                todayDateDay = todayDate.getDate();
                todayDateMonth = todayDate.getMonth();
                todayDateYear = todayDate.getFullYear();
                todayDateMonth++;
                if(result.rows.length > 0) {

                    for(var i = 0; i<result.rows.length; i++) {
                        d = new Date(result.rows.item(i).date);
                        day = d.getDate();
                        month = d.getMonth();
                        year = d.getFullYear();
                        //alert(day);
                        month++;
                        // parsing day & month for display
                        if(day<10) {
                            parsedDay = '0' + day;
                        }
                        else {
                            parsedDay = day;
                        }
                        if(month<10) {
                            parsedMonth = '0' + month;
                        }
                        else {
                            parsedMonth = month;
                        }
                        // easy case : middle of the month, we can go backward in the month days
                        if(todayDateDay >= 7) {
                            if(day <= todayDateDay && day >= todayDateDay-6 && month == todayDateMonth && year == todayDateYear) {
                                obj = {
                                    'date': parsedDay + '/' + parsedMonth + '/' + year,
                                    'sumHours': result.rows.item(i).sumHours,
                                    'sumMinutes': result.rows.item(i).sumMinutes
                                };
                                lineCategory.push(obj);
                            }
                            else {
                                // we do nothing here
                            }
                        }
                    }
                    $scope.lineCategory=lineCategory;
                } else {
                    lineCategory = [];
                }
                // reset
                // test
                $scope.series = [];
                $scope.lineColors = [];
                $scope.labels = [];
                $scope.data  = [[]];
                // set new
                $scope.series = [categoryName];
                $scope.lineColors = ["#ef473a"];
                lineCategory.forEach(function(element) {
                    $scope.labels.push(element.date);
                    $scope.data[0].push(Math.round((element.sumHours*60+element.sumMinutes)/6)/10);
                });
            }, function(error) {
                alert('error :' + error.message);
            });
            /*

                        // easy case : middle of the month, we can go backward in the month days
                        if(todayDateDay >= 7) {
                            if(day <= todayDateDay && day >= todayDateDay-6 && month == todayDateMonth && year == todayDateYear) {
                                obj = {
                                    'date': day + '/' + month + '/' + year,
                                    'sumHours': result.rows.item(i).durationHours,
                                    'sumMinutes': result.rows.item(i).durationMinutes
                                };
                                lineCategory.push(obj);
                            }
                            else {
                                // we do nothing here
                            }
                        }

                        else {

                            if(todayDateMonth >= 1) {
                                // mock month easy peasy
                                totalDayMonth == 31;
                                remainingMonthDay;
                            }

                            // switch(todayDateMonth)
                            //    case 1:

                            // first complex case, we have to change only month
                            if(todayDateMonth >=2 && ((day <= todayDateDay && month == todayDateMonth) || (day >= (totalDayMonth-(7-day)) && month == todayDateMonth - 1)) && year == todayDateYear) {

                            }
                            // most complex case, we have to change both month and year
                            else if(todayDateMonth == 1 && ((day <= todayDateDay && month == todayDateMonth && year == todayDateYear) || (day >= (totalDayMonth-(7-day)) && month == 12 && year == todayDateYear - 1))) {

                            }
                            else {
                                // we do nothing here
                            }

           */
        }
    }


    $scope.lineInit = function() {
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55, 40]
        ];
        $scope.lineColors = ["#ef473a"];

    }

});
