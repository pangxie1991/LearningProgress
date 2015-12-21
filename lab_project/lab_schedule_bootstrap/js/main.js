/* Created by Fancy on 2015/12/16 0016.*/
function makeSelectorRight(trigger) {
    var the_selector = $("#" + trigger + "");
    var the_trigger = $("label[data-target = '#" + trigger + "']");
    the_selector.on("shown.bs.collapse", function () {
        the_trigger.attr("data-target", "");
        the_trigger.prevAll().click(function () {
            the_selector.collapse('hide');
        })
    })
    the_selector.on("hidden.bs.collapse", function () {
        the_trigger.attr("data-target", "#" + trigger + "");
    })
}

function getDateString(AddDayCounts) {
    var origin = new Date();
    origin.setDate(origin.getDate() + AddDayCounts);
    var y = origin.getFullYear();
    var m = origin.getMonth() + 1;
    var d = origin.getDate();
    return  y + "." + m + "." + d;
}

makeSelectorRight("selection_of_time");

makeSelectorRight("selection_of_date");

var reservation = $("#reservation");
reservation.on("shown.bs.collapse", function () {
    $(".jumbotron").hide();
})

$("#reservation .btn-danger").click(function () {
    reservation.collapse('hide');
    $(".jumbotron").show();
})

$("#reservation .btn[data-target='#confirm_window']").click(function () {
    var name_active = $("#name_panel label.active span"),
        name_length = name_active.length,
        name_string = "",
        project_active = $("#project_panel label.active span"),
        project_length = project_active.length,
        project_string = "",
        i,
        j = 1;
    for (i = 0; i < name_length; i++) {
        name_string += name_active[i].innerHTML;
        if (i < name_length - 1) {
            name_string += "、";
        }
    }
    if ($("#project_panel label:eq(0)").hasClass("active")){
        if (project_length>1){
            project_string += "磁控溅射："+$("#input_of_sputtering input").val()+" & ";
        }else{
            project_string += "磁控溅射："+$("#input_of_sputtering input").val();
        }

        j+=1;
    }
    if ($("#project_panel label:eq(8)").hasClass("active")){
        if (project_length>1){
            project_string += $("#input_of_experiment input").val()+" & ";
        }else{
            project_string += $("#input_of_experiment input").val();
        }
        j+=1;
    }
    if ($("#project_panel label:eq(15)").hasClass("active")){
        if (project_length>1){
            project_string += $("#input_of_others input").val()+" & ";
        }else{
            project_string += $("#input_of_others input").val();
        }
        j+=1;
    }
    for (i = 0; i<project_length;i++){
        if(project_active[i].innerHTML === "磁控溅射" ||project_active[i].innerHTML === "其他外出实验" ||project_active[i].innerHTML === "其他事宜"){
            continue;
        }
        project_string += project_active[i].innerHTML;
        if (i<project_length-j){
            project_string += " & ";
        }
    }
    $(".modal-body tr:eq(1)").children()[1].innerHTML = project_string;
    $(".modal-body tr:eq(4)").children()[1].innerHTML = name_string;
    if ($("#time_panel label.btn:eq(4)").hasClass("active")) {
        $(".modal-body tr:eq(2)").children()[1].innerHTML = getDateString(0);
    }if ($("#time_panel label.btn:eq(5)").hasClass("active")){
        $(".modal-body tr:eq(2)").children()[1].innerHTML = getDateString(1);
    }if ($("#time_panel label.btn:eq(6)").hasClass("active")){
        $(".modal-body tr:eq(2)").children()[1].innerHTML = $("#dtp_input2").val()+" 到 "+$("#dtp_input3").val();
    }
    if ($("#time_panel label.btn:eq(0)").hasClass("active")){
        $(".modal-body tr:eq(3)").children()[1].innerHTML = "9:00~11:00";
    }if ($("#time_panel label.btn:eq(1)").hasClass("active")){
        $(".modal-body tr:eq(3)").children()[1].innerHTML = "14:30~17:00";
    }if ($("#time_panel label.btn:eq(2)").hasClass("active")){
        $(".modal-body tr:eq(3)").children()[1].innerHTML = "全天";
    }if ($("#time_panel label.btn:eq(3)").hasClass("active")){
        $(".modal-body tr:eq(3)").children()[1].innerHTML = $("#dtp_input4").val()+"~"+$("#dtp_input5").val();
    }
})



