import { isArray, isNumber } from '@type-dom/utils';
import { TypeElement } from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { ITdSpace, ITdSpaceConfig } from './td-space.interface';
import { SIZE_MAP } from './td-space.const';

export class TdSpace extends UI implements ITdSpace {
  className: 'TdSpace';
  override props: ITdSpaceConfig;
  horizontalSize?: number;
  verticalSize?: number;

  constructor(params: ITdSpaceConfig = {}) {
    super();
    this.className = 'TdSpace';
    this.style.addObj({
      display: 'inline-flex',
      verticalAlign: 'top'
    });
    this.addChild(this.getSlotNode());
    this.props = this.useParams(params);
  }

  override setup() {
    this.children.forEach((item) => {
      if (item instanceof TypeElement) {
        item.style.addObj({
          display: 'flex',
          flexWrap: 'wrap'
        });
      }
    });
    const props = this.props;
    this.useSize(props?.size);

    if (props?.wrap) {
      this.style.add('flexWrap', 'wrap');
    }
    if (props?.fill) {
      this.style.addObj({
        flexWrap: 'wrap',
        flexGrow: 1,
        minWidth: `${props?.fillRatio || 100}%`
      });
    }
    if (props?.direction === 'horizontal') {
      this.style.add('flexDirection', 'row');
    }
    if (props?.direction === 'vertical') {
      this.style.add('flexDirection', 'column');
    }
    if (props?.alignment) {
      this.style.add('alignItems', props.alignment);
    }
  }

  useSize(size?: number | string | [number, number]) {
    const props = this.props;
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
      if (
        (props?.wrap || props?.fill) &&
        props?.direction === 'horizontal'
      ) {
        this.horizontalSize = this.verticalSize = val;
      } else {
        if (props?.direction === 'vertical') {
          this.verticalSize = val;
          this.horizontalSize = 0;
        } else {
          // horizontal 默认
          this.horizontalSize = val;
          this.verticalSize = 0;
        }
      }
    }
    this.style.addObj({
      rowGap: this.verticalSize + 'px',
      columnGap: this.horizontalSize + 'px'
    });
  }

  setSize(size: number | string | [number, number]) {
    console.log('setSize size is ', size);
    this.useSize(size);
    this.style.setObj({
      rowGap: this.verticalSize + 'px',
      columnGap: this.horizontalSize + 'px'
    });
  }
}
