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
export enum InputEnum {
  text = 'text',
  checkbox = 'checkbox',
  radio = 'radio',
  button = 'button',
  submit = 'submit',
  password = 'password',
  reset = 'reset',
  hidden = 'hidden',
  file = 'file',
  image = 'image',
  color = 'color',
  url = 'url',
  number = 'number',
  range = 'range',
  tel = 'tel',
  email = 'email',
  search = 'search',
  month = 'month',
  week = 'week',
  date = 'date',
  time = 'time',
  datetime = 'datetime',
  datetimelocal = 'datetimelocal',
}
