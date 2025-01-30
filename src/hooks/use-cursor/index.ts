import { Signal } from '@type-dom/signals';

interface SelectionInfo {
  selectionStart?: number;
  selectionEnd?: number;
  value?: string;
  beforeTxt?: string;
  afterTxt?: string;
}

// Keep input cursor in the correct position when we use formatter.
export function useCursor(
  input: Signal<HTMLInputElement | undefined>
): [() => void, () => void] {
  let selectionInfo: SelectionInfo;

  function recordCursor() {
    if (input.get() == undefined) {
      return;
    }

    const { selectionStart, selectionEnd, value } = input.get()!;

    if (selectionStart == null || selectionEnd == null) {
      return;
    }

    const beforeTxt = value.slice(0, Math.max(0, selectionStart));
    const afterTxt = value.slice(Math.max(0, selectionEnd));

    selectionInfo = {
      selectionStart,
      selectionEnd,
      value,
      beforeTxt,
      afterTxt,
    };
  }

  function setCursor() {
    if (input.get() == undefined || selectionInfo == undefined) {
      return;
    }

    const { value } = input.get()!;
    const { beforeTxt, afterTxt, selectionStart } = selectionInfo;

    if (
      beforeTxt == undefined ||
      afterTxt == undefined ||
      selectionStart == undefined
    ) {
      return;
    }

    let startPos = value.length;

    if (value.endsWith(afterTxt)) {
      startPos = value.length - afterTxt.length;
    } else if (value.startsWith(beforeTxt)) {
      startPos = beforeTxt.length;
    } else {
      const beforeLastChar = beforeTxt[selectionStart - 1];
      const newIndex = value.indexOf(beforeLastChar, selectionStart - 1);
      if (newIndex !== -1) {
        startPos = newIndex + 1;
      }
    }

    input.get()?.setSelectionRange(startPos, startPos);
  }

  return [recordCursor, setCursor];
}
