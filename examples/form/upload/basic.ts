import { Div, TypeDiv } from '@type-dom/framework';
import { TdButton, TdMessage, TdMessageBox, TdUpload, UploadProps, UploadUserFile } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class UploadBasicExample extends TypeDiv {
  className = 'UploadBasicExample';

  setup() {
    const fileList = signal<UploadUserFile[]>([
      {
        name: 'element-plus-logo.svg',
        url: 'https://element-plus.org/images/element-plus-logo.svg',
      },
      {
        name: 'element-plus-logo2.svg',
        url: 'https://element-plus.org/images/element-plus-logo.svg',
      },
    ])

    const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
      console.log(file, uploadFiles)
    }

    const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
      console.log(uploadFile)
    }

    const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
      TdMessage.warning(
        `The limit is 3, you selected ${files.length} files this time, add up to ${
          files.length + uploadFiles.length
        } totally`
      )
    }

    const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
      return TdMessageBox.confirm(
        `Cancel the transfer of ${uploadFile.name} ?`
      ).then(
        () => true,
        () => false
      )
    }

    this.addChildren(
      new TdUpload({
        // v-model:file-list="fileList"
        fileList: fileList,
        class: 'upload-domo',
        action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
        multiple: true,
        onPreview: handlePreview,
        onRemove: handleRemove,
        beforeRemove: beforeRemove,
        limit: 3,
        onExceed: handleExceed,
        slot: new TdButton({
          type: 'primary',
          slot: 'Click to upload',
        }),
        emits: {
          'update:fileList': (uploadFiles: UploadUserFile[]) => {
            fileList.set(uploadFiles);
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
