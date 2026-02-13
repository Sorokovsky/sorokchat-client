export function cutText(text: string, length: number): string {
  if (length <= 0) throw new RangeError('Length must be greater than 0');
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}
