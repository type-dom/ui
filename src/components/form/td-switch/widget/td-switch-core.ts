import {
  Div,
  TypeSpanProps,
  Span,
  toValue,
  TypeSpan,
  SvgSvg,
} from '@type-dom/framework';
import { ElCheckedSvg, ElLoadingSvg, ElUnlockSvg } from '@type-dom/svgs';
import { unref, watch } from '@type-dom/signals';
import { utilsEllipsis } from '../../../../styles/utils';
import { $colorWhite } from '../../../../styles/var';
import { TdIcon } from '../../../basic/td-icon/td-icon.class';
import { SwitchProps, SwitchContext } from '../td-switch.interface';
import {
  $switchBorderColor,
  $switchButtonSize,
  $switchContentPadding,
  $switchCoreActionStyle,
  $switchCoreBorderRadius,
  $switchCoreHeight,
  $switchCoreInnerStyle,
  $switchCoreStyle,
  $switchCoreWidth,
  $switchFontSize,
  $switchOffColor,
  $switchOnColor,
} from '../td-switch.style';
import { TdSwitch } from '../td-switch.class';
import { switchKey } from '../td-switch.const';

export class TdSwitchCore extends TypeSpan {
  className: 'TdSwitchCore';
  action: Div;
  override parent?: TdSwitch;
  override props: SwitchProps & TypeSpanProps;
  private innerText?: Span;
  private innerIcon?: TdIcon;
  inner?: Div;
  actionIcon?: TdIcon;
  actionSpan?: Span;

  constructor(params: SwitchProps = {}) {
    super();
    console.log('TdSwitchCore constructor . ');
    this.className = 'TdSwitchCore';
    this.attr.addObj({
      name: 'switch-core',
    });
    this.style.addObj({
      ...$switchCoreStyle,
      borderRadius: $switchCoreBorderRadius[params?.size || 'default'],
      minWidth: $switchCoreWidth[unref(params?.size) || 'default'],
      height: $switchCoreHeight[unref(params?.size) || 'default'],
    });
    if (params?.inlinePrompt) {
      this.inner = new Div({
        name: 'switch-inner',
        styleObj: {
          ...$switchCoreInnerStyle,
          height: $switchButtonSize[unref(params?.size) || 'default'],
          padding:
            '0 ' +
            $switchContentPadding[unref(params?.size) || 'default'] +
            ' 0 calc(' +
            $switchButtonSize[unref(params?.size) || 'default'] +
            ' + 2px)',
        },
      });
      this.addChild(this.inner);
      if (params?.activeIcon || params?.inactiveIcon) {
        this.innerIcon = new TdIcon({
          name: 'switch-inner-icon',
          slot:
            params?.modelValue === params?.activeValue
              ? params.activeIcon
              : params?.inactiveIcon,
          styleObj: {
            fontSize: '12px', // $fontSizes.base,
            // color: var(--el-color-white),
            color: $colorWhite,
            userSelect: 'none',
            ...utilsEllipsis,
          },
        });
        this.inner.addChild(this.innerIcon);
      } else if (params?.activeText || params?.inactiveText) {
        this.innerText = new Span({
          name: 'switch-inner-text',
          slot:
            params?.modelValue === params?.activeValue
              ? params?.activeText
              : params?.inactiveText,
          styleObj: {
            // fontSize: $switchFontSize[params?.size || 'default'],
            fontSize: '12px', // $fontSizes.base,
            // color: var(--el-color-white),
            color: $colorWhite,
            userSelect: 'none',
            ...utilsEllipsis,
          },
        });
        this.inner.addChild(this.innerText);
      }
    }

    this.action = new Div({
      name: 'switch-action',
      styleObj: {
        ...$switchCoreActionStyle,
        width: $switchButtonSize[params.size || 'default'],
        height: $switchButtonSize[params.size || 'default'],
      },
    });

    if (params?.loading) {
      const loadingIcon = new TdIcon({
        name: 'switch-loading-icon',
        slot: new ElLoadingSvg(),
        // loading: true // todo
      });
      this.action.addChild(loadingIcon);
    } else if (params?.modelValue === params?.activeValue) {
      this.action.style.addObj({
        color: $switchOnColor,
      });
      if (params?.activeActionIcon) {
        this.actionIcon = new TdIcon({
          name: 'switch-action-icon',
          slot: params.activeActionIcon,
        });
        this.action.addChild(this.actionIcon);
      } else if (params?.activeActionText) {
        this.actionSpan = new Span({
          name: 'switch-action-text',
          slot: params.activeActionText,
        });
        this.action.addChild(this.actionSpan);
      }
    } else if (params?.modelValue !== params?.activeValue) {
      if (params?.inactiveActionIcon) {
        this.actionIcon = new TdIcon({
          name: 'switch-action-icon',
          slot: params.inactiveActionIcon,
        });
        this.action.addChild(this.actionIcon);
      } else if (params?.inactiveActionText) {
        this.actionSpan = new Span({
          name: 'switch-action-text',
          slot: params.inactiveActionText,
        });
        this.action.addChild(this.actionSpan);
      }
    }
    this.addChild(this.action);
    this.props = this.useParams(params) as SwitchProps & TypeSpanProps;
  }

  override setup() {
    console.warn('td-switch-core setup . ');
    // const props = this.props;
    const switchContext = this.inject<SwitchContext>(switchKey);
    watch(
      () => toValue(switchContext?.checked),
      (newChecked) => {
        console.warn('switchContext.checked changed', newChecked);
        const raw = unref(newChecked);
        if (raw) {
          this.style.setObj({
            backgroundColor: this.props.switchOnColor ?? $switchOnColor,
          });
          this.action.style.setObj({
            color: $switchOnColor,
            // left: calc(100% - #{map.get($switch-button-size, 'default') + 1px});
            left:
              'calc(100% - ' +
              $switchButtonSize[unref(this.props.size) || 'default'] +
              ' - 1px)',
          });
          if (this.props.inlinePrompt) {
            this.setInnerChecked(true);
          }
          if (this.props.activeActionIcon) {
            this.actionIcon?.replaceSvg(this.props.activeActionIcon);
          } else if (this.props.activeActionText) {
            this.actionSpan?.textNode?.setText(this.props.activeActionText);
          }
        } else {
          // todo false
          console.warn('raw is false . ');
          this.style.setObj({
            backgroundColor: this.props.switchOffColor ?? $switchOffColor,
          });
          this.action.style.setObj({
            color: $switchOffColor,
            left: '1px',
          });

          if (this.props.inlinePrompt) {
            this.setInnerChecked(false);
          }
          if (this.props.inactiveActionIcon) {
            this.actionIcon?.replaceSvg(this.props.inactiveActionIcon);
          } else if (this.props.inactiveActionText) {
            this.actionSpan?.textNode?.setText(this.props.inactiveActionText);
          }
        }
      },
      { immediate: true }
    );
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
          $switchButtonSize[unref(this.props.size) || 'default'] +
          ' + 2px)' +
          '0 ' +
          $switchContentPadding[unref(this.props.size) || 'default'],
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
          $switchContentPadding[unref(this.props.size) || 'default'] +
          ' 0 calc(' +
          $switchButtonSize[unref(this.props.size) || 'default'] +
          ' + 2px)',
      });
      if (this.props.activeIcon || this.props.inactiveIcon) {
        this.innerIcon?.replaceSvg(this.props.inactiveIcon!);
      } else if (this.props.activeText || this.props.inactiveText) {
        this.innerText?.textNode?.setText(this.props.inactiveText || '');
      }
    }
  }
}
