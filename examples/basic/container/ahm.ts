import { TypeDiv } from '@type-dom/framework';
import {
  TdAside,
  TdContainer,
  TdHeader,
  TdMain,
} from '@type-dom/ui';
import './common-layout.scss';

export class ContainerAhmExample extends TypeDiv {
  className = 'ContainerAhmExample';

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
              })
            ]
          }),
        ]
      }),
    );
  }
}
