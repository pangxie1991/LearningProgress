/***
bad book sample
***/


if (!Modernizr.input.autofocus){
    $('input[autofocus]').focus();
}

if(!Modernizr.inputtypes.color){
    jQuery.getScript("javascripts/jquery.simple-color.js")
        .done(function() {
            $('input[type=color]').simpleColor();
        });
}
