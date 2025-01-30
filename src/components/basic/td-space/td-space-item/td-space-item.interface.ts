import { ITypeDiv, TypeDivProps } from '@type-dom/framework';

export interface ITdSpaceItem extends ITypeDiv {
  className: 'TdSpaceItem';
}

export interface SpaceItemProps extends TypeDivProps {
  prefixCls?: string;
}
