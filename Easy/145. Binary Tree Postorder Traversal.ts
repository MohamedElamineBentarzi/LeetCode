/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number;
 *     left: TreeNode | null;
 *     right: TreeNode | null;
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val === undefined ? 0 : val);
 *         this.left = (left === undefined ? null : left);
 *         this.right = (right === undefined ? null : right);
 *     }
 * }
 */

function postorderTraversal(root: TreeNode | null): number[] {
    let output: number[] = [];  

    // Helper function for recursive postorder traversal
    function helper(root: TreeNode | null) {
        if (root === null) return;  // Base case: if the node is null, stop recursion

        // Traverse the left subtree first, if it exists
        if (root.left !== null) helper(root.left);

        // Then traverse the right subtree, if it exists
        if (root.right !== null) helper(root.right);

        // After traversing left and right, add the current node's value to output
        output.push(root.val);
    }

    helper(root);  // Start the recursion from the root node
    return output;  
}
