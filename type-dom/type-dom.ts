import { TypeNode } from "./type-node/type-node.abstract";
import { ITypeAttribute} from "./type-element/type-element.interface";
import { IStyle } from "./style/style.interface";
import { TypeElement } from "./type-element/type-element.abstract";
import { ITypeElement } from "./type-element/type-element.interface";
import { TypeHtml } from "./type-element/type-html/type-html.abstract";
import { ITypeHtml } from "./type-element/type-html/type-html.interface";
import { TypeSvg } from "./type-element/type-svg/type-svg.abstract";
import { ITypeSvg } from "./type-element/type-svg/type-svg.interface";
import { TypeRoot } from "./type-root/type-root.class";
import { ITypeRoot } from "./type-root/type-root.interface";
import { TypeContainer } from "./type-element/type-container/type-container.abstract";
import { ITypeContainer } from "./type-element/type-container/type-container.interface";
import { TypeComponent } from "./type-element/type-component/type-component.abstract";
import { ITypeComponent } from "./type-element/type-component/type-component.interface";
import  { TypeHeader } from "./type-element/type-html/header/header.abstract";
import { ITypeHeader } from "./type-element/type-html/header/header.interface";
import { TypeSection } from "./type-element/type-html/section/section.abstract";
import { ITypeSection } from "./type-element/type-html/section/section.interface";
import { TypeA } from "./type-element/type-html/a/a.abstract";
import { ITypeA } from "./type-element/type-html/a/a.interface";
import { TypeAbbr } from "./type-element/type-html/abbr/abbr.abstract";
import { ITypeAbbr } from "./type-element/type-html/abbr/abbr.interface";
import { TypeAddress } from "./type-element/type-html/address/address.abstract";
import { ITypeAddress } from "./type-element/type-html/address/address.interface";
import { TypeArea } from "./type-element/type-html/area/area.abstract";
import { ITypeArea } from "./type-element/type-html/area/area.interface";
import { TypeArticle } from "./type-element/type-html/article/article.abstract";
import { ITypeArticle } from "./type-element/type-html/article/article.interface";
import { TypeAside } from "./type-element/type-html/aside/aside.abstract";
import { ITypeAside } from "./type-element/type-html/aside/aside.interface";
import { TypeAudio } from "./type-element/type-html/audio/audio.abstract";
import { ITypeAudio } from "./type-element/type-html/audio/audio.interface";
import { TypeB } from "./type-element/type-html/b/b.abstract";
import { ITypeB } from "./type-element/type-html/b/b.interface";
import { TypeBr } from "./type-element/type-html/br/br.abstract";
import { TypeDiv } from "./type-element/type-html/div/div.abstract";
import { TextNode } from './text-node/text-node.class';
import { Division } from './element/html-element/division/division.class';
import { Heading } from './element/html-element/heading/heading.class';
import { UnorderedList } from './element/html-element/unordered-list/unordered-list.class';
import { ListItem } from './element/html-element/unordered-list/list-item/list-item.class';
import { XElement } from './x-element/x-element.class';
import { Header } from './element/html-element/header/header.class';
import { Button } from './element/html-element/button/button.class';
import { Span } from './element/html-element/span/span.class';
import { SectionClass } from './element/html-element/section/section.class';
import { Table } from './element/html-element/table/table.class';
import { TableBody } from './element/html-element/table/body/body.class';
import { Select } from './element/html-element/select/select.class';
import { Label } from './element/html-element/label/label.class';
import { Input } from './element/html-element/input/input.class';
import { Textarea } from './element/html-element/textarea/textarea.class';
import { TableHeaderCell } from './element/html-element/table/header-cell/header-cell.class';
import { TableRow } from './element/html-element/table/row/row.class';
import { TableHead } from './element/html-element/table/head/head.class';
import { TableDataCell } from './element/html-element/table/data-cell/data-cell.class';
import { SelectOption } from './element/html-element/select/option/option.class';
import { TableFoot } from './element/html-element/table/foot/foot.class';
// 命名空间  TypeDom
// class TypeDom {
//   static XElement = XElement;
//   static TextNode = TextNode;
//   static Division = Division;
//   static Span = Span;
//   static Button = Button;
//   static Header = Header;
//   static Section = SectionClass;
//   static Heading = Heading;
//   static UnorderedList = UnorderedList;
//   static ListItem = ListItem;
//   static Select = Select;
//   static SelectOption = SelectOption;
//   static Label = Label;
//   static Input = Input;
//   static Textarea = Textarea;
//   static Table = Table;
//   static TableHeaderCell = TableHeaderCell;
//   static TableHead = TableHead;
//   static TableBody = TableBody;
//   static TableRow = TableRow;
//   static TableDataCell = TableDataCell;
//   static TableFoot = TableFoot;
// }

export {
  // TypeDom,
  TypeNode,
    TypeElement,
    TypeHtml,
    TypeSvg,
  IStyle,
  ITypeElement,
  ITypeHtml,
  ITypeSvg,
  TypeRoot,
  ITypeRoot,
  TypeContainer,
  ITypeContainer,
  TypeComponent,
  ITypeComponent,
  TypeHeader,
  ITypeHeader,
  TypeSection,
  ITypeSection,
  TypeA,
  ITypeA,
  TypeAbbr,
  ITypeAbbr,
  TypeAddress,
  ITypeAddress,
  TypeArea,
  ITypeArea,
  TypeArticle,
  ITypeArticle,
  TypeAside,
  ITypeAside,
  TypeAudio,
  ITypeAudio,
  TypeB,
  ITypeB,
  TypeBr,
    TypeDiv,
  XElement,
  TextNode,
  Division,
  Span,
  Button,
  Header,
  SectionClass,
  Heading,
  UnorderedList,
  ListItem,
  Select,
  SelectOption,
  Label,
  Input,
  Textarea,
  Table,
  TableHeaderCell,
  TableHead,
  TableBody,
  TableRow,
  TableDataCell,
  TableFoot,
}


export type ITypeClass = typeof Button | typeof Division | typeof Heading
  | typeof Input | typeof Textarea | typeof Label| typeof Span
  | typeof Select | typeof SelectOption
  | typeof UnorderedList | typeof ListItem
  | typeof Table | typeof TableRow | typeof TableDataCell
  | typeof TableHeaderCell
  | typeof TableHead | typeof TableBody | typeof TableFoot;
