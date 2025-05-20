import { onMounted, TypeDiv } from '@type-dom/framework';
import { TdAutocomplete } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class RemoteSearchExample extends TypeDiv {
  className = 'RemoteSearchExample';
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
      }, 3000 * Math.random())
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

    this.addChildren(
      new TdAutocomplete({
        vModel: state,
        fetchSuggestions: querySearchAsync,
        attrObj: {
          placeholder: 'Please input'
        },
        emits: {
          select: handleSelect,
        },
      })
    )
  }
}