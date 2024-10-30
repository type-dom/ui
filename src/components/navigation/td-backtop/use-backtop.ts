import { AnyFn } from '@type-dom/framework';
import { ITdBackTopConfig } from './td-backtop.interface';

export const useBackTop = (
  props: ITdBackTopConfig,
  // emit: ITdBacktopEmits,
  emit: (event: string, fn: AnyFn) => void,
  componentName: string
) => {
  let el:HTMLElement;
  let container: Document | HTMLElement;
  let visible = false;

  const handleScroll = () => {
    if (el) {
      visible = el.scrollTop >= (props.visibilityHeight ?? 0);
    }
  };

  const handleClick = (fn: AnyFn) => {
    el?.scrollTo({ top: 0, behavior: 'smooth' })
    emit('click', fn)
  }

  // const handleScrollThrottled = useThrottleFn(handleScroll, 300, true)
  //
  // useEventListener(container, 'scroll', handleScrollThrottled);

  const mounted = () => {
    container = document
    el = document.documentElement

    if (props.target) {
      // el = document.querySelector<HTMLElement>(props.target) ?? undefined
      el = props.target ?? undefined;
      if (!el) {
        throw Error(componentName + `target does not exist: ${props.target}`)
      }
      container = el;
    }
    // Give visible an initial value, fix #13066
    handleScroll()
  }

  return {
    visible,
    handleClick,
    mounted
  }
}
