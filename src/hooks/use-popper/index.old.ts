import {
  computePosition,
  ComputePositionConfig,
  autoUpdate,
  ReferenceElement,
  FloatingElement,
} from '@type-dom/popper';
import { IStyle } from '@type-dom/css-type';
import { TypeElement, TypeHtml } from '@type-dom/framework';
import { TdPopperContent } from '../../components/feedback/td-popper/content/content.class';
import {
  $placements,
  matchPlacement,
} from '../../components/feedback/td-popper/td-popper.style';
import { TdPopperArrow } from '../../components/feedback/td-popper/arrow/arrow.class';

export type PartialOptions = Partial<ComputePositionConfig>;

// todo 调用时如何保证 referenceElementRef，popperElementRef都已存在
export const usePopper = (
  referenceElement: TypeElement,
  popperElement: TdPopperContent | undefined,
  opts: PartialOptions = {} as PartialOptions
) => {
  // 启动自动更新
  const update = async (style?: IStyle) => {
    if (!referenceElement.dom || !popperElement?.dom) {
      return;
    }
    const { x, y, middlewareData } = await computePosition(
      (referenceElement.downRealElement as TypeHtml).dom as ReferenceElement,
      popperElement.dom,
      opts
    );
    popperElement.style.setObj({
      position: opts.strategy,
      left: `${x}px`,
      top: `${y}px`,
      ...style,
    });

    if (middlewareData.arrow) {
      console.log('middlewareData is ', middlewareData);
      const { x, y } = middlewareData.arrow;
      // todo
      const arrowEl = popperElement.down<TdPopperArrow>(
        'className',
        'TdPopperArrow'
      );
      arrowEl?.style.setObj({
        left: x != null ? `${x}px` : '',
        top: y != null ? `${y}px` : '',
      });
      const styleObj = matchPlacement(
        (popperElement.props.placement
          ?.split('-')
          ?.shift() as keyof typeof $placements) || 'top'
      );
      arrowEl?.style.setObj(styleObj);
    }
  };

  const destroy = () => {
    if (referenceElement?.dom && popperElement?.dom) {
      return autoUpdate(
        (referenceElement.downRealElement as TypeHtml).dom as ReferenceElement,
        popperElement.dom,
        update
      )();
    }
  };

  popperElement?.onBeforeUnmount(() => {
    destroy();
  });

  const show = () => {
    update({
      visibility: 'visible',
      opacity: 1,
    });
  };

  const hide = () => {
    popperElement?.style.setObj({
      visibility: 'hidden',
      opacity: 0,
    });

    if (destroy) {
      destroy();
      // destroy = null;
    }
  };

  return {
    // state: computed(() => ({ ...(instanceRef?.state || {}) })),
    // styles: computed(() => states.styles),
    // attributes: computed(() => states.attributes),
    update: (style?: IStyle) => update(style),
    destroy,
    show,
    hide,
    // forceUpdate: () => instanceRef?.forceUpdate(),
    // Preventing end users from modifying the instance.
    // instanceRef: computed(() => instanceRef),
  };
};

// function deriveState(state: MiddlewareState) {
//   const elements = Object.keys(state.elements) as unknown as Array<
//     keyof State['elements']
//   >
//
//   const styles = fromPairs(
//     elements.map(
//       (element) =>
//         [element, state.styles[element] || {}] as [
//           string,
//           State['styles'][keyof State['styles']]
//         ]
//     )
//   )
//
//   const attributes = fromPairs(
//     elements.map(
//       (element) =>
//         [element, state.attributes[element]] as [
//           string,
//           State['attributes'][keyof State['attributes']]
//         ]
//     )
//   )
//
//   return {
//     styles,
//     attributes,
//   }
// }

export type UsePopperReturn = ReturnType<typeof usePopper>;
