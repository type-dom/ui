import { Div, Span, P, TypeDiv } from '@type-dom/framework';
import { CheckboxValueType, TdButton, TdCheckbox, TdInput, TdOption, TdSelect } from '@type-dom/ui';
import { signal } from '@type-dom/signals';

interface ListItem {
  value: string
  label: string
}

export class SelectRemoteSearchExample extends TypeDiv {
  className: 'SelectRemoteSearchExample';

  constructor() {
    super();
    this.className = 'SelectRemoteSearchExample';

    const list = signal<ListItem[]>([])
    const options = signal<ListItem[]>([])
    const value = signal<string[]>([])
    const loading = signal(false)

    this.onMounted(() => {
      list.set(states.map((item) => {
        return { value: `value:${item}`, label: `label:${item}` }
      }))
    })

    const remoteMethod = (query: string) => {
      if (query) {
        loading.set(true)
        setTimeout(() => {
          loading.set(false)
          options.set(list.get().filter((item) => {
            return item.label.toLowerCase().includes(query.toLowerCase())
          }))
        }, 200)
      } else {
        options.set([]);
      }
    };

    const states = [
      'Alabama',
      'Alaska',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'Florida',
      'Georgia',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ]
    this.style.addObj({
      display: 'flex',
      flexWrap: 'wrap',
    });
    this.addChildren(
      new Div({
        styleObj: {
          gap: '12px',
        },
        slot: [
          new P({
            slot: 'default',
          }),
          new TdSelect({
            vModel: value,
            multiple: true,
            filterable: true,
            remote: true,
            reserveKeyword: true,
            placeholder: 'Select',
            remoteMethod: remoteMethod,
            loading: loading,
            styleObj: {
              width: 240,
            },
            slot: options.get().map(opt => new TdOption({
              label: opt.label,
              value: opt.value,
            })),
          })
        ]
      }),
      new Div({
        styleObj: {
          gap: '12px',
        },
        slot: [
          new P({
            slot: 'use remote-show-suffix',
          }),
          new TdSelect({
            vModel: value,
            multiple: true,
            filterable: true,
            remote: true,
            reserveKeyword: true,
            placeholder: 'Select',
            remoteShowSuffix: true,
            remoteMethod: remoteMethod,
            loading: loading,
            styleObj: {
              width: 240,
            },
            slot: options.get().map(opt => new TdOption({
              label: opt.label,
              value: opt.value,
            })),
          })
        ]
      })
    );
  }
}
