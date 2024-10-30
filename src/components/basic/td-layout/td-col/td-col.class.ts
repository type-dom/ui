import { debounce, formatFloat } from '@type-dom/utils';
import { UI } from '../../../../ui/ui.abstract';
import { TdRow } from '../td-row/td-row.class';
import { ITdCol, ITdColConfig } from './td-col.interface';
import { TypeNode } from '@type-dom/framework';

export class TdCol extends UI implements ITdCol {
  className: 'TdCol';
  override parent?: TdRow;
  override props: ITdColConfig;

  constructor(params: ITdColConfig = {}) {
    super();
    this.className = 'TdCol';
    this.addChild(this.getSlotNode());
    this.props = this.useParams(params);
  }

  get screenWidth() {
    return window.innerWidth || document.documentElement.clientWidth;
  }

  override setup() {
    const props = this.props;
    if (props?.span) {
      if (props.span === 0) {
        this.style.addObj({
          display: 'none'
        });
      } else {
        const proportion = formatFloat(props.span / 24) * 100 + '%';
        this.style.addObj({
          maxWidth: proportion,
          flex: '0 0 ' + proportion
        });
      }
    }
    if (props?.offset) {
      const proportion = formatFloat(props.offset / 24) * 100 + '%';
      this.style.addObj({
        marginLeft: proportion
      });
    }
    if (props?.pull) {
      const proportion = formatFloat(props.pull / 24) * 100 + '%';
      this.style.addObj({
        position: 'relative',
        right: proportion
      });
    }
    if (props?.push) {
      const proportion = formatFloat(props.push / 24) * 100 + '%';
      this.style.addObj({
        position: 'relative',
        left: proportion
      });
    }
    this.resize();
  }

  override mounted() {
    // 监听窗口大小改变事件
    window.addEventListener('resize', this.debounceResize);
  }

  override destroy(root?: TypeNode) {
    window.removeEventListener('resize', this.debounceResize!);
    super.destroy(root);
  }

  // 使用防抖函数包装处理函数
  debounceResize = () => debounce(this.resize, 250)();

  resize = () => {
    console.log('this.screenWidth is ', this.screenWidth);
    const props = this.props;
    if (props?.xs) {
      if (this.screenWidth < 768) {
        // 超小屏幕（xs）
        // 当前屏幕尺寸小于768px，执行xs断点下的操作
        const proportion = formatFloat(props.xs / 24) * 100 + '%';
        this.style.setObj({
          maxWidth: proportion,
          flex: '0 0 ' + proportion
        });
      }
    }
    if (props?.sm) {
      if (this.screenWidth >= 768) {
        // && this.screenWidth < 992
        // 小屏幕（sm）
        // 当前屏幕尺寸在768px至991px之间，执行md断点下的操作
        // 设置你的值或执行相应JS代码
        const proportion = formatFloat(props.sm / 24) * 100 + '%';
        this.style.setObj({
          maxWidth: proportion,
          flex: '0 0 ' + proportion
        });
      }
    }
    if (props?.md) {
      if (this.screenWidth >= 992) {
        // && this.screenWidth < 1200
        // 中屏幕（md）
        // 当前屏幕尺寸在992px至1199px之间，执行lg断点下的操作
        // 设置你的值或执行相应JS代码
        const proportion = formatFloat(props.md / 24) * 100 + '%';
        this.style.setObj({
          maxWidth: proportion,
          flex: '0 0 ' + proportion
        });
      }
    }
    if (props?.lg) {
      if (this.screenWidth >= 1200) {
        // && this.screenWidth < 1920
        // 大屏幕（lg）
        // 当前屏幕尺寸在1200px至1920px之间，执行lg断点下的操作
        // 设置你的值或执行相应JS代码
        const proportion = formatFloat(props.lg / 24) * 100 + '%';
        this.style.setObj({
          maxWidth: proportion,
          flex: '0 0 ' + proportion
        });
      }
    }
    if (props?.xl) {
      if (this.screenWidth >= 1920) {
        // 超大屏幕（xl及以上）
        // 当前屏幕尺寸等于或大于1920px，执行xl断点下的操作
        // 设置你的值或执行相应JS代码
        const proportion = formatFloat(props.xl / 24) * 100 + '%';
        this.style.setObj({
          maxWidth: proportion,
          flex: '0 0 ' + proportion
        });
      }
    }
  }
}
