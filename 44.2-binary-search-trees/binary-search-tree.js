class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let current = this.root;
    let newNode = new Node(val);
    if (!current) {
      this.root = newNode;
      return this;
    }

    while (current) {
      if (current.val > val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current=this.root) {
    let newNode = new Node(val);
    if (!current) {
      this.root = newNode;
      return this;
    }

    if (val > current.val) {
      if (!current.right) {
        current.right = newNode;
        return this;
      } else {
        return this.insertRecursively(val, current.right);
      }
    } else {
      if (!current.left) {
        current.left = newNode;
        return this;
      } else {
        return this.insertRecursively(val, current.left);
      }
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {

    let current = this.root;

    while (current) {
      if (current.val === val) {
        return current;
      }
      if (val > current.val) {
        current = current.right;
      } else {
        current = current.left;
      }
    }

  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current=this.root) {
    if (!current) {
      return;
    }
    if (val === current.val) {
      return current
    } else if (val > current.val) {
      return this.findRecursively(val, current.right);
    } else {
      return this.findRecursively(val, current.left);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(visited=[], current=this.root) {
    if (!current) {
      return visited;
    }

    visited.push(current.val);

    if (current.left) {
      visited = this.dfsPreOrder(visited, current.left);
    }

    if (current.right) {
      visited = this.dfsPreOrder(visited, current.right);
    }

    return visited
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(visited=[], current=this.root) {
    if (!current) {
      return visited;
    }

    if (current.left) visited = this.dfsInOrder(visited, current.left);

    visited.push(current.val);

    if (current.right) visited = this.dfsInOrder(visited, current.right);

    return visited;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(visited=[], current=this.root) {
    if (!current) {
      return visited;
    }

    if (current.left) visited = this.dfsPostOrder(visited, current.left);

    if (current.right) visited = this.dfsPostOrder(visited, current.right);

    visited.push(current.val);

    return visited;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs(visited=[], toVisit=[]) {
    let visitedSet = new Set();

    toVisit.push(this.root);

    while (toVisit.length > 0) {
      let current = toVisit.shift()
  
      if (!visitedSet.has(current.val)) {
        visited.push(current.val);
        visitedSet.add(current.val);
        let {left, right} = current;
        if (left && !visitedSet.has(left.val)) toVisit.push(left);
        if (right && !visitedSet.has(right.val)) toVisit.push(right);
      }
    }
    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    this.root = this.removeRecursive(val, this.root);
  }

  /** Recursive method that replaces the node to remove with null */

  removeRecursive(val, current) {
    if (current === null) {
      return current;
    }

    if (val < current.val) {
      current.left = this.removeRecursive(val, current.left);
    } else if (val > current.val) {
      current.right = this.removeRecursive(val, current.right);
    } 
    else { // node found

      // 0 or 1 children (easy)
      if (current.left === null) {
        return current.right;
      } else if (current.right === null) {
        return current.left;
      } 
      else { // 2 children - find smallest child of right
        current.val = this.findMinVal(current.right);
        current.right = this.removeRecursive(current.val, current.right);
      }
    }

    return current;
  }

  /** Helper method for when remove has 2 children */

  findMinVal(current) {
    let minVal = current.val;
    while (current.left) {
      minVal = current.left.val;
      current = current.left;
    }
    return minVal;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(current=this.root) {
    if (!current) return;
    return maxDepth(current) - minDepth(current) <= 1;

    function maxDepth(current) {
      if (!current) return 0;
      return 1 + Math.max(maxDepth(current.left), maxDepth(current.right));
    }

    function minDepth(current) {
      if (!current) return 0;
      return 1 + Math.min(minDepth(current.left), minDepth(current.right));
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(current = this.root) {
    if (!current || (!current.left && !current.right)) return;

    if (current.left && !current.right) {
      return this.findSecondHighest(current.left);
    }

    if (current.right && (!current.right.left && !current.right.right)) {
      return current.val;
    }
    current = current.right;
  }
}

// let binarySearchTree = new BinarySearchTree();
// binarySearchTree.insert(15).insert(10);

module.exports = BinarySearchTree;