import { ITypeDiv, TypeDivProps, TypeElement } from '@type-dom/framework';

export interface ITdResult extends ITypeDiv {
  className: 'TdResult';
}

export interface ResultProps extends TypeDivProps {
  /**
   * @description title of result
   *     default: '',
   */
  title?: string;
  /**
   * @description sub title of result
   *     default: '',
   */
  subTitle?: string;
  /**
   * @description icon type of result
   *     default: 'info',
   */
  icon?: 'success' | 'warning' | 'info' | 'error';

  slots?: {
    title?: TypeElement;
    subTitle?: TypeElement;
    extra?: TypeElement;
    icon?: TypeElement;
  };
}
