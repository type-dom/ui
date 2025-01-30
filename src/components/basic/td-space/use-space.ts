import { computed, effect, signal, toRaw, unref } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { isArray, isNumber } from '@type-dom/utils';
import { useNamespace } from '../../../hooks/use-namespace';
import { SpaceProps } from './td-space.interface';

const SIZE_MAP: Record<string, number> = {
  small: 8,
  default: 12,
  large: 16,
} as const;

export function useSpace(props: SpaceProps) {
  const ns = useNamespace('space');

  const classes = computed(() => [
    ns.b(),
    ns.m(toRaw(props.direction)),
    props.class,
  ]);

  const horizontalSize = signal(0);
  const verticalSize = signal(0);

  const containerStyle = computed(() => {
    const wrapKls: IStyle =
      props.wrap || toRaw(props.fill) ? { flexWrap: 'wrap' } : {};
    const alignment: IStyle = {
      alignItems: props.alignment,
    };
    const gap: IStyle = {
      rowGap: `${verticalSize.get()}px`,
      columnGap: `${horizontalSize.get()}px`,
    };
    // return Object.assign({}, wrapKls, alignment, gap, props.styleObj)
    return [wrapKls, alignment, gap, props.styleObj as IStyle];
  });

  const itemStyle = computed<IStyle>(() => {
    return toRaw(props.fill)
      ? { flexGrow: 1, minWidth: `${toRaw(props.fillRatio)}%` }
      : {};
  });

  effect(() => {
    console.error('TdSpace effect . ');
    const { wrap, direction: dir, fill } = props;
    const size = unref(props.size);
    // when the specified size have been given
    if (isArray(size)) {
      const [h = 0, v = 0] = size;
      horizontalSize.set(h);
      verticalSize.set(v);
    } else {
      let val: number;
      if (isNumber(size)) {
        val = size;
      } else {
        val = SIZE_MAP[size || 'small'] || SIZE_MAP.small;
      }

      if ((wrap || fill) && dir === 'horizontal') {
        horizontalSize.set(val);
        verticalSize.set(val);
      } else {
        if (dir === 'horizontal') {
          horizontalSize.set(val);
          verticalSize.set(0);
        } else {
          verticalSize.set(val);
          horizontalSize.set(0);
        }
      }
    }
  });

  return {
    classes,
    containerStyle,
    itemStyle,
  };
}
