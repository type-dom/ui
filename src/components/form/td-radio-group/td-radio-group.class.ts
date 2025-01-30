import { nextTick, onMounted, provide, TypeDiv } from '@type-dom/framework';
import {
  computed,
  Computed,
  signal,
  Signal,
  toRefs,
  watch,
} from '@type-dom/signals';
import { debugWarn } from '@type-dom/utils';
import { useId } from '../../../hooks/use-id';
import { useNamespace } from '../../../hooks/use-namespace';
import { UPDATE_MODEL_EVENT } from '../../../constants/event';
import { radioGroupKey } from '../td-radio/constants';
import {
  useFormItem,
  useFormItemInputId,
} from '../td-form/hooks/use-form-item';
import { ITdRadioGroup, RadioGroupProps } from './td-radio-group.interface';
import { radioGroupEmits, radioGroupProps } from './td-radio-group.const';
import './style/index';

export class TdRadioGroup extends TypeDiv implements ITdRadioGroup {
  className: 'TdRadioGroup';
  // modelValue?: IPrimitive | XProxy<IJsonData>;
  disabled?: boolean;
  // override childNodes: TdRadio[]; // todo content 如何设置子节点类型
  override props: RadioGroupProps;

  constructor(params: RadioGroupProps = {}) {
    super();
    this.className = 'TdRadioGroup';
    this.attr.addObj({
      name: 'td-radio-group',
    });
    this.assignProps(radioGroupProps);
    this.props = this.useParams(params);
    this.addEmits(radioGroupEmits);
  }

  override setup(): void {
    const props = this.props;
    const emit = this.emit;
    const ns = useNamespace('radio');
    const radioId = useId();
    const radioGroupRef = signal<HTMLDivElement>();
    const { formItem } = useFormItem();
    const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(
      props,
      {
        formItemContext: formItem,
      }
    );

    const changeEvent = (value: RadioGroupProps['modelValue']) => {
      emit(UPDATE_MODEL_EVENT, value);
      nextTick(() => emit('change', value));
    };

    onMounted(() => {
      const radios = radioGroupRef
        .get()
        ?.querySelectorAll<HTMLInputElement>('[type=radio]');
      const firstLabel = radios?.[0];
      if (
        radios &&
        !Array.from(radios).some((radio) => radio.checked) &&
        firstLabel
      ) {
        firstLabel.tabIndex = 0;
      }
    });

    const name = computed<string>(() => {
      return props.name || radioId.get();
    });

    provide(radioGroupKey, {
      ...props,
      changeEvent,
      name: name.get() as string,
    });

    watch(
      () => props.vModel?.get(),
      () => {
        if (props.validateEvent) {
          formItem?.validate('change').catch((err) => debugWarn(err));
        }
      }
    );

    this.assignProps({
      id: groupId,
      refDom: radioGroupRef,
    });
    this.attr.addObj({
      class: ns.b('group'),
      role: 'radiogroup',
      ariaLabel: !isLabeledByFormItem.get()
        ? props.ariaLabel || 'radio-group'
        : undefined,
      ariaLabelledby: isLabeledByFormItem.get() ? formItem?.labelId : undefined,
    });
    this.slotChildren(props.slot || props.slots?.default);
  }
}
