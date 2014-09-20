angular.module('starter.controllers', [])

.controller('UpdatesCtrl', function($scope) {
})

.controller('MentorsCtrl', function($scope, Mentors) {
  $scope.mentors = Mentors.all();
})

.controller('MentorDetailCtrl', function($scope, $stateParams, Mentors) {
  $scope.mentor = Mentors.get($stateParams.mentorId);
})

.controller('PrizesCtrl', function($scope) {
})

.controller('ScheduleCtrl', function($scope) {
});
