import { TypeDiv } from '@type-dom/framework';
import {
  TdAside,
  TdContainer,
  TdMain
} from '@type-dom/ui';
import './common-layout.scss';

export class ContainerAmExample extends TypeDiv {
  className = 'ContainerAmExample';

  constructor() {
    super();
    this.attr.addClass('common-layout');
    this.addChild(
      new TdContainer({
        slot: [
          new TdAside({
            slot: 'Aside',
            width: '200px',
          }),
          new TdMain({
            slot: 'Main'
          }),
          new TdAside({
            slot: 'Aside',
            width: '200px',
          })
        ]
      }),
    );
  }
}
