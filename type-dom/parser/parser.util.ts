export function isWhitespace(s: string, index: number): boolean {
  const ch = s[index];
  return ch === ' ' || ch === '\n' || ch === '\r' || ch === '\t';
}
export function isWhitespaceString(s: string): boolean {
  for (let i = 0, ii = s.length; i < ii; i++) {
    if (!isWhitespace(s, i)) {
      return false;
    }
  }
  return true;
}
