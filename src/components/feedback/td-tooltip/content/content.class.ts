import { UI } from '../../../../ui/ui.abstract';
import { ITdTooltipContentConfig } from './content.interface';

export class TdTooltipContent extends UI {
  className: 'TdTooltipContent';
  override props: ITdTooltipContentConfig;

  constructor(params: ITdTooltipContentConfig = {}) {
    super();
    this.className = 'TdTooltipContent';
    this.props = this.useParams(params);
  }
}
