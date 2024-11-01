function strangePrinter(s: string): number {
    const length = s.length;
    // Initialize a 2D DP array where dp[i][j] represents the minimum number of turns to print the substring s[i:j+1]
    const dp: number[][] = new Array(length).fill(0).map(() => new Array(length).fill(Infinity));


    for (let i = length - 1; i >= 0; --i) {
        dp[i][i] = 1;

        for (let j = i + 1; j < length; ++j) {

            // If characters at the start and end are the same, we can merge them in one printing turn
            if (s[i] === s[j]) {
                dp[i][j] = dp[i][j - 1];
            } else {
                // Otherwise, calculate the minimum turns by splitting the substring at every possible position k
                // and taking the sum of minimum turns needed for the two resulting subproblems
                for (let k = i; k < j; ++k) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j]);
                }
            }
        }
    }

    // dp[0][length - 1] contains the minimum turns needed to print the entire string
    return dp[0][length - 1];
}
