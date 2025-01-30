import {
  Div,
  Fragment,
  inject,
  onMounted,
  TypeDiv,
  useResizeObserver,
} from '@type-dom/framework';
import { computed, signal } from '@type-dom/signals';
import { useNamespace } from '../../../../hooks/use-namespace';
import {
  ITdSelectDropdown,
  SelectDropdownProps,
} from './td-select-dropdown.interface';
import { selectKey } from '../token';

export class TdSelectDropDown extends TypeDiv implements ITdSelectDropdown {
  className: 'TdSelectDropdown';
  override props: SelectDropdownProps;

  constructor(params: SelectDropdownProps = {}) {
    super();
    this.className = 'TdSelectDropdown';
    this.props = this.useParams(params);
  }

  override setup() {
    console.log('TdSelectDropDown setup');
    const props = this.props;
    const select = inject(selectKey)!;
    const ns = useNamespace('select');

    // computed
    const popperClass = computed(() => select.props.popperClass);
    const isMultiple = computed(() => select.props.multiple);
    const isFitInputWidth = computed(() => select.props.fitInputWidth);
    const minWidth = signal('');

    function updateMinWidth() {
      minWidth.set(`${select.selectRef?.get()?.offsetWidth}px`);
    }

    onMounted(() => {
      // TODO: updatePopper
      // popper.value.update()
      updateMinWidth();
      useResizeObserver(select.selectRef, updateMinWidth);
    });

    this.attr.addClass(
      computed(() => [
        ns.b('dropdown'),
        ns.is('multiple', isMultiple.get()),
        popperClass,
      ])
    );
    this.style.addObj({
      [isFitInputWidth ? 'width' : 'minWidth']: minWidth,
    });
    this.addChildren(
      new Div({
        vIf: props.slots?.header,
        class: ns.be('dropdown', 'header'),
        slot: props.slots?.header,
      }),
      new Fragment({
        slot: props.slot ?? props.slots?.default,
      }),
      new Div({
        vIf: props.slots?.footer,
        class: ns.be('dropdown', 'footer'),
        slot: props.slots?.footer,
      })
    );
  }
}
