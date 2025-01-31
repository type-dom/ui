import { createClass, Div, TypeDiv } from '@type-dom/framework';
import { TdButton, TdCard, TdSpace } from '@type-dom/ui';

export class SpaceAlignmentExample extends TypeDiv {
  className: 'SpaceAlignmentExample';

  constructor() {
    super();
    this.className = 'SpaceAlignmentExample';

    createClass('alignment-container', {
      width: '240px',
      marginBottom: '20px',
      padding: '8px',
      border: '1px solid var(--el-border-color)',
    });

    this.addChildren(
      new Div({
        class: 'alignment-container',
        slot: new TdSpace({
          slot: [
            'string',
            new TdButton({
              slot: 'button'
            }),
            new TdCard({
              slot: 'body',
              slots: {
                header: 'header',
              }
            })
          ]
        })
      }),
      new Div({
        class: 'alignment-container',
        slot: new TdSpace({
          alignment: 'flex-start',
          slot: [
            'string',
            new TdButton({
              slot: 'button'
            }),
            new TdCard({
              slot: 'body',
              slots: {
                header: 'header',
              }
            })
          ]
        })
      }),
      new Div({
        class: 'alignment-container',
        slot: new TdSpace({
          alignment: 'flex-end',
          slot: [
            'string',
            new TdButton({
              slot: 'button'
            }),
            new TdCard({
              slot: 'body',
              slots: {
                header: 'header',
              }
            })
          ]
        })
      }),
    );
  }
}
