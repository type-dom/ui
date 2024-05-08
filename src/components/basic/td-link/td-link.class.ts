import { fromEvent } from 'rxjs';
import { StyleCursor } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { $baseLink, $linkStateColors } from '../td-link/td-link.style';
import { TdIcon } from '../td-icon/td-icon.class';
import { ITdLink, ITdLinkConfig } from './td-link.interface';

export class TdLink extends UI implements ITdLink {
  className: 'TdLink';
  override config?: ITdLinkConfig;
  icon?: TdIcon;

  constructor(configs: ITdLinkConfig) {
    super({ tag: 'a' });
    this.className = 'TdLink';
    this.addStyleObj($baseLink);
    this.setConfig(configs);
  }

  override setConfig(config?: Partial<ITdLinkConfig>) {
    super.setConfig(config);
    this.config = config;
    if (config?.href) {
      this.addAttrObj({
        href: config.href
      });
    }
    if (config?.target) {
      this.addAttrObj({
        target: config.target
      });
    }
    if (config?.disabled) {
      this.addAttrObj({
        disabled: config.disabled
      });
    }
    if (config?.type) {
      if (config?.disabled) {
        this.addStyleObj($linkStateColors[config.type].disabled);
      } else {
        this.addStyleObj($linkStateColors[config.type].default);
      }
    } else {
      this.addStyleObj($linkStateColors.default.default);
    }
    if (config?.icon) {
      if (config?.iconPosition === 'left') {
        // 插入到前面
        this.unshiftChild(config.icon);
      } else {
        this.addChild(config.icon);
      }
    }
  }

  override initEvents() {
    this.addEvents({
      mouseover: () => {
        if (this.config?.type) {
          if (this.config?.disabled) {
            this.setStyleObj({
              cursor: StyleCursor.notAllowed
            });
          } else {
            this.setStyleObj($linkStateColors[this.config?.type].hover);
          }
        } else {
          this.setStyleObj($linkStateColors.default.hover);
        }
        if (this.config?.underline === false) { // 设置 false 的情况下，不显示下划线
          this.setStyleObj({
            textDecoration: 'none'
          });
        } else {
          // 1. 默认显示下划线
          // 2. 默认显示下划线，如果设置了 underline 为 true，则显示下划线
          this.setStyleObj({
            textDecoration: 'underline'
          });
        }
      },
      mouseout: (evt) => {
        this.setStyleObj({
          textDecoration: 'none'
        });
        if (this.config?.type) {
          this.removeStyleObj($linkStateColors[this.config?.type].hover);
          if (this.config?.disabled) {
            evt?.preventDefault();
            this.setStyleObj($linkStateColors[this.config?.type].disabled);
          } else {
            this.setStyleObj($linkStateColors[this.config?.type].default);
          }
        } else {
          this.removeStyleObj($linkStateColors.default.hover);
        }
      }
    });
  }
}
