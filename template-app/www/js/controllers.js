angular.module('starter.controllers', [])

.controller('UpdatesCtrl', function($scope, $firebase) {
  var ref = new Firebase("https://easy-app.firebaseio.com/updates");
  var sync = $firebase(ref);
  var syncObject = sync.$asObject();
  syncObject.$bindTo($scope, "updates");
})

.controller('MentorsCtrl', function($scope, $firebase) {
  var ref = new Firebase("https://easy-app.firebaseio.com/mentors");
  var sync = $firebase(ref);
  var syncObject = sync.$asObject();
  syncObject.$bindTo($scope, "mentors");
})

.controller('MentorDetailCtrl', function($scope, $stateParams, Mentors) {
  $scope.mentor = Mentors.get($stateParams.mentorId);
})

.controller('PrizesCtrl', function($scope, $firebase) {
  var ref = new Firebase("https://easy-app.firebaseio.com/prizes");
  var sync = $firebase(ref);
  var syncObject = sync.$asObject();
  syncObject.$bindTo($scope, "prizes");
})

.controller('ScheduleCtrl', function($scope) {
});
