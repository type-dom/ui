import { Transition } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { ITdDrawer, ITdDrawerConfig } from './td-drawer.interface';
import { TdOverlay } from '../td-overlay/td-overlay.class';

export class TdDrawer extends UI<undefined> implements ITdDrawer {
  className: 'TdDrawer';
  override props: ITdDrawerConfig;
  private transition: Transition;
  constructor(params: ITdDrawerConfig = {}) {
    super();
    this.useTag('fragment');
    this.className = 'TdDrawer';
    this.transition = new Transition({
      name: 'fade',
      emits: {
        afterEnter: () => {
          console.log('afterEnter');
        },
        afterLeave: () => {
          console.log('afterLeave');
        },
        beforeEnter: () => {
          console.log('beforeEnter');
        },
      },
      slot: new TdOverlay({
        mask: params?.modal,
        zIndex: 1000, // todo zIndex
        events: {
          click: () => {
            //
            console.log('click . ');
          }
        }
      })
    });
    this.addChild(this.transition);

    this.props = this.useParams(params);
  }
}
