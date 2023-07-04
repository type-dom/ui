import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { IInput } from './input.interface';

export class Input extends TypeHtml implements IInput {
  nodeName: 'input';
  dom: HTMLInputElement;
  className: 'Input';
  childNodes: [];
  // value: string | number | boolean | undefined;
  constructor(public parent: TypeHtml) {
    super('input');
    this.nodeName = 'input';
    this.dom = document.createElement(this.nodeName);
    this.className = 'Input';
    this.childNodes = [];
  }

  /**
   * 传统的输入控件
   * text checkbox radio button submit password reset hidden file image
   * 新增类型
   * color url [注意]safari和IE不支持该类型
   * number [注意]IE不支持该类型 min max step value(规定默认值）
   * range 定义包含一定范围内数字值的输入域 min max step value(规定默认值） [注意]IE9-不支持该类型
   * tel email search
   * month week date time datetime datetime-local[注意]IE和firefox这6种日期类型都不支持，chrome不支持datetime类型
   */
  get type(): string {
    return this.attrObj.type as string;
  }

  /**
   * 输入框和单选框、复选框不一样
   * 单选、复选框本身有value属性的。
   */
  get value(): string {
    return this.dom.value;
  }
  // set value(value: string | number | boolean) {
  //   this.setAttribute('value', value);
  //   this.dom.value = String(value);
  // }

  // 日期类型的处理
  setValue(value: string | number | boolean): void {
    // console.error('input setValue . ');
    // todo datetime 格式。
    if (this.type === 'date') {
      console.log('isNaN(Number(value)) is ', isNaN(Number(value)));
      if (isNaN(Number(value))) {
      //
      } else {
        // const timeStamp = new Date().getTime();
        // console.error('timestamp is ', timeStamp);
        if (String(value).length === 13) {
          const d = new Date(value as string);
          value = (d.getFullYear()) + '-' +
            (d.getMonth() + 1) + '-' +
            (d.getDate()); // + ' ' +
          // (d.getHours()) + ':' +
          // (d.getMinutes()) + ':' +
          // (d.getSeconds());
          console.log('value is ', value);
        } else {
          console.error('时间戳长度有问题，不是13位');
          throw Error('时间戳长度有问题，不是13位');
        }
      }
    }
    // this.value = value;
    this.setAttribute('value', value);
    this.dom.value = String(value);
  }
}
