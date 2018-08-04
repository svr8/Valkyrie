$(document).ready(function(){

    //Dashboard links
    $("#sidebar-student-details").on('click', function() { console.log('Redirect to student-details'); });
    $("#sidebar-home").on('click', function() { console.log('Redirect to home'); });
    $("#sidebar-settings").on('click', function() { console.log('Redirect to settings'); });

    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log(user);
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
});


constraints:[var, ...]
