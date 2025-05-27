import {
  arraySlot,
  Button,
  defineExpose,
  Div,
  TypeDiv,
  Span,
} from '@type-dom/framework';
import { SvgSvg } from '@type-dom/svgs';
import { isFunction } from 'lodash-es';
import { Computed } from '@type-dom/signals';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { TdCollapseTransition } from '../td-collapse-transition/td-collapse-transition.class';
import {
  useCollapseItem,
  useCollapseItemDOM,
} from '../td-collapse/use-collapse-item';
import {
  ITdCollapseItem,
  CollapseItemProps,
} from './td-collapse-item.interface';
import { collapseItemProps } from './td-collapse-item.const';
import './style/index';

export class TdCollapseItem extends TypeDiv implements ITdCollapseItem {
  className: 'TdCollapseItem';
  override props: CollapseItemProps;
  isActive?: Computed<boolean | undefined>;

  constructor(params: CollapseItemProps = {}) {
    super();
    this.className = 'TdCollapseItem';
    this.attr.addName('td-collapse-item');

    this.assignProps(collapseItemProps);
    this.props = this.useParams(params);
  }

  override setup() {
    // console.log('setup . ');
    const props = this.props;
    const {
      focusing,
      id,
      isActive,
      handleFocus,
      handleHeaderClick,
      handleEnterClick,
    } = useCollapseItem(props);

    const {
      arrowKls,
      headKls,
      rootKls,
      itemTitleKls,
      itemWrapperKls,
      itemContentKls,
      scopedContentId,
      scopedHeadId,
    } = useCollapseItemDOM(props, { focusing, isActive, id });

    defineExpose({
      /** @description current collapse-item whether active */
      isActive,
    });

    this.attr.addClass(rootKls);
    this.addChild(
      new Button({
        attrObj: {
          id: scopedHeadId,
          class: headKls,
          ariaExpanded: isActive,
          arialControls: scopedContentId,
          ariaDescribedby: scopedContentId,
          tabindex: props.disabled ? -1 : 0,
          type: 'button',
        },
        events: {
          click: handleHeaderClick,
          keydown: (evt) => {
            if (evt?.key === 'Enter' || evt?.key === 'Space') {
              handleEnterClick();
            }
            evt?.stopPropagation();
            evt?.preventDefault();
          },
          focus: handleFocus,
          blur: () => focusing.set(false),
        },
        slot: [
          new Span({
            class: itemTitleKls,
            slot: isFunction(props.slots?.title) ? props.slots.title({ isActive }) : props.title,
          }),
          // ...arraySlot(props.slots?.title ?? props.title),
          ...arraySlot(
            props.slots?.icon ??
              new TdIcon({
                class: arrowKls,
                slot: new (props.icon as typeof SvgSvg)(),
              })
          ),
        ],
      })
    );

    // console.log('isActive.get() is ', isActive.get());
    this.addChild(
      new TdCollapseTransition({
        slot: new Div({
          vShow: isActive,
          attrObj: {
            id: scopedContentId,
            role: 'region',
            class: itemWrapperKls,
            ariaHidden: !isActive,
            ariaLabelledby: scopedHeadId,
          },
          slot: new Div({
            class: itemContentKls,
            slot: props.slot || props.slots?.default,
          }),
        }),
      })
    );
  }
}
