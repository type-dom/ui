import { Img, TypeDiv } from '@type-dom/framework';
import {
  TdIcon,
  TdDialog,
  TdUpload,
  UploadProps,
  UploadUserFile
} from '@type-dom/ui';
import { signal } from '@type-dom/signals';
import { ElPlusSvg } from '@type-dom/svgs';

export class UploadPhotoWallExample extends TypeDiv {
  className = 'UploadPhotoWallExample';

  setup() {

    const fileList = signal<UploadUserFile[]>([
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
        name: 'plant-1.png',
        url: 'https://element-plus.org/images/plant-1.png',
      },
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
        name: 'plant-2.png',
        url: 'https://element-plus.org/images/plant-2.png',
      },
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
        name: 'figure-1.png',
        url: 'https://element-plus.org/images/figure-1.png',
      },
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
        name: 'figure-2.png',
        url: 'https://element-plus.org/images/figure-2.png',
      },
    ])

    const dialogImageUrl = signal('')
    const dialogVisible = signal(false)

    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles)
    }

    const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
      dialogImageUrl.set(uploadFile.url!)
      dialogVisible.set(true)
    }

    this.addChildren(
      new TdUpload({
        // v-model:file-list="fileList"
        fileList: fileList,
        action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
        listType: 'picture-card',
        onPreview: handlePictureCardPreview,
        onRemove: handleRemove,
        slot: new TdIcon({
          slot: new ElPlusSvg(),
        }),
      }),
      new TdDialog({
        vModel: dialogVisible,
        slot: new Img({
          styleObj: {
            maxWidth: '100%',
          },
          attrObj: {
            wFull: true,
            src: dialogImageUrl,
            alt: 'Preview Image',
          }
        })
      })
    );
  }
}
