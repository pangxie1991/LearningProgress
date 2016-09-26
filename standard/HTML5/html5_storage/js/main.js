/**
 * Created by fancy on 15-12-13.
 */
//localStorage.setItem("background_color",$("#background_color").val());
//var bgcolor = localStorage.getItem("background_color");

var apply_preferences_to_page = function () {
    $("body").css("backgroundColor",$("#background_color").val());
    $("body").css("color",$("#text_color").val());
    $("body").css("fontSize",$("#text_size").val());
}

var save_settings = function () {
    localStorage.setItem("background_color",$("#background_color").val());
    localStorage.setItem("text_color",$("#text_color").val());
    localStorage.setItem("text_size",$("#text_size").val());

    apply_preferences_to_page();
}

var load_settings = function (){
    var bgcolor = localStorage.getItem("background_color");
    var text_color = localStorage.getItem("text_color");
    var text_size = localStorage.getItem("text_size");

    $("#background_color").val(bgcolor);
    $("text_color").val(text_color);
    $("text_size").val(text_size);

    apply_preferences_to_page();
}

load_settings();

$("form#preferences").submit(function (event){
    event.preventDefault();
    save_settings();
});