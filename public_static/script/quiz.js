var questions = {
    "A": {    
        "id": "0",
        "title": "A",
        "text": "Question0",
        "code_template": "Template",
        "time_limit": "1s"
    },
    "B": {
        "id": "1",
        "title": "B",
        "text": "Question1",
        "code_template": "Template"
    },
    "C": {
        "id": "1",
        "title": "C",
        "text": "Question1",
        "code_template": "Template"
    },

};


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
    console.log(question.id);
    $("#sidebar-container-questions").append(
        '<div id="sidebar-"'+ question.id+ ' class="Sidebar-Option">'+ question.title+ '</div>'
    );
}