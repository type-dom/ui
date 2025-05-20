import { TypeDiv } from '@type-dom/framework';
import {
  TdContainer,
  TdHeader,
  TdMain
} from '@type-dom/ui';
import './common-layout.scss';

export class ContainerHmExample extends TypeDiv {
  className = 'ContainerHmExample';

  constructor() {
    super();
    this.attr.addClass('common-layout');
    this.addChild(
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
    );
  }
}
