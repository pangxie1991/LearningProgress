## fs_Module of Node.js

#### method & syncMethod

fs Module of Node.js has regular(async) method and sync method.

#### methods about read and write
* 对文件的完全读写
```js
fs.readFile(path, [options = {}], callback);
```
* 对文件的写入
```js
fs.writeFile(path, data, [options = {}], callback);
```
* 将一个字符串或者缓存区中的数据追加到文件底部
```js
fs.appendFile(path, data, [options = {}], callback);
```
* 从指定位置开始读写文件, 回调函数中的fd是文件描述符(文件句柄-win)
```js
fs.open(path, flags, mode, function (err, fd) {
    ;
});
```
* 从文件指定位置读取文件
```js
// fd是open返回的文件描述符, buffer指定缓存区, offset指定缓存区起点, length表示读取的长度, position用于指定开始读取的位置.
fs.read(fd, buffer, offset, length, position, callback);
```
* 从文件指定位置写入文件
```js
fs.write(fd, buffer, offset, length, position, callback);
```
* 关闭打开的文件
```js
fs.close(fd, callback);
```


####methods about folder

* 创建文件夹
```js
// mode is using to set the competence for the folder
fs.mkdir(path, mode, callback);
```
* 读取文件夹
```js
fs.readdir(path, [options], callback);
```
* 文件状态
```js
fs.stat(path, callback);
fs.lstat(path, callback);
fs.fstat(fd, callback);
```
* 文件是否存在
```js
fs.exists(path, callback);
```
* 获取文件路径
```js
fs.realpath(path, [options], callback);
```
* 修改文件的访问和修改时间
```js
// atime-访问时间, mtime-修改时间
fs.utimes(path, atime, mtime, callback);
```
* 修改文件权限
```js
fs.chmod(path, mode, callback);
fs.fchmod(fd, mode, callback);
```
* 重命名
```js
fs.rename(oldPath, newPath, callback);
```
* 硬链接
```js
fs.link(srcpath, dspath, callback);
fs.unlink(path, callback);
```
* 符号链接
```js
fs.symlink(target, path, [type], callback);
```
* 文件分割
```js
fs.truncate(path, len, callback);
fs.ftruncate(fd, len, callback);
```
* 删除空文件夹
```js
fs.rmdir(path, callback);
```
* 监控文件
```js
fs.watchFile(filename, [options = {}], callback);
fs.watch(filename, [options = {}], [listener]);
```
#### Node.js Stream

* 创建文件流
```js
fs.createReadStream(path, [options = {}]);
var fs = require('fs');
var file = fs.createReadStream('./test.txt', {start:3, end:12});
file.on('open', function(fd) {
    console.log('开始读取文件');
});
file.on('close', function() {
    console.log('文件被关闭');
});
// ....
```
* 流数据写入
```js
fs.createWriteStream(path, [options = {}]);
var fs = require('fs');
var file = fs.createReadStream('./test.txt');
var target = fs.createWriteStream('./anotherTest.txt');
file.pipe(target);
```
## path Module of Node.js

#### methods

* 标准化
  + 解析'..'和'.'
  + 将多个'/'和'\'转换成一个
  + 将win的反斜杠转换成正斜杠
  + 如果路径以斜杠结尾, 斜杠会被保留.

```js
path.normalize(p);
```

* 结合拼接
```js
path.join(root, path);
```
* 以程序根目录为起点, 结合参数输出绝对路径
```js
path.resolve(path, [String]);	// 注意不需要输入root
```
* 获取路径之间的相对关系
```js
path.relative(from, to);	// 获得相对源目录的相对路径
```
* 获得路径中的目录名
```js
path.dirname(p);
```
* 获取路径中的文件名(一般是末尾)
```js
path.basename(p, [ext]);
```
* 获取路径中的扩展名
```js
path.extname(p);
```
* 根据OS获得不同文件分隔符
```js
path.sep 	// win-'\\', unix-'/'
```
* 根据OS不同的路径分隔符
```js
path.delimiter 	// win-';', unix-':'
```




















