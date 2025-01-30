import { IStyle } from '@type-dom/css-type';
import { $bgColor, $borderColor, $textColor } from '../../../styles/var';
import { capitalize } from '@type-dom/utils';

export const $popper = {
  borderRadius: '4px',
};

export const $popperStyle: IStyle = {
  position: 'absolute',
  // border-radius: getCssVar('popper', 'border-radius'),
  borderRadius: $popper.borderRadius,
  padding: '5px 11px',
  zIndex: 2000,
  fontSize: '12px',
  lineHeight: '20px',
  minWidth: '10px',
  overflowWrap: 'break-word',
  // visibility: 'hidden' // 'visible', // edit by me
};

export const $popperArrowStyle: IStyle = {
  position: 'absolute',
  width: '10px',
  height: '10px',
  zIndex: -1,

  // add by me
  // position: 'absolute',
  // top: '100%', /* 箭头的位置 */
  // left: '50%',
  // marginLeft: '-5px',
  // width: 0,
  // height: 0,
  // borderLeft: '7px solid transparent',
  // borderRight: '7px solid transparent',
  // borderTop: '7px solid ' + $textColor.primary,
};

export const $arrowBeforeStyle: IStyle = {
  position: 'absolute',
  width: '10px',
  height: '10px',
  zIndex: -1,
  // content: ' ',
  transform: 'rotate(45deg)',
  // background: getCssVar('text-color', 'primary'),
  background: $textColor.primary,
  boxSizing: 'border-box',
};

export const $darkStyle: IStyle = {
  color: $bgColor.default, // getCssVar('bg-color');
  background: $textColor.primary, // getCssVar('text-color', 'primary');
  border: '1px solid ' + $textColor.primary, //getCssVar('text-color', 'primary');
};

export const $arrowDarkStyle: IStyle = {
  border: '1px solid ' + $textColor.primary, //getCssVar('text-color', 'primary');
  background: $textColor.primary, //getCssVar('text-color', 'primary');
  right: 0,
};

export const $lightStyle: IStyle = {
  background: $bgColor.overlay, // getCssVar('bg-color', 'overlay');
  border: '1px solid ' + $borderColor.light, // getCssVar('border-color', 'light');
};

export const $arrowLightStyle: IStyle = {
  border: '1px solid ' + $borderColor.light, // getCssVar('border-color', 'light');
  background: $bgColor.overlay, // getCssVar('bg-color', 'overlay');
  right: 0,
};

export const $customizedEffectStyle: IStyle = {
  /* Set padding to ensure the height is 32px */
  padding: '6px 12px',
  background: 'linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129))',
};

export const $customizedEffectArrowStyle: IStyle = {
  background: 'linear-gradient(45deg, #b2e68d, #bce689)',
  right: 0,
};

export const $popperContentPureStyle: IStyle = {
  padding: 0,
};

export const $placements = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

const $adjacency = {
  top: 'left',
  bottom: 'right',
  left: 'bottom',
  right: 'top',
};
// 根据placement 返回箭头对应的位置
export const matchPlacement = (placement: keyof typeof $placements) => {
  const opposite = $placements[placement];
  const borderPlacementColor = 'border' + capitalize(placement) + 'Color';
  const borderPlacement = 'border' + capitalize(placement);
  const borderAdjacencyColor =
    'border' + capitalize($adjacency[placement]) + 'Color';
  const borderAdjacency = 'border' + capitalize($adjacency[placement]);
  return {
    [opposite]: '-5px',
    [borderPlacementColor]: 'transparent !important',
    [borderAdjacencyColor]: 'transparent !important',
    [borderPlacement]: 'none',
    [borderAdjacency]: 'none',
  };
};
