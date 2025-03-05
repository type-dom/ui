import { Div, TypeDiv } from '@type-dom/framework';
import { TdButton, TdUpload,  } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class UploadManualExample extends TypeDiv {
  className = 'UploadManualExample';

  setup() {

    const uploadRef = signal<TdUpload>()

    const submitUpload = () => {
      uploadRef.get()!.submit()
    }

    this.addChildren(
      new TdUpload({
        refEl: uploadRef,
        class: 'upload-domo',
        action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
        autoUpload: false,
        slots: {
          trigger: new TdButton({
            type: 'primary',
            slot: 'select file',
          }),
          default: new TdButton({
            class: 'ml-3',
            type: 'success',
            slot: 'upload to server',
            events: {
              click: submitUpload
            }
          }),
          tip: new Div({
            class: 'td-upload__tip',
            slot: 'jpg/png files with a size less than 500KB.'
          })
        }
      }),
    );
  }
}
