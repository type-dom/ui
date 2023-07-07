import {
  $bgColors,
  $borderColors, $borderStyle, $borderWidth, $boxShadow,
  $colorBlack,
  $colorPrimary,
  $colors,
  $colorWhite, $disabled,
  $fillColors, $overlayColor,
  $textColors
} from './var';

const colorScheme = {
  light: {
    color: {
      white: $colorWhite,
      black: $colorBlack,
      primary: {
        base: $colorPrimary,
        light: {
          3: '#79bbff',
          5: '#a0cfff',
          7: '#c6e2ff',
          8: '#d9ecff',
          9: '#ecf5ff',
        },
        dark: {
          2: '#337ecc',
        }
      },
      success: {
        base: '#67c23a',
        light: {
          3: '#95d475',
          5: '#b3e19d',
          7: '#d1edc4',
          8: '#e1f3d8',
          9: '#f0f9eb',
        },
        dark: {
          2: '#529b2e'
        }
      },
      warning: {
        base: '#e6a23c',
        light: {
          3: '#eebe77',
          5: '#f3d19e',
          7: '#f8e3c5',
          8: '#faecd8',
          9: '#fdf6ec',
        },
        dark: {
          2: '#b88230'
        }
      },
      danger: {
        base: '#f56c6c',
        light: {
          3: '#f89898',
          5: '#fab6b6',
          7: '#fcd3d3',
          8: '#fde2e2',
          9: '#fef0f0',
        },
        dark: {
          2: '#c45656'
        }
      },
      // error: === danger
      info: {
        base: '#909399',
        light: {
          3: '#b1b3b8',
          5: '#c8c9cc',
          7: '#dedfe0',
          8: '#e9e9eb',
          9: '#f4f4f5',
        },
        dark: {
          2: '#73767a'
        }
      }
    },
    bgColor: $bgColors,
    textColor: $textColors,
    borderColor: $borderColors,
    fillColor: $fillColors,
    boxShadow: $boxShadow,
    disabled: $disabled,
    overlay: {
      color: $overlayColor,
    },
    borderWidth: $borderWidth,
    borderStyle: $borderStyle,
  }
};
