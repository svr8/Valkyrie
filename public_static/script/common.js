function setHoverColor(el, defaultColor, hoverColor) {
    $(el).css('background-color', defaultColor);
    $(el).on('mouseenter', function(){
        $(this).css('background-color', hoverColor);
    });
    $(el).on('mouseleave', function(){
        $(this).css('background-color', defaultColor);
    });
}