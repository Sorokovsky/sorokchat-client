export function removeDynamicPath(path: string): string {
  return path
    .split('/')
    .filter((item: string): boolean => !item.startsWith(':'))
    .join('/');
}
