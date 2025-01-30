import { Transition, TypeFragment } from '@type-dom/framework';
import { TdOverlay } from '../td-overlay/td-overlay.class';
import { ITdDrawer, DrawerProps } from './td-drawer.interface';

export class TdDrawer extends TypeFragment implements ITdDrawer {
  className: 'TdDrawer';
  content: Transition;
  override props: DrawerProps;

  constructor(params: DrawerProps = {}) {
    super();
    // this.useTag('fragment');
    this.className = 'TdDrawer';
    this.content = new Transition({
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
          },
        },
      }),
    });
    this.addChild(this.content);

    this.props = this.useParams(params);
  }
}
