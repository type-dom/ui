import { $borderRadius } from '../../../../styles/var';
import { UI } from '../../../../ui/ui.abstract';
import {
  ITdSelectDropdown,
  ITdSelectDropdownConfig
} from './dropdown.interface';
import { Div } from '@type-dom/framework';
import { $selectDropdown } from '../td-select.style';

export class TdSelectDropDown extends UI implements ITdSelectDropdown {
  className: 'TdSelectDropdown';
  override props: ITdSelectDropdownConfig;
  private header?: Div;
  private footer?: Div;

  constructor(params: ITdSelectDropdownConfig = {}) {
    super();
    this.className = 'TdSelectDropdown';
    this.style.addObj({
      // z-index: calc(#{getCssVar('index-top')} + 1);
      // border-radius: getCssVar('border-radius-base');
      borderRadius: $borderRadius.base,
      boxSizing: 'border-box'
    });
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    if (props?.header) {
      this.header = new Div({
        styleObj: {
          // padding: map.get($select-dropdown, 'header-padding');
          padding: $selectDropdown.headerPadding,
          // border-bottom: map.get($select-dropdown, 'border');
          borderBottom: $selectDropdown.border
        }
      });
      this.header.addChild(props.header);
      this.unshiftChild(this.header);
    }
    if (props?.footer) {
      this.footer = new Div({
        styleObj: {
          // padding: map.get($select-dropdown, 'footer-padding');
          padding: $selectDropdown.footerPadding,
          // border-top: map.get($select-dropdown, 'border');
          borderTop: $selectDropdown.border
        }
      });
      this.footer.addChild(props.footer);
      this.addChild(this.footer);
    }
  }
}
