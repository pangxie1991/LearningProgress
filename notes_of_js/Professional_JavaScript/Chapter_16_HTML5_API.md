## Chapter16.HTML5脚本编程

HTML5定义了许多新的JavaScript API，用来简化以前实现起来困难重重的任务，简化创建动态Web界面的工作。

#### 16.1 跨文档消息传递

跨文档消息传递(cross-document messaging)，有时候简称为XDM，指的是在来自不同域的页面间传递消息。

XDM的核心是`postMessage()`方法。在HTML5规范中除了XDM也有很多地方用到了这个方法，但是目的只有一个，就是向另外一个地方发送数据。
对于XDM而言，另一个地方指的是包含在当前页面中的<ifame>元素，或者由当前页面弹出的窗口。

这个方法接收两个参数，要传递的消息和一个表示消息来自于哪个域的字符串。第二个参数对于保证通信安全十分重要。

    var iframeWindow = document.getElementById('myFrame').contentWindow;
    iframeWindow.postMessage('A secret', 'http://www.wrox.com');

第二行代码尝试向内嵌框架中发送一条消息，并指定框架中的文档来源必须是'http://www.wrox.com'域，如果来源匹配，消息会传送到内嵌框架，
否则什么也不做。第二个参数可以使用'*'表示可以把消息发送给任何域的文档，但是我们不推荐这样做。

接收到XDM消息之后会触发window的message事件，这个事件是以异步的方式触发的，所以可能有一定延迟。触发事件后传递给onmessage事件处理
处理程序的事件对象包含以下三方面的重要信息。
* data：作为`postMessage()`方法第一个参数传入的字符串数据。
* origin：发送消息的文档所在的域。
* source：发送消息的文档的window对象的代理。这个代理对象主要用于在发送上一条消息的窗口中调用postMessage()，如果发送消息的窗口来自
  同一个域则就是window。

接收到消息之后验证来源是十分重要的。

    EventUtil.addHandler(window, 'message', function(event) {
        if (event.origin == 'http.......') {
            processMessage(event.data);

            // 可选步骤，向源窗口发送回执
            event.source.postMessage('received', 'http://p2p.wrox.com');
        }
    })

需要注意的是event.source并不是真的源框架的window对象，只是一个代理，只能在上面调用postMessage方法。

另外第一个参数实际上支持任意格式的数据，但因为早期实现是按照‘永远都是字符串’来的，所以为了确保浏览器兼容还是只传入字符串为好。

#### 16.2 原生拖放

从IE4开始就引入的古老API，可以在框架间，窗口间，甚至应用间拖放网页元素。主要依靠还是浏览器的支持。

**16.2.1 拖放事件**

拖动某些元素最重要的是确定哪里发生了拖放事件，依次有以下三个事件

* dragstart
* drag
* dragend
