app.controller("SettingsCtrl", function($scope, $cordovaSQLite, $ionicPlatform, $ionicPopup) {
    $scope.collectionSettings = [];
    collectionSettings = [];
    $scope.init = function() {
        query="SELECT COUNT(*) AS categorySum, categoryName FROM task GROUP BY categoryName";
        if(window.cordova) {
            $cordovaSQLite.execute(dbApp, query).then(function(result) {
                if(result.rows.length > 0) {
                    for(var i = 0; i<result.rows.length; i++) {
                        //alert(result.rows.item(i));
                        obj = {
                            'categoryName': result.rows.item(i).categoryName,
                            'categorySum': result.rows.item(i).categorySum
                        };
                        collectionSettings.push(obj);
                    }
                }
                $scope.collectionSettings = collectionSettings;

            }, function(error) {
                alert('error:' + error.message);
            });
        }
    }

    $scope.deleteHistory = function() {
        var confirmPopup = $ionicPopup.confirm({
          title: 'Caution',
          template: 'You are about to delete all the data in your history. Be careful, would you like to continue?',
          cancelType: 'button button-energized',
          okType: 'button button-assertive',
          okText: 'Delete everything'
        });
        confirmPopup.then(function(res) {
            // if OK
            if(res) {
               var confirmPopupSure = $ionicPopup.confirm({
                 title: 'Caution',
                 template: 'Remember, all your data will be gone. Continue?',
                 cancelType: 'button button-energized',
                 cancelText: 'No',
                 okType: 'button button-assertive',
                 okText: 'Yes'
               });
               confirmPopupSure.then(function(res) {
                    if(res) {
                        var query = "DELETE FROM task";
                        $cordovaSQLite.execute(dbApp,query).then(function(result) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Delete completed',
                                template: 'All database has been deleted'
                            });
                            $rootScope.$emit("reset", {});
                        }, function(error) {
                           alert('error' + error);
                       });
                    }
                    else {

                    }
                })
            }
           // not OK
           else {
              //alert('Not sure!');
           }
        });
    }
    /**
    * @deprecated
    */
    $scope.changeModify = function(variable) {
        $scope.modify = variable;
    }

    /**
    * @deprecated
    */
    $scope.userModifications = function(variable) {
        return $scope.modify;
    }

    /**
    * @deprecated
    */
    $scope.initOld = function() {
        //$ionicPlatform.ready(function() {
            if(window.cordova) {
                var query = "SELECT * FROM user WHERE id=?";
                //alert('select called');
                $cordovaSQLite.execute(dbApp,query,[1]).then(function(result) {
                    if(result.rows.length > 0) {
                        obj = {
                            'firstname': result.rows.item(0).firstname,
                            'lastname': result.rows.item(0).lastname,
                            'nickname': result.rows.item(0).nickname,
                            'email': result.rows.item(0).email
                        };
                        //alert(obj.firstname);
                        $scope.obj = obj;
                    } else {
                        $scope.obj = {};
                    }
                }, function(error) {
                    alert('error' + error);
                });
            }
            else {
                $scope.obj = {
                    'firstname': 'John',
                    'lastname': 'Doe',
                    'nickname': 'j.doe',
                    'email': 'john.doe@example.com'
                };
            }
            $scope.modify = false;
        //})
    }
    /**
    * @deprecated
    */
    $scope.formValidation = function(user) {
        if(user == undefined) {
            this.init();
        }
        else {
            var query = "UPDATE user SET firstname=?, lastname=?, nickname=?, email=? WHERE id=?";
            $cordovaSQLite.execute(dbApp,query,[user.firstname, user.lastname, user.nickname, user.email,1]).then(function(result) {
                //alert("INSERT ID -> " + result.insertId);
                var query = "SELECT * FROM user WHERE id=?";
                //alert('select called');
                $cordovaSQLite.execute(dbApp,query,[1]).then(function(result) {
                    if(result.rows.length > 0) {
                        obj = {
                            'firstname': result.rows.item(0).firstname,
                            'lastname': result.rows.item(0).lastname,
                            'nickname': result.rows.item(0).nickname,
                            'email': result.rows.item(0).email
                        };
                        $scope.obj = obj;
                    } else {
                        $scope.obj = {};
                    }
                }, function(error) {
                    alert('error' + error);
                });
                $scope.modify = false;
            }, function(error) {
                alert('error' + error);
            });
        }
    }
})
