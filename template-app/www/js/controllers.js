angular.module('starter.controllers', [])

.controller('UpdatesCtrl', function($scope, Updates) {
  $scope.updates = Updates.all();
})

// .controller('MentorsCtrl', function($scope, Mentors) {
//   $scope.mentors = Mentors.all();
// })

.controller('MentorsCtrl', function($scope, $firebase) {
  var ref = new Firebase("https://easy-app.firebaseio.com/mentors");
  var sync = $firebase(ref);
  var syncObject = sync.$asObject();
  syncObject.$bindTo($scope, "mentors");

  // $scope.mentors = Mentors.all();
})

.controller('MentorDetailCtrl', function($scope, $stateParams, Mentors) {
  $scope.mentor = Mentors.get($stateParams.mentorId);
})

.controller('PrizesCtrl', function($scope) {
})

.controller('ScheduleCtrl', function($scope) {
});
