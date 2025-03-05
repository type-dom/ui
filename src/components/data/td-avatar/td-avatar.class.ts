import { Img, TypeElement, TypeSpan } from '@type-dom/framework';
import { computed, signal, watch } from '@type-dom/signals';
import { addUnit, isNumber, isString } from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';
import { useNamespace } from '../../../hooks/use-namespace';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { ITdAvatar, AvatarProps } from './td-avatar.interface';
import { avatarEmits, avatarProps } from './td-avatar.const';
import './style/index';

export class TdAvatar extends TypeSpan implements ITdAvatar {
  className: 'TdAvatar';
  override props: AvatarProps;

  constructor(params: AvatarProps = {}) {
    super();
    this.className = 'TdAvatar';
    this.attr.addName('td-avatar');
    this.addEmits(avatarEmits);
    this.assignProps(avatarProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;

    const ns = useNamespace('avatar');

    const hasLoadError = signal(false);

    const avatarClass = computed(() => {
      const { size, icon, shape } = props;
      const classList = [ns.b()];
      if (isString(size)) {
        classList.push(ns.m(size));
      }
      if (icon) {
        classList.push(ns.m('icon'));
      }
      if (shape) {
        classList.push(ns.m(shape));
      }
      return classList;
    });

    const sizeStyle = computed(() => {
      const { size } = props;
      return isNumber(size)
        ? (ns.cssVarBlock({
            size: addUnit(size) || '',
          }) as IStyle)
        : undefined;
    });

    const fitStyle = computed<IStyle>(() => ({
      objectFit: props.fit,
    }));

    // need reset hasLoadError to false if src changed
    watch(
      () => props.src,
      () => hasLoadError.set(false)
    );

    function handleError(e?: Event) {
      // console.warn('TdAvatar handleError. ');
      hasLoadError.set(true);
      emit('error', e);
    }

    this.attr.addClass(avatarClass);
    this.style.addObj(sizeStyle);
    if ((props.src || props.srcSet) && !hasLoadError.get()) {
      this.addChild(
        new Img({
          vIf: computed(
            () => (props.src || props.srcSet) && !hasLoadError.get()
          ),
          attrObj: {
            src: props.src,
            alt: props.alt,
            srcset: props.srcSet,
          },
          styleObj: fitStyle,
          events: {
            error: handleError,
          },
        })
      );
    } else if (props.icon) {
      this.addChild(
        new TdIcon({
          // vIf: computed(() => props.icon),
          slot: props.icon,
        })
      );
    } else {
      // 只加载，不动态清除；
      this.slotChildren(props.slot);
    }
    watch(
      () => hasLoadError.get(), // add by me
      (newVal) => {
        if (newVal) {
          if (props.slot instanceof TypeElement) {
            this.slotChildren(props.slot); // todo 添加了，但是没有渲染
            props.slot.mount(this.dom); // todo 优化，如何才能替换
          }
        }
      }
    );
  }
}
