import { createClass, Div, Img, Span, TypeDiv } from '@type-dom/framework';
import { TdIcon, TdImage } from '@type-dom/ui';
import { ElPictureSvg } from '@type-dom/svgs';
import './load-failed.scss';

export class ImageLoadFailedExample extends TypeDiv {
  className = 'ImageLoadFailedExample';

  setup() {
    this.attr.addClass('demo-image__error');
    this.addChildren(
      new Div({
        class: 'block',
        slot: [
          new Span({
            class: 'demonstration',
            slot: 'Default'
          }),
          new TdImage()
        ]
      }),
      new Div({
        class: 'block',
        slot: [
          new Span({
            class: 'demonstration',
            slot: 'Custom'
          }),
          new TdImage({
            slots: {
              error: new Div({
                class: 'image-slot',
                slot: new TdIcon({
                  slot: new ElPictureSvg()
                })
              })
            }
          })
        ]
      })
    )
  //
  //   createClass('demo-image__error block', {
  //     padding: '30px 0',
  //     textAlign: 'center',
  //     borderRight: 'solid 1px var(--el-border-color)',
  //     display: 'inline-block',
  //     width: '49%',
  //     boxSizing: 'border-box',
  //     verticalAlign: 'top',
  //   })
  //
  //   createClass('demo-image__error demonstration', {
  //     display: 'block',
  //     color: 'var(--el-text-color-secondary)',
  //     fontSize: '14px',
  //     marginBottom: '20px',
  //   })
  //
    createClass('demo-image__error td-image', {
      padding: '0 5px',
      maxWidth: '300px',
      maxHeight: '200px',
      width: '100%',
      height: '200px',
    })
  //
  //   createClass('demo-image__error image-slot', {
  //     display: 'flex',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     width: '100%',
  //     height: '100%',
  //     background: 'var(--el-fill-color-light)',
  //     color: 'var(--el-text-color-secondary)',
  //     fontSize: '30px',
  //   })
  }
}
