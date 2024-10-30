import {
  BlockQuote,
  ITypeConfig,
  P,
  TextNode,
  TypeDiv,
  TypeElement
} from '@type-dom/framework';
import {
  $borderColor, $colorDangerRgb,
  $colorPrimaryRgb,
  $colors,
  $textColor
} from '../../../styles/var';

export interface ICustomBlockConfig extends ITypeConfig {
  type?: 'tip' | 'warning'; // default is tip
  // todo 下面的属性，也可以在 slots 中定义的。 那么 slots 属性的方式有什么意义？？？
  title: string;
  paragraphs: (TypeElement | TextNode)[];
  blockquote?: TypeElement | TextNode;
}

export class CustomBlock extends TypeDiv {
  className: 'CustomBlock';

  constructor(params: ICustomBlockConfig) {
    super();
    this.className = 'CustomBlock';
    this.attr.addName('tip');
    const bgColor = params.type === 'warning' ? $colorDangerRgb : $colorPrimaryRgb;
    const borderLeftColor =
      params.type === 'warning' ? $colors.danger.base : $colors.primary.base;
    this.style.addObj({
      padding: '8px 16px',
      // background-color: var(--block-tip-bg-color),
      backgroundColor: 'rgba(' + bgColor + ', 0.1)',
      borderRadius: '4px',
      // border-left: 5px solid var(--el-color-primary),
      borderLeft: '5px solid ' + borderLeftColor,
      margin: '20px 0'
    });
    if (params.title) {
      this.addChild(
        new P({
          text: params.title,
          styleObj: {
            fontSize: '1.1rem',
            fontWeight: 700,
            marginTop: '0'
          }
        })
      );
    }
    if (params.paragraphs) {
      params.paragraphs.forEach((paragraph) => {
        this.addChild(
          new P({
            styleObj: {
              fontSize: '0.9rem'
            },
            childNodes: [paragraph]
          })
        );
      });
    }
    if (params.blockquote) {
      this.addChild(
        new BlockQuote({
          styleObj: {
            margin: '1rem 0',
            // border-left: .2rem solid var(--el-border-color),
            borderLeft: '.2rem solid ' + $borderColor.base,
            padding: '.25rem 0 .25rem 1rem',
            fontSize: '1rem',
            // color: var(--text-color-lighter),
            color: $textColor.secondary
          },
          childNodes: [params.blockquote]
        })
      );
    }
  }
}
