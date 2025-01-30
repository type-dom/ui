import { ITypeFooter, TypeFooterProps } from '@type-dom/framework';

export interface ITdFooter extends ITypeFooter {
  className: 'TdFooter';
  props: FooterProps;
}

export interface FooterProps extends TypeFooterProps {
  height?: string | number;
  backgroundColor?: string;
}
