## 1.内部函数

JS原生支持内部函数声明是闭包的基础。而内部函数声明一般的目的是为了在必要的地方集合小型工具函数，避免污染命名空间。

    function outerFn() {
        function innerFn() {
            ...
        }
        ...
    }
以上代码中的`innerFn() `就是一个内部函数，在`outerFn()`内部调用`innerFn()`是有效的，而在外部调用会导致一个错误。

    function outerFn() {
        console.log('Outer Function');
        function innerFn() {
            console.log('Inner Function');
        }
    }

    console.log('innerFn:');
    innerFn();  // 会导致一个错误


    // 换用另外一种函数组织方式
    function outerFn() {
        console.log('Outer Function');
        function innerFn() {
            console.log('Inner Function');
        }

        innerFn();
    }

    console.log('outerFn:');
    outerFn();

#### 1.1 在任何地方调用内部函数

当函数引用参与到内部函数声明的时候，问题就更复杂了。其他不支持函数引用的语言比如Pascal只允许通过内部函数实现代码隐藏，而这些函数也
会永远的被埋没在父函数当中。而JavaScript允许像传递任何参数一样传递函数，所以内部函数能够逃脱定义它们的外部函数。(说到底，按照引用
传值传递的只是指向值的指针)。

逃脱的方式有很多种。

* 将内部函数指定给一个全局变量。

        function outerFn() {
            console.log('Outer function');
            function innerFn() {
                console.log('Inner function');
            }
            globalVar = innerFn;
        }

        console.log('OuterFn:');
        outerFn();  // 需要执行一次外部函数才能实现赋值。
        console.log('InnerFn:');
        globalVar();    // 输出'Inner function'
  需要注意的是，此时在`outerFn()`外部调用`innerFn()`依然会导致错误，虽然内部函数通过把引用保存在全局变量中实现了逃脱，但是函数的
  名字仍然被截留在了外部函数的作用域中。因此不能在外部使用。

* 可以通过返回值来营救内部函数

        function outerFn() {
            console.log('Outer');
            function innerFn() {
                console.log('Inner');
            }

            return innerFn; // 注意返回的是代表函数引用的函数名，而不是函数执行语句。
        }

        var fnRef = outerFn();
        fnRef();    // 输出'Inner'

  主要变换在于这种模式下并没有在外部函数内修改全局变量，而是从其内部返回了一个对内部函数的引用，通过调用外部函数将这个返回值赋值给
  任意变量，甚至自己调用自己(`outerFn()();`)，从而执行内部函数。

这种即使在离开函数作用域的情况下依然能够通过引用调用内部函数的事实，意味着只要存在调用这些内部函数的可能，JavaScript就需要保留被引
用的函数，而且运行时需要跟踪引用这个内部函数的所有变量，直到最后一个变量被废弃，才会开始运行垃圾收集机制释放空间。

#### 1.2 理解变量作用域

内部函数当然可以拥有自己的变量，只不过这些变量都被限制在内部函数的作用域中。

* 内部函数自己的变量

        function outerFn() {
            console.log('....');
            function innerFn() {
                var innerVar = 0;
                innerVar++;
                console.log(innerVar);
            }

            return innerFn;
        }

        var fnRef = outerFn();

        fnRef();    // 1
        fnRef();    // 1

        var fnRef2 = outerFn();

        fnRef2();   // 1
        fnRef2();   // 1

  每当通过引用或者其他方式调用内部函数时，都会创建一个新的innerVar变量，然后进行递加操作。

* 操作全局变量

        function outerFn() {
            console.log('....');
            function innerFn() {
                globalVar++;
                console.log(globalVar);
            }
            return innerFn;
        }

        var globalVar = 0;

        var fnRef = outerFn();

        fnRef();    // 1
        fnRef();    // 2

        var fnRef2 = outerFn();

        fnRef2();   // 3
        fnRef2();   // 4

* 操作父函数的变量

        function outerFn() {
            var outerVar = 0;
            function innerFn() {
                outerVar++;
                console.log(outerVar);
            }
            return innerFn;
        }

        var fnRef = outerFn();

        fnRef();    // 1
        fnRef();    // 2

        var fnRef2 = outerFn();

        fnRef2();   // 1
        fnRef2();   // 2

  注意在显示的将内部函数赋值给新的变量后，会在作用域中创建并绑定一个新的outerVar的实例，所以两个计数器是完全无关的。

当内部函数在定义它的作用域外部被引用时，就创建了一个该内部函数的闭包(closure)。这时候我们称既不是内部函数局部变量也不是其参数的变量
为自由变量，称外部函数的调用环境为封闭闭包的环境。

如果内部函数引用了位于外部函数中的变量，相当于授权该变量能够被延时使用，因此当外部函数调用完成后这些变量占用的内存不会被释放，因为
闭包可能仍然要使用它们。

## 2.处理闭包之间的交互

在存在多个内部函数的时候可能会出现意料之外的闭包。假设我们又定义了一个递增函数这个函数的增量为2。

    function outerFn() {
        var outerVar = 0;
        function innerFn1() {
            outerVar++;
            console.log(outerVar);
        }
        function innerFn2() {
            outerVar += 2;
            console.log(outerVar);
        }
        return {'fn1': innerFn1, 'fn2': innerFn2};
    }

    var fnRef = outerFn();

    fnRef.fn1();    // 1
    fnRef.fn2();    // 3
    fnRef.fn1();    // 4

    var fnRef2 = outerFn();

    fnRef2.fn1();   // 1
    fnRef2.fn2();   // 3
    fnRef2.fn1();   // 4

这两个内部函数引用了同一个外部函数的局部变量。因此它们共享一个封闭环境。调用outerFn()的过程实际上就是创建了一个新对象，自由变量就是
这个对象的实例变量。而闭包就是这个对象的实例方法。而且这些变量也是私有的，因为不能在封装他们的作用域外部直接引用这些变量。从而确保了
面向对象的数据专有特性。

## 3.jQuery中创建闭包

很多jQuery方法都需要一个函数作为参数，而为方便起见我们通常都使用匿名函数即写即用。这也就意味着极少会在顶层命名空间定义函数，因此这些
匿名函数都是内部函数，而内部函数很容易变成闭包。

#### 3.1 `$(document).ready()`的参数

一般编写的jQuery代码几乎全部都会放在作为`$(document).ready()`参数的一个函数内部。这样可以保证运行之前DOM已经就绪(并没有完全下载
完成)，这是jQuery运行的一个必要条件。当创建了一个函数并把它传递给`.ready()`之后，这个函数的引用就会被保存为全局jQuery对象的一部分。
在稍后的某个时间(DOM就绪)，这个引用就会被调用。

因为ready函数一般在顶层，因此这个函数并不会构成闭包。但是我们的代码一般都是在这个函数内部编写的，所以这些代码都处于一个内部函数中：

    $(document).ready(function() {
        var readyVar = 0;
        function innerFn() {
            readyVar++;
            console.log(readyVar);
        }

        innerFn();  // 1
        innerFn();  // 2
    });

把大多数的jQuery代码放在一个函数中是有价值的，可以避免很多命名空间冲突。正是因为这种特性我们可以调用`jQuery.noconflict()`为其他
JavaScript库释放简写方式$，但是我们仍然能够在ready函数内部使用局部简写形式。

#### 3.2 绑定事件处理程序

    $(document).ready(function() {
        var counter = 0;
        $('#button-1').click(function(event) {
            event.preventDefault();
            counter++;
            console.log(counter);
        });
    });

因为变量counter是在ready函数中声明的，相对于事件处理程序来说是一个自由变量。每次点击运行事件处理程序的时候引用的是同一个counter
实例。(因为ready函数只运行了一次)。因此消息会显示递增值。

事件处理函数和其他函数一样可以共享它们的封闭环境。

* 在循环中绑定事件处理程序

        // 错误范例
        $(document).ready(function() {
            for (var i = 0; i < 5; i++) {
                $('.button')[i].click(function() {
                    console.log(i);
                });
            }
        });
  上述代码会给前5个带有button类的元素绑定click事件处理程序，然而点击之后都会在控制台输出5。

  可以使用jQuery的each方法来解决这个问题。

        $(document).ready(function() {
            $.each([0,1,2,3,4], function(index, value) {
                $(.button)[index].click(function() {
                    console.log(value);
                });
            });
        });

  当然也可以利用闭包。

        $(document).ready(function() {
            for (var i = 0; i < 5; i++) {
                (function(value){
                    $('.button')[value].click(function() {
                        console.log(value);
                    });
                })(i);
            }
        });

  上面的代码采用立即调用表达式(IIFE)，将i传给变量value并立即执行。从而每个点击事件可以获得不同的值

  最后还可以使用jquery事件系统来解决这个问题，on方法接收一个对象参数，并以event.data的形式传入事件处理程序当中。

        $(document).ready(function() {
            for (var i = 0; i < 5; i++) {
                $('.button')[i].on('click', {value: i}, function(event) {
                    console.log(event.data.value);
                });
            }
        });

#### 3.4 命名及匿名函数

无论是拉姆达函数还是命名函数都可以用来创建闭包。使用下面两个范例来说明这个问题。

    // 匿名函数
    $(document).ready(function() {
        $('input').each(function(index) {
            $(this).click(function(event) {
                event.preventDefault();
                console.log(index);
            });
        });
    });

    // 命名函数
    $(document).ready(function() {
        $('input').each(function(index) {
            function clickHandler(event) {
                event.preventDefault();
                console.log(index);
            }

            $(this).click(clickHandler);
        });
    });

使用命名函数的时候，命名函数所处的位置就很重要了。以下范例运行时会因为找不到对应的自由变量而报错。

    $(document).ready(function() {
        function clickHandler(event) {
            event.preventDefault();
            console.log(index);
        }
        $('input').each(function(index) {
            $(this).click(clickHandler);
        });
    });

## 4.应对内存泄漏的风险

垃圾清理机制的原理就是引用计数系统。当JavaScript代码生成一个新的引用类型的数据作为一个内存驻留项时，比如一个对象或者函数，系统会
为这个驻留项留出一定空间的内存，此时这个项可能会被传递给很多函数，也可能会被指定给很多变量。所以很多代码都会指向这个项。JavaScript
会跟踪这些指针，当最后一个指针废弃不用时，这个对象占用的内存就会得到释放。

因为以上机制的问题，所以一旦出现了循环引用就会导致指向某几个驻留项的指针永远存在，从而造成内存泄漏。

#### 4.1 避免意外的引用循环

    function outerFn() {
        var outerVar = {};
        function innerFn() {
            console.log(outerVar);
        }

        outerVar.fn = innerFn();
    }

上例中内部函数需要外部函数的局部变量，而这个局部变量又在后面的代码中引用了内部函数，因此就产生了一个引用循环。

    function outerFn() {
        var outerVar = {};
        function innerFn() {
            console.log('hello');
        }

        outerVar.fn = innerFn;
    }

实际上上例中一样也存在引用循环，虽然内部函数没有显示的引用外部函数的局部变量，但是局部变量依然存在于innerFn的封闭环境中，所以所有
位于outerFn的局部变量都会被innerFn隐式引用。从而导致循环引用。

#### 4.2 控制DOM与JavaScript的循环

上述的循环引用其实通常不是什么问题，现代浏览器中的JavaScript解释器会很快的发现并且孤立它们，然后释放掉内存。而在IE中存在一个问题，
因为DOM和JS运行着不同的内存管理程序，所以当一个DOM和JS产生循环引用的时候，无论怎样都难以释放掉它们占用的内存。

导致这种循环的一般是事件处理程序。

    $(document).ready(function() {
        var button = document.getElementById('button-1');
        button.onclick = function() {
            console.log(hello);
            return false;
        };
    });

上面的代码在指定单击事件处理程序时，就创建了一个在其封闭环境中包含button变量的闭包。而且现在的button也包含一个指向闭包的引用
(onclick属性本身)。这样就导致了在IE中即使离开了当前页面也不会释放这个循环。

可以考虑的解决方案：

* 在页面删除的时候删除引用。(解除onclick事件)

* 将事件处理程序从闭包中脱出

        function hello() {
            console.log('hello');
            return false;
        }

        $(document).ready(function() {
            var button = document.getElementById('button-1');
            button.onclick = hello;
        });

* 使用jQuery解除循环

        $(document).ready(function() {
            var button = document.getElementById('button-1');
            $button.click(function(event) {
                console.log('hello');
                return false;
            });
        });
  jQuery会手动释放所有自己创建的事件处理程序。

不光事件处理程序，对DOM元素进行任何操作的时候都要小心。只要是将JavaScript对象指定给DOM元素，就可能在旧版本IE中导致内存泄漏。

有鉴于此，jQuery为我们提供了另一个避免这种泄漏的工具，使用data方法可以像使用扩展属性一样，将信息附加到DOM元素。

## 5.小结

JavaScript闭包是一种强大的语言特性，可以用来隐藏变量，可以避免覆盖其他地方使用的同名变量，理解闭包有助于写出更有效而简洁的代码。
在享受其带来的便利的同时，也需要小心的防止可能引发的内存泄漏。


