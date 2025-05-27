import {
  Div,
  Fragment,
  inject,
  onMounted,
  TypeDiv,
  useResizeObserver,
} from '@type-dom/framework';
import { computed, signal, unref } from '@type-dom/signals';
import { useNamespace } from '../../../../hooks/use-namespace';
import { selectKey } from '../token';
import {
  ITdSelectDropdown,
  SelectDropdownProps,
} from './td-select-dropdown.interface';

export class TdSelectDropdown extends TypeDiv implements ITdSelectDropdown {
  className: 'TdSelectDropdown';
  override props: SelectDropdownProps;

  constructor(params: SelectDropdownProps = {}) {
    super();
    this.className = 'TdSelectDropdown';
    this.props = this.useParams(params);
  }

  override setup() {
    // console.log('TdSelectDropDown setup');
    const props = this.props;

    const select = inject(selectKey)!;
    const ns = useNamespace('select');

    // computed
    const popperClass = computed(() => unref(select.props.popperClass));
    const isMultiple = computed(() => unref(select.props.multiple));
    const isFitInputWidth = computed(() => unref(select.props.fitInputWidth));
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
        popperClass.get(),
      ])
    );
    this.style.addObj({
      [isFitInputWidth.get() ? 'width' : 'minWidth']: minWidth,
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
