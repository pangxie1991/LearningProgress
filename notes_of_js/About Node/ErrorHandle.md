## Error Handle of Node.js

domain module

#### uncaughtException

* 
```js
process.on('uncaughtException', function (err) {
    console.log(err);
});
```
使用这种方式处理错误十分粗暴, 容易造成内存泄漏等一系列恶劣后果. 

#### domain

* 实例
```js
var http = require('http');
var domain = require('domain');

http.createServer(function (req, res) {
    var d = domain.create();
    
    d.once('error', function (err) {
        res.writeHead(200, {'ContentType': 'text/html'});
        res.write('<head><meta charset="utf-8" /></head>');
        res.write(`服务器接收请求时发生以下错误:
            ${err.message}`);
        res.end();
    });
    d.run(function () {
        if (req.url !== './favicon.ico') {        
            noneexist();
            res.write('<head><meta charset="utf-8" /></head>');
            res.write(`hello`);
            res.end();
        }
    });
}).listen(1337, '127.0.0.1');
```
#### Domain 对象

`var d = require('domain').create();`
* 隐式绑定
  
  domain对象可以捕捉任意EventEmitter对象上冒泡的错误, 使用`on.('error', callback)`进行监听
  
  `domain.run(fn)`括号内函数的代码就被隐式绑定在domain上. 而想要为其中的某些对象单独绑定给其他domain对象, 就需要进行显示绑定.

* 显示绑定
  
  `domain.add(emitter);`对应的有`domain.remove(emitter);`
* 绑定回调
  
  `domain.bind(callback);`
  ```js
  var fs = require('fs');
  var domain = require('domain');
  var d = domain.create();
  fs.readFile('./test.txt', d.bind(function (err, data) {
      if (err) throw err;
      else console.log(data);
  }));
  d.on('error', fn);
  ```
* 拦截回调
  
  直接使用`domain.intercept(fn)`可以直接拦截回调中的错误, 省略抛出的步骤.

* domain堆栈的弹出与推入
  
  类似事件环机制, 可以处理并行的多个domain对象

* domain对象的销毁
  
  `domain.dispose();`





