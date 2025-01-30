import { IStyle } from '@type-dom/css-type';
import {
  $borderColor,
  $colorPrimary,
  $fontSizes,
  $textColor,
} from '../../../styles/var';
import {
  $transitionDuration,
  $transitionFunction,
} from '../../../styles/transition';
import { TabsProps } from './td-tabs.interface';
import { deepClone } from '@type-dom/utils';

export const $tabs = {
  headerHeight: '40px',
};

export const $tabsStyle: IStyle = {
  display: 'flex',
};

export const $tabsHeaderStyle: IStyle = {
  padding: 0,
  position: 'relative',
  margin: '0 0 15px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

export const $tabsHeaderVerticalStyle: IStyle = {
  flexDirection: 'column',
};

export const $tabsActiveBarStyle: IStyle = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  height: '2px',
  // background-color: getCssVar('color-primary'),
  backgroundColor: $colorPrimary,
  zIndex: 1,
  // transition: width getCssVar('transition-duration',
  // getCssVar('transition-function-ease-in-out-bezier'),
  //   transform getCssVar('transition-duration',
  // getCssVar('transition-function-ease-in-out-bezier'),
  transition:
    'width ' +
    $transitionDuration +
    ', ' +
    $transitionFunction.easeInOutBezier +
    ', ' +
    'transform ' +
    $transitionDuration +
    ', ' +
    $transitionFunction.easeInOutBezier,
  listStyle: 'none',
};

export const $tabsNewTabStyle: IStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // border: 1px solid getCssVar('border-color'),
  border: '1px solid ' + $borderColor,
  height: '20px',
  width: '20px',
  lineHeight: '20px',
  margin: '10px 0 10px 10px',
  borderRadius: '3px',
  textAlign: 'center',
  fontSize: '12px',
  // color: getCssVar('text-color', 'primary'),
  color: $textColor.primary,
  cursor: 'pointer',
  transition: 'all 0.15s',
};

export const $tabsNavWrapStyle: IStyle = {
  overflow: 'hidden',
  marginBottom: '-1px',
  position: 'relative',
  flex: '1 auto',
};

export const $tabsNavScrollStyle: IStyle = {
  position: 'absolute',
  cursor: 'pointer',
  lineHeight: '44px',
  fontSize: '12px',
  // color: getCssVar('text-color', 'secondary'),
  color: $textColor.secondary,
  width: '20px',
  textAlign: 'center',
};

export const $tabsNavWrapAfterStyle: IStyle = {
  // content: '',
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  height: '2px',
  // background-color: getCssVar('border-color-light'),
  backgroundColor: $borderColor.light,
  // zIndex: getCssVar('index-normal'),
};

export const $tabNavNextStyle: IStyle = {
  position: 'absolute',
  cursor: 'pointer',
  lineHeight: '44px',
  fontSize: '12px',
  // color: getCssVar('text-color', 'secondary'),
  color: $textColor.secondary,
  width: '20px',
  textAlign: 'center',
};

export const $tabsNavPrevStyle: IStyle = deepClone($tabNavNextStyle);

export const $tabsNavStyle: IStyle = {
  display: 'flex',
  whiteSpace: 'nowrap',
  position: 'relative',
  // transition: transform getCssVar('transition-duration'),
  transition: 'transform ' + $transitionDuration,
  float: 'left',
  // zIndex: calc(#{getCssVar('index-normal')} + 1),
  zIndex: 'calc(index-normal + 1)',
};

export const $tabsItemStyle: IStyle = {
  padding: '0 20px',
  // height: getCssVar('tabs', 'header-height'),
  height: $tabs.headerHeight,
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  listStyle: 'none',
  // font-size: getCssVar('font-size-base'),
  fontSize: $fontSizes.base,
  fontWeight: 500,
  // color: getCssVar('text-color', 'primary'),
  color: $textColor.primary,
  position: 'relative',
};

export const $tabsContentStyle: IStyle = {
  overflow: 'hidden',
  position: 'relative',
};

export function useStyle(config?: TabsProps) {}
