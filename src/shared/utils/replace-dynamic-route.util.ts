export function removeDynamicRoute(path: string): string {
  return path.split('/')
    .filter((item: string): boolean => !item.startsWith(":"))
    .join('/');
}
