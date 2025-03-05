import {
  defineExpose,
  inject,
  onBeforeUnmount,
  TypeSpan,
} from '@type-dom/framework';
import { Ref, watch } from '@type-dom/signals';
import { useNamespace } from '../../../../hooks/use-namespace';
import { POPPER_CONTENT_INJECTION_KEY } from '../constants';
import { ITdPopperArrow, PopperArrowProps } from './arrow.interface';
import { popperArrowProps } from './arrow.const';

export class TdPopperArrow extends TypeSpan implements ITdPopperArrow {
  className: 'TdPopperArrow';
  override props: PopperArrowProps;
  arrowRef?: Ref<HTMLElement>;

  constructor(params: PopperArrowProps = {}) {
    super();
    this.className = 'TdPopperArrow';
    this.attr.addName('td-popper-arrow');

    // this.assignProps(popperArrowProps);
    this.props = this.useParams(params);
  }

  override setup() {
    // console.log('TdPopperArrow setup . ');
    const props = this.props;
    const ns = useNamespace('popper');
    const { arrowOffset, arrowRef, arrowStyle } = inject(
      POPPER_CONTENT_INJECTION_KEY,
      undefined
    )!;

    watch(
      () => props.arrowOffset?.get(),
      (val) => {
        // console.warn('watch props.arrowOffset is ', val);
        arrowOffset?.set(val);
      }
    );
    onBeforeUnmount(() => {
      arrowRef?.set(undefined);
    });

    defineExpose({
      /**
       * @description Arrow element
       */
      arrowRef,
    });

    this.assignProps({
      refDom: arrowRef,
    });
    this.attr.addClass(ns.e('arrow'));
    this.attr.addObj({
      'data-popper-arrow': 'data-popper-arrow',
    });
    this.style.addObj(arrowStyle);
  }
}
