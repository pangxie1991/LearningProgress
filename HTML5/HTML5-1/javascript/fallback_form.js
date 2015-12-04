/**
 * Created by Fancy on 2015/12/4 0004.
 */
var applyColorPicker = function (){
    $('input[type=color]').simpleColor();
};

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

if (!Modernizr.inputtypes.color) {
    fallback("javascript/jquery.simple-color.js",applyColorPicker);
    applyColorPicker();
}