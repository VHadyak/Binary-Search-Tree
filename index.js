class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = [...new Set(arr)].sort((a, b) => a - b); // Sort the array and remove any duplicates
    this.root = this.buildTree(this.arr); // Get root of a tree
  }

  // Recursively divide left and right sub-arrays to build a tree
  buildTree(arr) {
    let start = 0;
    let end = arr.length - 1;

    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let root = new Node(arr[mid]);

    root.left = this.buildTree(arr.slice(start, mid));
    root.right = this.buildTree(arr.slice(mid + 1, end + 1));

    return root; // Return level-0 root node
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

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// Sorted and deduplicated array: [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
let tree = new Tree(array);

prettyPrint(tree.root);
