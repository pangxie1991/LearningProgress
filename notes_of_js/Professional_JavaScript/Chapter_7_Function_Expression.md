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
