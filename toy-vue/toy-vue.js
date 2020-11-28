export class ToyVue {
    constructor(config) {
        this.template = document.querySelector(config.el)
        this.data = config.data

    }
}

const effects = new Map()

let currentEffect = null

function effect(fn) {
    currentEffect = fn
    fn()
    currentEffect = null
}

function reactive(object) {
    const observed = new Proxy(object, {
        get(object, property) {
            if (!effects.has(object)) {
                effects.set(object, new Map)
            }
            if (!effects.get(object).has(property)) {
                effects.get(object).set(property, new Array)
            }
            effects.get(object).get(property).push(currentEffect)
            return object[property]
        },
        set(object, property, value) {
            object[property] = value
            if (effects.has(object) && effects.get(object).has(property)) {
                for (const effect of effects.get(object).get(property)) {
                    if (effect instanceof Function) {
                        effect()
                    }
                }
            }
            return value
        }
    })
    return observed
}


let dummy, dummy2
const counter = reactive({ num: 0, count: 0 })
effect(() => (dummy = counter.num))
effect(() => (dummy2 = counter.count))
console.log(dummy, dummy2)
counter.num = 7
counter.count = -7
console.log(dummy, dummy2)

