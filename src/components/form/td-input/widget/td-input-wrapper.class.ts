import { Div, Input, TypeDiv, TypeElement } from '@type-dom/framework';
import { useCursor } from '../../../../hooks/use-cursor';
import { $textColor } from '../../../../styles/var';
import { TdInput } from '../td-input.class';
import {
  $input,
  $inputFontSize,
  $inputHeight,
  $inputInnerHeight,
  $inputTextColor,
  $wrapperPadding,
} from '../td-input.style';
import { TdInputProps, TargetElement } from '../td-input.interface';
import { ITdInputWrapper } from './td-input-wrapper.interface';
import { TdInputSuffix } from './suffix';
import { TdInputPrefix } from './prefix';
import { Computed, Signal, unref } from '@type-dom/signals';

export class TdInputWrapper extends TypeDiv implements ITdInputWrapper {
  className: 'TdInputWrapper';
  override props: TdInputProps;
  override parent?: TdInput;
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

  constructor(params: TdInputProps = {}) {
    super();
    this.className = 'TdInputWrapper';
    this.parent = params?.parent;
    this.style.addObj({
      display: 'inline-flex',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'text',
      transform: 'translate3d(0, 0, 0)',
      // transform: 'translateZ(0)',
      // padding: $border-width map.get($input-padding-horizontal, 'default')-$border-width,
      padding: $wrapperPadding[params?.size || 'default'],
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
      boxShadow: '0 0 0 1px ' + $input.borderColor + ' inset',
    });

    this.prefix = new TdInputPrefix(this, params);
    this.unshiftChild(this.prefix);
    let placeholder = '';
    if (
      params?.placeholder instanceof Signal ||
      params?.placeholder instanceof Computed
    ) {
      placeholder = params.placeholder.get();
    } else if (params?.placeholder) {
      placeholder = params.placeholder as string;
    }
    this.inner = new Input({
      attrObj: {
        type: params?.showPassword
          ? params?.passwordVisible
            ? 'text'
            : 'password'
          : params?.type,
        placeholder: placeholder,
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
        WebkitAppearance: 'none',
        //   color: var(
        //     #{getCssVarName('input-text-color')},
        //     map.get($input, 'text-color')
        // );
        color: $inputTextColor,
        //   height: getCssVar('input-inner-height');
        height: $inputInnerHeight,
        //   line-height: getCssVar('input-inner-height');
        lineHeight: $inputInnerHeight,
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
          // this.parent?.setFocus(true);
        },
        blur: () => {
          console.log('blur . ');
          // this.parent?.setFocus(false);
          if (this.props.clearable) {
            this.setShowClear(this.showClear);
          }
          if (this.props.showPassword) {
            this.setShowPassword(this.showPwdVisible);
          }
        },
        change: () => {
          console.log('change . ');
        },
        keydown: () => {
          console.log('keydown . ');
        },
      },
    });
    this.addChild(this.inner);
    this.suffix = new TdInputSuffix(this, params);
    this.addChild(this.suffix);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    if (props?.prefix) {
      //   todo
    }
    if (props?.size) {
      this.style.addObj({
        padding: $wrapperPadding[props.size || 'default'],
        fontSize: $inputFontSize[props.size || 'default'],
        height: $inputHeight[props.size || 'default'],
      });
    }
    if (props?.disabled) {
      this.setDisabled(unref(props.disabled));
    }
    this.setNativeInputValue();
  }

  get suffixVisible() {
    return (
      !!this.suffix ||
      !!this.props.suffixIcon ||
      this.showClear ||
      this.props.showPassword ||
      this.isWordLimitVisible ||
      (!!this.validateState && this.needStatusIcon)
    );
  }

  get showClear(): boolean | undefined {
    // console.error('compute showClear . this.props is ', this.props);
    // console.log('!this.props.disabled is ', !this.props.disabled);
    // console.log('!this.props.readonly is ', !this.props.readonly);
    // console.log('this.nativeInputValue is ', this.nativeInputValue);
    // console.log('this.parent?.isFocused is ', this.parent?.isFocused);
    // console.log('this.parent?.hovering is ', this.parent?.hovering);
    return (
      this.props.clearable &&
      !this.props.disabled &&
      !this.props.readonly &&
      !!this.nativeInputValue // &&
      // (this.parent?.isFocused || this.parent?.hovering)
    );
  }

  get showPwdVisible(): boolean | undefined {
    return (
      this.props.showPassword &&
      !this.props.disabled &&
      !this.props.readonly &&
      !!this.nativeInputValue
      // &&
      // (!!this.nativeInputValue || this.parent?.isFocused)
    );
  }

  get nativeInputValue() {
    return this.inner.dom?.value || '';
  }

  set nativeInputValue(value: string) {
    if (this.inner.dom) {
      this.inner.dom.value = value;
    }
  }

  setDisabled(disabled: boolean) {
    if (disabled) {
      this.inner.attr.setObj({ disabled: 'disabled' });
      this.inner.style.setObj({
        // color: var(--el-disabled-text-color),
        color: $textColor.disabled,
        // -webkit-text-fill-color: var(--el-disabled-text-color),
        WebkitTextFillColor: $textColor.disabled,
        cursor: 'not-allowed',
      });
    } else {
      this.inner.attr.remove('disabled');
      this.inner.style.setObj({
        // color: var(--el-text-color),
        color: $textColor.regular,
        // -webkit-text-fill-color: var(--el-text-color),
        WebkitTextFillColor: $textColor.regular,
        cursor: 'text',
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
    this.suffix.style.show(this.suffixVisible ? 'inline-flex' : 'none');
    this.suffix?.clearIcon?.style?.show(showClear ? 'inline-flex' : 'none');
  }

  setShowPassword(showPassword: boolean | undefined) {
    this.suffix.passwordIcon?.style?.show(
      showPassword ? 'inline-flex' : 'none'
    );
  }

  setNativeInputValue() {
    console.log('setNativeInputValue . ');
    const input = this.inner;
    const formatterValue = this.props.formatter
      ? this.props.formatter(this.nativeInputValue)
      : this.nativeInputValue;
    if (!input || input.value === formatterValue) return;
    input.setValue(formatterValue);
  }

  handleInput(event?: Event, element?: TypeElement) {
    console.log('input . this is ', this);
    // const [recordCursor, setCursor] = useCursor(element?.dom);
    // recordCursor();

    let { value } = (event as InputEvent)?.target as TargetElement;

    if (this.props.formatter) {
      value = this.props.parser ? this.props.parser(value) : value;
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
    // setCursor();
    console.log('handleInput then setShowClear . ');
    if (this.props.clearable) {
      this.setShowClear(this.showClear);
    }
    if (this.props.showPassword) {
      this.setShowPassword(this.showPwdVisible);
    }
  }
}
