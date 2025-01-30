import { InjectionKey } from '@type-dom/framework';
import { IDescriptionsInject } from './td-descriptions.interface';

export const descriptionsKey: InjectionKey<IDescriptionsInject> =
  Symbol('tdDescriptions');

export const descriptionProps: IDescriptionsInject = {
  column: 3,
  direction: 'horizontal',
};
