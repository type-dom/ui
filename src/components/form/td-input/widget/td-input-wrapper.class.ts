import {
  Div,
  Input,
  StyleCursor, StyleDisplay,
  TypeDiv,
  TypeElement,
  useCursor, XProxy
} from '@type-dom/framework';
import { $textColor } from '../../../../styles/var';
import { TdInput } from '../td-input.class';
import {
  $input, $inputFontSize, $inputHeight,
  $inputInnerHeight,
  $inputTextColor,
  $wrapperPadding
} from '../td-input.style';
import { ITdInputConfig, TargetElement } from '../td-input.interface';
import { ITdInputWrapper } from './td-input-wrapper.interface';
import { TdInputSuffix } from './suffix';
import { TdInputPrefix } from './prefix';

export class TdInputWrapper extends TypeDiv implements ITdInputWrapper {
  className: 'TdInputWrapper';
  override parent?: TdInput;
  override config?: ITdInputConfig;
  prepend?: Div;
  append?: Div;
  prefix?: TdInputPrefix;
  suffix: TdInputSuffix;
  inner: Input;
  private isComposing?: boolean;
  passwordVisible?: boolean;
  private isWordLimitVisible?: boolean | undefined;
  private validateState?: boolean;
  private needStatusIcon?: boolean;

  constructor(config?: ITdInputConfig) {
    super();
    this.className = 'TdInputWrapper';
    this.config = config;
    this.parent = config?.parent;
    this.addStyleObj({
      display: 'inline-flex',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      cursor: StyleCursor.text,
      transform: 'translate3d(0, 0, 0)',
      // transform: 'translateZ(0)',
      // padding: $border-width map.get($input-padding-horizontal, 'default')-$border-width,
      padding: $wrapperPadding[config?.size || 'default'],
      //   background-color: var(
      //     #{getCssVarName('input-bg-color')},
      //     map.get($input, 'bg-color')
      // ),
      backgroundColor: $input.bgColor,
      backgroundImage: 'none',
      //   border-radius: getCssVarWithDefault(
      //     'input-border-radius',
      //     map.get($input, 'border-radius')
      //   ),
      borderRadius: $input.borderRadius,
      //   transition: getCssVar('transition-box-shadow'),
      //       transition: var(--el-transition-box-shadow),
      boxShadow: '0 0 0 1px ' + $input.borderColor + ' inset'
    });

    this.prefix = new TdInputPrefix(this, config);
    this.unshiftChild(this.prefix);
    let placeholder = '';
    if (config?.placeholder instanceof XProxy) {
      placeholder = config.placeholder.value;
    } else if (config?.placeholder) {
      placeholder = config.placeholder as string;
    }
    this.inner = new Input({
      attrObj: {
        type: config?.showPassword
          ? config?.passwordVisible
            ? 'text'
            : 'password'
          : config?.type,
        placeholder: placeholder ? placeholder : 'Please input'
      },
      styleObj: {
        width: '100%',
        flexGrow: 1,
        fontSize: 'inherit',
        padding: '0',
        outline: 'none',
        border: 'none',
        background: 'none',
        boxSizing: 'border-box',
        '-webkit-appearance': 'none',
        //   color: var(
        //     #{getCssVarName('input-text-color')},
        //     map.get($input, 'text-color')
        // );
        color: $inputTextColor,
        //   height: getCssVar('input-inner-height');
        height: $inputInnerHeight,
        //   line-height: getCssVar('input-inner-height');
        lineHeight: $inputInnerHeight
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
          if (this.config?.clearable) {
            this.setShowClear(this.showClear);
          }
          if (this.config?.showPassword) {
            this.setShowPassword(this.showPwdVisible);
          }
        },
        change: () => {
          console.log('change . ');
        },
        keydown: () => {
          console.log('keydown . ');
        }
      }
    });
    this.addChild(this.inner);
    this.suffix = new TdInputSuffix(this, config);
    this.addChild(this.suffix);
    this.setConfig(config);
  }

  override setConfig(config?: ITdInputConfig) {
    if (config?.prefix) {
      //   todo
    }
    if (config?.size) {
      this.addStyleObj({
        padding: $wrapperPadding[config.size || 'default'],
        fontSize: $inputFontSize[config.size || 'default'],
        height: $inputHeight[config.size || 'default']
      });
    }
    if (config?.disabled) {
      this.setDisabled(config.disabled);
    }
    this.setNativeInputValue();
  }

  get suffixVisible() {
    return !!this.suffix ||
      !!this.config?.suffixIcon ||
      this.showClear ||
      this.config?.showPassword ||
      this.isWordLimitVisible ||
      (!!this.validateState && this.needStatusIcon);
  }

  get showClear(): boolean | undefined {
    // console.error('compute showClear . this.config is ', this.config);
    // console.log('!this.config?.disabled is ', !this.config?.disabled);
    // console.log('!this.config?.readonly is ', !this.config?.readonly);
    // console.log('this.nativeInputValue is ', this.nativeInputValue);
    // console.log('this.parent?.isFocused is ', this.parent?.isFocused);
    // console.log('this.parent?.hovering is ', this.parent?.hovering);
    return (
      this.config?.clearable &&
      !this.config?.disabled &&
      !this.config?.readonly &&
      !!this.nativeInputValue &&
      (this.parent?.isFocused || this.parent?.hovering)
    );
  }

  get showPwdVisible(): boolean | undefined {
    return (
      this.config?.showPassword &&
      !this.config?.disabled &&
      !this.config?.readonly &&
      !!this.nativeInputValue &&
      (!!this.nativeInputValue || this.parent?.isFocused)
    );
  }

  get nativeInputValue() {
    return this.inner.dom.value || '';
  }

  set nativeInputValue(value: string) {
    this.inner.dom.value = value;
  }

  setDisabled(disabled: boolean) {
    if (disabled) {
      this.inner.setAttrObj({ disabled: 'disabled' });
      this.inner.setStyleObj({
        // color: var(--el-disabled-text-color),
        color: $textColor.disabled,
        // -webkit-text-fill-color: var(--el-disabled-text-color),
        '-webkit-text-fill-color': $textColor.disabled,
        cursor: StyleCursor.notAllowed
      });
    } else {
      this.inner.removeAttribute('disabled');
      this.inner.setStyleObj({
        // color: var(--el-text-color),
        color: $textColor.regular,
        // -webkit-text-fill-color: var(--el-text-color),
        '-webkit-text-fill-color': $textColor.regular,
        cursor: StyleCursor.text
      });
    }
  }

  // setFocus(isFocused: boolean) {
  //   this.isFocused = isFocused;
  //   if (isFocused) {
  //     this.setStyleObj({
  //       boxShadow: '0 0 0 1px ' + $input.focusBorderColor + ' inset',
  //     });
  //   } else {
  //     this.setStyleObj({
  //       boxShadow: '0 0 0 1px ' + $input.borderColor + ' inset',
  //     });
  //   }
  // }
  //
  // setHovering(hovering: boolean) {
  //   this.hovering = hovering;
  //   if (hovering) {
  //     if (!this.isFocused) {
  //       this.setStyleObj({
  //         boxShadow: '0 0 0 1px ' + $input.hoverBorderColor + ' inset',
  //       });
  //     }
  //   } else {
  //     if (!this.isFocused) {
  //       this.setStyleObj({
  //         boxShadow: '0 0 0 1px ' + $input.borderColor + ' inset',
  //       });
  //     }
  //   }
  // }

  setShowClear(showClear: boolean | undefined) {
    console.log('setShowClear . showClear is ', showClear);
    this.suffix.show(this.suffixVisible ? StyleDisplay.inlineFlex : StyleDisplay.none);
    this.suffix.clearIcon?.show(showClear ? StyleDisplay.inlineFlex : StyleDisplay.none);
  }

  setShowPassword(showPassword: boolean | undefined) {
    this.suffix.passwordIcon?.show(
      showPassword ? StyleDisplay.inlineFlex : StyleDisplay.none
    );
  }

  setNativeInputValue() {
    console.log('setNativeInputValue . ');
    const input = this.inner;
    const formatterValue = this.config?.formatter
      ? this.config.formatter(this.nativeInputValue)
      : this.nativeInputValue;
    if (!input || input.value === formatterValue) return;
    input.setValue(formatterValue);
  }

  handleInput(event?: Event, element?: TypeElement) {
    console.log('input . this is ', this);
    const [recordCursor, setCursor] = useCursor((element as Input)?.dom);
    recordCursor();

    let { value } = (event as InputEvent)?.target as TargetElement;

    if (this.config?.formatter) {
      value = this.config?.parser ? this.config.parser(value) : value;
      console.log('parser value is ', value);
    }

    // should not emit input during composition
    // see: https://github.com/ElemeFE/element/issues/10516
    if (this.isComposing) return;

    // hack for https://github.com/ElemeFE/element/issues/8548
    // should remove the following line when we don't support IE
    // if (value === this.nativeInputValue) {
    //   this.setNativeInputValue();
    //   return;
    // }

    // emit(UPDATE_MODEL_EVENT, value)
    // emit('input', value)

    // ensure native input value is controlled
    // see: https://github.com/ElemeFE/element/issues/12850
    // await nextTick()
    this.nativeInputValue = value;
    this.setNativeInputValue();
    setCursor();
    console.log('handleInput then setShowClear . ');
    if (this.config?.clearable) {
      this.setShowClear(this.showClear);
    }
    if (this.config?.showPassword) {
      this.setShowPassword(this.showPwdVisible);
    }
  }
}
