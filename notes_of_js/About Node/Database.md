## MongoDB

使用BSON(Binary json)对象存储数据的非阻塞数据库. 面向文档.

#### 创建服务器

`var server = new mongo.Server(host = String, port = int, [options = {}]);`

options: 
* ssl: 
  
  默认false, 为true时和数据库建立一个基于ssl安全协议的连接
* sslValidate: 
  
  指定服务器是否验证客户端提供的证书
* sslCA: 
  
  数组, 元素为Buffer对象或者字符串, 指定一组供服务器验证的证书
* sslCert: 
  
  单个Buffer或者字符串, 证书
* sslKey: 
  
  单个Buffer或者字符串, 私钥
* sslPass: 
  
  同上, 证书密码
* poolSize: 
  
  连接池中最大连接数量, 默认为5
* socketOptions: 
  
  默认为null, 用于指定于服务器建立连接的端口使用的选项
  + keepAlive: 
    
    int, 单位是毫秒, 指定客户端多久发送一次keepAlive探测包
  + connectTimeoutMS: 
    
    int 毫秒, 字面意思
  + SocketTimeoutMS: 
    
    int 毫秒, 字面意思
* logger: 
  
  用于记录日志的对象, 默认为null
* auto_reconnect: 
  
  布尔值, 字面意思
* disableDriverBSONSizeCheck: 
  
  布尔值, 字面意思

#### 创建数据库

`var db = [new] mongo.Db(databaseName, server, [options]);`

options: 
+ w: 
  
  大于-1的整数或者字符串, 用于设置写操作时的write concern机制, -1表示失败, 其余表示成功.
+ wtimeout: 
  
  写操作超时时间
+ fsync: 
  
  默认false, 为true时写数据时执行fsync(剩余被挂起的数据全部写入).
+ journal: 
  
  默认false, 为true时写入时指定journal(写入执行日志).
+ native_parser: 
  
  默认false, 是否使用C++ BSON解析器
+ forceServerObjectId: 
  
  默认false, 指定是否在服务器端创建BSON对象的id
+ pkFactory: 
  
  对象, 该对象重载数据库内部生成的对象id主键
+ serializeFunctions: 
  
  默认false, 是否在数据库内部序列化js函数
+ raw: 默认false, 
  
  是否在数据库内部使用二进制BSON缓存区来执行数据的存取操作
+ recordQueryState: 
  
  默认false, 是否在数据库内部执行查询统计
+ retryMiliSeconds:
  
  操作失败的重试间隔
+ numberOfRetries:
  
  重试次数
+ logger: 
  
  记录日志的对象, 默认为null
+ slaveOK:
  
  设置数据库内部使用的对应值, 只在需要显示的连接到一个从属服务器时有效
+ safe: 
  
  默认false, 为true使用getLastError命令执行存取操作, 返回执行结果.

#### 连接和关闭

`db.open()` 返回一个Promise, 可以在括号里使用callback也可以在后面使用`.then()`

`db.close([forceClose], [callback]);`

#### Collection对象

mongoDB的数据存储在数据集合(collection)中, 就好像关系型数据库数据存在数据表里一样. 

使用的方法为`db.collection(collectionName, [options], [callback]);` 这个方法返回对应的Collection对象

options:
* w
* wtimeout
* fsync
* journal
* pkFactory
* serializeFunctions
* raw
* safe
* strict: 布尔值, 默认false, 当访问的集合不存在时是否抛出一个错误

#### 插入

`collection.insert(docs, [options], [callback]);`

options: 
* w
* wtimeout
* fsync
* journal
* serializeFunctions
* forceServerObjectId
* safe
* checkKeys: 默认为true, 指定在插入操作时是否在数据库中检查该数据文档的主键值已经存在的处理
* continueOnError(keepGoing): 默认false, 插入一组文档时如果有一个失败是否继续






