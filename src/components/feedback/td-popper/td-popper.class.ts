import { createProxy, IJsonData, XProxy } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { ITdPopper, ITdPopperConfig } from './td-popper.interface';
import { POPPER_INJECTION_KEY } from './td-popper.const';

export class TdPopper extends UI<undefined> implements ITdPopper {
  className: 'TdPopper';
  override props: ITdPopperConfig;

  constructor(params: ITdPopperConfig) {
    super();
    this.useTag('fragment');
    this.className = 'TdPopper';
    const triggerRef = createProxy(null);
    const popperInstanceRef = createProxy(null);
    const contentRef = createProxy(null);
    const referenceRef = createProxy(null);
    if (!params.role) {
      params.role = 'tooltip';
    }
    this.props = this.useParams(params);

    const role = this.props.role;
    const popperProviders = {
      /**
       * @description trigger element
       */
      triggerRef,
      /**
       * @description popperjs instance
       */
      popperInstanceRef,
      /**
       * @description popper content element
       */
      contentRef,
      /**
       * @description popper reference element
       */
      referenceRef,
      /**
       * @description role determines how aria attributes are distributed
       */
      role,
    };
    this.provide(POPPER_INJECTION_KEY, popperProviders);
  }
}
