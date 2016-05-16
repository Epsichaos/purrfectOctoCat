app.controller("TaskCtrl", function($scope, $rootScope,$ionicPopup, $cordovaSQLite) {
    $rootScope.$on('resetDatabase', function() {
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
            'beginDate': '',
            'beginHour': '',
            'endDate': '',
            'endHour': '',
            'isTimePeriod': false,
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
        else if(newTask.date==''||newTask.durationHours==''||newTask.durationMinutes=='') {
            var alertPopup = $ionicPopup.alert({
                title: 'Incorrect form',
                template: 'Date & duration hours and minutes cannot be empty',
                okType: 'button button-energized'
            });
        }
        else {
/*
            if(newTask.taskName == '' || newTask.taskName == null) {
                var query = "INSERT INTO task (categoryName, date, durationHours, durationMinutes) VALUES(?,?,?,?)"
                $cordovaSQLite.execute(dbApp,query,[newTask.categoryName, newTask.date,newTask.durationHours, newTask.durationMinutes]).then(function(result) {
                    alert("INSERT ID -> " + result.insertId);
                    // emit event to reload list page
                    $rootScope.$emit("insertTaskEvent", {});
                }, function(error) {
                    alert(error);
                });
            }
            else {
*/
                var query = "INSERT INTO task (taskName, categoryName, date, durationHours, durationMinutes) VALUES(?,?,?,?,?)"
                $cordovaSQLite.execute(dbApp,query,[newTask.taskName, newTask.categoryName, newTask.date,newTask.durationHours, newTask.durationMinutes]).then(function(result) {
                    alert("INSERT ID -> " + result.insertId);
                    $scope.init();
                    $rootScope.$emit("insertTaskEvent", {});
                }, function(error) {
                    alert(error);
                });
//            }

        }
        /*
        if(newTask.newTaskName==false && newTask.taskName=='') {
            var alertPopup = $ionicPopup.alert({
                title: 'Incorrect form',
                template: 'Task name cannot be empty',
                okType: 'button button-assertive'
            });
        }
        else if(newTask.newTaskName==true && newTask.newTaskName=='') {
            var alertPopup = $ionicPopup.alert({
                title: 'Incorrect form',
                template: 'Task name cannot be empty',
                okType: 'button button-assertive'
            });
        }
        else if(newTask.isNewTask==false && newTask.categoryName=='') {
            var alertPopup = $ionicPopup.alert({
                title: 'Incorrect form',
                template: 'Category name cannot be empty',
                okType: 'button button-assertive'
            });
        }
        else if(newTask.isNewTask==true && newTask.newCategoryName=='') {
            var alertPopup = $ionicPopup.alert({
                title: 'Incorrect form',
                template: 'Category name cannot be empty',
                okType: 'button button-assertive'
            });
        }
        else if(newTask.isTimePeriod == false && (newTask.date==''||newTask.durationHours==''||newTask.durationMinutes=='')) {
            var alertPopup = $ionicPopup.alert({
                title: 'Incorrect form',
                template: 'Check date and duration of the task',
                okType: 'button button-assertive'
            });
        }
        else if(newTask.isTimePeriod == true && (newTask.beginDate==''||newTask.beginHour==''||newTask.endDate==''||newTask.endHour=='')) {
            var alertPopup = $ionicPopup.alert({
                title: 'Incorrect form',
                template: 'Check time period, it might be incorrect.',
                okType: 'button button-assertive'
            });
        }
        else {
            alert('else');
            if(isTimePeriod == false) {
                alert('beforeQuery');
                var query = "INSERT INTO task (taskName, categoryName, date, durationHours, durationMinutes) VALUES(?,?,?,?,?)"
                $cordovaSQLite.execute(dbApp,query,[newTask.taskName,newTask.categoryName, newTask.date,newTask.durationHours, newTask.durationMinutes]).then(function(result) {
                    alert("INSERT ID -> " + result.insertId);
                }, function(error) {
                    alert(error);
                });
            }
            // not supported right now
            else {
                alert('bug');
            }
        }
        */
    }
})
