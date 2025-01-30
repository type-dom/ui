import { Span, Transition, TypeFragment, TypeNode } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { ElCloseSvg } from '@type-dom/svgs';
import { useNamespace } from '../../../hooks/use-namespace';
import { useFormSize } from '../../form/td-form/hooks/use-form-common-props';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { ITdTag, TagProps } from './td-tag.interface';
import { tagEmits, tagProps } from './td-tag.const';
import './style/index';
import { IStyle } from '@type-dom/css-type';

export class TdTag extends TypeFragment implements ITdTag {
  className: 'TdTag';
  override props: TagProps;

  constructor(params: TagProps = {}) {
    super();
    this.className = 'TdTag';
    // this.attr.addName('td-tag');
    this.addEmits(tagEmits);
    this.assignProps(tagProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;

    const tagSize = useFormSize();
    const ns = useNamespace('tag');
    const containerKls = computed(() => {
      const { type, hit, effect, closable, round } = props;
      return [
        ns.b(),
        ns.is('closable', closable),
        ns.m(type || 'primary'),
        ns.m(tagSize.get()),
        ns.m(effect),
        ns.is('hit', hit),
        ns.is('round', round),
      ];
    });

    // methods
    const handleClose = (event?: MouseEvent) => {
      emit('close', event);
    };

    const handleClick = (event?: MouseEvent) => {
      emit('click', event);
    };

    const handleVNodeMounted = (vnode: TypeNode) => {
      // // @ts-ignore
      // if (vnode?.component?.subTree?.component?.bum) {
      //   // @ts-ignore
      //   vnode.component.subTree.component.bum = null;
      // }
    };

    if (props.disableTransitions) {
      this.addChild(
        new Span({
          vIf: props.disableTransitions,
          class: containerKls,
          styleObj: {
            ...(props.styleObj as IStyle),
            backgroundColor: props.color,
          },
          events: {
            click: handleClick,
          },
          slot: [
            new Span({
              class: ns.e('content'),
              slot: props.slot || props.slots?.default,
            }),
            new TdIcon({
              vIf: props.closable,
              class: ns.e('close'),
              events: {
                click: (evt) => {
                  handleClose(evt);
                  evt?.stopPropagation();
                },
              },
              slot: new ElCloseSvg(),
            }),
          ],
        })
      );
    } else {
      this.addChild(
        new Transition({
          name: `${ns.namespace.get()}-zoom-in-center`,
          appear: true,
          slot: new Span({
            class: containerKls,
            styleObj: {
              ...(props.styleObj as IStyle),
              backgroundColor: props.color,
            },
            events: {
              click: handleClick,
            },
            slot: [
              new Span({
                class: ns.e('content'),
                slot: props.slot || props.slots?.default,
              }),
              new TdIcon({
                vIf: props.closable,
                class: ns.e('close'),
                events: {
                  click: (evt) => {
                    handleClose(evt);
                    evt?.stopPropagation();
                  },
                },
                slot: new ElCloseSvg(),
              }),
            ],
          }),
        })
      );
    }
  }
}
