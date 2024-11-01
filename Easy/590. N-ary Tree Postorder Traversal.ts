/**
 * Definition for a Node.
 * class _Node {
 *     val: number;
 *     children: _Node[];
 *     constructor(val?: number) {
 *         this.val = (val === undefined ? 0 : val);
 *         this.children = [];
 *     }
 * }
 */

function postorder(root: _Node | null): number[] {
    let output: number[] = [];  

    // Helper function for recursive postorder traversal
    function helper(root: _Node | null) {
        if (root === null) return;  // Base case: if the node is null, stop recursion

        // Recur on each child node
        for (let child of root.children) {
            if (child !== null) helper(child);  // Recur on non-null children
        }

        // After processing all children, add the current node's value to output (post order)
        output.push(root.val);
    }

    helper(root);  // Start the recursion from the root node
    return output;  
}
