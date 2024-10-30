import { addUnit } from '@type-dom/utils';
import { Div, Label, Span } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { ISize } from '../../../styles/size';
import { $colors, $fontSizes, $textColor } from '../../../styles/var';
import { TdForm } from '../td-form/td-form.class';
import { formContextKey } from '../td-form/td-form.const';
import { ITdFormConfig } from '../td-form/td-form.interface';
import {
  $formItemErrorPaddingTop,
  $formItemLineHeight,
  $formItemMarginBottom
} from './td-form-item.style';
import {
  ILabelPosition,
  ITdFormItem,
  ITdFormItemConfig
} from './td-form-item.interface';

export class TdFormItem extends UI implements ITdFormItem {
  className: 'TdFormItem';
  label?: Label;
  override props: ITdFormItemConfig;
  override parent?: TdForm;
  private formConfig?: ITdFormConfig; // 不是必须的
  private labelWrap?: Div;
  private content: Div;
  private error?: Div;

  // new TdFormItem 是 发生在 TdForm slotChild 之前的。
  constructor(params: ITdFormItemConfig = {}) {
    super();
    this.className = 'TdFormItem';
    this.attr.addName('td-form-item');
    this.style.addObj({
      display: 'flex',
      // --font-size: 14px,
      fontSize: $fontSizes[params?.size || 'base'],
      marginBottom: $formItemMarginBottom[params?.size || 'default'],
    });
    this.labelWrap = new Div({
      name: 'td-form-item-label-wrap',
      styleObj: {
        display: 'flex',
        alignItems: 'center'
        // marginLeft: '11px', // 这个是动态计算的
      },
    });
    this.addChild(this.labelWrap);

    if (!params.label && params.required) {
      this.labelWrap?.addChild(
        new Span({
          text: '*',
          styleObj: {
            color: $colors.danger.base,
            marginRight: '4px',
          },
        })
      );
    }
    this.content = new Div({
      name: 'td-form-item-content',
      styleObj: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        flex: 1,
        justifyContent: params?.contentAlign || 'left',
        lineHeight: '32px',
        position: 'relative',
        // font-size: var(--font-size),
        fontSize: $fontSizes.base,
        minWidth: 0,
      },
    });
    this.error = new Div({
      text: params.error || '',
      name: 'td-form-item-error',
      styleObj: {
        display: 'none',
        // color: getCssVar('color-danger');
        color: $colors.danger.base,
        fontSize: '12px',
        lineHeight: '1',
        // padding-top: #{map.get($form-item-error-padding-top, 'default')},
        paddingTop: $formItemErrorPaddingTop[params?.size || 'default'],
        position: 'absolute',
        top: '100%',
        left: '0',
      },
    });
    // todo 动态加载
    this.content.addChild(this.error);
    this.addChild(this.content);
    this.content.addChild(this.getSlotNode());

    this.props = this.useParams(params);
  }

  override setup() {
    // inject 要在 created 之中，否则无法确定 parent .
    this.formConfig = this.inject(formContextKey);
    // 就是 this.parent.params , 有必要单独引入一次吗？
    console.log('this.formConfig is ', this.formConfig);
    // this.childNodes = [this.labelWrap, this.content];
    // 下面的方法要调用到 this.parent 才能获取到。需要 form的setConfig 方法调用后
    const props = this.props;
    if (props?.label) {
      this.label = new Label({
        text: props.label,
        styleObj: {
          display: 'inline-flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          flex: '0 0 auto',
          // font-size: var(--el-form-label-font-size),
          fontSize: $fontSizes[props?.size || 'base'],
          // color: var(--el-text-color-regular),
          color: $textColor.regular,
          height: '32px',
          lineHeight: '32px',
          padding: '0 12px 0 0',
          boxSizing: 'border-box',
          // width: props?.labelWidth || this.parent?.props.labelWidth || '',
        },
      });
      if (this.parent?.props.labelPosition === 'top') {
        //   todo
      } else {
        const labelWidth = addUnit(
          props.labelWidth || this.parent?.props.labelWidth || '120px'
        );
        if (labelWidth) {
          this.label.style.addObj({
            width: labelWidth,
          });
        }
      }
      if (props.required) {
        this.label?.unshiftChild(
          new Span({
            text: '*',
            styleObj: {
              color: $colors.danger.base,
              marginRight: '4px',
            },
          })
        );
      }
      this.labelWrap?.addChild(this.label);
      this.style.addObj({
        display: this.parent?.props.inline ? 'inline-flex' : 'flex',
        verticalAlign: 'middle',
        marginRight: this.parent?.props.inline
          ? '32px'
          : this.style.get('marginRight'),
        // justifyContent: justifyContent,
      });
      this.setLabelPosition(this.parent?.props.labelPosition);
      this.setSize(this.parent?.props.size);
      this.setLabelWidth(this.parent?.props.labelWidth);
    }
  }
  // 待实现：设置子元素的labelWidth
  setLabelWidth(width?: string | number) {
    if (width === undefined) {
      return;
    }
    this.label?.style.addObj({
      width: addUnit(width),
    });
  }
  setLabelPosition(position?: ILabelPosition) {
    // todo top 怎么处理 ？
    this.label?.style.addObj({
      justifyContent: position === 'left' ? 'flex-start' : 'flex-end',
    });
  }

  setSize(size: ISize = 'default') {
    this.style.addObj({
      fontSize: $fontSizes[size],
      marginBottom: $formItemMarginBottom[size],
    });
    this.label?.style.addObj({
      height: $formItemLineHeight[size],
      lineHeight: $formItemLineHeight[size],
    });
    this.content.style.addObj({
      lineHeight: $formItemLineHeight[size],
    });
    this.error?.style.addObj({
      paddingTop: $formItemErrorPaddingTop[size],
    });
  }
}
