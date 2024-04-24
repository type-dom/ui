import { addUnit } from '@type-dom/utils';
import { Div, Label, Span } from '@type-dom/framework';
import { UI } from '../../ui.abstract';
import { $colors, $fontSizes, $textColors } from '../../styles/var';
import { TdForm } from '../td-form/td-form.class';
import { $formItemErrorPaddingTop, $formItemLineHeight, $formItemMarginBottom } from './td-form-item.style';
import { ILabelPosition, ITdFormItem, ITdFormItemConfig } from './td-form-item.interface';
import { ISize } from '../../styles/size';

export class TdFormItem extends UI implements ITdFormItem {
  className: 'TdFormItem';
  override parent?: TdForm;
  private labelWrap?: Div;
  label?: Label;
  private content: Div;
  private error?: Div;

  constructor(config?: ITdFormItemConfig) {
    super();
    this.className = 'TdFormItem';
    this.addAttrName('td-form-item');
    this.addStyleObj({
      display: 'flex',
      // --font-size: 14px,
      fontSize: $fontSizes[config?.size || 'base'],
      marginBottom: $formItemMarginBottom[config?.size || 'default']
    });
    this.labelWrap = new Div({
      attrObj: {
        name: 'td-form-item-label-wrap'
      },
      styleObj: {
        display: 'flex'
        // marginLeft: '11px', // 这个是动态计算的
      }
    });
    if (config?.label) {
      this.addChild(this.labelWrap);
    }
    this.content = new Div({
      attrObj: {
        name: 'td-form-item-content'
      },
      styleObj: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        flex: 1,
        lineHeight: '32px',
        position: 'relative',
        // font-size: var(--font-size),
        fontSize: $fontSizes.base,
        minWidth: 0
      }
    });
    this.error = new Div({
      text: 'Please input the ... ',
      attrObj: {
        name: 'td-form-item-error'
      },
      styleObj: {
        // color: getCssVar('color-danger');
        color: $colors.danger.base,
        fontSize: '12px',
        lineHeight: '1',
        // padding-top: #{map.get($form-item-error-padding-top, 'default')},
        paddingTop: $formItemErrorPaddingTop[config?.size || 'default'],
        position: 'absolute',
        top: '100%',
        left: '0'
      }
    });
    // todo 动态加载
    // this.content.addChild(this.error);
    this.addChild(this.content);
    if (config?.contents) {
      this.content.addChildren(...config.contents);
    }
    // this.childNodes = [this.labelWrap, this.content];
    this.setConfig(config);
  }

  override setConfig(config?: ITdFormItemConfig) {
    super.setConfig(config);
    if (config?.label) {
      this.label = new Label({
        text: config.label,
        styleObj: {
          display: 'inline-flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          flex: '0 0 auto',
          // font-size: var(--el-form-label-font-size),
          fontSize: $fontSizes[config?.size || 'base'],
          // color: var(--el-text-color-regular),
          color: $textColors.regular,
          height: '32px',
          lineHeight: '32px',
          padding: '0 12px 0 0',
          boxSizing: 'border-box'
          // width: config?.labelWidth || this.parent?.config?.labelWidth || '',
        }
      });
      if (this.parent?.config?.labelPosition === 'top') {
        //   todo
      } else {
        const labelWidth = addUnit(config.labelWidth || this.parent?.config?.labelWidth || '120px');
        if (labelWidth) {
          this.label.addStyleObj({
            width: labelWidth
          });
        }
      }
      if (config.required) {
        this.label?.unshiftChild(new Span({
          text: '*',
          styleObj: {
            color: $colors.danger.base,
            marginRight: '4px'
          }
        }));
      }
      this.labelWrap?.addChild(this.label);
    }
  }

  setLabelPosition(position?: ILabelPosition) {
    // todo top 怎么处理 ？
    this.label?.setStyleObj({
      justifyContent: position === 'left' ? 'flex-start' : 'flex-end'
    });
  }

  setSize(size: ISize = 'default') {
    this.setStyleObj({
      fontSize: $fontSizes[size],
      marginBottom: $formItemMarginBottom[size]
    });
    this.label?.setStyleObj({
      height: $formItemLineHeight[size],
      lineHeight: $formItemLineHeight[size]
    });
    this.content.setStyleObj({
      lineHeight: $formItemLineHeight[size]
    });
    this.error?.setStyleObj({
      paddingTop: $formItemErrorPaddingTop[size]
    });
  }
}
