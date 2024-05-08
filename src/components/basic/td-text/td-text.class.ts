import { UI } from '../../../ui/ui.abstract';
import { TdIcon } from '../td-icon/td-icon.class';
import { $baseText, $textStateColors, sizeOpts } from './td-text.style';
import { ITdText, ITdTextConfig } from './td-text.interface';

export class TdText extends UI implements ITdText {
  className: 'TdText';
  override config?: ITdTextConfig;
  icon?: TdIcon;

  constructor(config?: ITdTextConfig) {
    super({ tag: config?.tag || 'span' });
    this.className = 'TdText';
    this.addStyleObj($baseText);
    this.setConfig(config);
  }

  override setConfig(config?: Partial<ITdTextConfig>) {
    super.setConfig(config);
    if (config?.type) {
      this.addStyleObj($textStateColors[config.type].default);
    } else {
      this.addStyleObj($textStateColors.default.default);
    }
    if (config?.size) {
      this.addStyleObj(sizeOpts[config?.size]);
    } else {
      this.addStyleObj(sizeOpts.default);
    }
    if (config?.truncated && config?.width) {
      this.addStyleObj({
        display: 'inline-block',
        maxWidth: '100%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: config?.width
      });
    }
    if (config?.lineClamp) {
      this.addStyleObj({
        '-webkit-line-clamp': config?.lineClamp,
        display: '-webkit-inline-box',
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden'
      });
    }
  }
}
