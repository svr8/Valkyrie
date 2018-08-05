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
        "input": {}
    },
};

var selectedQuestionID = '';

$(document).ready(function(){
    //Question Links
    for( var i in questions) loadQuestion(questions[i]);
    
    // //Solution Links
    // for(var i=0;i<n;i++) {
    //     $("sidebar-solutionIndex").on('click', function(){ console.log('Solution Index Pressed'); });
    // }
});

// question is a JSON Object with following structure:
// {
//      "id":   "XYZ",
//      "title": "XYZ",
//      "text": "XYZ",
//      "code_template": "XYZ"
// }
function loadQuestion(question) {
    console.log('Loading Question: '+question.id);
    $("#sidebar-container-questions").append(
        getQuestionTabHTML(question)
    );

    $('#sidebar-question-'+question.id).on('click', function() {
        console.log('Question Tab: '+ question.id+ ' CLICKED');
        selectQuestionTab(question);
    });
}

function renderQuestionTab(question, callback) {
    
}

function selectQuestionTab(question) {
    // Set background color of previously selected tab to DEFAULT
    $('#sidebar-question-'+selectedQuestionID).css("background-color", "#36C7DA");

    // Set background color of selected tab to SELECTED
    $('#sidebar-question-'+question.id).css("background-color", "#63D5E4");
    
    // Hide code editor
    $('#content-solution').hide();

    displayQuestion(question);

    $('#content-question').show();
}

function displayQuestion(question) {

    //If previously selected tab was a SOLUTION TAB
    $('.content-solution').hide();

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