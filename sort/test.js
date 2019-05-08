var insertionSort = require('./insertionSort.js')
var assert = require('assert') // 引入摩卡测试 equal 函数所在的包 assert
describe('insertionSort([1,3,2])',function(){ // 描述 函数排序 [1,3,2]
    it('should return [1,2,3]',function(){ // 应该返回 [1,2,3]
        assert.deepEqual( insertionSort([1,3,2]), [1,2,3]) // 第一个参数的返回值应该等于第二个参数
    })
})
describe('insertionSort([-1,-3,-2])',function(){
    it('should return [-3,-2,-1]',function(){
        assert.deepEqual( insertionSort([-1,-3,-2]), [-3,-2,-1] )
    })
})
describe('insertionSort([0.1,-0.1,0])',function(){
    it('should return [-0.1,0,0.1]',function(){
        assert.deepEqual( insertionSort([0.1,-0.1,0]), [-0.1,0,0.1] )
    })
})
describe('insertionSort([3,2,1,11,22,33,-33,-22,-11,-3,-4,-5,3.3,1.1,1.01,3,2,1])',function(){
    it('should return [-33, -22, -11, -5, -4, -3, 1, 1, 1.01, 1.1, 2, 2, 3, 3, 3.3, 11, 22, 33]',function(){
        assert.deepEqual( insertionSort([3,2,1,11,22,33,-33,-22,-11,-3,-4,-5,3.3,1.1,1.01,3,2,1]), [-33, -22, -11, -5, -4, -3, 1, 1, 1.01, 1.1, 2, 2, 3, 3, 3.3, 11, 22, 33] )
    })
})