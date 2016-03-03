## Chapter12.DOM2和DOM3

DOM1级主要定义了HTML和XML文档的底层结构。DOM2和DOM3则在这个结构的基础上引入了更多的交互功能，支持了更高级的XML特性，为此，DOM2和DOM
3分为许多模块，模块之间具有某种关联，分别描述了DOM的某个非常具体的子集。这些模块如下

* DOM2级核心：在1级核心基础上构件，为节点添加了更多的方法和属性。
* DOM2级视图：为文档定义了基于样式信息的不同视图。
* DOM2级事件：说明了如何使用事件与DOM文档交互
* DOM2级样式：定义了如何以编程方式来访问和改变CSS样式信息
* DOM2级遍历和范围：引入了遍历DOM文档和选择其特定部分的新接口
* DOM2级HTML：在1级HTML基础上构建，添加了新的属性、方法和接口。

#### 12.1 DOM变化

DOM2和DOM3的主要目的在于扩展DOM API，以满足操作XML的所有需求。同时提供更好的错误处理和特性检测的能力。
从某种意义上讲，实现这一目的很大程度意味着对命名空间的支持。

DOM2只是增强了既有类型，而DOM3新增了部分类型同时增强了原有类型。类似的视图模块和HTML模块也增强了DOM接口，提供了新的属性和方法，这两个
模块很小，所以和核心放在一起。

可以使用以下代码来判断浏览器是否支持这些DOM模块

    var supportsDOM2Core = document.implementation.hasFeature("Core", "2.0");
    var supportsDOM3Core = document.implementation.hasFeature("Core", "3.0");
    var supportsDOM2Views = document.implementation.hasFeature("Views", "2.0");
    var supportsDOM2HTML = document.implementation.hasFeature("HTML", "2.0");
    var supportsDOM2XML = document.implementation.hasFeature("XML", "2.0");

**12.1.1 针对XML命名空间的变化**

有了XML命名空间就可以将不同的XML文档混合在一起而不用担心命名冲突。从技术上来讲HTML不支持XML命名空间，而XHTML支持，本文给出的都是
XHTML的示例。

--------
TO DO

--------

**12.1.2 其他方面的变化**

这些变化和XML命名空间无关，而是更倾向于确保API的可靠性以及完整性。

* DocumentType类型的变化

  DocumentType属性新增了3个属性
  + publicId
  + systemId
  + internalSubset
  前两个属性是表示文档声明中的两个信息段，并不常用。

  最后一个属性用于访问包含在文档声明中的额外定义，同样极少在HTML中应用。

* Document类型的变化

  + 增加了一个与命名空间无关的方法`importNode()`，用途是从文档中取得一个节点，然后将其导入另一个文档。在使用`appendChild()`导入带有
    不同ownerDocument属性的节点时会发生错误，此时应该采用这个方法。

    这个方法的作用效果类似于Element类型的`cloneNode()`，接收两个参数，要复制的节点和是否要复制后代节点的布尔值。返回的结果是原来节点的
    副本，但能够在当前文档中使用(所有权归当前文档)。

          var newNode = document.impotNode(oldNode, true);      //此时newNode.ownerDocument属性指向当前文档，可以使用appendChild()方法
          document.body.appendChild(newNode);
    这个方法在HTML文档中依然用的不多，常见于XML文档。

  + DOM2Views增加了一个名为defaultView的属性，保存了一个指向拥有给定文档的窗口或者框架。

    因为IE不支持defaultView但是提供了替代属性parentWindow，所以一般使用方法如下

        var parentWindow = document.defaultView || document.parentWindow;

  + DOM2为document.implementation增加了两个新方法`createDocumentType()`和`createDocument()`

    前者用于创建一个新的documentType节点，接收三个参数：文档类型名称、publicId、systemId

        var doctype = document.implementation.createDocumentType("html",
                        "-//W3C//DTD HTML 4.01//EN",
                        "http://www.w3.org/TR/html4/strict.dtd");

    后者用于创建一个新的文档，接收三个参数：针对文档中元素的nameSpaceURL、文档元素的标签名、新文档的类型。

        var doc = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", doctype);

  + DOM2HTML也为document.implementation添加了一个新方法`createHTMLDocument()`

    这个方法会创建一个完整的包含`<html>  <body>  <head> <title>`等标签的html文档。只接收一个参数即这个文档的标题。

        var htmldoc = document.implementation.createHTMLDocument("new doc");
        console.log(htmldoc.title);   //"new doc"
        console.log(typeof htmldoc.body);   //"object"
    需要注意的是只有Safari和Opera实现了这个方法。

* Node类型的变化

  + `isSupported()`

    和DOM1级为document.implementation引入的`hasFeature()`方法类似，这个方法也是用来确定当前节点具有什么能力。

    同样接收两个参数，特性名和特性版本号。返回布尔值。

  + `isSameNode()`和`isEqualNode()`

    两个方法都接收一个节点参数，并在传入节点与引用节点相同或者相等的时候返回true。

    所谓相同是指是同一个对象，所谓相等是指两个节点是相同的类型，具有相等的属性(nodeName、nodeValue等等)，而且它们的attributes属性和
    childNodes属性也相等。

  + `setUserData()`

    主要被用来为DOM节点添加额外的数据，这个方法会将数据指定给节点，接受3个参数：要设置的键、实际的数据和处理函数。

        document.body.setUserData("name","Fancy",function () {});

        var value = document.body.getUserData("name");    //"Fancy"
    传入`setUserData()`中的函数会在带有数据的节点被复制、删除、重命名或者引入一个文档时被调用。因此可以事先决定在上述操作发生时，如
    何处理用户数据。这个函数接受5个参数：表示操作类型的数值(1-复制，2-导入，3-删除，4-重命名)、数据键、源节点和目标节点。

        var div = document.createElement("div");
        div.setUserData("name", "Fancy", function (operation, key, value, src, dest) {
            if (operation == 1) {
                dest.setUserData(key, value, function () {});
            }
        });

        var newDiv = div.cloneNode(true);
        console.log(newDiv.getUserData("name"));   //"Fancy"

* 框架的变化

  框架和内嵌框架分别用HTMLFrameElement和HTMLIFrameElement表示，它们在DOM2级中都有了一个新属性，contentDocument。

  这个属性包含一个指向表示框架内容的文档对象的指针。

        var iframe = document.getElementById("myIframe");
        var iframeDoc = iframe.contentDocument;
  contentDocument是Document的实例，因此继承了Document的方法。IE8之前不支持这个属性，但是存在一个替换属性，contentWindow.document

        var iframe = document.getElementById("myIframe");
        var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

#### 12.2 样式

* link标签  外部样式表
* style标签  嵌入样式表
* style特性

针对定义样式的三种方式，DOM2级样式提供了一套API。要确定浏览器是否支持DOM2级定义的CSS能力，可以使用以下代码。

    var supportDOM2CSS = document.implementation.hasFeature("CSS", "2.0");
    var supportDOM2CSS2 = document.implementation.hasFeature("CSS2", "2.0");

**12.2.1 访问元素的样式**

任何支持style特性的HTML元素在JavaScript中都有一个对应的style属性，这个style对象是CSSStyleDeclaration的实例，包含着通过HTML的
style特性指定的所有样式信息，但是不包含与外部样式表和嵌入样式表经层叠得来的样式。在style特性中指定的任何CSS属性都将表现为这个style
对象的相应属性。

对于使用短划线(backgroud-image等)的CSS属性，则必须把它们改写为驼峰大小写形式(element.style.backgroudImage)。

还有一个比较特殊的CSS属性就是float，因为float是JS的保留字，所以需要改写为cssFloat或者styleFloat(IE)。

* DOM样式属性和方法

  DOM2Style为style对象定义了一些属性和方法。可以提供元素的style特性值以及修改样式。
  + cssText：可以访问到style特性中的CSS代码

    读模式下返回完整的style特性中的字符串，写模式下则会完全重写style特性。
  + length：应用给元素的CSS属性的数量

    主要用来和`item()`方法一起实现迭代。
  + parentRule：表示CSS信息的CSSRule对象
  + `getPropertyCSSValue(propertyName)`：返回包含给定值的CSSValue对象

    此处使用的propertyName是原本的CSS属性名，一般可以通过`item()`方法返回。

    CSSValue对象包含两个属性，一个是和`getPropertyValue()`返回的cssText，一个是cssValueType数值常量(0-继承，1-基本，
    2-值列表，3-自定义)。
  + `getPropertyPriority(propertyName)`：如果给定的属性使用了!important设置则返回"!important"否则返回空字符串。
  + `getPropertyValue(propertyName)`：返回给定属性的字符串值
  + `item(index)`：返回给定位置的CSS属性的名称

    可以和length属性一起实现迭代，支持方括号语法。
  + `removeProperty(propertyName)`：从样式中删除给定属性
  + `setProperty(propertyName, value, priority)`：将给定属性设置为相应的值并加上优先权标志("!important"或者空字符串)

        //html 部分
        <div  id = "myDiv" style = "backgrounf-image:blue; width:10px; height:25px"></div>

        //js 部分
        var div = document.getElementById("myDiv");
        console.log(div.style.backgrounImage);      //"blue"
        console.log(div.style.cssText);     //"backgrounf-image:blue; width:10px; height:25px"
        var prop, value , i, len;
        for (i = 0, len = div.style.length; i < len; i++) {
            prop = div.style[i];
            value = div.style.getPropertyCSSValue(prop);
            console.log(prop + ":" + value.cssText + "(" + value.cssValueType + ")");
        }
  在实际开发中，`getPropertyValue()`用的远比`getPropertyCSSValue()`要多。

* 计算的样式

  虽然style能够提供支持style特性的任何元素的样式信息，但是不包含从其他样式表层叠而来并影响到当前元素样式的样式信息。

  DOM2Style增强了document.defaultView，提供了`getComputedStyle()`方法，这个方法接收两个参数，要取得计算样式的元素和一个伪元素
  字符串(例如:after)。如果不需要伪元素信息，第二个参数可以是null。这个方法返回一个CSSDeclaration对象，其中包含当前元素的所有计算
  样式。

        var computedStyle = document.defaultView.getComputedStyle(div,null);
  IE并不支持这个方法，但是有个类似的概念。在IE中每个具有style的元素还有一个currentStyle属性。这个属性也是CSSDeclaration的实例，
  包含当前元素所有计算后的样式。

        var computedStyle = div.currentStyle;
  无论在哪个浏览器中，最重要的是所有计算样式都是只读的，不能修改计算后样式对象中的CSS属性。

**12.2.2 操作样式表**

CSSStyleSheet类型表示的是样式表，包括link标签和style标签。这两个元素分别是由HTMLLinkElement和HTMLStyleElement类型表示的。但是
CSSStyleSheet类型更加通用一些。两个针对元素的类型允许修改HTML特性，而CSSStyleSheet类型则是一套只读的接口。

使用以下代码可以确定浏览器是否支持DOM2级样式表。

    var supportDOM2StyleSheets = document.implementation.hasFeature("StyleSheets", "2.0");
CSSStyleSheet类型继承自StyleSheet，后者可以作为一个基础类型来定义非CSS样式表

--------

TO DO

--------

























