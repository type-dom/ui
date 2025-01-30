import { defineExpose, provide, TypeFragment } from '@type-dom/framework';
import { Computed, computed, Signal, signal } from '@type-dom/signals';
import { Instance as PopperInstance } from '@type-dom/popper';
import { POPPER_INJECTION_KEY } from './constants';
import {
  ITdPopper,
  PopperProps,
  Measurable,
  RoleTypes,
  TdPopperInjectionContext,
} from './td-popper.interface';
import { popperProps } from './td-popper.const';
import './style/index';

export class TdPopper extends TypeFragment implements ITdPopper {
  className: 'TdPopper';
  override props: PopperProps;
  triggerRef?: Signal<Measurable | undefined>;
  popperInstanceRef?: Signal<PopperInstance | undefined>;
  contentRef?: Signal<HTMLElement | undefined>;
  referenceRef?: Signal<HTMLElement | undefined>;
  role?: Computed<RoleTypes | undefined>;

  constructor(params: PopperProps) {
    super();
    this.className = 'TdPopper';
    this.assignProps(popperProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const triggerRef = signal<HTMLElement>();
    const popperInstanceRef = signal<PopperInstance>();
    const contentRef = signal<HTMLElement>();
    const referenceRef = signal<HTMLElement>();
    const role = computed(() => props.role);

    const popperProviders: TdPopperInjectionContext = {
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

    defineExpose(popperProviders);
    provide(POPPER_INJECTION_KEY, popperProviders);

    this.slotChildren(props.slot || props.slots?.default);
  }
}
