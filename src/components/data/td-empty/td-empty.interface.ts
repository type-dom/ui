import { ITypeDiv, TypeDivProps, TypeElement } from '@type-dom/framework';

export interface ITdEmpty extends ITypeDiv {
  className: 'TdEmpty';
}

export interface EmptyProps extends TypeDivProps {
  /**
   * @description image URL of empty
   *     default: ''
   */
  image?: string;
  /**
   * @description image size (width) of empty
   */
  imageSize?: number;
  /**
   * @description description of empty
   *     default: ''
   */
  description?: string;

  slots?: {
    default?: TypeElement | TypeElement[];
    image?: TypeElement | TypeElement[];
    description?: TypeElement | TypeElement[];
  };
}
