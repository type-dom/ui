// import { computed } from 'vue'
import { computed, ToRefs } from '@type-dom/signals';
// import { useNamespace } from '@element-plus/hooks'
import { useNamespace } from '../../../hooks/use-namespace';
import useMenuColor from './use-menu-color'

import type { MenuProps } from './td-menu.interface';

export const useMenuCssVar = (props: ToRefs<MenuProps>, level: number) => {
  const ns = useNamespace('menu')
  return computed(() =>
    ns.cssVarBlock({
      'text-color': props.textColor?.get() || '',
      'hover-text-color': props.textColor?.get() || '',
      'bg-color': props.backgroundColor?.get() || '',
      'hover-bg-color': useMenuColor(props).get() || '',
      'active-color': props.activeTextColor?.get() || '',
      level: `${level}`,
    })
  )
}
