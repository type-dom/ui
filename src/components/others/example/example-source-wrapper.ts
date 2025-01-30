import { Code, TypeDivProps, Pre, TypeDiv } from '@type-dom/framework';
import { Signal } from '@type-dom/signals';
import { $fillColor } from '../../../styles';

export interface IExampleSourceWrapperConfig extends TypeDivProps {
  sourceWrapper: string | Signal<string>;
}

export class ExampleSourceWrapper extends TypeDiv {
  className: 'ExampleSourceWrapper';
  override props: IExampleSourceWrapperConfig;

  constructor(params: IExampleSourceWrapperConfig) {
    super();
    this.className = 'ExampleSourceWrapper';
    this.attr.addName('example-source-wrapper');
    this.style.addObj({
      // background-color: var(--code-bg-color),
      backgroundColor: $fillColor.light,
      overflowX: 'auto',
      userSelect: 'text',
    });
    this.addChild(
      new Pre({
        slot: [
          new Code({
            slot: params.sourceWrapper ?? '',
          }),
        ],
      })
    );
    this.props = this.useParams(params);
  }
}
