import { IStyle } from '@type-dom/css-type';
import { $overlayColor } from '../../../styles/var';

export const $tdOverlayStyle: IStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 2000,
  height: '100%',
  // backgroundColor: getCssVar('overlay-color', 'lighter'),
  backgroundColor: $overlayColor.default,
  overflow: 'auto',
};
