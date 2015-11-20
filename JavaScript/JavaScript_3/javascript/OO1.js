/*** Created by Fancy on 2015/11/19 0019.*/

(function(){
    var n = "ime";               //信息的封装通过(function(){........}())来进行，此时外界无法引用其中的任何资源
    function people(name){       //    使用函数来模拟类
        this._name = name;      //指定父类的参数,子类也需要做同样的指定
    }
    people.prototype.say = function (){
        alert("Peo-Hello!");
    }
    window.people = people;        //通过赋值给window来实现接口功能。
}());                                   //补一个括号代表直接调用第一行的函数。
(function(){
    function stu(name){
        this._name = name;
    }
    stu.prototype = new people();    //通过new实现继承。  通过函数定义的类继承需要加括号
    var superSay = stu.prototype.say;         /*优先调用父类属性,say后不加括号否则会执行一次继承自父类的say属性*/
    stu.prototype.say = function(){
        superSay.call(this);                       /*优先调用父类属性*/
        alert("Stu-Hello! "+this._name);          //this._name是用来索引的。
    }                                    //从父类继承来的属性会被复写
    window.stu = stu;
}());
var s = new stu("fancy");     //定义一个新量属于类
s.say();
