import { TypeDiv } from '@type-dom/framework';
import { TdImage } from '@type-dom/ui';
import './image-preview.scss';

export class ImagePreviewExample extends TypeDiv {
  className = 'ImagePreviewExample';

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
      ];
    this.attr.addClass('demo-image__preview');
    this.addChild(new TdImage({
      styleObj: {
        width: '100px',
        height: '100px',
      },
      src: url,
      zoomRate: 1.2,
      maxScale: 7,
      minScale: 0.2,
      previewSrcList: srcList,
      showProgress: true,
      initialIndex: 4,
      fit: 'cover'
    }));

    // createClass('demo-image__error image-slot', {
    //   fontSize: '30px',
    // });
    //
    // createClass('demo-image__error image-slot td-icon', {
    //   fontSize: '30px',
    // })
    // createClass('demo-image__error td-image', {
    //   width: '100%',
    //   height: '200px',
    // })
  }
}
