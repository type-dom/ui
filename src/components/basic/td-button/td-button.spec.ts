import { ElSearchSvg } from '@type-dom/svgs';
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

  it('should setup disabled state correctly', () => {
    const disabledProps = { disabled: true };
    button = new TdButton(disabledProps);
    button.setup();
    expect(button.style.getObj()).toHaveProperty('color', expect.any(String));
    expect(button.style.getObj()).toHaveProperty(
      'backgroundColor',
      expect.any(String)
    );
    expect(button.style.getObj()).toHaveProperty(
      'borderColor',
      expect.any(String)
    );
    // 这里可以根据实际情况添加更多的断言来验证禁用状态下的样式
  });

  it('should setup size correctly', () => {
    button = new TdButton({ size: 'small' });
    expect(button.style.getObj()).toHaveProperty(
      'fontSize',
      expect.any(String)
    );
    // 这里可以根据实际情况添加更多的断言来验证不同尺寸的样式
  });

  // ... 这里可以添加更多的测试用例来验证不同的属性和方法
});
