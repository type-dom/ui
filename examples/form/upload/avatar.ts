import { createClass, Img, TypeDiv } from '@type-dom/framework';
import {
  TdIcon,
  TdMessage,
  TdUpload,
  UploadProps,
} from '@type-dom/ui';
import { computed, signal } from '@type-dom/signals';
import { ElPlusSvg } from '@type-dom/svgs';
import './avatar.scss';

export class UploadAvatarExample extends TypeDiv {
  className = 'UploadAvatarExample';

  setup() {

    const imageUrl = signal('')

    const handleAvatarSuccess: UploadProps['onSuccess'] = (
      response,
      uploadFile
    ) => {
      imageUrl.set(URL.createObjectURL(uploadFile.raw!))
    }

    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
      if (rawFile.type !== 'image/jpeg') {
        TdMessage.error('Avatar picture must be JPG format!')
        return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
        TdMessage.error('Avatar picture size can not exceed 2MB!')
        return false
      }
      return true
    }
    createClass('avatar-uploader avatar', {
      width: '178px',
      height: '178px',
      display: 'block',
    });

    this.addChildren(
      new TdUpload({
        class: 'avatar-uploader',
        action: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
        showFileList: false,
        onSuccess: handleAvatarSuccess,
        beforeUpload: beforeAvatarUpload,
        slot: computed(() => {
          return imageUrl.get()
            ? new Img({
              class: 'avatar',
              attrObj: {
                src: imageUrl,
              }
            })
            : new TdIcon({
              class: 'avatar-uploader-icon',
              slot: new ElPlusSvg()
            })
        })
      }),
    );
  }
}
