import {
  StyleDisplay,
  Division,
  Input,
  IStyle,
  Label,
  Span,
  Textarea,
  TextNode,
  TypeComponent, Button,
} from 'type-dom.ts';
// import { TdButton } from '../../basic/td-button/td-button.class';
import { Select } from '../select/select.class';
export const labelStyle: Partial<IStyle> = {
  width: '80px',
  lineHeight: '28px',
  textAlign: 'right',
  verticalAlign: 'middle',
  float: 'left',
  fontSize: '14px',
  color: '#606266',
  paddingRight: '2px',
  // padding: '0 12px 0 0',
  // '-webkit-box-sizing': 'border-box',
  boxSizing: 'border-box',
};
export const itemContentStyle: Partial<IStyle> = {
  height: '28px',
  lineHeight: '28px',
  textAlign: 'center',
  backgroundColor: '#FFF',
  backgroundImage: 'none',
  borderRadius: '4px',
  border: '1px solid #DCDFE6',
  // -webkit-box-sizing: border-box;
  boxSizing: 'border-box',
  color: '#606266',
  display: StyleDisplay.inlineBlock,
  fontSize: 'inherit',
  outline: '0',
  // padding: '0 5px',
  paddingLeft: '15px',
  paddingRight: '5px',
  margin: '0',
  // -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  transition: 'border-color .2s cubic-bezier(.645,.045,.355,1)',
  width: 'calc(100% - ' + labelStyle.width + ')',
};
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
    this.label = new Label(this);
    this.label.textNode.setText(labelText);
    this.label.childNodes.push(this.label.textNode);
    this.label.addStyleObj(Object.assign({}, labelStyle));
    this.button = new Button(this);
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
