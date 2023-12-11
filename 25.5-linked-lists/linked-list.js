/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const node = new Node(val);
    //case 0: no elms
    if (this.tail === null && this.head === null) { 
      this.tail = node;
      this.head = node;
    } 
    //case 1: 1 elm
    else if (this.head === this.tail) {           
      this.head.next = node;
      this.tail = node; 
    } 
    //case 2: 2+ elms
    else {                                        
      this.tail.next = node;
      this.tail = node;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const node = new Node(val);
    //case 0: no elms
    if (this.head === null) {
      this.tail = node;
      this.head = node;
    }
    //case 1: 1 elm
    else if (this.head === this.tail) {
      this.head = node;
      this.head.next = this.tail;
    }
    //case 2: 2+ elms
    else {
      const temp = this.head;
      this.head = node;
      this.head.next = temp;
    }
    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    //case 0: no elms
    if (this.head === null) {
      return null
    }
    //case 1: 1 elm
    else if (this.head === this.tail) {
      const temp = this.head;
      this.tail = null;
      this.head = null;
      this.length -= 1;
      return temp;
    }
    //case 2: 2+ elms
    else {
      let prev = this.head;
      let curr = prev.next;
      while (curr.next != null) {
        prev = curr;
        curr = curr.next;
      }
      this.tail = prev;
      prev.next = null;
      this.length--;
      return curr;
    }

  }

  /** shift(): return & remove first item. */

  shift() {
    const temp = this.head;
    this.head = this.head.next;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {

  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {

  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {

  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {

  }

  /** average(): return an average of all values in the list */

  average() {
    
  }
}

module.exports = LinkedList;
