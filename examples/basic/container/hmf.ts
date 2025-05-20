import { TypeDiv } from '@type-dom/framework';
import {
  TdContainer,
  TdFooter,
  TdHeader,
  TdMain
} from '@type-dom/ui';
import './common-layout.scss';

export class ContainerHmfExample extends TypeDiv {
  className = 'ContainerHmfExample';

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
          }),
          new TdFooter({
            slot: 'Footer'
          }),
        ]
      }),
    );
  }
}
