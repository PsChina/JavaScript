// 元素是否可见检测工具
export function doSomeThingWhenDOMVisible(doms: Element[], threshold: number[], callBack: (target: Element) => any) {
    const io = new IntersectionObserver((entries) => { // 观察者
        entries.forEach((item) => { // entries 是被监听的元素集合它是一个数组
            if (item.intersectionRatio <= 0) return // intersectionRatio 是可见度 如果当前元素不可见就结束该函数。
            const { target } = item
            callBack(target);
        })
    }, {
        threshold, // 添加触发时机数组
    });
    doms.forEach((dom) => {
        io.observe(dom);
    })
}

// 兼容性问题解决方案

// yarn add intersection-observer -S

// import 'intersection-observer';