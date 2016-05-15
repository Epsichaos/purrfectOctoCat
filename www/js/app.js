// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'chart.js', 'ngCordova'])
var dbApp = null;
app.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if (window.cordova) {
        //alert('first load');
        dbApp = $cordovaSQLite.openDB({name:'my.purrfect.db', location:'default'});
        //$cordovaSQLite.execute(dbApp, "DROP TABLE user");
        $cordovaSQLite.execute(dbApp, "DROP TABLE task");
        $cordovaSQLite.execute(dbApp, "CREATE TABLE IF NOT EXISTS user (id integer primary key, firstname text, lastname text, nickname text, email text)");
        //$cordovaSQLite.execute(dbApp, "CREATE TABLE IF NOT EXISTS category (idCategory INTEGER PRIMARY KEY, categoryName TEXT)");
        //$cordovaSQLite.execute(dbApp, "CREATE TABLE IF NOT EXISTS task (idTask INTEGER PRIMARY KEY, idCategory INTEGER, taskName TEXT, beginDate DATE, endDate DATE, FOREIGN KEY (idCategory) REFERENCES category (idCategory))");
        $cordovaSQLite.execute(dbApp, "CREATE TABLE IF NOT EXISTS task (idTask INTEGER PRIMARY KEY, categoryName TEXT, taskName TEXT, date DATE, durationHours INTEGER, durationMinutes INTEGER)");

        /*
        var query = "INSERT INTO task (categoryName, taskName, beginDate, endDate) VALUES (?,?,?,?)";
        $cordovaSQLite.execute(dbApp,query,["Movie","Matrix 1", "11/05/2016T17:23:00.000Z", "12/05/2016T14:23:00.000Z"]).then(function(result) {
            alert("INSERT ID -> " + result.insertId);
        }, function(error) {
            alert(error);
        });
        $cordovaSQLite.execute(dbApp,query,["Movie","The Lord of the Ring 3", "13/05/2016T19:23:00.000Z", "14/05/2016T14:23:00.000Z"]).then(function(result) {
            alert("INSERT ID -> " + result.insertId);
        }, function(error) {
            alert(error);
        });
        $cordovaSQLite.execute(dbApp,query,["Movie","Cloud Atlas", "10/05/2016T9:23:00.000Z", "16/05/2016T14:23:00.000Z"]).then(function(result) {
            alert("INSERT ID -> " + result.insertId);
        }, function(error) {
            alert(error);
        });
*/
        /*
        var query = "DELETE * FROM user";
        $cordovaSQLite.execute(dbApp,query).then(function(result) {

        }, function(error) {
            alert(error);
        });
        */
        /*
        var query = "INSERT INTO user (firstname, lastname, nickname, email) VALUES (?,?,?,?)";
        //alert('insert called');
        $cordovaSQLite.execute(dbApp,query,["John","Doe", "j.doe", "john.doe@example.com"]).then(function(result) {
            //alert("INSERT ID -> " + result.insertId);
        }, function(error) {
            alert(error);
        });
        */
    }
    else{
        dbApp = window.openDatabase("my.purrfect.db", '1', 'my', 1024 * 1024 * 100); // browser
/*
        dbApp.transaction(function(tx) {
            tx.executeSql("DROP TABLE user", [], function(tx){
               console.log('table created !');
           });
        });
        dbApp.transaction(function(tx) {
            tx.executeSql("DROP TABLE category", [], function(tx){
               console.log('table created !');
           });
       });*/
        dbApp.transaction(function(tx) {
	        tx.executeSql("CREATE TABLE IF NOT EXISTS user (idUser INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, nickname TEXT, email TEXT)", [], function(tx){
	           console.log('table created !');
           });
        });
        dbApp.transaction(function(tx) {
	        tx.executeSql("CREATE TABLE IF NOT EXISTS category (idCategory INTEGER PRIMARY KEY, categoryName TEXT)", [], function(tx){
	           console.log('table created !');
           });
        });
        dbApp.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS task (idTask INTEGER PRIMARY KEY, taskName TEXT, beginDate DATE, endDate DATE)"/*, FOREIGN KEY(idCategory) REFERENCES category(idCategory))"*/, [], function(tx){
               console.log('table created !');
           });
        });
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url:'/home',
            templateUrl:'partials/home.html'//,
            //controller:'HomeCtrl'
        })
        .state('about', {
            url:'/about',
            templateUrl:'partials/about.html'
        })
        .state('review', {
            url:'/review',
            templateUrl:'partials/review.html',
            controller:'ReviewCtrl'
        })
        .state('task', {
            url:'/task',
            templateUrl:'partials/task.html',
            controller: 'TaskCtrl'
        })
        .state('list', {
            url:'/list',
            templateUrl:'partials/list.html',
            controller: 'ListCtrl'
        })
        .state('settings', {
            url:'/settings',
            templateUrl:'partials/settings.html',
            controller: 'SettingsCtrl'
        })
    $urlRouterProvider.otherwise('home');
})
