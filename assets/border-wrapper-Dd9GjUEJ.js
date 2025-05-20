var x=Object.defineProperty;var b=(t,s,e)=>s in t?x(t,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[s]=e;var l=(t,s,e)=>b(t,typeof s!="symbol"?s+"":s,e);import{g as p,h as w,D as r,s as n,i as g,a as y,P as i,H as c}from"./index-DsBpGlQE.js";import{C as u,E as h}from"./example-BNTbZGBw.js";import{T as m}from"./row.class-9NW7RB4d.js";import{T as a}from"./data-cell.class-bIudVjkM.js";import{T as f}from"./body.class-CXS3ezBz.js";import{T as D}from"./table.class-THjMFgjf.js";import{u as T}from"./index-MaUr-uIK.js";import{T as S}from"./td-row.class-gWB4lbVX.js";import{T as C}from"./td-col.class-sOQlkFLZ.js";class v extends p{constructor(){super(...arguments);l(this,"className","BorderExample")}setup(){w(`
      .demo-border .text {
        width: 15%;
      }
      .demo-border .line {
        width: 70%;
      }
      .demo-border .line div {
        width: 100%;
        height: 0;
        border-top: 1px solid var(--td-border-color);
      }
      .demo-border .line .dashed {
        border-top: 2px dashed var(--td-border-color);
      }    
    `),this.addChild(new D({class:"demo-border",slot:new f({slot:[new m({slot:[new a({class:"text",slot:"Name"}),new a({class:"text",slot:"Thickness"}),new a({class:"line",slot:"Demo"})]}),new m({slot:[new a({class:"text",slot:"Solid"}),new a({class:"text",slot:"1px"}),new a({class:"line",slot:new r})]}),new m({slot:[new a({class:"text",slot:"Dashed"}),new a({class:"text",slot:"2px"}),new a({class:"line",slot:new r({class:"dashed"})})]})]})}))}}class R extends p{constructor(){super(...arguments);l(this,"className","RadiusExample")}setup(){w(`
      .demo-radius .title {
        color: var(--td-text-color-regular);
        font-size: 18px;
        margin: 10px 0;
      }
      .demo-radius .value {
        color: var(--td-text-color-primary);
        font-size: 16px;
        margin: 10px 0;
      }
      .demo-radius .radius {
        height: 40px;
        width: 70%;
        border: 1px solid var(--td-border-color);
        border-radius: 0;
        margin-top: 20px;
      }
    `);const e=n([{name:"No Radius",type:""},{name:"Small Radius",type:"small"},{name:"Large Radius",type:"base"},{name:"Round Radius",type:"round"}]);this.addChild(new S({gutter:12,class:"demo-radius",slot:e.get().map(o=>new C({span:6,xs:{span:12},slot:[new r({class:"title",slot:o.name}),new r({class:"value",slot:new u({slot:"border-radius:"+(o.type?T(`--td-border-radius-${o.type}`).get():"0px")})}),new r({class:"radius",styleObj:{borderRadius:o.type?`var(--td-border-radius-${o.type})`:""}})]}))}))}}class E extends p{constructor(){super(...arguments);l(this,"className","ShadowExample")}setup(){const e=n([{name:"Basic Shadow",type:""},{name:"Light Shadow",type:"light"},{name:"Lighter Shadow",type:"lighter"},{name:"Dark Shadow",type:"dark"}]),o=d=>`--td-box-shadow${d?"-":""}${d}`;this.addChild(new r({class:"flex justify-between items-center flex-wrap",slot:e.get().map(d=>new r({class:"flex flex-col justify-center items-center",attrObj:{m:"auto",w:46},slot:[new r({class:"inline-flex",attrObj:{h:30,w:30,m:2},styleObj:{boxShadow:`var(${o(d.type)})`}}),new g({class:"demo-shadow-text",attrObj:{p:"y-4",text:"sm"},slot:d.name}),new u({attrObj:{text:"xs"},slot:o(d.type)})]}))}))}}class H extends y{constructor(){super();l(this,"className");l(this,"sourceData");this.className="BorderWrapper",this.addChildren(new r({slot:"Border 边框",styleObj:{fontSize:"2.2em",fontWeight:900,margin:"1em 0"}}),new i({slot:"我们对边框进行统一规范，可用于按钮、卡片、弹窗等组件里。"})),this.sourceData={border:n(""),radius:n(""),shadow:n("")},this.createBorder(),this.createRadius(),this.createShadow()}mounted(){fetch("./examples/basic/border/border.ts").then(e=>e.text()).then(e=>{this.sourceData.border.set(e)}).catch(e=>console.error("Error loading script:",e)),fetch("./examples/basic/border/radius.ts").then(e=>e.text()).then(e=>{this.sourceData.radius.set(e)}).catch(e=>console.error("Error loading script:",e)),fetch("./examples/basic/border/shadow.ts").then(e=>e.text()).then(e=>{this.sourceData.shadow.set(e)}).catch(e=>console.error("Error loading script:",e))}createBorder(){this.addChildren(new c({nodeName:"h2",slot:"边框样式"}),new i({slot:"我们提供了以下几种边框样式，以供选择。"}),new h({showcase:[new v],sourceWrapper:this.sourceData.border}))}createRadius(){this.addChildren(new c({nodeName:"h2",slot:"圆角"}),new i({slot:"我们提供了以下几种圆角样式，以供选择。"}),new h({showcase:[new R],sourceWrapper:this.sourceData.radius}))}createShadow(){this.addChildren(new c({nodeName:"h2",slot:"阴影"}),new i({slot:"我们提供了以下几种投影样式，以供选择。"}),new h({showcase:[new E],sourceWrapper:this.sourceData.shadow}))}}export{H as BorderWrapper};
