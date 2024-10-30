import { Div, Span, TypeSpan } from '@type-dom/framework';
import { ElCheckedSvg, ElLoadingSvg, ElUnlockSvg } from '@type-dom/svgs';
import {
  $borderColor,
  $borderRadius,
  $colors,
  $colorWhite,
  $fontSizes,
  $transitionDurationDefault
} from '../../../../styles/var';
import { TdIcon } from '../../../basic/td-icon/td-icon.class';
import { ITdSwitchConfig } from '../td-switch.interface';
import {
  $switchBorderColor,
  $switchButtonSize,
  $switchContentPadding,
  $switchCoreHeight,
  $switchCoreWidth,
  $switchFontSize,
  $switchOffColor,
  $switchOnColor
} from '../td-switch.style';
import { TdSwitch } from '../td-switch.class';

export class TdSwitchCore extends TypeSpan {
  className: 'TdSwitchCore';
  action: Div;
  override parent?: TdSwitch;
  override props: ITdSwitchConfig;
  inner?: Div;
  private innerText?: Span;
  private innerIcon?: TdIcon;
  actionIcon?: TdIcon;
  actionSpan?: Span;

  constructor(params: ITdSwitchConfig = {}) {
    super();
    this.className = 'TdSwitchCore';
    this.attr.addObj({
      name: 'switch-core'
    });
    this.style.addObj({
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
      cursor: 'pointer',
      // transition: border-color var(--el-transition-duration), background-color var(--el-transition-duration);
      transition:
        $borderColor.base +
        ' ' +
        $transitionDurationDefault +
        ', background-color ' +
        $transitionDurationDefault,
      // minWidth: map.get($switch-core-width, 'default');
      minWidth: $switchCoreWidth[params?.size || 'default'],
      // height: map.get($switch-core-height, 'default');
      height: $switchCoreHeight[params?.size || 'default']
    });
    if (params?.inlinePrompt) {
      this.inner = new Div({
        name: 'switch-inner',
        styleObj: {
          width: '100%',
          // transition: all getCssVar('transition-duration'),
          transition: 'all ' + $transitionDurationDefault,
          // height: map.get($switch-button-size, 'default'),
          height: $switchButtonSize[params?.size || 'default'],
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          // padding: 0 #{map.get($switch-content-padding, 'default')} 0 calc(#{map.get(
          //     $switch-button-size,
          //     'default'
          //   )} + 2px);
          padding:
            '0 ' +
            $switchContentPadding[params?.size || 'default'] +
            ' 0 calc(' +
            $switchButtonSize[params?.size || 'default'] +
            ' + 2px)'
        }
      });
      this.addChild(this.inner);
      if (params?.activeIcon || params?.inactiveIcon) {
        this.innerIcon = new TdIcon({
          name: 'switch-inner-icon',
          svgObj:
            params?.modelValue === params?.activeValue
              ? params?.activeIcon
              : params?.inactiveIcon,
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
      } else if (params?.activeText || params?.inactiveText) {
        this.innerText = new Span({
          name: 'switch-inner-text',
          text:
            params?.modelValue === params?.activeValue
              ? params?.activeText
              : params?.inactiveText,
          styleObj: {
            // fontSize: $switchFontSize[params?.size || 'default'],
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
      name: 'switch-action',
      styleObj: {
        position: 'absolute',
        left: '1px',
        // left: 'calc(100% - 17px)',
        // borderRadius: var(--el-border-radius-circle),
        borderRadius: $borderRadius.circle,
        // transition: all var(--el-transition-duration),
        transition: 'all ' + $transitionDurationDefault,
        width: $switchButtonSize[params?.size || 'default'],
        // width: map.get($switch-button-size, 'default');
        height: $switchButtonSize[params?.size || 'default'],
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

    if (params?.loading) {
      const loadingIcon = new TdIcon({
        name: 'switch-loading-icon',
        svgObj: new ElLoadingSvg(),
        loading: true
      });
      this.action.addChild(loadingIcon);
    } else if (params?.modelValue === params?.activeValue) {
      this.action.style.addObj({
        color: $switchOnColor
      });
      if (params?.activeActionIcon) {
        this.actionIcon = new TdIcon({
          name: 'switch-action-icon',
          svgObj: params.activeActionIcon
        });
        this.action.addChild(this.actionIcon);
      } else if (params?.activeActionText) {
        this.actionSpan = new Span({
          name: 'switch-action-text',
          text: params.activeActionText
        });
        this.action.addChild(this.actionSpan);
      }
    } else if (params?.modelValue !== params?.activeValue) {
      if (params?.inactiveActionIcon) {
        this.actionIcon = new TdIcon({
          name: 'switch-action-icon',
          svgObj: params.inactiveActionIcon
        });
        this.action.addChild(this.actionIcon);
      } else if (params?.inactiveActionText) {
        this.actionSpan = new Span({
          name: 'switch-action-text',
          text: params.inactiveActionText
        });
        this.action.addChild(this.actionSpan);
      }
    }
    this.addChild(this.action);
    this.props = this.useParams(params);
  }

  setInnerChecked(checked: boolean) {
    if (checked) {
      this.inner?.style.setObj({
        // padding: 0 calc(#{map.get($switch-button-size, 'default')} + 2px) 0 #{map.get(
        //   $switch-content-padding,
        //   'default'
        // )};
        padding:
          '0 ' +
          'calc(' +
          $switchButtonSize[this.props.size || 'default'] +
          ' + 2px)' +
          '0 ' +
          $switchContentPadding[this.props.size || 'default']
      });
      if (this.props.activeIcon || this.props.inactiveIcon) {
        this.innerIcon?.replaceSvg(this.props.activeIcon!);
      } else if (this.props.activeText || this.props.inactiveText) {
        this.innerText?.textNode?.setText(this.props.activeText || '');
      }
    } else {
      this.inner?.style.setObj({
        // padding: 0 #{map.get($switch-content-padding, 'default')} 0 calc(#{map.get(
        //   $switch-button-size,
        //   'default'
        // )} + 2px);
        padding:
          '0 ' +
          $switchContentPadding[this.props.size || 'default'] +
          ' 0 calc(' +
          $switchButtonSize[this.props.size || 'default'] +
          ' + 2px)'
      });
      if (this.props.activeIcon || this.props.inactiveIcon) {
        this.innerIcon?.replaceSvg(this.props.inactiveIcon!);
      } else if (this.props.activeText || this.props.inactiveText) {
        this.innerText?.textNode?.setText(this.props.inactiveText || '');
      }
    }
  }
}
