import { UI } from '../../../ui/ui.abstract';
import { $borderRightColor } from '../td-button/td-button.style';
import { TdButton } from '../td-button/td-button.class';
import { ITdButtonGroup, ITdButtonGroupConfig } from './td-button-group.interface';

export class TdButtonGroup extends UI implements ITdButtonGroup {
  className: 'TdButtonGroup';

  constructor(params: ITdButtonGroupConfig) {
    super();
    this.className = 'TdButtonGroup';
    this.style.addObj({
      display: 'inline-block',
      verticalAlign: 'middle'
    });
    if (params?.slot) {
      this.slotChild(params.slot);
    }
    this.useParams(params);
  }

  override setup() {
    this.children.forEach((btn, index) => {
      if (btn instanceof TdButton) {
        if (this.children.length > 1) {
          this.addBtnStyle(btn, index);
        }
      }
    });

    this.children.forEach((btn, index) => {
      if (btn instanceof TdButton) {
        btn.addEvents({
          mouseenter: () => {
            btn.style.setObj({
              zIndex: 1
            });
            if (this.children.length > 1) {
              this.setBtnStyle(btn, index);
            }
          },
          mouseleave: () => {
            btn.style.setObj({
              zIndex: 1
            });
            if (this.children.length > 1) {
              this.setBtnStyle(btn, index);
            }
          }
        });
      }
    });
  }

  addBtnStyle(btn: TdButton, index: number) {
    if (index === 0) {
      btn.style.addObj({
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginRight: '-1px',
        borderRightColor: $borderRightColor
      });
    } else if (index === this.children.length - 1) {
      btn.style.addObj({
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftColor: $borderRightColor
      });
    } else {
      btn.style.addObj({
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftColor: $borderRightColor,
        borderRightColor: $borderRightColor
      });
    }
  }

  setBtnStyle(btn: TdButton, index: number) {
    if (index === 0) {
      btn.style.setObj({
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginRight: '-1px',
        borderRightColor: $borderRightColor
      });
    } else if (index === this.children.length - 1) {
      btn.style.setObj({
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftColor: $borderRightColor
      });
    } else {
      btn.style.setObj({
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderLeftColor: $borderRightColor,
        borderRightColor: $borderRightColor
      });
    }
  }
}
