import { isNumber } from '@type-dom/utils';
import { computed, signal, unref } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { useNamespace } from '../../../../hooks/use-namespace';
import { useZIndex } from '../../../../hooks/use-z-index';
import { PopperContentProps } from '../content/content.interface';

export const usePopperContentDOM = (
  props: PopperContentProps,
  {
    // attributes,
    styles,
    role,
  }: any //: Pick<UsePopperReturn, 'attributes' | 'styles'> &
) =>
  //Pick<UsePopperContentReturn, 'role'>
  {
    const { nextZIndex } = useZIndex();
    const ns = useNamespace('popper');

    // const contentAttrs = computed(() => unref(attributes).popper)
    const contentZIndex = signal<number>(
      isNumber(props.zIndex) ? props.zIndex : nextZIndex()
    );
    const contentClass = computed(() => [
      ns.b(),
      ns.is('pure', props.pure),
      ns.is(props.effect || ''),
      props.popperClass,
    ]);
    const contentStyle: IStyle = {
      zIndex: unref(contentZIndex),
      ...styles.popper,
      ...((props.popperStyle as IStyle) || {}),
    } as IStyle;
    const ariaModal = computed<string | undefined>(() =>
      role === 'dialog' ? 'false' : undefined
    );
    const arrowStyle = computed(() => (unref(styles).arrow || {}) as IStyle);

    const updateZIndex = () => {
      contentZIndex.set(isNumber(props.zIndex) ? props.zIndex : nextZIndex());
    };

    return {
      ariaModal,
      arrowStyle,
      // contentAttrs,
      contentClass,
      contentStyle,
      contentZIndex,

      updateZIndex,
    };
  };

export type UsePopperContentDOMReturn = ReturnType<typeof usePopperContentDOM>;
