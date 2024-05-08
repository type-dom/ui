import { fromEvent, debounceTime } from 'rxjs';
import { formatFloat } from '@type-dom/utils';
import { TdRow } from '../td-row/td-row.class';
import { ITdCol, ITdColConfig } from './td-col.interface';
import { UI } from '../../../../ui/ui.abstract';

export class TdCol extends UI implements ITdCol {
  className: 'TdCol';
  override config?: ITdColConfig;
  override parent?: TdRow;

  constructor(config?: ITdColConfig) {
    super();
    this.className = 'TdCol';
    this.config = config;
    this.setConfig(config);
  }

  get screenWidth() {
    return window.innerWidth || document.documentElement.clientWidth;
  }

  override setConfig(config?: ITdColConfig) {
    super.setConfig(config);
    if (config?.span) {
      if (config.span === 0) {
        this.addStyleObj({
          display: 'none'
        });
      } else {
        const proportion = formatFloat(config.span / 24) * 100 + '%';
        this.addStyleObj({
          maxWidth: proportion,
          flex: '0 0 ' + proportion
        });
      }
    }
    if (config?.offset) {
      const proportion = formatFloat(config.offset / 24) * 100 + '%';
      this.addStyleObj({
        marginLeft: proportion
      });
    }
    if (config?.pull) {
      const proportion = formatFloat(config.pull / 24) * 100 + '%';
      this.addStyleObj({
        position: 'relative',
        right: proportion
      });
    }
    if (config?.push) {
      const proportion = formatFloat(config.push / 24) * 100 + '%';
      this.addStyleObj({
        position: 'relative',
        left: proportion
      });
    }
    this.resize();
  }

  resize() {
    // console.log('this.screenWidth is ', this.screenWidth);
    const config = this.config;
    if (config?.xs) {
      if (this.screenWidth < 768) {
        // 超小屏幕（xs）
        // console.log('当前屏幕尺寸小于768px，执行xs断点下的操作');
        const proportion = formatFloat(config.xs / 24) * 100 + '%';
        this.setStyleObj({
          maxWidth: proportion,
          flex: '0 0 ' + proportion
        });
      }
    }
    if (config?.sm) {
      if (this.screenWidth >= 768 && this.screenWidth < 992) {
        // 小屏幕（sm）
        // console.log('当前屏幕尺寸在768px至991px之间，执行md断点下的操作');
        // 设置你的值或执行相应JS代码
        const proportion = formatFloat(config.sm / 24) * 100 + '%';
        this.setStyleObj({
          maxWidth: proportion,
          flex: '0 0 ' + proportion
        });
      }
    }
    if (config?.md) {
      if (this.screenWidth >= 992 && this.screenWidth < 1200) {
        // 中屏幕（md）
        // console.log('当前屏幕尺寸在992px至1199px之间，执行lg断点下的操作');
        // 设置你的值或执行相应JS代码
        const proportion = formatFloat(config.md / 24) * 100 + '%';
        this.setStyleObj({
          maxWidth: proportion,
          flex: '0 0 ' + proportion
        });
      }
    }
    if (config?.lg) {
      if (this.screenWidth >= 1200 && this.screenWidth < 1920) {
        // 大屏幕（lg）
        // console.log('当前屏幕尺寸在1200px至1920px之间，执行lg断点下的操作');
        // 设置你的值或执行相应JS代码
        const proportion = formatFloat(config.lg / 24) * 100 + '%';
        this.setStyleObj({
          maxWidth: proportion,
          flex: '0 0 ' + proportion
        });
      }
    }
    if (config?.xl) {
      if (this.screenWidth >= 1920) {
        // 超大屏幕（xl及以上）
        // console.log('当前屏幕尺寸等于或大于1920px，执行xl断点下的操作');
        // 设置你的值或执行相应JS代码
        const proportion = formatFloat(config.xl / 24) * 100 + '%';
        this.setStyleObj({
          maxWidth: proportion,
          flex: '0 0 ' + proportion
        });
      }
    }
  }

  override initEvents() {
    this.subscriptions.push(
      fromEvent(window, 'resize')
        .pipe(
          debounceTime(250) // 防抖延时
          // distinctUntilChanged() // 可选，仅在窗口尺寸发生实际变化时才触发
        )
        .subscribe((event) => {
          this.resize();
        })
    );
  }
}
