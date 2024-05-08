import { Div } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { TdTooltip } from '../../feedback/td-tooltip/td-tooltip.class';
import { ITdSelect } from './td-select.interface';
import { TdSelectDropDown } from './dropdown/dropdown.class';
import { $select } from './td-select.style';

export class TdSelect extends UI implements ITdSelect {
  className: 'TdSelect';
  constructor() {
    super();
    this.className = 'TdSelect';
    this.addStyleObj($select);
    this.addChild(
      new TdTooltip({
          childNodes: [
            new Div({
              name: 'wrapper'
            }),
            new Div({
              name: 'content',
              childNodes: [
                new TdSelectDropDown({
                  name: 'content-inner',
                  childNodes: [

                  ]
                }),
              ]
            })
          ]
        })
    );
  }
}
