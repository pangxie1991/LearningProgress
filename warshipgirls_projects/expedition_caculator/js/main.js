/**
 * Created by Fancy on 2015/12/27 0027.
 */

function expedition(chapter, code, name, fule, ammunition, steel, aluminum, experience, grade, number, require, time, reward, probability) {
    this.chapter = chapter;
    this.code = code;
    this.name = name;
    this.fule = fule;
    this.ammunition = ammunition;
    this.steel = steel;
    this.aluminum = aluminum;
    this.experience = experience;
    this.grade = grade;
    this.number = number;
    this.require = require;
    this.time = time;
    this.reward = reward;
    this.probabilty = probability;
}

expedition.prototype = {
    constructor: expedition,
    getRewardName: function () {
        switch (this.reward) {
            case 0:
                return "none";
            case 1:
                return "快速修理";
            case 2:
                return "快速建造";
            case 3:
                return "舰船蓝图";
            case 4:
                return "装备蓝图";
        }
    }
}

var expedition_1_1 = new expedition(1, 1, "航海训练", 0, 30, 0, 0, 10, 1, 2, "none", 15, 0, [0, 0, 0]);
var expedition_1_2 = new expedition(1, 2, "长距离航海训练", 0, 30, 30, 0, 20, 2, 3, "1DD", 30, 1, [0.7, 0.3, 0]);
var expedition_1_3 = new expedition(1, 3, "警备任务", 30, 30, 30, 0, 30, 3, 4, "2DD", 30, 0, [0, 0, 0]);
var expedition_1_4 = new expedition(1, 4, "对潜警戒", 0, 100, 0, 0, 40, 5, 4, "2DD", 60, 2, [0.6, 0.3, 0.1]);

$(document).ready(function () {
    $("#firstfleet button").click(function (event) {
        event.preventDefault();
        if($(this).hasClass("active")){
            $("#firstfleet button").removeClass("active");
        } else {
            $("#firstfleet button").removeClass("active");
            $(this).addClass("active");
        }
    });
});
