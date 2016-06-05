## Express

* 创建
```js
var express = require('express');
var app = express();

app.listen(1337, '127.0.0.1');
```

#### 对node的http模块的封装
```js
app.get(path, function(req, res) {
    //
});
```

#### 路由

可以根据请求所提交的URL不同而返回不同的服务器响应.
使用参数的方式有很多种

* path
```js
app.get('/index.html/:id?/:name?', function (req, res) {
    var str = '';
    if (req.param.id) {        
        str += `ID参数为: ${req.param.id} \n`;
    }
    if (req.param.name) {        
        str += `Name参数为: ${req.param.name} \n`;
    }
    res.send(str);
});
```

* 通配符
```js
app.get('/i*.html', function (req, res) {});
```

* 正则
```js
app.get(/\/(\d+)/, function (req, res) {});
```

#### 其余http方法

* post: 请求类型有可能是表单提交或者ajax, 处理需要依赖callback里的req以及parser

* put: 一般用来ajax请求, 同样需要接触parser从req里解析数据

* delete: ajax删除

* all: 通配各种请求方式

#### Middleware

一个中间件是一个用来处理客户端请求的函数. 每个中间件内部都封装一个next回调函数, 用于在中间件处理完成之后调用.

内置的中间件:

* basicAuth
* bodyParser
* compress
* cookieParser
* csrf: 附加表单变量来对请求进行处理, 防止网站接收伪站点请求
* directory
* errorHandler
* favicon
* limit
* logger
* methodOverride: 为bodyParser提供伪HTTP请求支持
* responseTime
* router
* session
* static


