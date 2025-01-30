import {
  TypeDiv,
  onBeforeUnmount,
  useMutationObserver,
  onMounted,
} from '@type-dom/framework';
import { ITdWatermark, WatermarkProps } from './td-watermark.interface';
import { watermarkProps } from './td-watermark.const';
import { getPixelRatio, getStyleStr, reRendering } from './utils';
import { computed, signal, watch } from '@type-dom/signals';
import useClips, { FontGap } from './useClips';
import { isArray } from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';

export class TdWatermark extends TypeDiv implements ITdWatermark {
  className: 'TdWatermark';
  override props: WatermarkProps;

  constructor(params: WatermarkProps = {}) {
    super();
    this.className = 'TdWatermark';
    this.assignProps(watermarkProps);
    this.props = this.useParams(params);
  }

  override setup() {
    const style: IStyle = {
      position: 'relative',
    };

    const props = this.props;
    const color = computed(() => props.font?.color ?? 'rgba(0,0,0,.15)');
    const fontSize = computed(() => props.font?.fontSize ?? 16);
    const fontWeight = computed(() => props.font?.fontWeight ?? 'normal');
    const fontStyle = computed(() => props.font?.fontStyle ?? 'normal');
    const fontFamily = computed(() => props.font?.fontFamily ?? 'sans-serif');
    const textAlign = computed(() => props.font?.textAlign ?? 'center');
    const textBaseline = computed(() => props.font?.textBaseline ?? 'hanging');

    const gapX = computed(() => props.gap?.[0]);
    const gapY = computed(() => props.gap?.[1]);
    const gapXCenter = computed(() => gapX.get()! / 2);
    const gapYCenter = computed(() => gapY.get()! / 2);
    const offsetLeft = computed(() => props.offset?.[0] ?? gapXCenter.get());
    const offsetTop = computed(() => props.offset?.[1] ?? gapYCenter.get());

    const getMarkStyle = () => {
      const markStyle: IStyle = {
        zIndex: props.zIndex,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        backgroundRepeat: 'repeat',
      };

      /** Calculate the style of the offset */
      let positionLeft = offsetLeft.get() - gapXCenter.get();
      let positionTop = offsetTop.get() - gapYCenter.get();
      if (positionLeft > 0) {
        markStyle.left = `${positionLeft}px`;
        markStyle.width = `calc(100% - ${positionLeft}px)`;
        positionLeft = 0;
      }
      if (positionTop > 0) {
        markStyle.top = `${positionTop}px`;
        markStyle.height = `calc(100% - ${positionTop}px)`;
        positionTop = 0;
      }
      markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;

      return markStyle;
    };

    const containerRef = signal<HTMLDivElement | undefined>(undefined);
    const watermarkRef = signal<HTMLDivElement>();
    const stopObservation = signal(false);

    const destroyWatermark = () => {
      if (watermarkRef.get()) {
        watermarkRef.get()?.remove();
        watermarkRef.set(undefined);
      }
    };
    const appendWatermark = (base64Url: string, markWidth: number) => {
      if (containerRef.get() && watermarkRef.get()) {
        stopObservation.set(true);
        watermarkRef.get()?.setAttribute(
          'style',
          getStyleStr({
            ...getMarkStyle(),
            backgroundImage: `url('${base64Url}')`,
            backgroundSize: `${Math.floor(markWidth)}px`,
          })
        );
        containerRef.get()?.append(watermarkRef.get()!);
        // Delayed execution
        setTimeout(() => {
          stopObservation.set(false);
        });
      }
    };

    /**
     * Get the width and height of the watermark. The default values are as follows
     * Image: [120, 64]; Content: It's calculated by content;
     */
    const getMarkSize = (ctx: CanvasRenderingContext2D) => {
      let defaultWidth = 120;
      let defaultHeight = 64;
      const image = props.image;
      const content = props.content;
      const width = props.width;
      const height = props.height;
      if (!image && ctx.measureText) {
        ctx.font = `${Number(fontSize.get())}px ${fontFamily.get()}`;
        const contents = isArray(content) ? content : [content];
        const sizes = contents.map((item) => {
          const metrics = ctx.measureText(item!);

          return [
            metrics.width,
            // Using `actualBoundingBoxAscent` to be compatible with lower version browsers (eg: Firefox < 116)
            metrics.fontBoundingBoxAscent !== undefined
              ? metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
              : metrics.actualBoundingBoxAscent +
                metrics.actualBoundingBoxDescent,
          ];
        });
        defaultWidth = Math.ceil(Math.max(...sizes.map((size) => size[0])));
        defaultHeight =
          Math.ceil(Math.max(...sizes.map((size) => size[1]))) *
            contents.length +
          (contents.length - 1) * FontGap;
      }
      return [width ?? defaultWidth, height ?? defaultHeight] as const;
    };

    const getClips = useClips();

    const renderWatermark = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const image = props.image;
      const content = props.content;
      const rotate = props.rotate;

      if (ctx) {
        if (!watermarkRef.get()) {
          watermarkRef.set(document.createElement('div'));
        }

        const ratio = getPixelRatio();
        const [markWidth, markHeight] = getMarkSize(ctx);

        const drawCanvas = (
          drawContent?:
            | NonNullable<WatermarkProps['content']>
            | HTMLImageElement
        ) => {
          const [textClips, clipWidth] = getClips(
            drawContent || '',
            rotate!,
            ratio,
            markWidth,
            markHeight,
            {
              color: color.get(),
              fontSize: fontSize.get(),
              fontStyle: fontStyle.get(),
              fontWeight: fontWeight.get(),
              fontFamily: fontFamily.get(),
              textAlign: textAlign.get(),
              textBaseline: textBaseline.get(),
            },
            gapX.get()!,
            gapY.get()!
          );

          appendWatermark(textClips, clipWidth);
        };

        if (image) {
          const img = new Image();
          img.onload = () => {
            drawCanvas(img);
          };
          img.onerror = () => {
            drawCanvas(content);
          };
          img.crossOrigin = 'anonymous';
          img.referrerPolicy = 'no-referrer';
          img.src = image;
        } else {
          drawCanvas(content);
        }
      }
    };

    onMounted(() => {
      renderWatermark();
    });

    watch(
      () => props,
      () => {
        renderWatermark();
      },
      {
        deep: true,
        flush: 'post',
      }
    );

    onBeforeUnmount(() => {
      destroyWatermark();
    });

    const onMutate = (mutations: MutationRecord[]) => {
      if (stopObservation.get()) {
        return;
      }
      mutations.forEach((mutation) => {
        if (reRendering(mutation, watermarkRef.get())) {
          destroyWatermark();
          renderWatermark();
        }
      });
    };

    useMutationObserver(containerRef, onMutate, {
      attributes: true,
      subtree: true,
      childList: true,
    });

    this.assignProps({
      refDom: containerRef,
    });

    this.style.addObj(style);
  }
}
