export function cutText(text: string, length: number): string {
  if (length <= 0) throw new Error("Length must be greater than 0");
  if (length >= text.length) return text;
  return text.slice(0, length) + "...";
}
