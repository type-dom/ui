import { Div, Span, TextNode, TypeDiv } from '@type-dom/framework';
import { CollapseModelValue, TdCollapse, TdCollapseItem, TdIcon } from '@type-dom/ui';
import { ElCaretRightSvg, ElInfoFilledSvg } from '@type-dom/svgs';
import { computed, signal } from '@type-dom/signals';

export class CollapseCustomIconExample extends TypeDiv {
  className = 'CollapseCustomIconExample';

  constructor() {
    super();
    this.attr.addName('demo-collapse-custom-icon');

    const activeNames = signal(['1']);
    const handleChange = (evt?: Event, element?: TdCollapseItem, val?: CollapseModelValue) => {
      console.log(val)
    }
    this.addChild(
      new TdCollapse({
        vModel: activeNames,
        events: {
          change: handleChange
        },
        slot: [
          new TdCollapseItem({
            title: 'Consistency',
            name: '1',
            icon: ElCaretRightSvg,
            slot: [
              new Div({
                slot: `Consistent with real life: in line with the process and logic of real
          life, and comply with languages and habits that the users are used to;`
              }),
              new Div({
                slot: `Consistent within interface: all elements should be consistent, such
          as: design style, icons and texts, position of elements, etc.`
              })
            ]
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
            ],
            slots: {
              icon: new Span({
                class: 'icon-ele',
                styleObj: {
                  margin: '0 8px 0 auto',
                  color: '#409eff',
                },
                slot: computed(() => {
                  const isActive = computed(() => activeNames.get().includes('2'));
                  return isActive.get() ? 'Expanded' : 'Collapsed'
                })
              })
            }
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
}
