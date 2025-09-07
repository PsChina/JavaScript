// 可无限次买卖

function maxProfit(prices) {
    const dp = Array(prices.length).fill([0, 0]); // [持有，不持有] 的收益
    dp[0][0] = -prices[0]; // 第一天持有股票
    dp[0][1] = 0; // 第一天不持有股票
    for (let i = 1; i < n; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] - prices[i]); // 持有股票
        dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + prices[i]); // 不持有股票
    }
    return dp[n - 1][1]; // 最后一天不持有股票的最大收益
}