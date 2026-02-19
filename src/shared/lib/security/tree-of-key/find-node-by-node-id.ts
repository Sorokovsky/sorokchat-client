import type { NodeTree } from '../core';
import type { SecurityNode } from './security-node';

export function findNodeByNodeId(
  root: NodeTree<SecurityNode> | null,
  nodeId: string,
): NodeTree<SecurityNode> | null {
  if (!root) return null;
  if (root.current?.nodeId === nodeId) return root;
  return findNodeByNodeId(root.left, nodeId) || findNodeByNodeId(root.right, nodeId);
}
