import { InjectionKey } from '@type-dom/framework';
import { DescriptionsProps, IDescriptionsInject } from './td-descriptions.interface';

export const descriptionsKey: InjectionKey<IDescriptionsInject> =
  Symbol('tdDescriptions');

export const descriptionProps: DescriptionsProps = {
  column: 3,
  direction: 'horizontal',
  title: '',
  extra: '',
  labelWidth: '',
};
