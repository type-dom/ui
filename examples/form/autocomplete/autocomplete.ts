import { TypeFragment, Div, onMounted } from '@type-dom/framework';
import { TdAutocomplete } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

export class AutocompleteExample  extends TypeFragment {
  className = 'AutocompleteExample';

  override setup() {

    interface RestaurantItem {
      value: string
      link: string
    }

    const state1 = signal('')
    const state2 = signal('')

    const restaurants = signal<RestaurantItem[]>([])
    const querySearch = (queryString: string, cb: any) => {
      const results = queryString
        ? restaurants.get().filter(createFilter(queryString))
        : restaurants.get()
      // call callback function to return suggestions
      cb(results)
    }
    const createFilter = (queryString: string) => {
      return (restaurant: RestaurantItem) => {
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

    onMounted(() => {
      restaurants.set(loadAll());
    })
    this.addChildren(
      new Div({
        class: 'flex gap-4',
        slot: [
          new Div({
            slot: [
              new Div({
                class: 'sub-title my-2 text-sm text-gray-600',
                slot: 'list suggestions when activated'
              }),
              new TdAutocomplete({
                vModel: state1,
                fetchSuggestions: querySearch,
                clearable: true,
                class: 'inline-input w-50',
                attrObj: {
                  placeholder: 'Please Input',
                },
                emits: {
                  select: handleSelect
                }
              })
            ]
          }),
          new Div({
            slot: [
              new Div({
                class: 'sub-title my-2 text-sm text-gray-600',
                slot: 'list suggestions on input',
              }),
              new TdAutocomplete({
                vModel: state2,
                fetchSuggestions: querySearch,
                triggerOnFocus: false,
                clearable: true,
                class: 'inline-input w-50',
                attrObj: {
                  placeholder: 'Please Input',
                },
                emits: {
                  select: handleSelect
                }
              })
            ]
          })
        ]
      })
    )
  }
}