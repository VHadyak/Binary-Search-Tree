# Binary Search Tree Project

### *Project BST* is a practice project designed to manipulate data nodes within the Binary Search Tree by implementing various methods, such as deletion/insertion, and tree traversals using breadth-first and depth-first approaches. In addition, the project implements rebalancing techniques when the tree is unbalanced.

### The following methods have been implemented into the Tree class:

* buildTree(arr) - Build a Balanced Binary Search Tree with the sorted array
* insert(value)  - Insert a node with a given value into a tree
* deleteItem(value) - Delete the node of the given value within the tree
* find(value) - Find the node with a given value within a tree
* levelOrder(callback) - Traverse the tree in breadth-first level order
* inOrder(callback) - In-order tree traversal (left > root > right)
* preOrder(callback) - Pre-order tree traversal (root > left > right)
* postOrder(callback) - Post-order tree traversal (left > right > root)
* height(node) - Find the height of the given node
* depth(node) - Find the depth of the given node
* isBalanced() - Check if the tree is balanced
* rebalance() - Rebalance the tree if the tree is unbalanced
