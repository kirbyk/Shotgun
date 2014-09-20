angular.module('starter.services', [])

.factory('Updates', function() {
  var updates = [
    { id: 0, header: 'Cookies!!', subheader: 'Come to the food bar for some dope ass cookies courtesy of Apple!' },
    { id: 1, header: 'Check-in', subheader: 'Checkin is going on right now' },
    { id: 2, header: 'Check-in', subheader: 'Checkin is going on right now' }
  ];

  return {
    all: function() {
      return updates;
    }
  }
})

.factory('Mentors', function() {

  var mentors = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' },
    { id: 4, name: 'Kirby Kohlmorgen' }
  ];

  return {
    all: function() {
      return mentors;
    },
    get: function(mentorId) {
      // Simple index lookup
      return mentors[mentorId];
    }
  }
});
