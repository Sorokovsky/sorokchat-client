import type { NodeTree } from './node-tree';

export class BinaryTree<T> {
  private readonly rootNode: NodeTree<T>;
  constructor(items: T[]) {
    this.rootNode = BinaryTree.buildTree(items);
  }

  public get root(): NodeTree<T> {
    return BinaryTree.deepClone(this.rootNode);
  }

  private static buildTree<T>(items: T[], parent: NodeTree<T> | null = null): NodeTree<T> {
    if (items.length === 0) return { current: null, right: null, left: null, parent };
    if (items.length === 1) return { current: items[0]!, left: null, right: null, parent };
    const middle: number = Math.floor(items.length / 2);
    const leftItems: T[] = items.slice(0, middle);
    const rightItems: T[] = items.slice(middle);
    const node: NodeTree<T> = { current: null, left: null, right: null, parent };
    node.left = this.buildTree(leftItems, node);
    node.right = this.buildTree(rightItems, node);
    return node;
  }

  private static deepClone<T>({ current, left, right }: NodeTree<T>): NodeTree<T> {
    const clone = {
      current: current ? { ...current } : null,
      left: null as NodeTree<T> | null,
      right: null as NodeTree<T> | null,
      parent: null as NodeTree<T> | null,
    };
    if (left) {
      clone.left = this.deepClone(left);
      clone.left.parent = clone;
    }

    if (right) {
      clone.right = this.deepClone(right);
      clone.right.parent = clone;
    }

    return clone;
  }
}
