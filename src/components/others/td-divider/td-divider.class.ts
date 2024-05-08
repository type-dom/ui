import { Div } from '@type-dom/framework';
import { $bgColor, $borderColor, $borderStyle, $textColor } from '../../../styles/var';
import { ITdDivider, ITdDividerConfig } from './td-divider.interface';
import { UI } from '../../../ui/ui.abstract';

export class TdDivider extends UI implements ITdDivider {
  className: 'TdDivider';

  constructor(config?: ITdDividerConfig) {
    super();
    this.className = 'TdDivider';
    this.addStyleObj({
      position: 'relative'
    });
    const direction = config?.direction || 'horizontal';
    const contentPosition = config?.contentPosition || 'center';
    const borderStyle = config?.borderStyle || 'solid';
    if (direction === 'horizontal') {
      this.addStyleObj({
        display: 'block',
        height: '1px',
        width: '100%',
        margin: '24px 0',
        // border-top: 1px getCssVar('border-color') getCssVar('border-style'),
        borderTop: '1px ' + $borderColor.base + ' ' + borderStyle
      });
      if (config?.text) { // ToDo config.text setConfig中还会处理一次。
        const textDiv = new Div({
          name: 'text',
          text: config?.text,
          styleObj: {
            position: 'absolute',
            // backgroundColor: getCssVar('bg-color'),
            backgroundColor: $bgColor.default,
            padding: '0 20px',
            fontWeight: 500,
            // color: getCssVar('text-color', 'primary'),
            color: $textColor.primary,
            fontSize: '14px'
          }
        });
        if (contentPosition === 'left') {
          textDiv.addStyleObj({
            left: '20px',
            transform: 'translateY(-50%)'
          });
        } else if (contentPosition === 'right') {
          textDiv.addStyleObj({
            right: '20px',
            transform: 'translateY(-50%)'
          });
        } else {
          textDiv.addStyleObj({
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)'
          });
        }
        this.addChild(textDiv);
      }
      if (contentPosition === 'left') {
        this.addStyleObj({});
      }
    } else {
      this.addStyleObj({
        display: 'inline-block',
        width: '1px',
        height: '1em',
        margin: '0 8px',
        verticalAlign: 'middle',
        position: 'relative',
        // border-left: 1px getCssVar('border-color') getCssVar('border-style'),
        borderLeft: '1px ' + $borderColor.base + ' ' + borderStyle
      });
    }
    this.setConfig(config);
  }
}
