import { ITypeAside, TypeAsideProps } from '@type-dom/framework';

export interface ITdAside extends ITypeAside {
  className: 'TdAside';
  props: TdAsideProps;
}

export interface TdAsideProps extends TypeAsideProps {
  width?: string | number;
}
