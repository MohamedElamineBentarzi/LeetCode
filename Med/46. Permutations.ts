function permute(nums: number[]): number[][] {
    let result: number[][] = [];  

    // Helper function to build permutations recursively
    // `choice` represents the current permutation being built
    // `rest` represents the remaining elements to choose from
    function helper(choice: number[], rest: number[]) {
        // Base case: If no elements are left to add, push the current permutation to result
        if (rest.length === 0) {
            result.push(choice);
        } else {
            // Loop over each element in `rest` to generate permutations
            for (let elem of rest) {
                // Recur with `elem` added to `choice` and `rest` excluding `elem`
                helper([...choice, elem], rest.filter(item => item !== elem));
            }
        }
    }

    // Start the recursion with an empty `choice` and the full `nums` array as `rest`
    helper([], nums);
    return result;  
}
