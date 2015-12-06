/*** Created by Fancy on 2015/12/3 0003.*/
function hasColorSupport(){
    element = document.createElement("input");
    element.setAttribute("type", "color");
    var hasColorType = (element.type === "color");

    if (hasColorType) {
        var testString = "foo";
        element.value = testString;
        hasColorType = (element.value != testString);
    }
    return (hasColorType);
}


var applyColorPicker = function () {
    $('input[type=color]').simpleColor();
};

if (!hasColorSupport()) {
    var script = document.createElement('script');
    script.src = "javascript/jquery.simple-color.js";

    if (script.readyState) {   //使用IE浏览器
        script.onreadystatechange = function () {
            if (this.readyState === 'loaded' || this.readyState === 'complete') {
                script.onreadystatechange = null;
                applyColorPicker();
            }
        };
    } else {
        //使用其他浏览器
        script.onload = applyColorPicker;
    }

    document.getElementsByTagName("head")[0].appendChild(script);
}