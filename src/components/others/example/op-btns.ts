import { TypeProps, toValue, TypeDiv } from '@type-dom/framework';
import { ElCopyDocumentSvg, TdViewCodeSvg } from '@type-dom/svgs';
import { $textColor } from '../../../styles/var';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { Example } from './example';

export class OpBtns extends TypeDiv {
  className: 'OpBtns';
  override parent!: Example;

  constructor(params: TypeProps) {
    super();
    this.className = 'OpBtns';
    this.parent = params.parent as Example;
    this.attr.addName('op-btns');
    this.style.addObj({
      padding: '.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      height: '2.5rem',
      boxSizing: 'border-box',
    });
    this.addChild(
      new TdIcon({
        styleObj: {
          height: '1em',
          width: '1em',
          lineHeight: '1em',
          display: 'inline-flex',
          justifyContent: 'center',
          color: $textColor.secondary,
        },
        slot: new ElCopyDocumentSvg(),
        events: {
          click: async () => {
            // 选取要复制的文本
            let textToCopy = '';
            // if (this.parent.props.sourceWrapper instanceof XProxy) {
            //   textToCopy = this.parent.props.sourceWrapper?.value;
            // } else {
            textToCopy =
              (toValue(this.parent.props.sourceWrapper) as string) ?? '';
            // }
            // 尝试使用Async Clipboard API
            try {
              await navigator.clipboard.writeText(textToCopy);
              alert('文本已复制到剪贴板！');
            } catch (err) {
              // console.error('无法复制文本: ', err);
              alert('复制失败，请手动复制。');
            }
          },
        },
      })
    );
    this.addChild(
      new TdIcon({
        // slot: '查看代码',
        styleObj: {
          height: '1em',
          width: '1em',
          lineHeight: '1em',
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          fill: 'currentColor',
          // color: var(--color),
          fontSize: '16px',
          background: 'none',
          border: 'none',
          padding: '0',
          cursor: 'pointer',
          margin: '0 .5rem',
          // color: var(--text-color-lighter),
          color: $textColor.secondary,
          transition: '.2s',
        },
        slot: new TdViewCodeSvg(),
        events: {
          click: () => {
            if (this.parent.sourceWrapper.style.get('display') === 'none') {
              this.parent.sourceWrapper.style.show();
              this.parent.floatControl.style.show('flex');
            } else {
              this.parent.sourceWrapper.style.hide();
              this.parent.floatControl.style.hide();
            }
          },
        },
      })
    );
    this.useParams(params);
  }
}
