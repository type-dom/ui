// 原生焦点捕获
class FocusTrap {
  private container: HTMLElement;
  private focusableElements: NodeListOf<Element>;
  private firstTabbableElement: HTMLElement | null;
  private lastTabbableElement: HTMLElement | null;
  private previousFocus: HTMLElement | null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.focusableElements = this.getTabbableElements();
    this.firstTabbableElement = this.getFirstTabbableElement();
    this.lastTabbableElement = this.getLastTabbableElement();
    this.previousFocus = document.activeElement as HTMLElement;
  }

  enable() {
    if (this.container) {
      this.previousFocus = document.activeElement as HTMLElement;
      this.container.setAttribute('tabindex', '0');
      this.container.focus();

      window.addEventListener('keydown', this.handleTab);
      window.addEventListener('focusin', this.handleFocusIn);
    }
  }

  disable() {
    if (this.container) {
      this.container.removeAttribute('tabindex');
      if (this.previousFocus) {
        this.previousFocus.focus();
      }

      window.removeEventListener('keydown', this.handleTab);
      window.removeEventListener('focusin', this.handleFocusIn);
    }
  }

  private handleTab = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      const { shiftKey } = event;
      const isTabbingForward = !shiftKey;
      const focusedElement = document.activeElement as HTMLElement;

      if ((isTabbingForward && focusedElement === this.lastTabbableElement) ||
        (!isTabbingForward && focusedElement === this.firstTabbableElement)) {
        event.preventDefault();
        isTabbingForward ?
          this.firstTabbableElement?.focus() :
          this.lastTabbableElement?.focus();
      }
    }
  }

  private handleFocusIn = (event: FocusEvent)=> {
    const focusedElement = event.target as HTMLElement;
    if (focusedElement && !this.container.contains(focusedElement)) {
      event.stopPropagation();
      this.firstTabbableElement?.focus();
    }
  }

  private getTabbableElements(): NodeListOf<Element> {
    return this.container.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]'
    );
  }

  private getFirstTabbableElement(): HTMLElement | null {
    const elements = Array.from(this.focusableElements);
    return elements.length > 0 ? elements[0] as HTMLElement : null;
  }

  private getLastTabbableElement(): HTMLElement | null {
    const elements = Array.from(this.focusableElements);
    return elements.length > 0 ? elements[elements.length - 1] as HTMLElement : null;
  }
}
//
// // 使用示例
// const modal = document.getElementById('modal');
// const focusTrap = new FocusTrap(modal);
// focusTrap.enable(); // 启用 focus trap
// // 在需要的地方禁用 focus trap
// focusTrap.disable();
