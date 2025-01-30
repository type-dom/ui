import { addUnit, getScrollContainer, throwError } from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';
import { computed, effect, signal, watch } from '@type-dom/signals';
import {
  defineExpose,
  Div,
  onMounted,
  TypeDiv,
  useElementBounding,
  useEventListener,
  useWindowSize,
} from '@type-dom/framework';
import { useNamespace } from '../../../hooks/use-namespace';
import { ITdAffix, AffixProps } from './td-affix.interface';
import { affixEmits, affixProps } from './td-affix.const';

export class TdAffix extends TypeDiv implements ITdAffix {
  className: 'TdAffix';
  override props: AffixProps;
  updateAffix?: () => void; // todo 与框架的 update 方法重复了
  updateRoot?: () => void;

  constructor(params: AffixProps = {}) {
    super();
    console.log('TdAffix constructor . ');
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

    const target = signal<HTMLElement>();
    const root = signal<HTMLDivElement | undefined>();
    const scrollContainer = signal<HTMLElement | Window>();
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
      return {
        height: fixed.get() ? `${rootHeight.get()}px` : '',
        width: fixed.get() ? `${rootWidth.get()}px` : '',
      };
    });

    const affixStyle = computed<IStyle>(() => {
      if (!fixed.get()) return {};

      const offset = props.offset ? addUnit(props.offset) : 0;
      return {
        height: `${rootHeight.get()}px`,
        width: `${rootWidth.get()}px`,
        top: props.position === 'top' ? offset : '',
        bottom: props.position === 'bottom' ? offset : '',
        transform: transform.get() ? `translateY(${transform.get()}px)` : '',
        zIndex: props.zIndex,
      };
    });

    const updateAffix = () => {
      if (!scrollContainer.get()) return;

      scrollTop.set(
        scrollContainer.get() instanceof Window
          ? document.documentElement.scrollTop
          : (scrollContainer?.get() as HTMLElement)?.scrollTop || 0
      );

      const { position, target } = props;
      const offset = props.offset!;
      const rootHeightOffset = offset! + rootHeight.get();

      if (position === 'top') {
        if (target) {
          const difference = targetRect.bottom.get() - rootHeightOffset;
          fixed.set(offset > rootTop.get() && targetRect.bottom.get() > 0);
          transform.set(difference < 0 ? difference : 0);
        } else {
          fixed.set(offset > rootTop.get());
        }
      } else if (target) {
        const difference =
          windowHeight.get() - targetRect.top.get() - rootHeightOffset;
        fixed.set(
          windowHeight.get() - offset < rootBottom.get() &&
            windowHeight.get() > targetRect.top.get()
        );
        transform.set(difference < 0 ? -difference : 0);
      } else {
        fixed.set(windowHeight.get() - offset < rootBottom.get());
      }
    };

    const handleScroll = () => {
      updateRoot();
      emit('scroll', {
        scrollTop: scrollTop.get(),
        fixed: fixed.get(),
      });
    };

    watch(fixed, (val) => emit('change', val));

    onMounted(() => {
      if (props.target) {
        target.set(
          document.querySelector<HTMLElement>(props.target) ?? undefined
        );

        if (!target.get())
          throwError(COMPONENT_NAME, `Target does not exist: ${props.target}`);
      } else {
        target.set(document.documentElement);
      }
      scrollContainer.set(getScrollContainer(root.get()!, true));
      updateRoot();
    });

    useEventListener(scrollContainer, 'scroll', handleScroll);
    effect(updateAffix);

    defineExpose({
      /** @description update affix status */
      updateAffix,
      /** @description update rootRect info */
      updateRoot,
    });

    this.assignProps({
      refDom: root,
      class: ns.b(),
      styleObj: rootStyle,
    });

    this.addChild(
      new Div({
        class: computed(() => [{ [ns.m('fixed')]: fixed.get() }]),
        slot: props.slot || props.slots?.default,
      })
    );
  }
}
