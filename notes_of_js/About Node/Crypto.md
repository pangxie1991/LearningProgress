## Crypto Module

Node.js 中的Crypto模块封装了OpenSSL类库, 并为每一种加密算法定义了一个类. 

其基础是C语言实现的TLS(Transport Layer Security)和SSL(Secure Socket Layer)协议(其中SSL是TLS的前身)

* `crypto.getCiphers()`返回可用的加密算法
* `crypto.getHashes()`返回可用的散列算法

#### 散列算法

Hash---是一种从任何一种数据中创建小的数字'指纹'的方法. 将数据压缩成摘要, 打乱混合, 重新创造一个叫做散列值的指纹.

* 使用
  
  在node中使用散列算法, 首先需要使用`crypto.createHash(algorithm)`创建一个hash对象. 然后通过Hash对象的update方法创建一个摘要.

* `hash.createHash(data, [input_encoding])`
  
  data可以是字符串或者Buffer对象, 使用字符串作为首参则必须使用第二个参数指定字符串的编码格式.

* `hash.digest([encoding])`
  
  使用digest方法可以返回hash对象的摘要结果, 使用了digest后这个hash对象便不能再更新了.使用可选参数encoding
  ('base64', 'binary', 'hex')时输出字符串, 否则输出Buffer对象.

#### HMAC

HMAC---散列算法和密钥进行结合

* 使用
  
  `crypto.createHMAC(algorithm, key)`其中key需要是pem格式的密钥
  
  同样使用hmac对象的update和digest方法进行更新加密和输出摘要.

#### 公钥加密

公钥加密---HMAC算法时只需要一个私钥, 使用公钥加密技术的时候则需要通过公钥加密数据或者签名, 而使用私钥进行解密或者验证.

有四个和公钥相关的类
* Cipher
* Decipher
* Sign
* Verify

#### 加密

* `crypto.createCipher(algorithm, password);` 其中password为加密时使用的密码, 其格式为一个二进制字符串或者Buffer对象.

* `crypto.createCipheriv(algorithm, password, iv);` 其中iv为初始向量. 同样二进制字符串或者Buffer对象.

* `cipher.update(data, [input_encoding], [output_encoding])`

* `cipher.final([output_encoding]);`

#### 解密

* `crypto.createDecipher(algorithm, password);` 

* `crypto.createDecipheriv(algorithm, password, iv);` 

* `decipher.update(data, [input_encoding], [output_encoding])`

* `decipher.final([output_encoding]);`

#### 签名

* `crypto.createSign(algorithm);`

* `sign.update(data)`

* `sign.sign(private_key, [output_encoding]);`
  
  其中私钥是字符串化的pem格式的key
  (`fs.readFileSync('**.pem').toString('asicii');`)
#### 验证

`crypto.createVerify(algorithm);`

`verify.update(data);`

`verify.verify(object, signature, [signature_format]);`








