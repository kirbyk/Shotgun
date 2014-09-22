var activeView = 0;
var enabled = true;
var bgname = 'url("img/thumbnails/white.png")';
var bgfinal = 'url("../img/thumbnails/white.png")';
var currentTheme = 'light';
var views = [
    '#mainInput',
    '#updatesInput',
    '#mentorsInput',
    '#prizesInput',
    '#scheduleInput'
];
var viewIDs = [
    '#main',
    '#updates',
    '#mentors',
    '#prizes',
    '#schedule'
];
var viewTableAllowed = [
    false,
    true,
    true,
    true,
    true
];

var remRef = new Firebase('https://easy-app.firebaseio.com/');
var fireBaseData = [];
var elementsInDisplayArray = [];


//to get names in easy format
var weekday = new Array(7);
weekday[0]=  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

var myDataRef = new Firebase('https://easy-app.firebaseio.com/');

var categoryNames = [];

var fireCounter = 0
// Populate the local arrays for data store/manipulation
myDataRef.on('child_added', function (snapshot) {
    //console.log("CHILD: "+snapshot.ref());
    var regX = /[a-z]*$/;
    categoryNames[fireCounter] = regX.exec(snapshot.ref());
    fireBaseData[fireCounter] = snapshot.val();
    fireCounter++;
});

// Get the data on a post that has been removed
myDataRef.on('child_removed', function (snapshot) {
    console.log("Something happened!");
    var regX = /[a-z]*$/;
    categoryNames[fireCounter] = regX.exec(snapshot.ref());
    fireBaseData[fireCounter] = snapshot.val();
    fireCounter++;
    toggleTable();
});

function getbgvalue() {
    return bgname;
}

function toggleTheme(el) {
    console.log(el);
    if (el == 'light') {
        $('#light').addClass('selected');
        $('#dark').removeClass('selected');
        $("#mobile-preview-content").contents().find('ion-nav-bar, .tabs').css('background-color', '#ECF0F1');
        $("#mobile-preview-content").contents().find('.tab-item .icon, .tab-item .tab-title, .title').css('color', '#2C3E50');
        currentTheme = 'light';
    }
    else {
        $('#dark').addClass('selected');
        $('#light').removeClass('selected');
        $("#mobile-preview-content").contents().find('ion-nav-bar, .tabs, .bar').css('background-color', '#2C3E50');
        $("#mobile-preview-content").contents().find('.tab-item .icon, .tab-item .tab-title, .title').css('color', 'white');
        currentTheme = 'dark';
    }
}

function openLogin(el) {
    $(el).fadeOut(250, function() {
        $('.fields').fadeIn(250);
    });
}

//turns table on/off and will populate it with firebase data
function toggleTable() {
    console.log("table called");
    //var lTable = document.getElementById("existingTable");
    //lTable.style.display = (lTable.style.display == "table") ? "none" : "table";
    if(viewTableAllowed[activeView]) {
        document.getElementById("existingTable").style.display = "initial";//maybe table
        elementsInDisplayArray = [];
        console.log("Try to populate that array yo")
        //populating the table dam this would be nice with some angular.jssssss
        var k = 0;
        for(category in fireBaseData) {
            //console.log ("That name yo "+ fireBaseData[category].toString());
            var i = 0;
            if(categoryNames[k] == 'updates' && activeView == 1) {
                for(update in fireBaseData[k]) {
                    elementsInDisplayArray[i] = [];
                    elementsInDisplayArray[i][0] = fireBaseData[k][update].header + " - " + fireBaseData[k][update].createdAt;
                    elementsInDisplayArray[i][1] = fireBaseData[k][update].subheader;
                    elementsInDisplayArray[i][2] = "https://easy-app.firebaseio.com/updates/" + update;
                    i++;
                }
            }
            if(categoryNames[k] == 'mentors' && activeView == 2) {
                for(companies in fireBaseData[k]) {
                    for(mentors in fireBaseData[k][companies]) {
                        elementsInDisplayArray[i] = [];
                        elementsInDisplayArray[i][0] = companies + " - " + fireBaseData[k][companies][mentors].name;
                        elementsInDisplayArray[i][1] = fireBaseData[k][companies][mentors].skills;
                        elementsInDisplayArray[i][2] = "https://easy-app.firebaseio.com/mentors/" + companies + "/" + mentors;
                        i++;
                    }
                }
            }
            if(categoryNames[k] == 'prizes' && activeView == 3) {
                for(prize in fireBaseData[k]) {
                    elementsInDisplayArray[i] = [];
                    elementsInDisplayArray[i][0] = fireBaseData[k][prize].award + " - " + fireBaseData[k][prize].company;
                    elementsInDisplayArray[i][1] = fireBaseData[k][prize].description;
                    elementsInDisplayArray[i][2] = "https://easy-app.firebaseio.com/prizes/" + prize;
                    i++;
                }
            }
            if(categoryNames[k] == 'schedule' && activeView == 4) {
                for(days in fireBaseData[k]) {
                    for(anEvent in fireBaseData[k][days]) {
                        elementsInDisplayArray[i] = [];
                        elementsInDisplayArray[i][0] = fireBaseData[k][days][anEvent].header + " - " + days + " - " + fireBaseData[k][days][anEvent].time;
                        elementsInDisplayArray[i][1] = fireBaseData[k][days][anEvent].description;
                        elementsInDisplayArray[i][2] = "https://easy-app.firebaseio.com/schedule/" + days + "/" + anEvent;
                        i++;
                    }
                }
            }
            k++;
        }

        //clear pre-exisitng  table and repopulate with new data
        $("#existingTable").children().remove();
        for(var i = 0; i < elementsInDisplayArray.length; i++) {
            console.log("Making moves yo");
            var element = document.createElement("div");
            element.innerHTML = "<input onclick=\"deleteData(" + i + ")\"; type=\"submit\"; value=\"\u2A2F\";></input><h2>"+ elementsInDisplayArray[i][0] +"</h2><p>" + elementsInDisplayArray[i][1] + "</p>";
            element.className = "entry";

            document.getElementById("existingTable").appendChild(element);
        }

        //fade the table into view
        $('#existingTable').fadeIn(250);
    }
    else {
        console.log("NOOPBEBPEOBESD");
        $('#existingTable').fadeOut(250);
    }
}

function deleteData(numberToDelete) {
    //console.log("About to try to destroy.");
    //console.log("Destroy at url: "+ elementsInDisplayArray[numberToDelete][2]);
    remRef = new Firebase(elementsInDisplayArray[numberToDelete][2]);
    remRef.remove();
    remRef.on('child_removed', function (snapshot) {
        console.log("Something happened!");
        toggleTable();
    });
    //

    $('#existingTable').fadeOut(250, function() {
        $("#existingTable").children().remove();
        toggleTable();
        $('#existingTable').fadeIn(250);
        //console.log("It should have deleted.");
    });
}

remRef.on('child_removed', function (snapshot) {
    console.log("Something happened!");
    toggleTable();
});

$(document).ready(function() {

    $('#expandMentor').click(function(event) {
        viewTableAllowed[activeView] = false;
        toggleTable();
        $(this).fadeOut(250, function() {
            $('#mentorsFields').slideDown(250);
        });
    });
    $('#expandUpdates').click(function(event) {
        viewTableAllowed[activeView] = false;
        toggleTable();
        $(this).fadeOut(250, function() {
            $('#updatesFields').slideDown(250);
        });
    });
    $('#expandPrizes').click(function(event) {
        viewTableAllowed[activeView] = false;
        toggleTable();
        $(this).fadeOut(250, function() {
            $('#prizesFields').slideDown(250);
        });
    });
    $('#expandSchedule').click(function(event) {
        viewTableAllowed[activeView] = false;
        toggleTable();
        $(this).fadeOut(250, function() {
            $('#scheduleFields').slideDown(250);
        });
    });


    $('.thumb').click(function(event) {
        $('.thumb').removeClass('clicked');
        $(this).addClass('clicked');
        bgname = $(this).children().attr('class') + '.png';
        bgfinal = 'url("../img/thumbnails/' + bgname + '")';
        bgname = 'url("img/thumbnails/' + bgname + '")';
        $("#mobile-preview-content").contents().find('.pane').css({'background-image':bgname});
    });


    $('#main').click(function(event) {
        $(views[activeView]).fadeOut(250, function() {
            console.log("Get element: "+viewIDs[activeView]);
            // document.getElementById('#main').style.opacity = 1.0;
            activeView = 0;
            toggleTable();
            // document.getElementById(viewIDs[activeView]).style.opacity = 0.8;
            $('#mainInput').fadeIn(250);
        });
    });
    $('#updates').click(function(event) {
        $(views[activeView]).fadeOut(250, function() {
            // document.getElementById(viewIDs[activeView]).style.opacity = 1.0;
            activeView = 1;
            toggleTable();
            // document.getElementById(viewIDs[activeView]).style.opacity = 0.8;
            $('#updatesInput').fadeIn(250);
        });
    });
    $('#mentors').click(function(event) {
        $(views[activeView]).fadeOut(250, function() {
            // document.getElementById(viewIDs[activeView]).style.opacity = 1.0;
            activeView = 2;
            toggleTable();
            // document.getElementById(viewIDs[activeView]).style.opacity = 0.8;
            $('#mentorsInput').fadeIn(250);
        });
    });
    $('#prizes').click(function(event) {
        $(views[activeView]).fadeOut(250, function() {
            // document.getElementById(viewIDs[activeView]).style.opacity = 1.0;
            activeView = 3;
            toggleTable();
            // document.getElementById(viewIDs[activeView]).style.opacity = 0.8;
            $('#prizesInput').fadeIn(250);
        });
    });
    $('#schedule').click(function(event) {
        $(views[activeView]).fadeOut(250, function() {
            // document.getElementById(viewIDs[activeView]).style.opacity = 1.0;
            activeView = 4;
            toggleTable();
            // document.getElementById(viewIDs[activeView]).style.opacity = 0.8;
            $('#scheduleInput').fadeIn(250);
        });
    });



    $('#main').focus(function(event) {
        $('#main, #updates, #mentors, #prizes, #schedule').removeClass('focus');
        $(this).addClass('focus');
    });
    $('#updates').focus(function(event) {
        $('#main, #updates, #mentors, #prizes, #schedule').removeClass('focus');
        $(this).addClass('focus');
    });
    $('#mentors').focus(function(event) {
        $('#main, #updates, #mentors, #prizes, #schedule').removeClass('focus');
        $(this).addClass('focus');
    });
    $('#prizes').focus(function(event) {
        $('#main, #updates, #mentors, #prizes, #schedule').removeClass('focus');
        $(this).addClass('focus');
    });
    $('#schedule').focus(function(event) {
        $('#main, #updates, #mentors, #prizes, #schedule').removeClass('focus');
        $(this).addClass('focus');
    });

    //mentor additions
    var mentorRef = myDataRef.child("mentors")
    $('#addMentor').click(function() {
        //recieve new values
        var company = $('#mentorCompanyInput').val();
        var name = $('#mentorNameInput').val();
        var skills = $('#mentorDescriptionInput').val();

        //add the new mentorif fields not empty
        if(company != '' && name != '' && skills != '') {
            mentorRef.child(company).push({name: name, skills: skills});
            $('#mentorNameInput').val('');
            $('#mentorCompanyInput').val('');
            $('#mentorDescriptionInput').val('');
            enabled = false;
            viewTableAllowed[activeView] = true;
            $('#mentorsFields').fadeOut(250, function() {
                $('#expandMentor').fadeIn(250);
                toggleTable();
            });
        }
        else if (enabled)
            alert("Please fill in all of the fields.");
    });
    mentorRef.on('child_added', function(snapshot) {
        //response recieved from server
        var message = snapshot.val();
        successfulUpdate();
    });

    //update additions
    var updateRef = myDataRef.child("updates");
    $('#addUpdate').click(function() {
        //recieve new values
        var header = $('#updateNameInput').val();
        var subheader = $('#updateDescInput').val();

        var currentDate = new Date();
        var dateString = (currentDate.getHours()%12.0) + ":" + currentDate.getMinutes();
        if (currentDate.getHours() > 12.0) {
            dateString += " PM";
        }
        else {
            dateString += " AM";
        }

        //add the new mentor if fields not empty
        if (header !== '' && subheader !== '') {
            $('#updateNameInput').val('');
            $('#updateDescInput').val('');
            updateRef.push({createdAt: dateString, header: header, subheader: subheader});
            enabled = false;
            viewTableAllowed[activeView] = true;
            console.log("UPDATE THEM DAMMIT");
            $('#updatesFields').fadeOut(250, function() {
                $('#expandUpdates').fadeIn(250);
                toggleTable();
                console.log("IT SHOULD HAVE LOL");
            });
        }
        else if (enabled) {
            alert("Please fill in all of the fields.");
        }
    });
    updateRef.on('child_added', function(snapshot) {
        //response recieved from server
        var message = snapshot.val();
        successfulUpdate();
    });

    //prize additions
    var prizeRef = myDataRef.child("prizes")
    $('#addPrize').click(function() {
        //recieve new values
        var company = $('#prizeCompanyNameInput').val();
        var title = $('#prizeTitleInput').val();
        var desc = $('#prizeDescInput').val();
        var award = $('#prizeAwardInput').val();

        //add the new mentor when fields populated
        if(company != '' && title != '' && desc != '' && award != '') {
            prizeRef.push({award: award, company: company, title: title, description: desc});
            prizeRef.on('child_added', function (snapshot) {
                console.log("Something happened!");
                toggleTable();
            });
            $('#prizeCompanyNameInput').val('');
            $('#prizeTitleInput').val('');
            $('#prizeDescInput').val('');
            $('#prizeAwardInput').val('');
            enabled = false;
            viewTableAllowed[activeView] = true;
            $('#prizesFields').fadeOut(250, function() {
                console.log("Add some prize and get me back!");
                $('#expandPrizes').fadeIn(250);
                toggleTable();
            });
        }
        else if (enabled)
            alert("Please fill in all of the fields.");
    });
    prizeRef.on('child_added', function(snapshot) {
        //response recieved from server
        var message = snapshot.val();
        successfulUpdate();
    });

    //schedule additions
    var scheduleRef = myDataRef.child("schedule")
    $('#addEvent').click(function() {
        //recieve new values
        var header = $('#scheduleNameInput').val();
        var description = $('#scheduleDescInput').val();
        var time = $('#scheduleTimeInput').val();
        var unparsedDate = document.getElementById('scheduleDateInput').valueAsDate;
        var date = weekday[unparsedDate.getDay()] + ", " + month[unparsedDate.getMonth()] + " " + unparsedDate.getDate() + ", " + unparsedDate.getFullYear();
        var location = $('#scheduleLocationInput').val();

        //add the new mentor if fields not empty
        if(date != null && header != '' && description != '' && time != '' && location != '') {
            scheduleRef.child(date).push({header: header, description: description, time: time, location: location, unparsedDate: unparsedDate});
            $('#scheduleNameInput').val('');
            $('#scheduleDescInput').val('');
            $('#scheduleDateInput').val('');
            $('#scheduleTimeInput').val('');
            $('#scheduleLocationInput').val('');
            enabled = false;
            viewTableAllowed[activeView] = true;
            $('#scheduleFields').fadeOut(250, function() {
                toggleTable();
                $('#expandSchedule').fadeIn(250);


            });
        }
        else if (enabled)
            alert("Please fill in all of the fields.");
    });
    scheduleRef.on('child_added', function(snapshot) {
        //response recieved from server
        var message = snapshot.val();
        successfulUpdate();
    });

    $('#buildBTN').click(function() {
        //send a connect to the server indicating build
        var socket = io();

        //send the colors chosen
        //socket.emit('build request');

        // socket.emit('build request', {appName: "POTATO",
        //                               color1: $('#colorMain').val(),
        //                               color2: $('#colorSecondary').val(),
        //                               color3: $('#colorHighlight').val(),
        //                               imageName: "blah.jpg"});
        socket.emit('build request', {appName: "POTATO",
                                      theme: currentTheme,
                                      color: $('#colorPrimary').val(),
                                      bg: bgfinal});

        //reset the colors
        // $('#colorMain').val('');
        // $('#colorSecondary').val('');
        // $('#colorHighlight').val('');
    });

    function successfulUpdate () {}

});
