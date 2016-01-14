/* JavaScript 高级程序设计
 *
 * 2-JS的使用
 *
 * 2.1.2延迟脚本
 *
 * <script type="text/javascript" defer="defer" src="....."></script>           页面加载完毕后再执行
 * <script type="text/javascript" async src="....."></script>                   异步加载其他内容
 *
 * 3-基本概念
 *
 * 3.2关键字和保留字
 *
 * 关键字
 * break case catch continue debugger default delete do else finally for function if
 * in instanceof new return switch this throw try typeof var void(空间) while with
 * 保留字
 *
 * ECMAScript 3
 * abstarct boolean byte char class const(常量) debugger double enum(枚举) export(出口) extends(扩展) final float
 * goto implements(工具) import int interface long native(本地) package private protected public short static
 * super synchronized(同步) throws transient(短暂) volatile(挥发)
 *
 * ECMAScript 5
 * implements interface let package private protected public static yield
 *
 * In Use
 * ECMAScript 3 + let yield eval arguments
 *
 * 3.4 数据类型
 *
 * 基本数据类型
 * Undefined  Null  Boolean  Number  String
 *
 * 复杂数据类型
 * Object
 *
 * 3.4.1 typeof操作符
 */

var message = "some message",
    car     = null;
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

/*
 * 3.4.6 String 类型
 *
 * ---------------------------------------------------------------------------------------------------------
 *
 * Chapter5 引用类型
 *
 * 5.1 Object类型
 *
 */
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
	age: 27,

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
    names  = [];
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
/*
 * 栈方法(先进后出)
 * Array.push(value)   加入值为value的末尾项并返回修改后的数组的长度。
 * Array.pop()    删除最后一项并返回被删除的值。
 *
 * 队列方法(先进先出)
 * Array.shift()   删除第一项并返回被删除的值。
 * Array.unShift(value)  添加值为value的首项并返回修改后数组的长度。
 *
 * 排序
 * Array.reverse()   返回原数组的倒序数组
 * Array.sort(function)  不传入函数的情况下返回按照字符串值排序的数组
 */
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
/*
 * 操作方法
 *
 * 拼接
 * Array.concat(value1,value2,value3,.....)  创建Array的一个副本并将传入的值(可以传入数组)依次添加到副本的末尾，然后返回这个副本。
 *
 * splice(拼接)方法
 * Array.splice(num1,num2,value,value,value...)
 * 从num1的索引位置删除num2的项，然后从num1的索引位置依次插入value值,返回被删除的值(数组)。
 * splice(0,2)删除前两项  splice(2,0,"XXX","YYY")从位置2开始插入"XXX","YYY"  splice(2,1,"XXX")将数组位置2的项替换为"XXX"。
 *
 * 位置方法(IE9+)
 * indexOf(value)  lastIndexOf(value)  正序倒序返回value在数组中的索引位置
 *
 * 迭代方法(ECMAScript5)
 * every():每一项执行操作，都返回true则返回true。
 * filter():返回执行操作后返回true的项组成的数组。
 * forEach():对每一项执行，无返回值。
 * map():对每一项执行，返回执行结果组成的数组。
 * some():每一项执行操作，有任意项返回ture，则返回ture。
 *
 * 归并方法(ECMAScript5 IE9+)
 * reduce(pre,cur,index,array) 从首到尾
 * reduceRight(pre,cur,index,array) 从尾到首
 */
var num = [1, 2, 3, 4, 5];
var sum = num.reduce(function (pre, cur, index, array) {
	return pre + cur;
})          // 1+2+3+4+5

//5.3 Date类型

//起始于1970.01.01 0：00：00

Date.parse("6/13/2014");       //接收字符串，尝试返回毫秒数(number)，失败则返回NaN。
// 直接传递字符串给Date()构造函数会隐式调用Date.parse()。

Date.UTC(2014, 5, 13, 20, 28, 15, 15);     //除了月份也就是num2是基于0的，其余均与习惯相同。返回毫秒数。同样也会被构造函数隐式调用。

Date.now();        //ECMAScript 5   等同于 var somevirable = +new Date();

// toLocalString()  toString()  valueOf()  前两者根据浏览器不同会有很大区别，valueOf()则返回毫秒数。

//5.3.2 日期格式化方法

var now = +new Date(),
    someDay = new Date(1991,7,16);

// toDateString() toTimeString() toLocalDateString() toLocalTimeString() toUTCString()  基本无用。

//组件方法——p.102   (>^ω^<)

/*
 * 5.4 RegExp(regular expression)(正则表达式)类型
 *
 * 定义方式
 * var expression = /pattern/falgs;       (字面量形式)始终共用同一个实例。
 *     var re = null,
 *         i;
 *     for (i = 0;i < 10;i++){
 *         re = /cat/g;
 *         re.test("catstrophe");
 *     }
 * var expression = new RegExp("pattern", "flags");     构造函数形式，会创建一个新的实例。
 *
 * 正则语法
 *
 * 元字符   需要使用/来转义
 * {} [] () \ | ^ $ * ? . +
 *
 * 转义字符
 *
 * 简单转义
 * /r 回车 /n 换行 // /本身 /t 制表符
 *
 * 匹配一个多种字符
 * /d 数字0~9 /w 字母数字和下划线 /s 空格空白字符制表符换页符 .代表除了换行符之外的任意字符
 *
 * 使用[]匹配一个多种字符语法
 * [ab5@] 匹配a或者b或者5或者@
 * [^abc] 匹配除abc以外的字符
 * [0-9] 匹配任意一个数字
 * [^a-f3-6]匹配a~f和3~6之外的任意一个字符
 *
 * 修饰匹配次数的符号
 * {n} 表达式重复n次   /w{2} 相当于/w/w
 * {m,n} 表达式重复至少m次至多n次   ab{1,3} 可以匹配ab、abb、abbb
 * {m,} 表达式至少重复m次
 * ? 表达式匹配1次或者0次   a[bc]? 可以匹配a、ab、ac
 * + 表达式至少出现1次   a+b 可以匹配 ab、aab、aaab、……
 * * 表达式出现0次或者任意次 /^*a 可以匹配a、^^^a、……
 *
 * 抽象意义符号
 * ^ 代表开始
 * $ 代表结尾          /^abc$/ 只能用来匹配abc
 * /b 代表一个单词边界
 *
 * 逻辑符号
 * | 代表或
 * () 修饰次数时作为一个整体，获取结果时括号内的表达式匹配到的内容可以被单独得到
 * /$(/d+/.?/d*)|￥(/d+/.?/d*)/g 匹配 "$10.9 ￥20.5"时 会返回"$10.9"和"10.9"和"￥20.5"以及"20.5"
 *
 * 实例属性
 *
 * global: 是否设置了g标志
 * ignoreCase: 是否设置了i标志
 * multiline: 是否设置了m标志
 * lastIndex: 开始搜索下一个匹配项的开始位置，从0开始。
 * source: 字符串表示，字面量形式("/pattern/flags")
 *
 * 实例方法
 *
 * exec() 返回包含第一个匹配信息的数组，包含两个Array没有的副属性:index和input
 * var text = "cat, bat, sat, fat",
 *     pattern = /.at/g;
 * var matches = pattern.exec(text);
 * matches.index    //0
 * matches[0]       //cat
 * pattern.lastIndex     //3
 * matches = pattern.exec(text);
 * matches.index    //5
 * matches[0]       //bat
 * pattern.lastIndex     //8
 *
 * test() 返回一个布尔值
 *
 * toLocalString() 和 toString() 均返回其source属性
 *
 * ToDo 构造函数属性(晦涩)
 */

// 5.5 Function 类型

// 函数声明
function sum (num1, num2){
	return num1 + num2;
}

// 函数表达式
var sum1 = function (num1, num2){
	return num1 + num2;
}

// 函数名仅仅是指向函数对象的指针，所以JS函数没有重载。

function withoutOverload (num1) {
	return num1 + 100;
}

function withoutOverload (num1) {
	return num1 + 200;
}

console.log(withoutOverload(100));     // 输出300

// 函数声明会被解析器率先读取，这个过程叫做函数声明提升。(function declaration hoisting)

/*
 * 5.5.3 作为值的函数
 *
 * 函数名本身就是变量，所以函数可以作为一个值使用。
 * function callSomeFunction (someFunction, someArguments){
 *     return someFunction(someArguments);
 * }
 * 可以从一个函数中返回另外一个函数
 * function createComparisonFunction (propertyName) {
 *     return function (object1, object2) {
 *         var value1 = object1[propertyName],
 *             value2 = object2[propertyName];
 *         if (value1 > value2){
 *             return -1;
 *         } else if (value1 < value2){
 *             return 1;
 *         } else {
 *             return 0;
 *         }
 *     };
 * }
 *
 * 5.5.4 函数内部属性
 *
 * arguments.callee(被召者，被调用者)
 * function factorial (num){
 *     if (num <= 1){
 *         return 1;
 *     } else {
 *         return num * factorial(num-1);
 *     }
 * }
 * 解除这个阶乘函数对函数名的耦合，可以使用arguments对象的callee属性
 * function factorial (num){
 *     if (num <= 1){
 *         return 1;
 *     } else {
 *         return num * arguments.callee(num-1);
 *     }
 * }
 *
 * this 对象
 * this对象所引用的是函数据以执行的环境对象——或者说是this的值
 *
 * ECMAScript 5 中的caller对象
 * caller中保存有调用当前函数的函数的引用。
 * function outer(){
 *     return inner();
 * }
 * console.log(inner.caller);
 * console.log(arguments.callee.caller);
 *
 * 5.5.5 Function的属性和方法
 *
 * function.length    希望接收的命名参数的个数(函数声明或者函数表达式中包含的参数个数)。
 *
 * function.apply()
 * 被用来在特定的作用域中调用函数，等于设置函数体内this的值。
 */
function test (num1, num2){
	return num1 + num2;
}

// 传入arguments对象，并在自己的执行环境中执行test()。
function callTest1 (num1, num2){
	return test.apply(this,arguments);
}

// 传入参数数组，并在自己的执行环境中执行test()。
function callTest2 (num1, num2){
	return test.apply(this, [num1,num2]);
}

// function.call()

// 传参方式和apply()不同，需要将传递参数逐个列举。
function callTest3 (num1, num2){
	return test.call(this,num1,num2);
}

// apply()和call()的作用。

// 扩充函数的作用域。
window.color = "red";
var o = {color: "blue"};

function sayColor (){
	console.log(this.color);
}

sayColor();        //"red"
sayColor.call(this);      //"red"
sayColor.call(window);        //"red"
sayColor.call(o);       //"blue"

// bind()方法(IE9+)

// 创建一个副本并直接指定其作用域。
var objectSayColor = sayColor.bind(o);

//toLocaleString()和toString()方法均返回函数的代码，并且实现依浏览器而异。

/*
 * 5.6 基本包装类型(boolean,number,string)
 *
 * 最好不要显式的创建基本包装类型，应用方法就好。
 * 这些基本包装类型的寿命均是暂时的，在应用它们的方法时会创建各自类型的一个实例，应用方法并返回一个基本类型之后会立即销毁这个实例。
 *
 * 5.6.1 Boolean 类型
 *
 * // 调用构造函数并传入值
 * var booleanObject = new Boolean(true);
 *
 * 重写了valueOf()方法，返回基本类型true或者false,重写了toString()方法，返回"true"或"false"字符串。
 * 但是由于布尔转型函数对所有非空对象均返回true,所以会造成很大程度的混淆，因此不推荐使用Boolean 包装类型。
 *
 * 5.6.2 Number 类型
 *
 * 类似Boolean包装类型，重写了三个方法。valueOf()  toString()  toLocaleString()
 *
 * 除了上述继承方法，还有特有的数字格式化方法。
 * toFixed() 以指定的小数位输出数字。
 * var num = 10;
 * console.log(toFixed(num));     // 10.00
 * 会针对位数进行舍入(IE8存在bug，不能够正常舍入(-0.94,-0.5][0.5,0.94)范围内的值，均返回0)
 *
 * 类似toFixed()有toExponential()指数科学计数法和toPrecision()有效位数法。
 *
 * 5.6.3 String 类型
 *
 * 继承方法基本不变，均有一个length属性，表示字符串中字符的个数(包括空格)。
 *
 * 字符方法charAt()  charCodeAt() 接收一个参数即基于0的字符位置。
 * charAt()输出指定位置的字符本身，charCodeAt()输出指定位置的字符的字符编码。
 * ECMAScript 5添加了一种新的方法，使用字符串方括号加索引的方式去访问具体字符。
 * var stringValue = "Hello World";
 * console.log(stringValue[1]);     // "e"
 *
 * 操作方法
 *
 * concat()   拼接字符串并返回一个新的字符串。
 *
 * slice() substr() substring() 均接收一个或者两个参数，第一个指定子字符串开始的位置，第二个用来表示子字符串结束的位置。
 * stringValue.slice(3);      // "lo World"
 * stringValue.substring(3);      // "lo World"
 * stringValue.substr(3);         // "lo World"
 *
 * // slice()和substring()的第二个参数表示子字符串结尾后的位置
 * stringValue.slice(3,7);        // "lo W"
 * stringValue.substring(3,7);    // "lo W"
 *
 * // substr()的第二个参数表示子字符串的长度
 * stringValue.substr(3,7);       // "lo Worl"
 *
 * 传入负值作为参数时，slice()会将传入的负值与字符串长度相加(造成一种从后往前的倒序效果)。
 * substr()将负的第一个参数与字符串长度相加，第二个参数的负值将会被转换为0。
 * substring()则会把所有的负值参数转换为0。
 *
 * 位置方法
 *
 * indexOf()和lastIndexOf() 分别从头和尾检索传入的子字符串并返回其位置。
 * 这两个方法都可以接收第二个参数，表示开始检索的位置。因此可以通过循环完成所有匹配字符串的检索。
 */
var stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
    positions = [],
    pos = stringValue.indexOf("e");

while (pos > -1){
	positions.push(pos);
	pos = stringValue.indexOf("e",pos+1);
}

console.log(positions);
/*
 * trim()方法(ECMAScript 5 IE9+)
 *
 * 该方法会创建一个字符串的副本并删除前置及后缀的所有空格然后返回结果。
 *
 * 大小写转换方法
 *
 * toLowerCase() toUpperCase() toLocaleLowerCase() toLocaleUpperCase()
 *
 * 模式匹配方法
 *
 * match()
 * 本质上与调用RegExp的exec()方法相同，接收两种参数，正则表达式或者RegExp对象。
 * 返回一个结果数组
 *
 * search()
 * 参数与match()相同，返回结果的索引(第一次出现的位置)
 *
 * replace()
 * 第一个参数可以是一个RegExp对象也可以是一个字符串，第二个参数可以是一个字符串或者函数。
 * 第一个参数为字符串则只会替换第一个匹配结果。global属性为true的RegExp对象则会替换全部匹配结果。
 * 第二个参数可以使用一些特殊的字符序列。
 * $$----$
 * $&----整个模式的子字符串(RegExp.lastMatch)
 * $'----匹配的子字符串之前的子字符串(RegExp.leftContext)
 * $`----匹配的子字符串之后的子字符串(RegExp.rightContext)
 * $n----匹配第n个捕获组的子字符串。
 * $nn---匹配第nn个捕获组的子字符串。
 */
var textTest = "cat, bat, sat, fat, rat",
    replaceTest = /(.at)/g;

textTest.replace(replaceTest,"word($&)");       // "word(cat), word(bat), word(sat), word(fat), word(rat)"

textTest.replace(replaceTest,"word($1)");       // "word(cat), word(bat), word(sat), word(fat), word(rat)"

textTest.replace(replaceTest,"word($')");
// "word(, bat, sat, fat, rat), word(, sat, fat, rat), word(, fat, rat), word(, rat), word()"

textTest.replace(replaceTest,"word($`)");
// "word(), word(cat, ), word(cat, bat, ), word(cat, bat, sat, ), word(cat, bat, sat, fat, )"

// 第二个参数为函数的情况。
function htmlEscape(text){
	return text.replace(/[<>"&]/g, function(match,pos,originalText){ //参数分别为模式的匹配项、匹配项在字符串的位置和原始字符串
		switch (match){
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case "&":
				return "&amp;";
			case "/":
				return "&quot;";
		}
	})
}

console.log(htmlEscape("<p class=\"greeting\">Hello world!</p>"));
// &lt;p class=undefinedgreetingundefined&gt;Hello world!&lt;/p&gt;

// 如果有多个捕获组，则传递给函数的参数应该为模式的匹配项、第一个捕获组的匹配项、第二个……，最后两个参数不变。

/*
 * split() 方法
 *
 * 使用指定的分隔符将字符串分割成一系列子字符串，返回一个数组。
 * 第一个参数为指定的分隔符，可以是字符串也可以是正则表达式。第二个可选参数为分割后的项数。
 *
 * localeCompare() 方法
 *
 * 比较两个字符串并返回一个值
 * 如果输入的参数字符串在字母表中应该排在字符串之前，则输出正数，相同则输出0，之后则输出负数.
 * 因为其输出的具体值根据实现而定，所以应该判断后再行输出。
 *
 * fromCharCode() 方法
 *
 * 接收一定的字符串编码作为参数，然后返回一个字符串实现。
 *
 * 5.7 单体内置对象
 *
 * Global对象
 *
 * encodeURI()和encodeURIComponent() 用于操纵URI(统一资源标识符,Uniform Resource Identifier)的方法，前者主要针对整体，后者针对部分。
 * 针对URI进行转译，前者可以使用在整个URI上，转义范围狭窄，而后者转义范围比较大。
 *
 * decodeURI()和decodeURIComponent()则是上述两个方法的反方法。
 *
 * eval()方法
 *
 * 传入的参数会被当作真正的JS代码被解析器执行，所以一般因为安全性的问题不进行使用。
 *
 * Global的属性
 *
 * 包括基础构造函数和特殊值，一般用不到。
 *
 * window对象
 *
 * Web浏览器的常见全局对象。
 *
 * 5.7.2 Math对象
 *
 * 属性
 * .E-----------自然对数的底数
 * .LN10--------10的自然对数
 * .LN2---------2的自然对数
 * .LOG2E-------以2为底的E的对数
 * .LOG10E------以10为底的E的对数
 * .PI----------圆周率
 * .SQRT1_2-----根号2的倒数
 * .SQRT2-------根号2
 *
 * min()和max()方法
 *
 * 确定一组数值中的最大和最小值
 */
var mathValue = [1,2,3,4,5,6,7,8,9],
    maxValue = Math.max.apply(Math,mathValue);
/*
 * 上述代码可以方便的在数组中找到最大值。
 *
 * 舍入方法
 *
 * ceil() 向上舍入
 *
 * floor() 向下舍入
 *
 * round() 标准舍入
 *
 * 随机方法
 *
 * random()可以获得在0到1之间的一个随机数
 * 常规用法
 * value = Math.floor(Math.random() * total + minPossibleValue);
 *
 * 其他Math的方法------p.136
 *
 * -------------------------------------------------------------------------------------------------------------------
 *
 * Chapter6 面向对象的程序设计
 *
 * 6.1 理解对象
 *
 * 无序属性的集合，其属性可以是基本值、对象、函数。
 * 对象由任意一种引用类型(Object, Function, Array, Date, RegExp...)或者自定义类型创建。
 * 创建对象的方式主要分两种，一种是创建实例然后添加属性，一种是对象字面量。
 *
 * 6.1.1 属性类型
 *
 * 数据属性
 *
 * 数据属性包含一个数据值的位置，可以进行读取和写入操作。
 *
 * [[Configurable]]  是否能够通过删除重新定义
 * [[Enumerable]]    是否能够通过for-in循环显示属性
 * [[Writable]]      是否能够修改其值
 * [[Value]]         包含这个属性的数据值，读取值和写入值都操作这个位置，默认undefined
 * 操作上述这些特性的时候可以通过Object.defineProperty(object,"属性值",{特性字面量})来进行。
 * 调用后如不指定默认都是false，所以一般没必要用。
 *
 * 访问器属性
 *
 * 访问器属性不包含数据值；包含一对getter和setter函数，有以下几个特性。
 *
 * [[Configurable]]
 * [[Enumerable]]
 * [[Get]]
 * [[Set]]
 * 用起来需要特殊指定，属性名前有下划线。
 *
 * var book = {
 *     _year: 2004,
 *     edition: 1
 * };
 *
 * Object.defineProperty(book,"year",{
 *     get: function (){
 *         return this._year;
 *     }
 *     set: function (){
 *         if(newValue > 2004) {
 *             this._year = newValue;
 *             this.edition += newValue - 2004;
 *         }
 *     }
 * });
 *
 * 对上述特性的操作需要IE9+
 *
 * 定义多个属性的特性
 *
 * Object.defineProperties (object,{
 *     属性1: {
 *         特性1: ....,
 *         特性2: ....
 *     }
 *     属性2: ...
 * });
 *
 * 读取属性的特性
 *
 * Object.getOwnPropertyDescriptor(object,"属性名");
 *
 * 以上特性操作方式为ECMAScript 5
 *
 * 6.2 创建对象
 *
 * 6.2.1 工厂模式
 *
 * 工厂模式抽象了创建具体对象的过程，用函数来封装以特定接口创建对象的细节。
 *
 * function createPerson (name, age, job){
 *     var o = new Object;
 *     o.name = name;
 *     o.age = age;
 *     o.job = job;
 *     o.sayName = function (){
 *         alert(this.name);
 *     };
 *     return o;
 * }
 *
 * var person1 = createPerson(....),
 *     person2 = createPerson(....);
 *
 * 工厂模式解决了创建多个相似对象的问题，但是没有解决对象识别的问题。
 *
 * 6.2.2 构造函数模式
 *
 * function Person(name, age, job){
 *     this.name = name;
 *     this.age = age;
 *     this.job = job;
 *     this.sayName = function () {
 *         alert(this.name);
 *     };
 * }
 *
 * var person1 = new Person(....),
 *     person2 = new Person(....);
 *
 * 构造函数模式没有显示的创建对象，直接把属性和方法赋给了this对象，没有return语句。
 * 其工作模式为创建一个对象；把构造函数(Person(),pascal命名)作用域赋给新对象；执行构造函数里的代码，添加属性和方法；返回这个新对象。
 * 创建出来的对象都会有一个constructor属性，指向Person，而且同时是Object和Person的实例。
 * 由构造函数模式创建的对象，都是这个构造函数的实例，就实现了对象识别的功能。
 *
 * 构造函数可以被直接当作函数使用，可以作为普通函数调用也可以在指定作用域中调用。
 * Person(....);
 * window.sayName();   //可以执行。
 * Person.call(o,....);
 * o.sayName();        //可以执行。
 *
 * 构造函数模式存在的问题在于每一个实例都独享一个方法(sayName,Function实例)。
 * person1.sayName === person2.sayName     // false
 * 可以把这个Function实例拿出来写成一个全局函数，但是这样会影响封装性。
 *
 * 6.2.3 原型模式
 *
 * 原型模式的基本构造如下：
 * function Person (){
 * }
 *
 * Person.prototype.name = "...";
 * Person.prototype.age = ...;
 * Person.prototype.job = "...";
 * Person.prototype.sayName = function (){
 *     alert(this.name);
 * };
 *
 * var person1 = new Person();
 * var person2 = new Person();
 *
 * 理解原型。
 * 创建任何函数都会有一个prototype属性，这个属性指向函数的原型对象。
 * 创建了构造函数之后原型对象只会默认获得constuctor属性，其余属性继承自Object.
 * 在通过构造函数创建了新的实例之后，每一个实例都存在一个指针指向原型对象，通过原型对象我们就可以调用保存在原型中的属性和方法。(查找对象属性)
 * Person.prototype.isPrototypeOf(person1)     // true
 * Object.getPrototypeOf(person2) == Person.prototype;   // true
 *
 * 改写原型对象的属性。
 * 可以直接在实例中改写属性，根据查找的方式，只有在实例中查找不到才会上述到原型。
 * 使用hasOwnProperty()可以检测属性是存在于实例还是原型。
 * person1.hasOwnProperty("name")    // false
 *
 * 通过in操作符可以检查通过对象能够访问到的属性，无论存储在哪里。
 * "name" in person1;   // true
 * function hasPrototypeProperty (object,name){
 *     return !object.hasOwnProperty(name) && (name in object);
 * }
 * 可以使用上述函数判断属性是否保存在原型里。并不保存在实例中，而且可以访问到，所以一定在原型里。
 * IE8 之前屏蔽不可枚举属性的实例属性不会出现在for-in循环中。
 *
 * ECMAScript5则添加了一个方法可以查询存储在对象里的属性和方法。
 * var keys = Object.keys(Person.prototype);   //["name","age","job","sayName"]
 * 上述方法都存在于Object类型里，这个方法返回一个字符串数组。
 *
 * 使用字面量语法修改原型。
 *
 * 使用字面量修改原型,本质上是完全重写，会使得其constructor属性不再指向构造函数，而是指向Object函数。
 * 解决这个问题可以在字面量中专门指定constructor，但是会使得constructor的枚举特性被设置为true。
 * 此时可以直接使用ECMA5中的Object.defineProperty()
 * function Person (){
 * }
 *
 * Person.prototype = {
 *     name: ...,
 *     age: ...,
 *     job: ...,
 *     sayName: function () {
 *         ....;
 *     }
 * };
 *
 * Object.defineProperty(Person.prototype , "constructor",{
 *     enumerable: false,
 *     value: Person
 * };
 *
 * 原型的动态性
 *
 * 在重写原型对象之前创建的实例中的原型指针会指向旧的原型。
 *
 * 原型模式存在的问题：
 * 方便的共享方法，通过实例的同名属性可以屏蔽原型中的包含基本值的属性继承，但是对于引用类型比如数组就比较麻烦。
 *
 * 6.2.4 组合使用构造函数模式和原型模式
 *
 * function Person (name, age, job){
 *     this.name = name;
 *     this.age = age;
 *     this.job = job;
 *     this.friends = ["...","..."];
 * }
 *
 * person.prototype = {
 *     constructor: Person,
 *     sayName: function () {
 *         alert("this.name");
 *     }
 * }
 *
 * var person1 = new Person("...",...,"..."),
 *     person2 = new Person(....);
 *
 * 6.2.5 动态原型模式
 *
 * function Person (name, age, job) {
 *
 *     //属性
 *     this.name = name;
 *     this.age = age;
 *     this.job = job;
 *
 *     //方法
 *     if (typeof this.sayName != "function"){
 *
 *         Person.prototype.sayName = function () {
 *             alert(this.name);
 *         };
 *
 *     }
 * }
 *
 * 第二段方法部分只有在初始化的时候才会执行。
 *
 * 6.2.6 寄生构造函数模式
 *
 * 创建一个函数封装创建对象的代码，然后再返回新创建的对象。可以用来生成不能去修改构造函数的特殊对象。
 *
 * function Person (name, age, job){
 *     var o = new Object();
 *     o.name = name;
 *     o.age = age;
 *     o.job = job;
 *     o.sayName = function () {
 *         alert(this.name);
 *     }
 *     return o;
 * }
 *
 *
 * function SpecialArray () {
 *
 *     //创建数组
 *     var values = new Array();
 *
 *     //添加值
 *     values.push.apply(values,arguments);
 *
 *     //添加方法
 *     values.toPipedString = function () {
 *         return this.jion("|");
 *     }
 *
 *     //返回数组
 *     return values;
 * }
 *
 * 需要注意的一点就是寄生模式下返回的对象跟构造函数以及构造函数的原型之间没有关系，所以尽量不要使用这种模式。
 *
 * 6.2.7 稳妥构造函数模式
 *
 * 稳妥对象，没有公共属性，其方法也不引用this对象，主要是为了安全目的
 *
 * function Person (name, age, job) {
 *
 *     //创建要返回的对象
 *     var o = new Object();
 *
 *     //可以在这里定义私有变量和函数
 *
 *     //添加方法
 *     o.sayName = function () {
 *         alert(name);
 *     }
 *
 *     //返回对象
 *     return o;
 * }
 *
 * 在以这种模式创建的对象，除了使用sayName()方法之外无法访问到name值。
 * 这样使用new操作符定义的变量里保存的就是一个稳妥对象。
 *
 * 6.3 继承
 *
 * 6.3.1 原型链
 *
 * 利用原型，让一个引用类型继承另一个引用类型的属性和方法。
 * 每个引用类型都有一个原型对象，原型对象包含一个指向构造函数的指针，而所有通过这个构造函数创建的实例都包含一个指向这个原型对象的指针。
 * 那么我们让一个原型对象成为另外一个对象的实例，则此时的原型对象将包含一个指向另外一个原型的指针，层层递进形成原型链。
 *
 * function SuperType(){
 *     this.property = true;
 * }
 *
 * SuperType.prototype.getSuperValue = function () {
 *     return this.property;
 * };
 *
 * function SubType () {
 *     this.subProperty = false;
 * }
 *
 * //形成原型链并继承
 * SubType.prototype = new SuperType();
 *
 * //私有方法
 * SubType.prototype.getSubValue = function () {
 *     return this.subProperty;
 * };
 *
 * var instance = new SubType();
 *
 * instance.getSuperValue();       //true     从原型链中继承的方法。
 *
 * 注意instance.constructor 现在指向SuperType，因为其原型被完全重写了。
 * 所有的自定义对象都有个默认原型——Object   很多方法都继承自Object。
 *
 * 可以使用instanceof操作符来检索一个对象原型链中出现的所有构造函数。
 * instance instanceof Object             //true
 * instance instanceof SuperType          //true
 * instance instanceof SubTypr            //true
 *
 * 也可以使用isPrototypeOf()方法，可以检索所有原型链中出现的原型。
 * Obeject.prototype.isPrototypeOf(instance);       //true
 * SuperType.prototype.isPrototypeOf(instance);     //true
 * SubType.prototype.isPrototypeOf(instance);       //true
 *
 * 给下级原型添加私有方法和属性以及覆盖上级原型的方法和属性一定要在替换原型语句之前。
 * //形成原型链并继承
 * SubType.prototype = new SuperType();
 *
 * //私有方法
 * SubType.prototype.getSubValue = function () {
 *     return this.subProperty;
 * };
 * 而且在添加私有方法或者属性以及覆盖的过程中不能使用字面量方式(相当于重写原型)
 *
 * 原型中包含引用类型值(比如数组)的属性会被所有实例共享，在使用原型链实现继承的过程中原先的实例属性会自动变成原型属性。
 *
 * 6.3.2 借用构造函数实现继承
 *
 * 解决上述问题的一种继承方式。
 *
 * function SuperType (name) {
 *     this.color = ["red","yellow"];
 *     this.name = name;
 * }
 *
 * function SubType (name) {
 *
 *     //继承了 SuperType
 *     SuperType.call(this,name);
 * }
 *
 * 通过上述方式，下级构造函数借调了上级类型的构造函数。在其中可以传递参数。
 * 但是这种方式并没有解决函数复用的问题
 *
 * 6.3.3 组合继承
 *
 * function SuperType (name) {
 *     this.color = ["red","yellow"];
 *     this.name = name;
 * }
 *
 * SuperType.prototype.sayName = function () {
 *     alert(this.name);
 * };
 *
 * function SubType (name，age) {
 *
 *     //继承了 SuperType
 *     SuperType.call(this,name);
 *
 *     //下级实例属性
 *     this.age = age;
 * }
 *
 * //原型链继承方法
 * SubType.prototype = new SuperType();
 *
 * //对原型进行调整，添加私有方法。
 * SubType.prototype.constructor = SubType;
 * SubType.prototype.sayAge = function () {
 *     alert(this.age);
 * }
 *
 * 以上就是最常用的基本继承方法。避免了单独使用原型链以及使用构造函数继承的缺陷。
 *
 * 6.3.4 原型式继承
 *
 * 借助原型可以基于已有的对象创建新对象，同时不必因此创建自定义类型。
 *
 * function object (o){
 *     function F () {}
 *     F.prototype = o;
 *     return new F();
 * }
 *
 * 其内部有一个临时性的构造函数F，然后将传入的对象作为这个构造函数的原型，然后返回这个临时类型的实例。
 * 整个过程相当于对o执行了一次浅复制，得到的新实例实际上是o的副本，然后可以进行自定义。
 * 注意得到的这个新实例和原来的对象共享引用类型值属性。
 *
 * ECMAScript 5 增加了Object.create()方法规范了原型式继承。其可以通过第二个可选参数实现直接的自定义。
 *
 * 6.3.5 寄生式继承
 *
 * 同样是创建一个仅用于封装继承过程的函数，在函数内部以某种方式来增强对象，最后返回对象。
 *
 * function createAnother (original) {
 *     var clone = object (original);
 *     clone.sayHi = function () {
 *         alert("hi");
 *     }
 *     return clone;
 * }
 *
 * 6.3.6 寄生组合式继承
 *
 * 组合继承最大的问题在于无论什么情况下都会调用两次上级类型的构造函数，一次是在创建子类型原型的时候，一次是在子类型构造函数内部。
 *
 * 而寄生组合式继承，通过借用构造函数来继承属性，通过原型链的混成形式来集成方法。不必为了指定下级类型的原型而调用上级类型构造函数。
 *
 * function inheritPrototype (subType, superType){
 *     var prototype = Object(superType.prototype);
 *     prototype.constructor = subType;
 *     subType.prototype = prototype;
 * }
 *
 * 其组合模式如下:
 * function SuperType (name) {
 *     this.name = name;
 *     this.colors = ["...","...","..."];
 * }
 *
 * SuperType.prototype.sayName = function () {
 *     alert(this.name);
 * }
 *
 * function SubType(name, age){
 *     SuperType.call(this,name);
 *
 *     this.age = age;
 * }
 *
 * inheritPrototype(SubType, SuperType);
 *
 * SubType.prototype.sayAge = function () {
 *     alert(this.age);
 * }
 *
 * 其高效率体现在只调用了一次SuperType的构造函数，并且避免了在SubType.prototype上创建不必要的多余的属性。与此同时原型链保持不变。
 *
 * -----------------------------------------------------------------------------------------------
 *
 * Chapter 7.函数表达式
 *
 * 关于函数声明，有一个重要特征就是函数声明提升，意思是解析器执行代码前会先读取函数声明，也就意味着可以把函数放在调用它的代码后面。
 *
 * // Do not do this
 * if(condition){
 *     function sayHi () {
 *         alert("hi");
 *     }
 * } else {
 *     function sayHi () {
 *         alert("yo!");
 *     }
 * }
 *
 * 因为函数声明提升的原因，解析器无法执行这种代码。
 *
 * 关于匿名函数的作用。可以创建函数赋值给变量也就可以把函数作为其他函数的值返回。
 * 在任何把函数作为值的情况下，都可以使用匿名函数，当然这仅仅是匿名函数的一个用途。
 *
 * 7.1 递归
 *
 * 函数名仅仅是一个指针，要解除函数名和递归函数之间的耦合，可以使用arguments.callee这个属性。
 *
 * function factorial (num) {
 *     if (num<1){
 *         return 1;
 *     } else {
 *         return num * arguments.callee(num-1);
 *     }
 * }
 *
 * 在编写递归时一般不要使用函数名，arguments.callee保险的多。
 *
 * 严格模式下不能通过脚本访问arguments.callee属性，下面的方式可以达到同样的效果。
 *
 * var factorial = (function f (num) {
 *     if (num<1){
 *         return 1;
 *     } else {
 *         return num * f(num-1);
 *     }
 * });
 *
 * 以上代码创建了一个命名函数表达式f(),然后将它赋值给变量，这样即便将函数值赋值给了另外的变量，函数的名字f依然有效。
 *
 * 7.2 闭包
 *
 * 匿名函数和闭包是不同的两个概念。匿名函数是指函数的name属性为空字符串的函数。
 * 而闭包是指有权访问另一个函数作用于中的变量的函数。
 *
 * 创建闭包的常见方式就是在一个函数内部创建另一个函数。
 * function createComparisonFunction (propertyName) {
 *
 *     return function (object1, object2) {
 *         var value1 = object1[propertyName],
 *             value2 = object2[propertyName];
 *
 *         if (value1 < value2){
 *             return -1;
 *         } else if (value1 > value2){
 *             return 1;
 *         } else {
 *             return 0;
 *         }
 *     };
 * }
 * 定义value1和value2的那两行代码就访问了外部函数的变量propertyName
 * 即使这个内部函数被返回了，而且是在其他地方被调用了，但它依然可以访问propertyName。
 * 其实现原因跟作用域链有关，具体也是通过指针完成的。
 *
 * 当函数执行时会穿件一个执行环境和相应的作用域链，然后使用arguments和其他命名参数的值来初始化函数的活动对象。
 * 在作用域链中，外部函数的活动对象处在第二位，外部函数的外部函数的活动对象处在第三位，以此类推，直到作用域链终结于全局执行环境。
 * 函数执行过程中为了读取和写入变量的值，就需要在作用域链中查找变量。
 *
 * 在另一个函数内部定义的函数会将包含函数(即外部函数)的活动对象添加到它的作用域链中。因此就可以访问外部函数的参数和其中的变量。
 *
 * 7.2.1 闭包与变量
 *
 * 作用域链的副作用：闭包只能取得包含函数中任何变量的最后一个值。
 */
