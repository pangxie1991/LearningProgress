JS是一门弱类型语言, 不需要类型转换, 对象继承关系变得无关紧要. 对于对象来说重要的是它能做什么, 而不是从哪里来.

### Pseudoclassical

JS的原型机制很特殊, 它不直接让对象从其他对象继承, 反而插入了一个多余的中间层: 通过构造器函数产生对象.

当一个函数对象被创建时, Function构造器产生的函数对象会运行类似的代码`this.prototype = {constructor: this}`

JS并没有提供一种方法去确定哪个函数是打算用来作为构造器的, 所以每个函数都会得到一个prototype对象.

最基本的继承方法是构造一个伪类, 定义它的constructor函数并替换其prototype为一个父类的实例.

这种写法的本意是想向面向对象靠拢, 但却格格不入, 我们可以隐藏一些丑陋的细节, 通过封装过程来更优雅的实现.

```js
Function.method('inherits', function (Parent) {
    this.prototype = new Parent();
    return this;
});

// 通过在method和inherits方法中返回this, 可以实现级联.
var Cat = function(name) {
    this.name = name;
    this.saying = 'meow';
}.inherits(Mammal).method('purr', function() {
    // ****
});
```
以上的写法依然存在缺陷, 没有私有环境, 所有属性都是公开的, 没法访问父类的方法, 同时必须使用new操作符
(如果忘记使用new操作符, 则this会被绑定到全局对象, 此时不但没有产生新对象的实例, 反而污染了全局变量环境)

伪类的形式可以给熟悉类继承的程序猿提供便利, 但是也隐藏了语言的真实本质, 可能会误导人去编写过于深入复杂的层次结构, 层次结构产生的原因
往往是因为静态类型检查的约束, 而JS并不存在这些约束, 存在着许多比类继承更好的选择.

### Object Specifiers

有时候对象的构造器需要接受一大堆参数, 此时与其选择记忆参数的顺序不如提供一个简单的对象说明符.

```js
var myObject = maker(f, l, m, c, s);

var myObject1 = maker({
    first: f,
    middle: m,
    last: l,
    state: s,
    city: c,
});
```

### Prototypal

在一个纯粹的原型模式中, 我们会摒弃类, 转而专注于对象. 基于原型的继承相比基于类的继承在概念上更为简单. 一个新对象可以继承一个旧
对象的属性.

从构造一个有用的对象开始, 接着构造更多和那个对象类似的对象, 就可以完全避免把一个应用拆解成一系列嵌套抽象类的过程.

```js
if (Object.beget !== 'function') {        
    Object.create = function (o) {
        var F = function () {};     // F是一个用来进行中转的伪类
        F.prototype = o;
        return new F();
    };
}

var myMammal = {
    name: 'Herb the Mammal',
    getName: function () {
        return this.name;
    },
    says: function () {
        reutrn this.saying || '';
    }
}

var myCat = Object.create(myMammal);

// ***** 定制myCat
```

### Functional

目前我们看到的继承模式有一个缺点就是无法保护隐私, 所有属性和方法均可见, 而一些人使用伪装私有的方式来逃避这一点. 使用奇怪的前缀..
其实我们有一个更好的选择, 那就是应用模块模式.

从构造一个生成对象的函数开始, 可以构造对象字面量, 或者使用`new`操作符调用构造函数, 或者使用类似`Object.create`方法, 或者调用任意一个会返回对象的函数.

第二步在这个函数中定义私有变量和方法.

第三步给这个对象扩充方法, 最后返回这个对象.

```js
var mammal = function (spec) {
    var that = {};
    that.get_name = function () {
        return spec.name;
    }
    
    that.says = function () {
        return spec.saying || '';
    }
    
    return that;
}

var myMammal = mammal({name: 'uri'});

var cat = function (spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);
    that.purr = function () {
        //*****
    };
    
    return that;
}

var myCat = cat({name: 'boton'});

Object.method('superior', function () {
    var that = this;
    var method = that[name];
    return function () {
        return method.apply(that, arguments);
    };
});

var coolCat = function (spec) {
    var that = cat(spec);
    var super_get_name = that.superior('get_name');
    that.get_name = function () {
        //*****
    };
    
    return that;
}
```
### Parts

可以从一套部件中把对象组装出来.

详见p55.
