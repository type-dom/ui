// import { ref } from 'vue'
// import { useAttrs, useFocusController, useNamespace } from '@element-plus/hooks'
// import { timePickerRngeTriggerProps } from './props'
// import type { CSSProperties } from 'vue'
import { defineExpose, Input, TypeProps, TypeDiv } from '@type-dom/framework';
import { useAttrs } from '../../../../hooks/use-attrs';
import { useNamespace } from '../../../../hooks/use-namespace';
import { TimePickerRangeTriggerProps } from './props';
import { computed, signal } from '@type-dom/signals';
import { useFocusController } from 'libs/ui/src/hooks/use-focus-controller';

export class PickerRangeTrigger extends TypeDiv {
  className: 'PickerRangeTrigger';
  override props: TimePickerRangeTriggerProps;
  focus?: () => void;
  blur?: () => void;

  constructor(params: TimePickerRangeTriggerProps = {}) {
    super();
    this.className = 'PickerRangeTrigger';

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;

    const attrs = useAttrs();
    const nsDate = useNamespace('date');
    const nsRange = useNamespace('range');

    const inputRef = signal<HTMLInputElement>();
    const endInputRef = signal<HTMLInputElement>();

    const { wrapperRef, isFocused } = useFocusController(inputRef as any); // todo

    const handleClick = (evt?: MouseEvent) => {
      emit('click', evt);
    };

    const handleMouseEnter = (evt?: MouseEvent) => {
      emit('mouseenter', evt);
    };

    const handleMouseLeave = (evt?: MouseEvent) => {
      emit('mouseleave', evt);
    };

    const handleTouchStart = (evt?: TouchEvent) => {
      emit('mouseenter', evt);
    };

    const handleStartInput = (evt?: Event) => {
      emit('startInput', evt);
    };

    const handleEndInput = (evt?: Event) => {
      emit('endInput', evt);
    };

    const handleStartChange = (evt?: Event) => {
      emit('startChange', evt);
    };

    const handleEndChange = (evt?: Event) => {
      emit('endChange', evt);
    };

    const focus = () => {
      inputRef.get()?.focus();
    };

    const blur = () => {
      inputRef.get()?.blur();
      endInputRef.get()?.blur();
    };

    defineExpose({
      focus,
      blur,
    });

    this.assignProps({
      refDom: wrapperRef,
      class: computed(() => [
        nsDate.is('active', isFocused.get()) /* $attrs.class*/,
      ]),
      // styleObj:
      events: {
        click: handleClick,
        mouseenter: handleMouseEnter,
        mouseleave: handleMouseLeave,
        touchstart: handleTouchStart, // todo passive
      },
    });
    this.slotChildren(props.slots?.prefix);
    this.addChild(
      new Input({
        id: props.id && props.id[0],
        refDom: inputRef,
        // name: name && name[0], // todo
        attrObj: {
          placeholder: props.startPlaceholder,
          value: props.modelValue && props.modelValue[0],
          class: nsRange.b('input'),
        },
        events: {
          input: handleStartInput,
          change: handleStartChange,
        },
      })
    );
    this.slotChildren(props.slots?.rangeSeparator);
    this.addChild(
      new Input({
        id: props.id && props.id[1],
        refDom: endInputRef,
        // name: name && name[1], // todo
        attrObj: {
          placeholder: props.endPlaceholder,
          value: props.modelValue && props.modelValue[1],
          class: nsRange.b('input'),
        },
        events: {
          input: handleEndInput,
          change: handleEndChange,
        },
      })
    );
    this.slotChildren(props.slots?.suffix);
  }
}
