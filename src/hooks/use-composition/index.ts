import { signal } from '@type-dom/signals';
import { nextTick } from '@type-dom/framework';
import { isKorean } from '../../../../utils/src/ui/i18n';

interface UseCompositionOptions {
  afterComposition: (event?: CompositionEvent) => void;
  emit?: ((event: 'compositionstart', evt?: CompositionEvent) => void) &
    ((event: 'compositionupdate', evt?: CompositionEvent) => void) &
    ((event: 'compositionend', evt?: CompositionEvent) => void);
}

export function useComposition({
  afterComposition,
  emit,
}: UseCompositionOptions) {
  const isComposing = signal(false);

  const handleCompositionStart = (event?: CompositionEvent) => {
    emit?.('compositionstart', event);
    isComposing.set(true);
  };

  const handleCompositionUpdate = (event?: CompositionEvent) => {
    emit?.('compositionupdate', event);
    const text = (event?.target as HTMLInputElement)?.value;
    const lastCharacter = text[text.length - 1] || '';
    isComposing.set(!isKorean(lastCharacter));
  };

  const handleCompositionEnd = (event?: CompositionEvent) => {
    emit?.('compositionend', event);
    if (isComposing.get()) {
      isComposing.set(false);
      nextTick(() => afterComposition(event));
    }
  };

  const handleComposition = (event?: CompositionEvent) => {
    event?.type === 'compositionend'
      ? handleCompositionEnd(event)
      : handleCompositionUpdate(event);
  };

  return {
    isComposing,
    handleComposition,
    handleCompositionStart,
    handleCompositionUpdate,
    handleCompositionEnd,
  };
}
