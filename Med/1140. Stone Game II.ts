function stoneGameII(piles: number[]): number {
    const pileCount = piles.length;

    // Memoization table to store results of subproblems
    const memoTable = Array.from({ length: pileCount }, () => new Array(pileCount + 1).fill(0));

    // Prefix sum array to quickly calculate the sum of piles from index i to j
    const prefixSum = new Array(pileCount + 1).fill(0);
    for (let i = 0; i < pileCount; ++i) {
        prefixSum[i + 1] = prefixSum[i] + piles[i]; // Building the prefix sum
    }

    // DFS function to compute the maximum stones that can be taken
    const dfs = (currentIndex: number, currentM: number): number => {
        // If the current player can take all remaining stones
        if (currentM * 2 >= pileCount - currentIndex) {
            return prefixSum[pileCount] - prefixSum[currentIndex]; // Return the total stones left
        }

        // Check if the result is already computed and stored in memoTable
        if (memoTable[currentIndex][currentM]) {
            return memoTable[currentIndex][currentM];
        }
      
        let maxStones = 0; // Variable to keep track of the maximum stones that can be collected

        // Explore all options for x (number of piles the current player can take)
        for (let x = 1; x <= currentM * 2; ++x) {
            // Calculate the maximum stones by considering all possible moves
            maxStones = Math.max(maxStones, 
                prefixSum[pileCount] - prefixSum[currentIndex] - // Stones taken by the opponent
                dfs(currentIndex + x, Math.max(currentM, x)) // Recursive call for the next state
            );
        }

        memoTable[currentIndex][currentM] = maxStones; // Store the result in the memo table
        return maxStones; // Return the computed maximum stones
    };
  
    // Start DFS from the beginning with initial M as 1
    return dfs(0, 1);
}
