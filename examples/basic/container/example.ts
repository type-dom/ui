import { createStyle, Div, TypeDiv } from '@type-dom/framework';
import {
  TdAside,
  TdContainer,
  TdHeader,
  TdMain,
  TdMenu,
  TdScrollbar,
  TdSubMenu,
} from '@type-dom/ui';
import './common-layout.scss';

export class ContainerExample extends TypeDiv {
  className = 'ContainerExample';

  constructor() {
    super();

    // const item = {
    //   date: '2016-05-02',
    //   name: 'Tom',
    //   address: 'No. 189, Grove St, Los Angeles',
    // }
    // const tableData = signal(Array.from({ length: 20 }).fill(item))

    createStyle(`
    .layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
    `)

    this.addChildren(
      new TdContainer({
        // 默认；
        class: 'layout-container-demo',
        styleObj: {
          height: '500px'
        },
        slot: [
          new TdAside({
            width: '200px',
            slot: [
              new TdScrollbar({
                slot: [
                  new TdMenu({
                    slot: [
                      new TdSubMenu()
                    ]
                  })
                ]
              })
            ]
          }),
          new TdContainer({
            slot: [
              new TdHeader({
                styleObj: {
                  textAlign: 'right',
                  fontSize: '12px'
                },
                slot: new Div({
                  class: 'toolbar'
                })
              }),
              new TdMain({
                slot: new TdScrollbar({
                  slot: []
                })
              })
            ]
          }),
        ]
      }),
    );
  }
}
