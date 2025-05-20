import { TypeDiv, Div, SvgSvg, SvgG, SvgCircle, onMounted, createStyle } from '@type-dom/framework';
import { TdAutocomplete, TdIcon } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class CustomLoadingExample  extends TypeDiv {
  className = 'CustomLoadingExample';

  override setup() {
    const state = signal('')

    interface LinkItem {
      value: string
      link: string
    }

    const links = signal<LinkItem[]>([])

    const loadAll = () => {
      return [
        { value: 'vue', link: 'https://github.com/vuejs/vue' },
        { value: 'element', link: 'https://github.com/ElemeFE/element' },
        { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
        { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
        { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
        { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
        { value: 'babel', link: 'https://github.com/babel/babel' },
      ]
    }

    let timeout: ReturnType<typeof setTimeout>
    const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
      const results = queryString
        ? links.get().filter(createFilter(queryString))
        : links.get()

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(results)
      }, 5000 * Math.random())
    }
    const createFilter = (queryString: string) => {
      return (restaurant: LinkItem) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    }

    const handleSelect = (item: Record<string, any>) => {
      console.log(item)
    }

    onMounted(() => {
      links.set(loadAll())
    })
    createStyle(`
      .circular {
        display: inline;
        height: 30px;
        width: 30px;
        animation: loading-rotate 2s linear infinite;
      }
      .path {
        animation: loading-dash 1.5s ease-in-out infinite;
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-width: 2;
        stroke: var(--el-color-primary);
        stroke-linecap: round;
      }
      .loading-path .dot1 {
        transform: translate(3.75px, 3.75px);
        fill: var(--el-color-primary);
        animation: custom-spin-move 1s infinite linear alternate;
        opacity: 0.3;
      }
      .loading-path .dot2 {
        transform: translate(calc(100% - 3.75px), 3.75px);
        fill: var(--el-color-primary);
        animation: custom-spin-move 1s infinite linear alternate;
        opacity: 0.3;
        animation-delay: 0.4s;
      }
      .loading-path .dot3 {
        transform: translate(3.75px, calc(100% - 3.75px));
        fill: var(--el-color-primary);
        animation: custom-spin-move 1s infinite linear alternate;
        opacity: 0.3;
        animation-delay: 1.2s;
      }
      .loading-path .dot4 {
        transform: translate(calc(100% - 3.75px), calc(100% - 3.75px));
        fill: var(--el-color-primary);
        animation: custom-spin-move 1s infinite linear alternate;
        opacity: 0.3;
        animation-delay: 0.8s;
      }
      @keyframes loading-rotate {
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes loading-dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -40px;
        }
        100% {
          stroke-dasharray: 90, 150;
          stroke-dashoffset: -120px;
        }
      }
      @keyframes custom-spin-move {
        to {
          opacity: 1;
        }
      }
    `);
    
    this.attr.addClass('flex gap-4');
    this.addChildren(
      new Div({
        slot: [
          new Div({
            class: 'sub-title my-2 text-sm text-gray-600',
            slot: 'loading icon1'
          }),
          new TdAutocomplete({
            vModel: state,
            fetchSuggestions: querySearchAsync,
            attrObj: {
              placeholder: 'Please Input',
            },
            emits: {
              select: handleSelect
            },
            slots: {
              loading: new SvgSvg({
                class: 'circular',
                attrObj: {
                  viewBox: '0 0 50 50',
                },
                slot: [
                  new SvgCircle({
                    class: 'path',
                    attrObj: {
                      cx: '25',
                      cy: '25',
                      r: '20',
                      fill: 'none'
                    }
                  })
                ]
              })
            }
          })
        ]
      }),
      new Div({
        slot: [
          new Div({
            class: 'sub-title my-2 text-sm text-gray-600',
            slot: 'loading icon2',
          }),
          new TdAutocomplete({
            vModel: state,
            fetchSuggestions: querySearchAsync,
            attrObj: {
              placeholder: 'Please Input',
            },
            emits: {
              select: handleSelect
            },
            slots: {
              loading: new TdIcon({
                class: 'loading',
                slot: new SvgSvg({
                  class: 'circular',
                  attrObj: {
                    viewBox: '0 0 20 20',
                    slot: new SvgG({
                      class: 'path2 loading-path',
                      attrObj: {
                        strokeWidth: 0,
                      },
                      styleObj: {
                        animation: 'none',
                        stroke: 'none'
                      },
                      slot: [
                        new SvgCircle({
                          class: 'dot1',
                          attrObj: {
                            r: 3.375,
                            rx: 0,
                            ry: 0
                          }
                        }),
                        new SvgCircle({
                          class: 'dot2',
                          attrObj: {
                            r: 3.375,
                            rx: 0,
                            ry: 0
                          }
                        }),
                        new SvgCircle({
                          class: 'dot4',
                          attrObj: {
                            r: 3.375,
                            rx: 0,
                            ry: 0
                          }
                        }),
                        new SvgCircle({
                          class: 'dot3',
                          attrObj: {
                            r: 3.375,
                            rx: 0,
                            ry: 0
                          }
                        })
                      ]
                    })
                  }
                })
              })
            }
          })
        ]
      })
    )
  }
}