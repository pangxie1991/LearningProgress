/**
 * Created by Fancy on 2015/12/27 0027.
 */

(function () {
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

    var expeditionAll = [],
        e_1_1 = new expedition(1, 1, "航海训练", 0, 30, 0, 0, 10, 1, 2, "none", 15, 0, [0, 0, 0]),
        e_1_2 = new expedition(1, 2, "长距离航海训练", 0, 30, 30, 0, 20, 2, 3, "1DD", 30, 1, [0.7, 0.3, 0]),
        e_1_3 = new expedition(1, 3, "警备任务", 30, 30, 30, 0, 30, 3, 4, "2DD", 30, 0, [0, 0, 0]),
        e_1_4 = new expedition(1, 4, "对潜警戒", 0, 100, 0, 0, 40, 5, 4, "2DD", 60, 2, [0.6, 0.3, 0.1]),
        e_2_1 = new expedition(2, 1, "海上护卫", 150, 175, 20, 20, 50, 5, 5, "1CL2DD", 120, 3, [0.7, 0.3, 0]),
        e_2_2 = new expedition(2, 2, "防空演习", 0, 0, 0, 75, 60, 10, 4, "2CL", 45, 0, [0, 0, 0]),
        e_2_3 = new expedition(2, 3, "观舰仪式演练", 0, 0, 50, 30, 70, 10, 6, "none", 60, 4, [0.5, 0.4, 0.1]),
        e_2_4 = new expedition(2, 4, "观舰仪式", 50, 100, 50, 50, 80, 10, 6, "none", 180, 1, [0.5, 0.5, 0]),
        e_3_1 = new expedition(3, 1, "护卫任务", 350, 0, 0, 0, 90, 15, 4, "2DD", 240, 4, [0.5, 0.5, 0]),
        e_3_2 = new expedition(3, 2, "强行侦查", 50, 0, 50, 30, 100, 20, 4, "1DD", 90, 2, [0.7, 0.3, 0]),
        e_3_3 = new expedition(3, 3, "铝材运输", 0, 0, 0, 250, 110, 8, 4, "1CA", 300, 0, [0, 0, 0]),
        e_3_4 = new expedition(3, 4, "资源运输", 50, 250, 200, 50, 120, 12, 4, "1CA", 480, 3, [0.5, 0.5, 0]),
        e_4_1 = new expedition(4, 1, "技术运输行动", 240, 300, 0, 0, 130, 20, 6, "4DD", 240, 1, [0.5, 0.5, 0]),
        e_4_2 = new expedition(4, 2, "支援陆战队撤退", 0, 240, 200, 0, 140, 30, 6, "2CL2DD", 360, 2, [0.3, 0.7, 0]),
        e_4_3 = new expedition(4, 3, "支援机动部队", 0, 0, 300, 400, 150, 20, 6, "2CL", 720, 3, [0.2, 0.6, 0.2]),
        e_4_4 = new expedition(4, 4, "援护舰队行动", 0, 200, 0, 90, 160, 30, 4, "none", 210, 0, [0, 0, 0]),
        e_5_1 = new expedition(5, 1, "索敌侦查行动", 120, 0, 0, 120, 170, 25, 4, "3DD", 120, 2, [0.5, 0.5, 0]),
        e_5_2 = new expedition(5, 2, "航空机输送行动", 0, 0, 0, 180, 180, 25, 6, "1CVL2DD", 300, 4, [0.6, 0.4, 0]),
        e_5_3 = new expedition(5, 3, "地中海行动", 60, 80, 0, 0, 190, 40, 6, "1BB2DD", 60, 0, [0, 0, 0]),
        e_5_4 = new expedition(5, 4, "驱逐舰哨位任务", 0, 0, 200, 0, 200, 50, 6, "6DD", 120, 1, [0.3, 0.6, 0.1]),
        e_6_1 = new expedition(6, 1, "补给航线护卫", 800, 0, 0, 0, 210, 45, 6, "1CL3DD", 540, 0, [0, 0, 0]),
        e_6_2 = new expedition(6, 2, "主力舰队演习", 0, 200, 200, 0, 220, 50, 6, "1BB", 180, 3, [0.5, 0.5, 0]),
        e_6_3 = new expedition(6, 3, "航母编队演习", 200, 0, 0, 100, 230, 50, 6, "1BBV", 240, 3, [0.3, 0.6, 0.1]),
        e_6_4 = new expedition(6, 4, "莱茵演习", 0, 1000, 0, 0, 240, 50, 4, "2CA2DD", 720, 4, [0, 1, 0]);

    expeditionAll.push(e_1_1, e_1_2, e_1_3, e_1_4, e_2_1, e_2_2, e_2_3, e_2_4, e_3_1, e_3_2,
        e_3_3, e_3_4, e_4_1, e_4_2, e_4_3, e_4_4, e_5_1, e_5_2, e_5_3, e_5_4, e_6_1, e_6_2,
        e_6_3, e_6_4);
    window.expeditionAll = expeditionAll;
})();       //expedition object to an array

function radioLogic(btngroup, selection) {
    btngroup.click(function (event) {
        var button = $(this),
            num = $(this).index();
        event.preventDefault();
        if ($(this).hasClass("active")) {
            btngroup.removeClass("active");
            selection.children().empty();
            selection.attr("disabled",'');
        } else {
            btngroup.removeClass("active");
            button.addClass("active");
            selection.removeAttr("disabled");
            selection.children().empty();
            for (var i = 0; i < 4; i++) {
                selection.children().eq(i).append((num + 1) + "-" + (i + 1) + ": " + expeditionAll[num * 4 + i].name);
            }
        }
    });
}
$(document).ready(function () {
    var btngroup_1 = $('#firstfleet>button'),
        selection_1 = $('#firstfleet').nextAll('select');
    radioLogic(btngroup_1, selection_1);
});
