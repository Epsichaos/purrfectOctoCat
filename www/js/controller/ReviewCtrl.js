app.controller("ReviewCtrl", function($scope) {

    $scope.pieLabels = ["Books","Movies","Sleeping", "Shower", "Cooking", "Work", "Walking", "Shopping"];
    $scope.pieData = [3, 2.3, 1, 4, 3.5, 4, 5.2, 3.2];
    //$scope.pieBackgroundColor = ["#FF6384","#36A2EB","#FFCE56", "#FFCE56", "#FFCE56"];
    //$scope.pieHoverBackgroundColor = ["#FF6384","#36A2EB","#FFCE56"];
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A', 'Series B'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];
});
