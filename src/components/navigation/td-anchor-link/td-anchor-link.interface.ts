import { ITypeDiv, TypeDivProps } from '@type-dom/framework';

export interface ITdAnchorLink extends ITypeDiv {
  className: 'TdAnchorLink';
}

export interface AnchorLinkProps extends TypeDivProps {
  /**
   * @description the text content of the anchor link
   */
  title?: string;
  /**
   * @description The address of the anchor link
   */
  href?: string;

  // contents?: TypeElement[];
}
