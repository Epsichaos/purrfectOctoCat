app.controller("TaskCtrl", function($scope, $rootScope,$ionicPopup, $cordovaSQLite) {
    $rootScope.$on('reset', function() {
            $scope.init();
    });

    $scope.init = function() {
        $scope.newTask = {
            'isNewTask': false,
            'newTaskName': '',
            'taskName': '',
            'isNewCategory': false,
            'categoryName': '',
            'newCategoryName': '',
            // TODO Add Time period support
            //'beginDate': '',
            //'beginHour': '',
            //'endDate': '',
            //'endHour': '',
            //'isTimePeriod': false,
            'date': '',
            'durationHours': '',
            'durationMinutes': ''
        }

        $scope.taskCollection = [];
        $scope.categoryCollection = [];
        categoryCollection = [];
        taskCollection = [];
        if(window.cordova) {
            var query1 = "SELECT DISTINCT categoryName FROM task";
            $cordovaSQLite.execute(dbApp,query1).then(function(result) {
                //alert('lol');
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
            var query2 = "SELECT DISTINCT taskName, categoryName FROM task GROUP BY taskName";
            $cordovaSQLite.execute(dbApp,query2).then(function(result) {
                //alert('lol');
                if(result.rows.length > 0) {
                    for(var i = 0; i<result.rows.length; i++) {
                        obj = {
                            'categoryName': result.rows.item(i).categoryName,
                            'taskName': result.rows.item(i).taskName
                        };
                        taskCollection.push(obj);
                    }
                } else {
                    taskCollection = [];
                }
            }, function(error) {
                alert('error' + error);
            });
        }
        $scope.categoryCollection = categoryCollection;
        $scope.taskCollection = taskCollection;
    }

    $scope.taskValidation = function(newTask) {
        //alert('beforeQuery');
        if(newTask.categoryName == '' || newTask.categoryName == null) {
            var alertPopup = $ionicPopup.alert({
                title: 'Incorrect form',
                template: 'Category name cannot be empty',
                okType: 'button button-energized'
            });
        }
        else if(newTask.date==''||(newTask.durationHours==''&&newTask.durationMinutes=='')) {
            var alertPopup = $ionicPopup.alert({
                title: 'Incorrect form',
                template: 'Date & duration hours and minutes cannot be empty',
                okType: 'button button-energized'
            });
        }
        else {
            if(newTask.durationHours == '') {
                newTask.durationHours = 0;
            }
            if(newTask.durationMinutes == '') {
                newTask.durationMinutes = 0;
            }
            var query = "INSERT INTO task (taskName, categoryName, date, durationHours, durationMinutes) VALUES(?,?,?,?,?)"
            $cordovaSQLite.execute(dbApp,query,[newTask.taskName, newTask.categoryName, newTask.date,newTask.durationHours, newTask.durationMinutes]).then(function(result) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Insertion completed',
                    template: 'New task has been created successfully!',
                    okType: 'button button-energized'
                });
                $rootScope.$emit("reset", {});
                //$rootScope.$emit("resetPie", {});
            }, function(error) {
                alert(error);
            });
        }
    }
})
