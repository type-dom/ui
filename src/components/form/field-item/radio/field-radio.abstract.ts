import {
  Button,
  Div,
  Label,
  IOptionSet,
  IOptionSetting,
  TypeHtml,
  TypeElement,
} from '@type-dom/framework';
import { FieldItem } from '../field-item.abstract';

export abstract class FieldRadio extends FieldItem {
  childNodes: [Label, Div, Button];
  name: string;
  resultValue: string | number | boolean;
  optionDiv: Div;
  override params: IOptionSetting;
  private selectedOpt!: Button;

  protected constructor(labelText = '单选', params: IOptionSetting) {
    super(labelText);
    this.name = params.name;
    this.resultValue = params.resultValue;
    this.optionDiv = new Div();
    this.childNodes = [this.label, this.optionDiv, this.button];
    this.params = params;
    this.setOptions(params.options);
  }

  abstract reset(value?: string): void;

  setOptions(options: IOptionSet[]): void {
    options.forEach((option, index) => {
      let button;
      if (!this.optionDiv.childNodes[index]) {
        button = new Button({ parent: this });
        button.setTitle(option.label);
        // const label = new TextNode(button, option.label);
        // button.childNodes = [label];
        // button.setTitle(option.label);
        this.optionDiv.addChild(button);
      } else {
        button = this.optionDiv.childNodes[index] as Button;
      }
      button.style.addObj({
        height: '32px',
        borderRadius: '0',
        border: '1px solid #000',
      });
      button.attr.addObj({
        type: 'radio',
        value: option.value,
        checked: option.checked,
      });
      if (option.checked) {
        button.style.addObj({
          backgroundColor: '#00f',
          color: '#fff',
        });
        this.selectedOpt = button;
      } else {
        button.style.addObj({
          backgroundColor: '#fff',
          color: '#000',
        });
      }
      // span.childNodes.push(label, inputRadio);
      // this.optionDiv.childNodes.push(button);
    });
  }

  //
  resetResultValue(value: string): void {
    console.log('resetResultValue value is ', value);
    this.resultValue = value;
    this.params.options.forEach((item) => {
      item.checked = item.value === value;
    });
    console.log('this.config.options is ', this.params.options);
    this.setOptions(this.params.options);
    this.optionDiv.mount();
  }

  override mounted(): void {
    this.optionDiv.childNodes.forEach((btn) => {
      if (btn.dom === undefined) {
        return;
      }
      if (btn instanceof TypeElement) {
        btn.addEvent('click', () => {
          // if (OfdEditor.mode === 'read') {
          //   return;
          // }
          if (this.selectedOpt) {
            this.selectedOpt.style.setObj({
              backgroundColor: '#fff',
              color: '#000',
            });
            this.selectedOpt.attr.set('checked', false);
          }
          this.selectedOpt = btn as Button;
          if (btn instanceof TypeHtml) {
            btn.style.setObj({
              backgroundColor: '#00f',
              color: '#fff',
            });
            btn.attr.set('checked', true);
            this.resultValue = btn.attr.get('value') as string;
            this.reset(this.resultValue);
          } else {
            return;
          }
        });
      }
    });
  }
}
