/**
 * Test if child is a child node of parent
 * @param {Node} child
 * @param {Node} parent
 * @returns {boolean}
 */
export function isChildNode(child: Node, parent: Node): boolean {
  if (child === parent) {
    return true;
  }

  while (child.parentNode) {
    if (child.parentNode === parent) {
      return true;
    }
    child = child.parentNode;
  }

  return false;
}

export function getChildNodesByName(node: Node, name: string): Node[] {
  console.log(node.nodeName);
  if (node.childNodes && node.childNodes.length) {
    for (let i = 0; i < node.childNodes.length; i++) {
      console.log(node.childNodes[i]);
    }
  }

  return [];
}
