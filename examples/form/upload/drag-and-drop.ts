import { Div, Em, TypeDiv } from '@type-dom/framework';
import {
  TdIcon,
  TdUpload,
} from '@type-dom/ui';
import { ElUploadFilledSvg } from '@type-dom/svgs';

export class UploadDragAndDropExample extends TypeDiv {
  className = 'UploadDragAndDropExample';

 override  setup() {

    this.addChildren(
      new TdUpload({
        class: 'upload-demo',
        drag: true,
        action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
        multiple: true,
        slot: [
          new TdIcon({
            class: ['td-icon--upload'],
            slot: new ElUploadFilledSvg()
          }),
          new Div({
            class: 'td-upload__text',
            slot: [
              'Drop file here or ',
              new Em({
                slot: 'click to upload',
              })
            ]
          })
        ],
        slots: {
          tip: new Div({
            class: 'td-upload__tip',
            slot: 'jpg/png files with a size less than 500KB.'
          })
        },
      }),
    );
  }
}
