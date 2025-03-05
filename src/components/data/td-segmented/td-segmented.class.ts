import {
  Div,
  For,
  Input,
  Label,
  TypeFragment,
  onMounted,
  useActiveElement,
  useResizeObserver, Fragment, nextTick
} from '@type-dom/framework';
import {
  computed,
  effect,
  signal,
  toSignals,
  unref,
  watch,
} from '@type-dom/signals';
import { debugWarn, isObject } from '@type-dom/utils';
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants/event';
import { useNamespace } from '../../../hooks/use-namespace';
import { useId } from '../../../hooks/use-id';
import {
  useFormDisabled,
  useFormSize,
} from '../../form/td-form/hooks/use-form-common-props';
import {
  useFormItem,
  useFormItemInputId,
} from '../../form/td-form/hooks/use-form-item';
import { ITdSegmented, SegmentedProps, Option } from './td-segmented.interface';
import { segmentedEmits, segmentedProps } from './td-segmented.const';
import './style/index';

export class TdSegmented extends TypeFragment implements ITdSegmented {
  className: 'TdSegmented';
  override props: SegmentedProps;

  constructor(params: SegmentedProps = {}) {
    super();
    this.className = 'TdSegmented';

    this.addEmits(segmentedEmits);
    this.assignProps(segmentedProps);
    this.props = this.useParams(params);
  }

  override setup() {
    // console.log('TdSegmented created');
    const props = this.props;
    const emit = this.emit;

    const ns = useNamespace('segmented');
    const segmentedId = useId();
    const segmentedSize = useFormSize();
    const _disabled = useFormDisabled();
    const { formItem } = useFormItem();
    const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
      formItemContext: formItem,
    });

    const segmentedRef = signal<Div | undefined>(undefined);
    const activeElement = useActiveElement();

    const state = toSignals({
      isInit: false as boolean,
      width: 0,
      height: 0,
      translateX: 0,
      translateY: 0,
      focusVisible: false as boolean,
    });

    const handleChange = (item: Option) => {
      // console.warn('handleChange . item is ', item);
      const value = getValue(item);
      emit(UPDATE_MODEL_EVENT, value);
      emit(CHANGE_EVENT, value);
    };

    const getValue = (item: Option) => {
      return isObject(item) ? item.value : item;
    };

    const getLabel = (item: Option) => {
      return isObject(item) ? item.label : (item as string);
    };

    const getDisabled = (item: Option) => {
      return !!(_disabled.get() || (isObject(item) ? item.disabled : false));
    };

    const getSelected = (item: Option) => {
      return props.vModel?.get() === getValue(item);
    };

    const getOption = (value: any) => {
      return props.options?.find((item) => getValue(item) === value);
    };

    const getItemCls = (item: Option) => {
      return computed(() => [
        ns.e('item'),
        ns.is('selected', getSelected(item)),
        ns.is('disabled', getDisabled(item)),
      ]);
    };

    const updateSelect = () => {
      // console.warn('updateSelect . ');
      if (!segmentedRef.get()) return;
      // 这一步有问题； is-selected 样式有异步。应该直接根据vModel的值匹配
      // const selectedItem = segmentedRef.get()?.querySelector(
      //   '.is-selected'
      // ) as HTMLElement
      // const selectedItemInput = segmentedRef.get()?.querySelector(
      //   '.is-selected input'
      // ) as HTMLElement
      const selectedEl = this.down(
        'attrObj.value',
        props.vModel?.get()
      ) as Label;
      // console.log('selectedItem is ', selectedEl);
      // todo watch 触发时，dom 未必已经创建。
      const selectedItem = selectedEl?.dom;
      const selectedItemInput = selectedEl?.dom?.querySelector?.('input');
      if (!selectedItem || !selectedItemInput) {
        state.width.set(0);
        state.height.set(0);
        state.translateX.set(0);
        state.translateY.set(0);
        state.focusVisible.set(false);
        return;
      }
      const rect = selectedItem.getBoundingClientRect();
      state.isInit.set(true);
      if (unref(props.direction) === 'vertical') {
        state.height.set(rect.height);
        state.translateY.set(selectedItem.offsetTop);
      } else {
        state.width.set(rect.width);
        state.translateX.set(selectedItem.offsetLeft);
      }
      try {
        // This will failed in test
        state.focusVisible.set(selectedItemInput.matches(':focus-visible'));
      } catch(err) {
        console.error('selectedItemInput.matches is not supported', err);
      }
    };

    const segmentedCls = computed(() => [
      ns.b(),
      ns.m(segmentedSize.get()),
      ns.is('block', props.block),
    ]);

    const selectedStyle = {
      width: computed(() =>
        unref(props.direction) === 'vertical'
          ? '100%'
          : `${state.width.get()}px`
      ),
      height: computed(() =>
        unref(props.direction) === 'vertical'
          ? `${state.height.get()}px`
          : '100%'
      ),
      transform: computed(() =>
        unref(props.direction) === 'vertical'
          ? `translateY(${state.translateY.get()}px)`
          : `translateX(${state.translateX.get()}px)`
      ),
      display: computed(() => (state.isInit.get() ? 'block' : 'none')),
    };

    const selectedCls = computed(() => [
      ns.e('item-selected'),
      ns.is('disabled', getDisabled(getOption(props.vModel?.get()))),
      ns.is('focus-visible', state.focusVisible.get()),
    ]);

    const name = computed(() => {
      return props.name || segmentedId.get();
    });

    this.addChild(
      new Div({
        vIf: props.options?.length,
        refEl: segmentedRef,
        class: segmentedCls,
        styleObj: props.styleObj, // 父组件传入的样式
        attrObj: {
          name: 'td-segmented',
          id: inputId.get(),
          role: 'radiogroup',
          ariaLabel: isLabeledByFormItem.get()
            ? props.ariaLabel || 'segmented'
            : undefined,
          ariaLabelledby: isLabeledByFormItem.get()
            ? formItem!.labelId
            : undefined,
        },
        slot: new Div({
          class: computed(() => [ns.e('group'), ns.m(unref(props.direction))]),
          slot: [
            new Div({
              styleObj: selectedStyle,
              class: selectedCls,
            }),
            new Fragment({
              slot: props.options?.map((item) => {
                return new Label({
                  class: getItemCls(item),
                  attrObj: {
                    value: getValue(item),
                  },
                  slot: [
                    new Input({
                      attrObj: {
                        class: ns.e('item-input'),
                        type: 'radio',
                        name: name.get(),
                        checked: getSelected(item),
                        disabled: getDisabled(item),
                      },
                      events: {
                        change: () => handleChange(item),
                      },
                    }),
                    new Div({
                      class: ns.e('item-label'),
                      slot:
                        isObject(item) && item.slot ? item.slot : getLabel(item),
                    }),
                  ],
                });
              }),
            })
          ],
        }),
      })
    );

    useResizeObserver(segmentedRef.get()?.dom, updateSelect);

    watch(activeElement, updateSelect);

    onMounted(() => {
      // console.error('onMounted . ');
      // add by me
      // 不加初始化时选中样式不加载
      nextTick(() => {
        updateSelect();
      })
    });

    watch(props.vModel,
      () => {
        updateSelect();
        if (props.validateEvent) {
          formItem?.validate?.('change').catch((err) => debugWarn(err));
        }
      },
      {
        immediate: true,
      }
    );
  }
}
