import { createClass, Div, For, Span, TypeDiv } from '@type-dom/framework';
import { ImageProps, TdIcon, TdImage } from '@type-dom/ui';
import {
  ElDArrowLeftSvg,
  ElDArrowRightSvg, ElDownloadSvg,
  ElRefreshLeftSvg,
  ElRefreshRightSvg, ElRefreshSvg,
  ElZoomInSvg,
  ElZoomOutSvg
} from '@type-dom/svgs';
import { unref } from '@type-dom/signals';

export class ImageCustomToolbarExample extends TypeDiv {
  className = 'ImageCustomToolbarExample';

  setup() {
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

    const download = (index: number) => {
      const url = srcList[index]
      const suffix = url.slice(url.lastIndexOf('.'))
      const filename = Date.now() + suffix

      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(new Blob([blob]))
          const link = document.createElement('a')
          link.href = blobUrl
          link.download = filename
          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(blobUrl)
          link.remove()
        })
    }

    this.attr.addClass('demo-image__custom-toolbar')
    this.addChild(
      new TdImage({
        styleObj: {
          width: '100px',
          height: '100px',
        },
        src: url,
        previewSrcList: srcList,
        fit: 'cover',
        slots: {
          toolbar: ({ actions, prev, next, reset, activeIndex }) => {
            return [
              new TdIcon({
                events: {
                  click: prev,
                },
                slot: new ElDArrowLeftSvg(),
              }),
              new TdIcon({
                events: {
                  click: next,
                },
                slot: new ElDArrowRightSvg(),
              }),
              new TdIcon({
                events: {
                  click: () => actions('zoomOut'),
                },
                slot: new ElZoomOutSvg(),
              }),
              new TdIcon({
                events: {
                  click: actions('zoomIn', {
                    enableTransition: false,
                    zoomRate: 2,
                  }),
                },
                slot: new ElZoomInSvg(),
              }),
              new TdIcon({
                events: {
                  click: () =>
                    actions('clockwise', {
                      rotateDeg: 180,
                      enableTransition: false,
                    }),
                },
                slot: new ElRefreshRightSvg(),
              }),
              new TdIcon({
                events: {
                  click: () => actions('anticlockwise'),
                },
                slot: new ElRefreshLeftSvg(),
              }),
              new TdIcon({
                events: {
                  click: reset,
                },
                slot: new ElRefreshSvg(),
              }),
              new TdIcon({
                events: {
                  click: () => download(unref(activeIndex)),
                },
                slot: new ElDownloadSvg(),
              }),
            ];
          },
        },
      })
    );
  }
}
