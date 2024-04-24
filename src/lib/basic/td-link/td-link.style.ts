import { IStyle, StyleCursor } from '@type-dom/framework';
import { $colors, IType } from '../../styles/var';

export const $baseLink: Partial<IStyle> = {
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  position: 'relative',
  textDecoration: 'none',
  outline: 'none',
  cursor: StyleCursor.pointer,
  padding: '0'
};

export const $linkStateColors: Record<string, any> = {};

export function buttonVariant($type: IType) {
  $linkStateColors[$type] = {
    default: {
      color: $colors[$type].base
    },
    hover: {
      color: $type === 'default' ? $colors['primary'].base : $colors[$type]['light-3'] // ['color', $type, 'light-3'],
      // content: '',
      // position: 'absolute',
      // left: 0,
      // right: 0,
      // height: 0,
      // bottom: 0,
      // borderBottom: '1px solid ' + ($type === 'default' ? $colors['primary'].base : $colors[$type]['light-3']),
    },
    active: {
      color: $colors[$type]['dark-2'] // ['color', $type, 'dark-2'],
    },
    disabled: {
      color: $colors[$type]['light-5'] // ['color', $type, 'light-5'],
    }
  };
}

for (const $type of ['primary', 'success', 'warning', 'info', 'danger', 'default']) {
  buttonVariant($type as IType);
}
