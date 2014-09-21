angular.module('shotgun', ['colorpicker.module'])

.controller('colors', function($scope) {
  $scope.color2 = "#000000";

  $scope.$watch("color2", function(value) {
    $("#mobile-preview-content").contents().find('ion-nav-bar').css({'background-color':value});
  });
});

