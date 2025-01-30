import { Span, TypeSpan } from '@type-dom/framework';
import { ElCircleCloseSvg, ElHideSvg, ElViewSvg } from '@type-dom/svgs';
import { TdIcon } from '../../../basic/td-icon/td-icon.class';
import { $input, $inputFontSize } from '../td-input.style';
import { TdInputProps } from '../td-input.interface';
import { TdInputWrapper } from './td-input-wrapper.class';

export class TdInputSuffix extends TypeSpan {
  className: 'TdInputSuffix';
  override parent: TdInputWrapper;
  private suffixInner: Span;
  private suffixIcon?: TdIcon;
  clearIcon?: TdIcon;
  passwordIcon?: TdIcon;

  constructor(parent: TdInputWrapper, config?: TdInputProps) {
    super();
    this.parent = parent;
    this.className = 'TdInputSuffix';
    this.style.addObj({
      display: 'inline-flex',
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
      pointerEvents: 'none',
    });
    this.suffixInner = new Span({
      attrObj: {
        name: 'suffix-inner',
      },
      styleObj: {
        pointerEvents: 'all',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '8px',
      },
    });
    this.addChild(this.suffixInner);
    if (config?.clearable) {
      this.clearIcon = new TdIcon({
        slot: new ElCircleCloseSvg(),
        attrObj: {
          name: 'suffix-icon',
        },
        styleObj: {
          display: 'none',
          fontSize: $inputFontSize[config?.size || 'default'],
          cursor: 'pointer',
        },
        events: {
          click: (evt, icon) => {
            console.log('click icon is ', icon);
            this.parent.inner.setValue('');
            this.parent.setShowClear(false);
            this.parent.inner.focus();
          },
          mousedown: (evt, icon) => {
            console.log('mousedown, icon is ', icon);
            evt?.preventDefault();
          },
        },
      });
      this.suffixInner.addChild(this.clearIcon);
    }
    if (config?.showPassword) {
      this.passwordIcon = new TdIcon({
        slot: new ElHideSvg(),
        styleObj: {
          display: this.parent.showPwdVisible ? 'inline-flex' : 'none',
          fontSize: $inputFontSize[config?.size || 'default'],
          cursor: 'pointer',
        },
        events: {
          click: () => {
            console.log('click showPassword ');
            this.parent.passwordVisible = !this.parent.passwordVisible;
            this.passwordIcon?.replaceSvg(
              this.parent.passwordVisible ? new ElViewSvg() : new ElHideSvg()
            );
            if (this.parent.passwordVisible) {
              this.parent.inner.attr.setObj({
                type: 'text',
              });
            } else {
              this.parent.inner.attr.setObj({
                type: 'password',
              });
            }
            this.parent.inner.focus();
          },
        },
      });
      this.suffixInner.addChild(this.passwordIcon);
    }
    if (config?.suffixIcon) {
      this.suffixIcon = new TdIcon({
        slot: config.suffixIcon,
        attrObj: {
          name: 'suffix-icon',
        },
        styleObj: {
          display: 'inline-flex',
          fontSize: $inputFontSize[config?.size || 'default'],
          // cursor: 'pointer',
        },
        events: {
          click: (evt, icon) => {
            console.log('suffixIcon click . ');
            this.parent.inner.focus();
          },
        },
      });
      this.suffixInner.addChild(this.suffixIcon);
    }
  }

  override setup() {
    this.style.addObj({
      display: this.parent.suffixVisible ? 'inline-flex' : 'none', // constructor 中this.parent.suffixVisible是undefined
    });
  }
}
