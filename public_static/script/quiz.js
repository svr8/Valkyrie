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
    //    "input": "",
    //    "output": "",
    //     "sample_input": "Text",
    //     "sample_output": "Text",
    //     "code_template": "Code Snippet",
    // },


var questions = {
    '0': {   
        "title": "A",
        "text": "Question A",
        "constraints": {
            "var": [
                {
                    "lower_bound": "1",
                    "name": "N",
                    "upper_bound": "10^9"
                }
            ],
            "other": [
                'All characters of the string are lowercase.'
            ]
        },
        "input": "",
        "output": "",
        // "sample_input": "BALLE",
        // "sample_output": "SHAVA",
        "code_template": "Template 0",
    },
    "1": {   
        "title": "B",
        "text": "Question B",
        "constraints": {
            "var": [
                {
                    "lower_bound": "1",
                    "name": "N",
                    "upper_bound": "10^9"
                }
            ],
            "other": [
                'All characters of the string are lowercase.'
            ]
        },
        "input": "",
        "output": "",
        // "sample_input": "BALLE",
        // "sample_output": "SHAVA",
        "code_template": "Template 1",
    },
};
var selectedQuestionID = '';

$(document).ready(function(){

    // FIREBASE: Load questions
    var quizID=localStorage.getItem("currentQuiz");
    console.log(quizID);


    //Hide quiz
    $('#content-question').hide();
    $('#content-solution').hide();

    //Start Quiz Button Event Listener
    $('#content-startBtn').on('click', function() {
        startQuiz();
    });

    //TEMP
    startQuiz();

    //Reisize $( #content-wrap )
    $('#content-wrap').css('width', $(document).width() - $('#sidebar').width()-210);    
    $('#content-wrap').css('left', $('#sidebar').width());    

   
});

function startQuiz() {
    console.log('Quiz has Started');

    //Hide start button
    $('#content-startBtn').hide();

    //Load Questions, Solution
    var flag = true;
    for( var i in questions) {
        //Question
        loadQuestion(questions[i], i);
        if(flag) { selectQuestionTab(questions[i]); flag=false; }
        
        //Solution
        loadSolution(questions[i], i);
    }

    // Make question block scrollable if needed
    var element = document.getElementById('sidebar-container-questions');
    if(isElementOverflowY( element )) setElementScrollableY( element );
}

// QUESTION UTILS

function loadQuestion(question, id) {
    console.log('Loading Question: '+id);
    
    //Load Sidebar Tab
    $("#sidebar-container-questions").append(
        getQuestionTabHTML(question, id)
    );

    //Add onClick event listener
    $('#sidebar-question-'+id).on('click', function() {
        console.log('Question Tab: '+ id+ ' CLICKED');
        selectQuestionTab(question, id);
    });
}

function selectQuestionTab(question, id) {
    
    //Toggle CSS of selected tabs
    //Last selected tab
    setHoverColor($('#sidebar-question-'+selectedQuestionID), 'transparent', '#545454');
    setHoverColor($('#sidebar-solution-'+selectedQuestionID), 'transparent', '#545454');
    
    //Current selected Tab
    selectedQuestionID = id;
    setHoverColor($('#sidebar-question-'+selectedQuestionID), '#545454', '#545454');
    
    // Toggle Question, code editor
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
    $('#question-description').html(question.text);

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

function getQuestionTabHTML(question, id) {
    return '<div id="sidebar-question-'+ id+ '" class="Sidebar-Option">'+ question.title+ '</div>';
}

// SOLUTION UTILS

function loadSolution(question , id) {
    console.log('Loading Solution: '+id);
    
    //Load Sidebar Tab
    $("#sidebar-container-solutions").append(
        getSolutionTabHTML(question, id)
    );

    //Load Editor
    loadEditor(id, question.code_template);

    //Add onClick Event listener
    $('#sidebar-solution-'+id).on('click', function() {
        console.log('Solution Tab: '+ id+ ' CLICKED');
        selectSolutionTab(id);
    });

}

function selectSolutionTab(id) {

    //Toggle CSS of selected tabs
    //Last selected tab
    setHoverColor($('#sidebar-question-'+selectedQuestionID), 'transparent', '#545454');
    setHoverColor($('#sidebar-solution-'+selectedQuestionID), 'transparent', '#545454');

    
    //Hide previously selected editor
    $('#editor-'+selectedQuestionID).hide();

    //Current Selected Tab
    selectedQuestionID = id;
    setHoverColor($('#sidebar-solution-'+selectedQuestionID), '#545454', '#545454');

    // Toggle Question, code editor
    $('#content-solution').show();
    $('#content-question').hide();


    //Display Question Details in $( #content-solution )
    displaySolution(selectedQuestionID);
}

function displaySolution(id) {
    $('#editor-'+id).show();
}

function getSolutionTabHTML(question, id) {
    return '<div id="sidebar-solution-'+ id+ '" class="Sidebar-Option">'+ question.title+ '</div>';
}
