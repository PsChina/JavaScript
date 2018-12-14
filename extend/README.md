# extend (继承)

如何用 es5 实现继承

```js
Father.prototype = {
    eat:function(){
        console.log(this.name+' eat something.')
    }
}

function Father(name) {
    this.name = name
    this.attr = "father's attr."
}
function Super() {
    this.constructor = Child
}
Super.prototype = Father.prototype
Child.prototype = new Super() // 继承父类的原型方法
Child.prototype.constructor = Child
function Child() {
    Father.apply(this, arguments) // 继承父类的属性
    this.attr = "child's attr"
}
```

测试

```js
var child = new Child('Foo')

console.log(child,child.attr)

console.log(child instanceof Child, child instanceof Father)

child.eat()

console.log(child.newAttr)

Father.prototype.newAttr = '123'

console.log(child.newAttr)

console.log(Child.prototype.constructor === Child)
```

结果

```log
Child { name: 'Foo', attr: 'child\'s attr' } 'child\'s attr'
true true
Foo eat something.
undefined
123
true
```