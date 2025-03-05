import { TypeDiv } from '@type-dom/framework';
import { TdRate } from '@type-dom/ui';
import { signal } from '@type-dom/signals';
import { ElChatDotRoundSvg, ElChatLineRoundSvg, ElChatRoundSvg } from '@type-dom/svgs';

export class RateMoreIcons extends TypeDiv {
  className = 'RateMoreIcons';

  setup() {
    const value = signal()
    const icons = [ElChatRoundSvg, ElChatLineRoundSvg, ElChatDotRoundSvg] // same as { 2: ChatRound, 4: { value: ChatLineRound, excluded: true }, 5: ChatDotRound }

    this.addChild(new TdRate({
      vModel: value,
      icons: icons,
      voidIcon: ElChatRoundSvg,
      colors: ['#409eff', '#67c23a', '#FF9900']
    }))
  }
}
