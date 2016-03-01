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
