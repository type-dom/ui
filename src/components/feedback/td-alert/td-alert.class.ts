import {
  Div,
  Fragment,
  P,
  Span,
  TextNode,
  Transition,
  TypeFragment,
  useSlots,
} from '@type-dom/framework';
import { ElCloseSvg, TypeComponentsMap } from '@type-dom/svgs';
import { computed, signal } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace/index';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { ITdAlert, AlertProps } from './td-alert.interface';
import { alertEmits, alertProps } from './td-alert.const';
import './style/index';

export class TdAlert extends TypeFragment implements ITdAlert {
  className: 'TdAlert';
  // content: Transition;
  override props: AlertProps;
  // private alertDiv: Div;
  // private alertContent: Div;
  private alertTitle?: Span;
  private alertDescription?: P;
  name?: string;

  constructor(params: AlertProps = {}) {
    super();
    this.className = 'TdAlert';
    this.assignProps(alertProps);
    this.addEmits(alertEmits);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const slots = useSlots();

    const ns = useNamespace('alert');
    this.name = ns.b('fade');

    const visible = signal(true);

    const iconComponent = computed(() => TypeComponentsMap[props.type!]);

    const hasDesc = computed(() => !!(props.description || slots?.default));

    const close = (evt?: MouseEvent) => {
      console.log('close . ');
      visible.set(false);
      this.emit('close', evt);
    };
    const { type, center, effect } = props;
    const alertKls = [
      ns.b(),
      ns.m(type),
      ns.is('center', center),
      ns.is(effect!),
    ];
    console.warn('alertKls is ', alertKls);
    this.addChild(
      new Transition({
        name: ns.b('fade'),
        slot: new Div({
          vShow: visible,
          class: [
            ns.b(),
            ns.m(type),
            ns.is('center', center),
            ns.is(effect!),
          ].filter((i) => i !== ''),
          attrObj: {
            role: 'alert',
          },
          styleObj: props.styleObj,
          slot: [
            new TdIcon({
              vIf: props.showIcon && iconComponent,
              class: [ns.e('icon'), { [ns.is('big')]: hasDesc }],
              slot: new (iconComponent.get())(),
            }),
            new Div({
              class: ns.e('content'),
              slot: [
                new Span({
                  vIf: props.title || slots?.title,
                  class: [ns.e('title'), { 'with-description': hasDesc.get() }],
                  init: (ele) => {
                    if (slots?.title) {
                      ele.slotChildren(slots?.title);
                    } else {
                      ele.addChild(new TextNode(props.title!));
                    }
                  },
                }),
                new P({
                  vIf: hasDesc,
                  class: ns.e('description'),
                  slot: [props.description || ''],
                }),
                new Fragment({
                  vIf: props.closable,
                  slot: [
                    new Div({
                      vIf: props.closeText,
                      class: [ns.e('close-btn'), ns.is('customed')],
                      slot: props.closeText,
                      events: {
                        click: close,
                      },
                    }),
                    new TdIcon({
                      class: ns.e('close-btn'),
                      vIf: !props.closeText,
                      slot: new ElCloseSvg(),
                      events: {
                        click: close,
                      },
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      })
    );
  }
}
