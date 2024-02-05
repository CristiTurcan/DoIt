export default function removeAllChildren (node) {
    while(node.firstChild) {
        node.removeChild(node.lastChild);
    }
}