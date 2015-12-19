///**
// * Created by Fancy on 2015/12/16 0016.
// */
//
//if ($("label[data-target = '#selection_of_time']").hasClass("active")) {
//    $("label[data-target = '#selection_of_time']").addClass("data-toggle");
//}
//


//var time_selector = $("#selection_of_time");
//var time_trigger = $("label[data-target = '#selection_of_time']");
//time_selector.on("shown.bs.collapse",function() {
//    time_trigger.attr("data-target","");
//    time_trigger.prevAll().click(function () {
//        time_selector.collapse('hide');
//    })
//})
//
//time_selector.on("hidden.bs.collapse",function() {
//    time_trigger.attr("data-target","#selection_of_time");
//})

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

