import { TypeSpan } from '@type-dom/framework';
import { computed, unref } from '@type-dom/signals';
import { CHANGE_EVENT } from '../../../constants/event';
import { useNamespace } from '../../../hooks/use-namespace';
import { ITdCheckTag, CheckTagProps } from './td-check-tag.interface';
import { checkTagEmits, checkTagProps } from './td-check-tag.const';
import './style/index';

export class TdCheckTag extends TypeSpan implements ITdCheckTag {
  className: 'TdCheckTag';
  override props: CheckTagProps;

  constructor(params: CheckTagProps = {}) {
    super();
    this.className = 'TdCheckTag';
    this.attr.addName('td-check-tag');

    this.addEmits(checkTagEmits);
    this.assignProps(checkTagProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;

    const ns = useNamespace('check-tag');
    const isDisabled = computed(() => props.disabled as boolean);
    const containerKls = computed(() => [
      ns.b(),
      ns.is('checked', unref(props.checked)),
      ns.is('disabled', isDisabled.get()),
      ns.m(props.type || 'primary'),
    ]);

    const handleChange = () => {
      if (isDisabled.get()) {
        return;
      }
      const checked = !unref(props.checked);
      emit(CHANGE_EVENT, checked);
      emit('update:checked', checked);
    };

    this.attr.addClass(containerKls);
    this.addEvents({
      click: handleChange,
    });
    this.slotChildren(props.slot || props.slots?.default);
  }
}
