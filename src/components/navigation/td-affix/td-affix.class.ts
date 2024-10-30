import { addUnit, getScrollContainer } from '@type-dom/utils';
import {
  Div,
  nextTick, TypeNode,
  useElementBounding,
  useWindowSize
} from '@type-dom/framework';
import { UI } from '../../../ui/ui.abstract';
import { ITdAffix, ITdAffixConfig } from './td-affix.interface';
import { IStyle } from '@type-dom/css-type';

export class TdAffix extends UI implements ITdAffix {
  className: 'TdAffix';
  // override dom: HTMLElement;
  override props: ITdAffixConfig;
  private affix: Div;
  private target?: HTMLElement | Window;
  private rootHeight: number;
  private rootWidth: number;
  private rootTop: number;
  private rootBottom: number;
  private updateRoot: () => void;
  private transform: string | number;
  private targetRect?: {
    top: number;
    left: number;
    bottom: number;
    width: number;
    x: number;
    y: number;
    update: () => void;
    right: number;
    height: number;
  };
  private fixed: boolean;
  private scrollTop: number;
  private scrollContainer?: HTMLElement | Window;
  private windowHeight?: number;

  constructor(params: ITdAffixConfig = {}) {
    super();
    console.log('TdAffix constructor . ');
    this.className = 'TdAffix';
    this.attr.addName('td-affix');
    this.windowHeight = useWindowSize().height;
    const { height, width, top, bottom, update } = useElementBounding(this, {
      windowScroll: false,
    });
    this.rootHeight = height;
    this.rootWidth = width;
    this.rootTop = top;
    this.rootBottom = bottom;
    this.updateRoot = update;
    // const rect = this.dom.getBoundingClientRect();
    // console.log('rect is ', rect);
    this.targetRect = params?.target
      ? useElementBounding(params.target.value)
      : undefined;

    this.fixed = false;
    this.scrollTop = 0;
    this.transform = 0;
    // todo rootStyle
    this.style.addObj(this.rootStyle);

    this.affix = new Div({
      name: 'fix',
      styleObj: this.affixStyle,
    });
    if (params?.slot) {
      this.affix.slotChild(params.slot);
    }
    this.addChild(this.affix);
    this.props = this.useParams(params);
  }

  get rootStyle() {
    return {
      height: this.fixed ? this.rootHeight : '',
      width: this.fixed ? this.rootWidth : '',
    } as IStyle;
  }

  get affixStyle() {
    const props = this.props;
    const offset = props?.offset ? addUnit(props.offset) : 0;
    const position = props?.position || 'top';
    return {
      position: this.fixed ? 'fixed' : '',
      // height: this.rootHeight + 'px',
      // width: this.rootWidth + 'px',
      top: position === 'top' ? offset : '',
      bottom: position === 'bottom' ? offset : '',
      transform: this.transform ? `translateY(${this.transform}px)` : '',
      zIndex: props?.zIndex || 100,
    } as IStyle;
  }

  override mounted() {
    console.log('TdAffix mounted . ');
    if (this.props?.target) {
      if (!this.props?.target.value) {
        throw Error(`Target is not existed: ${this.props?.target}`);
      }
      this.target = this.props.target.value;
    } else {
      this.target = document.documentElement;
    }
    nextTick(() => {
      console.log('nextTick . ');
      this.scrollContainer = getScrollContainer(this.dom, true);
      console.log('this.scrollContainer is ', this.scrollContainer);
      this.updateRoot();
      // todo destroy
      this.scrollContainer &&
        this.scrollContainer.addEventListener('scroll', this.onScroll);
    });
  }

  override destroy(root?: TypeNode) {
    this.scrollContainer &&
      this.scrollContainer.removeEventListener('scroll', this.onScroll);
    super.destroy(root);
  }

  onScroll = () => {
    console.log('this.scrollContainer scroll . ');
    // if (this.fixed) {
    this.style.setObj(this.rootStyle);
    this.affix.style.setObj(this.affixStyle);
    // }
    this.updateRoot();
  };

  change() {
    if (!this.scrollContainer) return;

    this.scrollTop =
      this.scrollContainer instanceof Window
        ? document.documentElement.scrollTop
        : this.scrollContainer.scrollTop || 0;

    if (this.props?.position === 'top') {
      if (this.props?.target) {
        const difference =
          (this.targetRect?.bottom ?? 0) -
          (this.props?.offset ?? 0) -
          this.rootHeight;
        this.fixed =
          (this.props?.offset ?? 0) > this.rootTop &&
          (this.targetRect?.bottom ?? 0) > 0;
        this.transform = difference < 0 ? difference : 0;
      } else {
        this.fixed = (this.props?.offset ?? 0) > this.rootTop;
      }
    } else if (this.props?.target) {
      const difference =
        (this.windowHeight ?? 0) -
        (this.targetRect?.top ?? 0) -
        (this.props?.offset ?? 0) -
        this.rootHeight;
      this.fixed =
        (this.windowHeight ?? 0) - (this.props?.offset ?? 0) <
          this.rootBottom &&
        (this.windowHeight ?? 0) > (this.targetRect?.top ?? 0);
      this.transform = difference < 0 ? -difference : 0;
    } else {
      this.fixed =
        (this.windowHeight ?? 0) - (this.props?.offset ?? 0) < this.rootBottom;
    }
  }
}
