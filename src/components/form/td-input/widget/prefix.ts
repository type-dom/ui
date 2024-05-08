import { Span, TypeSpan } from '@type-dom/framework';
import { TdIcon } from '../../../basic/td-icon/td-icon.class';
import { ITdInputConfig } from '../td-input.interface';
import { $input, $inputFontSize } from '../td-input.style';
import { TdInputWrapper } from './td-input-wrapper.class';

export class TdInputPrefix extends TypeSpan {
  className: 'TdInputPrefix';
  override parent: TdInputWrapper;
  private prefixInner: Span;
  private prefixIcon?: TdIcon;

  constructor(parent: TdInputWrapper, config?: ITdInputConfig) {
    super();
    this.parent = parent;
    this.className = 'TdInputPrefix';
    this.addStyleObj({
      display: config?.prefixIcon ? 'inline-flex' : 'none',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      flexWrap: 'nowrap',
      height: '100%',
      textAlign: 'center',
      //   color: var,
      //     #{getCssVarName('input-icon-color')},
      //     map.get($input, 'icon-color',
      // ),
      color: $input.iconColor,
      // transition: all getCssVar('transition-duration'),
      transition: 'all 0.3s',
      pointerEvents: 'none'
    });
    this.prefixInner = new Span({
      attrObj: {
        name: 'prefix-inner'
      },
      styleObj: {
        pointerEvents: 'all',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '8px'
      }
    });
    this.addChild(this.prefixInner);
    if (config?.prefixIcon) {
      this.prefixIcon = new TdIcon({
        svgObj: config.prefixIcon,
        attrObj: {
          name: 'prefix-icon'
        },
        styleObj: {
          display: 'inline-flex',
          fontSize: $inputFontSize[config?.size || 'default']
          // cursor: StyleCursor.pointer,
        },
        events: {
          click: (evt, icon) => {
            console.log('prefixIcon click . ');
            this.parent.inner.focus();
          }
        }
      });
      this.prefixInner.addChild(this.prefixIcon);
    }
  }
}
