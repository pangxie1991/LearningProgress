
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
