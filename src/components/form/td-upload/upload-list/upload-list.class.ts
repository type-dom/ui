import {
  A,
  Div,
  For,
  Fragment,
  I,
  Img,
  Label,
  LI,
  Span,
  TransitionGroup,
  TypeFragment,
} from '@type-dom/framework';
import { computed, signal } from '@type-dom/signals';
import { isFunction } from '@type-dom/utils';
import { ElCheckSvg, ElCircleCheckSvg, ElCloseSvg, ElDeleteSvg, ElDocumentSvg, ElZoomInSvg } from '@type-dom/svgs';
import { useLocale } from '../../../../hooks/use-locale';
import { useNamespace } from '../../../../hooks/use-namespace';
import { TdIcon } from '../../../basic/td-icon/td-icon.class';
import { TdProgress } from '../../../data/td-progress/td-progress.class';
import { useFormDisabled } from '../../td-form/hooks/use-form-common-props';
import { UploadFile } from '../td-upload.interface';
import { ITdUploadList, UploadListProps } from './upload-list.interface';
import { uploadListEmits, uploadListProps } from './upload-list.const';

export class TdUploadList extends TypeFragment implements ITdUploadList {
  className : 'TdUploadList';
  override props: UploadListProps;

  constructor(params: UploadListProps = {}) {
    super();
    this.className = 'TdUploadList';

    this.addEmits(uploadListEmits);
    this.assignProps(uploadListProps);
    this.props = this.useParams(params);
  }

  override setup() {
    // console.error('setup . ');
    const props = this.props;
    const emit = this.emit;

    const { t } = useLocale()
    const nsUpload = useNamespace('upload')
    const nsIcon = useNamespace('icon')
    // console.log('nsIcon.m(close) is ', nsIcon.m('close'));
    const nsList = useNamespace('list')
    const disabled = useFormDisabled()

    const focusing = signal(false)

    const containerKls = computed(() => [
      nsUpload.b('list'),
      nsUpload.bm('list', props.listType),
      nsUpload.is('disabled', props.disabled),
    ])

    const handleRemove = (file: UploadFile) => {
      console.error('file is ', file);
      emit('remove', file)
    }

    this.addChild(
      new TransitionGroup({
        tag: 'ul',
        class: containerKls,
        name: nsList.b(),
        slot: [
          new For({
            data: props.files,
            getter: (file, index) => {
              return new LI({
                class: [
                  nsUpload.be('list', 'item'),
                  nsUpload.is(file.status),
                  { focusing },
                ],
                attrObj: {
                  tabindex: 0,
                },
                events: {
                  keydown: (e) => {
                    if (e?.code === 'Delete') {
                      !disabled.get() && handleRemove(file)
                    }
                  },
                  focus: () => {
                    focusing.set(true)
                  },
                  blur: () => {
                    focusing.set(false)
                  },
                  click: () => {
                    focusing.set(false)
                  }
                },
                slot: isFunction(props.slots?.default)
                  ? props.slots?.default?.(file, index) ?? [
                  new Img({
                    vIf:  props.listType === 'picture' ||
                      (file.status !== 'uploading' && props.listType === 'picture-card'),
                    attrObj: {
                      src: file.url,
                      class: nsUpload.be('list', 'item-thumbnail'),
                      crossorigin: 'crossorigin',
                      alt: '',
                    }
                  }),
                  new Div({
                    vIf: file.status === 'uploading' || props.listType !== 'picture-card',
                    class: nsUpload.be('list', 'item-info'),
                    slot: [
                      new A({
                        class: nsUpload.be('list', 'item-name'),
                        events: {
                          click: (e) => {
                            e?.preventDefault()
                            props.handlePreview?.(file)
                          }
                        },
                        slot: [
                          new TdIcon({
                            class: [nsIcon.m('document')],
                            slot: new ElDocumentSvg(),
                          }),
                          new Span({
                            class: nsUpload.be('list', 'item-file-name'),
                            slot: file.name
                          })
                        ]
                      }),
                      new TdProgress({
                        vIf: file.status === 'uploading',
                        type: props.listType === 'picture-card' ? 'circle' : 'line',
                        strokeWidth: props.listType === 'picture-card' ? 6 : 2,
                        percentage: Number(file.percentage),
                        styleObj: props.listType === 'picture-card' ? '' : { marginTop: '0.5rem' }
                      }),
                    ]
                  }),
                  new Label({
                    class: nsUpload.be('list', 'item-status-label'),
                    slot: props.listType === 'text'
                      ? new TdIcon({
                        class: [nsIcon.m('upload-success'), nsIcon.m('circle-check')],
                        slot: new ElCircleCheckSvg(),
                      })
                      : ['picture-card', 'picture'].includes(props.listType!)
                        ? new TdIcon({
                          class: [nsIcon.m('upload-success'), nsIcon.m('check')],
                          slot: new ElCheckSvg(),
                        })
                        : undefined
                  }),
                  new TdIcon({
                    vIf: computed(() => !disabled.get()),
                    class: [nsIcon.m('close')],
                    events: {
                      click: () => handleRemove(file)
                    },
                    slot: new ElCloseSvg()
                  }),
                  // <!-- Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn-->
                  // <!-- This is a bug which needs to be fixed -->
                  // <!-- TODO: Fix the incorrect navigation interaction -->
                  new I({
                    vIf: computed(() => !disabled.get()),
                    class: nsIcon.m('close-tip'),
                    slot: t('el.upload.deleteTip'),
                  }),
                  new Span({
                    vIf: props.listType === 'picture-card',
                    class: nsUpload.be('list', 'item-actions'),
                    slot: [
                      new Span({
                        class: nsUpload.be('list', 'item-preview'),
                        events: {
                          click: () => {
                            props.handlePreview?.(file)
                          }
                        },
                        slot: [
                          new TdIcon({
                            class: nsIcon.m('zoom-in'),
                            slot: new ElZoomInSvg(),
                          })
                        ]
                      }),
                      new Span({
                        vIf: computed(() => !disabled.get()),
                        class: nsUpload.be('list','item-delete'),
                        events: {
                          click: () => handleRemove(file)
                        },
                        slot: new TdIcon({
                          class: nsIcon.m('download'),
                          slot: new ElDeleteSvg(),
                        })
                      })
                    ]
                  })
                ]
                  : undefined,
              })
            },
          }),
          new Fragment({
            slot: props.slots?.append
          })
        ],
      })
    )
  }
}
