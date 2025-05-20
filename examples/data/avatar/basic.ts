import { Div, TypeDiv } from '@type-dom/framework';
import { TdAvatar, TdCol, TdRow } from '@type-dom/ui';
import './basic.scss';

export class AvatarBasicExample extends TypeDiv {
  className = 'AvatarBasicExample';
  constructor() {
    super();
    // const $subTitle: IStyle = {
    //   marginBottom: '10px',
    //   fontSize: '14px',
    //   // color: var(--el-text-color-secondary),
    //   color: $textColor.secondary,
    // };
    // const $circleSquare: IStyle = {
    //   display: 'flex',
    //   justifyContent: 'space-between',
    //   alignItems: 'center',
    //   padding: '0 20px',
    // };
    // createClass('demo-basic', {
    //   textAlign: 'center',
    // });
    // createClass('demo-basic sub-title',  {
    //   marginBottom: '10px',
    //   fontSize: '14px',
    //   color: 'var(--td-text-color-secondary)',
    //   // color: $textColor.secondary,
    // });
    // createClass('demo-basic demo-basic-circle', {
    //   display: 'flex',
    //   justifyContent: 'space-between',
    //   alignItems: 'center',
    // });
    // createClass('demo-basic demo-basic--square', {
    //   display: 'flex',
    //   justifyContent: 'space-between',
    //   alignItems: 'center',
    // })
    // createClass('demo-basic block:not(:last-child)', {
    //   borderRight: '1px solid var(--td-border-color)'
    // })
    // createClass('demo-basic block', {
    //   flex: 1
    // });
    // createClass('demo-basic td-col:not(:last-child)', {
    //   borderRight: '1px solid var(--td-border-color)'
    // })
    const circleUrl =
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
    const squareUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';
    const sizeList = ['small', '', 'large'] as const;
    const circleSizeList: Div[] = [];
    const squareSizeList: Div[] = [];
    for (let i = 0; i < sizeList.length; i++) {
      const size = sizeList[i];
      circleSizeList.push(
        new Div({
          class: 'block',
          slot: [
            new TdAvatar({
              size: size || 'default',
              src: circleUrl,
            })
          ]
        })
      );
      squareSizeList.push(
        new Div({
          class: 'block',
          slot: [
            new TdAvatar({
              shape: 'square',
              size: size || 'default',
              src: squareUrl,
            })
          ]
        })
      );
    }
    this.addChild(
      new TdRow({
        // styleObj: {
        //   textAlign: 'center',
        // },
        class: 'demo-avatar demo-basic',
        slot: [
          new TdCol({
            span: 12,
            slot: [
              new Div({
                name: 'title',
                class: 'sub-title',
                // styleObj: $subTitle,
                slot: 'circle'
              }),
              new Div({
                name: 'circle',
                class: 'demo-basic--circle',
                // styleObj: $circleSquare,
                slot: [
                  new Div({
                    name: 'block',
                    slot: [
                      new TdAvatar({
                        size: 50,
                        src: circleUrl,
                      })
                    ]
                  }),
                  ...circleSizeList,
                ]
              })
            ]
          }),
          new TdCol({
            span: 12,
            slot: [
              new Div({
                name: 'title',
                slot: 'square',
                class: 'sub-title'
                // styleObj: $subTitle,
              }),
              new Div({
                name: 'square',
                class: 'demo-basic--circle',
                // styleObj: $circleSquare,
                slot: [
                  new Div({
                    class: 'block',
                    slot: [
                      new TdAvatar({
                        size: 50,
                        shape: 'square',
                        src: squareUrl,
                      })
                    ]
                  }),
                  ...squareSizeList,
                ]
              })
            ]
          }),
        ],
      })
    );
  }
}
