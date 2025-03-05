import { IRoute, ITypeFragment, TypeFragmentProps } from '@type-dom/framework';

export interface ITdMenuItem extends ITypeFragment {
  className: 'TdMenuItem';
}

export interface TdMenuItemProps extends TypeFragmentProps {
  /**
   * @description unique identification
   *     default: null,
   */
  mIndex?: string;
  /**
   * @description Vue Router object
   */
  route?: IRoute
  /**
   * @description whether disabled
   */
  disabled?: boolean,
}
