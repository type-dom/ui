import {
  Code,
  Div,
  IJsonData,
  ITypeConfig,
  Pre,
  TypeDiv,
  TypeElement,
  XProxy
} from '@type-dom/framework';
import {
  $borderColor,
  $borderRadius,
  $fillColor,
} from '../../../styles/var';
import { TdDivider } from '../td-divider/td-divider.class';
import { ExampleShowcase } from './example-showcase';
import { ExampleSourceWrapper } from './example-source-wrapper';
import { OpBtns } from './op-btns';
import { ExampleFloatControl } from './example-float-control';

export interface IExampleConfig extends ITypeConfig {
  showcase: TypeElement[];
  sourceWrapper: string | XProxy<IJsonData>;
}

// todo slots 改造
export class Example extends TypeDiv {
  className: 'Example';
  sourceWrapper: ExampleSourceWrapper;
  floatControl: ExampleFloatControl;
  // override params: IExampleConfig;
  override props: IExampleConfig;

  constructor(params: IExampleConfig) {
    super();
    this.className = 'Example';
    this.attr.addName('example');
    this.style.addObj({
      // border: '1px solid 'var(--border-color),
      border: '1px solid ' + $borderColor.base,
      // border-radius: var(--el-border-radius-base);
      borderRadius: $borderRadius.base
    });
    const exampleShowcase = new ExampleShowcase({
      parent: this
    });
    exampleShowcase.addChildren(...params.showcase);
    this.addChild(exampleShowcase);
    this.addChild(
      new TdDivider({
        styleObj: {
          margin: '0'
        }
      })
    );
    const opBtns = new OpBtns({
      parent: this
    });
    this.addChild(opBtns);
    this.sourceWrapper = new ExampleSourceWrapper({
      parent: this,
      styleObj: {
        display: 'none'
      },
      sourceWrapper: params.sourceWrapper,
      // slot: [
      //   new Div({
      //     attrObj: {
      //       name: 'source-wrapper'
      //     },
      //     styleObj: {
      //       // background-color: var(--code-bg-color),
      //       backgroundColor: $fillColor.light,
      //       overflowX: 'auto'
      //     },
      //     childNodes: [
      //       new Pre({
      //         childNodes: [
      //           new Code({
      //             text: params.sourceWrapper
      //           })
      //         ]
      //       })
      //     ]
      //   })
      // ]
    });
    // this.sourceWrapper.addChild(config.sourceWrapper);
    this.addChild(this.sourceWrapper);
    this.floatControl = new ExampleFloatControl({
      parent: this,
      styleObj: {
        display: 'none'
      }
    });
    this.addChild(this.floatControl);
    this.props = this.useParams(params);
  }
}
