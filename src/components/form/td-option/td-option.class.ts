import {
  TypeLI,
  Span,
  getCurrentInstance,
  onBeforeUnmount,
  nextTick,
  defineExpose,
} from '@type-dom/framework';
import { computed, Signal, toRefs, toSignals, unref } from '@type-dom/signals';
import { ITdOption, TdOptionProps } from './td-option.interface';
import { useNamespace } from '../../../hooks/use-namespace';
import { useId } from '../../../hooks/use-id';
import { SelectOptionProxy } from '../td-select/td-select.interface';
import { useOption } from './useOption';
import './style/index';

export class TdOption extends TypeLI implements ITdOption {
  className: 'TdOption';
  override props: TdOptionProps;
  visible?: Signal<boolean>;

  constructor(params: TdOptionProps = {}) {
    super();
    this.className = 'TdOption';
    this.attr.addObj({
      name: 'td-option',
      role: 'option',
    });

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;

    const ns = useNamespace('select');
    const id = useId();

    const containerKls = computed(() => [
      ns.be('dropdown', 'item'),
      ns.is('disabled', unref(isDisabled)),
      ns.is('selected', unref(itemSelected)),
      ns.is('hovering', unref(hover)),
    ]);

    const states = {
      index: -1,
      groupDisabled: false,
      visible: true,
      hover: false,
    };

    const {
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      hoverItem,
      updateOption,
    } = useOption(props, states);

    const { visible, hover } = toSignals(states);

    // todo
    // const vm = getCurrentInstance().proxy as unknown as SelectOptionProxy

    // select.onOptionCreate(vm);

    onBeforeUnmount(() => {
      // const key = vm.value
      // const { selected: selectedOptions } = select.states
      // const doesSelected = selectedOptions.some((item) => {
      //   return item.value === vm.value
      // })
      // // if option is not selected, remove it from cache
      // nextTick(() => {
      //   if (select.states.cachedOptions.get(key) === vm && !doesSelected) {
      //     select.states.cachedOptions.delete(key)
      //   }
      // })
      // select.onOptionDestroy(key, vm)
    });

    function selectOptionClick() {
      if (!isDisabled.get()) {
        // select.handleOptionSelect(vm)
      }
    }

    this.assignProps({
      vShow: visible,
    });
    this.attr.addObj({
      id: id.get(),
      class: containerKls,
      role: 'option',
      ariaDisabled: isDisabled.get() || undefined,
      ariaSelected: itemSelected.get(),
    });
    this.addEvents({
      mousemove: hoverItem,
      click: (evt) => {
        selectOptionClick(), evt?.stopPropagation();
      },
    });
    this.slotChildren(
      props.slot ||
        props.slots?.default ||
        new Span({
          slot: currentLabel,
        })
    );

    defineExpose({
      visible,
      hover,
      selectOptionClick,
      states,
      isDisabled,
      select,
    });
  }
}
