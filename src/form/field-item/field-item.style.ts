import { IStyle, StyleDisplay } from "@type-dom/framework";

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
