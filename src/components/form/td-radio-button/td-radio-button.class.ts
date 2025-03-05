import { Input, nextTick, Span, TypeLabel } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { useNamespace } from '../../../hooks/use-namespace';
import { useRadio } from '../td-radio/use-radio';
import { ITdRadioButton, RadioButtonProps } from './td-radio-button.interface';
import './style/index';

export class TdRadioButton extends TypeLabel implements ITdRadioButton {
  className: 'TdRadioButton';
  override props: RadioButtonProps;

  constructor(params: RadioButtonProps = {}) {
    super();
    this.className = 'TdRadioButton';
    this.attr.addName('td-radio-button');

    this.props = this.useParams(params);
  }

  override setup(): void {
    const props = this.props;
    const emit = this.emit;

    const ns = useNamespace('radio');
    const {
      radioRef,
      focus,
      size,
      disabled,
      modelValue,
      radioGroup,
      actualValue,
    } = useRadio(props);

    const activeStyle = computed<IStyle>(() => {
      return {
        backgroundColor: radioGroup?.fill || '',
        borderColor: radioGroup?.fill || '',
        boxShadow: radioGroup?.fill ? `-1px 0 0 0 ${radioGroup.fill}` : '',
        color: radioGroup?.textColor || '',
      };
    });
    this.attr.addClass(
      computed(() => [
        ns.b('button'),
        ns.is('active', modelValue.get() === actualValue.get()),
        ns.is('disabled', disabled.get()),
        ns.is('focus', focus.get()),
        ns.bm('button', size.get()),
      ])
    );
    this.addChildren(
      new Input({
        refDom: radioRef,
        vModel: modelValue,
        attrObj: {
          class: ns.be('button', 'original-radio'),
          value: actualValue.get(),
          type: 'radio',
          name: computed(() => props.name || radioGroup?.name || ''),
          disabled: disabled.get(),
        },
        events: {
          focus: () => focus.set(true),
          blur: () => focus.set(false),
          click: (evt) => {
            handleChange(); // add by me todo
            evt?.stopPropagation();
          },
        },
      }),
      new Span({
        class: ns.be('button', 'inner'),
        styleObj: computed(() =>
          modelValue.get() === actualValue.get() ? activeStyle.get() : {}
        ),
        events: {
          keydown: (evt) => evt?.stopPropagation(),
        },
        slot: props.slot || props.slots?.default || props.label,
      })
    );

    // add by me
    function handleChange() {
      // console.warn('handleChange . modelValue.get() is ', modelValue.get());
      modelValue.set(actualValue.get()); // add by me todo refine  value绑定的问题
      // todo 值没有变
      nextTick(() => emit('change', modelValue.get()));
    }
  }
}
