class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    for (let node of this.nodes) {
      if (node == v1) {
        node.adjacent.add(v2);
      }
      if (node == v2) {
        node.adjacent.add(v1);
      }
    }
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    for (let node of this.nodes) {
      if (node == v1) {
        node.adjacent.delete(v2);
      }
      if (node == v2) {
        node.adjacent.delete(v1);
      }
    }
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node !== vertex) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let seen = new Set();
    let dfsList = [];
    let stack = [start];

    while (stack.length > 0) {
      let current = stack.pop();

      if (seen.has(current)) {
        continue;
      }

      dfsList.push(current.value);
      seen.add(current);

      for (let adjNode of current.adjacent) {
        if (!seen.has(adjNode) && !stack.includes(adjNode)) { 
          stack.push(adjNode);
        }
      }
    }
    return dfsList;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let seen = new Set();
    let bfsList = [];
    let queue = [start];

    while (queue.length > 0) {
      let current = queue.shift();

      if (seen.has(current)) {
        continue;
      }

      bfsList.push(current.value);
      seen.add(current);

      for (let adjNode of current.adjacent) {
        if (!seen.has(adjNode)) {
          queue.push(adjNode);
        }
      }
    }
    return bfsList;
  }

  /** Finds the shortest path from source node to target using BFS */

  findShortestPath(source, target) {
    let parent = new Map();
    let queue = [source];
    let visited = new Set();
    visited.add(source);
  
    while (queue.length !== 0) {
      let current = queue.shift();
  
      if (current == target) {
        return this._getPath(parent, current, source);
      }
  
      for (let adj of current.adjacent) {
        if (visited.has(adj)) continue;
        queue.push(adj);
        parent.set(adj, current);
        visited.add(adj);
      }
  
    }
  }

  /** Constructs a list of nodes from source to target */

  _getPath(parent, source, target) {
    let path = [source.value];
    let current = parent.get(source);
  
    while (current != target) {
      path.push(current.value);
      current = parent.get(current);
    }
    path.push(current.value);
  
    return path.reverse();
  }

}

module.exports = {Graph, Node}