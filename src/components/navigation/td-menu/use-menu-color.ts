// import { computed } from 'vue'
// import { TinyColor } from '@ctrl/tinycolor'

import { computed, ToRefs } from '@type-dom/signals';
import { TinyColor } from '@type-dom/color';
import type { MenuProps } from './td-menu.interface'

export default function useMenuColor(props: ToRefs<MenuProps>) {
  const menuBarColor = computed(() => {
    const color = props.backgroundColor?.get()
    return color ? new TinyColor(color).shade(20).toString() : ''
  })
  return menuBarColor
}
