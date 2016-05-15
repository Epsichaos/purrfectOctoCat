app.controller("SettingsCtrl", function($scope, $cordovaSQLite, $ionicPlatform) {
    $scope.isEmpty = function(object) {
        for(var key in object) {
            if(object.hasOwnProperty(key)){
                return false;
            }
        }
        return true;
    }

    $scope.changeModify = function(variable) {
        $scope.modify = variable;
    }

    $scope.userModifications = function(variable) {
        return $scope.modify;
    }

    $scope.init = function() {
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
                //insert('John', 'Doe', 'j.doe', 'j.doe@example.com');
                //select();
                /*
                alert(obj);
                if(!isEmpty(obj)) {
                    $scope.obj = obj;
                }
                */
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
