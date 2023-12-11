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
    if (!this.head) { 
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
    if (!this.head) {
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
    if (!this.head) {
      throw new Error('Cannot pop from an empty list');
    }
    //case 1: 1 elm
    else if (this.head === this.tail) {
      const temp = this.head;
      this.tail = null;
      this.head = null;
      this.length -= 1;
      return temp.val;
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
      return curr.val;
    }
  }

  /** shift(): return & remove first item. */

  shift() {
    //case 0: no elms
    if (!this.head) {
      throw new Error('Cannot shift from an empty list')
    }
    //case 1: 1 elm
    else if (this.head === this.tail) {
      const temp = this.head;
      this.head = null;
      this.tail = null;
      this.length -= 1;
      return temp.val;
    }
    //case 2: 2+ elms
    else {
      const temp = this.head;
      this.head = this.head.next;
      this.length--;
      return temp.val;
    }
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    // if invalid index, throw error
    if (idx >= this.length || idx < 0) {
      throw new Error(`Invalid index: ${idx}`)
    }
    //iterate to idx and return
    let curr = this.head;
    let counter = 0;
    while (counter != idx) {
      if (curr === null) {
        throw new Error("Unexpected error in getAt")
      }
      curr = curr.next;
      counter++;
    }
    return curr.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    // if invalid index, throw error
    if (idx >= this.length || idx < 0) {
      throw new Error(`Invalid index: ${idx}`)
    }
    let curr = this.head;
    let counter = 0;
    while (counter != idx) {
      if (curr === null) {
        throw new Error("Unexpected error in setAt")
      }
      curr = curr.next;
      counter++;
    }
    curr.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    // if invalid index, throw error
    if (idx > this.length || idx < 0) {
      throw new Error(`Invalid index: ${idx}`)
    }
    // inserting at beginning
    if (idx === 0) {
      this.unshift(val);
    }
    // inserting at end
    else if (idx === this.length) {
      this.push(val);
    }
    // inserting somewhere in the middle (non-optimized)
    else {
      let prev = this.head, curr = prev.next;
      let counter = 1;
      while (counter != idx) {
        if (curr === null) {
          throw new Error("Unexpected error in insertAt")
        }
        prev = curr, curr = curr.next;
        counter++;
      }
      let newNode = new Node(val);
      prev.next = newNode, prev.next.next = curr;
      this.length++;
    }
    return;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    // if invalid index, throw error
    if (idx > this.length || idx < 0) {
      throw new Error(`Invalid index: ${idx}`)
    }
    // removing at beginning
    if (idx === 0) {
      return this.shift();
    }
    // removing at end
    else if (idx === this.length) {
      return this.pop();
    }
    // removing somewhere in the middle (non-optimized)
    else {
      let prev = this.head, curr = prev.next;
      let counter = 1;
      while (counter != idx) {
        if (curr === null) {
          throw new Error("Unexpected error in insertAt")
        }
        prev = curr, curr = curr.next;
        counter++;
      }
      let newNext = curr.next;
      prev.next = newNext;
      this.length--;
      return curr.val;
    }
  }

  /** average(): return an average of all values in the list */

  average() {
    //returns 0 for empty lists
    if (this.length === 0) {
      return 0
    }
    
    let run_sum = 0, curr = this.head;
    while (curr) {
      run_sum += curr.val;
      curr = curr.next;
    }
    return run_sum / this.length;
  }
}

module.exports = LinkedList;
