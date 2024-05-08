import { UI } from '../../../../ui/ui.abstract';
import { TdPopper } from '../td-popper.class';
import { ITdPopperContent, ITdPopperContentConfig } from './content.interface';
import { TdFocusTrap } from '../../td-focus-trap/td-focus-trap.class';

export class TdPopperContent extends UI implements ITdPopperContent {
  className: 'TdPopperContent';
  // parent?: TdPopper;
  private focusTrap: TdFocusTrap;
  constructor(config?: ITdPopperContentConfig) {
    super();
    this.className = 'TdPopperContent';
    this.addAttrName('td-popper-content');
    this.addAttrObj({
      tabindex: -1,
    })
    this.addStyleObj({
      // padding: '10px',
      // backgroundColor: $bgColors.default,
      // borderRadius: $borderRadius.base,
      // boxShadow: $boxShadow.base,
    });
    this.focusTrap = new TdFocusTrap();
    this.addChild(this.focusTrap);
    this.setConfig(config);
  }
}
