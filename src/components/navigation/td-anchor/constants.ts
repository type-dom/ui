import { InjectionKey } from '@type-dom/framework';
import { AnchorContext } from './td-anchor.interface';

export const anchorKey: InjectionKey<AnchorContext> = Symbol('anchor');
