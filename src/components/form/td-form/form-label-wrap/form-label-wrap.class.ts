import {
  Div,
  inject,
  TypeFragmentProps,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  TypeFragment,
  useResizeObserver,
  useSlots,
} from '@type-dom/framework';
import { computed, signal, watch } from '@type-dom/signals';
import { throwError } from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';
import { useNamespace } from '../../../../hooks/use-namespace';
import { formContextKey, formItemContextKey } from '../td-form.const';

interface FormLabelWrapProps extends TypeFragmentProps {
  isAutoWidth: boolean;
  updateAll: boolean;
}

const COMPONENT_NAME = 'TdLabelWrap';

/**
 * auto width 时，会自动计算宽度，并通知父元素更新宽度；
 */
export class FormLabelWrap extends TypeFragment {
  className: 'FormLabelWrap';
  override props: FormLabelWrapProps;

  constructor(params: FormLabelWrapProps) {
    super();
    this.className = 'FormLabelWrap';

    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const slots = useSlots();
    const formContext = inject(formContextKey, undefined);
    const formItemContext = inject(formItemContextKey);
    if (!formItemContext)
      throwError(
        COMPONENT_NAME,
        'usage: <el-form-item><label-wrap /></el-form-item>'
      );

    const ns = useNamespace('form');

    const el = signal<HTMLElement>();
    const computedWidth = signal(0);

    const getLabelWidth = () => {
      if (el.get()?.firstElementChild) {
        const width = window.getComputedStyle(
          el.get()?.firstElementChild!
        ).width;
        return Math.ceil(Number.parseFloat(width));
      } else {
        return 0;
      }
    };

    const updateLabelWidth = (action: 'update' | 'remove' = 'update') => {
      nextTick(() => {
        if ((props.slot || slots?.default) && props.isAutoWidth) {
          if (action === 'update') {
            computedWidth.set(getLabelWidth());
          } else if (action === 'remove') {
            formContext?.deregisterLabelWidth(computedWidth.get());
          }
        }
      });
    };
    const updateLabelWidthFn = () => updateLabelWidth('update');

    onMounted(() => {
      updateLabelWidthFn();
    });
    onBeforeUnmount(() => {
      updateLabelWidth('remove');
    });
    onUpdated(() => updateLabelWidthFn());

    watch(() => computedWidth.get(), (val, oldVal) => {
      if (props.updateAll) {
        formContext?.registerLabelWidth(val, oldVal);
      }
    });

    useResizeObserver(
      computed(
        () => (el.get()?.firstElementChild) as HTMLElement
      ),
      updateLabelWidthFn
    );
    if (!props.slot && !slots?.default) {
      return;
    }
    const { isAutoWidth } = props;
    if (isAutoWidth) {
      const autoLabelWidth = formContext?.autoLabelWidth;
      const hasLabel = formItemContext?.hasLabel;
      const style: IStyle = {};
      if (hasLabel && autoLabelWidth && autoLabelWidth.get() !== 'auto') {
        const marginWidth = Math.max(
          0,
          Number.parseInt(autoLabelWidth.get(), 10) - computedWidth.get()
        );
        const labelPosition =
          formItemContext.labelPosition || formContext.labelPosition;

        const marginPosition =
          labelPosition === 'left' ? 'marginRight' : 'marginLeft';

        if (marginWidth) {
          style[marginPosition] = `${marginWidth}px`;
        }
      }
      this.addChild(
        new Div({
          refDom: el,
          class: [ns.be('item', 'label-wrap')],
          styleObj: style,
          slot: props.slot || slots?.default,
        })
      );
    } else {
      this.assignProps({
        refDom: el,
      });
      this.slotChildren(props.slot || slots?.default);
    }
  }
}
