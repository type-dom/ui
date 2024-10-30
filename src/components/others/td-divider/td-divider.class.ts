import { Div } from '@type-dom/framework';
import {
  $bgColor,
  $borderColor,
  $borderStyle,
  $textColor
} from '../../../styles/var';
import { UI } from '../../../ui/ui.abstract';
import { ITdDivider, ITdDividerConfig } from './td-divider.interface';

export class TdDivider extends UI implements ITdDivider {
  className: 'TdDivider';

  constructor(params: ITdDividerConfig = {}) {
    super();
    this.className = 'TdDivider';
    this.style.addObj({
      position: 'relative'
    });
    const direction = params?.direction || 'horizontal';
    const contentPosition = params?.contentPosition || 'center';
    const borderStyle = params?.borderStyle || 'solid';
    if (direction === 'horizontal') {
      this.style.addObj({
        display: 'block',
        height: '1px',
        width: '100%',
        margin: '24px 0',
        // border-top: 1px getCssVar('border-color') getCssVar('border-style'),
        borderTop: '1px ' + $borderColor.base + ' ' + borderStyle
      });
      if (params?.text) {
        // ToDo params.text setConfig中还会处理一次。
        const textDiv = new Div({
          name: 'text',
          text: params?.text,
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
          textDiv.style.addObj({
            left: '20px',
            transform: 'translateY(-50%)'
          });
        } else if (contentPosition === 'right') {
          textDiv.style.addObj({
            right: '20px',
            transform: 'translateY(-50%)'
          });
        } else {
          textDiv.style.addObj({
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)'
          });
        }
        this.addChild(textDiv);
      }
      if (contentPosition === 'left') {
        this.style.addObj({});
      }
    } else {
      this.style.addObj({
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
    this.useParams(params);
  }
}
