import { $borderColor, $fillColor, $textColor } from '../../../styles/var';
import { IStyle } from '@type-dom/css-type';

// Collapse
// css3 var in packages/theme-chalk/src/collapse.scss
export const $collapse = {
  // 'border-color': getCssVar('border-color-lighter'),
  borderColor: $borderColor.lighter,
  // 'header-height': '48px',
  headerHeight: '48px',
  // 'header-bg-color': getCssVar('fill-color', 'blank'),
  headerBgColor: $fillColor.blank,
  // 'header-text-color': getCssVar('text-color-primary'),
  headerTextColor: $textColor.primary,
  // 'header-font-size': '13px',
  headerFontSize: '13px',
  // 'content-bg-color': getCssVar('fill-color', 'blank'),
  contentBgColor: $fillColor.blank,
  'content-font-size': '13px',
  contentFontSize: '13px',
  // 'content-text-color': getCssVar('text-color-primary'),
  contentTextColor: $textColor.primary,
};

export const $collapseStyle: IStyle = {
  // border-top: 1px solid getCssVar('collapse-border-color');
  borderTop: '1px solid ' + $collapse.borderColor,
  // border-bottom: 1px solid getCssVar('collapse-border-color');
  borderBottom: '1px solid ' + $collapse.borderColor,
};
