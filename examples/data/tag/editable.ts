import { For, nextTick, TypeDiv } from '@type-dom/framework';
import { TdButton, TdInput, TdTag } from '@type-dom/ui';
import { computed, signal } from '@type-dom/signals';

export class TagEditableExample extends TypeDiv {
  className = 'TagEditableExample';

  constructor() {
    super();
    this.attr.addName('td-tag');
  }
  override setup() {
    const inputValue = signal('')
    const dynamicTags = signal(['Tag 1', 'Tag 2', 'Tag 3'])
    const inputVisible = signal(false)
    const InputRef = signal<TdInput>()

    const handleClose = (tag: string) => {
      console.log('handleClose . ');
      dynamicTags.get().splice(dynamicTags.get().indexOf(tag), 1);
    //   todo 如何自动渲染出来 ？？？？
    //      vuejs 是通过 v-for 指令实现的；
    }

    const showInput = () => {
      inputVisible.set(true);
      nextTick(() => {
        InputRef.get()!.input!.get().focus()
      })
    }

    const handleInputConfirm = () => {
      if (inputValue.get()) {
        // todo 如何渲染出来 ？？？？
        dynamicTags.set([...dynamicTags.get(), inputValue.get()]) // 触发effect ，否则不会渲染出来
      }
      inputVisible.set(false)
      inputValue.set('')
    }

    this.style.addObj({
      display: 'flex',
      gap: '0.5rem',
    });
    this.addChild(new For({
      data: dynamicTags,
      getter: (tag: string) => new TdTag({
        slot: tag,
        closable: true,
        disableTransitions: false,
        emits: {
          close: () => {
            handleClose(tag);
          },
        },
      })
    }));
    // todo 要监听 inputVisible.get()，动态变化的；
      this.addChild(new TdInput({
        vIf: inputVisible,
        size: 'small',
        refEl: InputRef,
        vModel: inputValue,
        class: 'w-20',
        styleObj: {
          width: 80,
          // display: 'none',
        },
        emits: {
          keydown: (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
              handleInputConfirm();
            }
          },
          blur: () => {
            console.log('editable tag inputEl blur . ');
            handleInputConfirm();
          },
        }
      }));

      this.addChild(new TdButton({
        vIf: computed(() => !inputVisible.get()),
        class: 'button-new-tag',
        size: 'small',
        slot: '+ New Tag',
        events: {
          click: showInput
        }
      }));
  }
}
