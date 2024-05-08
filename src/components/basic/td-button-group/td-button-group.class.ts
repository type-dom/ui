import { TdButton } from '@type-dom/ui';
import { UI } from '../../../ui/ui.abstract';
import { $borderRightColor } from '../td-button/td-button.style';
import {
  ITdButtonGroup,
  ITdButtonGroupConfig,
} from './td-button-group.interface';

export class TdButtonGroup extends UI implements ITdButtonGroup {
  className: 'TdButtonGroup';

  constructor(config: ITdButtonGroupConfig) {
    super();
    this.className = 'TdButtonGroup';
    this.addStyleObj({
      display: 'inline-block',
      verticalAlign: 'middle',
    });
    this.setConfig(config);
  }

  override created() {
    this.children.forEach((btn, index) => {
      if (btn instanceof TdButton) {
        if (this.children.length > 1) {
          this.addBtnStyle(btn, index);
        }
      }
    });
  }

  override mounted() {
    this.children.forEach((btn, index) => {
      if (btn instanceof TdButton) {
        btn.addEvents({
          mouseover: () => {
            btn.setStyleObj({
              zIndex: 1,
            });
            if (this.children.length > 1) {
              this.setBtnStyle(btn, index);
            }
          },
          mouseout: () => {
            btn.setStyleObj({
              zIndex: 1,
            });
            if (this.children.length > 1) {
              this.setBtnStyle(btn, index);
            }
          },
        });
      }
    });
  }

  addBtnStyle(btn: TdButton, index: number) {
    if (index === 0) {
      btn.addStyleObj({
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginRight: '-1px',
        borderRightColor: $borderRightColor,
      });
    } else if (index === this.children.length - 1) {
      btn.addStyleObj({
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftColor: $borderRightColor,
      });
    } else {
      btn.addStyleObj({
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftColor: $borderRightColor,
        borderRightColor: $borderRightColor,
      });
    }
  }

  setBtnStyle(btn: TdButton, index: number) {
    if (index === 0) {
      btn.setStyleObj({
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginRight: '-1px',
        borderRightColor: $borderRightColor,
      });
    } else if (index === this.children.length - 1) {
      btn.setStyleObj({
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftColor: $borderRightColor,
      });
    } else {
      btn.setStyleObj({
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftColor: $borderRightColor,
        borderRightColor: $borderRightColor,
      });
    }
  }
}
