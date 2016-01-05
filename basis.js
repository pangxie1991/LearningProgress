// JavaScript 高级程序设计

// 2-JS的使用
// 2.1.2延迟脚本
// <script type="text/javascript" defer="defer" src="....."></script>           页面加载完毕后再执行
// <script type="text/javascript" async src="....."></script>                   异步加载其他内容

// 3-基本概念
// 3.2关键字和保留字
// 关键字
// break case catch continue debugger default delete do else finally for function if in instanceof new return switch this throw try
// typeof var void(空间) while with

// 保留字
// ECMAScript 3
// abstarct boolean byte char class const(常量) debugger double enum(枚举) export(出口) extends(扩展) final float
// goto implements(工具) import int interface
// long native(本地) package private protected public short static super synchronized(同步) throws transient(短暂) volatile(挥发)

// ECMAScript 5
// class const enum export extends import super
// implements interface let package private protected public static yield

// In Use
// ECMAScript 3 + let yield eval arguments

// 3.4 数据类型
// 基本数据类型   Undefined  Null  Boolean  Number  String

// 复杂数据类型   Object

// 3.4.1 typeof操作符
var message = "some message",
    car = null;
console.log(typeof message);              //"string"
console.log(typeof(message));             //"string"
console.log(typeof 95);                   //"number"
console.log(typeof car);                  //"object"

// 3.4.3 Null类型
var something = null;              //声明一个空对象（指针）。

// 3.4.4 Boolean类型
var someundefined;
Boolean("");                       //"false"
Boolean(message);                  //"true"
Boolean(someundefined);            //"false"
Boolean(car);                      //"false"
Boolean(0);                        //"false"
Boolean(NaN);                      //"false"

//3.4.5 Number 类型
var somenumber = 070;              //8进制
var somenumber_1 = 0xA;            //16进制
console.log(isNaN(NaN));           //"true"
Number("AAA");                     //NaN
Number("");                        //0
Number(null);                      //0
Number(someundefined);             //NaN
parseInt("1245blue");
parseFloat("1245.1234blue");

//3.4.6 String 类型

//chapter5 引用类型

//5.1 Object类型
var person = new Object();    // 等同于   var person = {};
person.name = "LinFatZ";
person.age = 23;
var person_1 = {
    name: "linfatZ",
    age: 23
}
//一种传参模式
function displayInfo(args) {
    var output = "";
    if (typeof args.name == "String") {
        output += "Name: " + args.name + "\n";
    }
    if (typeof args.age == "Number") {
        output += "Age: " + args.age + "\n";
    }
    console.log(output);
}                          // args是一个对象，在下面对函数的调用中用对象字面量来表示。
displayInfo({
    name: "linfatz",
    age: 27
});
displayInfo({
    name: "zhuhuang"
});
//访问对象的属性：方括号法和点表示法
console.log(person["name"]);
console.log(person.name);
//方括号法的优点在于可以通过变量来访问属性，以及适用于属性名是保留字、关键字的情况
var lalala = "name";
console.log(person[lalala]);
console.log(person_1["first name"]);   //不建议使用。

//5.2 Array 类型
var colors = new Array("red", "green", "blue"),        //可传参数，一个数字代表长度，有逗号隔开表示多项数组，new可以省略
    names = [];
colors[0] = "black";
colors[3] = "brown";       //对数组具体索引位置的直接操作可以替换值以及新增值。空白项会显示为undefined。
console.log(colors.length);
colors.length = 3;             //对length的直接操作可以从末尾删除项，也可以添加undefined项。
console.log(colors[3]);        //undefined
colors[colors.length] = "yellow";    // 等同于 colors.push("yellow");
//检测数组       value instanceof Array 或者 Array.isArray(value)  后者支持并不广泛，适用于多框架网页。
//转换方法
console.log(colors.toString());    // alert(colors);等同于alert(colors.toString());隐式调用   "black,green,blue,yellow"
console.log(colors.toLocaleString());    //"black,green,blue,yellow"  结果与toString相同但是函数不同
console.log(colors.valueOf());     //["black", "green", "blue", "yellow"]
console.log(colors.join("||"));    //"black||green||blue||yellow"
//栈方法(先进后出)
//Array.push(value)   加入值为value的末尾项并返回修改后的数组的长度。
//Array.pop()    删除最后一项并返回被删除的值。
//队列方法(先进先出)
//Array.shift()   删除第一项并返回被删除的值。
//Array.unShift(value)  添加值为value的首项并返回修改后数组的长度。
//排序
//Array.reverse()   返回原数组的倒序数组
//Array.sort(function)  不传入函数的情况下返回按照字符串值排序的数组
function compare(value1, value2) {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
}                  //这是一个正序数字大小的排序函数。
function compare1(value1, value2) {
    return value2 - value1;
}                  //倒序简化版排序函数。
//操作方法
//拼接   Array.concat(value1,value2,value3,.....)  创建Array的一个副本并将传入的值(可以传入数组)依次添加到副本的末尾，然后返回这个副本。
// Array.splice(num1,num2,value,value,value...)
// 从num1的索引位置删除num2的项，然后从num1的索引位置依次插入value值,返回被删除的值(数组)。
//splice(0,2)删除前两项  splice(2,0,"XXX","YYY")从位置2开始插入"XXX","YYY"  splice(2,1,"XXX")将数组位置2的项替换为"XXX"。
//位置方法(IE9+)
//indexOf(value)  lastIndexOf(value)  正序倒序返回value在数组中的索引位置
//迭代方法(ECMAScript5)
//every():每一项执行操作，都返回true则返回true。
//filter():返回执行操作后返回true的项组成的数组。
//forEach():对每一项执行，无返回值。
//map():对每一项执行，返回执行结果组成的数组。
//some():每一项执行操作，有任意项返回ture，则返回ture。
//归并方法(ECMAScript5 IE9+)
//reduce(pre,cur,index,array) 从首到尾
//reduceRight(pre,cur,index,array) 从尾到首
var num = [1,2,3,4,5];
var sum = num.reduce(function(pre,cur,index,array){
    return pre + cur;
})          // 1+2+3+4+5
