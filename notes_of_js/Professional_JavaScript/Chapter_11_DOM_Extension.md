## Chapter11.DOM扩展

DOM作为API已经相对完善，但是为了实现更多功能依然会有一些标准或者专有的扩展，08年以后W3C着手将一些已经成为事实标准的专有扩展标准化。

主要分为以下三种

* Selector API
* HTML5
* Element Traversal

以上三种扩展都源自于开源社区，属于众望所归后的标准化。即便有这三个标准化扩展，依然存在很多的专有扩展。

#### 11.1 选择符API

JS库的常见功能，也算是jQuery的核心，通过CSS选择符查询DOM文档取得元素的引用。

标准化后变为SelectorAPI，Level1的核心是两个方法：`querySelector()`和`querySelectorAll()`

在兼容的浏览器中可以通过Document以及Element类型调用它们。

**11.1.1 `querySelector()`方法**

接受一个CSS选择符作为参数，返回与该模式匹配的第一个元素。通过Document类型调用会查找全局，通过Element调用会在该元素的后代元素中查找。

如果接受的选择符不受支持，则返回null

**11.1.2 `querySelectorAll()`方法**

和上一个方法的区别是会返回所有匹配的元素。这个方法返回的是一个NodeList的实例。类似于快照而不是不断的查询。

如果传入的选择符没有找到元素，则NodeList就是空的。

**11.1.3 `matchesSelector()`方法**

接受一个参数，如果调用元素和传入的选择符匹配则返回true，否则返回false。

因为各个浏览器的实现问题暂时需要单独写一个包装函数才能够使用。

    function matchesSelector (element, selector) {
        if (element.matchesSelector) {
            return element.matchesSelector(selector);
        } else if (element.msMatchesSelector){
            return element.msMatchesSelector(selector);
        } else if (element.webkitMatchesSelector){
            return element.webkitMatchesSelector(selector);
        } else if (element.mozMatchesSelector){
            return element.mozMatchesSelector(selector);
        } else {
            throw new Error("Not supported.");
        }
    }

#### 11.2 元素遍历

对于空格的不同处理，IE9之前的版本不会返回文本节点，而其他浏览器会，所以就导致在使用childNodes和firstChild等属性时行为不一致。

通过Element Traversal规范为DOM元素添加的新属性可以方便的消除这些不匹配。

* childElementCount  返回子元素(不包括文本节点和注释)的个数
* firstElementChild
* lastElementChild
* previousElementSibling
* nextElementSibling

利用这些新添加的属性，就不用担心空白文本节点。

以下代码表现了这两种方式的区别

    //不使用新增API
    var i,
        len,
        child = element.firstChild;
    while (child != element.lastChild) {
        if (child.nodeType == 1) {           //需要做一次判断，子节点是不是元素
            processChild(child);
        }
        child = child.nextSibling;
    }

    //使用Element Traversal API
    var i,
        len,
        child = element.firstElementChild;
    while (child != element.lastElementChild) {
        processChild(child);
        child = child.nextElementSibling;
    }

#### 11.3 HTML5

相对于其他HTML版本，HTML5很不一样。之前的HTML对JavaScript接口的描述都很少，主要篇幅用来定义标记，与JavaScript相关的一般都交给
DOM去定义。

而HTML5规范则围绕如何使用新增标记定义了大量JavaScript API。其中一些和DOM重合，定义了浏览器应该支持的DOM扩展。

**11.3.1 与类相关的扩充**

在HTML和Web开发领域，class属性的大量使用使得大量的JavaScript代码被用来操作类，为了简化CSS类的用法，HTML5新增了大量的API。

* `getElementByClassName()`方法：支持到IE9+

  可以传入一个参数，包含一个或者多个类名(用空格隔开)。可以在Document上调用也可以在Element上调用

* classList属性

  操作类名时需要使用className属性进行添加、删除和替换，因为className的值是一个字符串，所以仅仅是修改其中一个类名也需要设置
  整个字符串的值。如下列代码所示：

        //html部分
        <div class = "bd user disabled bg ie-fix....">

        //想要删除bg类名，js部分

        //首先取得类名字符串并将类名拆分成数组
        var classNames = div.className.split(/\s+/);   //"\s"表示空格，"+"表示至少出现一次

        //找到要删除的类名
        var i,
            len,
            pos = -1;
        for (i = 0, len = classNames.length; i < len; i++) {
            if (classNames[i] == "bg") {
                pos = i;
                break;
            }
        }

        //删除类名
        classNames.splice(pos,1);

        //重新组合类名
        div.className = classNames.jion(" ");

  而HTML5为类似的类名操作提供了全新的方式，为所有元素添加了classList属性，其值是新集合类型DOMTokenList的实例，类似其他DOM集合。

  这个新类型有一下新方法：
  + `add(value)`:将给定的字符串值添加到列表中，如果已经存在则不再添加。
  + `contains(value)`:表示列表中是否存在给定的值，返回布尔值。
  + `remove(value)`:从列表中删除给定的字符串。
  + `toggle(value)`:如果列表中没有给定值，则添加它，如果有则删除它。

  采用这种新的API之后，可以极大简化对类名的操作。

        div.classList.remove("bg");

  比较遗憾的是支持classList属性的浏览器之后Chrome和Firefox 3.6+。

**11.3.2 焦点管理**

HTML5也添加了辅助管理DOM焦点的功能。

* 首先就是`document.activeElement`属性。这个属性会始终引用获得了焦点的元素。

* `hasFocus()`方法，用于验证元素是否获得了焦点，返回布尔值。

焦点管理获得的支持为IE4+。

**HTMLDocument的变化**

HTML5扩展了HTMLDocument，增加了新的功能。

* readyState属性

  这个属性用来表示页面的加载情况，有两个可能的值
  + loading，表示正在加载文档
  + complete，已经加载完文档

  获得支持情况为IE4+

* 兼容模式

  用以区分渲染页面的模式是标准的还是混杂的。用来实现这一点的属性为compatMode

  + CSS1Compat 在标准模式下这个属性的值
  + BackCompat 在混杂模式下这个属性的值

  获得支持的情况为IE6+

* head属性

  作为对document.body的补充，新增了document.head属性。

  获得支持的情况为：只有Chrome和Safari 5。

**11.3.4 字符集属性**

* charset属性

  默认为UTF-16,可以通过赋值进行修改。

  获得支持的情况为基本全支持。
* defaultCharset属性

  表示根据浏览器和操作系统的设置，默认字符集的值。如果文档没有使用默认字符集，则charset的值和defaultCharset的值不一样。

  获得支持的情况为IE Safari Chrome

**11.3.5 自定义数据属性**

为元素添加自定义属性，需要给属性名加前缀data-，目的是为元素提供与渲染无关的信息，这些属性可以任意添加，随便命名。

添加了自定义属性之后可以使用元素的dataset属性来访问和修改自定义属性的值。不过需要将特性名去掉前缀。

    //html部分
    <div data-appID="12345" data-myname="Michael"></div>

    //js部分
    var appID = div.dataset.addID;
    div.dataset.myname = "Nicholas";
获得的支持情况为Firefox6+ Chrome

**11.3.6 插入标记**

虽然DOM提供了很多控制手段，但在需要给文档插入大量新的HTML标记的情况下依然不方便。

与之相比直接插入HTML字符串要简单的多。

* innerHTML属性

  读模式下会返回调用元素的所有子节点对应的HTML标记，写模式下会将传入的字符串形成新的DOM字数并完全替代调用元素的所有子节点。

  如果要获得一个元素的innerHTML属性的值，不同浏览器保存的并不相同

  + IE和Opera

    会将所有的标签换成大写
  + Safari Chrome Firefox

    会原封不动的返回HTML，包括空格和缩进。

  同时还存在有一个转义的问题。

  使用innerHTML还存在有一些限制，通过innerHTML插入`<script>`元素并不会执行其中的脚本。
  但是IE8和更早版本可以执行这样插入的脚本文件。

* outerHTML属性

  读模式下，outerHTML返回调用元素以及所有子节点的HTML标签。写模式下，会根据传入的字符串创建新的DOM子树然后用这个子树完全的替换调用元素。

  以下两种操作等效：

        div.outerHTML = "<p>This is a paragraph.</p>";

        //等效于

        var p = document.createElement("p");
        p.appendChild(document.createTextNode("This is a paragraph."));
        div.parentNode.replaceChild(p,div);

  目前支持outerHTML的浏览器为IE4+

* `insertAdjacentHTML()`方法

  这个方法接收两个参数，第一个参数必须是下面四个中的一个：
  + beforebegin
  + afterbegin
  + beforeend
  + afterend
  这四个字符串分别代表插入的标记位于调用元素的什么位置
  这个方法获得了广泛的支持。

* 内存与性能问题

  替换子节点可能会导致浏览器内存占用问题，在IE中尤为明显。

  在删除带有事件处理程序或引用了其他JavaScript对象的子树时，就有可能导致内存占用问题。因为删除子树之后，占用内存的相关
  处理程序或者引用没有被一并删除。，因此在使用上述的片段插入相关的方法是最好先手工删除要被替换的元素的所有事件处理程序和JavaScript
  对象属性。

  但是同样使用类似innerHTML属性还是提供了很多便利，在设置innerHTML和outerHTML属性时，会先创建一个HTML解析器，一般是在浏览器级
  代码(通常是C++)的基础上运行的，会比单纯的JavaScript快得多。当然创建和销毁解析器也会带来性能损失，因此最好能合理的控制使用这种
  属性的次数。比较下面的两种代码书写方式，可以看出一些差异。

        //要尽量避免这种模式的书写
        for (var i = 0, len = value.length; i < len; i++) {
            ul.innerHTML += "<li>" + values[i] + "</li>";
        }

        //相应的应该使用这种模式。
        var itemsHtml = "";
        for (var i = 0, len = values.length; i < len; i++) {
            itemsHtml += "<li>" + values[i] + "</li>";
        }
        ul.innerHTML = innerHtml;

**11.3.7 `scrollIntoView()`方法**

关于滚动页面的规范，HTML5最终选择了`scrollIntoView()`方法。其可以在任意HTML元素上调用，通过滚动浏览器窗口或者某个容器元素，调用
元素就可以出现在视口中。

* 如果给这个方法传入true或者不传入参数，则会尽量让调用元素的顶部和视口顶部平齐。

* 如果给这个方法传入false，则调用元素尽可能全部出现在视口中。调用元素的底部和视口底部平齐。

一般用来辅助焦点来获取用户的注意。

#### 11.4 专有扩展

因为功能缺失，厂商会一如既往的向DOM中添加专有扩展，以弥补功能上的不足。

**11.4.1 文档模式**

文档模式决定了你可以使用哪个级别的CSS，可以在JavaScript中使用哪些API，以及如何对待文档类型(doctype)。

一般情况下我们使用一下meta标签来定义文档模式。

    <meta http-equiv = "X-UA-Compatible" content = "IE = Edge,Chrome = 1">

**11.4.2 children属性**

因为对空文本节点的处理问题，所以添加的一个属性。

这个属性的值是HTMLCollection的实例，只包含元素中同样还是元素的子节点。

获得支持的情况为IE5+ 需要注意的是在IE9之前注释节点也会被包含，IE9及之后不会。

**`contains()`方法**

在开发的过程中经常需要知道某个节点是不是另一个节点的后代。IE由此率先引入了`contains()`方法。

如果传入的节点是调用节点的后代元素则返回true，否则返回false。

这个方法受到的支持为IE  Firefox9+ Safari Opera Chrome

可以和DOM3级(IE9+)中的`compareDocumentPosition()`方法结合使用，以兼容老版本各种非IE浏览器，详见p-300

**11.4.4 插入文本**

IE中具有的原专有API innerHTML和outerHTML已经被HTML5吸收，而两个用于插入文本的属性却没有。innerText和outerText

* innerText

  读取值是会按照由浅入深的顺序，将子文档树中的所有文本拼接起来。

  写入值时，会删除元素的所有子节点，插入包含相应文本值的文本节点。

  设置innerText永远只会生成当前节点的一个子文本节点。为了确保只生成一个子文本节点就需要对文本进行HTML编码。利用这一点
  可以通过innerText属性过滤掉HTML标签，方法如下：

        element.innerText = element.innerText;

  获得支持的情况为IE4+ 以及除了Firefox的其他浏览器。虽然火狐并不支持innerText但是有类似的textContent一个DOM3的属性。

  因此在实际使用时应该采取以下包装函数：

        function getInnerText (element) {
            return (typeof element.textContent == "string") ?
                element.textContent : element.innerText;
        }

        function setInnerText (element,text) {
            if (typeof element.textContent == "string") {
                element.textContent = text;
            } else {
                element.innnerText = text;
            }
        }

* outerText属性

  除了作用范围扩大到了包含调用它的节点之外，它的用法和innerText基本没有区别。

  在读取文本值时，outerText和innerText取得的值完全一样，在写模式下则会连带着调用节点一起替换。

  因此这个属性并不被经常使用。

**11.4.5 滚动**

在HTML5将`scrollIntoView()`纳入了规范之后，依然有几个专有API可以在不同的浏览器中可以使用。

* `scrollIntoViewIfNeeded(alignCenter)`

  只有在调用元素当前不在视口中的情况下才会起作用，如果将可选参数alignCenter设置为true的话，则表示尽量将调用元素显示在视口
  垂直居中的位置。

  只有Safari和Chrome实现了这个方法。

* `scrollByLines(lineCount)`

  将元素的内容滚动指定的行高，可正可负。

  同样只有Safari和Chrome实现了这个方法。

* `scrollByPages(pageCount)`

  将元素滚动指定的页面高度，具体高度由元素的高度决定。

  同样。。。。

需要注意的是，`scrollIntoView()`和`scrollIntoViewIfNeeded()`的调用者是元素的容器，而`scrollByLines()`和`scrollByPages()`的
调用者则是元素本身。

























