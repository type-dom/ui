import { onMounted, TypeDiv, createStyle, Div, Span } from '@type-dom/framework';
import { TdAutocomplete, TdIcon } from '@type-dom/ui';
import { ElEditSvg } from '@type-dom/svgs';
import { signal } from '@type-dom/signals';

export class AutocompleteTemplateExample extends TypeDiv {
  className = 'AutocompleteTemplateExample';
  override setup() {
    this.attr.addName('autocomplete-template-example');

    interface LinkItem {
      value: string
      link: string
    }

    const state = signal('')
    const links = signal<LinkItem[]>([])

    const querySearch = (queryString: string, cb: (p: any) => void) => {
      const results = queryString
        ? links.get().filter(createFilter(queryString))
        : links.get()
      // call callback function to return suggestion objects
      cb(results)
    }
    const createFilter = (queryString: string) => {
      return (restaurant: LinkItem) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    }
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
    const handleSelect = (item: Record<string, any>) => {
      console.log(item)
    }

    const handleIconClick = (ev?: Event) => {
      console.log(ev)
    }

    onMounted(() => {
      links.set(loadAll())
    })

    createStyle(`
      .my-autocomplete li {
        line-height: normal;
        padding: 7px;
      }
      .my-autocomplete li .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .my-autocomplete li .addr {
        font-size: 12px;
        color: #b4b4b4;
      }
      .my-autocomplete li .highlighted .addr {
        color: #ddd;
      }
    `)
    this.addChildren(
      new TdAutocomplete({
        vModel: state,
        fetchSuggestions: querySearch,
        popperClass: 'my-autocomplete',
        attrObj: {
          placeholder: 'Please input'
        },
        emits: {
          select: handleSelect,
        },
        slots: {
          suffix: new TdIcon({
            class: 'td-input__icon',
            events: {
              click: handleIconClick,
            },
            slot: new ElEditSvg(),
          })
        },
        slot: (item) => [
          new Div({
            class: 'value',
            slot: item.value
          }),
          new Span({
            class: 'link',
            slot: item.link
          })
        ]
      })
    )
  }
}