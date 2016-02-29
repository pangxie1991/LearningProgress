JavaScript 高级程序设计
========================


## 2-JS的使用

#### 2.1.2延迟脚本

    //页面加载完毕后再执行
    <script type="text/javascript" defer="defer" src="....."></script>

    //异步加载其他内容
    <script type="text/javascript" async src="....."></script>
******

## 3-基本概念

#### 3.2关键字和保留字

**关键字**

+ break
+ case
+ catch
+ continue
+ debugger
+ default
+ delete
+ do
+ else
+ finally
+ for
+ function
+ if
+ in
+ instance
+ of
+ new
+ return
+ switch
+ this
+ throw
+ try
+ typeof
+ var
+ void(空间)
+ while
+ with

**保留字**

*ECMAScript 3*

+ abstract
+ boolean
+ byte
+ char
+ class
+ const(常量)
+ debugger
+ double
+ enum(枚举)
+ export(出口)
+ extends(扩展)
+ final
+ float
+ goto
+ implements(工具)
+ import
+ int
+ interface
+ long
+ native(本地)
+ package
+ private
+ protected
+ public
+ short
+ static
+ super
+ synchronized(同步)
+ throws
+ transient(短暂)
+ volatile(挥发)

*ECMAScript 5*
 
+ implements
+ interface
+ let
+ package
+ private
+ protected
+ public
+ static
+ yield

*In Use*
 
ECMAScript 3 + let yield eval arguments

#### 3.4 数据类型
 
**基本数据类型**
 
+ Undefined  
+ Null  
+ Boolean  
+ Number  
+ String

**复杂数据类型**

+ Object

#### 3.4.1 typeof操作符


    var message = "some message",
        car     = null;
    console.log(typeof message);              //"string"
    console.log(typeof(message));             //"string"
    console.log(typeof 95);                   //"number"
    console.log(typeof car);                  //"object"

#### 3.4.3 Null类型

    var something = null;              //声明一个空对象（指针）。

#### 3.4.4 Boolean类型

    var someundefined;
    Boolean("");                       //"false"
    Boolean(message);                  //"true"
    Boolean(someundefined);            //"false"
    Boolean(car);                      //"false"
    Boolean(0);                        //"false"
    Boolean(NaN);                      //"false"

#### 3.4.5 Number 类型

    var somenumber = 070;              //8进制
    var somenumber_1 = 0xA;            //16进制
    console.log(isNaN(NaN));           //"true"
    Number("AAA");                     //NaN
    Number("");                        //0
    Number(null);                      //0
    Number(someundefined);             //NaN
    parseInt("1245blue");
    parseFloat("1245.1234blue");

#### 3.4.6 String 类型

******
******


## Chapter5 引用类型

#### 5.1 Object类型

两种不同的方式

    var person = new Object();    // 等同于   var person = {};
    person.name = "LinFatZ";
    person.age = 23;

也可以直接使用对象字面量

    var person_1 = {
	    name: "linfatZ",
	    age: 23
    }

一种传参模式

    function displayInfo(args) {
	    var output = "";

	    if (typeof args.name == "String") {
		    output += "Name: " + args.name + "\n";
	    }

	    if (typeof args.age == "Number") {
	    	output += "Age: " + args.age + "\n";
	    }

	    console.log(output);
    }

    // args是一个对象，在下面对函数的调用中用对象字面量来表示。
    displayInfo({
	    name: "linfatz",
	    age: 27,
    });

    displayInfo({
	    name: "zhuhuang"
    });

访问对象的属性：方括号法和点表示法

    console.log(person["name"]);
    console.log(person.name);

方括号法的优点在于可以通过变量来访问属性，以及适用于属性名是保留字、关键字的情况

    var lalala = "name";
    console.log(person[lalala]);
    console.log(person_1["first name"]);   //不建议使用。

#### 5.2 Array 类型

    var colors = new Array("red", "green", "blue"),        //可传参数，一个数字代表长度，有逗号隔开表示多项数组，new可以省略
        names  = [];
    colors[0] = "black";
    colors[3] = "brown";       //对数组具体索引位置的直接操作可以替换值以及新增值。空白项会显示为undefined。
    console.log(colors.length);
    colors.length = 3;             //对length的直接操作可以从末尾删除项，也可以添加undefined项。
    console.log(colors[3]);        //undefined
    colors[colors.length] = "yellow";    // 等同于 colors.push("yellow");

**检测数组**

`value instanceof Array` 或者 `Array.isArray(value)`  后者支持并不广泛，适用于多框架网页。

**转换方法**

    console.log(colors.toString());    // alert(colors);等同于alert(colors.toString());隐式调用   "black,green,blue,yellow"
    console.log(colors.toLocaleString());    //"black,green,blue,yellow"  结果与toString相同但是函数不同
    console.log(colors.valueOf());     //["black", "green", "blue", "yellow"]
    console.log(colors.join("||"));    //"black||green||blue||yellow"

**栈方法(先进后出)**

`Array.push(value)`加入值为value的末尾项并返回修改后的数组的长度。

`Array.pop()`删除最后一项并返回被删除的值。

**队列方法(先进先出)**

`Array.shift()`删除第一项并返回被删除的值。

`Array.unShift(value)`添加值为value的首项并返回修改后数组的长度。

**排序**

`Array.reverse()`返回原数组的倒序数组

`Array.sort(function)`  不传入函数的情况下返回按照字符串值排序的数组

    //这是一个正序数字大小的排序函数。
    function compare(value1, value2) {
	    if (value1 < value2) {
		    return -1;
	    } else if (value1 > value2) {
	    	return 1;
	    } else {
	    	return 0;
	    }
    }

    //倒序简化版排序函数。
    function compare1(value1, value2) {
	    return value2 - value1;
    }

**操作方法**


 * 拼接

   `Array.concat(value1,value2,value3,.....)`

   创建Array的一个副本并将传入的值(可以传入数组)依次添加到副本的末尾，然后返回这个副本。

 * splice(拼接)方法

   `Array.splice(num1,num2,value,value,value...)`

   从num1的索引位置删除num2的项，然后从num1的索引位置依次插入value值,返回被删除的值(数组)。

   `splice(0,2)`删除前两项

   `splice(2,0,"XXX","YYY")`从位置2开始插入"XXX","YYY"

   `splice(2,1,"XXX")`将数组位置2的项替换为"XXX"。

 * 位置方法(IE9+)

   `indexOf(value)` `lastIndexOf(value)`正序倒序返回value在数组中的索引位置

 * 迭代方法(ECMAScript5)

        every();    //每一项执行操作，都返回true则返回true。
        filter();    //返回执行操作后返回true的项组成的数组。
        forEach();    //对每一项执行，无返回值。
        map();    //对每一项执行，返回执行结果组成的数组。
        some();    //每一项执行操作，有任意项返回ture，则返回ture。

 * 归并方法(ECMAScript5 IE9+)

   `reduce(pre,cur,index,array)`从首到尾

   `reduceRight(pre,cur,index,array)`从尾到首

        var num = [1, 2, 3, 4, 5];
        var sum = num.reduce(function (pre, cur, index, array) {
	        return pre + cur;
        })          // 1+2+3+4+5

#### 5.3 Date类型

    //起始于1970.01.01 0：00：00

    Date.parse("6/13/2014");       //接收字符串，尝试返回毫秒数(number)，失败则返回NaN。
    // 直接传递字符串给Date()构造函数会隐式调用Date.parse()。

    Date.UTC(2014, 5, 13, 20, 28, 15, 15);     //除了月份也就是num2是基于0的，其余均与习惯相同。返回毫秒数。同样也会被构造函数隐式调用。

    Date.now();        //ECMAScript 5   等同于 var somevirable = +new Date();

    // toLocalString()  toString()  valueOf()  前两者根据浏览器不同会有很大区别，valueOf()则返回毫秒数。

**5.3.2 日期格式化方法**

    var now = +new Date(),
        someDay = new Date(1991,7,16);****

`toDateString()` `toTimeString()` `toLocalDateString()` `toLocalTimeString()` `toUTCString()`  基本无用。

组件方法——p.102   (>^ω^<)


#### 5.4 RegExp(regular expression)(正则表达式)类型

#### 定义方式

`var expression = /pattern/falgs;`

(字面量形式)始终共用同一个实例。

    var re = null,
        i;
    for (i = 0;i < 10;i++){
        re = /cat/g;
        re.test("catstrophe");
    }

`var expression = new RegExp("pattern", "flags");`

构造函数形式，会创建一个新的实例。

#### 正则语法

* 转义字符,需要在前面添加"/"

  + `{}`
  + `[]`
  + `()`
  + `\`
  + `|`
  + `^`
  + `$`
  + `*`
  + `?`
  + `.`
  + `+`

* 简单转义

  + `/r` 回车
  + `/n` 换行
  + `//` /本身
  + `/t` 制表符

* 匹配一个多种字符

  + `/d` 数字0~9
  + `/w` 字母数字和下划线
  + `/s` 空格、空白字符、制表符、换页符
  + `.`  代表除了换行符之外的任意字符

* 使用[]匹配一个多种字符语法
  + `[ab5@]` 匹配a或者b或者5或者@
  + `[^abc]` 匹配除abc以外的字符
  + `[0-9]`     匹配任意一个数字
  + `[^a-f3-6]` 匹配a~f和3~6之外的任意一个字符

* 修饰匹配次数的符号
  + `{n}` 表达式重复n次

    `/w{2}` 相当于 `/w/w`
  + `{m,n}` 表达式重复至少m次至多n次

    `ab{1,3}` 可以匹配ab、abb、abbb
  + `{m,}` 表达式至少重复m次
  + `?` 表达式匹配1次或者0次

    `a[bc]?` 可以匹配a、ab、ac
  + `+` 表达式至少出现1次

    `a+b` 可以匹配 ab、aab、aaab、……
  + `*` 表达式出现0次或者任意次

    `/^*a` 可以匹配a、^^^a、……

* 抽象意义符号
  * `^` 代表开始
  * `$` 代表结尾

    `/^abc$/` 只能用来匹配abc
  * `/b` 代表一个单词边界

* 逻辑符号
  * `|` 代表或
  * `()` 修饰次数时作为一个整体，获取结果时括号内的表达式匹配到的内容可以被单独得到

    `/$(/d+/.?/d*)|￥(/d+/.?/d*)/g` 匹配 "$10.9 ￥20.5"时 会返回"$10.9"和"10.9"和"￥20.5"以及"20.5"

* 实例属性
  * global: 是否设置了g标志
  * ignoreCase: 是否设置了i标志
  * multiline: 是否设置了m标志
  * lastIndex: 开始搜索下一个匹配项的开始位置，从0开始。
  * source: 字符串表示，字面量形式("/pattern/flags")

* 实例方法

  * exec() 返回包含第一个匹配信息的数组，包含两个Array没有的副属性:index和input

        var text = "cat, bat, sat, fat",
            pattern = /.at/g;
        var matches = pattern.exec(text);
        matches.index    //0
        matches[0]       //cat
        pattern.lastIndex     //3
        matches = pattern.exec(text);
        matches.index    //5
        matches[0]       //bat
        pattern.lastIndex     //8

  * test() 返回一个布尔值

  * toLocalString() 和 toString() 均返回其source属性

  * ToDo 构造函数属性(晦涩)


#### 5.5 Function 类型

函数声明

    function sum (num1, num2){
    	return num1 + num2;
    }

函数表达式

    var sum1 = function (num1, num2){
    	return num1 + num2;
    }

函数名仅仅是指向函数对象的指针，所以JS函数没有重载。

    function withoutOverload (num1) {
    	return num1 + 100;
    }

    function withoutOverload (num1) {
    	return num1 + 200;
    }

    console.log(withoutOverload(100));     // 输出300

函数声明会被解析器率先读取，这个过程叫做函数声明提升。(function declaration hoisting)


**5.5.3 作为值的函数**

函数名本身就是变量，所以函数可以作为一个值使用。

    var someVirables = function functionName (..) {
        ....
    };

可以从一个函数中返回另外一个函数

    function callSomeFunction (someFunction, someArguments){
        return someFunction(someArguments);
    }

函数本身就可以返回一个值

      function createComparisonFunction (propertyName) {
          return function (object1, object2) {
              var value1 = object1[propertyName],
                  value2 = object2[propertyName];
              if (value1 > value2){
                  return -1;
              } else if (value1 < value2){
                  return 1;
              } else {
                  return 0;
              }
          };
      }

**5.5.4 函数内部属性**

`arguments.callee` (被召者，被调用者)

    function factorial (num){
        if (num <= 1){
            return 1;
        } else {
            return num * factorial(num-1);
        }
    }
解除这个阶乘函数对函数名的耦合，可以使用arguments对象的callee属性

    function factorial (num){
        if (num <= 1){
            return 1;
        } else {
            return num * arguments.callee(num-1);
        }
    }

`this` 对象

this对象所引用的是函数据以执行的环境对象——或者说是this的值

ECMAScript 5 中的`caller`对象

caller中保存有调用当前函数的函数的引用。

    function outer(){
        inner();
    }

    function inner () {
        console.log(arguments.callee.caller);
    }

    outer();       // 输出outer()的源代码

**5.5.5 Function的属性和方法**

* `function.length` 希望接收的命名参数的个数(函数声明或者函数表达式中包含的参数个数)。

* `function.apply()` 被用来在特定的作用域中调用函数，等于设置函数体内this的值。

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

* `function.call()` 传参方式和apply()不同，需要将传递参数逐个列举。

        function callTest3 (num1, num2){
	        return test.call(this,num1,num2);
        }

* `apply()`和`call()`的作用

        //扩充函数的作用域。
        window.color = "red";
        var o = {color: "blue"};

        function sayColor (){
        	console.log(this.color);
        }

        sayColor();        //"red"
        sayColor.call(this);      //"red"
        sayColor.call(window);        //"red"
        sayColor.call(o);       //"blue"

* bind()方法(IE9+)

        // 创建一个副本并直接指定其作用域。
        var objectSayColor = sayColor.bind(o);

        //toLocaleString()和toString()方法均返回函数的代码，并且实现依浏览器而异。


## 5.6 基本包装类型(boolean,number,string)

最好不要显式的创建基本包装类型，应用方法就好。
这些基本包装类型的寿命均是暂时的，在应用它们的方法时会创建各自类型的一个实例，应用方法并返回一个基本类型之后会立即销毁这个实例。

**5.6.1 Boolean 类型**

    // 调用构造函数并传入值
    var booleanObject = new Boolean(true);

* 重写了`valueOf()`方法，返回基本类型true或者false
* 重写了`toString()`方法，返回"true"或"false"字符串。

由于布尔转型函数对所有非空对象均返回true,所以会造成很大程度的混淆，因此不推荐使用Boolean包装类型。

**5.6.2 Number 类型**

类似Boolean包装类型，重写了三个方法。`valueOf()` `toString()` `toLocaleString()`

除了上述继承方法，还有特有的数字格式化方法。
* `toFixed()` 以指定的小数位输出数字。

        var num = 10;
        console.log(toFixed(num));     // 10.00
  会针对位数进行舍入(IE8存在bug，不能够正常舍入(-0.94,-0.5][0.5,0.94)范围内的值，均返回0)

* 类似`toFixed()`有`toExponential()`指数科学计数法和`toPrecision()`有效位数法。

**5.6.3 String 类型**

* 继承方法基本不变，均有一个length属性，表示字符串中字符的个数(包括空格)。

* 字符方法`charAt()` `charCodeAt()`接收一个参数即基于0的字符位置。

  `charAt()`输出指定位置的字符本身，`charCodeAt()`输出指定位置的字符的字符编码。
* ECMAScript 5添加了一种新的方法，使用字符串方括号加索引的方式去访问具体字符。

        var stringValue = "Hello World";
        console.log(stringValue[1]);     // "e"

**操作方法**

* `concat()`   拼接字符串并返回一个新的字符串。

* `slice()` `substr()` `substring()` 均接收一个或者两个参数，第一个指定子字符串开始的位置，第二个用来表示子字符串结束的位置。

        stringValue.slice(3);      // "lo World"
        stringValue.substring(3);      // "lo World"
        stringValue.substr(3);         // "lo World"

        // slice()和substring()的第二个参数表示子字符串结尾后的位置
        stringValue.slice(3,7);        // "lo W"
        stringValue.substring(3,7);    // "lo W"

        // substr()的第二个参数表示子字符串的长度
        stringValue.substr(3,7);       // "lo Worl"

  传入负值作为参数时，`slice()`会将传入的负值与字符串长度相加(造成一种从后往前的倒序效果)。

  `substr()`将负的第一个参数与字符串长度相加，第二个参数的负值将会被转换为0。

  `substring()`则会把所有的负值参数转换为0。

**位置方法**

* `indexOf()`和`lastIndexOf()` 分别从头和尾检索传入的子字符串并返回其位置。

  这两个方法都可以接收第二个参数，表示开始检索的位置。因此可以通过循环完成所有匹配字符串的检索。

        var stringValue = "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
            positions = [],
            pos = stringValue.indexOf("e");

        while (pos > -1){
        	positions.push(pos);
        	pos = stringValue.indexOf("e",pos+1);
        }

        console.log(positions);

* trim()方法(ECMAScript 5 IE9+)

  该方法会创建一个字符串的副本并删除前置及后缀的所有空格然后返回结果。

**大小写转换方法**

  + `toLowerCase()`
  + `toUpperCase()`
  + `toLocaleLowerCase()`
  + `toLocaleUpperCase()`


**模式匹配方法**

* `match()`

  本质上与调用RegExp的`exec()`方法相同，接收两种参数，正则表达式或者RegExp对象。
  返回一个结果数组

* `search()`

  参数与`match()`相同，返回结果的索引(第一次出现的位置)

* `replace()`

  第一个参数可以是一个RegExp对象也可以是一个字符串，第二个参数可以是一个字符串或者函数。

  第一个参数为字符串则只会替换第一个匹配结果。global属性为true的RegExp对象则会替换全部匹配结果。

    + $$----$
    + $&----整个模式的子字符串(RegExp.lastMatch)
    + $'----匹配的子字符串之前的子字符串(RegExp.leftContext)
    + $`----匹配的子字符串之后的子字符串(RegExp.rightContext)
    + $n----匹配第n个捕获组的子字符串。
    + $nn---匹配第nn个捕获组的子字符串。

  第二个参数可以使用上述一些特殊的字符序列。

        var textTest = "cat, bat, sat, fat, rat",
            replaceTest = /(.at)/g;

        textTest.replace(replaceTest,"word($&)");
        // "word(cat), word(bat), word(sat), word(fat), word(rat)"

        textTest.replace(replaceTest,"word($1)");
        // "word(cat), word(bat), word(sat), word(fat), word(rat)"

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


* `split()` 方法

  使用指定的分隔符将字符串分割成一系列子字符串，返回一个数组。

  第一个参数为指定的分隔符，可以是字符串也可以是正则表达式。第二个可选参数为分割后的项数。

* `localeCompare()` 方法

  比较两个字符串并返回一个值

  如果输入的参数字符串在字母表中应该排在字符串之前，则输出正数，相同则输出0，之后则输出负数.

  因为其输出的具体值根据实现而定，所以应该判断后再行输出。

* `fromCharCode()` 方法

  接收一定的字符串编码作为参数，然后返回一个字符串实现。

#### 5.7 单体内置对象

**Global对象**

* `encodeURI()`和`encodeURIComponent()`

  用于操纵URI(统一资源标识符,Uniform Resource Identifier)的方法，前者主要针对整体，后者针对部分。

  针对URI进行转译，前者可以使用在整个URI上，转义范围狭窄，而后者转义范围比较大。

* `decodeURI()`和`decodeURIComponent()`则是上述两个方法的反方法。

* `eval()`方法

  传入的参数会被当作真正的JS代码被解析器执行，所以一般因为安全性的问题不进行使用。

**Global的属性**

包括基础构造函数和特殊值，一般用不到。

**window对象**

Web浏览器的常见全局对象。

**5.7.2 Math对象**

属性
 * .E-----------自然对数的底数
 * .LN10--------10的自然对数
 * .LN2---------2的自然对数
 * .LOG2E-------以2为底的E的对数
 * .LOG10E------以10为底的E的对数
 * .PI----------圆周率
 * .SQRT1_2-----根号2的倒数
 * .SQRT2-------根号2

`min()`和`max()`方法

确定一组数值中的最大和最小值

    var mathValue = [1,2,3,4,5,6,7,8,9],
        maxValue = Math.max.apply(Math,mathValue);

上述代码可以方便的在数组中找到最大值。

舍入方法

 * `ceil()` 向上舍入

 * `floor()` 向下舍入

 * `round()` 标准舍入

随机方法

 * `random()`可以获得在0到1之间的一个随机数

   常规用法

        value = Math.floor(Math.random() * total + minPossibleValue);

其他Math的方法------p.136

*****

## Chapter6 面向对象的程序设计

#### 6.1 理解对象

 * 无序属性的集合，其属性可以是基本值、对象、函数。
 * 对象由任意一种引用类型(Object, Function, Array, Date, RegExp...)或者自定义类型创建。
 * 创建对象的方式主要分两种，一种是创建实例然后添加属性，一种是对象字面量。

**6.1.1 属性类型**

* 数据属性

  数据属性包含一个数据值的位置，可以进行读取和写入操作。

        [[Configurable]]  是否能够通过删除重新定义
        [[Enumerable]]    是否能够通过for-in循环显示属性
        [[Writable]]      是否能够修改其值
        [[Value]]         包含这个属性的数据值，读取值和写入值都操作这个位置，默认undefined

  操作上述这些特性的时候可以通过Object.defineProperty(object,"属性值",{特性字面量})来进行。
  调用后如不指定默认都是false，所以一般没必要用。

* 访问器属性

  访问器属性不包含数据值；包含一对getter和setter函数，有以下几个特性。

        [[Configurable]]
        [[Enumerable]]
        [[Get]]
        [[Set]]

  用起来需要特殊指定，属性名前有下划线。

        var book = {
            _year: 2004,
            edition: 1
        };

        Object.defineProperty(book,"year",{
            get: function (){
                return this._year;
            }
            set: function (){
                if(newValue > 2004) {
                    this._year = newValue;
                    this.edition += newValue - 2004;
                }
            }
        });

        //对上述特性的操作需要IE9+

* 定义多个属性的特性

        Object.defineProperties (object,{
            属性1: {
                特性1: ....,
                特性2: ....
            }
            属性2: ...
        });

* 读取属性的特性

        //特性操作方式为ECMAScript 5
        Object.getOwnPropertyDescriptor(object,"属性名");



#### 6.2 创建对象

* **6.2.1 工厂模式**

  工厂模式抽象了创建具体对象的过程，用函数来封装以特定接口创建对象的细节。

        function createPerson (name, age, job){
            var o = new Object;
            o.name = name;
            o.age = age;
            o.job = job;
            o.sayName = function (){
                alert(this.name);
            };
            return o;
        }

        var person1 = createPerson(....),
            person2 = createPerson(....);
  工厂模式解决了创建多个相似对象的问题，但是没有解决对象识别的问题。

* **6.2.2 构造函数模式**

        function Person(name, age, job){
            this.name = name;
            this.age = age;
            this.job = job;
            this.sayName = function () {
                alert(this.name);
            };
        }

        var person1 = new Person(....),
            person2 = new Person(....);

  + 构造函数模式没有显示的创建对象，直接把属性和方法赋给了this对象，没有return语句。

    其工作模式为创建一个对象；把构造函数(Person(),pascal命名)作用域赋给新对象；执行构造函数里的代码，添加属性和方法；返回这个新对象。

    创建出来的对象都会有一个constructor属性，指向Person，而且同时是Object和Person的实例。

    由构造函数模式创建的对象，都是这个构造函数的实例，就实现了对象识别的功能。

    构造函数可以被直接当作函数使用，可以作为普通函数调用也可以在指定作用域中调用。

        Person(....);
        window.sayName();   //可以执行。
        Person.call(o,....);
        o.sayName();        //可以执行。

  + 构造函数模式存在的问题在于每一个实例都独享一个方法(sayName,Function实例)。

        person1.sayName === person2.sayName     // false

    可以把这个Function实例拿出来写成一个全局函数，但是这样会影响封装性。

* **6.2.3 原型模式**

  + 原型模式的基本构造如下：

        function Person (){
        }

        Person.prototype.name = "...";
        Person.prototype.age = ...;
        Person.prototype.job = "...";
        Person.prototype.sayName = function (){
            alert(this.name);
        };

        var person1 = new Person();
        var person2 = new Person();

  + 理解原型

    创建任何函数都会有一个prototype属性，这个属性指向函数的原型对象。

    创建了构造函数之后原型对象只会默认获得constructor属性，其余属性继承自Object.

    在通过构造函数创建了新的实例之后，每一个实例都存在一个指针指向原型对象，通过原型对象我们就可以调用保存在原型中的属性和方法。(查找对象属性)

        Person.prototype.isPrototypeOf(person1)     // true
        Object.getPrototypeOf(person2) == Person.prototype;   // true

  + 改写原型对象的属性。

    可以直接在实例中改写属性，根据查找的方式，只有在实例中查找不到才会上述到原型。

    使用`hasOwnProperty()`可以检测属性是存在于实例还是原型。

        person1.hasOwnProperty("name")    // false

  + 通过in操作符可以检查通过对象能够访问到的属性，无论存储在哪里。

        "name" in person1;   // true
        function hasPrototypeProperty (object,name){
            return !object.hasOwnProperty(name) && (name in object);
        }

  + 可以使用上述函数判断属性是否保存在原型里。并不保存在实例中，而且可以访问到，所以一定在原型里。

    IE8 之前屏蔽不可枚举属性的实例属性不会出现在for-in循环中。

  + ECMAScript5则添加了一个方法可以查询存储在对象里的属性和方法。

        var keys = Object.keys(Person.prototype);   //["name","age","job","sayName"]
    上述方法都存在于Object类型里，这个方法返回一个字符串数组。

  + 使用字面量语法修改原型。

    使用字面量修改原型,本质上是完全重写，会使得其constructor属性不再指向构造函数，而是指向Object函数。

    解决这个问题可以在字面量中专门指定constructor，但是会使得constructor的枚举特性被设置为true。

    此时可以直接使用ECMA5中的`Object.defineProperty()`

        function Person (){
        }
         *
        Person.prototype = {
            name: ...,
            age: ...,
            job: ...,
            sayName: function () {
                ....;
            }
        };

        Object.defineProperty(Person.prototype , "constructor",{
            enumerable: false,
            value: Person
        };

  + 原型的动态性

    在重写原型对象之前创建的实例中的原型指针会指向旧的原型。

  + 原型模式存在的问题：

    方便的共享方法，通过实例的同名属性可以屏蔽原型中的包含基本值的属性继承，但是对于引用类型比如数组就比较麻烦。

* **6.2.4 组合使用构造函数模式和原型模式**

        function Person (name, age, job){
            this.name = name;
            this.age = age;
            this.job = job;
            this.friends = ["...","..."];
        }

        person.prototype = {
            constructor: Person,
            sayName: function () {
                alert("this.name");
            }
        }

        var person1 = new Person("...",...,"..."),
            person2 = new Person(....);

* **6.2.5 动态原型模式**

        function Person (name, age, job) {

            //属性
            this.name = name;
            this.age = age;
            this.job = job;

            //方法
            if (typeof this.sayName != "function"){

                Person.prototype.sayName = function () {
                    alert(this.name);
                };

            }
        }
        //第二段方法部分只有在初始化的时候才会执行。

* **6.2.6 寄生构造函数模式**

  创建一个函数封装创建对象的代码，然后再返回新创建的对象。可以用来生成不能去修改构造函数的特殊对象。

        function Person (name, age, job){
            var o = new Object();
            o.name = name;
            o.age = age;
            o.job = job;
            o.sayName = function () {
                alert(this.name);
            }
            return o;
        }

        function SpecialArray () {

            //创建数组
            var values = new Array();

            //添加值
            values.push.apply(values,arguments);

            //添加方法
            values.toPipedString = function () {
                return this.jion("|");
            }

            //返回数组
            return values;
        }

  需要注意的一点就是寄生模式下返回的对象跟构造函数以及构造函数的原型之间没有关系，所以尽量不要使用这种模式。

* **6.2.7 稳妥构造函数模式**

  稳妥对象，没有公共属性，其方法也不引用this对象，主要是为了安全目的

        function Pers  (name, age, job) {

            //创建要返回的对象
            var o = new Object();

            //可以在这里定义私有变量和函数

            //添加方法
            o.sayName = function () {
                alert(name);
            }

            //返回对象
            return o;
        }

  在以这种模式创建的对象，除了使用sayName()方法之外无法访问到name值。

  这样使用new操作符定义的变量里保存的就是一个稳妥对象。

#### 6.3 继承

**6.3.1 原型链**

利用原型，让一个引用类型继承另一个引用类型的属性和方法。

每个引用类型都有一个原型对象，原型对象包含一个指向构造函数的指针，而所有通过这个构造函数创建的实例都包含一个指向这个原型对象的指针。

那么我们让一个原型对象成为另外一个对象的实例，则此时的原型对象将包含一个指向另外一个原型的指针，层层递进形成原型链。


    function SuperType(){
        this.property = true;
    }

    SuperType.prototype.getSuperValue = function () {
        return this.property;
    };

    function SubType () {
        this.subProperty = false;
    }

    //形成原型链并继承
    SubType.prototype = new SuperType();

    //私有方法
    SubType.prototype.getSubValue = function () {
        return this.subProperty;
    };

    var instance = new SubType();

    instance.getSuperValue();       //true     从原型链中继承的方法。

注意`instance.constructor` 现在指向SuperType，因为其原型被完全重写了。

所有的自定义对象都有个默认原型——Object   很多方法都继承自Object。


可以使用instanceof操作符来检索一个对象原型链中出现的所有构造函数。

    instance instanceof Object             //true
    instance instanceof SuperType          //true
    instance instanceof SubTypr            //true

也可以使用`isPrototypeOf()`方法，可以检索所有原型链中出现的原型。

    Obeject.prototype.isPrototypeOf(instance);       //true
    SuperType.prototype.isPrototypeOf(instance);     //true
    SubType.prototype.isPrototypeOf(instance);       //true

给下级原型添加私有方法和属性以及覆盖上级原型的方法和属性一定要在替换原型语句之前。

    //形成原型链并继承
    SubType.prototype = new SuperType();

    //私有方法
    SubType.prototype.getSubValue = function () {
        return this.subProperty;
    };
而且在添加私有方法或者属性以及覆盖的过程中不能使用字面量方式(相当于重写原型)

原型中包含引用类型值(比如数组)的属性会被所有实例共享，在使用原型链实现继承的过程中原先的实例属性会自动变成原型属性。

**6.3.2 借用构造函数实现继承**

解决上述问题的一种继承方式。

    function SuperType (name) {
        this.color = ["red","yellow"];
        this.name = name;
    }

    function SubType (name) {

        //继承了 SuperType
        SuperType.call(this,name);
    }

通过上述方式，下级构造函数借调了上级类型的构造函数。在其中可以传递参数。

但是这种方式并没有解决函数复用的问题

**6.3.3 组合继承**

     function SuperType (name) {
         this.color = ["red","yellow"];
         this.name = name;
     }

     SuperType.prototype.sayName = function () {
         alert(this.name);
     };

     function SubType (name，age) {

         //继承了 SuperType
         SuperType.call(this,name);

         //下级实例属性
         this.age = age;
     }

     //原型链继承方法
     SubType.prototype = new SuperType();

     //对原型进行调整，添加私有方法。
     SubType.prototype.constructor = SubType;
     SubType.prototype.sayAge = function () {
         alert(this.age);
     }

以上就是最常用的基本继承方法。避免了单独使用原型链以及使用构造函数继承的缺陷。

**6.3.4 原型式继承**

借助原型可以基于已有的对象创建新对象，同时不必因此创建自定义类型。

     function object (o){
         function F () {}
         F.prototype = o;
         return new F();
     }

其内部有一个临时性的构造函数`F()`，然后将传入的对象作为这个构造函数的原型，然后返回这个临时类型的实例。

整个过程相当于对o执行了一次浅复制，得到的新实例实际上是o的副本，然后可以进行自定义。

注意得到的这个新实例和原来的对象共享引用类型值属性。

ECMAScript 5 增加了`Object.create()`方法规范了原型式继承。其可以通过第二个可选参数实现直接的自定义。

**6.3.5 寄生式继承**

同样是创建一个仅用于封装继承过程的函数，在函数内部以某种方式来增强对象，最后返回对象。

     function createAnother (original) {
         var clone = object (original);
         clone.sayHi = function () {
             alert("hi");
         }
         return clone;
     }

**6.3.6 寄生组合式继承**

组合继承最大的问题在于无论什么情况下都会调用两次上级类型的构造函数，一次是在创建子类型原型的时候，一次是在子类型构造函数内部。

而寄生组合式继承，通过借用构造函数来继承属性，通过原型链的混成形式来集成方法。不必为了指定下级类型的原型而调用上级类型构造函数。

     function inheritPrototype (subType, superType){
         var prototype = Object(superType.prototype);
         prototype.constructor = subType;
         subType.prototype = prototype;
     }

其组合模式如下:

     function SuperType (name) {
         this.name = name;
         this.colors = ["...","...","..."];
     }

     SuperType.prototype.sayName = function () {
         alert(this.name);
     }

     function SubType(name, age){
         SuperType.call(this,name);

         this.age = age;
     }

     inheritPrototype(SubType, SuperType);

     SubType.prototype.sayAge = function () {
         alert(this.age);
     }

其高效率体现在只调用了一次SuperType的构造函数，并且避免了在SubType.prototype上创建不必要的多余的属性。与此同时原型链保持不变。

-----------------

## Chapter 7.函数表达式

关于函数声明，有一个重要特征就是函数声明提升，意思是解析器执行代码前会先读取函数声明，也就意味着可以把函数放在调用它的代码后面。

     // Do not do this
     if(condition){
         function sayHi () {
             alert("hi");
         }
     } else {
         function sayHi () {
             alert("yo!");
         }
     }

因为函数声明提升的原因，解析器无法执行这种代码。

关于匿名函数的作用。可以创建函数赋值给变量也就可以把函数作为其他函数的值返回。

在任何把函数作为值的情况下，都可以使用匿名函数，当然这仅仅是匿名函数的一个用途。

#### 7.1 递归

函数名仅仅是一个指针，要解除函数名和递归函数之间的耦合，可以使用arguments.callee这个属性。

     function factorial (num) {
         if (num<1){
             return 1;
         } else {
             return num * arguments.callee(num-1);
         }
     }

在编写递归时一般不要使用函数名，arguments.callee保险的多。

严格模式下不能通过脚本访问arguments.callee属性，下面的方式可以达到同样的效果。

    var factorial = (function f (num) {
        if (num<1){
            return 1;
        } else {
            return num * f(num-1);
        }
    });

以上代码创建了一个命名函数表达式`f()`,然后将它赋值给变量，这样即便将函数值赋值给了另外的变量，函数的名字f依然有效。

#### 7.2 闭包

匿名函数和闭包是不同的两个概念。匿名函数是指函数的name属性为空字符串的函数。

而闭包是指有权访问另一个函数作用于中的变量的函数。

创建闭包的常见方式就是在一个函数内部创建另一个函数。

    function createComparisonFunction (propertyName) {

        return function (object1, object2) {
            var value1 = object1[propertyName],
                value2 = object2[propertyName];

            if (value1 < value2){
                return -1;
            } else if (value1 > value2){
                return 1;
            } else {
                return 0;
            }
        };
    }

定义value1和value2的那两行代码就访问了外部函数的变量propertyName

即使这个内部函数被返回了，而且是在其他地方被调用了，但它依然可以访问propertyName。

其实现原因跟作用域链有关，具体也是通过指针完成的。

当函数执行时会穿件一个执行环境和相应的作用域链，然后使用arguments和其他命名参数的值来初始化函数的活动对象。

在作用域链中，外部函数的活动对象处在第二位，外部函数的外部函数的活动对象处在第三位，以此类推，直到作用域链终结于全局执行环境。

函数执行过程中为了读取和写入变量的值，就需要在作用域链中查找变量。

在另一个函数内部定义的函数会将包含函数(即外部函数)的活动对象添加到它的作用域链中。因此就可以访问外部函数的参数和其中的变量。

**7.2.1 闭包与变量**

作用域链的副作用：闭包只能取得包含函数中任何变量的最后一个值。

    function createFunctions () {
        var result = new Array();

        for (var i = 0; i < 10; i++) {
            result[i] = function () {
                return i;
            };
        }

        return result;
    }

返回一个函数数组，理论上每个函数都应该返回自己的索引值，但实际上每个函数都返回10。

这是因为每个函数的作用域链中都保存着`createFunctions()`函数的活动对象，所以他们返回的都是同一个变量i。

我们可以通过创建另一个匿名函数强制让闭包的行为符合预期。

    function createFunctions () {
        var result = new Array();

        for(var i = 0; i < 10; i++){
            result[i] = function (num) {
                return function () {
                    return num;
                };
            }(i);
        }

        return result;
    }

在上述代码中我们没有直接把闭包赋给数组，而是定义了一个匿名函数，并将立即执行这个匿名函数的结果赋给数组。

这个匿名函数含有一个参数num，也就是最终函数要返回的值。调用这个匿名函数时我们传入了变量i。

由于参数是按值传递，所以i的当前值就赋给了num，而在这个匿名函数的内部又创建并返回了一个访问num的闭包。

这样一来，result中的每个函数都有自己num变量的一个副本，因此可以返回索引值。

**7.2.2 关于this 对象**

在闭包中使用this对象可能会导致一些问题，this对象是在运行时基于环境的执行环境绑定的。

在全局函数中this等于window。而当函数作为某个对象的方法进行调用的时候，this等于那个对象。

而匿名函数的执行环境具有全局性，所以闭包里的this通常指向window。针对这个特性我们可以调整编写闭包的方式。

    var name = "the window";

    var object = {
        name: ".....",

        getNameFunc: function () {
            return function () {
                return this.name;
            };
        }
    };

    alert (object.getNameFunc()());      //"the window" (在非严格模式下)

调用`object.getNameFunc()()`就是立即调用被返回的匿名函数，此时this对象就指向全局属性"the window"。

每个函数在被调用的时候都会自动取得两个特殊变量，this和arguments。

内部函数在搜索这两个变量时永远不可能直接访问外部函数中的这两个变量。

但是通过把外部作用域中的this对象保存在一个闭包能够访问到的变量里，就可以实现闭包访问外部函数的this对象。

    getNameFunc: function () {
        var that = this;
        return function () {
            return that.name;
        };
    }

几种特殊的情况下，this对象的值可能会发生突变。

    var name = "the window";

    var object = {
        name: ".....",

        getName: function () {
            return this.name;
        }
    };

    object.getName();                          //"....."
    (object.getName)();                        //"....."
    (object.getName = object.getName)();       //"the window"

第二种调用方式，像是引用这个函数然后立即执行，此时this的值得到了保存。

第三行代码先执行了一次赋值，然后再调用赋值后的函数并执行，因为这个赋值表达式的值是函数本身，所以this的值得不到维持。

即使是语法的细微变化，都有可能意外改变this的值。

**7.2.3 内存泄漏**

闭包在IE9以下的版本中会导致一些特殊的问题，具体来说，如果闭包的作用域链中保存了一个HTML元素，则该元素无法被销毁。

    function assignHander () {
        var element = document.getElementById("....");
        element.onclick = function () {
            alert("element.id");
        };
    }

以上代码创建了一个元素事件处理程序的闭包，且内部包含一个循环引用，即对`assignHander()`活动对象的引用。

所以就无法减少element的引用数。因此其内存永远不会被回收。需要改写代码进行解决。

    var id = element.id;
    element.onclick = function () {
        alert(id);
    };

    element = null;

通过把element.id的一个副本保存在一个变量里，在闭包中引用这个变量消除循环引用。

同时因为闭包会引用包含函数的整个活动对象，其中包含element，因此有必要把elements设置为null，从而解除对DOM对象的引用。

#### 7.3 模仿块级作用域

JS不存在块级作用域。块语句中定义的变量，实际上是在包含函数中而非语句中创建的。

JS可以多次声明同一个变量，后续声明会被无视，但是会执行后续声明中的变量初始化。

用作块级作用域的匿名函数语法如下：

    (function () {
        //这里是块级作用域
    })();

意思是创建一个匿名函数并且立即执行。

这种写法常在全局作用域中被用在函数外部从而限制向全局作用域中添加过多的变量和函数。

同时这种写法也减少了闭包占用内存的问题，因为没有指向匿名函数的引用。函数被立即执行完毕，其作用域链便被直接销毁。

#### 7.4 私有变量

JS中没有私有成员的概念，但是有私有变量。在任何函数中定义的变量，都可以认为是私有变量。

在函数内部创建一个闭包，那么闭包通过自己的作用域链也可以访问私有变量。

利用这一点就可以创建用于访问私有变量的公有方法。亦即特权方法(privileged method)。

    function MyObject () {

        //私有变量和方法
        var privateVariable = 10;

        function privateFunction () {
            return false;
        }

        //特权方法
        this.publicMethod = function () {
            privateVariable++;
            return privateFunction();
        };
    }

利用私有和特权成员可以隐藏那些不应该被直接修改的数据。

    function Person (name) {

        this.getName = function () {
            return name;
        };

        this.setName = function (value) {
            name = value;
        };
    }

以上可以做到对name属性的禁止直接修改操作，存在的问题是必须使用构造函数模式，针对每个实例都会创建同样一组新方法。

**7.4.1 静态私有变量**

解决复用问题的一种方法。在私有作用域中定义私有变量或者函数。

    (function () {

        //私有变量
        var name = "";

        //构造函数
        Person = function (value) {
            name = value;
        };

        //特权方法
        Person.prototype.getName = function () {
            return name;
        };

        Person.prototype.setName = function (value) {
            name = value;
        };
    })();

以上代码解决了方法的复用，但是每个实例都没有自己的私有变量，公用同一个name，一次单独调用setName会针对所有的实例。

**7.4.2 模块模式**

为单例创建私有变量和特权方法。

JS惯例是使用字面量语法来创建单例对象的。

    var singleton = {
        name: value,
        method: function () {
            //这里是方法代码
        }
    };

模块模式通过为单例添加私有变量和特权方法能够使其得到增强。

    var singleton = function () {

        //私有变量和方法
        var name = value;

        function privateFunction () {
            return false;
        }

        //特权/公有方法
        return {
            publicProperty: true,

            publicMethod: function () {
                console.log(name);
                return privateFunction();
            }
        };
    }();

使用了一个返回对象的匿名函数，匿名函数内部定义了私有变量和函数，然后将一个字面量作为函数的值返回。

本质上讲这个对象字面量定义的是单例的公共接口。这种方式特别适用于需要对单例进行某些初始化，同时又要维护其私有变量的情况。

    var application = function () {
        var components = new Array();

        //初始化
        components.push(new BaseComponent());

        //公共
        return {
            getComponentCount: function () {
                return components.length;
            },

            registerComponent: function (component) {
                if (typeof component == "object"){
                    components.push(component);
                }
            }
        };
    }();

**7.4.3 增强的模块模式**

返回对象之前加入对其增强的代码，适合那些单例必须是某种类型的实例，同时还必须添加某些属性或方法来对其进行增强的情况。

例如下面的代码中如果application对象必须是BaseComponent的实例

    var application = function () {

        //私有变量
        var components = new Array();

        //初始化
        components.push(new BaseComponent());

        //创建application的一个局部副本
        var app = new BaseComponent();

        //公共接口
        app.getComponentCount = function () {
            return components.length;
        };

        app.registerComponent = function (component) {
            if (typeof component == "object") {
                components.push(component);
            }
        };

        //返回副本
        return app;
    }();

返回的对象必须是BaseComponent的实例，app这个实例实际上是其的一个局部变量版。

----------

## Chapter8. BOM(Browser Object Model)

#### 8.1 window对象

BOM的核心对象

window对象表示浏览器的一个实例。既是通过JavaScript访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象。

在网页中定义的任何一个对象，变量和函数都以window作为其Global对象，因此有权访问`parseInt()`等方法。

**8.1.1 全局作用域**

因为window扮演着ECMAScript中的Global对象的角色，因此所有在全局作用域中声明的变量、函数都会变成window对象的属性和方法。

定义的全局变量与直接定义window对象的属性存在一个区别就是全局对象不能通过delete删除而window对象可以。

**8.1.2 窗口关系及框架**

如果页面包括框架，则每个框架都拥有自己的window对象，并且保存在frames集合中。

框架集通过html中的frameset和frame标签进行定义。

此时访问全局对象应该通过`top.frame[0]`这种方式进行。

**8.1.3 窗口位置**

因为浏览器差异所以获取窗口位置因为浏览器差异导致需要一定的步骤

 * screenLeft&screenTop  : IE Safari Opera Chrome

 * screenX&screenY : Firefox Safari Chrome

        var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX,
            topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;

同时需要注意的是，IE和Opera上述值表示的是屏幕边缘到页面可见区域的距离，而Chrome、Firefox和Safari则表示屏幕边缘到浏览器窗口的距离。

精确的移动窗口一般采用两个方法即`moveTo()`和`moveBy()`均接收两个参数表示X和Y方向的坐标像素值。

其中`moveBy()`中的参数为正则表示默认向左向下。

**8.1.4 窗口大小**

同样因为跨浏览器实现不同导致了很多问题，常见的属性为innerWidth、innerHeight、outerWidth、outerHeight。

分别表示页面大小和浏览器窗口大小。

页面视口的大小可以通过`document.documentElement.clientWidth`和`document.documentElement.clientHeight`来取得。

通行的取得视口大小的代码如下

    var pageWidth = window.innerWidth,
        pageHeight = window.innerHeight;

    if (typeof pageWidth != "number"){
        if(document.compatMode == "CSS1Compat"){
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        } else {
            pageWidth = document.body.clientWidth;
            pageHeight = document.body.clientHeight;
        }
    }

调整浏览器窗口大小可以使用两个方法，`resizeTo()`和`resizeBy()`,其中后者参数正数为加

**8.1.5 导航和打开窗口**

`window.open()`方法可以导航到一个特定的URL，这个方法接受4个参数，要加载的URL、窗口目标、一个特性字符串、一个表示是否取代浏览器历史记录中当前加

载页面的布尔值(不打开新窗口)。一般会使用1和4。

如果传递了第二个参数，且参数是已有窗口或者框架的名称，则就会在指定的窗口或者框架里加载指定的URL。

    window.open("http://www.......","topFrame");      // 等同于<a href="http://......" target="topFrame">...</a>

第二个参数还可以是_top、_self、_parent、_blank等特殊的窗口名称。

* 弹出窗口

  如果传入的第二个参数并不是已存在的窗口或者框架，则会根据第三个参数传入的字符串创建一个新窗口或者新标签页。如果没有第三个参数则会打开一个全默认的新浏览器窗口。

  第三个字符串是一个逗号分隔的设置字符串，常见的设置选项有fullscreen/height/left/location(地址栏)/menubar/resizable/scrollbars/status(状态栏)/toolbar/top/width..

  `window.open()`方法会返回一个指向新窗口的引用，引用的对象与其他window对象大致类似。通过这个返回的对象我们可以调整其弹出的窗口

        var wroxWin = window.open(......);

        //调整大小
        wroxWin.resizeTo(...,....);

        //移动位置
        wroxWin.moveTo(...,...);

        //关闭
        wroxWin.close();
        关闭之后会存在一个wroxWin.closed属性，是一个表示关闭与否的布尔值。当然这个对象也存在一个opener属性，一般是window。

* 安全限制

  广告商对弹出窗口的滥用十分严重，从IE6开始各大浏览器厂商的各代的浏览器都对弹出窗口的安全设置进行了很多限制。

* 弹出窗口屏蔽程序

  + 如果弹出窗口被浏览器屏蔽，则`window.open()`会返回null，可以通过下面的代码进行检测。

        var wroxWin = window.open("http://www.balabala.com","_blank");
        if (wroxWin == null) {
            ...do something...
        }

  + 如果弹出窗口被浏览器插件或者其他软件屏蔽，则`window.open()`会抛出一个错误，可以修正代码为下面的形式进行检测。

        var blocked = false;

        try {
            var wroxWin = window.open(....);
            if(wroxWin == null){
                blocked = true;
            }
        } catch {
            blocked = true;
        }

        if (blocked == true) {
            ....do something..
        }

**8.1.6 间歇调用和超时调用**

JavaScript是单线程语言，但它允许通过设置超时值和间歇时间值来调度代码在特定的时刻执行。

* 超时调用

  其使用的是window对象的`setTimeOut()`方法，接受两个参数，要执行的代码和以毫秒表示的时间。

  一般第一个参数我们使用一个函数，而不使用类似`eval()`方法所使用的JavaScript代码构成的字符串。其一般形式如下：

        setTimeOut(function () {
            ...do something..
        }, 1000);

  因为JavaScript的单线程特性，只有在延时时间到了之后，任务队列为空时任务才会立即执行，并返回一个数值ID表示超时调用。

  这个超时ID可以用来取消还没有进行的超时调用，使用`clearTimeOut()`方法，一般形式如下：

        var timeOutID = setTimeOut(function () {
            // do something
        }, 1000);

        // 取消调用
        clearTimeOut(timeOutID);

* 间歇调用

  和超时调用类似，只是会按照指定时间间隔重复执行代码，直到其被取消或者页面被卸载。按照其特性，一般使用形式如下：

        var num = 0;
        var max = 10;
        var intervalID = null;

        function incrementNumber () {
            num++;
            // do something A

            if (num == max) {
                clearInterval(intervalID);
                // do something B
            }
        }

        intervalID = setInterval(incrementNumber, 500);

  上面的代码可以执行10次A后自定停止并执行一次B，类似的形式也可以使用超时调用进行实现。代码如下：

        var num = 0;
        var max = 10;

        function incrementNumber () {
            num++;
            // do something A

            if (num < max) {
                setTimeOut(incrementNumber, 500);
            } else {
                // do something B
            }
        }

        setTimeOut(incrementNumber, 500);

**8.1.7 系统对话框**

系统对话框的显示模式由系统和浏览器决定，和网页没有关系，也不包含HTML，其打开是同步和模态的，显示系统对话框时代码会停止执行。

* `alert()`

  警告对话框，最常见的对话框，接受并将一个字符串显示给用户，其包含一个OK按钮，点击即可关闭。

* `confirm()`

  显示一个确认对话框，包含一个OK和一个Cancel按钮，会根据点击返回布尔值。

* `prompt()`

  显示一个提示框，除了显示确认对话框的两个按钮外还会提供一个文本输入区域，以供用户输入文本。

  同时它接受两个参数，第一个是显示给用户的字符串，第二个是文本输入区域的默认内容。

* 两个异步的对话框`window.print()`和`window.find()`

  异步执行，所以会将控制权直接还给脚本，不会就用户在对话框中的操作给出任何信息，因此用处有限。

#### 8.2 location对象

号称最有用的BOM对象，提供了与当前窗口中加载的文档有关的信息。

location对象是个很特殊的对象，既是window对象的属性，也是document对象的属性。`window.location`和`document.location`是同一个对象。

其作用不单单表现在其保存着当前文档的信息，而且还表现在它将URL解析为独立的片段以供开发人员访问。

**location对象的属性**

* hash:返回URL的hash(#后跟的零或多个字符)，如果URL不包含散列，则返回空字符串。

        "#content"
* host:返回服务器名称和端号口(如果有的话)。

        "www.wrox.com:80"
* hostname:返回不带端口号的服务器名称。

        "www.wrox.com"
* href:返回当前加载页面的完整URL。location对象的`toString()`方法也返回这个值。

        "http://www.wrox.com"
* pathname:返回URL中的目录和(或)文件名。

        "/WileyCDA/"
* port:返回URL中指定的端口号，如果URL未指定端口号则返回空字符串。

        "8080"
* protocol:返回页面使用的协议。通常是http:或者https:

        "http:"
* search:返回URL的查询字符串，这个字符串以?开头

        "?q=javascript"

**8.2.1 查询字符串参数**

虽然通过上述属性可以访问到location对象的大多数信息，但其中访问URL包含的查询字符串的属性并不方便。

location.search返回?号后的所有内容，但没有办法逐个访问其中每个查询字符串参数。为此可以创建一个函数。

    function getQueryStringArgs () {

        //取得查询字符串并去掉开头的问号
        var qs = (location.search.length > 0 ? location.search.subString(1) : ""),

            //保存数据的对象
            args = {},

            //取得每一项
            items = qs.length ? qs.split("&") : [],
            item = null,
            name = null,
            value = null,

            //在for循环中使用
            i = 0,
            len = items.length;

        //逐个将每一项添加到args中。
        for (i = 0; i < len; i++) {
            item = items[i].split("=");
            name = decodeURLComponent(item[0]);
            value = decodeURLComponent(item[1]);

            if (name.length) {
                args[name] = value;
            }
        }

        return args;
    }

`decodeURLComponent()`主要用来解码，然后函数执行的结果就是name作为args对象的属性，其值为value。

    //假设查询字符串为"?q=javascript&num=10"

    var args = getQueryStringArgs();

    console.log(args["q"]);       //"javascript"
    console.log(args["num"]);     //"10"

**8.2.2 位置操作**

使用location对象可以通过很多方式来改变浏览器的位置

* 最常用的就是使用`assign()`方法并为其传递一个URL

        location.assign("http://.......");
  这样就可以立即打开一个新的URL并在浏览器里生成一条记录。

  给`window.location`或者`location.href`设置一个新的值同样也是调用这个方法。

* 其他直接修改location属性的操作也能改变当前加载的页面。

  以上述任意一种方式修改URL之后，浏览器历史记录都会生成一条新记录，此时按"后退"按钮都会回到原来的页面

* `replace()`方法

  这种方法只接受一个参数，，即要导航到的URL。`location.replace()`并不会在浏览器历史记录里添加记录，此时无法使用"后退"。

* `reload()`

  `reload()`不需要任何参数，作用是重新载入当前页面。页面会以最有效的方式进行进行重载，如果页面没有变化则会从浏览器重载。

  需要强制从服务器重载，则需要给这个方法传递一个参数true。

        location.replace();       //最有效的方式重载
        location.reload(true);    //强制从服务器重载

#### 8.3 navigator对象

用于识别客户端浏览器，其具体属性或者方法详见p-210，这些属性和方法通常用于检测显示网页的浏览器类型(详见Chapter.9)。

**8.3.1 检测插件**

* 对于非IE浏览器，使用plugins数组来达到这个目的。数组中的每一项都包含一下属性。

  + name 名字
  + description 插件的描述
  + filename 插件的文件名
  + length 插件所处理的MIME类型数量

  一般使用对name属性的迭代查询来实现对是否有具体插件进行查询，可以用下面这个函数来实现。

        function hasPlugin (name) {
            name = name.toLowerCase(name);
            for (var i = 0; i < navigator.plugins.length; i++) {
                if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
                    return true;
                }
            }

            return false;
        }

* IE中的插件检测比较复杂，唯一方式就是专有的ActiveXObject类型。

  因此想要检测具体的插件，必须要知道其COM标识符。例如flash的标识符就是ShockwaveFlash.ShockwaveFlash。

  其一般使用下面的函数实现：

        function hasIEPlugin (name) {
            try {
                new ActiveXObject (name);
                return true;
            } catch (ex) {
                return false;
            }
        }

* 统合方式，因为需要传递两个不同的参数，一般使用具体函数。

        function hasFlash () {
            var result = hasPlugin("flash");
            if (!result) {
                result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
            }

            return result;
        }

**8.3.2 注册处理程序**

`registerContentHandler()`和`registerProtocolHandler()`是Firefox专属的navigator对象的属性。

这两个方法可以可以让一个站点指明它可以处理特定类型的信息。

#### 8.4 screen对象

其在编程中用处不大，基本上只用来表明客户端的能力，包括浏览器外部的显示器的信息，比如像素宽度和高度等。

而且其根据浏览器的不同，支持的属性也不尽相同，详见p-214。

#### 8.5 history对象

history对象保存着用户上网的历史记录。

因为它算是window对象的属性，所以用户的每个浏览器窗口，每个标签页，乃至每个框架都有自己的history对象(与特定的window对象关联)。

出于安全考虑，开发者无法得知用户浏览过的URL。不过借由用户访问过的列表，可以实现前进和后退。

**`go()`方法**

使用`history.go()`方法可以在用户的历史记录里任意跳转，这个方法接收一个参数。

* 接收数字参数

  正数表示向前(类似前进按钮)，负数表示向后(类似后退按钮)：

        //后退一页
        history.go(-1);

        //前进两页
        history.go(2);

* 传递字符串参数

  接收字符串参数时，浏览器会跳转到历史记录里包含该字符串的第一个位置，可能前进也可能后退，如果不存在这样的历史记录则什么也不做。

        //跳转到最近的baidu页面
        history.go("baidu");

**简写方法\*2**

* `back()`

  简单模拟后退
* `forward()`

  简单模拟前进

**history的length属性**

`history.length`里保存着从窗口打开以来的所有历史记录。也可以同来导航。

    if (history.length == 0) {
        //这应该是用户打开窗口之后的第一个页面
    }

-----------

## Chapter 9.客户端检测

-----------

## Chapter 10.DOM

DOM(Document Object Model)，文档对象模型，是针对HTML和XML文档的一个API(Application Program Interface)，即应用程序编程接口。

DOM描绘了一个层次化的节点树，其脱胎于远古时期的DHTML(动态HTML)，现在已经成为一种表现和操作页面标记的真正的跨平台、语言中立的方式。

#### 10.1 节点层次

文档节点是每个文档的根节点，在HTML页面中一般只有html可以作为根节点，所以其也被称为为文档元素。

每一段标记都可以通过一个节点进行表示，HTML元素通过元素节点表示，特性通过特性节点表示，文档类型通过文档类型节点表示，注释则通过注释节点表示。

总共有12种节点类型，这些类型都继承自一个基类型——node类型。

**10.1.1 Node类型**

DOM1级定义了一个Node接口，该接口将有DOM中的所有类型实现，其在JavaScript中是作为Node类型实现的。

JS中的所有节点类型都继承自这个类型，除IE外所有浏览器都可以访问到Node类型。


* nodeType属性
  每个节点都有一个nodeType属性，对应于定义在Node类型下的12个数值常量，任何节点必居其一。

  1. Node.ELEMENT_NODE(1)
  2. Node.ATTRIBUTE_NODE(2)
  3. Node.TEXT_NODE(3)
  4. Node.CDATA_SECTION_NODE(4)
  5. Node.ENTITY_REFERENCE_NODE(5)
  6. Node.ENTITY_NODE(6)
  7. Node.PROCESSING_INSTRUCTION_NODE(7)
  8. Node.COMMENT_NODE(8)
  9. Node.DOCUMENT_NODE(9)
  10. Node.DOCUMENT_TYPE_NODE(10)
  11. Node.DOCUMENT_FRAGMENT_NODE(11)
  12. Node.NOTATION_NODE(12)

  这些数字值和节点类型一一对应。具体使用如下：

        if (someNode.nodeType = 1) {
            console.log("this node is an element");
        }

* nodeName和nodeValue属性

  可以使用这两个属性来了解节点的具体信息，这两个属性的值完全取决于节点的类型，所以在使用前最好进行检测。

        if (someNode.nodeType == 1) {
            value = someNode.nodeName;         //对于element元素来说nodeName是标签名
        }

  对于元素节点，nodeName中保存的是标签名，而nodeValue始终等于null。

* 节点关系

  + childNodes

    每个节点都有一个childNodes属性，其中保存着一个NodeList对象。

    NodeList对象是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点。要注意的是虽然它有length属性，
    可以使用方括号语法，但是NodeList并不是Array的实例。

    NodeList的独特在于它是基于DOM结构动态执行查询的结果，DOM结构的变化能够直接的反映在NodeList对象中。

          var firstChild = someNode.childNodes[0],
              secondChild = someNode.childNodes.item(1),
              count = someNode.childNodes.length;
    对arguments对象使用`Array.prototype.slice()`方法可以将其转化成数组，使用这种方法也可以将childNodes对象转化为数组

          //这种方法在IE8以及之前的版本中无效
          var arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0);

          //以下代码可以在任何浏览器中运行
          function convertToArray (nodes) {
              var array = null;
              try {
                  array = Array.prototype.slice.call(nodes,0);
              } catch (ex){
                  array = new Array();
                  for (var i = 0; i < nodes.length; i++) {
                      array.push(nodes[i]);
                  }
              }

              return array;
          }
  + parentNode

    这个属性指向自己的父节点。
  + previousSibling和nextSibling属性

    这两个属性分别指向自己的前一个和后一个同胞节点。如果不存在，则为null。
  + firstChild和lastChild
    分别指向第一个和最后一个子节点也就是`someNode.childNodes[0]`和`someNode.childNodes[someNode.childNodes.length-1]`。

    如果不存在子节点，则两者都为null。
  + `hasChildNodes()`方法

    如果节点有一个或者多个子节点就返回true。
  + ownerDocument属性

    这个属性指向表示整个文档的文档节点(例如html节点)

* 操作节点

  + `appendChild()`方法

    这个方法可以用来向childNodes列表的末尾插入一个新的节点，并返回这个插入的节点。插入结束后，相关的指针关系都会得到更新。

        var returnedNode = someNode.appendChild(newNode);
        console.log(returnedNode == newNode);      //true
        console.log(someNode.lastChild == newNode);    //true

    需要注意的是任何DOM节点都不能出现在文档中的多个位置上，DOM树本质上是指针的集合，而且实时刷新。

        var returnedNode = someNode.appendChild(someNode.firstChild);
        console.log(returnedNode == someNode.firstChild);   //false
        console.log(returnedNode == someNode.lastChild);   //true

    以上代码相当于对原来的第一个子节点进行了一次队列出和队列入(顺次移位)。

  + `insertBefore()`方法

    可以将节点插入childNodes的某个特定位置，接收两个参数即插入节点和参照节点。

    即将插入节点变成参照节点的上一个同胞节点(previousSibling)，并返回插入节点。

        var returnedNode = someNode.insertBefore(newNode,someNode.firstChild);
        console.log(someNode.firstChild == someNode);    //true

  + `replaceChild()`方法

    这个方法接受的两个参数为插入节点和被替换的节点。所以这个方法不会改变childNodes列表的长度。

        //替换第一个子节点为newNode。
        var returnedNode = someNode.replaceChild(newNode,someNode.firstChild);

    使用`replaceNode()`时，被替换的节点的指针关系都被替换它的节点剥夺过来，虽然被替换的节点依然在文档里，但是已经没有位置了。

  +  `removeChild()`方法

    只接受一个参数，既要移除的子节点，同`replaceChild()`一样，被移除的节点理论上依然属于文档，但是已经没有位置了。

* 其他方法

  + `cloneNode()`

    复制一个节点并返回这个副本，这个方法接受一个布尔值参数，表示是否进行深复制。

    如果参数为true，则会复制节点以及其整个子节点树(包括子节点的子节点等等)，否则只会复制节点本身。

    被返回的副本并没有父节点，因此是在文档里没有位置的，除非进行插入或者替换。

        //html部分
        <ul id = "my_ul">
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
        </ul>

        //js部分
        var myList = document.getElementByID("my_ul"),
            deepList = myList.cloneNode(true);
        console.log(deepList.childNodes.length);       //3(IE<9)或者7(其他浏览器)

    因为在IE9之前的IE中，并不会为空白符创建节点，因此显示的子节点列表长度不一样。

  + `normalize()`方法

    这个方法的唯一作用就是处理文档树中的文本节点。
    当在某个节点上调用这个方法时，就会将这个节点的后代节点中的空文本节点删除，相邻文本节点合并。

**10.1.2 Document类型**

JavaScript通过Document类型来表示文档。在浏览器中，document对象是HTMLDocument(继承自Document类型)的一个实例，表示整个页面。

而且页面中的document对象是作为window的属性，因此可以作为全局对象来访问。

* Document节点的特征
  + nodeType编号为9
  + nodeName的值为"#document"
  + nodeValue的值为null
  + parentNode的值为null
  + ownerDocument的值为null
  + 其子节点可以为至多一个DocumentType或者Element，或者不限数量的Comment或者ProcessingInstruction。

  可以表示HTML页面或者其他基于XML的文档，不过最常见的还是作为HTMLDocument实例的document对象。

* 文档的子节点

  DOM规定了Document的子节点的类型，但还有两个内置的访问其子节点的快捷方式。

  + documentElement属性

    其始终指向HTML页面中的html元素

  + 另外还可以通过其childNodes列表来访问文档元素

        var html = document.documentElement;
        console.log(html == document.firstChild);    //true
        console.log(html == document.childNodes[0]);   //true

  + document对象还有一个body属性，指向body元素

  + document.doctype 以及直接作为document类型子节点的注释

    这两者在解释上根据浏览器的版本不同有很多差异，因此一般不做考量。

* 文档信息

  作为HTMLDocument的实例，document还有一些Document类型没有的属性。

  + title属性

    包含着页面中Title标签内的信息。
  + URL属性

    包含着页面显示在地址栏的URL
  + domain属性

    只包含页面的域名
    如果URL为"http://www.baidu.com/Wilety/CDA" 则domain属性的值为"www.baidu.com"
  + referrer属性

    保存着链接到当前页面的那个页面的URL信息
  这三个属性中只有domain是可以设置的。可以将domain改为域的一个子域名。

        //假设页面来自于p2p.wrox.com域
        document.domain = wrox.com;      //可行

        document.domain = baidu.com;     //出错
  当页面中包含来自其他子域的框架或者内嵌框架时，对domain进行设置就非常方便。

  通过将所有子域页面的domain均设置为相同值，则可以完成跨域通信。

  同时对domain属性还有一个限制，就是如果将domain设置为松散的(baidu.com)，就不能再将其改回紧绷状态(www.baidu.com)。

* 查找元素

  取得特定元素的操作由document对象的几种方法来完成。

  其中Document对象提供了两种：
  + `getElementByID()`

    接收一个字符串参数，必须要与html元素的id特性(attribute)严格匹配，包括大小写，然后如果找到则返回这个元素，否则返回null。

    如果有多个元素拥有相同的ID，则至返回第一个结果。

    IE7以及更低版本还有一个怪癖，会按照表单元素的name特性进行检索。为了避免这种情况，最好不要表单字段的name属性和其他元素的id相同。

  + `getElementsByTagName()`

    返回拥有指定标签名的所有元素，在HTML页面中返回一个HTMLCollection对象，跟NodeList非常相似，也是一个动态集合。

        var images = document.getElementsByTagName("img");
        console.log(images.length);      //输出img元素的数量
        console.log(images[0].src);      //输出第一个img元素的src特性
        console.log(images.item(0).src);      //输出第一个img元素的src特性
    HTMLCollection对象还有一个方法叫做namedItem(),使用这个方法可以通过元素的name属性取得集合中的项。

    同时HTMLCollection对象还支持按名称访问，所以一下两种方式是等效的。

        var myImage = document.getElementsByTagName("img").namedItem("myImage");
        var myImage = document.getElementsByTagName("img")["myImage"];

  下面是只有HTMLDocument才有的方法:

  + `getElementsByName()`

     这个方法返回带有给定name特性的所有元素，常被用来获取单选按钮。

     这个方法同样返回一个HTMLCollection对象，但是对这个对象使用`nameItem()`方法仅返回集合中的第一个结果，因为所有项name特性都相同。

* 特殊集合

  除了属性和方法，document对象还有一些特殊的集合，这些集合都是HTMLCollection对象。

  + document.anchors   包含文档中所有带有name特性的`<a>`元素。
  + document.forms     包含文档中所有的form元素，等效于`document.getElementsByTagName("form")`
  + document.images    包含文档中所有的img元素。
  + document.links     包含文档中所有带href特性的`<a>`元素。

* DOM一致性检测

  对DOM的功能进行检测。使用的方法为`hasFeature()`，详细的信息参见p-259。

* 文档写入

  这是document对象的一个基本功能，亦即将输出流写入到网页中的功能。这个功能体现在下列四个方法中
  + `write()`
    接受一个字符串参数，并原样写入。
  + `writeln()`
    接受一个字符串参数，原样写入后加一个换行符。

  上述两个方法可以用来在网页加载时动态地加入内容。

        <body>
            .....
            <script type = "text/javascript">
                document.write("<strong>" + (new Date()).toString() + "</strong>");
            </script>
        </body>
  其中的JavaScript代码能够正常执行。

  这种方式还可以用来动态的加载外部文件。

        <body>
            .....
            <script type = "text/javascript">
                document.write("<script type = \"text/javascript\" src = \"file.js\">" + "<\/script>");
            </script>
        </body>
  需要注意的就是</script>需要转义，否则会被解析为标签结束。

  另外如果在文档加载完毕后调用`document.write()`则会重写整个页面。

        <body>
            .....
            <script type = "text/javascript">

                //按照以下方式调用会重写整个页面。
                window.onload = function () {
                    document.write("Hello World!");
                }
            </script>
        </body>
  + `open()`
  + `close()`

  上述两个方法一般用来打开或者关闭网页的输出流，一般较少使用。

**10.1.3 Element类型**

Web编程中最常用的类型，主要用于表现HTML或者XML元素，提供对标签名，子节点和特性的访问。

* Element类型的特性

  + nodeType的值为1
  + nodeName的值为标签名
  + nodeValue的值为null
  + parentNode可能为Document或者Element
  + childNode可能为Element、Text、Comment、ProcessingInstruction、CDATASection、EntityReference。

  想要访问标签名，可以使用nodeName属性也可以使用tagName属性。

  在HTML中标签名始终保持大写，而在XML中则和源代码保持一致，因此在比较中一般会较多的使用`toLowerCase()`方法。

        var tag_name = someElement.tagName;
        if (tag_name.toLowerCase() == div) {
            console.log("this is a div");
        }

* HTML元素

  所有的HTML元素都由HTMLElement类型展示，不同直接通过这个类型也是通过它的子类型。

  HTMLElement继承自Element并添加了一些属性：
  + id
  + title   有关元素的附加说明信息
  + lang    元素内容的语言代码，很少用
  + dir     文字的方向，值为ltr或者rtl
  + className

* 关于特性

  每个元素都会有一个或者多个特性，这些特性的用途是给出相应元素或其内容的附加信息。

  操作特性的属于Element类型的DOM方法主要有三个
  + 取得特性  `getAttribute()`

    传递一个给定的特性名称，返回这个特性的值，如果这个特性不存在，返回null。这个特性可以是自定义的。

    需要注意的是特性名称不区分大小写，而且根据HTML5的规定，自定义特性应该加上data-前缀以便于验证。

    只有公认的特性才会以属性的形式添加到DOM对象中。

        <div id = "my_id" align = "left" data-my-special-attribute = "hello!"></div>

        var div = document.getElementByID("my_id");
        console.log(div.getAttribute("align"));    //"left"
        console.log(div.align);       //"left"
        console.log(div.getAttribute("data-my-special-attribute"));    //"hello!"
        console.log(div.data-my-special-attribute);    //undefined

    有两类特殊的特性，其值和通过`getAttribute()`所获取的值不同
    - style

      通过属性来访问style会返回一个对象，用于编程方式访问元素样式

      通过`getAttribute()`方法访问style则会获得作为其特性值的CSS文本
    - 类似onclick的事件处理程序

      通过属性来访问onclick会返回一个JavaScript函数。

      而通过`getAttribute()`方法访问则会返回代码构成的字符串。

    因为以上的种种差别，在编程时一般不使用`getAttribute()`方法而仅仅使用属性。只有在针对自定义特性时才会使用方法。
  + 设置特性  `setAttribute()`

    这个方法接收两个参数，要设置的特性名和值，如果特性已经存在则会替换，如果不存在则会直接创建。

    因为所有的特性都是属性，所以直接给属性赋值也可以设置特性的值，然而给DOM对象添加一个自定义属性，并不会自动成为其特性。

        //以下两种方式等效
        div.setAttribute("id","someOtherID");
        div.id = "someOtherID"

        //以下两种方式并不等效
        div.myColor_1 = "red";
        div.setAttribute("myColor_2","blue");
        console.log(div.getAttribute("myColor_1"));    //null (IE除外)
        console.log(div.getAttribute("myColor_2"));    //"blue"

  + `removeAttribute()`(IE7+)

    这个方法一般用来完整的移除特性，不单单会清除特性的值。并不常用(仅用于序列化DOM元素时指定要包含哪些特性)。

* attributes属性

  只有Element类型有这个属性，包含一个NamedNodeMap，和NodeList类似，是一个动态的快照集合，元素的每一个特性都由一个Attr节点表示。
  每个节点都保存在NamedNodeMap对象中，其拥有以下方法：

  + `getNamedItem(name)`:返回nodeName属性等于name的节点
  + `removeNamedItem(name)`:从列表中移除nodeName等于name的节点
  + `setNamedItem(node)`:向列表中添加节点，以nodeName属性为索引
  + `item(pos)`:返回位于数字pos位置处的节点。

  Attr节点的nodeName就是特性的名称，而节点的nodeValue就是特性的值。

  因为这一属性的相关操作相对于上面的三种方法并不方便，所以除了在需要遍历的时候会使用。

  一下代码可以迭代元素的每一个特性，然后将他们构造成键值对的字符串格式。

        function outputAttributes (element) {
            var pairs = new Array(),
                attrName,
                attrValue,
                i,
                len;

            for (i = 0, len = element.attributes.length; i < len; i++) {
                attrName = element.attributes[i].nodeName;
                attrValue = element.attributes[i].nodeValue;

                //针对IE会返回空属性进行优化
                if (element.attributes[i].specified) {
                    pairs.push(attrName + "=\"" + attrValue + "\"");
                }
            }

            return pairs.jion("");
        }

* 创建元素

  使用`document.createElement()`方法可以创建新元素，这个方法只接收一个参数，即要创建的元素的标签名。

  要注意的是IE7以及更低版本支持一种`createElement()`传入完整元素标签的方式，有助于提升IE低版本中动态添加元素的表现。

* 元素的子节点

  IE会将元素的节点的非文本或元素子节点也视之为其子节点。

  Element类型也支持继承自Document类型的`getElementsByTagName()`等方法

**10.1.4 Text类型**

文本节点由Text类型表示，包含的是可以照字面解释的纯文本内容。可以包含转义后的HTML字符，但是不能包含HTML代码。

* Text类型的特征

  + nodeType的值为3
  + nodeName的值为"#text"
  + nodeValue的值为节点所包含的文本，等效于节点的data属性。
  + parentNode是一个Element
  + 不支持子节点
* 操作节点中文本的方法
  + `appendData(text)`:将text添加到节点的末尾
  + `deleteData(offset, count)`:从offset指定的位置开始删除count个字符
  + `insertData(offset, text)`:从offset指定的位置插入text
  + `replaceData(offset, count, text)`:用text替换从offset到offset+count位置之间的文本
  + `splitText(offset)`:从offset位置将文本节点分成两个文本节点
  + `substringData(offset, count)`:提取从offset到offset+count为止处的字符串
* length属性

  保存着节点中字符的数目，等效于nodeValue.length和data.length

一般情况下，每个可以包含内容的元素最多只能有一个文本节点，而且必须有内容存在。

* 创建文本节点















