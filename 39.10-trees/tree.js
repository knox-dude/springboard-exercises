/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */

  sumValues() {

    // function that recursively adds all of the values
    function recursiveSum(node) {
      if (!node) return 0;
      let sum = 0;
      for (let child of node.children) {
        sum += recursiveSum(child);
      }
      return node.val + sum;
    }

    return recursiveSum(this.root);
  }

  /** countEvens(): count all of the nodes in the tree with even values. */

  countEvens() {

    // function that recursively counts the number of nodes with val % 2 === 0
    function recursiveEvenCount(node) {
      if (!node) return 0;
      let count = 0;
      for (let child of node.children) {
        count += recursiveEvenCount(child);
      }
      if (node.val % 2 === 0) {
        return count + 1;
      } else {
        return count;
      }
    }

    return recursiveEvenCount(this.root);
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

  numGreater(lowerBound) {

    // function that recursively counts the number of nodes with val > lowerBound
    function recursiveNumGreater(node) {
      if (!node) return 0;
      let count = 0;
      for (let child of node.children) {
        count += recursiveNumGreater(child);
      }
      if (node.val > lowerBound) {
        return count + 1;
      } else {
        return count;
      }
    }

    return recursiveNumGreater(this.root);
  }
}

module.exports = { Tree, TreeNode };
