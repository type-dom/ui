import { Div, TypeDiv } from '@type-dom/framework';
import { TdButton, TdUpload, UploadProps, UploadUserFile } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class UploadFileListExample extends TypeDiv {
  className = 'UploadFileListExample';

  setup() {

    const fileList = signal<UploadUserFile[]>([
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
    ])

    const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
      fileList.set(fileList.get().slice(-3))
    }

    this.addChildren(
      new TdUpload({
        // v-model:file-list="fileList"
        fileList: fileList.get(),
        class: 'upload-domo',
        action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
        onChange: handleChange,
        slot: new TdButton({
          type: 'primary',
          slot: 'Click to upload',
        }),
        emits: {
          'update-first-file-list': (newVal: UploadUserFile[]) => {
            fileList.set(newVal)
          }
        },
        slots: {
          tip: new Div({
            class: 'td-upload__tip',
            slot: 'jpg/png files with a size less than 500KB.'
          })
        }
      }),
    );
  }
}
