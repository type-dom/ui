import { TypeMainProps, ITypeMain } from '@type-dom/framework';

export interface ITdMain extends ITypeMain {
  className: 'TdMain';
}

export interface TdMainProps extends TypeMainProps {
  tag?: 'main';
}
