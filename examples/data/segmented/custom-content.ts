import { Div, TypeDiv, TypeS, TypeSvg, TypeSvgSvg } from '@type-dom/framework';
import { TdIcon, TdSegmented } from '@type-dom/ui';
import { ElAppleSvg, ElCherrySvg, ElGrapeSvg, ElOrangeSvg, ElPearSvg, ElWatermelonSvg } from '@type-dom/svgs';
import { signal } from '@type-dom/signals';

export class SegmentedCustomContentExample extends TypeDiv {
  className = 'SegmentedCustomContentExample';

  constructor() {
    super();

    const value = signal('Apple');
    const options: { label: string; value: string; icon: TypeSvgSvg; slot: Div }[] = [
      {
        label: 'Apple',
        value: 'Apple',
        icon: new ElAppleSvg(),
      },
      {
        label: 'Cherry',
        value: 'Cherry',
        icon: new ElCherrySvg(),
      },
      {
        label: 'Grape',
        value: 'Grape',
        icon: new ElGrapeSvg(),
      },
      {
        label: 'Orange',
        value: 'Orange',
        icon: new ElOrangeSvg(),
      },
      {
        label: 'Pear',
        value: 'Pear',
        icon: new ElPearSvg(),
      },
      {
        label: 'Watermelon',
        value: 'Watermelon',
        icon: new ElWatermelonSvg(),
      },
    ].map(item => {
      return {
        ...item,
        slot: new Div({
          // class: 'flex flex-col items-center gap-2 p-2',
          styleObj: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0.5rem',
            gap: '0.5rem',
          },
          slot: [
            new TdIcon({
              size: 20,
              slot: item.icon,
            }),
            new Div({
              slot: item.label,
            }),
          ],
        }),
      };
    });
    this.addChild(new Div({
      slot: [
        new TdSegmented({
          vModel: value,
          options: options
        }),
      ]
    }))
  }
}
