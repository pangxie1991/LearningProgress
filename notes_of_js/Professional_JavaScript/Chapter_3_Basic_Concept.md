## 3-基本概念

#### 3.2关键字和保留字

**关键字**

+ break
+ case
+ catch
+ continue
+ debugger
+ default
+ delete
+ do
+ else
+ finally
+ for
+ function
+ if
+ in
+ instance
+ of
+ new
+ return
+ switch
+ this
+ throw
+ try
+ typeof
+ var
+ void(空间)
+ while
+ with

**保留字**

*ECMAScript 3*

+ abstract
+ boolean
+ byte
+ char
+ class
+ const(常量)
+ debugger
+ double
+ enum(枚举)
+ export(出口)
+ extends(扩展)
+ final
+ float
+ goto
+ implements(工具)
+ import
+ int
+ interface
+ long
+ native(本地)
+ package
+ private
+ protected
+ public
+ short
+ static
+ super
+ synchronized(同步)
+ throws
+ transient(短暂)
+ volatile(挥发)

*ECMAScript 5*

+ implements
+ interface
+ let
+ package
+ private
+ protected
+ public
+ static
+ yield

*In Use*

ECMAScript 3 + let yield eval arguments

#### 3.4 数据类型

**基本数据类型**

+ Undefined
+ Null
+ Boolean
+ Number
+ String

**复杂数据类型**

+ Object

#### 3.4.1 typeof操作符


    var message = "some message",
        car     = null;
    console.log(typeof message);              //"string"
    console.log(typeof(message));             //"string"
    console.log(typeof 95);                   //"number"
    console.log(typeof car);                  //"object"

#### 3.4.3 Null类型

    var something = null;              //声明一个空对象（指针）。

#### 3.4.4 Boolean类型

    var someundefined;
    Boolean("");                       //"false"
    Boolean(message);                  //"true"
    Boolean(someundefined);            //"false"
    Boolean(car);                      //"false"
    Boolean(0);                        //"false"
    Boolean(NaN);                      //"false"

#### 3.4.5 Number 类型

    var somenumber = 070;              //8进制
    var somenumber_1 = 0xA;            //16进制
    console.log(isNaN(NaN));           //"true"
    Number("AAA");                     //NaN
    Number("");                        //0
    Number(null);                      //0
    Number(someundefined);             //NaN
    parseInt("1245blue");
    parseFloat("1245.1234blue");

#### 3.4.6 String 类型
