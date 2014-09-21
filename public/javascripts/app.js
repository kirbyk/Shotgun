angular.module('shotgun', ['colorpicker.module'])

.controller('colors', function($scope) {
  $scope.color1 = "#000000";

  $scope.$watch("color1", function(value) {
    $("#mobile-preview-content").contents().find('.tab-item .icon, .tab-item .tab-title, .title').css('color', value);
  });
});

