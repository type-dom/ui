import { fromEvent, Observable } from 'rxjs';
import {
  Button, Div, Label, StyleDisplay, TextNode, StylePosition,
  IOptionSetting, IOptionSet
} from '@type-dom/framework';
import { TdThreeDotsSvg } from '@type-dom/svgs';
import { FieldSelect } from '../../../form/field-select/field-select.class';
import { FieldItem } from '../field-item.abstract';
import { itemContentStyle } from '../field-item.style';

export abstract class PropertyOptions extends FieldItem {
  childNodes: [Label, Div, Button];
  selectConfigDiv: Div;
  private readonly firstDiv: Div;
  // private readonly addDiv: Div;
  selectDiv: Div;
  private readonly selectObj: FieldSelect;
  optionsContent: Div;
  protected btn: Button;
  private readonly dotsSvg: TdThreeDotsSvg;
  optionsConfigObservable: Observable<Event>;

  protected constructor(labelText = '选项列表') {
    super(labelText);
    this.addAttrName('option-property');
    this.selectConfigDiv = new Div();
    this.selectConfigDiv.addAttrName('select-config');
    this.selectConfigDiv.addStyleObj({
      height: '100%',
      lineHeight: '32px',
      textAlign: 'center',
      backgroundColor: '#FFF',
      backgroundImage: 'none',
      borderRadius: '4px',
      // border: '1px solid #DCDFE6',
      // -webkit-box-sizing: border-box;
      boxSizing: 'border-box',
      color: '#606266',
      display: StyleDisplay.inlineBlock,
      outline: '0',
      // -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      transition: 'border-color .2s cubic-bezier(.645,.045,.355,1)',
      width: 'calc(100% - 100px)'
    });
    this.selectDiv = new Div();
    this.selectDiv.addStyleObj({
      display: 'flex',
      flexDirection: 'row'
    });
    // 单独的方法实现
    this.selectObj = new FieldSelect();
    this.selectObj.addAttrName('select');
    this.selectObj.addStyleObj(Object.assign({}, itemContentStyle,
      {
        width: '100%',
        borderRadius: '4px 0 0 4px',
        borderRight: 'none'
      }));

    this.btn = new Button({ parent: this.selectDiv });
    this.btn.addStyleObj({
      // position: 'absolute',
      // right: '10px',
      padding: '8px 3px 4px',
      fontSize: '16px',
      border: '1px solid #DCDFE6',
      borderRadius: '0 4px 4px 0'
    });
    this.dotsSvg = new TdThreeDotsSvg({ parent: this.btn });
    this.dotsSvg.resetSize(16, 16);
    this.btn.textNode.setText('');
    this.btn.addChild(this.dotsSvg);
    this.selectDiv.childNodes = [this.selectObj, this.btn];
    this.firstDiv = new Div();
    const labelDiv = new Div();
    labelDiv.addStyleObj({
      display: 'inline-block',
      width: '50%'
    });
    labelDiv.addChild(new TextNode('标签'));
    const valueDiv = new Div();
    valueDiv.addStyleObj({
      display: 'inline-block',
      width: '50%'
    });
    valueDiv.addChild(new TextNode('值'));
    this.firstDiv.childNodes = [labelDiv, valueDiv];
    this.optionsContent = new Div();
    this.selectConfigDiv.childNodes = [this.selectDiv, this.firstDiv, this.optionsContent];

    this.button.addStyleObj({
      position: StylePosition.absolute,
      right: '10px',
      padding: '8px 3px 4px',
      fontSize: '16px',
      // border: 'none',
      display: 'none',
      border: '1px solid #DCDFE6',
      borderRadius: '0 4px 4px 0'
    });
    this.childNodes = [this.label, this.selectConfigDiv, this.button];
    // 创建添加按钮
    // this.addDiv = new Div(this.selectConfigDiv);
    // this.addDiv.setStyleObj({
    //   textAlign: 'center',
    //   marginTop: '-10px',
    //   display: 'none', // 现在不需要动态添加选项。
    // });
    // const svg = new AddSvg({ parent: this.addDiv });
    // svg.addAttribute('width', '24px');
    // this.addDiv.addChild(svg);
    this.optionsConfigObservable = fromEvent(this.btn.dom, 'click');
  }

  get optionSetting(): IOptionSetting | undefined {
    return this.settings?.optionSetting as IOptionSetting;
  }

  set optionSetting(optConfig: IOptionSetting | undefined) {
    if (this.settings === undefined) {
      if (optConfig !== undefined) {
        this.settings = {
          optionSetting: optConfig
        };
      }
    } else {
      if (optConfig === undefined) {
        delete this.settings.optionSetting;
      } else {
        this.settings.optionSetting = optConfig;
      }
    }
  }

  resetOptionSettingResultValue(value: string | number | boolean): void {
    // AppRoot.selectedControl?.attrObj.optionSetting''
    // this.optionSetting = Object.assign(this.optionSetting, { resultValue: value });
    if (this.optionSetting) this.optionSetting.resultValue = value;
  }

  // vue项目中返回的是选中的项目。只有一层，没有两层。
  resetConfig(optionSetting: IOptionSetting): void {
    console.log('optionSetting is ', optionSetting);
    // this.selectConfigDiv.clearChildNodes();
    // this.selectConfigDiv.clearChildDom();
    // this.selectConfigDiv.appendChild(this.selectObj).appendChild(this.firstDiv);
    this.selectObj.setOptions(optionSetting.options, optionSetting.resultValue);
    // todo 监听事件
    this.optionSetting = optionSetting;
    this.optionsContent.clearChildren();
    const styleObj = {
      display: 'inline-block',
      width: '45%',
      border: '1px solid #ccc',
      boxSizing: 'border-box'
    };
    // let optIndex = 0;
    // config.options设置
    const selectedOption = optionSetting.options.find(opt => String(opt.value) === String(optionSetting.resultValue).split('.')[0]);
    if (!selectedOption?.options) {
      throw Error('选项有问题');
    }
    selectedOption.options.forEach((opt, optIndex) => {
      const optDiv = new Div();
      const labelDiv = new Div();
      labelDiv.addStyleObj(styleObj);
      labelDiv.setAttrObj({
        // contenteditable: 'true', // 现在选项不需要编辑
        optIndex,
        optType: 'label'
      });
      labelDiv.addChild(new TextNode(opt.label));
      const valueDiv = new Div();
      valueDiv.addStyleObj(styleObj);
      valueDiv.addAttrObj({
        // contenteditable: 'true', // 现在选项不需要编辑
        optIndex,
        optType: 'value'
      });
      valueDiv.addChild(new TextNode(String(opt.value)));

      // const deleteDiv = new Div(optDiv);
      // deleteDiv.setStyleObj({
      //   display: 'none',
      //   // display: 'inline-block', // 现在不需要动态删除选项
      //   width: '10%',
      //   border: '1px solid #ccc',
      //   boxSizing: 'border-box',
      //   // float: 'right',
      //   // marginTop: '10px',
      // });
      // const svg = new DeleteSvg(deleteDiv);
      // svg.setStyleObj({
      //   width: '20',
      // });
      // deleteDiv.appendChild(svg);
      optDiv.childNodes = [labelDiv, valueDiv];
      this.optionsContent.appendChild(optDiv);
    });
  }

  resetOptions(options: IOptionSet[]): void {
    // this.selectConfigDiv.clearChildNodes();
    // this.selectConfigDiv.clearChildDom();
    // this.selectConfigDiv.appendChild(this.selectObj).appendChild(this.firstDiv);
    this.optionsContent.clearChildren();
    const styleObj = {
      display: 'inline-block',
      width: '45%',
      border: '1px solid #ccc',
      boxSizing: 'border-box'
    };
    // let optIndex = 0;
    // config.options设置
    options.forEach((opt, optIndex) => {
      const optDiv = new Div();
      optDiv.setAttrName('option');
      const labelDiv = new Div();
      labelDiv.addStyleObj(styleObj);
      labelDiv.setAttrObj({
        // contenteditable: 'true', // 现在选项不需要编辑
        optIndex,
        optType: 'label'
      });
      labelDiv.addChild(new TextNode(opt.label));
      const valueDiv = new Div();
      valueDiv.addStyleObj(styleObj);
      valueDiv.addAttrObj({
        optIndex,
        optType: 'value'
      });
      valueDiv.addChild(new TextNode(String(opt.value)));
      optDiv.childNodes = [labelDiv, valueDiv];
      this.optionsContent.appendChild(optDiv);
    });
  }

  override initEvents(): void {
    this.subscriptions.push(
      this.optionsConfigObservable.subscribe(() => {
        console.log('this.btn click . ');
        console.log('this.optionsConfigObservable is ', this.optionsConfigObservable);
      }),
      // todo 没有改变值 ？？？？？ 是否要加click监听
      fromEvent(this.selectObj.dom, 'change').subscribe(() => {
        console.log('this.selectObj.dom change . ');
        console.log('this.selectObj.dom.value is ', this.selectObj.dom.value);
        const selectedOption = this.optionSetting?.options?.find(opt => String(opt.value) === this.selectObj.dom.value);
        if (!this.optionSetting) {
          throw Error('无法获取optionSetting');
        }
        if (selectedOption && selectedOption.options) {
          this.resetOptionSettingResultValue(selectedOption.value);
          console.log('this.optionSetting is ', this.optionSetting);
          console.log('selectOption is ', selectedOption);
          this.resetOptions(selectedOption.options);
          // this.resetControl();
        }
      })
    );
  }
}
