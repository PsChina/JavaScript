class SinglyLinkedNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// 单向链表
class SinglyLinkedList {
  static fromArray(arr) {
    return new SinglyLinkedList(...arr);
  }
  constructor(...rest) {
    this._length = 0;
    this.empty();
    for (const item of rest) {
      this.push(item);
    }
    Object.defineProperty(this, "_length", {
      enumerable: false
    });
  }
  set length(length) {
    if (length < 0 || !Number.isInteger(length) || isNaN(length)) {
      throw new RangeError("Invalid list length");
    }
    if (this._length > length) {
      for (let i = this._length; i > length; i--) {
        this.delete(i - 1);
      }
    } else if (this._length < length) {
      for (let i = this._length; i < length; i++) {
        this._push(undefined);
      }
    }
    this._length = Number(length);
  }
  get length() {
    return this._length;
  }
  empty() {
    this.head = this.tail = null;
    this._length = 0;
  }
  isEmpty() {
    return this._length === 0;
  }
  push(...rest) {
    for (const item of rest) {
      this._push(item);
    }
    return this._length;
  }
  _push(data) {
    const node = new SinglyLinkedNode(data);
    if (this._length <= 0) {
      this.head = this.tail = node;
      this._length = 1;
    } else {
      this.tail.next = node;
      this.tail = node;
      this._length++;
    }
  }
  pop() {
    if (this._length <= 0) {
      return null;
    }
    let currentNode = this.head;
    let penultimate;
    while (currentNode.next) {
      penultimate = currentNode;
      currentNode = currentNode.next;
    }
    this.tail = penultimate;
    this._length--;
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.empty();
    }
    return currentNode;
  }
  get(index) {
    if (index < 0 || index >= this._length) {
      return null;
    } else if (index === 0) {
      return this.head;
    } else {
      let currentNode = this.head;
      let count = 0;
      while (count < index) {
        count++;
        currentNode = currentNode.next;
      }
      return currentNode;
    }
  }
  insert(index, ...rest) {
    if (index >= this._length) {
      for (const item of rest) {
        this._insert(this._length, item);
      }
      return;
    }
    for (let l = rest.length - 1; l >= 0; l--) {
      this._insert(index, rest[l]);
    }
    return this;
  }
  _insert(index, data) {
    if (index === 0 || (index < 0 && Math.abs(index) >= this._length)) {
      this.unshift(data);
    } else if (index > this._length - 1) {
      this.push(data);
    } else if (index < 0) {
      insert.call(this, this._length + index);
    } else {
      insert.call(this, index);
    }
    function insert(_index) {
      let currentNode = this.head;
      let preNode;
      let count = 0;
      while (count < _index) {
        count++;
        preNode = currentNode;
        currentNode = currentNode.next;
      }
      preNode.next = new SinglyLinkedNode(data);
      preNode.next.next = currentNode;
      this._length++;
    }
  }
  shift() {
    let node = null;
    if (this._length >= 1) {
      node = this.head;
      this.head = this.head.next;
      this._length--;
      if (this._length === 0) {
        this.empty();
      }
    }
    node && (node.next = null);
    return node;
  }
  unshift(...rest) {
    for (let l = rest.length - 1; l >= 0; l--) {
      this._unshift(rest[l]);
    }
    return this._length;
  }
  _unshift(data) {
    if (this.isEmpty()) {
      this._push(data);
      return;
    }
    const head = this.head;
    this.head = new SinglyLinkedNode(data);
    this.head.next = head;
    this._length++;
    return this._length;
  }
  delete(index) {
    let node = null;
    if (index < 0 || index >= this._length) {
      return node;
    } else if (index === 0) {
      return this.shift();
    } else if (index === this._length - 1) {
      node = this.tail;
      if (this._length >= 2) {
        this.tail = this.get(index - 1);
      } else {
        this.head = this.tail;
      }
      this.tail.next = null;
    } else {
      let currentNode = this.head;
      let count = 0;
      let preNode;
      while (count < index) {
        count++;
        preNode = currentNode;
        currentNode = currentNode.next;
        node = currentNode;
      }
      preNode.next = currentNode.next;
    }
    this._length--;
    if (this._length <= 0) {
      this.empty();
    }
    node.next = null;
    return node;
  }
  forEach(callback) {
    if (this._length <= 0) {
      return;
    }
    let currentNode = this.head;
    let i = 0;
    let res = callback(currentNode, i++, this);
    while (currentNode.next && res === undefined) {
      res = callback(currentNode.next, i++, this);
      currentNode = currentNode.next;
    }
  }
  toArray() {
    const arr = [];
    this.forEach(item => {
      arr.push(item.data);
    });
    return arr;
  }
  toString() {
    const arr = [];
    this.forEach(item => {
      arr.push(JSON.stringify(item.data));
    });
    return arr.join("=>");
  }
  indexOf(node) {
    let index = -1;
    this.forEach((item, i) => {
      if (node === item || node === item.data) {
        index = i;
        return "break";
      }
    });
    return index;
  }
}

class Node extends SinglyLinkedNode {
  constructor(data) {
    super(data);
    this.prev = null;
  }
}

// 双向链表
class List extends SinglyLinkedList {
  static fromArray(arr) {
    return new List(...arr);
  }
  constructor(...rest) {
    super(...rest);
  }
  _push(data) {
    const node = new Node(data);
    if (this._length <= 0) {
      this.head = this.tail = node;
      this._length = 1;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
      this._length++;
    }
  }
  pop() {
    let node = null;
    if (this.isEmpty()) {
      return node;
    }
    if (this.tail.prev) {
      node = this.tail;
      this.tail = this.tail.prev;
      this.tail.next = null;
      this._length--;
    } else if (this.length === 1) {
      node = this.head;
      this.empty();
    }
    node.prev = null;
    return node;
  }
  get(index) {
    if (index >= 0 && index < this._length / 2) {
      return super.get(index);
    } else if (index > 0 && index < this._length) {
      index = index - this._length;
      return this._getWithNegative(index);
    } else if (index < 0) {
      return this._getWithNegative(index);
    } else {
      return null;
    }
  }
  _getWithNegative(index) {
    let count = -1;
    let node = this.tail;
    while (count > index && node.prev) {
      count--;
      node = node.prev;
    }
    return node;
  }
  shift() {
    this.head && this.head.next && (this.head.next.prev = null);
    return super.shift();
  }
  _unshift(data) {
    if (this.isEmpty()) {
      this._push(data);
      return;
    }
    const node = new Node(data);
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
    this._length++;
    return this._length;
  }
  _insert(index, data) {
    if (index === 0) {
      this.unshift(data);
      return;
    }
    if (index >= this._length) {
      this._push(data);
      return;
    }
    if (index > 0 && index < this._length / 2) {
      this._insertWithPositive(index, data);
      return;
    } else if (index > 0) {
      index = index - this._length;
    }
    this._insertWithNegative(index, data);
  }
  _insertWithPositive(index, data) {
    let currentNode = this.get(index);
    let preNode = currentNode.prev;
    this._insertNode(preNode, currentNode, data);
  }
  _insertWithNegative(index, data) {
    let count = 0;
    let currentNode = this.tail;
    if (count > index && currentNode.prev) {
      currentNode = currentNode.prev;
      count--;
    }
    this._insertNode(currentNode.prev, currentNode, data);
  }
  _insertNode(preNode, curNode, data) {
    const node = new Node(data);
    node.prev = preNode;
    preNode.next = node;
    node.next = curNode;
    curNode.prev = node;
    this._length++;
  }
  _delete(currentNode) {
    const prev = currentNode && currentNode.prev;
    const next = currentNode && currentNode.next;
    prev && (prev.next = next);
    next && (next.prev = prev);
    currentNode && this._length--;
    if (currentNode === this.head) {
      this.head = this.head && this.head.next;
    } else if (currentNode === this.tail) {
      this.tail = this.tail && this.tail.prev;
    }
    if (currentNode) {
      currentNode.prev = currentNode.next = null;
    }
    if (this.isEmpty()) {
      this.empty();
    }
    return currentNode;
  }
  delete(index) {
    return this._delete(this.get(index));
  }
}
