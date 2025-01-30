import { Input, Span, TypeHtml, useSlots } from '@type-dom/framework';
import { isArray } from '@type-dom/utils';
import { computed, unref } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { useCheckbox } from './composables/use-checkbox';
import { ITdCheckbox, CheckboxProps } from './td-checkbox.interface';
import { checkboxEmits, checkboxProps } from './td-checkbox.const';
import './style/index';

export class TdCheckbox extends TypeHtml implements ITdCheckbox {
  className: 'TdCheckbox';
  dom?: HTMLElement;
  // content: XElement;
  override props: CheckboxProps;

  constructor(params: CheckboxProps = {}) {
    super(); // label | span
    this.className = 'TdCheckbox';
    this.attr.addObj({
      name: 'td-checkbox',
    });
    this.assignProps(checkboxProps);
    this.addEmits(checkboxEmits);
    this.props = this.useParams(params);
  }

  override setup() {
    console.warn('TdCheckbox setup');
    const props = this.props;
    const slots = useSlots();
    const {
      inputId,
      isLabeledByFormItem,
      isChecked,
      isDisabled,
      isFocused,
      checkboxSize,
      hasOwnLabel,
      model,
      actualValue,
      handleChange,
      onClickRoot,
    } = useCheckbox(props, slots);
    // console.log('hasOwnLabel is ', hasOwnLabel);
    this.assignProps({
      nodeName: !hasOwnLabel && isLabeledByFormItem ? 'span' : 'label',
    });
    const ns = useNamespace('checkbox');
    console.warn('isChecked is ', isChecked);
    const compKls = computed(() => [
      ns.b(),
      ns.m(checkboxSize.get()),
      ns.is('disabled', isDisabled.get()),
      ns.is('checked', isChecked.get()),
      ns.is('bordered', props.border),
    ]);
    // console.warn('compKls is ', compKls);
    this.attr.addClass(compKls);
    // watch(compKls, (newValue, oldValue) => {
    //   console.warn('checkbox watch compKls', newValue);
    // });
    const spanKls = computed(() => {
      return [
        ns.e('input'),
        ns.is('disabled', isDisabled.get()),
        ns.is('checked', isChecked.get()),
        ns.is('indeterminate', props.indeterminate?.get()),
        ns.is('focus', isFocused.get()),
      ];
    });
    // console.warn('spanKls is ', spanKls);
    this.addChild(
      new Span({
        name: 'td-checkbox-input-span',
        class: spanKls,
        slot: [
          new Input({
            name: 'original',
            vModel: model,
            disabled: isDisabled,
            class: ns.e('original'),
            attrObj: {
              id: inputId.get(),
              type: 'checkbox',
              value: actualValue.get(),
              checked: isChecked.get(),
              intermediate: props.indeterminate?.get(),
            },
            events: {
              click: (ev) => {
                console.warn('td-checkbox input click . ');
                ev?.stopPropagation();
              },
              change: (ev) => {
                console.warn('td-checkbox input change . ');
                handleChange(ev);
                ev?.stopPropagation();
              },
              focus: (evt) => {
                isFocused.set(true);
              },
              blur: (evt) => {
                isFocused.set(false);
              },
            },
          }),
          new Span({
            name: 'inner',
            attrObj: {
              class: ns.e('inner'),
            },
          }),
        ],
      })
    );
    if (hasOwnLabel) {
      const labelSpan = new Span({
        name: 'label',
        attrObj: {
          class: ns.e('label'),
        },
        // styleObj: deepClone($checkboxLabelStyle),
      });
      if (props?.slot) {
        labelSpan.slotChildren(props.slot);
      } else {
        labelSpan.slotChildren(String(props.label || ''));
      }
      this.addChild(labelSpan);
    }
    this.addEvents({
      click: onClickRoot,
    });
    // add by me todo why should add ???
    this.addEmits({
      change: (newValue) => {
        console.warn('change emit , newValue is ', newValue);
        const selected = model.get();
        // todo 数组 还是 值
        if (isArray(selected)) {
          model.set(
            selected.includes(actualValue.get())
              ? selected.filter((item) => item !== actualValue.get())
              : [...selected, actualValue.get()]
          );
        } else {
          model.set(newValue);
        }
      },
    });
  }
}
