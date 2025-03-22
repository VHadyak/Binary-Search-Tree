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

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// Sorted and deduplicated array: [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]

let tree = new Tree(array);

tree.insert(15);
tree.insert(20);
tree.insert(6);

console.log(tree.find(4));

//tree.deleteItem(1);

//console.log(tree.root);
prettyPrint(tree.root);
