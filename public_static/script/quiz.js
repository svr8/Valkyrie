var questions = {
    "A": {    
        "id": "0",
        "title": "A",
        "text": "Question0",
        "code_template": "Template",
        "constraints": {
            "var": {
                "lower_bound": "1",
                "name": "N",
                "upper_bound": "10^9"
            },
            "others": [
                'All characters of the string are lowercase.'
            ]
        }
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