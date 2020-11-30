export class ToyVue {
    constructor(config) {
        this.template = document.querySelector(config.el)
        this.data = reactive(config.data)
        this.methods = {}
        for (let method in config.methods) {
            this.methods[method] = (...rest) => {
                config.methods[method].apply(this.data, rest)
            }
        }
        this.traversal(this.template)
    }
    traversal(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.trim().match(/^{{([\s\S]+)}}$/)) {
                let name = RegExp.$1.trim()
                effect(() => node.textContent = this.data[name])
            }
        }
        if (node.nodeType === Node.ELEMENT_NODE) {
            let attributes = node.attributes;
            for (const attribute of attributes) {
                const { name: attributeName } = attribute
                if (attributeName === 'v-model') {
                    effect(() => node.value = this.data[attribute.value])
                    node.addEventListener('input', (event) => {
                        this.data[attribute.value] = event.target.value
                    })
                }
                if (attributeName.match(/^v-bind:([\s\S]+)$/)) {
                    const attrName = RegExp.$1
                    const name = attribute.value
                    effect(() => node.setAttribute(attrName, this.data[name]))
                }
                if (attributeName.match(/^v-on:([\s\S]+)$/)) {
                    const eventName = RegExp.$1
                    const name = attribute.value
                    effect(() => node.addEventListener(eventName, this.methods[name]))
                }
            }
        }
        if (node.childNodes && node.childNodes.length) {
            for (let childNode of node.childNodes) {
                this.traversal(childNode)
            }
        }
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

