import { isArray, isNumber } from '@type-dom/utils';
import { TypeElement } from '@type-dom/framework';
import { ITdSpace, ITdSpaceConfig } from './td-space.interface';
import { SIZE_MAP } from './td-space.const';
import { UI } from '../../ui.abstract';

export class TdSpace extends UI implements ITdSpace {
  className: 'TdSpace';
  horizontalSize?: number;
  verticalSize?: number;
  override config?: ITdSpaceConfig;

  constructor(config?: ITdSpaceConfig) {
    super();
    this.className = 'TdSpace';
    this.config = config;
    this.addStyleObj({
      display: 'inline-flex',
      verticalAlign: 'top'
    });
    this.setConfig(config);
  }

  override setConfig(config?: Partial<ITdSpaceConfig>) {
    super.setConfig(config);
    this.children.forEach(item => {
      if (item instanceof TypeElement) {
        item.addStyleObj({
          display: 'flex',
          flexWrap: 'wrap'
        });
      }
    });

    this.initSize(config?.size);

    if (config?.wrap) {
      this.addStyle('flexWrap', 'wrap');
    }
    if (config?.fill) {
      this.addStyleObj({
        flexWrap: 'wrap',
        flexGrow: 1,
        minWidth: `${config?.fillRatio || 100}%`
      });
    }
    if (config?.direction === 'horizontal') {
      this.addStyle('flexDirection', 'row');
    }
    if (config?.direction === 'vertical') {
      this.addStyle('flexDirection', 'column');
    }
    if (config?.alignment) {
      this.addStyle('alignItems', config.alignment);
    }
  }

  initSize(size?: number | string | [number, number]) {
    const config = this.config;
    if (isArray(size)) {
      this.horizontalSize = size[0];
      this.verticalSize = size[1];
    } else {
      let val: number;
      if (isNumber(size)) {
        val = size;
      } else {
        val = SIZE_MAP[size || 'small'] || SIZE_MAP.small;
      }
      if ((config?.wrap || config?.fill) && config?.direction === 'horizontal') {
        this.horizontalSize = this.verticalSize = val;
      } else {
        if (config?.direction === 'vertical') {
          this.verticalSize = val;
          this.horizontalSize = 0;
        } else { // horizontal 默认
          this.horizontalSize = val;
          this.verticalSize = 0;
        }
      }
    }
    this.addStyleObj({
      rowGap: this.verticalSize + 'px',
      columnGap: this.horizontalSize + 'px'
    });
  }

  setSize(size: number | string | [number, number]) {
    console.log('setSize size is ', size);
    this.initSize(size);
    this.setStyleObj({
      rowGap: this.verticalSize + 'px',
      columnGap: this.horizontalSize + 'px'
    });
  }
}
