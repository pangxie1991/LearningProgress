## TCP&UDP Modules of Node.js

#### Basics

* OSI Module(Open System Interconnection Reference Module)
* TCP/IP Protocol Suite
```
.
├── 应用层
│   ├────────── 应用层
│   ├────────── 表现层
│   └────────── 会话层
├── 传输层
├── 网络层
└── 网络接口层
    ├────────── 数据链路层
    └────────── 物理层

```
#### UDP & TCP
 1. TCP协议在传送数据段的时候要给段标号；UDP协议不
 2. TCP协议可靠；UDP协议不可靠
 3. TCP协议是面向连接；UDP协议采用无连接
 4. TCP协议负载较高，采用虚电路；UDP采用无连接
 5. TCP协议的发送方要确认接收方是否收到数据段（3次握手协议）
 6. TCP协议采用窗口技术和流控制

#### TCP based on net Module

* Server创建
```js
var server = net.createServer([options], [connectionListener])

// 示例
var net = require('net');
var server = net.createServer(function (socket) {
    console.log('连接已建立');
});
server.listen(8431, 'localhost', function(socket) {
    console.log('服务器开始监听');
});
server.on('error', function (e) {
    if (e.code == 'EADDRINUSE') {        
        console.log('端口被占用');
    }
});
```
* address方法
```js
var add = server.address();
add.port
add.address // 127.0.0.1
add.family  // IPV4/IPV6
```
* getConnections方法
```js
var server = net.createServer(function (socket) {
    server.getConnections(function (err, count) {
        server.maxConnections = 2;
    });
});
```
* close方法
```js
var server = net.createServer(function (socket) {
    server.close(function () {
        console.log('关闭');
    });
});
```
* Socket对象, 代表被监听的端口对象
```js
var add = socket.address();
add.port;
add.family;
add.address;
// socket对象可以用来读取客户端发送的数据流
server.on('connection', function(socket) {
    socket.setEncoding('utf8');
    socket.on('data', function (data) {
        console.log(data);
        console.log('已接收到%d字节数据', socket.bytesRead);
    });
});
// socket.pipe(destination, [options = {}])
// socket.pause();
// socket.unpipe();   和fs模块联用
```
* TCP客户端
```js
var client = new net.Socket();

client.setEncoding('utf8');
client.connect(8431, 'localhost', function () {
    console.log('已连接到服务器');
    client.write('hello');
    setTimeout(function () {
        client.end('bye');
    }, 10000);
});

client.on('data', function(data) {
    console.log(data);
});
client.on('error', function(err) {
    console.log(err);
    client.destroy();
});
```
* net的类方法
```js
net.isIP(string);
net.isIPv4(string);
net.isIPv6(string);
```
#### UDP based on dgram Module

* 创建服务器和客户端
```js

// type-upd4/upd6
var socket = dgram.createSocket(type, listener);
// in callback function listener, msg-Buffer Object, rinfo
socket.on('message', function(msg, rinfo) {
    console.log(msg);
    console.log(...[rinfo.address, rinfo.family, rinfo.port, rinfo.size]);
});

socket.bind(port, [address], [callback]);  // callback can be put in socket.on('listening', callback);

socket.send(buf, offset, length, port, address, [callback]);

// 完整实例-服务器
var dgram = require('dgram');
var server = dgram.createServer('udp4');
server.on('message', function (msg, rinfo) {
    console.log(`已接收${msg}`);
    console.log(`客户端地址信息为${rinfo}`);
    var buf = new Buffer(`确认信息:${msg}`);
    server.send(buf, 0, buf.length, rinfo.port, rinfo.address);
});

server.on('listening', function () {
    var add = server.address();
    console.log(`服务器开始监听, 地址信息为: ${address}`);
});

server.bind(41234, 'localhost');

// 完整实例-客户端
var dgram = require('dgram');
var client = dgram.createServer('udp4');
var message = new Buffer('hello');
client.send(message, 0, message.length, 41234, 'localhost', function (err, bytes) {
    if (err) {console.log(`发送数据失败,错误信息:${err}`);}
    else {console.log(`已发送${bytes}字节数据`);}
});
client.on('message', function (msg, rinfo) {
    console.log(
        `已收到${msg}
        服务器地址为${rinfo.address}
        服务器所用端口为${rinfo.port}`
    );
});
```
* 其他方法
```js
server.close();
server.unref(); // 允许在  不存在客户端连接时运行UDP服务器的应用程序被正常退出
socket.setTTL(num); // 可经过路由器的数量(Time To Live)
```
* 广播
```js

// server
server.on('message', function (msg) {
    var buf = new Buffer(`已接收${msg}`);
    server.setBroadcast(true);
    
    server.send(buf, 0, buf.length, 41234, '192.168.1.255');
});
server.bind(41234, '192.168.1.100');

// client
client.bind(41235, '192.168.1.102');
```

* 组播
  D类地址:
  + 局部 224.0.0.0-224.0.0.255
  + 预留 224.0.1.0-238.255.255.255
  + 管理权限 239.0.0.0.-239.255.255.255
```js
server.addMembership(multicastAddress, [multicastInterface]);

socket.dropMembership(multicastAddress, [multicastInterface]);

socket.setMulticastTTL(ttl);

socket.setMulticastLoopback(flag);
```

