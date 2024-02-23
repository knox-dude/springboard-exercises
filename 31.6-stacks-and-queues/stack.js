/** Node: node for a stack. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** Stack: chained-together nodes where you can
 *  remove from the top or add to the top. */

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  /** push(val): add new value to end of the stack. Returns undefined. */

  push(val) {
    if (this.size === 0) {
      this.first = new Node(val);
      this.last = this.first;
    } else {
      this.first.next = new Node(val);
      this.first = this.first.next;
    }
    this.size++;
  }

  /** pop(): remove the node from the top of the stack
   * and return its value. Should throw an error if the stack is empty. */

  pop() {
    if (this.size === 0) {
      throw new Error('Stack is empty');
    } 
    else if (this.size === 1) {
      let val = this.first.val;
      this.first = null;
      this.last = null;
      this.size--;
      return val;
    }
    else {
      let curr = this.last;
      for (let i = 0; i < this.size - 2; i++) {
        curr = curr.next;
      }
      let return_val = curr.next.val;
      curr.next = null;
      this.first = curr;
      this.size--;
      return return_val;
    }
  }

  /** peek(): return the value of the first node in the stack. */

  peek() {
    if (this.size === 0) {
      throw new Error('Stack is empty');
    } else {
      return this.first.val;
    }
  }


  /** isEmpty(): return true if the stack is empty, otherwise false */

  isEmpty() {
    if (this.size === 0) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Stack;
