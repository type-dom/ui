import { ITypeLI, TypeLIProps } from '@type-dom/framework';

export interface ITdMenuItemGroup extends ITypeLI {
  className: 'TdMenuItemGroup';
}

export interface MenuItemGroupProps extends TypeLIProps {
  /**
   * @description group title
   */
  title?: string,
 }
