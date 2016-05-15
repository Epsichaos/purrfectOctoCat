app.controller("ListCtrl", function($scope, $rootScope, $cordovaSQLite, $ionicPopup) {

    // catch insert event and reload page
    $rootScope.$on('insertTaskEvent', function() {
            //debug
            //alert('insertTaskEvent');
            $scope.init();
    });

    $scope.init = function() {
        $scope.collection = [];
        collection = [];
        if(window.cordova) {
            //alert('lal');
            var query = "SELECT * FROM task ORDER BY idTask DESC";
            //alert('select called');
            $cordovaSQLite.execute(dbApp,query).then(function(result) {
                //alert('lol');
                if(result.rows.length > 0) {
                    /*
                    for(var i=0; i<result.row.length; i++) {
                        //collection.push(result.rows[i]);
                        alert(result.length);
                    }
                    //alert(obj.firstname);
                    */
                    //alert(result.rows.length);
                    for(var i = 0; i<result.rows.length; i++) {
                        obj = {
                            'idTask': result.rows.item(i).idTask,
                            'categoryName': result.rows.item(i).categoryName,
                            'taskName': result.rows.item(i).taskName,
                            'date': result.rows.item(i).date,
                            'durationHours': result.rows.item(i).durationHours,
                            'durationMinutes': result.rows.item(i).durationMinutes
                        };
                        collection.push(obj);
                    }
                } else {
                    collection = [];
                }
            }, function(error) {
                alert('error' + error);
            });
            $scope.collection = collection;

        }
        else {
            $scope.collection = [
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
              alert(id);
           }
           // not OK
           else {
              //alert('Not sure!');
           }
        });
    }

})
