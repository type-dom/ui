import { TypeDiv, TypeElement } from '@type-dom/framework';
import { ITdOverlay, OverlayProps } from './td-overlay.interface';
import { $tdOverlayStyle } from './td-overlay.style';

export let overlayZIndex = 2000;

export class TdOverlay extends TypeDiv implements ITdOverlay {
  className: 'TdOverlay';
  override props: OverlayProps;

  constructor(params: OverlayProps = {}) {
    super();
    overlayZIndex = overlayZIndex + 1;
    this.className = 'TdOverlay';
    this.style.addObj($tdOverlayStyle);
    if (params?.mask) {
      this.style.addObj({
        zIndex: params?.zIndex || overlayZIndex,
      });
    } else {
      this.style.addObj({
        zIndex: params?.zIndex || overlayZIndex,
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      });
    }
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }
}
