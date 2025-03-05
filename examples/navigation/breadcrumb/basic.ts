import { A, TypeDiv } from '@type-dom/framework';
import { TdBreadcrumb, TdBreadcrumbItem } from '@type-dom/ui';

export class BreadcrumbBasicExample extends TypeDiv {
  className = 'BreadcrumbBasicExample';

  constructor() {
    super();
    this.addChildren(
      new TdBreadcrumb({
        separator: '/',
        slot: [
          new TdBreadcrumbItem({
            slot: 'homepage',
            toPath: '/',
          }),
          new TdBreadcrumbItem({
            slot: [
              new A({
                slot: 'promotion management',
                attrObj: {
                  href: '/'
                }
              })
            ]
          }),
          new TdBreadcrumbItem({
            slot: 'promotion list'
          }),
          new TdBreadcrumbItem({
            slot: 'promotion detail'
          })
        ]
      })
    );
  }
}
