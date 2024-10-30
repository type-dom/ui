import {
  Span,
  Textarea,
  TypeDiv,
  TypeElement,
} from '@type-dom/framework';
import { $fontSizes } from '../../../../styles/var';
import { ITdInputConfig } from '../td-input.interface';
import {
  $input,
  $inputPaddingHorizontal,
  $inputTextColor
} from '../td-input.style';
import { TdInput } from '../td-input.class';

export class TdTextareaWrapper extends TypeDiv {
  className: 'TextareaWrapper';
  override props: ITdInputConfig;
  inner: Textarea;
  countSpan: Span;
  override parent?: TdInput;
  private isComposing?: boolean;

  constructor(params: ITdInputConfig = {}) {
    super();
    this.className = 'TextareaWrapper';
    this.style.addObj({
      position: 'relative',
      display: 'inline-block',
      width: '100%',
      verticalAlign: 'bottom',
      // font-size: getCssVar('font-size', 'base'),
      fontSize: $fontSizes.base,
      borderRadius: $input.borderRadius
    });
    this.inner = new Textarea({
      attrObj: {
        type: params?.type || 'text'
      },
      styleObj: {
        position: 'relative',
        display: 'block',
        resize: 'vertical',
        // padding: 5px map.get($input-padding-horizontal, 'default')-$border-width,
        padding:
          '5px ' + $inputPaddingHorizontal[params?.size || 'default'] + 'px',
        lineHeight: '1.5',
        boxSizing: 'border-box',
        width: '100%',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        //   color: var(
        //     #{getCssVarName('input-text-color')},
        //     map.get($input, 'text-color')
        // );
        color: $inputTextColor,
        //   background-color: var(
        //     #{getCssVarName('input-bg-color')},
        //     map.get($input, 'bg-color')
        // );
        backgroundColor: $input.bgColor,
        backgroundImage: 'none',
        WebkitAppearance: 'none',
        // @include inset-input-border(
        //   var(
        //     #{getCssVarName('input-border-color')},
        //     map.get($input, 'border-color')
        // )
        // )
        boxShadow: '0 0 0 1px ' + $input.borderColor + ' inset',
        //   border-radius: getCssVarWithDefault(
        //     'input-border-radius',
        //     map.get($input, 'border-radius')
        //   );
        borderRadius: $input.borderRadius,
        //   transition: getCssVar('transition-box-shadow')
        border: 'none',
        outline: 'none' // add by me 2024-4-6
      },
      events: {
        compositionstart: () => {
          console.log('compositionstart . ');
          this.isComposing = true;
        },
        compositionupdate: () => {
          console.log('compositionupdate . ');
        },
        compositionend: (event) => {
          console.log('compositionend . ');
          this.isComposing = false;
          if (this.isComposing) {
            this.isComposing = false;
            this.handleInput(event);
          }
        },
        input: (event, element) => this.handleInput(event, element),
        focus: (i) => {
          console.log('td-input focus . this.parent is ', this.parent);
          this.parent?.setFocus(true);
        },
        blur: () => {
          console.log('blur . ');
          this.parent?.setFocus(false);
        },
        change: () => {
          console.log('change . ');
        },
        keydown: () => {
          console.log('keydown . ');
        }
      }
    });
    this.countSpan = new Span({
      styleObj: {}
    });
    this.addChildren(this.inner, this.countSpan);
    // this.childNodes = [this.inner, this.countSpan];
    this.props = this.useParams(params);
  }

  // todo
  handleInput(event?: Event, element?: TypeElement) {
    console.log('input . this is ', this);
    // should not emit input during composition
    // see: https://github.com/ElemeFE/element/issues/10516
    if (this.isComposing) return;
    if (this.props.autosize) {
      this.inner.style.setObj({
        // height: 'auto',
        height: this.inner.dom.scrollHeight + 'px'
      });
      // this.style.height = "auto";
      // this.style.height = this.scrollHeight + "px"; // 自动调整高度至内容所需的最小高度
    }
  }
}
