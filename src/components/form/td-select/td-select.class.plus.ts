import { Div } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { IUIConfig } from '../../../ui/ui.interface';
import { TdTooltip } from '../../feedback/td-tooltip/td-tooltip.class';
import { ITdSelect } from './td-select.interface.plus';
import { TdSelectDropDown } from './dropdown/dropdown.class';
import { $select } from './td-select.style';

export class TdSelect extends UI implements ITdSelect {
  className: 'TdSelect';
  override props: IUIConfig;

  constructor(params: IUIConfig = {}) {
    super();
    this.className = 'TdSelect';
    this.style.addObj($select);
    this.addChild(
      new TdTooltip({
        slot: [
          new Div({
            name: 'wrapper'
          }),
          new Div({
            name: 'content',
            childNodes: [
              new TdSelectDropDown({
                name: 'content-inner'
              })
            ]
          })
        ]
      })
    );
    this.props = this.useParams(params);
  }
}
