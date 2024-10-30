import { IStyle } from '@type-dom/css-type';

export const $transitionDuration = {
  '': '0.3s',
  default: '0.3s',
  fast: '0.2s',
};

export const $transitionFunction = {
  easeInOutBezier: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  fastBezier: 'cubic-bezier(0.23, 1, 0.32, 1)',
};

// transition
export const $transition = {
  //   'all': all getCssVar('transition-duration')
  // getCssVar('transition-function-ease-in-out-bezier'),
  all:
    'all ' +
    $transitionDuration.default +
    ' ' +
    $transitionFunction.easeInOutBezier,
  //   'fade': opacity getCssVar('transition-duration')
  // getCssVar('transition-function-fast-bezier'),
  fade:
    'opacity ' +
    $transitionDuration.default +
    ' ' +
    $transitionFunction.fastBezier,
  //   'md-fade': (
  //   transform getCssVar('transition-duration')
  // getCssVar('transition-function-fast-bezier'),
  //   opacity getCssVar('transition-duration')
  // getCssVar('transition-function-fast-bezier'),
  // ),
  mdFade:
    'transform ' +
    $transitionDuration.fast +
    ' ' +
    $transitionFunction.fastBezier +
    ', opacity ' +
    $transitionDuration.default +
    ' ' +
    $transitionFunction.fastBezier,
  // 'fade-linear': opacity getCssVar('transition-duration-fast') linear,
  fadeLinear: 'opacity ' + $transitionDuration.fast + ' linear',
  //   'border': border-color getCssVar('transition-duration-fast')
  // getCssVar('transition-function-ease-in-out-bezier'),
  border:
    'border-color ' +
    $transitionDuration.fast +
    ' ' +
    $transitionFunction.easeInOutBezier,
  //   'box-shadow': box-shadow getCssVar('transition-duration-fast')
  // getCssVar('transition-function-ease-in-out-bezier'),
  boxShadow:
    'box-shadow ' +
    $transitionDuration.fast +
    ' ' +
    $transitionFunction.easeInOutBezier,
  //   'color': color getCssVar('transition-duration-fast')
  // getCssVar('transition-function-ease-in-out-bezier'),
  color:
    'color ' +
    $transitionDuration.fast +
    ' ' +
    $transitionFunction.easeInOutBezier,
};

//.fade-in-linear-enter-active,
//.fade-in-linear-leave-active {
//  transition: getCssVar('transition-fade', 'linear');
//}
export const $fadeInLinearActive: IStyle = {
  transition: $transition.fadeLinear,
};

// .fade-in-linear-enter-from,
//   .fade-in-linear-leave-to {
//   opacity: 0;
// }
export const $fadeInLinearEnterFrom: IStyle = {
  opacity: 0,
};

// .#{$namespace}-fade-in-enter-active,
//   .#{$namespace}-fade-in-leave-active {
//   transition: all getCssVar('transition-duration') cubic-bezier(0.55, 0, 0.1, 1);
// }
export const $fadeInActive: IStyle = {
  transition:
    'all ' + $transitionDuration.default + ' cubic-bezier(0.55, 0, 0.1, 1)',
};

//.#{$namespace}-zoom-in-center-enter-from,
//.#{$namespace}-zoom-in-center-leave-active {
//  opacity: 0;
//  transform: scaleX(0);
//}
export const $zoomInCenterEnterFrom: IStyle = {
  opacity: 0,
  transform: 'scaleX(0)',
};

//.#{$namespace}-zoom-in-top-enter-active,
//.#{$namespace}-zoom-in-top-leave-active {
//  opacity: 1;
//  transform: scaleY(1);
//  transition: getCssVar('transition-md-fade');
//  transform-origin: center top;
//
//  &[data-popper-placement^='top'] {
//    transform-origin: center bottom;
//  }
//}
export const $zoomInTopActive: IStyle = {
  opacity: 1,
  transform: 'scaleY(1)',
  transition: $transition.mdFade,
  transformOrigin: 'center top',
  // '&[data-popper-placement^="top"]': {
  //   transformOrigin: 'center bottom'
  // }
};

//.#{$namespace}-zoom-in-top-enter-from,
//.#{$namespace}-zoom-in-top-leave-active {
//  opacity: 0;
//  transform: scaleY(0);
//}
export const $zoomInTopEnterFrom: IStyle = {
  opacity: 0,
  transform: 'scaleY(0)',
};

//.#{$namespace}-zoom-in-bottom-enter-active,
//.#{$namespace}-zoom-in-bottom-leave-active {
//  opacity: 1;
//  transform: scaleY(1);
//  transition: getCssVar('transition-md-fade');
//  transform-origin: center bottom;
//}
export const $zoomInBottomActive: IStyle = {
  opacity: 1,
  transform: 'scaleY(1)',
  transition: $transition.mdFade,
  transformOrigin: 'center bottom',
};

//.#{$namespace}-zoom-in-bottom-enter-from,
//.#{$namespace}-zoom-in-bottom-leave-active {
//  opacity: 0;
//  transform: scaleY(0);
//}
export const $zoomInBottomEnterFrom: IStyle = {
  opacity: 0,
  transform: 'scaleY(0)',
};

//.#{$namespace}-zoom-in-left-enter-active,
//.#{$namespace}-zoom-in-left-leave-active {
//  opacity: 1;
//  transform: scale(1, 1);
//  transition: getCssVar('transition-md-fade');
//  transform-origin: top left;
//}
export const $zoomInLeftActive: IStyle = {
  opacity: 1,
  transform: 'scale(1, 1)',
  transition: $transition.mdFade,
  transformOrigin: 'top left',
};

//.#{$namespace}-zoom-in-left-enter-from,
//.#{$namespace}-zoom-in-left-leave-active {
//  opacity: 0;
//  transform: scale(0.45, 0.45);
//}
export const $zoomInLeftEnterFrom: IStyle = {
  opacity: 0,
  transform: 'scale(0.45, 0.45)',
};

// .collapse-transition {
//   transition: getCssVar('transition-duration') height ease-in-out,
//     getCssVar('transition-duration') padding-top ease-in-out,
//     getCssVar('transition-duration') padding-bottom ease-in-out;
// }
// .collapse-transition {
//   transition: var(--el-transition-duration) height ease-in-out,var(--el-transition-duration) padding-top ease-in-out,var(--el-transition-duration) padding-bottom ease-in-out
// }
//
export const $collapseTransition: IStyle = {
  transition:
    $transitionDuration.default +
    ' height ease-in-out, ' +
    $transitionDuration.default +
    ' padding-top ease-in-out, ' +
    $transitionDuration.default +
    ' padding-bottom ease-in-out',
};

// .#{$namespace}-collapse-transition-leave-active,
//   .#{$namespace}-collapse-transition-enter-active {
//   transition: getCssVar('transition-duration') max-height ease-in-out,
//     getCssVar('transition-duration') padding-top ease-in-out,
//     getCssVar('transition-duration') padding-bottom ease-in-out;
// }
// .el-collapse-transition-leave-active,.el-collapse-transition-enter-active {
//   transition: var(--el-transition-duration) max-height ease-in-out,
//   var(--el-transition-duration) padding-top ease-in-out,
//   var(--el-transition-duration) padding-bottom ease-in-out
// }
//
export const $collapseTransitionActive: IStyle = {
  transition:
    $transitionDuration.default +
    ' max-height ease-in-out, ' +
    $transitionDuration.default +
    ' padding-top ease-in-out, ' +
    $transitionDuration.default +
    ' padding-bottom ease-in-out',
};

// .horizontal-collapse-transition {
//   transition: getCssVar('transition-duration') width ease-in-out,
//     getCssVar('transition-duration') padding-left ease-in-out,
//     getCssVar('transition-duration') padding-right ease-in-out;
// }
// .horizontal-collapse-transition {
//   transition: var(--el-transition-duration) width ease-in-out,var(--el-transition-duration) padding-left ease-in-out,var(--el-transition-duration) padding-right ease-in-out
// }
export const $horizontalCollapseTransition: IStyle = {
  transition:
    $transitionDuration.default +
    'width ease-in-out, ' +
    $transitionDuration.default +
    ' padding-left ease-in-out, ' +
    $transitionDuration.default +
    ' padding-right ease-in-out',
};

//
// .horizontal-collapse-transition .el-sub-menu__title .el-sub-menu__icon-arrow {
//   transition: var(--el-transition-duration-fast);
//   opacity: 0
// }
