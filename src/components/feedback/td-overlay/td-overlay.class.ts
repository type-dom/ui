import { TypeDiv, TypeElement } from '@type-dom/framework';
import { useNamespace } from '../../../hooks/use-namespace';
import { useSameTarget } from '../../../hooks/use-same-target';
import { overlayEmits, overlayProps } from './td-overlay.const';
import { ITdOverlay, OverlayProps } from './td-overlay.interface';
import './style/index';

export class TdOverlay extends TypeDiv implements ITdOverlay {
  className: 'TdOverlay';
  override props: OverlayProps;

  constructor(params: OverlayProps = {}) {
    super();
    this.className = 'TdOverlay';
    this.addEmits(overlayEmits);
    this.assignProps(overlayProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const BLOCK = 'overlay';
    const props = this.props;
    const emit = this.emit;
    // No reactivity on this prop because when its rendering with a global
    // component, this will be a constant flag.
    const ns = useNamespace(BLOCK);

    const onMaskClick = (e?: MouseEvent) => {
      // emit('click', e)  // 会死循环
    };

    const { onClick, onMousedown, onMouseup } = useSameTarget(
      props.customMaskEvent ? undefined : onMaskClick
    );
    if (props.mask) {
      this.attr.addClass([ns.b(), props.overlayClass]);
      this.style.addObj({
        zIndex: props.zIndex,
      });
      this.addEvents({
        click: onClick,
        mousedown: onMousedown,
        mouseup: onMouseup,
      });
      this.slotChildren(props.slot ?? props.slots?.default);
    } else {
      this.attr.addClass(props.overlayClass);
      this.style.addObj({
        zIndex: props.zIndex,
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      });
      this.slotChildren(props.slot ?? props.slots?.default);
    }
  }
}
