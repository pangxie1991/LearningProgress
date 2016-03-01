## Chapter6 面向对象的程序设计

#### 6.1 理解对象

 * 无序属性的集合，其属性可以是基本值、对象、函数。
 * 对象由任意一种引用类型(Object, Function, Array, Date, RegExp...)或者自定义类型创建。
 * 创建对象的方式主要分两种，一种是创建实例然后添加属性，一种是对象字面量。

**6.1.1 属性类型**

* 数据属性

  数据属性包含一个数据值的位置，可以进行读取和写入操作。

        [[Configurable]]  是否能够通过删除重新定义
        [[Enumerable]]    是否能够通过for-in循环显示属性
        [[Writable]]      是否能够修改其值
        [[Value]]         包含这个属性的数据值，读取值和写入值都操作这个位置，默认undefined

  操作上述这些特性的时候可以通过Object.defineProperty(object,"属性值",{特性字面量})来进行。
  调用后如不指定默认都是false，所以一般没必要用。

* 访问器属性

  访问器属性不包含数据值；包含一对getter和setter函数，有以下几个特性。

        [[Configurable]]
        [[Enumerable]]
        [[Get]]
        [[Set]]

  用起来需要特殊指定，属性名前有下划线。

        var book = {
            _year: 2004,
            edition: 1
        };

        Object.defineProperty(book,"year",{
            get: function (){
                return this._year;
            }
            set: function (){
                if(newValue > 2004) {
                    this._year = newValue;
                    this.edition += newValue - 2004;
                }
            }
        });

        //对上述特性的操作需要IE9+

* 定义多个属性的特性

        Object.defineProperties (object,{
            属性1: {
                特性1: ....,
                特性2: ....
            }
            属性2: ...
        });

* 读取属性的特性

        //特性操作方式为ECMAScript 5
        Object.getOwnPropertyDescriptor(object,"属性名");



#### 6.2 创建对象

* **6.2.1 工厂模式**

  工厂模式抽象了创建具体对象的过程，用函数来封装以特定接口创建对象的细节。

        function createPerson (name, age, job){
            var o = new Object;
            o.name = name;
            o.age = age;
            o.job = job;
            o.sayName = function (){
                alert(this.name);
            };
            return o;
        }

        var person1 = createPerson(....),
            person2 = createPerson(....);
  工厂模式解决了创建多个相似对象的问题，但是没有解决对象识别的问题。

* **6.2.2 构造函数模式**

        function Person(name, age, job){
            this.name = name;
            this.age = age;
            this.job = job;
            this.sayName = function () {
                alert(this.name);
            };
        }

        var person1 = new Person(....),
            person2 = new Person(....);

  + 构造函数模式没有显示的创建对象，直接把属性和方法赋给了this对象，没有return语句。

    其工作模式为创建一个对象；把构造函数(Person(),pascal命名)作用域赋给新对象；执行构造函数里的代码，添加属性和方法；返回这个新对象。

    创建出来的对象都会有一个constructor属性，指向Person，而且同时是Object和Person的实例。

    由构造函数模式创建的对象，都是这个构造函数的实例，就实现了对象识别的功能。

    构造函数可以被直接当作函数使用，可以作为普通函数调用也可以在指定作用域中调用。

        Person(....);
        window.sayName();   //可以执行。
        Person.call(o,....);
        o.sayName();        //可以执行。

  + 构造函数模式存在的问题在于每一个实例都独享一个方法(sayName,Function实例)。

        person1.sayName === person2.sayName     // false

    可以把这个Function实例拿出来写成一个全局函数，但是这样会影响封装性。

* **6.2.3 原型模式**

  + 原型模式的基本构造如下：

        function Person (){
        }

        Person.prototype.name = "...";
        Person.prototype.age = ...;
        Person.prototype.job = "...";
        Person.prototype.sayName = function (){
            alert(this.name);
        };

        var person1 = new Person();
        var person2 = new Person();

  + 理解原型

    创建任何函数都会有一个prototype属性，这个属性指向函数的原型对象。

    创建了构造函数之后原型对象只会默认获得constructor属性，其余属性继承自Object.

    在通过构造函数创建了新的实例之后，每一个实例都存在一个指针指向原型对象，通过原型对象我们就可以调用保存在原型中的属性和方法。(查找对象属性)

        Person.prototype.isPrototypeOf(person1)     // true
        Object.getPrototypeOf(person2) == Person.prototype;   // true

  + 改写原型对象的属性。

    可以直接在实例中改写属性，根据查找的方式，只有在实例中查找不到才会上述到原型。

    使用`hasOwnProperty()`可以检测属性是存在于实例还是原型。

        person1.hasOwnProperty("name")    // false

  + 通过in操作符可以检查通过对象能够访问到的属性，无论存储在哪里。

        "name" in person1;   // true
        function hasPrototypeProperty (object,name){
            return !object.hasOwnProperty(name) && (name in object);
        }

  + 可以使用上述函数判断属性是否保存在原型里。并不保存在实例中，而且可以访问到，所以一定在原型里。

    IE8 之前屏蔽不可枚举属性的实例属性不会出现在for-in循环中。

  + ECMAScript5则添加了一个方法可以查询存储在对象里的属性和方法。

        var keys = Object.keys(Person.prototype);   //["name","age","job","sayName"]
    上述方法都存在于Object类型里，这个方法返回一个字符串数组。

  + 使用字面量语法修改原型。

    使用字面量修改原型,本质上是完全重写，会使得其constructor属性不再指向构造函数，而是指向Object函数。

    解决这个问题可以在字面量中专门指定constructor，但是会使得constructor的枚举特性被设置为true。

    此时可以直接使用ECMA5中的`Object.defineProperty()`

        function Person (){
        }
         *
        Person.prototype = {
            name: ...,
            age: ...,
            job: ...,
            sayName: function () {
                ....;
            }
        };

        Object.defineProperty(Person.prototype , "constructor",{
            enumerable: false,
            value: Person
        };

  + 原型的动态性

    在重写原型对象之前创建的实例中的原型指针会指向旧的原型。

  + 原型模式存在的问题：

    方便的共享方法，通过实例的同名属性可以屏蔽原型中的包含基本值的属性继承，但是对于引用类型比如数组就比较麻烦。

* **6.2.4 组合使用构造函数模式和原型模式**

        function Person (name, age, job){
            this.name = name;
            this.age = age;
            this.job = job;
            this.friends = ["...","..."];
        }

        person.prototype = {
            constructor: Person,
            sayName: function () {
                alert("this.name");
            }
        }

        var person1 = new Person("...",...,"..."),
            person2 = new Person(....);

* **6.2.5 动态原型模式**

        function Person (name, age, job) {

            //属性
            this.name = name;
            this.age = age;
            this.job = job;

            //方法
            if (typeof this.sayName != "function"){

                Person.prototype.sayName = function () {
                    alert(this.name);
                };

            }
        }
        //第二段方法部分只有在初始化的时候才会执行。

* **6.2.6 寄生构造函数模式**

  创建一个函数封装创建对象的代码，然后再返回新创建的对象。可以用来生成不能去修改构造函数的特殊对象。

        function Person (name, age, job){
            var o = new Object();
            o.name = name;
            o.age = age;
            o.job = job;
            o.sayName = function () {
                alert(this.name);
            }
            return o;
        }

        function SpecialArray () {

            //创建数组
            var values = new Array();

            //添加值
            values.push.apply(values,arguments);

            //添加方法
            values.toPipedString = function () {
                return this.jion("|");
            }

            //返回数组
            return values;
        }

  需要注意的一点就是寄生模式下返回的对象跟构造函数以及构造函数的原型之间没有关系，所以尽量不要使用这种模式。

* **6.2.7 稳妥构造函数模式**

  稳妥对象，没有公共属性，其方法也不引用this对象，主要是为了安全目的

        function Pers  (name, age, job) {

            //创建要返回的对象
            var o = new Object();

            //可以在这里定义私有变量和函数

            //添加方法
            o.sayName = function () {
                alert(name);
            }

            //返回对象
            return o;
        }

  在以这种模式创建的对象，除了使用sayName()方法之外无法访问到name值。

  这样使用new操作符定义的变量里保存的就是一个稳妥对象。

#### 6.3 继承

**6.3.1 原型链**

利用原型，让一个引用类型继承另一个引用类型的属性和方法。

每个引用类型都有一个原型对象，原型对象包含一个指向构造函数的指针，而所有通过这个构造函数创建的实例都包含一个指向这个原型对象的指针。

那么我们让一个原型对象成为另外一个对象的实例，则此时的原型对象将包含一个指向另外一个原型的指针，层层递进形成原型链。


    function SuperType(){
        this.property = true;
    }

    SuperType.prototype.getSuperValue = function () {
        return this.property;
    };

    function SubType () {
        this.subProperty = false;
    }

    //形成原型链并继承
    SubType.prototype = new SuperType();

    //私有方法
    SubType.prototype.getSubValue = function () {
        return this.subProperty;
    };

    var instance = new SubType();

    instance.getSuperValue();       //true     从原型链中继承的方法。

注意`instance.constructor` 现在指向SuperType，因为其原型被完全重写了。

所有的自定义对象都有个默认原型——Object   很多方法都继承自Object。


可以使用instanceof操作符来检索一个对象原型链中出现的所有构造函数。

    instance instanceof Object             //true
    instance instanceof SuperType          //true
    instance instanceof SubTypr            //true

也可以使用`isPrototypeOf()`方法，可以检索所有原型链中出现的原型。

    Obeject.prototype.isPrototypeOf(instance);       //true
    SuperType.prototype.isPrototypeOf(instance);     //true
    SubType.prototype.isPrototypeOf(instance);       //true

给下级原型添加私有方法和属性以及覆盖上级原型的方法和属性一定要在替换原型语句之前。

    //形成原型链并继承
    SubType.prototype = new SuperType();

    //私有方法
    SubType.prototype.getSubValue = function () {
        return this.subProperty;
    };
而且在添加私有方法或者属性以及覆盖的过程中不能使用字面量方式(相当于重写原型)

原型中包含引用类型值(比如数组)的属性会被所有实例共享，在使用原型链实现继承的过程中原先的实例属性会自动变成原型属性。

**6.3.2 借用构造函数实现继承**

解决上述问题的一种继承方式。

    function SuperType (name) {
        this.color = ["red","yellow"];
        this.name = name;
    }

    function SubType (name) {

        //继承了 SuperType
        SuperType.call(this,name);
    }

通过上述方式，下级构造函数借调了上级类型的构造函数。在其中可以传递参数。

但是这种方式并没有解决函数复用的问题

**6.3.3 组合继承**

     function SuperType (name) {
         this.color = ["red","yellow"];
         this.name = name;
     }

     SuperType.prototype.sayName = function () {
         alert(this.name);
     };

     function SubType (name，age) {

         //继承了 SuperType
         SuperType.call(this,name);

         //下级实例属性
         this.age = age;
     }

     //原型链继承方法
     SubType.prototype = new SuperType();

     //对原型进行调整，添加私有方法。
     SubType.prototype.constructor = SubType;
     SubType.prototype.sayAge = function () {
         alert(this.age);
     }

以上就是最常用的基本继承方法。避免了单独使用原型链以及使用构造函数继承的缺陷。

**6.3.4 原型式继承**

借助原型可以基于已有的对象创建新对象，同时不必因此创建自定义类型。

     function object (o){
         function F () {}
         F.prototype = o;
         return new F();
     }

其内部有一个临时性的构造函数`F()`，然后将传入的对象作为这个构造函数的原型，然后返回这个临时类型的实例。

整个过程相当于对o执行了一次浅复制，得到的新实例实际上是o的副本，然后可以进行自定义。

注意得到的这个新实例和原来的对象共享引用类型值属性。

ECMAScript 5 增加了`Object.create()`方法规范了原型式继承。其可以通过第二个可选参数实现直接的自定义。

**6.3.5 寄生式继承**

同样是创建一个仅用于封装继承过程的函数，在函数内部以某种方式来增强对象，最后返回对象。

     function createAnother (original) {
         var clone = object (original);
         clone.sayHi = function () {
             alert("hi");
         }
         return clone;
     }

**6.3.6 寄生组合式继承**

组合继承最大的问题在于无论什么情况下都会调用两次上级类型的构造函数，一次是在创建子类型原型的时候，一次是在子类型构造函数内部。

而寄生组合式继承，通过借用构造函数来继承属性，通过原型链的混成形式来集成方法。不必为了指定下级类型的原型而调用上级类型构造函数。

     function inheritPrototype (subType, superType){
         var prototype = Object(superType.prototype);
         prototype.constructor = subType;
         subType.prototype = prototype;
     }

其组合模式如下:

     function SuperType (name) {
         this.name = name;
         this.colors = ["...","...","..."];
     }

     SuperType.prototype.sayName = function () {
         alert(this.name);
     }

     function SubType(name, age){
         SuperType.call(this,name);

         this.age = age;
     }

     inheritPrototype(SubType, SuperType);

     SubType.prototype.sayAge = function () {
         alert(this.age);
     }

其高效率体现在只调用了一次SuperType的构造函数，并且避免了在SubType.prototype上创建不必要的多余的属性。与此同时原型链保持不变。
