// import { computed } from 'vue'
import { computed } from '@type-dom/signals';
// import { useNamespace } from '@element-plus/hooks'
import { useNamespace } from '../../../hooks/use-namespace';
import useMenuColor from './use-menu-color'

import type { MenuProps } from './td-menu.interface';

export const useMenuCssVar = (props: MenuProps, level: number) => {
  const ns = useNamespace('menu')
  return computed(() =>
    ns.cssVarBlock({
      'text-color': props.textColor || '',
      'hover-text-color': props.textColor || '',
      'bg-color': props.backgroundColor || '',
      'hover-bg-color': useMenuColor(props).get() || '',
      'active-color': props.activeTextColor || '',
      level: `${level}`,
    })
  )
}
