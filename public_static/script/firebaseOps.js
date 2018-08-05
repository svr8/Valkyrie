function initializeFirebase()
{
var config = {
    apiKey: "AIzaSyD1H8pGZ6hrj7SsB5_JS175gu6UHvAXNDU",
    authDomain: "valkyrie-muj.firebaseapp.com",
    databaseURL: "https://valkyrie-muj.firebaseio.com",
    projectId: "valkyrie-muj",
    storageBucket: "valkyrie-muj.appspot.com",
    messagingSenderId: "256721948000"
    };
    firebase.initializeApp(config);
}


function onSignInWithGoogle() {
    console.log('SignInWithGoogle Pressed');
    
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        //console.log(user)
        // ...
        if(user) { 
            
            console.log('Sign In Successfull'); 
           
    
    
    }
        else { console.log('Sign In Failed'); }

        }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}



