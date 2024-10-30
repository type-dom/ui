import { Code, IJsonData, ITypeConfig, Pre, TypeDiv, TypeElement, XProxy } from '@type-dom/framework';
import { $fillColor } from '../../../styles';

export interface IExampleSourceWrapperConfig extends ITypeConfig {
  sourceWrapper: string | XProxy<IJsonData>;
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
        childNodes: [
          new Code({
            text: params.sourceWrapper ?? ''
          })
        ]
      })
    );
    // if (params?.slot) {
    //   this.slotChild(params.slot);
    // }
    this.props = this.useParams(params);
  }
}
