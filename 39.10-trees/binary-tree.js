/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth(node=this.root) {
    if (!node) return 0; // if no node, then min depth is 0
    if (!node.left && !node.right) return 1; // if leaf, start count upwards
    return 1 + Math.min(this.minDepth(node?.left), this.minDepth(node?.right))
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth(node=this.root) {
    if (!node) return 0; // if no node, then max depth is 0
    if (!node.left && !node.right) return 1; // if leaf, start count upwards
    return 1 + Math.max(this.maxDepth(node?.left), this.maxDepth(node?.right))
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum(node=this.root, max=0) {

    function generateMax(node) {
      if (!node) return 0; // if no node, then val is 0
      const leftSum = generateMax(node.left) // check left path
      const rightSum = generateMax(node.right) // check right path
      const curMax = node.val + leftSum + rightSum // get current path value
      max = curMax > max ? curMax : max; // check if current path is better than max
      return node.val + Math.max(leftSum, rightSum) // help parent by returning path with most value
    }

    let maxPath = generateMax(node);

    return max
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound, node=this.root, nextLargest=null) {

    function findNextLarger(node) {
      if (!node) return; // base case
      if (node.val > lowerBound) { // handles changing nextLargest upon desired criteria
        if (!nextLargest) {
          nextLargest = node.val
        } else {
          nextLargest = nextLargest < node.val ? nextLargest : node.val;
        }
      }
      findNextLarger(node.left)
      findNextLarger(node.right)
    }

    findNextLarger(node);
    return nextLargest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    
    function findDepth(target, node, depth=0) {
      if (!node) return -1; // if no node, then don't start the count
      if (node == target) return depth; // if target, start upwards count

      const leftDepth = findDepth(target, node.left, depth+1);
      const rightDepth = findDepth(target, node.right, depth+1);

      return Math.max(leftDepth, rightDepth)
    }

    // are they siblings?
    function areSiblings(curr, node1, node2) {
      if (!curr) return false;
      if (!curr.left || !curr.right) return false;
      return (
        (curr.left == node1 && curr.right == node2) ||
        (curr.right == node1 && curr.left == node2) ||
        areSiblings(curr.left, node1, node2) || 
        areSiblings(curr.right, node1, node2)
      )
    }

    let n1Depth = findDepth(node1, this.root);
    let n2Depth = findDepth(node2, this.root);
    if (n1Depth == n2Depth) {
      return !areSiblings(this.root, node1, node2);
    }
    return false;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {
    
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {

  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
