
// 终止状态
function ok(s) {
    return ['', s]
}

// 构造一个p自动机结点
function cond(p, cb = ok) {
    return function (s) {
        if (s.length === 0) {
            return undefined;
        }
        if (p(s[0])) {
            let res = cb(s.slice(1));
            if (!res) return undefined;
            return [s[0] + res[0], res[1]];
        }
        return undefined;
    }
}

// 如果当前字符串前缀为c，就接受
function char(c, cb = ok) {
    return cond((s) => s === c, cb)
}

// 如果当前字符串前缀是数字，就接受
function digit(cb = ok) {
    return cond((s) => '0' <= s && s <= '9', cb)
}

// 识别 'hello'
let helloParserFac = (next) => char('h', char('e', char('l', char('l', char('o', next)))))
let helloParser = helloParserFac(ok)
let hello2020 = helloParserFac(char(' ', digit(digit(digit(digit())))))

// console.log(char('h')('hello'))
// console.log(helloParser('hello'))
// console.log(helloParser('hello, world'))
// console.log(hello2020('hello 2020'))


function charIsIn(c, cb = ok) {
    return isInCond((s) => s === c, c, cb)
}

function isInCond(p, c, cb = cond) {
    return function (s) {
        if (s.length === 0) {
            return undefined;
        }
        const index = s.indexOf(c);
        if (index > -1) {
            const res = s.slice(index);
            return [s.slice(0, index), ...cond(p, cb)(res)];
        }
    }
}

console.log(charIsIn('w')('Hello world'))


