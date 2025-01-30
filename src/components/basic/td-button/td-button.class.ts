import { ITdButton, TdButtonProps } from './td-button.interface';
import { TdButtonAbstract } from './td-button.abstract';

export class TdButton extends TdButtonAbstract implements ITdButton {
  className: 'TdButton';

  constructor(params: TdButtonProps = {}) {
    super(params);
    this.className = 'TdButton';
  }
}
