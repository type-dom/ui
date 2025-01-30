import { ElBackSvg } from '@type-dom/svgs';
import { PageHeaderProps } from './td-page-header.interface';

export const pageHeaderProps: PageHeaderProps = {
  icon: ElBackSvg,
};

export const pageHeaderEmits = {
  back: () => true,
};
