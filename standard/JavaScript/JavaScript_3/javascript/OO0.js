/**
 * Created by Fancy on 2015/11/19 0019.
 */

var person={
    name:"fancy",
    age:24,
    eat:function(){
        alert("能吃")
    }
}
person.height = 1.83;
//alert(person.name);
function people(){

}
people.prototype = {
    name:"fancy",
    age:24,
    eat:function(){
        alert("我在吃")
    }
}
var p = new people();
//alert(p.age);
