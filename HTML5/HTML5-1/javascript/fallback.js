/**
 * Created by Fancy on 2015/11/23 0023.
 */
var noMeterSupport = function(){
    return(document.createElement("meter").max === undefined);
}
if(noMeterSupport()){
    var fakeMeter, fill, label,  labelText, max, meter, value;
    meter = $("#clock_tiking");
    value = meter.attr("value");
    max = meter.attr("max");
    labelText = 65-meter.val();                      //取得meter的value值
    console.log(labelText);
    fakeMeter = $("<div></div>");
    fakeMeter.addClass("meter");
    label = $("<span>"+labelText+"</span>");
    label.addClass("label");

    fill = $("<div></div>");
    fill.addClass("fill");
    fill.css("width",(value/max*100)+"%");
    fill.append("<div style='clear:both;'><br/></div>");
    fakeMeter.append(fill);
    fakeMeter.append(label);
    meter.replaceWith(fakeMeter);
}