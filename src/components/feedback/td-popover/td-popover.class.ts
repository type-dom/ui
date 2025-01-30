import {
  defineExpose,
  Div,
  Fragment,
  ISlotRaw,
  ISlotRef,
  TypeFragment,
} from '@type-dom/framework';
import { addUnit } from '@type-dom/utils';
import { computed, Computed, signal, Signal, unref } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdPopper } from '../td-popper/td-popper.class';
import { TdTooltip } from '../td-tooltip/td-tooltip.class';
import { popoverEmits, popoverProps } from './td-popper.const';
import { ITdPopover, PopoverProps } from './td-popover.interface';
import './style/index';

export class TdPopover extends TypeFragment implements ITdPopover {
  className: 'TdPopover';
  override props: PopoverProps;
  popperRef?: Computed<TdPopper | undefined>;
  hide?: () => void;

  constructor(params: PopoverProps) {
    super();
    this.className = 'TdPopover';
    this.addEmits(popoverEmits);
    this.assignProps(popoverProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;

    const updateEventKeyRaw = `onUpdate:visible` as const;

    const onUpdateVisible = computed(() => {
      return props[updateEventKeyRaw];
      // return props.emits?.['update:visible']
    });

    const ns = useNamespace('popover');
    const tooltipRef = signal<TdTooltip>();
    const popperRef = computed(() => {
      return unref(tooltipRef)?.popperRef?.get();
    });

    const style = computed(() => {
      return [
        {
          width: addUnit(props.width),
        },
        props.popperStyle!,
      ];
    });

    const kls = computed(() => {
      return [ns.b(), props.popperClass!, { [ns.m('plain')]: !!props.content }];
    });

    const gpuAcceleration = computed(() => {
      return props.transition === `${ns.namespace.get()}-fade-in-linear`;
    });

    const hide = () => {
      tooltipRef.get()?.hide?.();
    };

    const beforeEnter = () => {
      emit('before-enter');
    };
    const beforeLeave = () => {
      emit('before-leave');
    };

    const afterEnter = () => {
      emit('after-enter');
    };

    const afterLeave = () => {
      emit('update:visible', false);
      emit('after-leave');
    };

    defineExpose({
      /** @description popper ref */
      popperRef,
      /** @description hide popover */
      hide,
    });

    this.addChild(
      new TdTooltip({
        refEl: tooltipRef,
        //    v-bind="$attrs"
        trigger: props.trigger,
        placement: props.placement,
        disabled: props.disabled,
        visible: props.visible ?? null, // todo undefined don't show popover , why ?
        transition: props.transition,
        popperOptions: props.popperOptions,
        content: props.content,
        offset: props.offset,
        showAfter: props.showAfter,
        hideAfter: props.hideAfter,
        autoClose: props.autoClose,
        showArrow: props.showArrow,
        effect: props.effect,
        enterable: props.enterable,
        popperClass: kls.get(),
        popperStyle: style.get(),
        teleported: props.teleported,
        persistent: props.persistent,
        gpuAcceleration: gpuAcceleration.get(),
        attrObj: {
          tabindex: props.tabindex,
          ariaLabel: props.title,
        },
        emits: {
          'update:visible': onUpdateVisible.get(), // todo
          beforeShow: beforeEnter,
          beforeHide: beforeLeave,
          show: afterEnter,
          hide: afterLeave,
        },
        slots: {
          default: props.slots?.reference,
          content: [
            props.title
              ? new Div({
                  class: ns.e('title'),
                  attrObj: {
                    role: 'title',
                  },
                  slot: props.title,
                })
              : undefined,
            new Fragment({
              slot: props.slot ?? props.slots?.default ?? props.content,
            }),
          ],
        },
      })
    );
  }
}
