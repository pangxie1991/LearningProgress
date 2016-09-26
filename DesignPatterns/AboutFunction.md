### This

this的指向大概可以分为以下4种

+ 作为对象的方法调用
+ 作为普通函数调用
+ 构造器调用
+ call或者apply调用(bind, call都是包装在apply上的语法糖)

```js
document.getElementById = (function(func) {
    return function() {
        return func.aplly(document, arguments);
    }
})(document.getElementById);
```

### call 和 apply的用途

+ 改变this的指向

+ 实现bind

  ```js
  Function.prototype.bind = function(context) {
      var self = this;
      return function() {
          return self.apply(context, arguments)
      }
  }
  ```
+ 借用其他对象的方法

  ```js
  var returnArrayArgs = function() {
      return [].slice.call(arguments, 0);
  };

  var getType = function(n) {
      var t = typeof n;
      return t === 'object' ? n == null ?  
  };
  ```
