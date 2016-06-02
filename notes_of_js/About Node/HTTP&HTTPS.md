## HTTP Server

#### create

* create
```js
var server = http.createServer([requestListener]);
// requestListener is an optional callback function, with args req and res
```

* watch request
```js
server.on('request', listener);
```
* listen
```js
server.listen(port, [host], [backlog], [callback]);
// backlog-client max num
```
* close
```js
server.close();
server.on('close', callback);
```
* error
```js
server.on('error', function(e) {
    if (e.code === 'EADDRINUSE') {        
        console.log('端口被占用');
    }
});
```
* connection
```js
server.on('connection', function (socket) {
    // callback
});
```
* timeout
```js
server.setTimeout(60*1000, function (socket) {
    console.log('服务器超时');
    console.log(socket);
});
```
#### request(HttpIncomingMessage)

* req.method
* req.url
* req.headers
* req.httpVersion
* req.trailers
* req.socket
* req.on()
```js
req.on('data', function (data) {
    console.log(decodeURIComponent(data));
});
req.on('end', function () {
    console.log('数据接收完毕');
});
```
#### URL String and Query String

* querystring
```js
querystring.parse(str, seq, eq, options);
// seq-'&', eq-'=', options-{maxKeys: num}
```
* url
```js
url.parse(url, [parseQueryString]);
// 解析出的对象可能会拥有href/protocol/slashes/host/auth/hostname/port/pathname/search/path/query/hash等属性
url.format(object);
// 将parse方法转换出的对象还原成字符串.
url.resolve(from, to);  // like path
```
#### response

* writeHead
```js
res.writeHead(statusCode, [reasonPhrase], [headers]);
```
* setHeader
```js
res.setHeader(name, value);
res.removeHeader(name);
// res.headersSent --- Boolean 响应头是否已经发送
```
* headers
  + content-type: 指定内容类型
  + location: 重定向
  + content-disposition: 指向一个被下载的文件名
  + content-length: 响应内容字节数
  + set-cookie: 创建cookie
  + content-encoding: 响应内容的编码方式
  + Cache-Control: 开启缓存机制
  + Expires: 缓存过期时间
  + Etag: 当服务器响应内容无变化时不重新下载

* sendDate --- Boolean 是否发送服务器时间
* addTrailers(obj) --- For HTTP 1.1 响应流分块编码
```js
res.writeHead(200, {'Content-type': 'text/plain', 'Trailer': 'Content-MD5'});
res.write('456456456465');
res.addTrailers({'Content-MD5': '78sa47d84as54d564a5sd54as6d45'});
res.end();
```
* write
```js
res.write(chunk, [encoding]);
// res.end();
```
* setTimeout
```js
res.setTimeout(ms, callback);
res.on('timeout', callback);
```

## HTTP Client

#### request

* request
  + host
  + hostname: 优先级大于host, 默认'localhost'
  + port: 目标服务器端口号
  + localAddress: 专用于网络连接的本地接口
  + socketPath: 目标的Unix域端口
  + method: HTTP请求方式, 默认为get
  + path: 指定请求的路径以及查询字符串, 默认为'/'
  + headers: 请求头
  + auth: 信息认证, 比如{'id': 0, 'token': 'dasd4s4f564dsfasdas45d'};
  + agent: 用户代理, todo
```js
var req = http.request(options, callback);
req.on('response', callback);
req.write(chunk, [encoding]);
req.end(chunk, [encoding]);
req.abort();
```

#### proxy

* proxy
```js
var http = require('http');
var url = require('url');

var server = http.createServer(function (sreq, sres) {
    var url_parts = url.parse(sreq.url);
    var opts = {
        host: 'www.amazon.com',
        port: 80,
        path: url_parts,
        headers: sreq.headers
    };
    
    var creq = http.get(opts, function(cres) {
        sres.writeHead(cres.statusCode, cres.headers);
        cres.pipe(sres);
    });
    sreq.pipe(creq);
});
```


