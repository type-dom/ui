import { Div, Span, StyleCursor, TypeSpan } from '@type-dom/framework';
import { ElCheckedSvg, ElLoadingSvg, ElUnlockSvg } from '@type-dom/svgs';
import {
  $borderColor,
  $borderRadius,
  $colors,
  $colorWhite,
  $fontSizes,
  $transitionDuration
} from '../../../../styles/var';
import { TdIcon } from '../../../basic/td-icon/td-icon.class';
import { ITdSwitchConfig } from '../td-switch.interface';
import {
  $switchBorderColor,
  $switchButtonSize, $switchContentPadding, $switchCoreHeight,
  $switchCoreWidth, $switchFontSize,
  $switchOffColor,
  $switchOnColor
} from '../td-switch.style';
import { TdSwitch } from '../td-switch.class';

export class TdSwitchCore extends TypeSpan {
  className: 'TdSwitchCore';
  action: Div;
  override parent?: TdSwitch;
  override config?: ITdSwitchConfig;
  inner?: Div;
  private innerText?: Span;
  private innerIcon?: TdIcon;
  actionIcon?: TdIcon;
  actionSpan?: Span;

  constructor(config?: ITdSwitchConfig) {
    super();
    this.config = config;
    this.className = 'TdSwitchCore';
    this.addAttrObj({
      name: 'switch-core'
    });
    this.addStyleObj({
      display: 'inline-flex',
      position: 'relative',
      alignItems: 'center',
      // border: '1px solid var(--el-switch-border-color, var(--el-switch-off-color))',
      border: '1px solid ' + $switchBorderColor,
      outline: 'none',
      borderRadius: '10px',
      boxSizing: 'border-box',
      background: $switchOffColor, // 'var(--el-switch-off-color)',
      // backgroundColor: $switchOnColor,
      cursor: StyleCursor.pointer,
      // transition: border-color var(--el-transition-duration), background-color var(--el-transition-duration);
      transition: $borderColor.base + ' ' + $transitionDuration + ', background-color ' + $transitionDuration,
      // minWidth: map.get($switch-core-width, 'default');
      minWidth: $switchCoreWidth[config?.size || 'default'],
      // height: map.get($switch-core-height, 'default');
      height: $switchCoreHeight[config?.size || 'default']
    });
    if (config?.inlinePrompt) {
      this.inner = new Div({
        attrObj: {
          name: 'switch-inner'
        },
        styleObj: {
          width: '100%',
          // transition: all getCssVar('transition-duration'),
          transition: 'all ' + $transitionDuration,
          // height: map.get($switch-button-size, 'default'),
          height: $switchButtonSize[config?.size || 'default'],
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          // padding: 0 #{map.get($switch-content-padding, 'default')} 0 calc(#{map.get(
          //     $switch-button-size,
          //     'default'
          //   )} + 2px);
          padding: '0 ' + $switchContentPadding[config?.size || 'default'] + ' 0 calc(' + $switchButtonSize[config?.size || 'default'] + ' + 2px)'
        }
      });
      this.addChild(this.inner);
      if (config?.activeIcon || config?.inactiveIcon) {
        this.innerIcon = new TdIcon({
          svgObj: config?.modelValue === config?.activeValue ? config?.activeIcon : config?.inactiveIcon,
          attrObj: {
            name: 'switch-inner-icon'
          },
          styleObj: {
            fontSize: '12px', // $fontSizes.base,
            // color: var(--el-color-white),
            color: $colorWhite,
            userSelect: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }
        });
        this.inner.addChild(this.innerIcon);
      } else if (config?.activeText || config?.inactiveText) {
        this.innerText = new Span({
          text: config?.modelValue === config?.activeValue ? config?.activeText : config?.inactiveText,
          attrObj: {
            name: 'switch-inner-text'
          },
          styleObj: {
            // fontSize: $switchFontSize[config?.size || 'default'],
            fontSize: '12px', // $fontSizes.base,
            // color: var(--el-color-white),
            color: $colorWhite,
            userSelect: 'none',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }
        });
        this.inner.addChild(this.innerText);
      }
    }

    this.action = new Div({
      attrObj: {
        name: 'switch-action'
      },
      styleObj: {
        position: 'absolute',
        left: '1px',
        // left: 'calc(100% - 17px)',
        // borderRadius: var(--el-border-radius-circle),
        borderRadius: $borderRadius.circle,
        // transition: all var(--el-transition-duration),
        transition: 'all ' + $transitionDuration,
        width: $switchButtonSize[config?.size || 'default'],
        // width: map.get($switch-button-size, 'default');
        height: $switchButtonSize[config?.size || 'default'],
        // height: map.get($switch-button-size, 'default');
        // backgroundColor: var(--el-color-white),
        backgroundColor: $colorWhite,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // color: var(--el-switch-off-color),
        color: $switchOffColor
      }
    });

    if (config?.loading) {
      const loadingIcon = new TdIcon({
        svgObj: new ElLoadingSvg(),
        attrObj: {
          name: 'switch-loading-icon'
        },
        loading: true
      });
      this.action.addChild(loadingIcon);
    } else if (config?.modelValue === config?.activeValue) {
      this.action.addStyleObj({
        color: $switchOnColor
      });
      if (config?.activeActionIcon) {
        this.actionIcon = new TdIcon({
          svgObj: config.activeActionIcon,
          attrObj: {
            name: 'switch-action-icon'
          }
        });
        this.action.addChild(this.actionIcon);
      } else if (config?.activeActionText) {
        this.actionSpan = new Span({
          text: config.activeActionText,
          attrObj: {
            name: 'switch-action-text'
          }
        });
        this.action.addChild(this.actionSpan);
      }
    } else if (config?.modelValue !== config?.activeValue) {
      if (config?.inactiveActionIcon) {
        this.actionIcon = new TdIcon({
          svgObj: config.inactiveActionIcon,
          attrObj: {
            name: 'switch-action-icon'
          }
        });
        this.action.addChild(this.actionIcon);
      } else if (config?.inactiveActionText) {
        this.actionSpan = new Span({
          text: config.inactiveActionText,
          attrObj: {
            name: 'switch-action-text'
          }
        });
        this.action.addChild(this.actionSpan);
      }
    }
    this.addChild(this.action);
  }

  setInnerChecked(checked: boolean) {
    if (checked) {
      this.inner?.setStyleObj({
        // padding: 0 calc(#{map.get($switch-button-size, 'default')} + 2px) 0 #{map.get(
        //   $switch-content-padding,
        //   'default'
        // )};
        padding: '0 ' + 'calc(' + $switchButtonSize[this.config?.size || 'default'] + ' + 2px)' + '0 ' +
          $switchContentPadding[this.config?.size || 'default']
      });
      if (this.config?.activeIcon || this.config?.inactiveIcon) {
        this.innerIcon?.replaceSvg(this.config.activeIcon!);
      } else if (this.config?.activeText || this.config?.inactiveText) {
        this.innerText?.textNode?.setText(this.config?.activeText || '');
      }
    } else {
      this.inner?.setStyleObj({
        // padding: 0 #{map.get($switch-content-padding, 'default')} 0 calc(#{map.get(
        //   $switch-button-size,
        //   'default'
        // )} + 2px);
        padding: '0 ' + $switchContentPadding[this.config?.size || 'default'] + ' 0 calc(' + $switchButtonSize[this.config?.size || 'default'] + ' + 2px)'
      });
      if (this.config?.activeIcon || this.config?.inactiveIcon) {
        this.innerIcon?.replaceSvg(this.config.inactiveIcon!);
      } else if (this.config?.activeText || this.config?.inactiveText) {
        this.innerText?.textNode?.setText(this.config?.inactiveText || '');
      }
    }
  }
}
