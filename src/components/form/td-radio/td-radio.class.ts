import { Input, nextTick, Span, TypeLabel } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { radioEmits } from './td-radio.const';
import { ITdRadio, RadioProps } from './td-radio.interface';
import { useRadio } from './use-radio';
import './style/index';
import { isArray } from '@type-dom/utils';

export class TdRadio extends TypeLabel implements ITdRadio {
  className: 'TdRadio';
  override props: RadioProps;

  constructor(params = {} as RadioProps) {
    super();
    this.className = 'TdRadio';

    this.attr.addObj({
      name: 'td-radio',
    });
    this.addEmits(radioEmits);
    this.props = this.useParams(params);
  }

  override setup(): void {
    const props = this.props;
    const emit = this.emit;
    const ns = useNamespace('radio');
    const {
      radioRef,
      radioGroup,
      focus,
      size,
      disabled,
      modelValue,
      actualValue,
    } = useRadio(props, emit);

    function handleChange() {
      // console.warn('handleChange . modelValue.get() is ', modelValue.get());
      modelValue.set(actualValue.get()); // add by me todo refine  value绑定的问题
      // todo 值没有变
      nextTick(() => emit('change', modelValue.get()));
    }

    this.attr.addClass(
      computed(() => [
        ns.b(),
        ns.is('disabled', disabled.get()),
        ns.is('focus', focus.get()),
        ns.is('bordered', props.border),
        ns.is('checked', modelValue.get() === actualValue.get()),
        ns.m(size.get()),
      ])
    );
    this.addChild(
      new Span({
        class: computed(() => [
          ns.e('input'),
          ns.is('disabled', disabled.get()),
          ns.is('checked', modelValue.get() === actualValue.get()),
        ]),
        slot: [
          new Input({
            refDom: radioRef,
            vModel: modelValue,
            class: ns.e('original'),
            attrObj: {
              type: 'radio',
              value: actualValue.get(),
              name: props.name || radioGroup?.name,
              disabled: disabled.get(),
              checked: computed(() => modelValue.get() === actualValue.get()),
            },
            events: {
              focus: () => focus.set(true),
              blur: () => focus.set(false),
              change: (ev) => {
                // console.warn('td-radio input change . ');
                handleChange();
                ev?.stopPropagation(); // todo must add stopPropagation
              },
              click: (evt) => evt?.stopPropagation(),
            },
          }),
          new Span({
            class: ns.e('inner'),
          }),
        ],
      })
    );
    this.addChild(
      new Span({
        class: ns.e('label'),
        events: {
          keydown: (evt) => evt?.stopPropagation(),
        },
        slot: props.slot || props.slots?.default || props.label,
      })
    );

    // add by me
    // this.addEmits({
    //   change: (newValue) => {
    //     // newValue is true or false,
    //     console.warn('change emit , newValue is ', newValue);
    //     modelValue.set(newValue);
    //     // props.vModel?.set(newValue);
    //     // todo 应该向上触发的
    //     // radioGroup.vModel?.set(newValue);
    //   }
    // });
  }
}
