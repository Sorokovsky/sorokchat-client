import { BinaryTree } from '../core';
import type { SecurityNode } from './security-node';

export function buildMembersTree(usersIndexes: number[]): BinaryTree<SecurityNode> {
  const securityItems: SecurityNode[] = usersIndexes
    .sort((a: number, b: number): number => a - b)
    .map((userIndex: number): SecurityNode => ({ nodeId: `user-${userIndex}`, publicKey: null }));
  return new BinaryTree(securityItems);
}
