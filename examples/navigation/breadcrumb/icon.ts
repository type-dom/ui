import { TypeDiv } from '@type-dom/framework';
import { ElArrowRightSvg } from '@type-dom/svgs';
import { TdBreadcrumb, TdBreadcrumbItem } from '@type-dom/ui';

export class BreadcrumbIconExample extends TypeDiv {
  className = 'BreadcrumbIconExample';

  constructor() {
    super();
    this.addChildren(
      new TdBreadcrumb({
        separatorIcon: ElArrowRightSvg,
        slot: [
          new TdBreadcrumbItem({
            slot: 'homepage',
            toPath: '/',
          }),
          new TdBreadcrumbItem({
            slot: 'promotion management',
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
