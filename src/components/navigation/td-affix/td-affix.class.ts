import { addUnit, getScrollContainer, throwError } from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';
import { computed, effect, signal, watch } from '@type-dom/signals';
import {
  defineExpose,
  nextFrame,
  nextTick,
  onMounted,
  useElementBounding,
  useEventListener,
  useWindowSize,
  Div,
  TypeDiv
} from '@type-dom/framework';
import { useNamespace } from '../../../hooks/use-namespace';
import { CHANGE_EVENT } from '../../../constants/event';
import { ITdAffix, AffixProps } from './td-affix.interface';
import { affixEmits, affixProps } from './td-affix.const';
import './style/index';

export class TdAffix extends TypeDiv implements ITdAffix {
  className: 'TdAffix';
  override props: AffixProps;
  updateAffix?: () => void; // todo 与框架的 update 方法重复了
  updateRoot?: () => void;

  constructor(params: AffixProps = {}) {
    super();
    // console.log('TdAffix constructor . ');
    this.className = 'TdAffix';
    this.attr.addName('td-affix');

    this.addEmits(affixEmits);
    this.assignProps(affixProps);
    this.props = this.useParams(params);
  }

  override setup(): void {
    const COMPONENT_NAME = 'TdAffix';

    const props = this.props;
    const emit = this.emit;

    const ns = useNamespace('affix');

    const target = signal<HTMLElement | null>();
    const root = signal<HTMLDivElement>();
    const scrollContainer = signal<HTMLElement | Window | undefined>();
    const { height: windowHeight } = useWindowSize();
    const {
      height: rootHeight,
      width: rootWidth,
      top: rootTop,
      bottom: rootBottom,
      update: updateRoot,
    } = useElementBounding(root, { windowScroll: false });
    const targetRect = useElementBounding(target);

    const fixed = signal(false);
    const scrollTop = signal(0);
    const transform = signal(0);

    const rootStyle = computed<IStyle>(() => {
      // console.warn('rootStyle . ');
      // const height = fixed.get() && rootHeight.get() ? `${rootHeight.get()}px`: undefined;
      // const width = fixed.get() && rootWidth.get() ? `${rootWidth.get()}px` : undefined;
      const height = fixed.get()? `${rootHeight.get()}px`: undefined;
      const width = fixed.get() ? `${rootWidth.get()}px` : undefined;
      // console.log('height is ', height);
      // console.log('width is ', width);
      return {
        height,
        width,
      };
    });

    const affixStyle = computed<IStyle>(() => {
      // console.log('affixStyle . ');
      if (!fixed.get()) return {
        height: undefined,
        width: undefined,
        top: undefined,
        bottom: undefined,
        transform: undefined,
        zIndex: undefined,
      };

      const offsetY = props.offset ? addUnit(props.offset) : 0;

      const height = rootHeight.get() ? `${rootHeight.get()}px` : undefined;
      const width = rootWidth.get() ? `${rootWidth.get()}px` : undefined;
      const top = props.position === 'top' ? offsetY : '';
      const transformY = transform.get() ? `translateY(${transform.get()}px)` : '';
      return {
        height,
        width,
        top,
        bottom: props.position === 'bottom' ? offsetY : '',
        transform: transformY,
        zIndex: props.zIndex,
      };
    });

    const updateAffix = () => {
      // console.warn('updateAffix . ');
      if (!scrollContainer.get()) {
        // console.error(COMPONENT_NAME, 'Scroll container is not available.');
        return;
      }

      scrollTop.set(
        scrollContainer.get() instanceof Window
          ? document.documentElement.scrollTop
          : (scrollContainer?.get() as HTMLElement)?.scrollTop || 0
      );

      const { position, target } = props;
      // todo offset floatingui function, here cannot set .
      // console.error('then offset . ');
      // const offset = props.offset ?? 0;
      const offsetY = props.offset ?? 0;
      const rootHeightOffset = offsetY + rootHeight.get();

      if (position === 'top') {
        if (target) {
          const difference = targetRect.bottom.get() - rootHeightOffset;
          fixed.set(offsetY > rootTop.get() && targetRect.bottom.get() > 0);
          transform.set(difference < 0 ? difference : 0);
        } else {
          fixed.set(offsetY > rootTop.get());
          // console.warn('fixed.get() is ', fixed.get());
        }
      } else if (target) {
        const difference =
          windowHeight.get() - targetRect.top.get() - rootHeightOffset;
        fixed.set(
          windowHeight.get() - offsetY < rootBottom.get() &&
            windowHeight.get() > targetRect.top.get()
        );
        transform.set(difference < 0 ? -difference : 0);
      } else {
        fixed.set(windowHeight.get() - offsetY < rootBottom.get());
      }
    };

    const handleScroll = async () => {
      // console.warn('handleScroll . ');
      updateRoot();
      await nextTick()
      emit('scroll', {
        scrollTop: scrollTop.get(),
        fixed: fixed.get(),
      });
    };

    watch(() => fixed.get(), (val) => emit(CHANGE_EVENT, val));

    onMounted(() => {
      // console.warn('onMounted . ');
      nextFrame(() => { // getScrollContainer 需要确保 root 已经渲染完成，并挂载到页面上；
        // console.warn('nextFrame . ');
        if (props.target) {
          target.set(document.querySelector<HTMLElement>(props.target));

          if (!target.get()) {
            throwError(COMPONENT_NAME, `Target does not exist: ${props.target}`);
            // console.error(COMPONENT_NAME, `Target does not exist: ${props.target}`);
            // return;
          }
        } else {
          target.set(document.documentElement);
        }
        scrollContainer.set(getScrollContainer(root.get(), true));
        // console.warn('scrollContainer.get() is ', scrollContainer.get());
        updateRoot();

        useEventListener(scrollContainer, 'scroll', handleScroll);
        effect(() => updateAffix());
      });
    });

    defineExpose({
      /** @description update affix status */
      updateAffix,
      /** @description update rootRect info */
      updateRoot,
    });

    this.assignProps({
      refDom: root,
      // class: ns.b(), // todo not set
      // styleObj: rootStyle,
    });
    this.attr.addClass(ns.b());
    this.style.addObj(rootStyle);

    this.addChild(
      new Div({
        class: computed(() => [{ [ns.m('fixed')]: fixed.get() }]),
        // class: computed(() => fixed.get() ? ns.m('fixed') : ''),
        styleObj: affixStyle,
        slot: props.slot || props.slots?.default,
      })
    );
  }
}
