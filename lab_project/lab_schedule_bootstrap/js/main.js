/* Created by Fancy on 2015/12/16 0016.*/
function doSelectorRight(trigger) {
    var the_selector = $("#"+trigger+"");
    var the_trigger = $("label[data-target = '#" + trigger + "']");
    the_selector.on("shown.bs.collapse", function () {
        the_trigger.attr("data-target", "");
        the_trigger.prevAll().click(function () {
            the_selector.collapse('hide');
        })
    })
    the_selector.on("hidden.bs.collapse", function () {
        the_trigger.attr("data-target", "#"+trigger+"");
    })
}

doSelectorRight("selection_of_time");

doSelectorRight("selection_of_date");

var reservation = $("#reservation");
reservation.on("shown.bs.collapse",function () {
    $(".jumbotron").hide();
})

$(".btn-danger").click(function () {
    reservation.collapse('hide');
    $(".jumbotron").show();
})

