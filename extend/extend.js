Father.prototype = {
    eat:function(){
        console.log(this.name+' eat something.')
    }
}

function Father(name) {
    this.name = name
    this.attr = "father's attr."
}

Child.prototype = Father.prototype // 继承父类的原型方法

function Child() {
    return Father.apply(this, arguments) // 继承父类的属性
}

var child = new Child('Foo')

console.log(child,child.attr)

console.log(child instanceof Child)

child.eat()