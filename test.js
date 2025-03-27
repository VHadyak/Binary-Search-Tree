import { Tree } from "./index.js";
import { prettyPrint } from "./index.js";

const arr = [23, 9, 19, 20, 15, 10, 8]; // sorted array [8, 9, 10, 15, 19, 20, 23]
let tree = new Tree(arr);

prettyPrint(tree.root);
/*        15
         /  \
        9    20
       / \   / \
      8  10 19  23      */

console.log("Tree is balanced:", tree.isBalanced()); // true
console.log("Height of the node:", tree.height(15)); // 2
console.log("Depth of the node:", tree.depth(8)); // 3
console.log("Node found:", tree.find(9)); // Node {data: 9, left: Node, right: Node}

console.log("LEVEL ORDER");
tree.levelOrder((node) => console.log(node)); // left to right (breadth-first)
/* Node {data: 15, left: Node, right: Node}  
   Node {data: 9, left: Node, right: Node} 
   Node {data: 20, left: Node, right: Node} 
   Node {data: 8, left: null, right: null} 
   Node {data: 10, left: null, right: null} 
   Node {data: 19, left: null, right: null} 
   Node {data: 23, left: null, right: null} */

console.log("IN-ORDER");
tree.inOrder((node) => console.log(node)); // left > root > right
/* Node {data: 8, left: null, right: null}
   Node {data: 9, left: Node, right: Node}
   Node {data: 10, left: null, right: null}
   Node {data: 15, left: Node, right: Node}
   Node {data: 19, left: null, right: null}
   Node {data: 20, left: Node, right: Node}
   Node {data: 23, left: null, right: null} */

console.log("PRE-ORDER");
tree.preOrder((node) => console.log(node)); // root > left > right
/* Node {data: 15, left: Node, right: Node}
   Node {data: 9, left: Node, right: Node}
   Node {data: 8, left: null, right: null}
   Node {data: 10, left: null, right: null}
   Node {data: 20, left: Node, right: Node}
   Node {data: 19, left: null, right: null}
   Node {data: 23, left: null, right: null} */

console.log("POST-ORDER");
tree.postOrder((node) => console.log(node)); // left > right > root
/* Node {data: 8, left: null, right: null}
   Node {data: 10, left: null, right: null}
   Node {data: 9, left: Node, right: Node}
   Node {data: 19, left: null, right: null}
   Node {data: 23, left: null, right: null}
   Node {data: 20, left: Node, right: Node}
   Node {data: 15, left: Node, right: Node} */

// Modify the tree
tree.deleteItem(20); // Delete the node
tree.deleteItem(10);
tree.deleteItem(19);
tree.insert(25); // Insert the node
tree.insert(29);
tree.insert(7);
tree.insert(12);

prettyPrint(tree.root); // Unbalanced tree
/*      15
       /  \
      9    23
     / \    \
    8  12    25
   /          \
  7            29   */

console.log("Tree is balanced:", tree.isBalanced()); // false
console.log("Height of the node:", tree.height(3)); // -1 (No node was found)
console.log("Depth of the node:", tree.depth(23)); // 2

tree.rebalance(); // Rebalance the unbalanced tree
prettyPrint(tree.root);
/*      12
       /  \
      8    23
     / \   / \
    7   9 15  25   
               \
                29   */

console.log("Tree is balanced:", tree.isBalanced()); // true

console.log("LEVEL ORDER");
tree.levelOrder((node) => console.log(node));
/* Node {data: 12, left: Node, right: Node}
   Node {data: 8, left: Node, right: Node}
   Node {data: 23, left: Node, right: Node}
   Node {data: 7, left: null, right: null}
   Node {data: 9, left: null, right: null}
   Node {data: 15, left: null, right: null}
   Node {data: 25, left: null, right: Node}
   Node {data: 29, left: null, right: null} */

console.log("IN-ORDER");
tree.inOrder((node) => console.log(node));
/* Node {data: 7, left: null, right: null}
   Node {data: 8, left: Node, right: Node}
   Node {data: 9, left: null, right: null}
   Node {data: 12, left: Node, right: Node}
   Node {data: 15, left: null, right: null}
   Node {data: 23, left: Node, right: Node}
   Node {data: 25, left: null, right: Node}
   Node {data: 29, left: null, right: null} */

console.log("PRE-ORDER");
tree.preOrder((node) => console.log(node));
/* Node {data: 12, left: Node, right: Node}
   Node {data: 8, left: Node, right: Node}
   Node {data: 7, left: null, right: null}
   Node {data: 9, left: null, right: null}
   Node {data: 23, left: Node, right: Node}
   Node {data: 15, left: null, right: null}
   Node {data: 25, left: null, right: Node}
   Node {data: 29, left: null, right: null} */

console.log("POST-ORDER");
tree.postOrder((node) => console.log(node));
/* Node {data: 7, left: null, right: null}
   Node {data: 9, left: null, right: null}
   Node {data: 8, left: Node, right: Node}
   Node {data: 15, left: null, right: null}
   Node {data: 29, left: null, right: null}
   Node {data: 25, left: null, right: Node}
   Node {data: 23, left: Node, right: Node}
   Node {data: 12, left: Node, right: Node} */
