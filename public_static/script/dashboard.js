var quiz_all = [
    //  {
    //     "quiz_number": "32",
    //     "questions": [],
    //     "quiz_start_date": "2018-01-01T00:00:00+05:30",
    //     "quiz_end_date": "2018-01-01T00:30:00+05:30",
    // },
    // {
    //     "quiz_number": "32",
    //     "questions": [],
    //     "quiz_start_date": "2018-01-01T00:00:00+05:30",
    //     "quiz_end_date": "2018-01-01T00:30:00+05:30",
    // },
    // {
    //     "quiz_number": "32",
    //     "questions": [],
    //     "quiz_start_date": "2018-01-01T00:00:00+05:30",
    //     "quiz_end_date": "2018-01-01T00:30:00+05:30",
    // },
    {
        "questions": []
    },
    {
        "questions": []
    }
];

var quiz_active = [];
var quiz_upcoming = [];

$(document).ready(function(){
    // FIREBASE: Get Quiz List
    for(var i=0;i<quiz_all.length;i++) {
        quiz_active.push(quiz_all[i]);
        loadQuizItem($('#quizList-active'), quiz_active[i]);
    }

    /*
    // Convert Date String into Date Object
    for( var i in quiz_all) { 
        quiz_all[i].quiz_start_date = new Date(quiz_all[i].quiz_start_date);
    }

    // Sort Quizzes according in non-decreaseing order of date and time
    quiz_all.sort(function(a, b) {
        return a<b ? -1 : (a>b ? 1 : 0) ;
    });

    // Separate active, upcoming quizzes
    // TODO: Apply binary search instead of linear search
    var currentDate = new Date();
    for( var i in quiz_all) {
        if(quiz_all[i].quiz_end_date<currentDate) continue;
        else if(quiz_all[i].start_date<currentDate) quiz_active.push(quiz_all[i]);
        else quiz_upcoming.push(quiz_all[i]);
    }
    */
    
    //Dashboard links
    $("#sidebar-student-details").on('click', function() { console.log('Redirect to student-details'); });
    $("#sidebar-home").on('click', function() { console.log('Redirect to home'); });
    $("#sidebar-settings").on('click', function() { console.log('Redirect to settings'); });

    //Resize main body
    var el = $('#container-mainBody');
    $(el).css('width', $(window).width() - 200 );

    //Set size of each quizList
    $('.QuizList').css('width', ($('#container-quizList').width() / 2)-10 );
    // $('.QuizList').css('height', $('#container-quizList').height()  );

    // TODO: Make quiz list scrollable on overflow

    //Firebase
    var user=firebase.auth().currentUser; 
    console.log(user);

});

function loadQuizItem(parent, quiz) {
    $(parent).append( getQuizListItemHTML(quiz) );

    $('.QuizList-Item').last().on('click', function() {
        //Redirect to quiz.html and Pass quiz.questions        
    });
}
function getQuizListItemHTML(quiz) {
    return '<div class="QuizList-ItemContainer">' +
              '<div class="QuizList-Item"> Quiz </div>'+
            '</div>';
}


