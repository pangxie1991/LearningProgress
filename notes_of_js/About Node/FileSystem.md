## fs_Module of Node.js

#### method & syncMethod

fs Module of Node.js has regular(async) method and sync method.

#### methods about read and write
* ```js
  // 对文件的完全读写
  fs.readFile(path, [options = {}], callback);
  ```
* ```js
  // 对文件的写入
  fs.writeFile(path, data, [options = {}], callback);
  ```
* ```js
  // 将一个字符串或者缓存区中的数据追加到文件底部
  fs.appendFile(path, data, [options = {}], callback);
  ```
* ```js
  // 从指定位置开始读写文件, 回调函数中的fd是文件描述符(文件句柄-win)
  fs.open(path, flags, mode, function (err, fd) {
      ;
  });
  ```
* ```js
  // 从文件指定位置读取文件, fd是open返回的文件描述符, buffer指定缓存区, offset指定缓存区起点, length表示读取的长度, position
  // 用于指定开始读取的位置.
  fs.read(fd, buffer, offset, length, position, callback);
  ```
* ```js
  // 从文件指定位置写入文件, fd是open返回的文件描述符, buffer指定缓存区, offset指定缓存区起点, length表示读取的长度, position
  // 用于指定开始读取的位置.
  fs.write(fd, buffer, offset, length, position, callback);
  ```
* ```js
  // 关闭打开的文件
  fs.close(fd, callback);
  ```
####methods about folder
* ```js

  ```