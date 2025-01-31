import { Div, TextNode, TypeDiv } from '@type-dom/framework';
import { TdCollapse, TdCollapseItem, TdIcon } from '@type-dom/ui';
import { ElInfoFilledSvg } from '@type-dom/svgs';

export class CollapseCustomizationExample extends TypeDiv {
  className = 'CollapseCustomizationExample';

  constructor() {
    super();
    const activeNames = ['1'];
    this.attr.addName('demo-collapse-customization');
    this.addChild(
      new TdCollapse({
        modelValue: activeNames,
        events: {
          click: (event) => {
            this.handleChange();
          }
        },
        slot: [
          new TdCollapseItem({
            title: 'Consistency',
            name: '1',
            slot: [
              new Div({
                slot: `Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;`
              }),
              new Div({
                slot: `Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.`
              })
            ],
            slots: {
              title: [
                new TextNode('Consistency'),
                new TdIcon({
                  name: 'header-icon',
                  slot: new ElInfoFilledSvg(),
                })
              ]
            }
          }),
          new TdCollapseItem({
            title: 'Feedback',
            name: '2',
            slot: [
              new Div({
                slot: `Operation feedback: enable the users to clearly perceive their
          operations by style updates and interactive effects;`
              }),
              new Div({
                slot: `Visual feedback: reflect current state by updating or rearranging
          elements of the page.`
              })
            ]
          }),
          new TdCollapseItem({
            title: 'Efficiency',
            name: '3',
            slot: [
              new Div({
                slot: 'Simplify the process: keep operating process simple and intuitive;'
              }),
              new Div({
                slot: `Definite and clear: enunciate your intentions clearly so that the
          users can quickly understand and make decisions;`
              }),
              new Div({
                slot: `Easy to identify: the interface should be straightforward, which helps
          the users to identify and frees them from memorizing and recalling.`
              })
            ]
          }),
          new TdCollapseItem({
            title: 'Controllability',
            name: '4',
            slot: [
              new Div({
                slot: `Decision making: giving advices about operations is acceptable, but do
          not make decisions for the users;`
              }),
              new Div({
                slot: `Controlled consequences: users should be granted the freedom to
          operate, including canceling, aborting or terminating current
          operation.`
              })
            ]
          })
        ]
      })
    );
  }
  handleChange() {
    console.log('click');
  }
}
