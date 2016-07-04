### Retrieval

`.name`
`[expression(string)]`

### Update

通过赋值语句进行更新

### Reference

通过引用来传递, 不会被复制

### Prototype

原型链, 终点为Object.prototype, 主要用来检索值, 通过委托层层搜索, 直到找到为止, 如果一直没有发现, 返回undefined

### Reflection

`typeof`

`instanceof` 

`hasOwnProperty()`

### Enumeration

```js
var Test = {
    //******
};

for (var name in Test) {
    if (Test.hasOwnProperty(name)) {        
        console.log(name);
    }
}
```
### Delete

`delete Test.name`

### Global Abatement

最小化全局变量

闭包

