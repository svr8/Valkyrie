$(document).ready(function(){

    //Dashboard links
    $("#sidebar-student-details").on('click', function() { console.log('Redirect to student-details'); });
    $("#sidebar-home").on('click', function() { console.log('Redirect to home'); });
    $("#sidebar-settings").on('click', function() { console.log('Redirect to settings'); });

    var el = $('#container-mainBody');
    $(el).css('width', $(window).width() - 200 );

    el = $('#container-quizList');
    $(el).css('height', $(window).height() - $('#container-analytics').height());

    $('.QuizList').css('width', ($('#container-quizList').width() / 2)-10 );
    $('.QuizList').css('height', $('#container-quizList').height()  );

    // TODO: Make quiz list scrollable on overflow

    var user=firebase.auth().currentUser; 
    console.log(user);

});


