import { TypeElement } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { ITdOverlay, ITdOverlayConfig } from './td-overlay.interface';
import { $tdOverlayStyle } from './td-overlay.style';
export let overlayZIndex = 2000;

export class TdOverlay extends UI implements ITdOverlay {
  className: 'TdOverlay';
  override props: ITdOverlayConfig;

  constructor(params: ITdOverlayConfig = {}) {
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
    this.addChild(this.getSlotNode());

    this.props = this.useParams(params);
  }

  addSlot(slot: TypeElement) {
    this.getSlotNode().resetSlot(slot);
  }
}
