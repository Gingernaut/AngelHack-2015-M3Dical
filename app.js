var myApp = angular.module('AngelHack', ['ui.router']);
myApp.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/index');
  $stateProvider

  .state('one', {
    url: '/one',
    templateUrl: 'one.html'
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

myApp.controller('textCtrlr',
  function($scope, $http){
    var tKey= "c7bcfab8-5761-4879-aca8-0c2e5cb0ad7c";
    var sKey= "010eb8d1-1113-479e-aa52-77ab734879ac";
    $scope.myData={};
    $scope.conceptArray=[];

    //Grab Symptoms- extract Concepts via Text Analysis Platform
    $scope.myData.doClick = function(symptom){
      $scope.symptom=symptom;
      $scope.diagnosis=[];
      console.log(symptom);
      var getConcepts = $http.get("https://api.idolondemand.com/1/api/sync/extractconcepts/v1?text=" +symptom+"&apikey="+tKey);
      getConcepts.success(function(data){
        console.log(data);
        $scope.myData.fromServer = data;
        for (var i=0; i<data.concepts.length; i++){
          if(data.concepts[i].concept.length<15){
          $scope.conceptArray.push(data.concepts[i].concept);
        }}
          //Attach Concepts to SnowMed
            //getMed=$http.get("http://snapi.dataline.co.uk/rest/concepts?text=broken&guid="+sKey+"&matchType=1&namespaces=0&searchMode=W");
            //getMed.success(function(meddata){
            $scope.diagnosis.push("Broken Finger");
            $scope.diagnosis.push("Finger Strain");
            //console.log(meddata);
          //});

          //getMed.error(function(meddata){
           // console.log("no00o");
          //})


          //For every concept Id,

      });
      getConcepts.error(function(data){
        alert("AJAX failz!!");
      });
    }
  });
