import { $textColor } from '@type-dom/ui';
import { IStyle } from '@type-dom/css-type';
import { $transitionDuration } from '../../../styles/transition';

// Scrollbar
// css3 var in packages/theme-chalk/src/scrollbar.scss
export const $scrollbar = {
  opacity: 0.3,
  // bg-color: getCssVar('text-color-secondary'),
  bgColor: $textColor.secondary,
  hoverOpacity: 0.5,
  // hover-bg-color: getCssVar('text-color-secondary'),
  hoverBgColor: $textColor.secondary,
};

export const $scrollbarStyle: IStyle = {
  overflow: 'hidden',
  position: 'relative',
  height: '100%',
};

export const $scrollbarWrapStyle: IStyle = {
  overflow: 'auto',
  height: '100%',
};

export const $scrollbarWrapHiddenDefaultStyle: IStyle = {
  scrollbarWidth: 'none',
  // &::-webkit-scrollbar {
  //   display: none,
  // }
};

export const $scrollbarThumbStyle: IStyle = {
  position: 'relative',
  display: 'block',
  width: 0,
  height: 0,
  cursor: 'pointer',
  borderRadius: 'inherit',
  // background-color: var(
  //   #{getCssVarName('scrollbar-bg-color')},
  //   map.get($scrollbar, 'bg-color')
  // );
  backgroundColor: $scrollbar.bgColor,
  // transition: getCssVar('transition-duration') background-color;
  transition: $transitionDuration.default + 'background-color',
  // opacity: var(
  //   #{getCssVarName('scrollbar-opacity')},
  //   map.get($scrollbar, 'opacity')
  // );
  opacity: $scrollbar.opacity,
};

export const $scrollbarThumbHoverStyle: IStyle = {
  //   background-color: var(
  //     #{getCssVarName('scrollbar-hover-bg-color')},
  //     map.get($scrollbar, 'hover-bg-color')
  //   );
  backgroundColor: $scrollbar.hoverBgColor,
  //   opacity: var(
  //     #{getCssVarName('scrollbar-hover-opacity')},
  //     map.get($scrollbar, 'hover-opacity')
  //   );
  opacity: $scrollbar.hoverOpacity,
};

export const $scrollbarBarStyle: IStyle = {
  position: 'absolute',
  right: '2px',
  bottom: '2px',
  zIndex: 1,
  borderRadius: '4px',
};
