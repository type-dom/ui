export function wheelHandler(e: WheelEvent): boolean {
  if (!e.ctrlKey) return false;

  if (e.deltaY < 0) {
    e.preventDefault();
    return false;
  } else if (e.deltaY > 0) {
    e.preventDefault();
    return false;
  } else {
    return false;
  }
}
