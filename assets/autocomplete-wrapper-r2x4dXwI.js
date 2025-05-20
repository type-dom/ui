var j=Object.defineProperty;var C=(r,l,e)=>l in r?j(r,l,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[l]=e;var d=(r,l,e)=>C(r,typeof l!="symbol"?l+"":l,e);import{g as O,Y as f,s as o,D as n,ba as v,a as k,h as E,i as F,d as S,bb as y,P as g,H as w}from"./index-DsBpGlQE.js";import{E as x}from"./example-BNTbZGBw.js";import{E as A}from"./edit-CRQb9RxV.js";import{S as b}from"./circle.class-0Dkz0WhR.js";import{S as L}from"./g.class-BCZmLeDR.js";class T extends O{constructor(){super(...arguments);d(this,"className","AutocompleteExample")}setup(){const e=o(""),s=o(""),c=o([]),i=(t,a)=>{const p=t?c.get().filter(m(t)):c.get();a(p)},m=t=>a=>a.value.toLowerCase().indexOf(t.toLowerCase())===0,h=()=>[{value:"vue",link:"https://github.com/vuejs/vue"},{value:"element",link:"https://github.com/ElemeFE/element"},{value:"cooking",link:"https://github.com/ElemeFE/cooking"},{value:"mint-ui",link:"https://github.com/ElemeFE/mint-ui"},{value:"vuex",link:"https://github.com/vuejs/vuex"},{value:"vue-router",link:"https://github.com/vuejs/vue-router"},{value:"babel",link:"https://github.com/babel/babel"}],u=t=>{console.log(t)};f(()=>{c.set(h())}),this.addChildren(new n({class:"flex gap-4",slot:[new n({slot:[new n({class:"sub-title my-2 text-sm text-gray-600",slot:"list suggestions when activated"}),new v({vModel:e,fetchSuggestions:i,clearable:!0,class:"inline-input w-50",attrObj:{placeholder:"Please Input"},emits:{select:u}})]}),new n({slot:[new n({class:"sub-title my-2 text-sm text-gray-600",slot:"list suggestions on input"}),new v({vModel:s,fetchSuggestions:i,triggerOnFocus:!1,clearable:!0,class:"inline-input w-50",attrObj:{placeholder:"Please Input"},emits:{select:u}})]})]}))}}class D extends k{constructor(){super(...arguments);d(this,"className","AutocompleteTemplateExample")}setup(){this.attr.addName("autocomplete-template-example");const e=o(""),s=o([]),c=(t,a)=>{const p=t?s.get().filter(i(t)):s.get();a(p)},i=t=>a=>a.value.toLowerCase().indexOf(t.toLowerCase())===0,m=()=>[{value:"vue",link:"https://github.com/vuejs/vue"},{value:"element",link:"https://github.com/ElemeFE/element"},{value:"cooking",link:"https://github.com/ElemeFE/cooking"},{value:"mint-ui",link:"https://github.com/ElemeFE/mint-ui"},{value:"vuex",link:"https://github.com/vuejs/vuex"},{value:"vue-router",link:"https://github.com/vuejs/vue-router"},{value:"babel",link:"https://github.com/babel/babel"}],h=t=>{console.log(t)},u=t=>{console.log(t)};f(()=>{s.set(m())}),E(`
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
    `),this.addChildren(new v({vModel:e,fetchSuggestions:c,popperClass:"my-autocomplete",attrObj:{placeholder:"Please input"},emits:{select:h},slots:{suffix:new S({class:"td-input__icon",events:{click:u},slot:new A})},slot:t=>[new n({class:"value",slot:t.value}),new F({class:"link",slot:t.link})]}))}}class N extends k{constructor(){super(...arguments);d(this,"className","RemoteSearchExample")}setup(){const e=o(""),s=o([]),c=()=>[{value:"vue",link:"https://github.com/vuejs/vue"},{value:"element",link:"https://github.com/ElemeFE/element"},{value:"cooking",link:"https://github.com/ElemeFE/cooking"},{value:"mint-ui",link:"https://github.com/ElemeFE/mint-ui"},{value:"vuex",link:"https://github.com/vuejs/vuex"},{value:"vue-router",link:"https://github.com/vuejs/vue-router"},{value:"babel",link:"https://github.com/babel/babel"}];let i;const m=(t,a)=>{const p=t?s.get().filter(h(t)):s.get();clearTimeout(i),i=setTimeout(()=>{a(p)},3e3*Math.random())},h=t=>a=>a.value.toLowerCase().indexOf(t.toLowerCase())===0,u=t=>{console.log(t)};f(()=>{s.set(c())}),this.addChildren(new v({vModel:e,fetchSuggestions:m,attrObj:{placeholder:"Please input"},emits:{select:u}}))}}class M extends k{constructor(){super(...arguments);d(this,"className","CustomLoadingExample")}setup(){const e=o(""),s=o([]),c=()=>[{value:"vue",link:"https://github.com/vuejs/vue"},{value:"element",link:"https://github.com/ElemeFE/element"},{value:"cooking",link:"https://github.com/ElemeFE/cooking"},{value:"mint-ui",link:"https://github.com/ElemeFE/mint-ui"},{value:"vuex",link:"https://github.com/vuejs/vuex"},{value:"vue-router",link:"https://github.com/vuejs/vue-router"},{value:"babel",link:"https://github.com/babel/babel"}];let i;const m=(t,a)=>{const p=t?s.get().filter(h(t)):s.get();clearTimeout(i),i=setTimeout(()=>{a(p)},5e3*Math.random())},h=t=>a=>a.value.toLowerCase().indexOf(t.toLowerCase())===0,u=t=>{console.log(t)};f(()=>{s.set(c())}),E(`
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
    `),this.attr.addClass("flex gap-4"),this.addChildren(new n({slot:[new n({class:"sub-title my-2 text-sm text-gray-600",slot:"loading icon1"}),new v({vModel:e,fetchSuggestions:m,attrObj:{placeholder:"Please Input"},emits:{select:u},slots:{loading:new y({class:"circular",attrObj:{viewBox:"0 0 50 50"},slot:[new b({class:"path",attrObj:{cx:"25",cy:"25",r:"20",fill:"none"}})]})}})]}),new n({slot:[new n({class:"sub-title my-2 text-sm text-gray-600",slot:"loading icon2"}),new v({vModel:e,fetchSuggestions:m,attrObj:{placeholder:"Please Input"},emits:{select:u},slots:{loading:new S({class:"loading",slot:new y({class:"circular",attrObj:{viewBox:"0 0 20 20",slot:new L({class:"path2 loading-path",attrObj:{strokeWidth:0},styleObj:{animation:"none",stroke:"none"},slot:[new b({class:"dot1",attrObj:{r:3.375,rx:0,ry:0}}),new b({class:"dot2",attrObj:{r:3.375,rx:0,ry:0}}),new b({class:"dot4",attrObj:{r:3.375,rx:0,ry:0}}),new b({class:"dot3",attrObj:{r:3.375,rx:0,ry:0}})]})}})})}})]}))}}class R extends k{constructor(){super();d(this,"className");d(this,"sourceData");this.className="AutoCompleteWrapper",this.attr.addName("autocomplete-wrapper"),this.sourceData={autocomplete:o(""),autocompleteTemplate:o(""),customLoading:o(""),remoteSearch:o("")},this.addChildren(new n({slot:"自动补全输入框",styleObj:{fontSize:"2.2em",fontWeight:900,margin:"1em 0"}}),new g({slot:"根据输入内容提供对应的输入建议。"})),this.createBasic(),this.createAutocompleteTemplate(),this.createCustomLoading(),this.createRemoteSearch()}created(){fetch("./examples/form/autocomplete/autocomplete.ts").then(e=>e.text()).then(e=>{this.sourceData.autocomplete.set(e)}).catch(e=>console.error("error is ",e)),fetch("./examples/form/autocomplete/autocomplete-template.ts").then(e=>e.text()).then(e=>{this.sourceData.autocompleteTemplate.set(e)}).catch(e=>console.error("error is ",e)),fetch("./examples/form/autocomplete/custom-loading.ts").then(e=>e.text()).then(e=>{this.sourceData.customLoading.set(e)}).catch(e=>console.error("error is ",e)),fetch("./examples/form/autocomplete/remote-search.ts").then(e=>e.text()).then(e=>{this.sourceData.remoteSearch.set(e)}).catch(e=>console.error("error is ",e))}createBasic(){this.addChildren(new w({nodeName:"h2",slot:"基础用法"}),new g({slot:"Autocomplete 组件提供输入建议。"}),new g({slot:"fetch-suggestions 属性是返回建议输入的方法。 在此示例中， querySearch(queryString, cb) 方法通过 cb(data) 给 Autocomplete 组件返回建议。",styleObj:{fontSize:"0.875rem",lineHeight:"1.25rem"}}),new x({showcase:[new T],sourceWrapper:this.sourceData.autocomplete}))}createAutocompleteTemplate(){this.addChildren(new w({nodeName:"h2",slot:"自定义模板"}),new g({slot:"自定义如何显示输入建议。"}),new g({slot:"使用 scoped slot 自定义输入建议。 在这个范围中，你可以使用 item 键来访问当前输入建议对象。",styleObj:{fontSize:"0.875rem",lineHeight:"1.25rem"}}),new x({showcase:[new D],sourceWrapper:this.sourceData.autocompleteTemplate}))}createRemoteSearch(){this.addChildren(new w({nodeName:"h2",slot:"远程搜索"}),new g({slot:"从服务端搜索数据。"}),new x({showcase:[new N],sourceWrapper:this.sourceData.remoteSearch}))}createCustomLoading(){this.addChildren(new w({nodeName:"h2",slot:"自定义加载"}),new g({slot:"修改加载区域内容"}),new x({showcase:[new M],sourceWrapper:this.sourceData.customLoading}))}}export{R as AutoCompleteWrapper};
