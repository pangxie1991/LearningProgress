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
        var myList = document.getElementById("my_ul"),
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
  + `getElementById()`

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

        var div = document.getElementById("my_id");
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

  可以使用`document.createTextNode()`创建新文本节点，接收要插入节点的文本作为参数。

  当然仅仅是创建节点并不能在页面上看到效果，同样需要appendChild或者insertBefore再或者replaceChild操作。

* 规范化文本节点

  一般来说一个元素有且仅有一个文本子节点，但是相邻的同胞文本节点依然可以出现。

  直接对包含这样文本节点的父节点使用`normalize()`方法可以解决这些不规范的问题，将同胞文本节点合并。

* 分割文本节点

  Text类型提供了一种作用和`normalize()`相反的方法：`splitText()`，这个方法会按照指定位置分割nodeValue的值。

  原本的文本节点将包含从开始到分割位置的内容，而方法返回的新文本节点包含其余的。该节点自动成为原节点的同胞节点。

**10.1.5 Comment类型**

* Comment类型的特征

  + nodeType的值为8
  + nodeName的值为"#comment"
  + nodeValue的值是注释的内容
  + parentNode可以是Document和Element
  + 不支持子节点

  Comment类型继承自和Text一样的基类，因此拥有除了splitText()之外所有的字符串操作方法。

  和Text类型类似，也可以通过nodeValue和data属性取得注释的内容。

* 创建注释节点

  使用`document.createComment()`可以创建注释节点。

**10.1.6 CDATASection类型**

CDATASection类型只针对基于XML的文档，表示的是CDATA区域。大概类似Comment类型，一样继承自Text类型。

* CDATASection类型的特性
  + nodeType的值为4
  + nodeName的值为"#cdata-section"
  + nodeValue的值是区域内的内容
  + parentNode可以是Document和Element
  + 不支持子节点

**10.1.7 DocumentType类型**

在Web浏览器中不常用，并没有被全部浏览器支持。

* DocumentType对象的特征
  + nodeType的值为10
  + nodeName的值为doctype的名称
  + nodeValue的值为null
  + parentNode是Document
  + 不支持子节点

一般只有name属性是有用的。其中的值为`<!DOCTYPE`之后的文本

IE并不支持DocumentType对象，IE9会给document.doctype赋予正确的对象但是依然不支持访问DocumentType对象。

**10.1.8 DocumentFragment类型**

所有节点类型中，只有DocumentFragment在文档中没有对应的标记。是一种轻量级的文档。

可以包含和控制节点，但是不会像完整文档那样占用资源。

* 特征
  + nodeType的值为11
  + nodeName的值为"#document-fragment"
  + nodeValue的值为null
  + parentNode的值为null
  + 子节点可以是Element、ProcessingInstrument、Comment、Text、CDATASection、EntityReference

虽然不能把文档片段直接添加到文档中，但是可以把它作为一个仓库使用。保存将来可能会添加到文档中的节点。

* 用法

  使用`document.createDocumentFragment()`创建文档片段。

  其基本继承了Node的所有方法

        //html部分
        <ul id = "my_ul"></ul>

        //JS部分，假设我们想给这个ul元素添加三个子元素li

        var fragment = document.createDocumentFragement();
        var ul = document.getElementById("my_ul");
        var li = null

        //使用一个fragment做为仓库然后创建一个循环。
        for (var i = 0; i < 3; i++) {
            li = document.createElement("li");
            li.appendChild(document.createTextNode("Item " + (i+1)));
            fragment.appendChilde(li);
        }

        ul.appendChilde(fragment);

**10.1.9 Attr类型**

用来表示元素的特性。在所有浏览器中都可以访问Attr类型的构造函数和原型。

从结构上讲Attr类型就是存在于元素的attributes属性中的节点。(详见10.1.3-attributes属性)

* 特征

  + nodeType值为2
  + nodeName值为特性的名称
  + nodeValue值为特性的值
  + parentNode的值为null
  + 在HTML中不支持子节点，在XML中子节点可以是Text或者EntityReference

* 属性

  + name:nodeName
  + value:nodeValue
  + specified:true or false——用于表示特性是在代码中确定的还是默认的

#### 10.2 DOM操作技术

一般DOM操作都是简明的，但是有时候用JavaScript在HTML里操作DOM会面临比较多的浏览器陷阱和不兼容问题。

**10.2.1 动态脚本**

动态脚本指的是在页面加载时不存在，但将来的某一时刻通过修改DOM动态添加的脚本。一般分为外部文件插入和直接代码插入两种。

* 外部文件

        function loadScript (url) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            document.body.appendChild(script);
        }

        //然后就可以通过调用函数来加载外部JS文件了
        loadScript("client.js");

* 直接插入代码

  IE不允许直接在DOM里操作\<script\>标签的子节点，而早起Safari则不支持通过script.text插入代码。因此

        function loadScriptString (code) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            try{
                script.appendChild(document.createTextNode(code));
            } catch (ex) {
                script.text = code;
            }
            document.body.appendChild(script);
        }

**10.2.2 动态样式**

类似动态脚本，只不过插入的变成了样式表。

* 外部文件

        function loadStyles (url) {
            var style = document.createElement("link"),
                head = document.getElementsByTagName("head");
            style.rel = "stylesheet";
            style.type = "text/css"
            style.href = url;
            head.appendChild(style);
        }
* 插入CSS代码

        function loadStyleString (css) {
            var style = document.createElement("style"),
                head = document.getElementsByTagName("head");
            style.type = "text/css";

            //IE hack
            try {
                style.appendChild(document.createTextNode(css));
            } catch (ex) {
                style.styleSheet.cssText = css;
            }

            head.appendChild(style);
        }

**10.2.3 操作表格**

table元素结构比较复杂，有着\<th\>、\<tbody\>、\<tr\>、\<td\>等诸多层级的各种标签。

HTML DOM为表格相关元素创建了一些属性和方法，见p-282

**10.2.4 使用NodeList**

* NodeList(childNodes返回的对象)
* NamedNodeMap(元素的特性集合)
* HTMLCollection(getElementsByTagName返回的对象)

这三个集合都是动态的。理解他们的动态性可以参照以下代码：

    function dynamic () {
        var divs = document.getElementsByTagName("div"),
            div,
            len,
            i;

        //以下代码会导致无限循环
        for (i = 0; i < divs.length; i++) {
            div = document.createElement("div");
            document.body.appendChild(div);
        }

        //解除无限循环需要这样使用代码
        for (i = 0, len = divs.length; i < len; i++) {
            div = document.createElement("div");
            document.body.appendChild(div);
        }
    }

一般来说，应该尽量减少访问NodeList的次数，因为每次访问都会运行一次基于文档的查询，可以考虑把从NodeList中获得的值缓存起来。