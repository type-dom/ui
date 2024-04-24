import { fromEvent } from 'rxjs';
import { Button, Div, Label, TypeElement, IOptionSet, IOptionSetting } from '@type-dom/framework';
import { FieldItem } from '../field-item.abstract';

export abstract class FieldRadio extends FieldItem {
  childNodes: [Label, Div, Button];
  name: string;
  resultValue: string | number | boolean;
  optionDiv: Div;
  override config: IOptionSetting;
  private selectedOpt!: Button;

  protected constructor(labelText = '单选', config: IOptionSetting) {
    super(labelText);
    this.name = config.name;
    this.resultValue = config.resultValue;
    this.optionDiv = new Div();
    this.childNodes = [this.label, this.optionDiv, this.button];
    this.config = config;
    this.setOptions(config.options);
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
      button.addStyleObj({
        height: '32px',
        borderRadius: '0',
        border: '1px solid #000'
      });
      button.addAttrObj({
        type: 'radio',
        value: option.value,
        checked: option.checked
      });
      if (option.checked) {
        button.styleObj.backgroundColor = '#00f';
        button.styleObj.color = '#fff';
        this.selectedOpt = button;
      } else {
        button.styleObj.backgroundColor = '#fff';
        button.styleObj.color = '#000';
      }
      // span.childNodes.push(label, inputRadio);
      // this.optionDiv.childNodes.push(button);
    });
  }

  //
  resetResultValue(value: string): void {
    console.log('resetResultValue value is ', value);
    this.resultValue = value;
    this.config.options.forEach(item => {
      item.checked = item.value === value;
    });
    console.log('this.config.options is ', this.config.options);
    this.setOptions(this.config.options);
    this.optionDiv.render();
  }

  override initEvents(): void {
    this.optionDiv.childNodes.forEach((btn) => {
      if (btn.dom === undefined) {
        return;
      }
      this.subscriptions.push(
        fromEvent(btn.dom, 'click').subscribe(() => {
          // if (OfdEditor.mode === 'read') {
          //   return;
          // }
          if (this.selectedOpt) {
            this.selectedOpt.setStyleObj({
              backgroundColor: '#fff',
              color: '#000'
            });
            this.selectedOpt.setAttribute('checked', false);
          }
          this.selectedOpt = btn as Button;
          if (btn instanceof TypeElement) {
            btn.setStyleObj({
              backgroundColor: '#00f',
              color: '#fff'
            });
            btn.setAttribute('checked', true);
            this.resultValue = btn.attrObj.value as string;
            this.reset(this.resultValue);
          } else {
            return;
          }
        })
      );
    });
  }
}
