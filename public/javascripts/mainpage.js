var activeView = 0;
var views = [
    '#mainInput',
    '#updatesInput',
    '#mentorsInput',
    '#prizesInput',
    '#scheduleInput'
];

$(document).ready(function() {


    $('#main').click(function(event) {
        $(views[activeView]).fadeOut(250, function() {//'#updatesInput, #mentorsInput, #prizesInput, #scheduleInput'
            activeView = 0;
            $('#mainInput').fadeIn(250);
        });
    });
    $('#updates').click(function(event) {
        $(views[activeView]).fadeOut(250, function() { //'#mainInput, #mentorsInput, #prizesInput, #scheduleInput'
            activeView = 1;
            $('#updatesInput').fadeIn(250);
        });
    });
    $('#mentors').click(function(event) {
        $(views[activeView]).fadeOut(250, function() {//'#updatesInput, #mainInput, #prizesInput, #scheduleInput'
            activeView = 2;
            $('#mentorsInput').fadeIn(250);
        });
    });
    $('#prizes').click(function(event) {
        $(views[activeView]).fadeOut(250, function() {//'#updatesInput, #mentorsInput, #mainInput, #scheduleInput'
            activeView = 3;
            $('#prizesInput').fadeIn(250);
        });
    });
    $('#schedule').click(function(event) {
        $(views[activeView]).fadeOut(250, function() {//'#updatesInput, #mentorsInput, #prizesInput, #mainInput'
            activeView = 4;
            $('#scheduleInput').fadeIn(250);
        });
    });



    var myDataRef = new Firebase('https://easy-app.firebaseio.com/');

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
        }
        else
            alert("Please fill in all of the fields.");
    });
    mentorRef.on('child_added', function(snapshot) {
        //response recieved from server
        var message = snapshot.val();
        successfulUpdate();
    });

    //update additions
    var updateRef = myDataRef.child("updates")
    $('#addUpdate').click(function() {
        //recieve new values
        var header = $('#updateNameInput').val();
        var subheader = $('#updateDescInput').val();

        var currentDate = new Date();
        var dateString = (currentDate.getHours()%12.0) + ":" + currentDate.getMinutes();
        if(currentDate.getHours() > 12.0)
            dateString += " pm";
        else
            dateString += " am";

        //add the new mentor if fields not empty
        if(header != '' && subheader != '') {
            updateRef.push({createdAt: dateString, header: header, subheader: subheader});
            $('#updateNameInput').val('');
            $('#updateDescInput').val('');
        }
        else
            alert("Please fill in all of the fields.");
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
            $('#prizeCompanyNameInput').val('');
            $('#prizeTitleInput').val('');
            $('#prizeDescInput').val('');
            $('#prizeAwardInput').val('');
        }
        else
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
        var location = $('#scheduleLocationInput').val();

        //add the new mentor if fields not empty
        if(header != '' && description != '' && time != '' && location != '') {
            scheduleRef.push({header: header, description: description, time: time, location: location});
            $('#scheduleNameInput').val('');
            $('#scheduleDescInput').val('');
            $('#scheduleTimeInput').val('');
            $('#scheduleLocationInput').val('');
        }
        else
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
        socket.emit('build request');
        // socket.emit('build request', {appName: "POTATO",
        //                               color1: $('#colorMain').val(),
        //                               color2: $('#colorSecondary').val(),
        //                               color3: $('#colorHighlight').val(),
        //                               imageName: "blah.jpg"});

        //reset the colors
        // $('#colorMain').val('');
        // $('#colorSecondary').val('');
        // $('#colorHighlight').val('');
    });

    //handle image loading (logo)
    function handleFileSelect(evt) {
        console.log("In handle");
        var f = evt.target.files[0];
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            console.log("In load");
            return function(e) {
                var filePayload = e.target.result;
                var imageLocation = myDataRef.child('/logoImage');
                console.log("In sending!!");


                document.getElementById("logo").src = e.target.result;

                imageLocation.set(filePayload, function() {
                    console.log("BONSAI");

                    document.getElementById("logo").src = e.target.result;
                    //$('#file-upload').hide();
                });
            };
        })(f);
        reader.readAsDataURL(f);
    }

    function successfulUpdate() {
        console.log("Application updated");
        //add later a green fade in.
        $('#updateField').val('Application Update Successful!');
        $('#updateField').fadeIn(250, function() {
            $('#updateField').fadeOut(30000);
        });
    }
});
