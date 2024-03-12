import * as config from './config';
// BEM support Func
export function selectorToString($selector: string) {
  // $selector = inspect($selector);
  // $selector = strSlice($selector, 2, -2);
  $selector = $selector.slice(2, -2);
  return $selector;
}
export function containsModifier($selector: string): boolean {
  $selector = selectorToString($selector);
  return !!$selector.indexOf(config.$modifierSeparator);
}
export function containWhenFlag($selector: string): boolean {
  $selector = selectorToString($selector);
  return !!$selector.indexOf('.' + config.$statePrefix);
}

export function containPseudoClass($selector: string): boolean {
  $selector = selectorToString($selector);
  return !!$selector.indexOf(':');
}
export function hitAllSpecialNestRule($selector: string): boolean {
  return containsModifier($selector)
    || containWhenFlag($selector)
    || containPseudoClass($selector);
}

// join var name
// joinVarName(('button', 'text-color')) => '--el-button-text-color'
export function joinVarName($list: string[]): string {
  let $name = '--' + config.$namespace;
  for (const $item in $list) {
    if ($item !== '') {
      $name = $name + '-' + $item;
    }
  }
  return $name;
}

// getCssVarName('button', 'text-color') => '--el-button-text-color'
export function getCssVarName(...$args: string[]): string {
  return joinVarName($args);
}

// getCssVar('button', 'text-color') => var(--el-button-text-color)
export function getCssVar(...$args: string[]): string {
  // return var(#{joinVarName($args)});
  return joinVarName($args);
}

// getCssVarWithDefault(('button', 'text-color'), red) => var(--el-button-text-color, red)
export function getCssVarWithDefault($args: string[], $default: string): string {
  // return var(#{joinVarName($args)}, #{$default});
  return joinVarName($args) || $default;
}

// bem('block', 'element', 'modifier') => 'el-block__element--modifier'
export function bem($block: string, $element: '', $modifier: ''): string {
  let $name = config.$namespace + config.$commonSeparator + $block;
  if ($element !== '') {
    $name = $name + config.$elementSeparator + $element;
  }
  if ($modifier !== '') {
    $name = $name + config.$modifierSeparator + $modifier;
  }
  // debug $name;
  return $name;
}
