var questions = {
    "A": {    
        "id": "0",
        "title": "A",
        "description": "Question0",
        "constraints": {
            "var": {
                "0": {
                    "lower_bound": "1",
                    "name": "N",
                    "upper_bound": "10^9"
                }
            },
            "other": [
                'All characters of the string are lowercase.'
            ]
        },
       
        "sample_input": "BALLE",
        "sample_output": "SHAVA",
        "code_template": "Template",
    },
    "B": {    
        "id": "1",
        "title": "B",
        "description": "Question1",
        "constraints": {
            "var": {
                "0": {
                    "lower_bound": "1",
                    "name": "N",
                    "upper_bound": "10^9"
                }
            },
            "other": [
                'All characters of the string are lowercase.'
            ]
        },
       
        "sample_input": "balle",
        "sample_output": "shava",
        "code_template": "Template",
    }
};

var selectedQuestionID = '';

$(document).ready(function(){
    //Hide quiz
    $('#content-question').hide();
    $('#content-solution').hide();

    $('#content-startBtn').on('click', function() {
        startQuiz();
    });

    //Reisize Body
    $('#content-wrap').css('width', $(document).width() - $('#sidebar').width()-210);    
    $('#content-wrap').css('left', $('#sidebar').width());    

   
});

function startQuiz() {
    console.log('Quiz has Started');

    //Load Questions
    var flag = true;
    for( var i in questions) {
        loadQuestion(questions[i]);
        if(flag) { selectQuestionTab(questions[i]); flag=false; }
    }

    // Load Editors
    // for(var i=0;i<n;i++) {
    //     $("sidebar-solutionIndex").on('click', function(){ console.log('Solution Index Pressed'); });
    // }
}

// question is a JSON Object with following structure:
    //  {    
    //     "id": "someQuestionID",
    //     "title": "A",
    //     "description": "Question0",
    //     "constraints": {
    //         "var": {
    //             "0": {
    //                 "lower_bound": "1",   |
    //                 "name": "N",          |--> Equivalent to lower_bound < name < upper_bound
    //                 "upper_bound": "10^9" |
    //             }
    //         },
    //         "other": [
    //             'String description'
    //         ]
    //     },
    // 
    //     "sample_input": "Text",
    //     "sample_output": "Text",
    //     "code_template": "Code Snippet",
    // },

function loadQuestion(question) {
    console.log('Loading Question: '+question.id);
    
    //Load HTML Structure
    $("#sidebar-container-questions").append(
        getQuestionTabHTML(question)
    );

    //Add onClick event listener
    $('#sidebar-question-'+question.id).on('click', function() {
        console.log('Question Tab: '+ question.id+ ' CLICKED');
        selectQuestionTab(question);
    });
}

function selectQuestionTab(question) {

    //Toggle CSS of selected tabs
    setHoverColor($('#sidebar-question-'+selectedQuestionID), '#36C7DA', '#63D5E4');
    selectedQuestionID = question.id;
    setHoverColor($('#sidebar-question-'+selectedQuestionID), '#63D5E4', '#63D5E4');
    
    // Toggle Question code editor
    $('#content-solution').hide();
    $('#content-question').show();

    //Display Question Details in $( #content-question )
    displayQuestion(question);

}

function displayQuestion(question) {

    //If previously selected tab was a SOLUTION TAB
    $('#content-solution').hide();

    //Show question layout
    $('#content-question').show();

    //Set Title
    $('#question-title').html(question.title);

    //Set Description
    $('#question-description').html(question.description);

    //Set Constraints
    var constraint, constraintsLength;

    //-Clear Constraints
    $('#question-constraints').html('');
    
    //-Set variable constraints
    constraint = question.constraints.var;
    constraintsLength = Object.keys(constraint).length;
    for(var i=0; i<constraintsLength; i++) 
        $('#question-constraints').append(getVariableConstraintHTML(constraint[i]));

    //Set other constraints
    constraint = question.constraints.other;
    constraintsLength = Object.keys(constraint).length;
    for(var i=0; i<constraintsLength; i++) 
        $('#question-constraints').append(getOtherConstraintHTML(constraint[i]));
    
    //Set Sample Input
    $("#question-sampleInput").html(question.sample_input);

    //Set Sample Output
    $("#question-sampleOutput").html(question.sample_output);
}

function getVariableConstraintHTML(constraint) {

    return '<div class="constraints-item">'+ 
                '<div class="constraints-lower_bound">'+constraint.lower_bound+'&lt;</div>'+
                '<div class="constraints-name">'+constraint.name+'&lt;</div>'+
                '<div class="constraints-upper_bound">'+constraint.upper_bound+'</div>'+
           '</div>';
}

function getOtherConstraintHTML(constraint) {
    return '<div class="constraints-item'+
                '<div class="constraints-other">'+ constraint + '</div>'+
           '</div>';
}

function getQuestionTabHTML(question) {
    return '<div id="sidebar-question-'+ question.id+ '" class="Sidebar-Option">'+ question.title+ '</div>';
}