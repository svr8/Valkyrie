
$(document).ready(function() {
    $('#sidebar-logoutBtn').on('click', function() {
        console.log('Button Pressed: Logout');
    });
});

function setHoverColor(el, defaultColor, hoverColor) {
    $(el).css('background-color', defaultColor);
    $(el).on('mouseenter', function(){
        $(this).css('background-color', hoverColor);
    });
    $(el).on('mouseleave', function(){
        $(this).css('background-color', defaultColor);
    });
}


function isElementOverflowY(element) {
    return (element.offsetHeight < element.scrollHeight) ;
}

function setElementScrollableY(element) {
    $(element).css('overflow-y', 'scroll');
}