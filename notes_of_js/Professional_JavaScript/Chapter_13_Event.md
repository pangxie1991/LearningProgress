## Chapter13.事件

JavaScript和HTML之间的交互是通过事件实现的。也就是文档和浏览器窗口中发生的一些特定的交互瞬间。

可以使用侦听器来预定事件，以便事件发生时执行相应的代码。这种在传统软件工程中被称之为观察员模式的模型，支持页面的行为(JavaScript代码)
与页面的外观(HTML和CSS代码)之间的松散耦合。

DOM2Event统合了原本只是各个浏览器专有的API，得到IE9+等浏览器的支持，IE8是最后一代仍使用专有事件系统的主要浏览器。

尽管主要浏览器已经实现了DOM2Event，但是这个规范并没有涵盖所有事件类型，BOM也支持一定的事件，而且没有什么规范，随着DOM3Event的出现，
事件相关的API变得更加繁琐复杂，难易程度会根据你的需求而不同。不过有关事件的一些核心概念是必须要理解的。

#### 13.1 事件流

事件流是描述从页面中接收事件的顺序(单击一个按钮的同时，你也单击了这个按钮的容器，以及容器的容器等等)。而作为远古时期的巨头，IE和网景
一个采用了事件冒泡，一个采用了事件捕获。

**13.1.1 事件冒泡(event bubbling)**

事件最开始由最具体的元素接收，然后逐级向上传播到文档。

现代所有浏览器都支持事件冒泡，但是在具体实现上有一定差别。IE9以后的现代浏览器会一直冒泡到window对象。

**13.1.2 事件捕获(event capturing)**

事件捕获的具体思想是不太具体的节点应该更早接收到事件，最具体的节点应该最后接收到事件。用意在于在事件到达预定目标之前捕获它。

IE9之后的新浏览器都支持这种事件流，虽然规范要求事件从document开始，但实际上都是从window对象开始的。由于老版本浏览器不支持，所以很少
有人使用事件捕获。仅仅出现在有特殊需要时。

**13.1.3 DOM事件流**

DOM2Event规定的事件流包括三个阶段，事件捕获阶段、处于目标阶段、事件冒泡阶段。

在DOM事件流中，实际的目标在捕获阶段并不会接收到事件，在捕获阶段事件从文档传递到实际目标的上一层级时便停止了，下一个阶段是处于目标阶段，
于是事件发生并在事件处理中被看作事件冒泡的一部分。

即使DOM2Event明确要求事件捕获阶段不会涉及事件的目标，但IE9等现代浏览器都会在捕获阶段触发事件对象上的事件。

#### 13.2 事件处理程序

事件就是用户或者浏览器执行的某种动作，诸如click、load、mouseover等，都是事件的名字。而响应某种事件的函数就叫做事件处理程序。事件处理
程序的名字一般以"on"开头，为事件指定处理程序的方式有很多种。

**13.2.1 HTML事件处理程序**

在HTML中直接写入事件处理程序有以下集中形式。

    //在代码部分使用单引号避免使用HTML实体
    <input type="button" value="Click me" onclick="alert('Clicked')" />

    //也可以使用如下转义方式
    <input type="button" value="Click me" onclick="alert(&quot;Clicked&quot;)" />

    //调用页面其他位置的脚本
    <script>
        function showMessage () {
            alert("Clicked");
        }
    </script>
    <input type="button" value="Click me" onclick="showMessage()" />
最后一个例子中的函数是独立定义的，也可以来自外部js文件，当事件处理程序中的代码执行时，有权访问全局作用域中的任何代码。

通过直接写入HTML指定事件处理程序有一些优势：

* 首先这样会创建一个封装着元素属性值的函数，这个函数中又一个局部变量event，也就是事件对象。
  通过event变量可以直接访问事件对象，你并不用手动定义它，也不用从函数的参数列表中读取它。

        <input type="button" value="Click me" onclick="alert(event.type)" />      //输出click
  在这个函数的内部，this的值等于事件的目标元素。

        <input type="button" value="Click me" onclick="alert(this.value)" />      //输出"Click me"

* 关于这个动态创建的函数，另一个重要的优势是它使用with扩展作用域。在函数的内部，可以像访问局部变量一样访问document以及元素本身的成员。

        function  () {
            with(document){
                with(this){
                    //元素属性值
                }
            }
        }

        //可以非常便捷的访问自己的属性，下面的代码和前例效果相同。
        <input type="button" value="Click me" onclick="alert(value)" />      //输出"Click me"
  当元素是一个表单元素，函数的作用域还会包含访问表单元素(父元素)的入口。

        function  () {
            with(document){
                with(this.form){
                    with(this){
                        //元素属性值
                    }
                }
            }
        }

        //这样事件处理程序无需引用表单元素就能访问其他表单字段。
        <form method="post">
            <input type="text" name="username" value="" />
            <input type="button" value="Echo Username" onclick="alert(username.value)"/>   //输出文本框中文本
        </form>

同样，使用这种方式指定事件处理程序也有一些缺点

* 存在时差问题

  用户可能会在HTML元素一出现在页面上就触发事件，然而当时事件处理程序可能还不具备执行条件。以调用showMessage()函数来讲，如果按钮已经
  载入而函数还没有，此时点击按钮就是没效果的。为此很多HTML事件处理程序会封装在一个try-catch块中。

        <input type="button" value="Click me" onclick="try{showMessage();}catch(ex){}" />
  像上面这样添加HTML事件处理程序可以避免用户看到JavaScript错误。

* 存在实现差异问题

  直接的HTML事件处理程序的作用域链在不同的浏览器中会导致不同的结果。不同的JavaScript引擎的标识符解析规则略有差异，很可能会在访问非
  限定对象成员时出错。

* 耦合问题

  直接添加HTML事件处理程序，HTML和JavaScript代码紧密耦合，如果需要更改需要同时更改两个地方。

因为以上的种种问题，HTML事件已经基本被开发人员摒弃。

**13.2.2 DOM0级**

通过JavaScript指定事件处理程序是一种传统的处理方式，出现于第四代Web浏览器，至今仍被广大现代浏览器支持。一来这种方式比较简单，二来有
跨浏览器的优势。

要使用JavaScript指定事件处理程序，首先必须取得一个要操作的对象的引用。每个元素(包括window和document)都有自己的事件处理程序属性，这种
属性通常全部小写，将这种属性设置为一个函数，就可以指定事件处理程序。

    var btn = document.getElementById("myBtn");
    btn.onclick = function  () {
        console.log("Clicked");
    };

使用DOM0级指定的事件处理程序被认为是元素的方法。因此，这时候的事件处理程序是在元素的作用域中运行；也就是说程序中的this指向当前元素。
在事件处理程序中可以通过this访问到元素的任何属性和方法。以这种方式添加的事件处理程序会在事件流冒泡阶段被处理。同时可以删除

    var btn = document.getElementById("myBtn");
    btn.onclick = function  () {
        console.log("this.id");     //"myBtn"
    };
    btn.onclick = null;

**13.2.3 DOM2级事件处理程序**

DOM2Event定义了两个方法，用以处理指定和删除事件处理程序的操作：`addEventListener()`和`removeEventListener()`。所有DOM节点都包含
这两个方法，并且他们都包含3个参数，要处理的事件名、作为事件处理程序的函数和一个布尔值。如果布尔值为true，表示在捕获阶段调用事件处理程
序，如果是false，则在冒泡阶段调用事件处理程序。

* 使用DOM2Event事件处理程序最大的优势在于可以添加多个事件处理程序。

        var btn = document.getElementById("myBtn");
        btn.addEventListener("click",function () {
            console.log(this.id);
        },false);
        btn.addEventListener("click",function () {
            console.log("Hello World");
        },false);

  会依照按照添加的顺序触发。
* 通过`addEventListener()`添加的事件处理程序只能用`removeEventListener()`来移除，所以添加的匿名函数无法移除。

  所以通过`addEventListener()`添加事件处理程序最好传入函数变量。

        var btn = document.getElementById("myBtn");
        var handler = function () {
            console.log(this.id);
        };
        btn.addEventListener("click",handler,false);

        //移除
        btn.removeEventListener("click",handler,false);    //有效

大多数情况下我们都把事件处理程序添加到事件流的冒泡阶段。这样可以最大限度的兼容各个浏览器。

**13.2.4 IE事件处理程序**

IE实现了与DOM中类似的两个方法：`attachEvent()`和`detachEvent()`，这两个方法接收相同的两个参数：事件处理程序名称和事件处理程序函数。

* 使用`attachEvent()`添加的事件处理程序都会被添加到冒泡阶段。

        //注意接收的第一个参数是"onclick"，而不像DOM方法中的"click"
        var btn = document.getElementById("myBtn");
        btn.attachEvent("onclick", function  () {
            console.log("Clicked");
        });

* 事件处理程序的作用域

  在使用`attachEvent()`时，事件处理程序会在全局作用域中运行，此时this相当于window。

* `attachEvent()`方法也可以添加多个事件处理程序，但是和DOM不同，是逆序执行的。

* 使用`attachEvent()`添加的事件处理程序也只能用`detachEvent()`来删除。同样最好不要使用匿名函数。

**13.2.5 跨浏览器事件处理程序**










