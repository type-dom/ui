import { Button, Div, nextFrame } from '@type-dom/framework';
import { ElArrowRightSvg } from '@type-dom/svgs';
import { UI } from '../../../ui/ui.abstract';
import { $textColor, $transitionDurationDefault } from '../../../styles/var';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
// import { $collapseTransition, $collapseTransitionActive, $transition } from '../../../styles/transition';
import { $collapse } from '../td-collapse/td-collapse.style';
import { TdCollapse } from '../td-collapse/td-collapse.class';
import { ICollapseActiveName } from '../td-collapse/td-collapse.interface';
import { TdCollapseTransition } from '../td-collapse-transition/td-collapse-transition.class';
import {
  ITdCollapseItem,
  ITdCollapseItemConfig
} from './td-collapse-item.interface';

export class TdCollapseItem extends UI<undefined> implements ITdCollapseItem {
  className: 'TdCollapseItem';
  override props: ITdCollapseItemConfig
  override parent?: TdCollapse;
  headerBtn: Button;
  private disabled?: boolean;
  wrapper: Div;
  content: Div;
  private focusing?: boolean;
  private isClick?: boolean;
  private transition: TdCollapseTransition;
  arrowIcon: TdIcon;

  constructor(params: ITdCollapseItemConfig = {}) {
    super();
    this.useTag('fragment');
    this.className = 'TdCollapseItem';
    this.headerBtn = new Button({
      name: 'collapse-item-header',
      attrObj: {
        type: 'button',
        // ariaControls: scopedHeadId,
        // ariaExpanded: 'isActive',
        tabIndex: this.disabled ? -1 : 0
      },
      styleObj: {
        width: '100%',
        padding: 0,
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        // height: getCssVar('collapse-header-height'),
        height: $collapse.headerHeight,
        // line-height: getCssVar('collapse-header-height'),
        lineHeight: $collapse.headerHeight,
        // background-color: getCssVar('collapse-header-bg-color'),
        backgroundColor: $collapse.headerBgColor,
        // color: getCssVar('collapse-header-text-color'),
        color: $collapse.headerTextColor,
        cursor: 'pointer',
        // border-bottom: 1px solid getCssVar('collapse-border-color'),
        borderBottom: '1px solid ' + $collapse.borderColor,
        // font-size: getCssVar('collapse-header-font-size'),
        fontSize: $collapse.headerFontSize,
        fontWeight: 500,
        // transition: border-bottom-color getCssVar('transition-duration'),
        transition: 'border-bottom-color ' + $transitionDurationDefault,
        outline: 'none'
      },
      events: {
        click: () => {
          const nameId = params?.nameId || '';
          this.handleHeaderClick(nameId);
        },
        // keydown.space.enter.stop.prevent: () => {
        // },
        keydown: (event) => {
          if (event?.key === 'Enter' || event?.key === ' ') {
            event?.preventDefault();
            event?.stopPropagation();
            this.handleEnterClick();
          }
        },
        focus: () => {
          this.handleFocus();
        },
        blur: (evt, element) => {
          this.focusing = false;
        }
      }
    });
    this.addChild(this.headerBtn);
    if (params?.slots?.title) {
      this.headerBtn.slotChild(params.slots.title);
    } else if (params?.title) {
      this.headerBtn.setTitle(params.title);
    }
    this.arrowIcon = new TdIcon({
      svgObj: new ElArrowRightSvg(),
      styleObj: {
        margin: '0 8px 0 auto',
        // transition: transform getCssVar('transition-duration'),
        transition: 'transform ' + $transitionDurationDefault,
        fontWeight: 300
      }
    });
    this.headerBtn.addChild(this.arrowIcon);

    this.wrapper = new Div({
      name: 'wrapper',
      attrObj: {
        ariaHidden: 'true',
        role: 'region'
        // ariaLabelledby: scopedHeadId,
      },
      styleObj: {
        // display: 'none',
        willChange: 'height',
        // maxHeight: 0,
        // background-color: getCssVar('collapse-content-bg-color'),
        backgroundColor: $collapse.contentBgColor,
        overflow: 'hidden',
        boxSizing: 'border-box',
        // border-bottom: 1px solid getCssVar('collapse-border-color'),
        borderBottom: '1px solid ' + $collapse.borderColor
      }
    });
    this.content = new Div({
      name: 'collapse-item-content',
      styleObj: {
        paddingBottom: '25px',
        // font-size: getCssVar('collapse-content-font-size'),
        fontSize: $collapse.contentFontSize,
        // color: getCssVar('collapse-content-text-color'),
        color: $collapse.contentTextColor,
        lineHeight: 1.769230769230769
      }
    });
    if (params?.slot) {
      this.content.slotChild(params.slot);
    }
    this.wrapper.addChild(this.content);

    this.transition = new TdCollapseTransition({
      parent: this,
      slot: this.wrapper
    });
    this.addChild(this.transition);

    this.props = this.useParams(params);
  }

  setActive(active: boolean) {
    if (active) {
      // todo transition
      // this.wrapper.addStyleObj($collapseTransitionActive);
      // collapseTransitionConfig.beforeEnter && collapseTransitionConfig.beforeEnter(this.wrapper);
      // collapseTransitionConfig.enter && collapseTransitionConfig.enter(this.wrapper);
      // collapseTransitionConfig.afterEnter && collapseTransitionConfig.afterEnter(this.wrapper);
      // collapseTransitionConfig.enterCancelled(this.wrapper);
      // nextFrame(() => {
      //   // 计算内容的高度
      //   const contentHeight = this.wrapper.dom.scrollHeight + 'px';
      //   console.log('contentHeight is ', contentHeight);
      //   this.wrapper.setStyleObj({
      //     maxHeight: contentHeight,
      //     // height: '50px',
      //     // opacity: 1,
      //     // display: undefined,
      //   });
      // });
      this.transition.showSlot(true);
      this.headerBtn.style.setObj({
        borderBottomColor: 'transparent'
      });
      this.arrowIcon.style.setObj({
        transform: 'rotate(90deg)'
      });
    } else {
      // todo transition
      // this.wrapper.addStyleObj($collapseTransition);
      // nextFrame(() => {
      //   this.wrapper.setStyleObj({
      //     maxHeight: 0,
      //     // height: '0px',
      //     // opacity: 0,
      //     // display: 'none',
      //     // transition: 'transform 1s', // + $transitionDuration,
      //   });
      // });

      this.transition.showSlot(false);
      this.headerBtn.style.setObj({
        transition: 'transform ' + $transitionDurationDefault,
      });
      this.arrowIcon.style.setObj({
        transform: 'rotate(0deg)'
      });
      // todo transition
      // this.wrapper.addStyleObj($collapseTransition);
    }
  }

  setDisable(disabled: boolean) {
    if (disabled) {
      this.headerBtn.style.setObj({
        // color: getCssVar('text-color-disabled'),
        color: $textColor.disabled,
        cursor: 'not-allowed'
      });
    } else {
      this.headerBtn.style.setObj({
        // color: getCssVar('collapse-header-text-color'),
        color: $collapse.headerTextColor,
        cursor: 'pointer'
      });
    }
  }

  handleFocus() {
    setTimeout(() => {
      if (this.isClick) {
        this.isClick = false;
      } else {
        this.focusing = true;
      }
    }, 50);
  }

  handleHeaderClick(name: ICollapseActiveName) {
    console.log('handleHeaderClick, name is ', name);
    if (this.props.disabled) {
      return;
    }
    this.parent?.handleItemClick(name);
    this.focusing = false;
    this.isClick = true;
  }

  handleEnterClick() {
    // name todo
    this.parent?.handleItemClick('name');
  }
}
