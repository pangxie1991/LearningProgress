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
  * `blur()`：用来才表单元素移除焦点，并不会将焦点移到特定字段，因此如今已经不多使用。早期可以用来模拟readOnly字段。

* 共有的字段事件

  * blur：焦点移出时触发
  * change：对于input和textarea元素，当它们失去焦点并且value值改变时触发，对于select元素，当其选项改变时触发。
  * focus：获得焦点时触发。

  通常blur和focus被用来改变用户界面，给出视觉提示，添加额外功能。change事件一般用来验证用户输入，或者操作页面逻辑。

        var textbox = document.forms[0].elements[0];

        EventUtil.addHandler(textbox, 'focus', function(event) {
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);

            if (target.style.backgroundColor !== 'red') {
                target.style.backgroundColor = 'yellow';
            }
        });

        EventUtil.addHandler(textbox, 'blur', function(event) {
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);
            var regexp = /[^\d]/;

            if (regexp.test(target.value)) {
                target.style.backgroundColor = 'red';
            } else {
                target.style.backgroundColor = '';
            }
        });

        EventUtil.addHandler(textbox, 'change', function(event) {
            event = EventUtil.getEvent(event);
            var target = EventUtil.getTarget(event);

            if (regexp.test(target.value)) {
                target.style.backgroundColor = 'red';
            } else {
                target.style.backgroundColor = '';
            }
        });
#### 14.2 文本框脚本

基本文本框类型是input和textarea，分别对应单行和多行。

其中input的type必须为text，而且通过设置size特性可以指定单行文本框显示的字符数。value特性可以指定初始值，maxlength则用来指定可以
接受的最大字符数。

对于textarea则使用rows和cols这两个特性来指定其大小。并且初始值位于元素标签之间，而且不能指定初始默认最大值。

两种文本框的输入都保存在value属性中，使用JS可以很方便的操作这些值而不应该使用原生DOM方法。

**14.2.1 选择文本**

两种文本框都支持`select()`方法，调用时自动获得焦点，可以在任何时候被调用。

一般用法是在获得焦点时选择所有文本，方便用户修改删除。

    EventUtil.addHandler(textbox, 'focus', function(event) {
        event = ..
        var target = ..

        target.select();
    });

* select事件

  选中文本框中的文本就会触发select事件，触发时间因浏览器而异。调用select方法也会触发。

* 取得被选中的文本

  HTML扩展方案提供的解决方案。添加了两个属性，selectionStart和selectionEnd。保存的是基于0的索引值。

        function getSelectionText(textbox) {
            return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
        }
  这个扩展方案支持IE9+，而IE8中可以使用document.selection进行替代。注意IE8特有属性返回的是文档全局范围内被选中的值。

        function getSelectionText(textbox) {
            if (typeof textbox.selectionStart === 'number') {
                return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
            } else if (document.selection) {
                return document.selection.createRange().text;
            }
        }
* 选择部分文本

  一个HTML5特有的select方法的升级方案，最早由Firefox引入的`setSelectionRange()`，接收类似subString的参数。

  IE8-的版本则有一个替代方案。需要首先使用`createTextRange()`，书写较为复杂。

  具体的回退方案详见p422.

**14.2.2 过滤输入**

需要用户输入特定的字符，可以在提交时验证也可以选择在一开始过滤输入。

* 屏蔽字符

  响应向文本框中插入字符的是keypress事件，因此可以通过修改其行为来达到屏蔽效果。

        EventUtil.addHandler(textbox, 'keypress', function(event) {
            event = ..
            var target = ..
            var charCode = EventUtil.getCharCode(event);

            if (!/\d/.test(String.fromCharCode(charCode))) {
                EventUtil.preventDefault(event);
            }
        });
  屏蔽需要绕过可以触发keypress事件的其他按键，比如方向键，删除键等等，以及Ctrl+C等组合键，这些按键要么字符编码小于10，要么有特殊的
  属性因此可以修改代码。

        ...
        if (!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey)
        ...
* 操作剪贴板

  从IE引入并且标准化的剪贴板相关事件。

  * beforecopy：发生复制操作前触发。
  * copy：复制操作发生时触发
  * beforecut
  * cut
  * beforepaste
  * paste

  因为并没有针对剪贴板操作的标准，这些事件以及相关对象因浏览器而异，为了弥合差异可以修改EventUtil对象的代码。具体实现见p425.

**14.2.3 自动切换焦点**

  实现方案如下：

    (function() {

        function tabForward(event) {
            event = ..
            var target = ...

            if (target.value.length === target.maxLength) {
                var form = target.form;

                for (var i = 0, len = form.elements.length; i < len, i++) {
                    if (form.elements[i] = target) {
                        if (form.elements[i+1]) {
                            form.elements[i+1].focus();
                        }
                        return;
                    }
                }
            }
        }

        var textbox1 = ...
        var textbox2 = ...
        var textbox3 = ...

        EventUtil.addHandler(textbox1, 'keyup', tabForward);
        EventUtil.addHandler(textbox2, 'keyup', tabForward);
        EventUtil.addHandler(textbox3, 'keyup', tabForward);
    }());

**14.2.4 HTML5约束验证API**

* 必填字段

  require。

* 其他输入类型

  type = email
  type = url

* 数值范围

  number/range/datetime/datetime-local
  支持不好，慎用。

* 输入模式

  HTML5新特性，字段可以添加pattern属性，其值是一个正则表达式，可以用来在提交时自动验证输入的类型。

* 检测有效性

  * 字段拥有一个checkValidity()方法来按照以上约数判断字段输入是否有效。返回布尔值。

    在整个表单元素上调用这个方法可以检测整个表单是否有效。

  * 同时字段还有一个validity属性，类似抛出的错误可以检测无效的原因，这个对象包含一系列属性可以探究输入无效的原因，详见p.430

* 禁用验证

  * 给表单元素添加novalidate属性可以禁用验证。
  * 如果表单有多个提交按钮，则可以给某一个按钮添加formnovalidate特性使其产生的提交禁用验证。

#### 14.3 选择框脚本

selection和options标签。

selection作为HTMLFormElement的子类有一些独有属性和方法。

* `add(newOption, refOption)`：向控件插入新的option选项，位置在refOption之后。
* `multiple`：布尔值属性，表示是否允许多选，等价于HTML同名特性。
* `options`：控件中所有option元素的HTMLCollection。
* `remove(index)`
* `size`：表示可见的行数，等价HTML中的同名特性。
* `selectedIndex`：基于0的选中项索引，不存在选中项时为-1，多选框则只保存第一选中项的索引。
* selection字段的type属性是select-one或者select-multiple，取决于multiple属性值。
* value属性则根据选项变动，空字符串、选中项的value值、选中项的文本、第一个选中项的value或者文本。

option字段也有特有的属性。

* index
* label：当前选项的标签，等价于HTML同名特性。
* selected
* text
* value
这些属性大都是为了方便访问，以防过于频繁的查询DOM。

最后选择框的change事件只要选项发生变化就一定会触发。

**14.3.1 选择选项**

对于单选框，访问其选项的最简单方式就是使用选择框的selectedIndex。

    var selectedIndex = selectionbox.selectedIndex;
    var selectedOption = selectionbox.options[selectedIndex];

对于多选框，因为selectedIndex只记录第一项的索引值，所以设置这个值会导致先取消所有选中项，再选中指定项。而设置选项字段的selected字段
不会导致这种结果。

对于多选项试图取得选择结果可以使用遍历。

    function getSelectionOptions(selectionbox) {
        var result = [];
        var options = selevtionbox.options;

        for (var i = 0, len = options.length; i < len; i++) {
            if (options[i].selected) {
                result.push(options[i]);
            }
        }

        return result;
    }

**14.3.2 添加选项**

推荐使用Option构造函数配合HTMLSelectElement类型的add方法而不是标准DOM方法。

因为不同浏览器对add方法的第二个参数的实现上有差异，只能标准化为第二个参数为undefined，从而默认将新的选项的插入选择框末尾。

    var newOption = new Option('Option text', 'Option value');
    selectionbox.add(newOption, undefined);

如果想跨浏览器将选项添加在指定位置还是使用标准DOM技术以及insertBefore()。

**14.3.3 移除选项**

一般使用select特有的remove方法。传入希望移除选项的索引作为参数。如果想移除所有选项需要进行迭代。

**14.3.4 移动和重排**

使用标准DOM方法中的appendChild()和insertBefore()，需要注意这两个方法代表着移位，复制应该先执行复制。

#### 14.4 表单序列化

Ajax需求。在JS中利用表单字段的type属性，连同name属性和value属性一起实现对表单的序列化。一下是浏览器将表单数据发送给服务的过程。

* 对表单字段的名称和值进行URL编码，使用和号(&)分隔。
* 不发送禁用的表单字段
* 只发送勾选的复选框和单选按钮
* 不发送type为reset和button的按钮
* 多选选择框中的每个选中值单独一个条目
* 在单击表单提交的情况下，也会发送提交按钮，否则不发送。也包括type是image的input元素
* select的值就是选中项的value或者文本值

以下是序列化代码

    function serialize(form) {
        var parts = [],
            field = null,
            i, len, j, optLen, option, optValue;
        for (i = 0, len = form.elements.length; i < len; i++) {
            field = form.elements[i];

            switch(field.type) {
                case 'select-one':
                case 'select-multiple':
                    if (field.name.length) {
                        for (j = 0, optLen = field.options.length; j < optLen; j++) {
                            option = field.options[j];

                            if (option.selected) {
                                optValue = '';
                                if (option.hasAttribute) {
                                    optValue = (option.hasAttribute('value')) ?
                                            option.value : option.text;
                                } else {
                                    optValue = (option.attributes['value']).specified ?
                                            option.value : option.text;
                                }
                                parts.push(encodeURIComponent(field.name) + '=' +
                                        encodeURIComponent(value));
                            }
                        }
                    }
                    break;
                case undefined:     //字段集
                case 'file':        //文件输入
                case 'submit':      //提交按钮
                case 'reset':       //重置按钮
                case 'button':      //按钮
                    break;

                case 'radio':       //单选按钮
                case 'checkbox':    //多选按钮
                    if (!field.checked) {
                        break;
                    }
                    /* 执行默认操作 */

                default:
                    //不包括没name属性的字段
                    if (field.name.length) {
                        parts.push(encodeURIComponent(field.name) + '=' +
                                encodeURIComponent(field.value));
                    }

            }
        }

        return parts.jion('&');
    }
对于单选按钮需要检查其checked属性是否被设置为false，所以在radio和checkbox后有一组判断语句。





#### 14.5 富文本编辑

WYSIWYG(What You See Is What You Get)。在网页中编辑富文本内容没有标准话，但是在IE引入之后已经成为事实标准。

其技术本质就是在页面中插入一个包含空HTML的iframe。通过设置designMode属性，这个空白的HTML页面可以被编辑，而编辑对象就是这个空白页面
body元素的HTML代码。

designMode有两个可能值，on和off，在设置为on时整个文档都会变得可以编辑，有插入符号，可以通过键盘将文本内容进行加粗，斜体等等。

TODO

**14.5.4 表单与富文本编辑**

富文本编辑是使用iframe而非表单控件实现的，因此其中的HTML不会自动被提交给服务器，需要我们手动来提取并提交HTML。为此，通常可以添加一
个隐藏的表单字段，让它的值等于iframe中提取的HTML。

具体操作就是提交表单之前从iframe中提取出HTML，并将其插入到隐藏的字段中。一般通过操作表单的onsubmit事件进行。

    EventUtil.addHandler(form, 'submit', function(event) {
        event = ...
        var target = ....

        target.elements['comments'].value = frames['richedit'].document.body.innerHTML;
    })













