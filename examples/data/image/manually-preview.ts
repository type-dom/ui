import { createClass, Div, TypeDiv } from '@type-dom/framework';
import { TdButton, TdImage, TdImageViewer } from '@type-dom/ui';
import './image-preview.scss';
import { signal } from '@type-dom/signals';

export class ImageManuallyPreviewExample extends TypeDiv {
  className = 'ImageManuallyPreviewExample';

 override  setup() {

    const url =
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    const srcList = [
      'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
      'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
      'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
      'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
    ]

    const imageRef = signal<TdImage>()
    const showPreview = signal(false)

    const handleClick = () => {
      imageRef.get()!.showPreview?.()
    }
    createClass('demo-image__manually-preview', {
      display: 'grid',
      gap: '10px',
    });
    createClass('demo-image__manually-preview td-button', {
      width: 'fit-content'
    });

    this.attr.addClass('demo-image__manually-preview');
    this.addChildren(
      new Div({
        class: 'grid gap-3',
        slot: [
          new TdButton({
            events: {
              click: handleClick,
            },
            slot: 'openPreview with showPreview method'
          }),
          new TdImage({
            refEl: imageRef,
            styleObj: {
              width: '100px',
              height: '100px',
            },
            src: url,
            showProgress: true,
            previewSrcList: srcList,
            fit: 'cover',
          })
        ]
      }),
      new Div({
        slot: [
          new TdButton({
            slot: ' preview controlled ',
            events: {
              click: () => showPreview.set(true),
            }
          }),
          new TdImageViewer({
            vIf: showPreview,
            urlList: srcList,
            showProgress: true,
            initialIndex: 4,
            emits: {
              close: () => showPreview.set(false),
            }
          })
        ]
      }),
     );
  }
}
