var myApp = angular.module('AngelHack', ['ui.router']);
myApp.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/index');
  $stateProvider

  .state('one', {
    url: '/one',
    templateUrl: 'main.html'
  })
  .state('two', {
    url: '/two',
    templateUrl: 'two.html'
  })
  .state('three', {
    url: '/three',
    templateUrl: 'three.html'
  })
  .state('four', {
    url: '/four',
    templateUrl: 'four.html'
  })
  .state('five', {
    url: '/five',
    templateUrl: 'five.html'
  })

});

myApp.controller('MainCtrlr',
  ['$scope', function($scope) {
  $scope.greeting = 'Hola!';
}]);

myApp.controller('navCtrlr',
  ['$scope','$location', function($scope, $location) {
    $scope.$location = $location;
}]);

