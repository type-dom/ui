import { Span, TypeA } from '@type-dom/framework';
import { computed } from '@type-dom/signals';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdIcon } from '../td-icon/td-icon.class';
import { ITdLink, LinkProps } from './td-link.interface';
import { linkEmits, linkProps } from './td-link.const';
import './style/index';

export class TdLink extends TypeA implements ITdLink {
  className: 'TdLink';
  override props: LinkProps;

  constructor(params: LinkProps) {
    super();
    this.className = 'TdLink';
    this.addEmits(linkEmits);
    this.assignProps(linkProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const ns = useNamespace('link');

    const linkKls = computed(() => [
      ns.b(),
      ns.m(props.type),
      ns.is('disabled', props.disabled),
      ns.is('underline', props.underline && !props.disabled),
    ]);
    const emit = this.emit;

    function handleClick(event: MouseEvent) {
      if (!props.disabled) {
        // emit('click', event);
      }
    }

    this.attr.addObj({
      class: linkKls,
      href: props.disabled || !props.href ? undefined : props.href,
      target: props.disabled || !props.href ? undefined : props.target,
    });
    this.addEmits({
      click: handleClick,
    });
    if (props.icon) {
      this.addChild(
        new TdIcon({
          slot: props.icon,
        })
      );
    }
    if (props.slots?.default || props.slot) {
      this.addChild(
        new Span({
          class: ns.e('inner'),
          slot: props.slot || props.slots?.default,
        })
      );
    }
    if (props.slots?.icon) {
      this.slotChildren(props.slots.icon);
    }
  }
}
