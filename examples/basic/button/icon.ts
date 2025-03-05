import { Div, TypeDiv } from '@type-dom/framework';
import { TdButton, TdIcon } from '@type-dom/ui';
import {
  ElDeleteSvg,
  ElEditSvg,
  ElSearchSvg,
  ElShareSvg,
  ElUploadSvg
} from '@type-dom/svgs';

export class ButtonIconExample extends TypeDiv {
  className = 'ButtonIconExample';

  constructor() {
    super();
    this.addChild(this.createIconButton());
  }

  createIconButton() {
    return new Div({
      slot: [
        new TdButton({
          name: 'edit-icon-btn',
          type: 'primary',
          icon: new ElEditSvg(),
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'share-icon-btn',
          icon: new ElShareSvg(),
          type: 'primary',
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'success-icon-btn',
          icon: new ElDeleteSvg(),
          type: 'primary',
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          name: 'info-icon-btn',
          icon: new ElSearchSvg(),
          type: 'primary',
          slot: 'Search',
          styleObj: {
            margin: '3px 10px'
          }
        }),
        new TdButton({
          type: 'primary',
          styleObj: {
            margin: '3px 10px'
          },
          attrObj: {
            name: 'upload-btn'
          },
          // icon: new ElUploadSvg(),
          // slot: 'Upload',
          // iconPosition: 'right',
          slot: [
            'Upload',
            new TdIcon({
              slot: new ElUploadSvg(),
              styleObj: {
                marginLeft: '5px'
              }
            })
          ]
        })
      ]
    });
  }
}
