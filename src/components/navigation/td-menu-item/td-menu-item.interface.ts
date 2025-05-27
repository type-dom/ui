import { ITypeFragment, TypeFragmentProps } from '@type-dom/framework';
import { RouteRecordRaw } from '@type-dom/router';

export interface ITdMenuItem extends ITypeFragment {
  className: 'TdMenuItem';
}

export interface TdMenuItemProps extends TypeFragmentProps {
  /**
   * @description unique identification
   *     default: null,
   */
  mIndex?: string | null;
  /**
   * @description Vue Router object
   */
  route?: RouteRecordRaw
  /**
   * @description whether disabled
   */
  disabled?: boolean,
}
