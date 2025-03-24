class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = [...new Set(arr)].sort((a, b) => a - b); // Remove the duplicates, and sort the array
    this.root = this.buildTree(this.arr); // Get root of a tree
  }

  // Recursively divide left and right sub-arrays to build a tree
  buildTree(arr) {
    let start = 0;
    let end = arr.length - 1;

    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);

    root.left = this.buildTree(arr.slice(start, mid)); // Recursively build left subtree
    root.right = this.buildTree(arr.slice(mid + 1, end + 1)); // Recursively build right subtree

    return root; // Return level-0 root node
  }

  // Insert a new node with a given value into the tree
  insert(value) {
    let currNode = this.root;
    let newChild = new Node(value);

    // If tree is empty, set new node as the root of the tree
    if (currNode === null) {
      this.root = newChild;
      return newChild;
    }

    // Traverse through the tree
    while (currNode) {
      if (value < currNode.data) {
        // If the left child doesn't exist, assign a new node as the left child
        if (currNode.left === null) {
          currNode.left = newChild;
          return this.root;
        }
        // Otherwise, continue traversing through left subtree
        currNode = currNode.left;
      } else if (value > currNode.data) {
        // If the right child doesn't exist, assign a new node as the right child
        if (currNode.right === null) {
          currNode.right = newChild;
          return this.root;
        }
        // Otherwise, continue traversing through right subtree
        currNode = currNode.right;
      } else {
        console.error("Value already exists in the tree!");
        return currNode;
      }
    }
  }

  // Delete the node of the given value from the tree
  deleteItem(value) {
    let currNode = this.root;
    let parent = null;
    let successor = null;

    // if the tree is empty, return null
    if (currNode === null) return null;

    while (currNode) {
      if (value < currNode.data) {
        parent = currNode;
        currNode = currNode.left;
      } else if (value > currNode.data) {
        parent = currNode;
        currNode = currNode.right;
      } else {
        // LEAF NODE CASE
        if (currNode.left === null && currNode.right === null) {
          // If the tree only had one node, return root of null after deletion
          if (parent === null) {
            this.root = null;
            return this.root;
          }
          // Set leaf node to null
          if (parent.left === currNode) {
            parent.left = null;
          } else {
            parent.right = null;
          }
        }
        // NODE HAS 1 CHILD CASE
        else if (currNode === this.root) {
          // Check if root is deleted with 1 child
          if (currNode.left === null) {
            this.root = currNode.right;
          } else {
            this.root = currNode.left;
          }
        } else if (currNode.left === null) {
          // Node has no left child, link right child to parent
          if (parent.left === currNode) {
            parent.left = currNode.right;
          } else {
            parent.right = currNode.right;
          }
        } else if (currNode.right === null) {
          // Node has no right child, link left child to parent
          if (parent.left === currNode) {
            parent.left = currNode.left;
          } else {
            parent.right = currNode.left;
          }
        }
        // NODE HAS 2 CHILDREN CASE
        else {
          parent = currNode;
          successor = currNode.right;

          // Find leftmost node in right subtree
          while (successor.left) {
            parent = successor;
            successor = successor.left;
          }
          // Replace node to be deleted data with successor's data
          currNode.data = successor.data;

          // If successor has a right child, link right child to the parent of the successor
          if (parent.left === successor) {
            parent.left = successor.right;
          } else {
            parent.right = successor.right;
          }
        }
        return this.root;
      }
    }
    console.error("No node was found with that value in the tree!");
    return this.root;
  }

  // Return the node from the tree with the given value
  find(value) {
    let currNode = this.root;

    // Traverse the tree until the node is found, or until it reaches the leaf
    while (currNode && currNode.data !== value) {
      currNode = value < currNode.data ? currNode.left : currNode.right;
    }

    // Log error, if not found
    if (!currNode) {
      console.error("No node was found with that value!");
      return false;
    }

    // Return the found node
    return currNode;
  }

  // Traverse the tree in breadth-first level order (queue)
  levelOrder(callback) {
    if (this.root === null) return;
    if (!callback) throw Error("Callback is required!");

    const queue = [];
    queue.push(this.root); // Add root node to the queue

    // If the queue is not empty
    while (queue.length > 0) {
      let currNode = queue.shift(); // Remove first node

      callback(currNode); // Log the node that is being processed

      // If current node has a left child, add it to the queue
      if (currNode.left !== null) {
        queue.push(currNode.left);
      }
      // If current node has a right child, add it to the queue
      if (currNode.right !== null) {
        queue.push(currNode.right);
      }
    }
  }

  // Traverse the tree in depth-first order (stack)
  // In-order tree traversal
  inOrder(callback) {
    // left subtree > root > right subtree
    if (this.root === null) return;
    if (!callback) throw Error("Callback is required");

    const stack = []; // Simulate recursive call stack
    let currNode = this.root;

    while (stack.length || currNode) {
      while (currNode) {
        // Traverse left subtree first
        stack.push(currNode); // Add nodes to the stack while traversing left
        currNode = currNode.left;
      }
      let lastNode = stack.pop(); // Remove root of current subtree from the stack
      callback(lastNode); // Log the processed node

      // After processing the root node, move to right subtree
      currNode = lastNode.right;
    }
  }

  // Pre-order tree reversal
  preOrder(callback) {
    // root > left subtree > right subtree
    if (this.root === null) return;
    if (!callback) throw Error("Callback is required");

    const stack = [];
    stack.push(this.root);

    while (stack.length > 0) {
      let currNode = stack.pop();
      callback(currNode);

      // Add right subtree nodes first, so left subtree nodes can be processed first
      if (currNode.right !== null) {
        stack.push(currNode.right);
      }

      if (currNode.left !== null) {
        stack.push(currNode.left);
      }
    }
  }

  // Post-order tree reversal
  postOrder(callback) {
    // left subtree > right subtree > root
    if (this.root === null) return;
    if (!callback) throw Error("Callback is required");

    const stack = []; // stack for reversing the order
    const tempStack = [this.root]; // stack for adding nodes

    while (tempStack.length) {
      let currNode = tempStack.pop();

      stack.push(currNode);

      // Add left child first, followed by right child to the tempStack
      // The last node pushed to tempStack, will be first processed node in in the stack
      if (currNode.left !== null) {
        tempStack.push(currNode.left);
      }

      if (currNode.right !== null) {
        tempStack.push(currNode.right);
      }
    }

    // Reverse the stack so root node displayed last
    stack.reverse().forEach((node) => {
      callback(node);
    });
  }

  // Return node's height
  height(node) {
    // Find the node based on value
    if (typeof node === "number") {
      node = this.find(node);
    }

    // Base case if no node found
    if (node === null || node === false) return -1;

    // Recursively call left and right subtrees
    let leftSubtree = this.height(node.left);
    let rightSubtree = this.height(node.right);

    // Get height of the taller subtree
    return Math.max(leftSubtree, rightSubtree) + 1;
  }

  // Return node's depth
  depth(node) {
    let level = 1;
    let currNode = this.root;

    // Find the node in the tree
    if (typeof node === "number") {
      node = this.find(node);
    }

    while (currNode) {
      // If node found during traversal, return depth of that node
      if (currNode === node) return level;
      // Else keep traversing down the tree
      currNode = node.data < currNode.data ? currNode.left : currNode.right;

      level++; // Add depth level while traversing down
    }
    return -1; // If node not found
  }

  // Check if tree is balanced
  isBalanced() {}
}

// Visual Binary Search Tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const array = [5, 3, 2, 4, 9, 8, 10, 12];

let tree = new Tree(array);

//tree.levelOrder((node) => console.log(node.data));
//tree.inOrder((node) => console.log(node.data));
//tree.preOrder((node) => console.log(node.data));
//tree.postOrder((node) => console.log(node.data));
//console.log(tree.height(12));
//console.log(tree.depth(5));
//console.log(tree.find(4));
//tree.deleteItem(1);
tree.isBalanced();

//console.log(tree.root);
prettyPrint(tree.root);
