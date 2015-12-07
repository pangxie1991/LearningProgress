/**
 * Created by Fancy on 2015/11/19 0019.
 */
(function(){
    var n = "ime";             //直接创建在壳里的数据不能访问
    function human(name){
        var _this = {};       //声明空的对象以及其拥有的空的属性
        _this._name = name;
        /*类中的参数设置方式,其中_this指的是空的对象，等同于下面定义的box，_name指的是空的属性，=name是传递参数赋值语句。*/
        _this.sayHello = function(){
            alert("Hum-Hello"+n);
        }
        return _this;
    }
    /*通过以上的方式创建一个类*/
    window.human = human;
}());
/*封装的方式一样*/
(function(){
    function teacher(name){
        var _this = human(name);                      //类的继承需要加括号
        var superSay = _this.sayHello;            //提前调用继承的属性
        _this.sayHello = function(){
            superSay.call(_this);                  //通过call强行执行
            alert("Tea-Hello "+_this._name);                    //同样可以复写继承来的属性
        }
        return _this;
    }
    window.teacher = teacher;
}());
var box = teacher("盒子");
box.sayHello();
document.write(n);