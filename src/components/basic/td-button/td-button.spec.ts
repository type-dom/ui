import { ElSearchSvg } from '@type-dom/svgs';
import { SlotNode } from '@type-dom/framework';
import { TdButton } from './td-button.class';

describe('TdButton', () => {
  let button: TdButton;

  beforeEach(() => {
    // 在每个测试用例开始之前，我们都创建一个新的 TdButton 实例
    button = new TdButton();
  });

  it('should create', () => {
    expect(button).toBeTruthy();
  });

  it('should setup loading state correctly', () => {
    const loadingProps = { loading: true };
    button = new TdButton(loadingProps);
    button.setup();
    expect(button.icon).toBeTruthy();
    // 这里可以根据实际情况添加更多的断言来验证 loading 状态下的样式和结构
  });

  it('should setup icon correctly when svgObj is provided', () => {
    // 这里你需要提供一个有效的 svgObj 或者 mock 一个
    const svgObj = new ElSearchSvg();
    const params = { svgObj };
    button = new TdButton(params);
    expect(button.icon).toBeTruthy();
    // 这里可以根据实际情况添加更多的断言来验证图标是否正确设置
  });

  it('should setup icon correctly when slots.icon is provided', () => {
    // 这里你需要提供一个有效的 iconSlot 或者 mock 一个
    const iconSlot = new SlotNode('icon') /* ... */;
    const params = { slots: { icon: iconSlot } };
    button = new TdButton(params);
    expect(button.icon).toBeTruthy();
    // 这里可以根据实际情况添加更多的断言来验证图标是否正确设置
  });

  it('should setup disabled state correctly', () => {
    const disabledProps = { disabled: true };
    button = new TdButton(disabledProps);
    button.setup();
    expect(button.style.getObj()).toHaveProperty('color', expect.any(String));
    expect(button.style.getObj()).toHaveProperty('backgroundColor', expect.any(String));
    expect(button.style.getObj()).toHaveProperty('borderColor', expect.any(String));
    // 这里可以根据实际情况添加更多的断言来验证禁用状态下的样式
  });

  it('should setup size correctly', () => {
    button = new TdButton({ size: 'small' });
    expect(button.style.getObj()).toHaveProperty('fontSize', expect.any(String));
    // 这里可以根据实际情况添加更多的断言来验证不同尺寸的样式
  });

  // ... 这里可以添加更多的测试用例来验证不同的属性和方法
});
