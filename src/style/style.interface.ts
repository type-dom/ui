import { Cursor, StylePosition, TextDecoration } from './style.enum';

/**
 * 字体格式设置
 * todo 专有属性要分别设置。
 *  extends CSSStyleDeclaration
 */
export interface IStyle {
  appearance: string;
  // border 边框
  border: string;
  borderStyle: string; // solid dotted dashed double;
  borderTopStyle: string; // 单边样式
  borderRightStyle: string;
  borderBottomStyle: string;
  borderLeftStyle: string;
  borderWidth: string;
  borderTopWidth: string;
  borderRightWidth: string;
  borderBottomWidth: string;
  borderLeftWidth: string;
  borderColor: string;
  borderTopColor: string;
  borderRightColor: string;
  borderBottomColor: string;
  borderLeftColor: string; // transparent 透明
  borderRadius: string;
  borderTop: string;
  borderRight: string;
  borderBottom: string;
  borderLeft: string;

  // margin
  margin: string;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  // chrome 69以上
  marginBlock: string; // 一个元素的逻辑块开始和结束边距，根据元素的写入模式、 方向性和文本方向映射到物理边界。
  marginBlockStart: string; // p标签 段首间距
  marginBlockEnd: string; // p标签 段尾间距
  marginLineStart: string; // p标签 起始行间距
  marginLineEnd: string; // p标签 尾间距

  // padding 内边距 可以用百分比。
  padding: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;

  // font 字体
  color: string; // 颜色
  font: string;
  fontFamily: string; // 字体
  fontSize: string; // 字号
  fontStyle: string; // 风格 斜体 normal - 文本正常显示 italic - 文本斜体显示 oblique - 文本倾斜显示
  fontWeight: string | number; // 字重 100 400 700 900 粗体/bold
  // background 背景
  background: string;
  backgroundColor: string;
  backgroundImage: string;
  backgroundRepeat: string;
  backgroundPosition: string; // top center bottom right left 50%;
  backgroundAttachment: string;
  backgroundSize: string;

  // 尺寸 (Dimension)
  width: string;
  height: string;
  lineHeight: string; // 设置行高。
  maxHeight: string;
  maxWidth: string;
  minHeight: string;
  minWidth: string;
  // 文本 text
  textAlign: string; // 对齐元素中的文本。
  textAlignLast: string; //
  textJustify: string; // 定义的是当文本的 text-align 属性被设置为 :justify 时的齐行方法。 none auto inter-word inter-character
  textIndent: string; // 缩进
  whiteSpace: string; // 用来设置如何处理元素中的 空白。
  wordSpacing: string; // 用于声明标签和单词直接的间距行为。
  wordBreak: string; //  指定了怎样在单词内断行。 normal | break-all | keep-all | break-word
  wordWrap: string;
  overflowWrap: string; // 是用来说明当一个不能被分开的字符串太长而不能填充其包裹盒时，为防止其溢出，浏览器是否允许这样的单词中断换行。normal | break-word
  // 注：word-wrap 属性原本属于微软的一个私有属性，在 CSS3 现在的文本规范草案中已经被重名为 overflow-wrap 。
  // word-wrap 现在被当作 overflow-wrap 的 “别名”。
  // 稳定的谷歌 Chrome 和 Opera 浏览器版本支持这种新语法。
  hyphens: string; // 告知浏览器在换行时如何使用连字符连接单词。可以完全阻止使用连字符，也可以控制浏览器什么时候使用，或者让浏览器决定什么时候使用。 none | manual | auto
  letterSpacing: string; // 用于设置文本字符的间距表现。 normal | <length>
  textTransform: string; // 指定如何将元素的文本大写。它可以用于使文本显示为全大写或全小写，也可单独对每一个单词进行操作。
  // none | capitalize首字母大写 | uppercase | lowercase | full-width | full-size-kana

  textDecoration: TextDecoration; // none underline;下划线 overline;顶划线 line-through;删除线
  textDecorationStyle: string; // wavy solid double dotted dashed 几乎所有的主流浏览器都不支持 text-decoration-style 属性。
  textDecorationColor: string; //

  direction: string; // ltr默认。文本方向从左到右。 rtl文本方向从右到左。 inherit
  unicodeBidi: string;  // 设置文本方向
  writingMode: string; // 只东亚字体
  textOrientation: string; // 英文字体等
  // outline 轮廓
  outline: string;
  outlineColor: string;
  outlineStyle: string;
  outlineWidth: string;

  // 兼容文字阅读方向 https://developer.mozilla.org/en-us/docs/web/css/margin-inline-start
  marginInlineStart: string;
  // defines the logical inline start margin of an element, which maps to a physical margin depending on the element's writing mode,
  // directionality, and text orientation. It corresponds to the margin-top, margin-right, margin-bottom,
  // or margin-left property depending on the values defined for writing-mode, direction, and text-orientation.
  marginInlineEnd: string;
  // 定位 (Positioning)
  position: keyof typeof StylePosition;
  left: string;
  top: string;
  right: string;
  bottom: string;
  overflow: string;
  clip: string;
  verticalAlign: string; // 上下标  super; sub；
  zIndex: number;

  // 分类属性 (Classification)
  clear: string;
  cursor: Cursor;
  display: string; //
  disabled:string; // 是否可以编辑

  float: string; // left right none inherit
  visibility: string; // visible hidden collapse inherit;

  opacity: number;

  // table

  tabSize: string; // 用于自定义制表符 (U+0009) 的宽度。
  lineBreak: string; // 可以用来处理如何断开（break lines）带有标点符号的中文、日文或韩文（CJK）文本的行。 auto | loose | normal | strict | anywhere

  transform: string;
  boxShadow: string;
  boxSizing: string; // 'content-box' | 'border-box';
  animation: string;
  flexDirection: string;

  fill: string;
  fillOpacity: number;
  stroke: string;
  strokeWidth: number;
  strokeOpacity: number;
  transformOrigin: string;
  flexWrap: string; // wrap
  justifyContent: string;
  alignItems: string;
  transition: string;
  flex: string;
  overflowY: string;
  listStyle: string;
  scrollBehavior: string;
  userSelect: string;
}
