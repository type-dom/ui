import { $colors, IType } from '../../../styles/var';
import { UI } from '../../../ui/ui.abstract';
import { CHANGE_EVENT } from '../../../constants/event';
import { ITdCheckTag, ITdCheckTagConfig } from './td-check-tag.interface';
import { $checkTag, $checkTagChecked, useType } from './td-check-tag.style';

export class TdCheckTag extends UI implements ITdCheckTag {
  className: 'TdCheckTag';
  override props: ITdCheckTagConfig;
  checked?: boolean;
  private type: IType;

  constructor(params: ITdCheckTagConfig = {}) {
    super();
    this.useTag('span');
    this.className = 'TdCheckTag';
    this.attr.addName('td-check-tag');
    this.type = params?.type || 'primary';
    useType();
    this.style.addObj($checkTag);
    this.setChecked(params?.checked);
    this.props = this.useParams(params);
    this.addEvents({
      click: () => {
        // if (this.props.emits?.change) {
        //   this.checked = !this.checked;
        //   this.setChecked(this.checked);
        // }
        this.handleChange();
      },
      mouseenter: () => {
        if (this.checked) {
          this.style.setObj({
            backgroundColor: $colors[this.type]['light-7']
          });
        } else {
          this.style.setObj({
            backgroundColor: $colors.info['light-7']
          });
        }
      },
      mouseleave: () => {
        if (this.checked) {
          this.style.setObj({
            backgroundColor: $colors[this.type]['light-8']
          });
        } else {
          this.style.setObj({
            backgroundColor: $colors.info['light-9']
          });
        }
      }
    });
  }

  handleChange() {
    this.checked = !this.checked;
    this.setChecked(this.checked);
    this.emit(CHANGE_EVENT, this.checked);
    this.emit('update:checked', this.checked);
    // emit(CHANGE_EVENT, checked)
    // emit('update:checked', checked)
  }
  setChecked(checked?: boolean) {
    this.checked = checked;
    if (checked) {
      this.style.setObj($checkTagChecked[this.type]);
    } else {
      this.style.setObj({
        backgroundColor: $colors.info['light-9'],
        color: $colors.info.base
      });
    }
  }
}
