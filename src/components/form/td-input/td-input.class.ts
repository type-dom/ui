import { isMustache, isString, mustache } from '@type-dom/utils';
import {
  IJsonData,
  IJsonDataProp,
  Input,
  IObDataProp,
  IPrimitive,
  Textarea,
  XProxy
} from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { $fontSizes } from '../../../styles/var';
import { TdInputWrapper } from './widget/td-input-wrapper.class';
import { $input, $inputHeight } from './td-input.style';
import { TdTextareaWrapper } from './widget/td-textarea-wrapper';
import { ITdInput, ITdInputConfig } from './td-input.interface';

export class TdInput extends UI implements ITdInput {
  className: 'TdInput';
  override props: ITdInputConfig;
  private isWordLimitVisible?: boolean;
  hovering?: boolean;
  isFocused?: boolean;
  panel!: TdInputWrapper | TdTextareaWrapper;
  // modelValue?: IObDataProp;
  // override modelValue?: IJsonDataProp;
  private placeholder?: IObDataProp;

  constructor(params: ITdInputConfig = {}) {
    super();
    console.log('TdInput constructor . ');
    this.className = 'TdInput';
    this.attr.addName('td-input');
    this.attr.addObj({
      tabIndex: 0
    });
    this.style.addObj({
      position: 'relative',
      display: 'inline-flex',
      width: '100%',
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      // fontSize: var(--el-font-size-base),
      fontSize: $fontSizes.base,
      // lineHeight: var(--el-input-height),
      lineHeight: $inputHeight[params?.size || 'default'],
      userSelect: 'none'
    });
    console.log('params.modelValue is ', params?.modelValue);
    if (params?.modelValue) {
      this.modelValue = params.modelValue;
    }
    this.props = this.useParams(params);
  }

  get value() {
    return this.panel.inner.value;
  }

  override setup() {
    const props = this.props;
    if (props?.width) {
      this.style.addWidth(props.width);
    }

    //   todo
    if (props?.type === 'textarea') {
      props.parent = this;
      this.panel = new TdTextareaWrapper(props);
      // this.textareaWrapper = new TdTextareaWrapper(props);
    } else {
      this.panel = new TdInputWrapper(props);
    }
    if (props?.placeholder) {
      this.placeholder = props.placeholder;
    }
    // this.panel.setParent(this);
    this.addChild(this.panel);
    if (!props?.formatter && props?.parser) {
      throw new Error(
        'If you set the parser, you also need to set the formatter'
      );
    }
    if (this.props.disabled) {
      // this.panel.setDisabled(true);
      return;
    }
    this.addEvents({
      mouseleave: (evt) => {
        if (this.props.disabled) {
          // 会动态设置的。所以要在监听中判断拦截；
          evt?.stopPropagation();
          evt?.preventDefault();
          return;
        }
        this.setHovering(false);
      },
      mouseenter: (evt, element) => {
        if (this.props.disabled) {
          evt?.stopPropagation();
          evt?.preventDefault();
          return;
        }
        this.setHovering(true);
        console.log('mouseenter then showClear . ');
        if (this.panel instanceof TdInputWrapper) {
          if (this.props.clearable) {
            console.log('this.panel?.showClear is ', this.panel?.showClear);
            this.panel?.setShowClear(this.panel?.showClear);
          }
          if (this.props.showPassword) {
            this.panel?.setShowPassword(this.panel?.showPwdVisible);
          }
        }
      }
    });
    // 传递组件的监听事件到input框上；
    this.panel.inner.addEvents({
      focus: (evt, element) => {
        console.log('td-input focus . ');
        // if (this.props.emits?.focus) {
        //   this.props.emits?.focus?.(evt, element);
        // }
        this.emit('focus', evt, element);
      },
      change: (evt, element) => {
        console.log('td-input change', evt, element);
        // if (this.props.emits?.change) {
        //   this.props.emits.change(evt, element);
        // }
        this.emit('change', evt, element);
      },
      input: (evt, element) => {
        console.log('td-input input', evt, element);
        if (this.modelValue instanceof XProxy) {
          this.modelValue?.setValue((element as Input | Textarea)?.dom?.value);
        } else {
          this.modelValue = (element as Input | Textarea)?.dom?.value;
        }
        // if (this.props.emits?.input) {
        //   this.props.emits.input(evt, element);
        // }
        this.emit('input', evt, element);
      },
      blur: (evt, element) => {
        console.log('td-input blur . ');
        // if (this.props.emits?.blur) {
        //   this.props.emits?.blur?.(evt, element);
        // }
        this.emit('blur', evt, element);
      },
      keydown: (evt, element) => {
        console.log('td-input keydown', evt, element);
        // if (this.props.emits?.keydown) {
        //   this.props.emits.keydown(evt, element);
        // }
        this.emit('keydown', evt, element);
      }
    });
    if (this.props.type === 'textarea') {
      return; // ????
    }
  }

  setModelValue(value: IJsonDataProp) {
    console.log('setModelValue . value is ', value);
    this.modelValue = value;
    if (isString(value)) {
      if (isMustache(value)) {
        // if (this.itemData) {
        //   const originalValue = mustache(value, this.itemData);
        //   this.panel.inner.setValue(originalValue);
        // } else {
        this.panel.inner.setValue(value);
        // }
      } else {
        this.panel.inner.setValue(value);
      }
    } else if (value instanceof XProxy) {
      this.panel.inner.setValue(value.value);
    } else {
      //   todo
    }
  }

  setHovering(hovering: boolean) {
    this.hovering = hovering;
    if (hovering) {
      if (!this.isFocused) {
        this.panel?.style.setObj({
          boxShadow: '0 0 0 1px ' + $input.hoverBorderColor + ' inset'
        });
      }
    } else {
      if (!this.isFocused) {
        this.panel?.style.setObj({
          boxShadow: '0 0 0 1px ' + $input.borderColor + ' inset'
        });
      }
    }
  }

  setFocus(isFocused: boolean) {
    this.isFocused = isFocused;
    if (isFocused) {
      this.panel?.style.setObj({
        boxShadow: '0 0 0 1px ' + $input.focusBorderColor + ' inset'
      });
    } else {
      this.panel?.style.setObj({
        boxShadow: '0 0 0 1px ' + $input.borderColor + ' inset'
      });
    }
  }

  override created() {
    // 注： 绑定变量要渲染前处理，而不是创建对象时处理
    if (this.props.modelValue) {
      console.log('td-input created . ');
      console.log('setModelValue ', this.props.modelValue);
      this.setModelValue(this.props.modelValue);
    }
  }
}
