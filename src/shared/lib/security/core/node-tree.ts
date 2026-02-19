export interface NodeTree<T> {
  current: T | null;
  left: NodeTree<T> | null;
  right: NodeTree<T> | null;
  parent: NodeTree<T> | null;
}
