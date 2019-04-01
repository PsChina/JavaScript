
/**
 * @function newtonMethod 该函数是牛顿迭代法的js实现他可以用于求任意一元高次方程的解。（简单版）
 * @param fn 要求根的函数
 * @param dfn 要求根的函数的导函数
 * @param x0 在函数x定义域上任意取的一个x值x0
 * @param n 期望迭代的次数
 * @return 该方程的近似解
 * */

function newtonMethod(fn, dfn, x0, n){
    let x1
    const y = fn(x0)    // 在函数有效区间内选取任意 x0 求出点 (x0,y) 其中  y= fn(x0)
    const k = dfn(x0)   // 使用导函数求出过 点(x0,y) 的切线斜率 k
    const b = y - k*x0  // 将点(x0,y) 代入直线方程 y=kx+b 求出常数 b 。
    x1 = (0-b) / k      // 将 y=0代入直线方程 y=kx+b 求出该方程的一次近似解 x1
    if(n>0){
        return newtonMethod(fn,dfn,x1,--n) // 当n趋于无穷大时得到该方程的精确解
    }
    return x1
}

// 例

// 如要求 fn(x) = x*x -2 的根

// 那么参数依次是

// 函数 fn(x) = x*x -2

// 导函数 dfn(x) = 2*x

// 在定义域 R 中取 x0 为 -5 和 5

// 期望迭代次数 10 次

// 调用函数

// newtonMethod( x => x*x - 2, x => 2*x, -5, 10 )

// => -1.414213562373095

// newtonMethod( x => x*x - 2, x => 2*x, 5, 10 )

// => 1.414213562373095

