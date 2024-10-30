import { SlotNode, Span } from '@type-dom/framework';
import { ElCloseSvg } from '@type-dom/svgs';
import { UI } from '../../../ui/ui.abstract';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import {
  $borderWidth,
  $colorPrimary,
  $colorWhite,
  $fillColor
} from '../../../styles/var';
import { ITdTag, ITdTagConfig } from './td-tag.interface';
import {
  $tag,
  $tagHeight,
  $tagIconSize,
  $tagIconSpanGap,
  $tagPadding,
  $tagSizes,
  $tagTypes,
  genTheme, useType
} from './td-tag.style';

export class TdTag extends UI implements ITdTag {
  className: 'TdTag';
  override props: ITdTagConfig;
  private content: Span;
  private closeIcon?: TdIcon;
  private defaultSlot?: SlotNode;

  constructor(params: ITdTagConfig = {}) {
    super();
    this.useTag('span');
    this.className = 'TdTag';
    this.attr.addName('td-tag');
    useType();
    const type = params?.type || 'primary';
    const effect = params?.effect || 'light'; // 默认；
    if (effect === 'dark') {
      genTheme('', '', 'light-3');
      $tag.textColor = $colorWhite;
      $tagTypes[type].textColor = $colorWhite;
    } else if (effect === 'plain') {
      genTheme(false, 'light-5', '');
      $tag.bgColor = $fillColor.blank;
    } else {
      genTheme('light-9', 'light-8', '');
      console.log('genThem . then $tag is ', $tag);
      console.log('$tagTypes is ', $tagTypes);
    }

    this.style.addObj({
      // background-color: getCssVar('tag-bg-color'),
      backgroundColor: $tagTypes[type].bgColor,
      // border-color: getCssVar('tag-border-color'),
      borderColor: $tagTypes[type].borderColor,
      // color: getCssVar('tag-text-color'),
      color: $tagTypes[type].textColor,
      display: 'inline-flex',
      justifyContent: 'center',
      alignItems: 'center',
      verticalAlign: 'middle',
      // height: map.get($tag-height, 'default'),
      height: $tagHeight.default,
      // padding: 0 map.get($tag-padding, 'default') - $border-width,
      padding: '0 ' +
        (parseFloat($tagPadding.default) - parseFloat($borderWidth) + 'px'),
      // font-size: getCssVar('tag-font-size'),
      fontSize: $tag.fontSize,
      lineHeight: 1,
      // border-width: $tag-border-width,
      borderWidth: $borderWidth,
      borderStyle: 'solid',
      // border-radius: getCssVar('tag-border-radius'),
      borderRadius: $tag.borderRadius,
      boxSizing: 'border-box',
      whiteSpace: 'nowrap'

      // padding-right: map.get($tag-icon-span-gap, 'default') - $border-width; // isClosable
      // paddingRight: params?.closable ? parseFloat($tagIconSpanGap.default) - parseFloat($borderWidth) + 'px' : ''
    });
    this.content = new Span({
      // add content slot
      name: 'content'
    });
    this.addChild(this.content);
    if (params?.slot) {
      this.defaultSlot = new SlotNode('default', params.slot);
      this.content.addChild(this.defaultSlot);
    }

    // style样式应该在 style类中处理， useConfig useType useSize ....
    if (params?.hit) {
      this.style.addObj({
        borderColor: $colorPrimary
      });
    }
    if (params?.round) {
      this.style.addObj({
        borderRadius: $tag.borderRadiusRounded
      });
    }
    const size = params?.size || 'default';
    this.style.addObj($tagSizes[size]);

    // if (!params?.disableTransitions) { // TODO: 添加过渡
    //   params?.parent?.addChild(new Transition({
    //     childNodes: [this],
    //   }))
    // }
    this.props = this.useParams(params);
    if (params?.closable) {
      this.style.addObj({
        paddingRight:
          parseFloat($tagIconSpanGap.default) - parseFloat($borderWidth) + 'px'
      });
      this.closeIcon = new TdIcon({
        svgObj: new ElCloseSvg(),
        styleObj: {
          flexShrink: 0,
          // color: getCssVar('tag', 'text-color'),
          // color: $tagTextColor,
          borderRadius: '50%',
          cursor: 'pointer',
          // font-size: calc(#{getCssVar('icon-size')} - #{$svg-margin-size * 2}),
          // height: getCssVar('icon-size'),
          height: $tagIconSize[params.size || 'default'],
          // width: getCssVar('icon-size'),
          width: $tagIconSize[params.size || 'default'],
          // margin-left: map.get($tag-icon-span-gap, 'default');
          marginLeft: $tagIconSpanGap[params.size || 'default']
        },
        events: {
          mouseenter: (evt, element) => {
            // console.log('mouseenter . ');
            evt?.stopPropagation();
            element?.style.setObj({
              backgroundColor: $tagTypes[type].hoverColor,
              color: $colorWhite
            });
          },
          mouseleave: (evt, element) => {
            // console.log('mouseleave . ');
            evt?.stopPropagation();
            element?.style.setObj({
              backgroundColor: $tagTypes[type].bgColor,
              color: $tagTypes[type].textColor
            });
          },
          click: (evt, element) => {
            // console.log('click . ');
            evt?.stopPropagation();
            this.handleClose();
          }
        }
      });
      this.addChild(this.closeIcon);
    }
  }

  handleClose() {
    console.log('handleClose');
    this.destroy();
  }

  handleClick() {
    console.log('handleClick');
  }
}
