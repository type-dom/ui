import { TypeLI, Span } from '@type-dom/framework';
import { ITdOption, TdOptionProps } from './td-option.interface';
import { $selectDropdownItemStyle } from './td-option.style';
import './style/index';

export class TdOption extends TypeLI implements ITdOption {
  className: 'TdOption';
  override props: TdOptionProps;

  constructor(params = {} as TdOptionProps) {
    super();
    this.className = 'TdOption';
    this.attr.addObj({
      name: 'td-option',
      role: 'option',
    });
    this.style.addObj($selectDropdownItemStyle);
    if (params.label) {
      this.addChild(
        new Span({
          slot: params.label,
        })
      );
    }
    this.props = this.useParams(params);
  }
}
