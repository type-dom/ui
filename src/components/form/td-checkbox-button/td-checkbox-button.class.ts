import { computed } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import {
  Input,
  TypeProps,
  TypeLabelProps,
  Span,
  TextNode,
  TypeLabel,
  useSlots,
} from '@type-dom/framework';
import { useNamespace } from '../../../hooks/use-namespace';
import {
  checkboxEmits,
  checkboxGroupContextKey,
  checkboxProps,
} from '../td-checkbox/td-checkbox.const';
import { useCheckbox } from '../td-checkbox/composables/use-checkbox';
import { CheckboxProps } from '../td-checkbox/td-checkbox.interface';
import { ITdCheckboxButton } from './td-checkbox-button.interface';
import './style/index';
import { isArray } from '@type-dom/utils';

export class TdCheckboxButton extends TypeLabel implements ITdCheckboxButton {
  className: 'TdCheckboxButton';
  override props: CheckboxProps & TypeLabelProps;

  constructor(params: CheckboxProps = {}) {
    super(); // label | span
    this.className = 'TdCheckboxButton';
    this.attr.addObj({
      name: 'td-checkbox-button',
    });
    this.assignProps(checkboxProps);
    this.addEmits(checkboxEmits);
    this.props = this.useParams(params) as CheckboxProps & TypeLabelProps;
  }

  override setup() {
    const props = this.props;
    const slots = useSlots();

    const {
      isFocused,
      isChecked,
      isDisabled,
      checkboxButtonSize,
      model,
      actualValue,
      handleChange,
    } = useCheckbox(props, slots);
    const checkboxGroup = this.inject(checkboxGroupContextKey, undefined);
    const ns = useNamespace('checkbox');

    const activeStyle = computed<IStyle>(() => {
      const fillValue = checkboxGroup?.fill?.get() ?? '';
      return {
        backgroundColor: fillValue,
        borderColor: fillValue,
        color: checkboxGroup?.textColor?.get() ?? '',
        boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : undefined,
      };
    });

    const labelKls = computed(() => {
      return [
        ns.b('button'),
        ns.bm('button', checkboxButtonSize.get()),
        ns.is('disabled', isDisabled.get()),
        ns.is('checked', isChecked.get()),
        ns.is('focus', isFocused.get()),
      ];
    });

    this.attr.addClass(labelKls);
    if (
      props.trueValue ||
      props.falseValue ||
      props.trueLabel ||
      props.falseLabel
    ) {
      this.addChild(
        new Input({
          vModel: model,
          class: ns.be('button', 'original'),
          name: props.name,
          disabled: isDisabled,
          trueValue: props.trueValue ?? this.props.trueValue ?? true,
          falseValue: props.falseValue ?? this.props.falseValue ?? false,
          attrObj: {
            type: 'checkbox',
            tabindex: props.tabindex,
          },
          events: {
            change: (ev) => {
              handleChange(ev);
              ev?.stopPropagation();
            },
            focus: () => {
              isFocused.set(true);
            },
            blur: () => {
              isFocused.set(false);
            },
            click: (evt) => {
              evt?.stopPropagation();
            },
          },
        })
      );
    } else {
      this.addChild(
        new Input({
          vModel: model,
          class: ns.be('button', 'original'),
          name: props.name,
          disabled: isDisabled,
          value: actualValue,
          attrObj: {
            type: 'checkbox',
            // checked: isChecked.get(),
            tabindex: props.tabindex,
          },
          events: {
            change: (evt) => {
              handleChange(evt);
              evt?.stopPropagation(); // 必须加这个，否则会再触发一次上层的 change todo ????
            },
            focus: () => {
              isFocused.set(true);
            },
            blur: () => {
              isFocused.set(false);
            },
            click: (evt) => {
              evt?.stopPropagation();
            },
          },
        })
      );
    }
    if (props.slot || slots?.default || props.label) {
      this.addChild(
        new Span({
          class: ns.be('button', 'inner'),
          styleObj: isChecked ? activeStyle : undefined,
          slot: this.props.slot || slots?.default || props.label,
        })
      );
    }
    // add by me
    this.addEmits({
      change: (newValue) => {
        console.warn('change emit , newValue is ', newValue);
        const selected = model.get();
        // todo 数组 还时 值
        if (isArray(selected)) {
          model?.set(
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
