## Socket.IO

* H5中的WebSocket通信
* Flash中使用的WS通信
* XHR轮询
* JSONP轮询
* Forever Iframe

#### Socket.IO模块的使用

* 附加服务器
```js
var sio = require('socket.io');
var socket = sio.listen(server);
// 为http服务器附加一个socket.io服务器
```

* connection事件和disconnect事件
```js
socket.on('connection', function () {
    // 回调略
});

socket.on('disconnect', callback);
```
* 消息的传递
```js
// *
// 服务器端
// --------------------------------------------------------------------------------
socket.send(msg);

socket.on('message', callback);

// *
// 客户端
// --------------------------------------------------------------------------------
// 首先需要引入socket.io类库
var socket = io.connect();
socket.on('message', callback);

socket.send(msg);
```

* 发送事件
```js
socket.emit(event, data, [callback]);
// event可以自定义, 所以灵活性max

socket.on(event, callback);

socket.once(event, callback);
```


















