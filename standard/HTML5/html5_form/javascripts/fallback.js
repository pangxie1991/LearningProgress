
if (!Modernizr.input.placeholder){
    jQuery.getScript("javascripts/jquery.placeholder.js").done(function (){
        $('input[placeholder]').placeholder();
    });
}


