import { ITdButton, ITdButtonConfig } from './td-button.interface';
import { TdButtonAbstract } from './td-button.abstract';

export class TdButton extends TdButtonAbstract implements ITdButton {
  className: 'TdButton';

  constructor(params: ITdButtonConfig = {}) {
    super(params);
    this.className = 'TdButton';
  }
}
