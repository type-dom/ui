import { Div, Img, Span, TypeDiv } from '@type-dom/framework';
import {
  TdDialog,
  TdIcon,
  TdUpload,
  UploadFile,
} from '@type-dom/ui';
import { signal } from '@type-dom/signals';
import { ElDeleteSvg, ElDownloadSvg, ElPlusSvg, ElZoomInSvg } from '@type-dom/svgs';

export class UploadCustomThumbnailExample extends TypeDiv {
  className = 'UploadCustomThumbnailExample';

 override  setup() {

    const dialogImageUrl = signal('')
    const dialogVisible = signal(false)
    const disabled = signal(false)

    const handleRemove = (file: UploadFile) => {
      console.log(file)
    }

    const handlePictureCardPreview = (file: UploadFile) => {
      dialogImageUrl.set(file.url!)
      dialogVisible.set(true)
    }

    const handleDownload = (file: UploadFile) => {
      console.log(file)
    }

    this.addChildren(
      new TdUpload({
        action: '#',
        listType: 'picture-card',
        autoUpload: false,
        slot: new TdIcon({
          slot: new ElPlusSvg()
        }),
        slots: {
          file: (file: UploadFile) => {
            return new Div({
              slot: [
                new Img({
                  class: 'td-upload-list__item-thumbnail',
                  attrObj: {
                    src: file.url,
                    alt: ''
                  }
                }),
                new Span({
                  class: 'td-upload-list__item-actions',
                  slot: [
                    new Span({
                      class: 'td-upload-list__item-preview',
                      events: {
                        click: () => handlePictureCardPreview(file)
                      },
                      slot: new TdIcon({
                        slot: new ElZoomInSvg()
                      })
                    }),
                    new Span({
                      vIf: !disabled.get(),
                      class: 'td-upload-list__item-delete',
                      events: {
                        click: () => handleDownload(file)
                      },
                      slot: new TdIcon({
                        slot: new ElDownloadSvg()
                      })
                    }),
                    new Span({
                      vIf: !disabled.get(),
                      class: 'td-upload-list__item-delete',
                      events: {
                        click: () => handleRemove(file),
                      },
                      slot: new TdIcon({
                        slot: new ElDeleteSvg()
                      })
                    })
                  ]
                })
              ],
            })
          }
        },
      }),
      new TdDialog({
        vModel: dialogVisible,
        slot: new Img({
          attrObj: {
            wFull: true,
            src: dialogImageUrl,
            alt: 'Preview Image'
          }
        })
      })
    );
  }
}
