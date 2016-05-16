app.controller("ListCtrl", function($scope, $rootScope, $cordovaSQLite, $ionicPopup) {

    // catch insert event and reload page
    $rootScope.$on('reset', function() {
            $scope.init();
    });

    $scope.init = function() {
        $scope.collectionList = [];
        collectionList = [];
        if(window.cordova) {
            //alert('lal');
            var query = "SELECT * FROM task ORDER BY idTask DESC";
            //alert('select called');
            $cordovaSQLite.execute(dbApp,query).then(function(result) {
                //alert('lol');
                if(result.rows.length > 0) {
                    for(var i = 0; i<result.rows.length; i++) {
                        d = new Date(result.rows.item(i).date);
                        day = d.getDate();
                        month = d.getMonth();
                        year = d.getFullYear();
                        if(day<10) {
                            day = '0'+day;
                        }
                        if(month<10) {
                            month = '0'+month;
                        }
                        minutes = '';
                        if(result.rows.item(i).durationMinutes<10) {
                            minutes += '0' + result.rows.item(i).durationMinutes;
                        }
                        else {
                            minutes = result.rows.item(i).durationMinutes;
                        }
                        obj = {
                            'idTask': result.rows.item(i).idTask,
                            'categoryName': result.rows.item(i).categoryName,
                            'taskName': result.rows.item(i).taskName,
                            'date': day + '/' + month + '/' + year,
                            'durationHours': result.rows.item(i).durationHours,
                            'durationMinutes': minutes//result.rows.item(i).durationMinutes
                        };
                        collectionList.push(obj);
                    }
                } else {
                    collectionList = [];
                }
                $scope.collectionList = collectionList;
            }, function(error) {
                alert('error' + error);
            });
        }
        else {
            $scope.collectionList = [
                {'idTask':1, 'taskName':'name1', 'categoryName': 'category1', 'beginDate':'date1', 'endDate':'date1end'},
                {'idTask':2, 'taskName':'name2', 'categoryName': 'category2', 'beginDate':'date2', 'endDate':'date1end'},
                {'idTask':3, 'taskName':'name3', 'categoryName': 'category3', 'beginDate':'date2', 'endDate':'date1end'},
                {'idTask':4, 'taskName':'name4', 'categoryName': 'category4', 'beginDate':'date4', 'endDate':'date1end'}
            ];
        }
    }

    $scope.deleteItem = function(id) {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Confirm delete',
          template: 'Are you sure you want to delete this item?',
          cancelType: 'button button-energized',
          okType: 'button button-assertive'
        });
        confirmPopup.then(function(res) {
            // if OK
           if(res) {
               var query = "DELETE FROM task WHERE idTask=?";
               $cordovaSQLite.execute(dbApp, query, [id]).then(function(result) {
                   var alertPopup = $ionicPopup.alert({
                       title: 'Delete completed',
                       template: 'Item has been deleted'
                   });
                   $rootScope.$emit("reset", {});
                   //$rootScope.$emit("resetPie", {});
               }, function(error) {
                  alert('error' + error.message);
              });
           }
           // not OK
           else {
              //alert('Not sure!');
           }
        });
    }

})
