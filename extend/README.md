# extend (继承)

如何用 es5 实现继承

```js
Father.prototype = { // 父类原型
    eat:function(){
        console.log(this.name+'eat something.')
    }
}

function Father(name) {
    this.name = name // 父类属性
    this.attr = "father's attr."
}

Child.prototype = Father.prototype // 继承父类的原型方法

function Child() {
    return Father.apply(this, arguments) // 继承父类的属性
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