import { Signal } from '@type-dom/signals';
import { TypeDivProps, TypeDiv, TypeElement } from '@type-dom/framework';
import { $borderColor, $borderRadius } from '../../../styles/var';
import { TdDivider } from '../td-divider/td-divider.class';
import { ExampleShowcase } from './example-showcase';
import { ExampleSourceWrapper } from './example-source-wrapper';
import { OpBtns } from './op-btns';
import { ExampleFloatControl } from './example-float-control';

export interface ExampleProps extends TypeDivProps {
  showcase: TypeElement[];
  sourceWrapper: string | Signal<string>; // | XProxy<IJsonData>;
}

// todo slots 改造
export class Example extends TypeDiv {
  className: 'Example';
  sourceWrapper: ExampleSourceWrapper;
  floatControl: ExampleFloatControl;
  // override params: IExampleConfig;
  override props: ExampleProps;

  constructor(params: ExampleProps) {
    super();
    this.className = 'Example';
    this.attr.addName('example');
    this.style.addObj({
      // border: '1px solid 'var(--border-color),
      border: '1px solid ' + $borderColor.base,
      // border-radius: var(--el-border-radius-base);
      borderRadius: $borderRadius.base,
    });

    this.addChild(new ExampleShowcase({
      parent: this,
      slot: params.showcase,
    }));
    this.addChild(
      new TdDivider({
        styleObj: {
          margin: '0',
        },
      })
    );

    this.addChild(new OpBtns());
    this.sourceWrapper = new ExampleSourceWrapper({
      parent: this,
      styleObj: {
        display: 'none',
      },
      sourceWrapper: params.sourceWrapper,
    });
    this.addChild(this.sourceWrapper);
    this.floatControl = new ExampleFloatControl({
      parent: this,
      styleObj: {
        display: 'none',
      },
    });
    this.addChild(this.floatControl);
    this.props = this.useParams(params);
  }
}
