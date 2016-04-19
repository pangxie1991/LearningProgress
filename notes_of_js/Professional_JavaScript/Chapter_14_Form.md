## Chapter14.表单脚本

JavaScript最早的任务就是代替服务器处理简单的表单，以逃避早期互联网速度上的瓶颈。

尽管目前Web和JavaScript都已经有了巨大的发展，然而Web表单的变化并不大，仍然需要采用JavaScript去验证，当然JS增强了一些标准表单空间
的默认行为。

#### 14.1 表单的基础知识

HTML中的表单是由`<form>`元素来表示的，在JS中对应的是继承自HTMLElement对象(类型)的HTMLFormElement对象(类型)。它有所有HTMLElement
的默认属性和方法，当然也有一些独有的属性和方法。

* acceptCharset：服务器能够处理的字符集，等同于HTML中的同名特性。
* action：接受请求的URL，等同于HTML中的URL
* elements：表单中所有控件的集合，是一个HTMLCollection。
* enctype：请求的编码类型。
* length：表单中控件的数量。
* method：要发送的http请求的类型。(get/post)
* name：表单的名称
* target：用于发送请求和接收响应的窗口的名称；等价于HTML同名特性。
* `reset()`：重置表单
* `submit()`：提交表单

取得表单有两种常见方式
* `document.getElementById(some_id)`
* `document.forms`：

其中后者需要再通过索引或者name属性进行定位(items方法--`document.forms[0]`/`document.forms['a_name']`)
需要注意的一点是可以同时为表单指定id和name，两者不一定相同。

**14.1.1 提交表单**

提交方式可以是HTML上的用户操作。
* 响应按钮，一般有三种。
  * `<input type = 'submit' value = 'submit_button'>`
  * `<input type = 'image' src = '....'>`
  * `<button type = submit>submit_button</button>`
* 点击回车，要求当前表单中任意非textarea控件拥有焦点并且拥有提交按钮。

也可以使用JS方式在任意情况下对表单进行提交

    var form = document.getElementById('some_id');

    form.submit();
需要注意的是通过这种方式提交表单并不会触发submit事件，因此需要先验证数据。

当然也可以通过JS禁用HTML操作产生的提交。

    var form = document.getElementById('some_id');
    EventUtil.addHandler(form, 'submit', function(event) {
        event = EventUtil.getEvent(event);
        EventUtil.preventDefault(event);
    });

**14.1.2 重置表单**

重置也可以有专门的按钮
* `<input type = 'reset' value = 'reset_button'>`
* `<button type = 'reset'>reset_button</button>`

当然通过JS可以对重置按钮触发的reset事件进行操作。

    var form = document.getElementById(some_id);

    EventUtil.addHandler(form, 'reset', function(event) {
        event = EventUtil.getEvent();
        EventUtil.preventDefault(event);
    });

同样也可以通过JS来重置表单，和JS调用submit方法不同的是这样调用reset方法会出发reset事件。

    var form = document.getElementById(some_id);

    form.reset();

**14.1.3 表单字段**

原生DOM方法可以定位表单里的表单元素，同样表单的elements属性也可以用来定位元素(字段)。

同时可以使用索引进行定位，支持数字和name属性。当好几个表单字段共用同一个name的时候就返回一个NodeList。

* 共有的表单字段属性

  * disabled：表示当前字段是否被禁用
  * form：指向当前表单的指针，只读。
  * name：当前字段的名称。
  * readOnly：布尔值，表示当前字段是否只读。
  * tabIndex：表示当前字段的tab(切换)序号。
  * type：表示当前字段的类型。(radio/checkbox等)
  * value：当前字段将被提交给服务器的值。对于文件字段只读，包含文件在计算机中的路径。

  以上属性除了form都可以在JS中进行修改。

  为避免重复提交提供了一个方案。

        var form = document.getElementById(some_id);

        EventUtil.addHandler(form, 'submit', function(event) {
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);
            var btn = target.elements['submit_button'];
            btn.disabled = true;
        });

  另外一个需要注意的属性是type，fieldset字段没有type属性，input字段的type属性等于其HTML特性，其他表单元素的type属性固定。
  详见p417。
* 共有的表单字段方法

  * `focus()`：用来使当前字段获得焦点，从而可以响应键盘事件

    可以侦听window.onload事件从而使指定表单获得焦点，也可以使用autofocus属性。
  * `blur()`