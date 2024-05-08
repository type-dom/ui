import { $borderRadius } from '@type-dom/ui';
import { UI } from '../../../../ui/ui.abstract';
import { ITdSelectDropdown, ITdSelectDropdownConfig } from './dropdown.interface';
import { Div } from '@type-dom/framework';
import { $selectDropdown } from '../td-select.style';

export class TdSelectDropDown extends UI implements ITdSelectDropdown {
  className: 'TdSelectDropdown';
  private header?: Div;
  private footer?: Div;
  constructor(config?: ITdSelectDropdownConfig) {
    super();
    this.className = 'TdSelectDropdown';
    this.addStyleObj({
      // z-index: calc(#{getCssVar('index-top')} + 1);
      // border-radius: getCssVar('border-radius-base');
      borderRadius: $borderRadius.base,
      boxSizing: 'border-box',
    });
    this.setConfig(config);
  }
  override setConfig(config?: Partial<ITdSelectDropdownConfig>) {
    super.setConfig(config);
    if (config?.header) {
      this.header = new Div({
        styleObj: {
          // padding: map.get($select-dropdown, 'header-padding');
          padding: $selectDropdown.headerPadding,
          // border-bottom: map.get($select-dropdown, 'border');
          borderBottom: $selectDropdown.border,
        }
      });
      this.header.addChild(config.header);
      this.unshiftChild(this.header);
    }
    if (config?.footer) {
      this.footer = new Div({
        styleObj: {
          // padding: map.get($select-dropdown, 'footer-padding');
          padding: $selectDropdown.footerPadding,
          // border-top: map.get($select-dropdown, 'border');
          borderTop: $selectDropdown.border,
        }
      })
      this.footer.addChild(config.footer)
      this.addChild(this.footer);
    }
  }
}
