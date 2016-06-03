## Basic

#### 进程和线程
* 进程
  
  工厂的车间, 受限于电力供应同一时间只能运行一个或者多个(单个CPU同一时间只能运行一个进程)
* 线程
  
  车间里的工人(一个进程可以包含多个线程), 可以共享车间里的房间和操作工具(共享内存).
* 互斥锁(Mutual Exclusion)

  有些房间大小有限, 比如厕所隔间, 工人进去后会将隔间锁上, 其他人必须在门口排队等候(多个线程不能同时读写某些内存区域).
* 信号量(Semaphore)
  
  有些房间可以同时容纳多个工人, 比如厨房, 此时会在门口悬挂多把钥匙, 进去一个人就带走一把钥匙作为标记.
  互斥锁是信号量等于1时的特殊情况, 可以被信号量完全替代, 但是使用互斥锁效率比信号量高, 因此在必须保证资源独占的情况下还是使用互斥锁设计.

* tips
  
  CPU调度的是线程, 对于单个CPU而言其实不存在线程共享的内存. 进程的含义为程序的一次执行, 而线程就是CPU进行调度的基本单位. 进程作为
  属于应用程序的模型, 每个进程都用完全一样的虚拟地址空间, 经由操作系统和MMU映射到物理地址上, 不同进程有着各自独立的物理空间.
  
  为了在共享CPU的同时共享内存, 线程作为进程的子模型被提出, 被包裹在进程中, 在调度器的管理下共享CPU, 拥有同样的虚拟地址空间, 同时共享
  同样的物理地址空间.

#### Process in Node.js

Node只支持单线程, 为了应对程序的性能需求, 实现多进程处理, Node提供了child_process模块和cluster模块

* child_process

  开启多个子进程, 并在各个子进程中运行各种不同的命令, 或者执行模块文件, 可执行文件的处理.
* cluster

  开启多个子进程, 每个子进程中运行一个Node.js应用程序副本的处理.
  
## process 对象

#### 属性

* execPath: 执行路径
* version: node版本号
* versions: node及其依赖版本号
* platform: 运行平台(darwin, freebsd, linux, sunos, win32)
* stdin: 可以用于读入标准输入流的对象
* stdout: 可以用于写入标准输出流的对象
```js
process.stdin.resume();
process.on('data', function (chunk) {
    process.stdout.write(`进程收到数据${chunk}`);
});
```
* stderr: 可以用于写入标准错误输出流的对象
* argv: 数组, 包含了运行nodejs应用程序时的命令行参数(argv[0] === 'node')
* env: 对象, 包含了运行node应用程序的操作系统环境信息
* config: 对象, 用于编译当前node应用程序的可执行文件的配置选项的js描述
* pid: pid
* title: 窗口标题
* arch: 处理器架构

#### 方法和事件

* memoryUsage
```js
var obj = process.memoryUsage();
// obj.rss: Node进程的内存消耗量
// obj.heapTotal: V8所分配的内存量
// obj.heapUsed: V8内存消耗量
```
* nextTick(callbak)
```js
process.nextTick(callback);
// 将回调函数放在下一个同步方法执行完毕时执行, 类似await
// 等效于setTimeout(callback, 0), 但是效率更高
```
* 其他方法
```js
process.abort();    // 使进程异常中止
process.chdir(path);    // 改变工作目录
var path = process.cwd();   // 返回当前工作目录
process.exit([num]);  // 退出当前进程, 默认为0, 代表正常退出.
process.getgid();   // 返回进程的组ID, 仅在非windows系统有效
process.setgid();
process.getuid();   // 返回进程的用户ID, 仅在非win系统有效
process.setuid();
process.getgroup(); // 返回进程所有附属组ID构成的数字
process.setgroup();
process.initgroup(user, extra_group);   // 使一个用户的所有归属组来初始化组列表
process.kill(pid, [signal]);    // 默认信号为'SIGTERM'表示中止进程
process.umask([mask]);  // 用于修改进程的文件权限掩码
process.uptime();   // 返回当前运行时间, 以秒为单位.
process.hrtime();   // 测试一个代码段的运行事件, 单位是秒, 精度为毫秒. 需要两次执行
```
* Event
```js
process.on('exit', callback);
process.on('uncaughtExeption', callback);
process.on(signal, callback);
```
## 创建多进程

#### spawn

`child_process.spawn(command, [args], [options])`

* command: 字符串, 用于指定需要运行的命令
* args: 数组, 运行该命令时需要添加的参数
* options: 对象, 指定开启子进程时使用的选项.
  + cwd: 子进程当前工作目录
  + stdio: 字符串或者三元素数组, 设定子进程标准输入输出错误输出.
    - 'pipe': 创建管道, 可以在父进程通过ChildProcess.stdio[0~2]来访问到子进程的IO
    - 'ipc': IPC通道, 使用send方法和message事件
    - 'ignore': 不为子进程设置文件描述符
    - Stream对象: 父进程和子进程共享一个终端设备/文件/端口/管道
    - 正整数: 指定父进程中被打开的文件描述符
    - null/undefined: 使用默认值
  + customFds: 不推荐使用, 数组, 用来为子进程指定文件描述符
  + env: 对象, 用键值对为子进程指定环境变量. 子进程并不会继承父进程的process.env
  + detached: 布尔值, 默认为false, 表示子进程会随父进程一起被关闭
  + uid
  + gid

* spawn返回一个隐式创建的代表子进程的ChildProcess对象, 和process对象一样拥有各类属性和事件

* 实例
```js
var cp = require('child_process');
var sp1 = cp.spawn('node', ['test1.js', 'one', 'two', 'three'], {
    cwd: './test'
});
var sp2 = cp.spawn('node', ['test2.js'], {stdio: 'pipe'});
sp1.stdout.on('data', function (data) {
    console.log(`子进程输出:${data}`);
    sp2.stdin.write(data);
});
sp1.on('exit', function(code, signal) {
    console.log(`子进程退出, 退出代码为:${code}`);
    process.exit();
});
```
#### fork

`cp.fork(modulePath, [args], [options])`

* options
  + cwd
  + env
  + encoding: 标准输出和标准错误输出的编码格式
  + silent: 默认为false, 则父子进程共享标准输出输出
* fork方法返回一个隐式创建的ChildProcess对象.
* fork创建的子进程在输出输出执行完毕后不会自动退出, 需要显示使用`process.exit()`
* 使用fork方法创建的父子进程可以使用send方法想对方发送信息, 可以使用message事件进行监听.
* 进程共享http服务器
```js
// *
// server.js
// --------------------------------------------------------------------------------
var http = require('http');
var cp = require('child_process');
var fs = require('fs');
var child = cp.fork('./child.js');
var server = net.createServer();
server.listen(1337, '127.0.0.1', function() {
    child.send('server', server);
    console.log('父进程中的服务器已经创建');
    
    var httpServer = http.createServer();
    httpServer.on('request', function (req, res) {
        if (req.url !== './favicon.ico') {        
            var sum = 0;
            for (var i = 0; i < 100000; i++) {
                sum += i;
            }
            res.write('客户端的请求被在父进程中处理');
            res.end(`sum = ${sum}`);
        }
    });
    httpServer.listen(server);
});
// *
// child.js
// --------------------------------------------------------------------------------
var http = require('http');
process.on('message', function(msg, server) {
    if (msg === 'message') {        
        console.log('子进程服务器正在创建');
        var httpServer = http.createServer();
        httpServer.on('request', function(req, res) {
            if (req.url !== './favicon.ico') {        
                var sum = 0;
                for (var i = 0; i < 100000; i++) {
                sum += i;
                }
                res.write('客户端的请求被在父进程中处理');
                res.end(`sum = ${sum}`);
            }
        });
        httpServer.listen(server);
    }
});
// *
// client.js
// --------------------------------------------------------------------------------
var http = require('http');
var ops = {
    hostname: 'localhost',
    port: 1337,
    path: '/',
    method: 'GET'
};
for (var i = 0; i < 10; i++) {
    var req = http.request(ops, function(res) {
        res.on('message', function(chunk) {
            console.log(`响应内容:${chunk}`);
        });
    });
    req.end();
}
```
* 共享socket端口对象
```js
// *
// server.js
// --------------------------------------------------------------------------------
server.on('connection', function(socket) {
    if (socket.remoteAddress !== '192.168.1.100') {        
        child.send('socket', socket);
        return;
    }
    socket.end('客户端请求被父进程处理')
});
// *
// client.js
// --------------------------------------------------------------------------------
process.on('message', function(msg, socket) {
    if (msg ==='socket') {        
        socket.end('客户端请求被子进程处理')
    }
});
// *
// client.js
// --------------------------------------------------------------------------------
client.setEncoding('utf8');
client.connect(42376, '192.168.1.100');
client.on('data', function(data) {
    console.log(data);
});
```
#### exec方法开启子进程

`child_process.exec(command, [options], [callback]);`

* options-object
  + cwd
  + env
  + encoding
  + timeout
  + maxbuffer: 指定用于缓存标准输出的缓存区的最大长度
  + killSignal: 指定关闭子进程的信号, 默认为'SIGTERM';

* 和spawn的区别
  
  spawn可以在父进程中实时的接收子进程的输出, 而exec必须等子进程的输出全部缓存完毕之后才能接收. 一个异步一个同步

* 实例
```js
// *
// main.js
// --------------------------------------------------------------------------------
var cp = require('child_process');
var sp1 = cp.exec('node test1.js one two three four', {cwd: './test'}, function (err, stdout, stderr) {
    if (err) {        
        console.log(`子进程开启失败, 错误信息:${err}`);
        process.exit();
    } else {
        console.log(`子进程标准输出: ${stdout.toString()}`);
        sp2.stdin.write(stdout.toString());
    }
});
var sp2 = cp.exec('node test2.js', function (err, stdout, stderr) {
    process.exit();
});
```
#### execFile创建子进程

`child_process.execFile(file, [args], [options], [callback]);`

## 多子进程的Node程序(cluster)

#### fork方法创建worker对象

`cluster.fork([env]);`

* cluster的fork方法返回一个worker对象, 代表使用fork方法开启的子进程中运行的node应用程序实例对象.
* 主从鉴别方法, `cluster.isMaster()`和`cluster.isWorker()`
* 实例
```js
var cluster = require('cluster');
var http = require('http');
if (cluster.isMaster) {        
    cluster.fork();
    console.log('这段代码被运行在主进程中');
} else {
    http.createServer(function (req, res) {
        if (req.url !== '/favicon.ico') {        
            res.writeHead(200, {'ContentType': 'text/html'});
            res.write('<head><meta charset = "utf-8"/></head>');
            res.end('hello\n');
            console.log('这段代码被运行在子进程中');
        }
    }).listen(1337);
}
```
* 事件监听
```js
cluster.on('fork', function (worker) {
    console.log(`子进程${worker.id}正在开启`);
});
cluster.on('online', function(work) {
    console.log(`子进程${worker.id}已经上线`);
});
cluster.on('listening', function(worker, address) {
    // address.address 子进程中服务监听的地址
    // address.port
    // address.addressType(4/6) 子进程监听的地址类型
});
```
* setupMaster
  
  子进程中的node应用程序默认运行正在运行的node程序中的主模版文件, 可以使用setupMaster方法修改子进程中运行的模块文件, 或者修改子进程中
  运行的应用程序的其他默认行为.
  
  参数setting为一个对象, 包含以下属性
  + exec: 子进程运行模版文件的完整路径和文件名
  + args: 运行参数, 使用字符串数组作为格式
  + silent: 默认false, 此时子进程和父进程共享标准输入输出
```js
cluster.setupMaster([settings]);

var cluster = require('cluster');
cluster.setupMaster({exec: './child.js'});
cluster.fork();
```
#### worker对象

worker对象是在主程序中被cluster模块的fork方法返回的对象.

* 主进程向子进程发送信息

  `worker.send(message, [sendHandle]);` 
* 子进程向主进程发送信息

  `process.send(message, [sendHandle]);`
* worker对象有一系列和cluster对象一样的事件, 包括listening和online, 另外自己还有exit等事件
* worker独有`kill(signal)`和`worker.disconnect()`方法






















