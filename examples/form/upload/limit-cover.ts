import { Div, TypeDiv } from '@type-dom/framework';
import {
  genFileId,
  TdButton,
  TdUpload,
  UploadProps,
  UploadRawFile,
} from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class UploadLimitCoverExample extends TypeDiv {
  className = 'UploadLimitCoverExample';

 override  setup() {

    const upload = signal<TdUpload>()

    const handleExceed: UploadProps['onExceed'] = (files) => {
      upload.get()?.clearFiles?.()
      const file = files[0] as UploadRawFile
      file.uid = genFileId()
      upload.get()!.handleStart?.(file)
    }

    const submitUpload = () => {
      upload.get()!.submit?.()
    }

    this.addChildren(
      new TdUpload({
        refEl: upload,
        class: 'upload-domo',
        action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
        limit: 1,
        onExceed: handleExceed,
        autoUpload: false,
        slot: new TdButton({
          class: 'ml-3',
          type: 'success',
          events: {
            click: submitUpload
          },
          slot: 'upload to server',
        }),
        slots: {
          trigger: new TdButton({
            type: 'primary',
            slot: 'select file',
          }),
          tip: new Div({
            class: 'td-upload__tip text-red',
            styleObj: {
              color: 'rgb(248 113 113)'
            },
            slot: 'limit 1 file, new file will cover the old file'
          })
        }
      }),
    );
  }
}
