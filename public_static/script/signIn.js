$(document).ready(function() {
    console.log('Ready');

    $('#button-SignInWithGoogle').on('click', function(){
        console.log('clicked');
        
        onSignInWithGoogle();
    
    });
});
