/**
 * 值            描述
 * none          默认。定义标准的文本。
 * underline    定义文本下的一条线。
 * overline      定义文本上的一条线。
 * line-through  定义穿过文本下的一条线。
 * blink        定义闪烁的文本。
 * inherit      规定应该从父元素继承 text-decoration 属性的值。
 */
export enum TextDecoration {
  none = 'none',
  underline = 'underline',
  overline = 'overline',
  // lineThrough
  lineThrough = 'line-through',
  blink = 'blink',
  inherit = 'inherit',
}

/**
 * Valid           value  Description
 * left             Align Left
 * center           Align Center
 * right           Align Right
 * both             Justified
 * mediumKashida   Medium Kashida Length
 * distribute       Distribute All Characters Equally
 * numTab           Align to List Tab
 * highKashida     Widest Kashida Length
 * lowKashida       Low Kashida Length
 * thaiDistribute   Thai Language Justification
 * Horizontal      Alignment Type
 * w:jc
 * todo 属性大写 ？？
 */
export enum JustifyContent {
  left = 'left',
  center = 'center',
  right = 'right',
  both = 'both',
  mediumKashida = 'medium-kashida',
  distribute = 'distribute',
  numTab = 'num-tab',
  highKashida = 'high-kashida',
  lowKashida = 'low-kashida',
  thaiDistribute = 'thai-distribute',
  horizontal = 'horizontal',
}

/**
 * Valid    value  Description
 * auto      Automatically Determined Line Height
 * exact    Exact Line Height
 * atLeast  Minimum Line Height
 */
export enum LineSpacingRule {
  auto = 'auto',
  exact = 'exact',
  atLeast = 'atLeast',
}

/**
 * Valid  value  Description
 * true    True
 * false  False
 * on      True
 * off    False
 * 0      False
 * 1      True
 */
export enum OnOff {
  // '0',
  // '1',
  true = 'true',
  false = 'false',
  on = 'on',
  off = 'off',
}

/**
 * Valid          value  Description
 * majorEastAsia  Major East Asian Theme Font
 * majorBidi      Major Complex Script Theme Font
 * majorAscii      Major ASCII Theme Font
 * majorHAnsi      Major High ANSI Theme Font
 * minorEastAsia  Minor East Asian Theme Font
 * minorBidi      Minor Complex Script Theme Font
 * minorAscii      Minor ASCII Theme Font
 * minorHAnsi      Minor High ANSI Theme Font
 */

export enum FontTheme {
  majorEastAsia = 'major-east-asia',
  majorBidi = 'major-bidi',
  majorAscii = 'major-ascii',
  majorHAnsi = 'majorHAnsi',
}

/**
 * 值         描述
 * absolute  生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
 * fixed     生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
 * relative  生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。
 * static     默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
 * inherit   规定应该从父元素继承 position 属性的值。
 */
export enum StylePosition {
  absolute = 'absolute',
  fixed = 'fixed',
  relative = 'relative',
  static = 'static',
  inherit = 'inherit',
}

/**
 * 值                  描述
 * none                此元素不会被显示。
 * block              此元素将显示为块级元素，此元素前后会带有换行符。
 * inline              默认。此元素会被显示为内联元素，元素前后没有换行符。
 * inline-block        行内块元素。（CSS2.1 新增的值）
 * list-item          此元素会作为列表显示。
 * run-in              此元素会根据上下文作为块级元素或内联元素显示。
 * compact            CSS 中有值 compact，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。
 * marker              CSS 中有值 marker，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。
 * table              此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。
 * inline-table        此元素会作为内联表格来显示（类似 <table>），表格前后没有换行符。
 * table-row-group    此元素会作为一个或多个行的分组来显示（类似 <tbody>）。
 * table-header-group  此元素会作为一个或多个行的分组来显示（类似 <thead>）。
 * table-foot-group  此元素会作为一个或多个行的分组来显示（类似 <tfoot>）。
 * table-row          此元素会作为一个表格行显示（类似 <tr>）。
 * table-column-group  此元素会作为一个或多个列的分组来显示（类似 <colgroup>）。
 * table-column        此元素会作为一个单元格列显示（类似 <col>）
 * table-cell          此元素会作为一个表格单元格显示（类似 <td> 和 <th>）
 * table-caption      此元素会作为一个表格标题显示（类似 <caption>）
 * inherit            规定应该从父元素继承 display 属性的值。
 */
export enum Display {
  none = 'none',
  block = 'block',
  inline = 'inline',
  inlineBlock = 'inline-block',
  listItem = 'list-item',
  runIn = 'run-in',
  compact = 'compact',
  marker = 'marker',
  table = 'table',
  inlineTable = 'inline-table',
  tableRowGroup = 'table-row-group',
  tableHeaderGroup = 'table-header-group',
  tableFooterGroup = 'table-footer-group',
  tableRow = 'table-row',
  tableColumnGroup = 'table-column-group',
  tableColumn = 'table-column',
  tableCell = 'table-cell',
  tableCaption = 'table-caption',
  inherit = 'inherit',
  flex = 'flex',
}

/**
 * 值          描述
 * url        需使用的自定义光标的 URL。注释：请在此列表的末端始终定义一种普通的光标，以防没有由 URL 定义的可用光标。
 * default    默认光标（通常是一个箭头）
 * auto        默认。浏览器设置的光标。
 * crosshair  光标呈现为十字线。
 * pointer    光标呈现为指示链接的指针（一只手）
 * move        此光标指示某对象可被移动。
 * e-resize    此光标指示矩形框的边缘可被向右（东）移动。
 * ne-resize  此光标指示矩形框的边缘可被向上及向右移动（北/东）。
 * nw-resize  此光标指示矩形框的边缘可被向上及向左移动（北/西）。
 * n-resize    此光标指示矩形框的边缘可被向上（北）移动。
 * se-resize  此光标指示矩形框的边缘可被向下及向右移动（南/东）。
 * sw-resize  此光标指示矩形框的边缘可被向下及向左移动（南/西）。
 * s-resize    此光标指示矩形框的边缘可被向下移动（南）。
 * w-resize    此光标指示矩形框的边缘可被向左移动（西）。
 * text      此光标指示文本。
 * wait        此光标指示程序正忙（通常是一只表或沙漏）。
 * help        此光标指示可用的帮助（通常是一个问号或一个气球）。
 */
export enum Cursor {
  default = 'default',
  auto = 'auto',
  crosshair = 'crosshair',
  pointer = 'pointer',
  move = 'move',
  eResize = 'e-resize',
  neResize = 'ne-resize',
  nwResize = 'nw-resize',
  nResize = 'n-resize',
  seResize = 'se-resize',
  swResize = 'sw-resize',
  sResize = 's-resize',
  wResize = 'w-resize',
  text = 'text',
  wait = 'wait',
  help = 'help',
  notAllowed = 'not-allowed'
}
