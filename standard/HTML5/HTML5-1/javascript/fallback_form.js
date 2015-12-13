/**
 * Created by Fancy on 2015/12/4 0004.
 */



/*
function fallback (path,onload) {
    var script = document.createElement('script');
    script.src = path;
    document.getElementsByTagName("head")[0].appendChild(script);
    if (script.readyState) {   //使用IE浏览器
        script.onreadystatechange = function () {
            if (this.readyState === 'loaded' || this.readyState === 'complete') {
                script.onreadystatechange = null;
                onload();
            }
        };
    } else {
        //使用其他浏览器
        script.onload = onload;
    }
}

a function to load a selected js written by fancy

if (!Modernizr.inputtypes.color) {
    fallback("javascript/jquery.simple-color.js",applyColorPicker);
    applyColorPicker();
}

fallback of inputtypes.color with the function above

*/

/*

yepnope.js已经被弃用，所以modernizr.load方法已经在新版Modernizr中失去支持.

Modernizr.load(
    {
        test: Modernizr.color,
        nope: "javascript/jquery.simple-color.js",
        callback: function(url, result){
            if (!result){
                applyColorPicker();
            }
        }
    }
);

*/
//function appendjs (src) {
//    var js = document.createElement("script");
//    js.src = src;
//    document.body.appendChild(js);
//}
//if (!Modernizr.inputtypes.color){
//    appendjs("javascript/jquery.simple-color.js");
//    $('input[type=color]').simpleColor();
//}

if (!Modernizr.input.autofocus){
    $('input[autofocus]').focus();
}

if (!Modernizr.inputtypes.color){
    jQuery.getScript("javascript/jquery.simple-color.js")
        .done(function () {
           $('input[type=color]').simpleColor();
        });
}


