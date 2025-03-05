import {
  Div,
  Transition,
  TypeFragment,
} from '@type-dom/framework';
import { ElCaretTopSvg } from '@type-dom/svgs';
import { computed } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { ITdBackTop, BacktopProps } from './td-backtop.interface';
import { backtopEmits, backtopProps } from './td-backtop.const';
import { useBackTop } from './use-backtop';
import './style/index';

export class TdBackTop extends TypeFragment implements ITdBackTop {
  className: 'TdBackTop';
  override props: BacktopProps;

  constructor(params: BacktopProps = {}) {
    super(); // 要传 params， 否则 el 无法定位。
    this.className = 'TdBackTop';

    this.addEmits(backtopEmits);
    this.assignProps(backtopProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const COMPONENT_NAME = 'TdBacktop';

    const props = this.props;
    const emit = this.emit;

    const ns = useNamespace('backtop');

    const { handleClick, visible } = useBackTop(props, emit, COMPONENT_NAME);

    const backTopStyle = computed(() => ({
      right: `${props.right}px`,
      bottom: `${props.bottom}px`,
    }));

    this.addChild(
      new Transition({
        name: `${ns.namespace.get()}-fade-in`,
        slot: new Div({
          vIf: visible,
          styleObj: backTopStyle,
          class: ns.b(),
          events: {
            click: (evt) => {
              handleClick(evt);
              evt?.stopPropagation();
            },
          },
          slot:
            props.slot ??
            new TdIcon({
              class: ns.e('icon'),
              slot: new ElCaretTopSvg(),
            }),
        }),
      })
    );
  }
}
