import {
  StyleDisplay,
  Division,
  Input,
  IStyle,
  Label,
  Span,
  Textarea,
  TypeComponent,
  Button,
} from '@type-dom/framework';
// import { TdButton } from '../../basic/td-button/td-button.class';
import { Select } from '../select/select.class';
import { labelStyle } from "./field-item.style";
export abstract class FieldItem extends TypeComponent {
  abstract className: string;
  // abstract parent: Appearance | DataSetting | Description;
  abstract childNodes: [Label, ...(Span | Input | Textarea | Select | Division)[], Button];
  label: Label;
  button: Button;
  protected constructor(labelText: string) {
    super('div');
    this.propObj.styleObj = {
      // border: '1px solid #1890ff',
      // background: '#f3f9ff',
      display: 'flex',
      flexDirection: 'row',
      padding: '10px 0',
      // marginBottom: '10px!important',
      fontSize: '14px',
    };
    this.label = new Label({ parent: this });
    this.label.textNode.setText(labelText);
    this.label.childNodes.push(this.label.textNode);
    this.label.addStyleObj(Object.assign({}, labelStyle));
    this.button = new Button({ parent: this });
    this.button.addStyleObj({
      height: '28px',
      background: '#ffffff',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderLeft: 'none',
      borderColor: '#dcdfe6',
      display: 'none',
    });
  }
  setLabelTitle(text: string) {
    this.label.childNodes[0].nodeValue = text;
  }
  show(): void {
    this.setStyleObj({
      display: StyleDisplay.flex,
    });
  }
}
