/**
 * Created by fancy on 15-12-13.
 */
$("#edit_profile_link").hide();
var status = $("#status");
$("span[contenteditable]").blur(function (){
    var field = $(this).attr("id"),
        value = $(this).text(),
        resourceURL = $(this).closest("ul").attr("data-url");
    $.ajax({
        url: resourceURL,
        dataType: "json",
        method: "PUT",
        data: field + "=" + value,
        success: function (data) {
            status.html("the record was saved");
        },
        error: function (data) {
            status.html("the record failed to save");
        }
    });
});

/*
*暂时还不懂AJAX的作用原理
*慢慢来吧
*/
