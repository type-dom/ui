import { Span } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { $textColor } from '../../../styles/var';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { ITdBreadcrumbConfig } from '../td-breadcrumb/td-breadcrumb.interface';
import {
  ITdBreadcrumbItem,
  ITdBreadcrumbItemConfig
} from './td-breadcrumb-item.interface';

export class TdBreadcrumbItem extends UI implements ITdBreadcrumbItem {
  className: 'TdBreadcrumbItem';

  constructor(params: ITdBreadcrumbItemConfig = {}) {
    super();
    this.useTag('span');
    this.className = 'TdBreadcrumbItem';
    this.style.addObj({
      float: 'left',
      display: 'inline-flex',
      alignItems: 'center'
    });
    const link = new Span({
      name: 'link',
      attrObj: {
        role: 'link'
      },
      styleObj: {
        // color: getCssVar('text-color', 'regular');
        color: $textColor.regular
      },
      events: {
        click: (evt) => {
          if (!params?.toPath || !params?.router) {
            return;
          }
          params?.replace
            ? params.router.replace(params.toPath)
            : params.router.push(params.toPath);
          // params.replace ? params.router.replace(params.toPath) : params.router.push(params.toPath)
        }
      }
    }); // todo slot
    this.addChild(link);

    if (params?.slot) {
      this.slotChild(params?.slot);
    }
    this.useParams(params);
  }

  addSeparator(breadcrumbConfig?: ITdBreadcrumbConfig) {
    if (breadcrumbConfig?.separatorIcon) {
      breadcrumbConfig.separatorIcon.style.addObj({
        verticalAlign: 'middle'
      });
      this.addChild(
        new TdIcon({
          styleObj: {
            margin: '0 6px',
            fontWeight: 'normal'
          },
          svgObj: breadcrumbConfig.separatorIcon.clone()
        })
      );
    } else {
      this.addChild(
        new Span({
          text: breadcrumbConfig?.separator || '/',
          attrObj: {
            role: 'presentation'
          },
          styleObj: {
            margin: '0 6px',
            fontWeight: 'normal'
          }
        })
      );
    }
  }
}
