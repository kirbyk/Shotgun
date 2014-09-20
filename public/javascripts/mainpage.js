$(document).ready(function() {

    var myDataRef = new Firebase('https://easy-app.firebaseio.com/');

    //mentor additions
    var mentorRef = myDataRef.child("mentors")
    $('#addMentor').click(function() {
        //recieve new values
        var company = $('#mentorCompanyInput').val();
        var name = $('#mentorNameInput').val();
        var skills = $('#mentorDescriptionInput').val();

        //add the new mentor
        mentorRef.child(company).push({name: name, skills: skills});
        $('#mentorNameInput').val('');
        $('#mentorCompanyInput').val('');
        $('#mentorDescriptionInput').val('');
    });
    mentorRef.on('child_added', function(snapshot) {
        //response recieved from server
        var message = snapshot.val();
        $("#mentorUpdate").html("Successful!");
        setTimeout(function(){$("#mentorUpdate").html("");},3000)
    });

    //update additions
    var updateRef = myDataRef.child("updates")
    $('#addUpdate').click(function() {
        //recieve new values
        var header = $('#updateHeader').val();
        var subheader = $('#updateSubHeader').val();

        var currentDate = new Date();
        var dateString = (currentDate.getHours()%12.0) + ":" + currentDate.getMinutes();
        if(currentDate.getHours() > 12.0)
            dateString += " pm";
        else
            dateString += " am";

        //add the new mentor
        updateRef.push({createdAt: dateString, header: header, subheader: subheader});
        $('#updateHeaderInput').val('');
        $('#updateSubHeaderInput').val('');
    });
    updateRef.on('child_added', function(snapshot) {
        //response recieved from server
        var message = snapshot.val();
        $("#updateUpdate").html("Successful!");
        setTimeout(function(){$("#updateUpdate").html("");},3000)
    });

    $('#buildBTN').click(function() {
        //send a connect to the server indicating build
        var socket = io();
        socket.emit('build request');
    });
});

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
