import { ITransitionConfig, TypeTransition } from '@type-dom/framework';
import { collapseTransitionConfig } from './td-collapse-transition.util';
import { ITdCollapseTransition } from './td-collapse-transition.interface';

export class TdCollapseTransition extends TypeTransition implements ITdCollapseTransition {
  className: 'TdCollapseTransition';

  constructor(params: ITransitionConfig = {}) {
    super(Object.assign(collapseTransitionConfig, params));
    this.className = 'TdCollapseTransition';
  }
}
