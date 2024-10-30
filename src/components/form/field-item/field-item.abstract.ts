import {
  Div,
  Input,
  Label,
  Span,
  Textarea,
  Button,
  TypeDiv
} from '@type-dom/framework';
import { Select } from '../select/select.class';
import { labelStyle } from './field-item.style';
import { IFieldItem } from './field-item.interface';

export abstract class FieldItem extends TypeDiv implements IFieldItem {
  // abstract parent: Appearance | DataSetting | Description;
  abstract override childNodes: [
    Label,
    ...(Span | Input | Textarea | Select | Div)[],
    Button
  ];
  label: Label;
  button: Button;

  protected constructor(labelText: string) {
    super();
    this.style.addObj({
      // border: '1px solid #1890ff',
      // background: '#f3f9ff',
      display: 'flex',
      flexDirection: 'row',
      padding: '10px 0',
      // marginBottom: '10px!important',
      fontSize: '14px'
    });
    this.label = new Label({
      parent: this,
      text: labelText
    });
    // if (this.label?.textNode) {
    //   this.label.textNode.setText(labelText);
    //   this.label.childNodes.push(this.label.textNode);
    // }
    this.label.style.addObj(Object.assign({}, labelStyle));
    this.button = new Button({ parent: this });
    this.button.style.addObj({
      height: '28px',
      background: '#ffffff',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderLeft: 'none',
      borderColor: '#dcdfe6',
      display: 'none'
    });
  }

  setLabelTitle(text: string) {
    this.label.childNodes[0].nodeValue = text;
  }
}
