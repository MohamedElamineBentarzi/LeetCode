function permuteUnique(nums: number[]): number[][] {
    let result: number[][] = [];  // Array to store all unique permutations

    // Helper function to build unique permutations recursively
    // `choice` represents the current permutation being built
    // `rest` represents the remaining elements to choose from
    function helper(choice: number[], rest: number[]) {
        // Base case: If no elements are left, push the current permutation to result
        if (rest.length === 0) {
            result.push(choice);
        } else {
            // Array to track used elements within this recursive level (for handling duplicates)
            let done = Array(21).fill(false); // Range covers indices for -10 to 10

            // Loop over each element in `rest`
            for (let i = 0; i < rest.length; i++) {
                let elem = rest[i];

                // Check if `elem` has already been processed at this recursive level
                if (elem < 0) {
                    // For negative numbers, use index `elem * -1` to mark them as used
                    if (done[elem * -1]) continue;    // Skip if already used
                    done[elem * -1] = true;
                } else {
                    // For non-negative numbers, use index `elem + 10` to mark as used
                    if (done[elem + 10]) continue;    // Skip if already used
                    done[elem + 10] = true;
                }

                // Create the remaining elements for the next recursive call
                let r:number[] = [];
                for (let j = 0; j < rest.length; j++) if (j !== i) r.push(rest[j]);

                // Recur with `elem` added to `choice` and updated `rest`
                helper([...choice, elem], r);
            }
        }
    }

    // Start the recursion with an empty `choice` and the full `nums` array as `rest`
    helper([], nums);
    return result;  
}
