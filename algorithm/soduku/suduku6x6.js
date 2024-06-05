// 定义解决6x6数独方法
function solveSudoku(board) {
  // 寻找下一个空位
  function findNextEmpty() {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        // 数字 0 表示空位
        if (board[i][j] === 0) {
          // 返回空位所在行列坐标
          return { row: i, col: j };
        }
      }
    }
    return false;
  }
  // 检查在给定位置放置数字是否合法
  function isSafe(row, col, num) {
    // 检查行
    for (let i = 0; i < 6; i++) {
      // 所在行有重复数字 返回 false 不匹配
      if (board[row][i] === num) return false;
    }
    // 检查列
    for (let i = 0; i < 6; i++) {
      // 所在列有重复数字 返回 false 不匹配
      if (board[i][col] === num) return false;
    }
    // 检查2x3宫格
    let startRow = Math.floor(row / 2) * 2; //计算宫格起始行
    let startCol = Math.floor(col / 3) * 3; //计算宫格起始列
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 3; j++) {
        // 所在2x3宫格有重复数字 返回 false 不匹配
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  }
  // 解决数独
  function solve() {
    // 寻找下一个需要填空的空位
    let next = findNextEmpty();
    // 如果没有空位了，说明已经完成
    if (!next) {
      return true; // 解决完成
    }
    // 否则，尝试填入1-6
    for (let num = 1; num <= 6; num++) {
      // 判断 1-6 是否是重复数字
      if (isSafe(next.row, next.col, num)) {
        // 不是重复数字，则填入
        board[next.row][next.col] = num;
        // 判断是否已经填完并且成功
        if (solve()) return true; // 如果成功继续递归
        // 没有完成数独,则把填入的数字置为0(空) 以便重新填入下一个数字
        board[next.row][next.col] = 0; // 回溯
      }
    }
    return false; // 没有解
  }
  // 开启算法
  solve();
}

// 测试用例
let board1 = [
  [0, 0, 0, 2, 0, 6],
  [0, 0, 0, 0, 0, 3],
  [0, 0, 5, 0, 3, 1],
  [6, 3, 0, 4, 0, 0],
  [5, 0, 0, 0, 0, 0],
  [1, 0, 3, 0, 0, 0],
];

let board2 = [
  [5, 0, 6, 0, 2, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 4, 0, 5, 0, 0],
  [0, 0, 5, 0, 1, 4],
  [0, 0, 0, 0, 0, 0],
  [0, 5, 0, 2, 0, 1],
];

// 解决第一题
solveSudoku(board1);
// 打印结果
console.log(board1);

// 解决第二题
solveSudoku(board2);
// 打印结果
console.log(board2);
