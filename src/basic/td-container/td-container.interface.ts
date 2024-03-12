import { ITypeConfig, ITypeSection, TextNode, TypeElement } from '@type-dom/framework';
import { TdAside } from './td-aside/td-aside.class';
import { TdHeader } from './td-header/td-header.class';
import { TdMain } from './td-main/td-main.class';
import { TdContainer } from './td-container.class';
export interface ITdContainer extends ITypeSection {
  className: 'TdContainer';
}
export interface ITdContainerConfig extends ITypeConfig {
  name: string;
  // flexDirection: string;
  vertical: boolean;
  direction: 'vertical' | 'horizontal', // 子元素中有 el-header 或 el-footer 时为 vertical，否则为 horizontal
  childNodes: (TdAside | TdHeader | TdMain | TdContainer | TypeElement | TextNode)[];
}
