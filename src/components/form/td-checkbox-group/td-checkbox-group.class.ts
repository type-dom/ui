import { nextTick, TypeHtml } from '@type-dom/framework';
import { debugWarn, pick } from '@type-dom/utils';
import { computed, isRef, Signal, toRefs, watch } from '@type-dom/signals';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { useNamespace } from '../../../hooks/use-namespace';
import { checkboxGroupContextKey } from '../td-checkbox/td-checkbox.const';
import {
  useFormItem,
  useFormItemInputId,
} from '../td-form/hooks/use-form-item';
import {
  CheckboxGroupValueType,
  ITdCheckboxGroup,
  ITdCheckboxGroupConfig,
} from './td-checkbox-group.interface';
import {
  checkboxGroupEmits,
  checkboxGroupProps,
} from './td-checkbox-group.const';
import './style/index';

export class TdCheckboxGroup extends TypeHtml implements ITdCheckboxGroup {
  className: 'TdCheckboxGroup';
  dom?: HTMLElement;
  override props: ITdCheckboxGroupConfig;

  constructor(params: ITdCheckboxGroupConfig = {}) {
    super();
    this.className = 'TdCheckboxGroup';
    this.assignProps(checkboxGroupProps);
    this.addEmits(checkboxGroupEmits);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const ns = useNamespace('checkbox');

    const { formItem } = useFormItem();
    const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(
      props,
      {
        formItemContext: formItem,
      }
    );
    this.assignProps({
      nodeName: props.tag,
    });
    this.attr.addObj({
      id: groupId.get(),
      role: 'group',
      class: ns.b('group'),
      ariaLabel: !isLabeledByFormItem
        ? props.ariaLabel || 'checkbox-group'
        : undefined,
      ariaLabelledby: isLabeledByFormItem ? formItem?.labelId : undefined,
    });
    this.slotChildren(props.slot);
    const changeEvent = async (value: CheckboxGroupValueType) => {
      console.warn('td-check-group changeEvent, value is ', value);
      this.emit(UPDATE_MODEL_EVENT, value);
      await nextTick();
      this.emit('change', value);
    };

    const modelValue = computed({
      get() {
        // return props.modelValue; // 无法触发监听
        return props.vModel?.get();
      },
      set(val: CheckboxGroupValueType) {
        console.warn('modelValue', val);
        changeEvent(val);
      },
    });

    console.log('then provide checkboxGroupContext . ');
    this.provide(checkboxGroupContextKey, {
      ...pick(toRefs(props), [
        'size',
        'min',
        'max',
        'disabled',
        'validateEvent',
        'fill',
        'textColor',
      ]),
      modelValue,
      changeEvent,
    });

    if (props.vModel) {
      watch(
        () => props.vModel?.get(), // props.modelValue 无法促发监听
        () => {
          if (props.validateEvent) {
            formItem?.validate('change').catch((err) => debugWarn(err));
          }
        }
      );
    }
  }
}
