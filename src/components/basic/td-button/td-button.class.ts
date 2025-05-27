import { Span, TypeHtml } from '@type-dom/framework';
import { ElLoadingSvg } from '@type-dom/svgs';
import { computed } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdIcon } from '../td-icon/td-icon.class';
import { buttonEmits, buttonProps } from './td-button.const';
import { ITdButton, TdButtonProps } from './td-button.interface';
import { useButtonCustomStyle } from './button-custom';
import { useButton } from './use-button';
import './style/index';

export class TdButton extends TypeHtml implements ITdButton
{
  className: 'TdButton';
  override props: TdButtonProps;
  dom?: HTMLElement;

  constructor(params: TdButtonProps = {}) {
    super();
    this.className = 'TdButton';
    this.addEmits(buttonEmits);
    this.assignProps(buttonProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;
    const buttonStyle = useButtonCustomStyle(props);
    // if (props.color) {
    //   console.error('buttonStyle is ', buttonStyle);
    // }
    const ns = useNamespace('button');
    const {
      _ref,
      _size,
      _type,
      _disabled,
      _props,
      _plain,
      _round,
      shouldAddSpace,
      handleClick,
    } = useButton(props, emit)
    // console.log('_disabled.get() is ', _disabled.get());
    const buttonKls = computed(() => [
      ns.b(),
      ns.m(_type.get()),
      ns.m(_size.get()),
      ns.is('disabled', _disabled.get()),
      ns.is('loading', props.loading),
      ns.is('plain', _plain.get()),
      ns.is('round', _round.get()),
      ns.is('plain', props.plain),
      ns.is('round', props.round),
      ns.is('circle', props.circle),
      ns.is('text', props.text),
      ns.is('link', props.link),
      ns.is('has-bg', props.bg),
    ]);
    // v-bind="_props"
    // :is="tag"
    this.assignProps({
      ..._props,
      nodeName: props.tag,
      refDom: _ref,
    });
    this.addEvents({
      click: handleClick,
    });
    this.attr.addObj({
      type: 'button',
      class: buttonKls,
    });
    this.style.addObj(buttonStyle);
    if (props.loading) {
      if (props.slots?.loading) {
        this.slotChildren(props.slots.loading);
      } else {
        this.addChildren(
          new TdIcon({
            class: ns.is('loading'),
            slot: new ElLoadingSvg(),
          })
        );
      }
    } else if (props.icon || props.slots?.icon) {
      if (props.icon) {
        this.addChildren(
          new TdIcon({
            slot: props.icon,
          })
        );
      } else {
        this.addChildren(
          new TdIcon({
            slot: props.slots?.icon,
          })
        );
      }
    }
    if (props.slots?.default || props.slot) {
      this.addChild(
        new Span({
          class: shouldAddSpace.get() ? ns.em('text', 'expand') : '',
          slot: props.slots?.default ?? props.slot,
        })
      );
    }
  }
}
