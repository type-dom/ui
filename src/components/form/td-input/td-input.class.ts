import { isMustache, isString, mustache } from '@type-dom/utils';
import {
  IJsonData,
  IJsonDataProp,
  Input,
  IObDataProp, IPrimitive,
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
  override config?: ITdInputConfig;
  private isWordLimitVisible?: boolean;
  hovering?: boolean;
  isFocused?: boolean;
  panel!: TdInputWrapper | TdTextareaWrapper;
  // modelValue?: IObDataProp;
  // override modelValue?: IJsonDataProp;
  private placeholder?: IObDataProp | string;

  constructor(config?: ITdInputConfig) {
    super();
    console.log('TdInput constructor . ');
    this.className = 'TdInput';
    this.addAttrName('td-input');
    this.addStyleObj({
      position: 'relative',
      display: 'inline-flex',
      width: '100%',
      boxSizing: 'border-box',
      verticalAlign: 'middle',
      // fontSize: var(--el-font-size-base),
      fontSize: $fontSizes.base,
      // lineHeight: var(--el-input-height),
      lineHeight: $inputHeight[config?.size || 'default'],
      userSelect: 'none',
    });
    console.log('config.modelValue is ', config?.modelValue);
    if (config?.modelValue) {
      this.modelValue = config.modelValue;
    }
    this.setConfig(config);
  }

  override setConfig(config?: ITdInputConfig) {
    super.setConfig(config);
    if (config?.width) {
      this.addWidth(config.width);
    }

    //   todo
    if (config?.type === 'textarea') {
      config.parent = this;
      this.panel = new TdTextareaWrapper(config);
      // this.textareaWrapper = new TdTextareaWrapper(config);
    } else {
      this.panel = new TdInputWrapper(config);
    }
    if (config?.placeholder) {
      this.placeholder = config.placeholder;
    }
    this.panel.setParent(this);
    this.addChild(this.panel);
    if (!config?.formatter && config?.parser) {
      throw new Error('If you set the parser, you also need to set the formatter');
    }
  }

  override initEvents() {
    if (this.config?.disabled) {
      return;
    }
    this.addEvents({
      mouseleave: (evt) => {
        if (this.config?.disabled) { // 会动态设置的。所以要在监听中判断拦截；
          evt?.stopPropagation();
          evt?.preventDefault();
          return;
        }
        this.setHovering(false);
      },
      mouseenter: (evt, element) => {
        if (this.config?.disabled) {
          evt?.stopPropagation();
          evt?.preventDefault();
          return;
        }
        this.setHovering(true);
        console.log('mouseenter then showClear . ');
        if (this.panel instanceof TdInputWrapper) {
          if (this.config?.clearable) {
            console.log('this.panel?.showClear is ', this.panel?.showClear);
            this.panel?.setShowClear(this.panel?.showClear);
          }
          if (this.config?.showPassword) {
            this.panel?.setShowPassword(this.panel?.showPwdVisible);
          }
        }
      }
    });
    this.panel.inner.addEvents({
        change: (evt, element) => {
          console.log('td-input change', evt, element);
        },
        input: (evt, element) => {
          console.log('td-input input', evt, element);
          if (this.modelValue instanceof XProxy) {
            this.modelValue?.setValue((element as Input | Textarea)?.dom?.value);
          } else {
            this.modelValue = (element as Input | Textarea)?.dom?.value;
          }
        }
      }
    );
    if (this.config?.type === 'textarea') {
      return; // ????
    }
  }

  setModelValue(value: IJsonDataProp) {
    console.log('setModelValue . value is ', value);
    if (isString(value)) {
      if (isMustache(value)) {
        if (this.itemData) {
          const originalValue = mustache(value, this.itemData);
          this.panel.inner.setValue(originalValue);
        } else {
          this.panel.inner.setValue(value);
        }
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
        this.panel?.setStyleObj({
          boxShadow: '0 0 0 1px ' + $input.hoverBorderColor + ' inset'
        });
      }
    } else {
      if (!this.isFocused) {
        this.panel?.setStyleObj({
          boxShadow: '0 0 0 1px ' + $input.borderColor + ' inset'
        });
      }
    }
  }

  setFocus(isFocused: boolean) {
    this.isFocused = isFocused;
    if (isFocused) {
      this.panel?.setStyleObj({
        boxShadow: '0 0 0 1px ' + $input.focusBorderColor + ' inset'
      });
    } else {
      this.panel?.setStyleObj({
        boxShadow: '0 0 0 1px ' + $input.borderColor + ' inset'
      });
    }
  }

  override created() {
    // 注： 绑定变量要渲染前处理，而不是创建对象时处理
    if (this.config?.modelValue) {
      console.log('td-input created . ');
      console.log('setModelValue ', this.config.modelValue);
      this.setModelValue(this.config.modelValue);
    }
  }
}
