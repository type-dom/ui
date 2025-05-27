import { inject, TypeDiv } from '@type-dom/framework';
import { throwError } from '@type-dom/utils';
import { signal } from '@type-dom/signals';
import { useNamespace } from '../../../../hooks/use-namespace';
import { useFormDisabled } from '../../td-form/hooks/use-form-common-props';
import { uploadContextKey } from '../constants';
import type { UploadRawFile } from '../td-upload.interface'
import { ITdUploadDrag, UploadDragProps } from './upload-dragger.interface';
import { uploadDragEmits, uploadDragProps } from './upload-dragger.const';


export class TdUploadDrag extends TypeDiv implements ITdUploadDrag {
  className: 'TdUploadDrag';
  override props: UploadDragProps;

  constructor(params: UploadDragProps = {}) {
    super();
    this.className = 'TdUploadDrag';

    this.addEmits(uploadDragEmits);
    this.assignProps(uploadDragProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    const emit = this.emit;

    const COMPONENT_NAME = 'TdUploadDrag'

    const uploaderContext = inject(uploadContextKey)
    if (!uploaderContext) {
      throwError(
        COMPONENT_NAME,
        'usage: <td-upload><td-upload-dragger /></td-upload>'
      )
    }

    const ns = useNamespace('upload')
    const dragover = signal(false)
    const disabled = useFormDisabled()

    const onDrop = (e?: DragEvent) => {
      if (disabled.get()) return
      dragover.set(false)

      e?.stopPropagation()

      const files = Array.from(e!.dataTransfer!.files) as UploadRawFile[]
      const items = e?.dataTransfer!.items || []
      files.forEach((file, index) => {
        const item = items[index]
        const entry = item?.webkitGetAsEntry?.()
        if (entry) {
          file.isDirectory = entry.isDirectory
        }
      })
      emit('file', files)
    }

    const onDragover = () => {
      if (!disabled.get()) dragover.set(true)
    }

    this.attr.addClass([
      ns.b('dragger'),
      ns.is('dragover', dragover.get())
    ]);
    this.addEvents({
      drop: (evt) => {
        onDrop(evt);
        evt?.preventDefault();
      },
      dragover: (evt) => {
        onDragover();
        evt?.preventDefault();
      },
      dragleave: (evt) => {
        dragover.set(false);
        evt?.preventDefault();
      }
    })
    this.slotChildren(props.slot ?? props.slots?.default);
  }
}
