/**
 * Created by Fancy on 2015/12/27 0027.
 */

var picked = [],
    parameter = [0, 0, 0, 0],
    result = [0, 0, 0, 0, 0, 0, 0, 0];

(function () {
    function expedition(chapter, code, name, fule, ammunition, steel, aluminum, experience, grade, number, require,
                        time, reward, probability) {
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
        },
        getExpect: function () {
            return this.probabilty[1] + 2 * this.probabilty[2];
        },
        getGreatExpect: function () {
            if (this.probabilty[2] !== 0) {
                return 2;
            } else if (this.probabilty[1] !== 0) {
                return 1;
            } else {
                return 0;
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

function refreshData(num) {
    var tr = $('#displaywindow>tbody>tr'),
        btn = $('#displaywindow tbody button:even');
    for (var i = 0; i < num; i++) {
        btn.eq(i).text("" + picked[i].chapter + "-" + picked[i].code + " " + picked[i].name);
        tr.eq(i).children().eq(1).text(picked[i].time);
        tr.eq(i).children().eq(2).text(picked[i].grade);
        tr.eq(i).children().eq(3).text(picked[i].number);
        tr.eq(i).children().eq(4).text(picked[i].require);
        tr.eq(i).children().eq(5).text(picked[i].fule);
        tr.eq(i).children().eq(6).text(picked[i].ammunition);
        tr.eq(i).children().eq(7).text(picked[i].steel);
        tr.eq(i).children().eq(8).text(picked[i].aluminum);
        tr.eq(i).children().eq(9).text(picked[i].getRewardName());
    }
}

function display(num) {
    var total = $('#displaywindow'),
        head = $('#displaywindow>thead'),
        body = $('#displaywindow>tbody'),
        tr = $('#displaywindow>tbody>tr'),
        c_window = $('#caculatewindow'),
        r_window = $('#result_window');
    if (num !== 0) {
        head.show();
        c_window.show();
    } else {
        head.hide();
        c_window.hide();
        r_window.hide();
    }
    tr.hide();
    for (var i = 0; i < num; i++) {
        refreshData(num);
        tr.eq(i).show();
    }
}

function resultDisplay() {
    var contaniner = $('#result_window td'),
        re = /^[0-9]*\.+[0-9]*$/,
        i;
    for (i = 0; i < 8; i++) {
        if (re.test(result[i].toString())) {
            result[i] = result[i].toFixed(1);
        }
        contaniner.eq(i).text(result[i]);
        result[i] = 0;
    }
    $('#result_window').show();
}

function radioLogic(btngroup, target, target_btn) {
    btngroup.click(function (event) {
        var button = $(this),
            num = $(this).index();
        event.preventDefault();
        if (button.hasClass("active")) {
            btngroup.removeClass("active");
            target.hide();
        } else {
            btngroup.removeClass("active");
            button.addClass("active");
            for (var i = 0; i < 4; i++) {
                target_btn.eq(i * 2).text((num + 1) + "-" + (i + 1) + ": " + expeditionAll[num * 4 + i].name);
                target_btn.filter('.dropdown-toggle')[i].onclick = (function (k) {
                    return (function () {
                        if (picked.length < 4) {
                            picked.push(expeditionAll[num * 4 + k]);
                        } else {
                            picked.splice(0, 1);
                            picked.push(expeditionAll[num * 4 + k]);
                        }
                        display(picked.length);
                    });
                })(i);
            }
            target.show();
        }
    });
}

function deleteLogic(delete_btn) {
    for (var i = 0; i < 4; i++) {
        (function (i) {
            delete_btn.eq(i).click(function () {
                picked.splice(i, 1);
                display(picked.length);
            })
        })(i);
    }
}

function caculateLogic(condition_btn) {
    condition_btn.click(function (event) {
        event.preventDefault();
        var button = $(this);
        if (button.hasClass("active")) {
            button.removeClass("active");
        } else {
            button.addClass("active")
        }
        switch (button.index()) {
            case 0:
                if (button.hasClass("active")) {
                    parameter[1] = 1;
                } else {
                    parameter[1] = 0;
                }
                break;
            case 1:
                if (button.hasClass("active")) {
                    parameter[2] = 1;
                } else {
                    parameter[2] = 0;
                }
                break;
            case 2:
                if (button.hasClass("active")) {
                    $('#caculatewindow select').show();
                } else {
                    $('#caculatewindow select').hide();
                }
                break;
        }
    });
}

function caculate() {
    $('#caculatewindow button:last').click(function (e) {
        e.preventDefault();
        var num = [],
            button = $('#caculate_condition>button');
        parameter[0] = Number($('#caculatewindow input:eq(0)').val()) * 24 * 60
            + Number($('#caculatewindow input:eq(1)').val()) * 60;
        if (parameter[0] === 0) {
            $('#caculatewindow input:eq(0)').focus();
        } else {
            if (button.eq(2).hasClass("active")) {
                parameter[3] = Number($('#caculatewindow select').val());
            } else {
                parameter[3] = 0;
            }
            result[0] += parameter[0] * parameter[1] * 1 + (parameter[0] * parameter[2] * 500 / 24 / 60);
            result[1] += parameter[0] * parameter[1] * 1 + (parameter[0] * parameter[2] * 500 / 24 / 60);
            result[2] += parameter[0] * parameter[1] * 1 + (parameter[0] * parameter[2] * 500 / 24 / 60);
            result[3] += parameter[0] * parameter[1] / 3 + (parameter[0] * parameter[2] * 500 / 24 / 60);
            for (var i = 0; i < picked.length; i++) {
                num[i] = parameter[0] / picked[i].time;
                result[0] += (num[i] * picked[i].fule) * (1 + parameter[3] / 2);
                result[1] += (num[i] * picked[i].ammunition) * (1 + parameter[3] / 2);
                result[2] += (num[i] * picked[i].steel) * (1 + parameter[3] / 2);
                result[3] += (num[i] * picked[i].aluminum) * (1 + parameter[3] / 2);
                switch (picked[i].reward) {
                    case 1:
                        result[4] += num[i] * ((1 - parameter[3]) * picked[i].getExpect()
                            + parameter[3] * picked[i].getGreatExpect());
                        break;
                    case 2:
                        result[5] += num[i] * ((1 - parameter[3]) * picked[i].getExpect()
                            + parameter[3] * picked[i].getGreatExpect());
                        break;
                    case 3:
                        result[6] += num[i] * ((1 - parameter[3]) * picked[i].getExpect()
                            + parameter[3] * picked[i].getGreatExpect());
                        break;
                    case 4:
                        result[7] += num[i] * ((1 - parameter[3]) * picked[i].getExpect()
                            + parameter[3] * picked[i].getGreatExpect());
                        break;
                }
            }
            if (button.eq(1).hasClass("active") && parameter[0] >= 1440) {
                result[5] += parseInt(parameter[0] / 1440);
            } else if (button.eq(1).hasClass("active")) {
                result[5] += 1;
            }
            resultDisplay();
        }
    });
}

$(document).ready(function () {
    var btngroup_1 = $('#firstfleet>button'),
        target_1 = $('#target'),
        target_btn_1 = $('#target>.btn-group>button'),
        delete_btn_1 = $('#displaywindow tbody button:odd'),
        condition_btn_1 = $('#caculate_condition>button');
    radioLogic(btngroup_1, target_1, target_btn_1);
    deleteLogic(delete_btn_1);
    caculateLogic(condition_btn_1);
    caculate();
});
