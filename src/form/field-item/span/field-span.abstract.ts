import { Button, Display, Label, Span, TextNode } from 'type-dom.ts';
import { FieldItem } from '../field-item.abstract';
export abstract class FieldSpan extends FieldItem {
  readonly text: TextNode;
  childNodes: [Label, Span, Button];
  content: Span;
  protected constructor(labelText = '控件名称') {
    super(labelText);
    this.content = new Span(this);
    this.content.propObj = {
      styleObj: {
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
        display: Display.inlineBlock,
        outline: '0',
        padding: '0 15px',
        // paddingLeft: '43px',
        // paddingRight: '43px',
        // -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: 'border-color .2s cubic-bezier(.645,.045,.355,1)',
        width: 'calc(100% - 80px)',
      },
      attrObj: {
        name: 'field-span',
      }
    };
    this.text = new TextNode(this.content, '显示');
    this.content.addChild(this.text);

    this.button.setStyleObj({
      // position: 'absolute',
      // right: '10px',
      padding: '8px 3px 4px',
      fontSize: '16px',
      display: 'none',
      border: '1px solid #DCDFE6',
      borderRadius: '0 4px 4px 0',
    });
    this.button.textNode.setText('');
    this.childNodes = [this.label, this.content, this.button];
  }
  resetText(value = ''): void {
    this.text.setText(value);
  }
}
