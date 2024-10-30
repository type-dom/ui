import { createClass, Div, Transition, TypeNode } from '@type-dom/framework';
import { ElCaretTopSvg } from '@type-dom/svgs';
import { addUnit, throttle } from '@type-dom/utils';
import { UI } from '../../../ui/ui.abstract';
import { $boxShadow } from '../../../styles/var';
import { TdIcon } from '../../basic/td-icon/td-icon.class';
import { ITdBackTop, ITdBackTopConfig } from './td-backtop.interface';
import { $backtop } from './td-backtop.style';

export class TdBackTop extends UI implements ITdBackTop {
  className: 'TdBackTop';
   override props: ITdBackTopConfig;
  static initCalled = false;
  private container: Document | HTMLElement;
  private el: HTMLElement;
  private visible = false;
  private transition: Transition;
  private division: Div;

  constructor(params: ITdBackTopConfig = {}) {
    super();
    this.useTag('fragment');
    this.className = 'TdBackTop';
    this.division = new Div({
      name: 'td-back-top',
      attrObj: {
        class: 'td-back-top'
      },
      styleObj: {
        right: addUnit(params?.right) || '40px',
        bottom: addUnit(params?.bottom) || '40px',
        position: 'fixed',
        // backgroundColor: getCssVar('backtop', 'bg-color'),
        // backgroundColor: $backtop.bgColor,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        // color: getCssVar('backtop', 'text-color'),
        color: $backtop.textColor,
        // display: this.visible ? 'flex' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        // boxShadow: getCssVar('box-shadow', 'lighter'),
        boxShadow: $boxShadow.lighter,
        cursor: 'pointer',
        zIndex: 999
      },
      events: {
        click: () => {
          this.handleClick();
        }
      }
    });
    this.division.attr.addObj({
      componentId: this.componentId
    });
    this.transition = new Transition({
      name: 'fade',
      slot: this.division,
    });
    this.addChild(this.transition);
    // this.attr.addName('td-back-top');
    if (!TdBackTop.initCalled) {
      TdBackTop.initCalled = true;
      createClass('td-back-top', {
        // position: 'fixed',
        // backgroundColor: getCssVar('backtop', 'bg-color'),
        backgroundColor: $backtop.bgColor
        // width: '40px',
        // height: '40px',
        // borderRadius: '50%',
        // // color: getCssVar('backtop', 'text-color'),
        // color: $backtop.textColor,
        // display: 'flex',
        // // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // fontSize: '20px',
        // // boxShadow: getCssVar('box-shadow', 'lighter'),
        // boxShadow: $boxShadow.lighter,
        // cursor: 'pointer',
        // zIndex: 5
      });
      createClass('td-back-top:hover', {
        backgroundColor: $backtop.hoverBgColor
      });
    }
    this.division.addChild(this.getSlotNode());
    if (params?.slot) {
      // this.division.slotChild(params.slot);
    } else {
      this.getSlotNode().resetSlot(new TdIcon({
        size: 20,
        svgObj: new ElCaretTopSvg()
      }));
    }
    this.container = document;
    this.el = document.documentElement; // todo 监听不生效 ？？？？
    this.buildProps<ITdBackTopConfig>({
      visibilityHeight: 200,
      right: 40,
      bottom: 40,
    });
    this.props = this.useParams(params);
  }

  override mounted() {
    console.log('TdBackTop mounted');
    if (this.props?.target) {
      this.el = this.props.target;
      // if (!this.el) {
      //   throw Error(`target does not exist: ${this.props.target}`)
      // }
    }
    // this.container = this.root?.dom as HTMLDivElement; // this.el;
    // this.container.style.setProperty('over-flow', 'scroll');
    // Give visible an initial value, fix #13066
    this.handleScroll();
    this.container.addEventListener('scroll', this.throttleScroll);
    // 监听 window 的滚动事件
    window.addEventListener('scroll', () => {
      console.log('Window scrolled:', window.scrollY);
    });

// 监听 document 的滚动事件
    document.addEventListener('scroll', () => {
      console.log('Document scrolled:', document.documentElement.scrollTop || document.body.scrollTop);
    });
  }

  override destroy(root?: TypeNode) {
    this.container.removeEventListener('scroll', this.throttleScroll);
    super.destroy(root);
  }

  throttleScroll = () => {
    console.log('throttleScroll .');
    return throttle(this.handleScroll, 300)();
  };
  handleScroll = () => {
    console.error('handleScroll . ');
    // console.log('this.el', this.el);
    if (this.el) {
      this.visible =
        this.el.scrollTop >= (this.props?.visibilityHeight || 200);
      console.log('this.visible', this.visible);
      // this.setStyleObj({
      //   display: this.visible ? 'flex' : 'none',
      // })
      this.transition.showSlot(this.visible);
    }
  };

  handleClick() {
    console.error('handleClick . ');
    this.el?.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
