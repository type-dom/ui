import { UI } from '../../../ui/ui.abstract';
import { TdBreadcrumbItem } from '../td-breadcrumb-item/td-breadcrumb-item.class';
import { ITdBreadcrumb, ITdBreadcrumbConfig } from './td-breadcrumb.interface';

//  todo link 样式没有添加
export class TdBreadcrumb extends UI implements ITdBreadcrumb {
  className: 'TdBreadcrumb';
  override props: ITdBreadcrumbConfig;
  override childNodes: TdBreadcrumbItem[];

  constructor(params: ITdBreadcrumbConfig = {}) {
    super();
    this.className = 'TdBreadcrumb';
    this.attr.addName('td-breadcrumb');
    this.attr.addObj({
      'aria-label': 'Breadcrumb', // :aria-label="t('el.breadcrumb.label')"
      role: 'navigation',
    });
    this.style.addObj({
      fontSize: '14px',
      lineHeight: 1
    });
    this.childNodes = [];

    this.slotChild(params.slot);
    this.props = this.useParams(params);
  }

  override setup() {
    console.log('TdBreadcrumb setup . ');
    this.childNodes.forEach((item, index) => {
      if (index < this.childNodes.length - 1) {
        item.addSeparator(this.props);
      }
    });
  }

  override mounted() {
    const items = this.childNodes;
    if (items.length) {
      items[items.length - 1]?.attr.set('aria-current', 'page');
    }
  }
}
