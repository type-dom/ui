import { TypeProps, Span, TypeDiv } from '@type-dom/framework';
import { ElCaretTopSvg } from '@type-dom/svgs';
import { $bgColor, $borderColor, $textColor } from '../../../styles/var';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { Example } from './example';

export class ExampleFloatControl extends TypeDiv {
  className: 'ExampleFloatControl';
  override parent!: Example;

  constructor(params: TypeProps) {
    super();
    this.className = 'ExampleFloatControl';
    this.attr.addName('example-float-control');
    this.attr.addObj({
      role: 'button',
      tabIndex: 0,
    });
    this.style.addObj({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      // border-top: 1px solid var(--border-color),
      borderTop: '1px solid ' + $borderColor.base,
      height: '44px',
      boxSizing: 'border-box',
      // background-color: var(--bg-color, #fff),
      backgroundColor: $bgColor.default,
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px',
      marginTop: '-1px',
      // color: var(--el-text-color-secondary),
      color: $textColor.secondary,
      cursor: 'pointer',
      position: 'sticky',
      left: '0',
      right: '0',
      bottom: '0',
      zIndex: 10,
    });
    this.addChildren(
      new TdIcon({
        slot: new ElCaretTopSvg(),
        styleObj: {
          fontSize: '16px',
        },
      }),
      new Span({
        slot: '隐藏源代码',
        styleObj: {
          fontSize: '14px',
          marginLeft: '10px',
        },
      })
    );
    this.useParams(params);
  }

  override setup() {
    this.addEvents({
      click: () => {
        // 隐藏 代码
        this.style.hide();
        this.parent.sourceWrapper.style.hide();
      },
    });
  }
}
