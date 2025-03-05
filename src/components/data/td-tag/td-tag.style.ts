import { IStyle } from '@type-dom/css-type';
import { ComponentSize } from '../../../constants/size';
import {
  $borderWidth,
  $colors,
  $fillColor,
  $types,
  IType,
} from '../../../styles/var';

export const $tag: {
  fontSize: string;
  bgColor?: string;
  borderColor?: string;
  hoverColor?: string;
  borderRadius: string;
  borderRadiusRounded?: string;
  textColor?: string;
  hit?: string;
} = {
  fontSize: '12px',
  borderRadius: '4px',
  borderRadiusRounded: '9999px',
};

export const $tagHeight = {
  '': '24px',
  large: '32px',
  default: '24px',
  small: '20px',
};

export const $tagPadding = {
  '': '10px',
  large: '12px',
  default: '10px',
  small: '8px',
};

export const $tagIconSize = {
  '': '14px',
  large: '16px',
  default: '14px',
  small: '12px',
};

export const $tagBorderWidth = '1px';

export const $tagIconSpanGap = {
  '': '6px',
  large: '8px',
  default: '6px',
  small: '4px',
};

export const $iconSize = '14px';
// 常用主题
// dark
// plain
export const $tagTypes = {} as Record<
  IType,
  {
    bgColor: string;
    borderColor: string;
    hoverColor: string;
    textColor: string;
    hit: string;
  }
>;

export function genTheme(
  $backgroundColorWeight: string | false,
  $borderColorWeight: string,
  $hoverColorWeight: string
) {
  $tag.bgColor = returnVarList($backgroundColorWeight);
  $tag.borderColor = returnVarList($borderColorWeight);
  $tag.hoverColor = returnVarList($hoverColorWeight);
  for (const type of $types) {
    $tagTypes[type] = {
      bgColor: returnVarList($backgroundColorWeight, type),
      borderColor: returnVarList($borderColorWeight, type),
      hoverColor: returnVarList($hoverColorWeight, type),
      textColor: $colors[type].base,
      hit: $colors[type].base,
    };
    // console.log('$tagTypes[type] is ', $tagTypes[type]);
  }
  const hoverColor = returnVarList($hoverColorWeight, 'primary');
  // console.log('hoverColor is ', hoverColor);
}

function returnVarList($var: string | false, $type: IType = 'primary') {
  // console.log('returnVarList . ');
  let $list = $fillColor.blank;
  if ($var !== false) {
    $list = $colors[$type] && $colors[$type][$var || 'base'];
  }
  return $list;
}

export const $tagSizes = {} as Record<ComponentSize, IStyle>;

export function useType() {
  for (const size of ['', 'large', 'default', 'small']) {
    $tagSizes[size as ComponentSize] = {
      padding:
        '0 ' +
        (parseFloat($tagPadding[size as ComponentSize]) -
          parseFloat($tagBorderWidth)) +
        'px',
      height: $tagHeight[size as ComponentSize],
      // iconSize: $tagIconSize[size as ISize],
      // iconSpanGap: $tagIconSpanGap[size]
      marginLeft: $tagIconSpanGap[size as ComponentSize],
      // paddingRight: parseFloat($tagIconSpanGap[size as ISize]) - parseFloat($borderWidth) + 'px', // closable 时
    };
    if (size === 'small') {
      $tagSizes[size].transform = 'scale(0.8)';
    }
  }
}
