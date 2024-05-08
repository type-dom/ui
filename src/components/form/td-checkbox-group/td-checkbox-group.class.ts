import { UI } from '../../../ui/ui.abstract';
import { ITdCheckboxGroup, ITdCheckboxGroupConfig } from './td-checkbox-group.interface';

export class TdCheckboxGroup extends UI implements ITdCheckboxGroup {
  className: 'TdCheckboxGroup';

  constructor(public override config?: ITdCheckboxGroupConfig) {
    super({ tag: config?.tag });
    this.className = 'TdCheckboxGroup';
    this.addAttrObj({
      role: 'group'
    });
    this.addStyleObj({
      fontSize: '0',
      lineHeight: 0
    });
    this.setConfig(config);
  }
}
