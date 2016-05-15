app.controller("TaskCtrl", function($scope, $rootScope,$ionicPopup, $cordovaSQLite) {
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
    }

    $scope.taskValidation = function(newTask) {
        //alert('beforeQuery');
        var query = "INSERT INTO task (taskName, categoryName, date, durationHours, durationMinutes) VALUES(?,?,?,?,?)"
        $cordovaSQLite.execute(dbApp,query,[newTask.taskName,newTask.categoryName, newTask.date,newTask.durationHours, newTask.durationMinutes]).then(function(result) {
            alert("INSERT ID -> " + result.insertId);
            // emit event to reload list page
            $rootScope.$emit("insertTaskEvent", {});
        }, function(error) {
            alert(error);
        });
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
