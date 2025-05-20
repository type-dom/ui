import { TypeDiv } from '@type-dom/framework';
import {
  TdAside,
  TdContainer, TdFooter,
  TdHeader,
  TdMain
} from '@type-dom/ui';
import './common-layout.scss';

export class ContainerAhmfExample extends TypeDiv {
  className = 'ContainerAhmfExample';

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
          new TdContainer({
            slot: [
              new TdHeader({
                slot: 'Header'
              }),
              new TdMain({
                slot: 'Main'
              }),
              new TdFooter({
                slot: 'Footer'
              })
            ]
          })
        ]
      }),
    );
  }
}
