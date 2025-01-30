import { IStyle } from '@type-dom/css-type';
import {
  $borderColor,
  $borderRadius,
  $colorInfo,
  $colorPrimary,
  $colorWhite,
  $textColor,
} from '../../../styles/var';
import { $transitionDuration } from '../../../styles/transition';

// Slider
// css3 var in packages/theme-chalk/slider.scss
export const $sliderHeight = {
  large: 40,
  default: 32,
  small: 24,
};

export const $slider = {
  // main-bg-color: getCssVar(color-primary),
  mainBgColor: $colorPrimary,
  // runway-bg-color: getCssVar(border-color-light),
  runwayBgColor: $borderColor.light,
  // stop-bg-color: getCssVar(color-white),
  stopBgColor: $colorWhite,
  // disabled-color: getCssVar(text-color-placeholder),
  disabledColor: $textColor.placeholder,
  borderRadius: '3px',
  height: '6px',
  buttonSize: '20px',
  buttonWrapperSize: '36px',
  buttonWrapperOffset: '-15px',
};

export const $sliderStyle: IStyle = {
  width: '100%',
  // height: map.get($slider-height, 'default'),
  height: $sliderHeight.default + 'px',
  display: 'flex',
  alignItems: 'center',
};

export const $sliderRunwayStyle: IStyle = {
  flex: '1',
  height: $slider.height,
  // background-color: map.get($slider, 'runway-bg-color'),
  backgroundColor: $slider.runwayBgColor,
  borderRadius: $slider.borderRadius,
  position: 'relative',
  cursor: 'pointer',
};

export const $sliderInputStyle: IStyle = {
  flexShrink: 0,
  width: '130px',
};

export const $sliderBarStyle: IStyle = {
  // height: getCssVar('slider-height'),
  height: $slider.height,
  // background-color: getCssVar('slider-main-bg-color'),
  backgroundColor: $slider.mainBgColor,
  // border-top-left-radius: getCssVar('slider-border-radius'),
  borderTopLeftRadius: $slider.borderRadius,
  // border-bottom-left-radius: getCssVar('slider-border-radius'),
  borderBottomLeftRadius: $slider.borderRadius,
  position: 'absolute',
};

export const $sliderButtonWrapperStyle: IStyle = {
  // height: getCssVar('slider-button-wrapper-size'),
  height: $slider.buttonWrapperSize,
  // width: getCssVar('slider-button-wrapper-size'),
  width: $slider.buttonWrapperSize,
  position: 'absolute',
  zIndex: 1,
  // top: getCssVar('slider-button-wrapper-offset'),
  top: $slider.buttonWrapperOffset,
  transform: 'translateX(-50%)',
  backgroundColor: 'transparent',
  textAlign: 'center',
  userSelect: 'none',
  lineHeight: 'normal',
  outline: 'none',
  // @include utils-vertical-center,
};

export const $sliderButtonStyle: IStyle = {
  display: 'inline-block',
  // width: getCssVar('slider-button-size'),
  width: $slider.buttonSize,
  // height: getCssVar('slider-button-size'),
  height: $slider.buttonSize,
  verticalAlign: 'middle',
  // border: solid 2px getCssVar('slider-main-bg-color'),
  border: 'solid 2px ' + $slider.mainBgColor,
  // background-color: getCssVar('color-white'),
  backgroundColor: $slider.stopBgColor,
  borderRadius: '50%',
  boxSizing: 'border-box',
  // transition: getCssVar('transition-duration-fast'),
  transition: $transitionDuration.fast,
  userSelect: 'none',
};

export const $sliderStopStyle: IStyle = {
  position: 'absolute',
  // height: getCssVar('slider-height'),
  height: $slider.height,
  // width: getCssVar('slider-height'),
  width: $slider.height,
  // border-radius: getCssVar('border-radius-circle'),
  borderRadius: $borderRadius.circle,
  // background-color: getCssVar('slider-stop-bg-color'),
  backgroundColor: $slider.stopBgColor,
  transform: 'translateX(-50%)',
};

export const $sliderMarksStyle: IStyle = {
  top: 0,
  left: '12px',
  width: '18px',
  height: '100%',
};

export const $sliderMarksTextStyle: IStyle = {
  position: 'absolute',
  transform: 'translateX(-50%)',
  fontSize: '14px',
  // color: getCssVar('color-info'),
  color: $colorInfo,
  marginTop: '15px',
  whiteSpace: 'pre',
};
