import {
  TypeLI,
  Span,
  getCurrentInstance,
  onBeforeUnmount,
  nextTick,
  defineExpose,
} from '@type-dom/framework';
import { Computed, Signal, signal, computed, unref } from '@type-dom/signals';
import { useNamespace, UseNamespaceReturn } from '../../../hooks/use-namespace';
import { useId } from '../../../hooks/use-id';
import { SelectContext } from '../td-select/td-select.interface';
import { useOption } from './useOption';
import { ITdOption, OptionStates, TdOptionProps } from './td-option.interface';
import './style/index';

export class TdOption extends TypeLI implements ITdOption {
  className: 'TdOption';
  override props: TdOptionProps;
  value: string | number | boolean | object;
  ns?: UseNamespaceReturn;
  // override id?: Ref<string>;
  containerKls?:  Computed<string[]>;
  currentLabel?: Computed<string | number | boolean | undefined>;
  itemSelected?: Computed<boolean>;
  isDisabled?: Computed<boolean>;
  select?: SelectContext;
  hoverItem?: () => void;
  updateOption?: (query: string) => void;
  visible?: Signal<boolean | undefined>;
  hover?: Signal<boolean>;
  selectOptionClick?: () => void;
  states?: OptionStates;

  constructor(params: TdOptionProps = {}) {
    super();
    this.className = 'TdOption';
    this.attr.addObj({
      name: 'td-option',
      role: 'option',
    });

    this.value = params.value ?? params.label ?? '';
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

    const states: OptionStates = {
      index: signal(-1),
      groupDisabled: signal(false),
      visible: signal(true),
      hover: signal(false),
    };

    const {
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      hoverItem,
      updateOption,
    } = useOption(props, states);

    const { visible, hover } = states; // toSignals(states);

    // todo  vm is this
    const vm = getCurrentInstance() as TdOption; //.proxy as unknown as SelectOptionProxy
    // console.warn('td-option then onOptionCreate vm ', vm);
    select.onOptionCreate(this);

    onBeforeUnmount(() => {
      const key = unref(props.value);
      const { selected: selectedOptions } = select.states;
      const doesSelected = selectedOptions.some((item: any) => {
        return item.value === unref(props.value);
      });
      // if option is not selected, remove it from cache
      nextTick(() => {
        if (select.states.cachedOptions.get(key) === this && !doesSelected) {
          select.states.cachedOptions.delete(key);
        }
      });
      select.onOptionDestroy(key, this);
    });

    function selectOptionClick() {
      if (!isDisabled.get()) {
        select.handleOptionSelect(vm);
      }
    }
    defineExpose({
      ns,
      id,
      containerKls,
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      visible,
      hover,
      states,

      hoverItem,
      updateOption,
      selectOptionClick,
    });

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
        console.warn('td-option click . ');
        selectOptionClick();
        evt?.stopPropagation();
      },
    });
    this.slotChildren(
      props.slot ??
        props.slots?.default ??
        new Span({
          slot: currentLabel,
        })
    );
  }
}
