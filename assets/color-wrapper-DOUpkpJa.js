var R=Object.defineProperty;var M=(t,s,a)=>s in t?R(t,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[s]=a;var v=(t,s,a)=>M(t,typeof s!="symbol"?s+"":s,a);import{s as g,j as q,k as z,t as k,l as N,u as E,m as U,n as A,o as H,p as I,q as F,w as K,r as _,g as j,D as r,a as G,h as J,P as w,H as f}from"./index-DsBpGlQE.js";import{u as Q}from"./index-MaUr-uIK.js";import{T as O}from"./td-row.class-gWB4lbVX.js";import{T as h}from"./td-col.class-sOQlkFLZ.js";import{u as X}from"./index-emUSXifx.js";import"./index-6jkYjVo4.js";function Y(t=!1,s={}){const{truthyValue:a=!0,falsyValue:l=!1}=s,d=q(t)||z(t),o=g(t);function c(u){if(arguments.length)return o.set(u),o.get();{const m=k(a);return o.set(o.get()===m)&&k(l),o.get()}}return d?c:[o,c]}function B(t,s={}){const{controls:a=!1,navigator:l=N}=s,d=E(()=>l&&"permissions"in l),o=g(),c=typeof t=="string"?{name:t}:t,u=g(),m=()=>{var p;u.value=((p=o.value)==null?void 0:p.state)??"prompt"};U(o,"change",m,{passive:!0});const b=A(async()=>{if(d.value){if(!o.value)try{o.value=await l.permissions.query(c)}catch{o.value=void 0}finally{m()}if(a)return H(o.value)}});return b(),a?{state:u,isSupported:d,query:b}:u}function Z(t={}){const{navigator:s=N,read:a=!1,source:l,copiedDuring:d=1500,legacy:o=!1}=t,c=E(()=>s&&"clipboard"in s),u=B("clipboard-read"),m=B("clipboard-write"),b=F(()=>c.value||o),p=g(""),x=g(!1),e=I(()=>x.value=!1,d,{immediate:!1});async function P(){let n=!(c.value&&$(u.value));if(!n)try{p.value=await s.clipboard.readText()}catch{n=!0}n&&(p.value=L())}b.value&&a&&U(["copy","cut"],P,{passive:!0});async function W(n=k(l)){if(b.value&&n!=null){let i=!(c.value&&$(m.value));if(!i)try{await s.clipboard.writeText(n)}catch{i=!0}i&&D(n),p.set(n),x.value=!0,e.start()}}function D(n){const i=document.createElement("textarea");i.value=n??"",i.style.position="absolute",i.style.opacity="0",document.body.appendChild(i),i.select(),document.execCommand("copy"),i.remove()}function L(){var n,i;return((i=(n=document==null?void 0:document.getSelection)==null?void 0:n.call(document))==null?void 0:i.toString())??""}function $(n){return n==="granted"||n==="prompt"}return{isSupported:b,text:p,copied:x,copy:W}}const S=X({storageKey:"vitepress-theme-appearance"});Y(S);const y=(t,s)=>s?`--td-${t}-${s}`:`--td-${t}`,C=t=>{const s=g(getComputedStyle(document.documentElement).getPropertyValue(t));return K(()=>S.value,()=>{setTimeout(()=>{s.value=getComputedStyle(document.documentElement).getPropertyValue(t)},100)}),s},T=t=>getComputedStyle(document.documentElement).getPropertyValue(`--td-color-${t}`),V=()=>{const t=g(""),{copy:s,isSupported:a}=Z({source:t}),l=_;return{copyColor:async o=>{const c=T(o);t.value=c,a||l.error("Copy failed");try{await s(),l.success(`--td-color-${o}: ${t.value}`)}catch(u){l.error(u.message)}}}};class ee extends j{constructor(){super(...arguments);v(this,"className","MainColorExample")}setup(){const a=Q("--td-color-primary");console.warn("primary.get() is ",a.get());const l=[3,5,7,8,9].map(o=>`light-${o}`);l.unshift("dark-2");const{copyColor:d}=V();this.addChildren(new O({gutter:12,slot:new h({span:10,xs:{span:12},slot:new r({class:"demo-color-box",styleObj:{background:a},slot:["Brand Color",new r({class:"value",slot:F(()=>{var o;return(o=a.get())==null?void 0:o.toUpperCase()}),attrObj:{text:"xs"}}),new r({class:"bg-color-sub",styleObj:{background:a},slot:l.map(o=>new r({class:"bg-blue-sub-item cursor-pointer hover:shadow",styleObj:{width:`${100/6}%`,background:"var(--td-color-primary-"+o+")"},events:{click:()=>{d("primary-"+o)}}}))})]})})}))}}class oe extends j{constructor(){super(...arguments);v(this,"className","SecondaryColorExample")}setup(){const a=["success","warning","danger","info"],l=[3,5,7,8,9].map(o=>`light-${o}`);l.unshift("dark-2");const{copyColor:d}=V();this.addChildren(new O({gutter:12,slot:a.map(o=>new h({span:6,xs:{span:12},slot:new r({class:"demo-color-box",styleObj:{background:T(o)},slot:[o.charAt(0).toUpperCase()+o.slice(1),new r({class:"value",slot:T(o).toUpperCase(),attrObj:{text:"xs"}}),new r({class:"bg-color-sub",slot:l.map(c=>new r({class:"bg-secondary-sub-item transition cursor-pointer hover:shadow",styleObj:{width:`${100/6}%`,background:`var(--td-color-${o}-`+c+")"},events:{click:()=>{d(o+"-"+c)}}}))})]})}))}))}}class te extends j{constructor(){super(...arguments);v(this,"className","NeutralColorExample")}setup(){const l=["page","","overlay"].map(e=>({name:e?`${e[0].toUpperCase()+e.slice(1)} Background`:"Base Background",var:C(y("bg-color",e))})),o=["darker","dark","","light","lighter","extra-light"].map(e=>({name:e?`${e[0].toUpperCase()+e.slice(1)} Border`:"Base Border",var:C(y("border-color",e))})),u=["darker","dark","","light","lighter","extra-light","blank"].map(e=>({name:e?`${e[0].toUpperCase()+e.slice(1)} Fill`:"Base Fill",var:C(y("fill-color",e))})),b=["primary","regular","secondary","placeholder","disabled"].map(e=>({name:`${e[0].toUpperCase()+e.slice(1)} Text`,var:C(y("text-color",e))})),p="#000000",x="#FFFFFF";this.addChildren(new O({gutter:12,slot:[new h({span:6,xs:{span:12},slot:new r({class:"demo-color-box-group",slot:b.map(e=>new r({class:"demo-color-box demo-color-box-other",styleObj:{color:"var(--td-bg-color)",background:e.var.get()},slot:[e.name,new r({class:"value",slot:e.var.get().toUpperCase(),attrObj:{text:"xs"}})]}))})}),new h({span:6,xs:{span:12},slot:new r({class:"demo-color-box-group",slot:o.map(e=>new r({class:"demo-color-box demo-color-box-other demo-color-box-lite",styleObj:{background:e.var.get()},slot:[e.name,new r({class:"value",slot:e.var.get().toUpperCase(),attrObj:{text:"xs"}})]}))})}),new h({span:6,xs:{span:12},slot:new r({class:"demo-color-box-group",slot:u.map(e=>new r({class:"demo-color-box demo-color-box-other demo-color-box-lite",styleObj:{background:e.var.get(),border:`1px solid ${e.name==="Blank Fill"?"var(--el-border-color-light)":"transparent"}`},slot:[e.name,new r({class:"value",slot:e.var.get().toUpperCase(),attrObj:{text:"xs"}})]}))})}),new h({span:6,xs:{span:12},slot:new r({class:"demo-color-box-group",slot:[new r({class:"demo-color-box demo-color-box-other",styleObj:{background:p},slot:["Basic Black",new r({class:"value",slot:p,attrObj:{text:"xs"}})]}),new r({class:"demo-color-box demo-color-box-other",styleObj:{background:x,color:"#303133",border:"1px solid #eee"},slot:["Basic White",new r({class:"value",slot:x,attrObj:{text:"xs"}})]}),new r({class:"demo-color-box demo-color-box-other demo-color-box-lite bg-transparent",slot:["Transparent",new r({class:"value",slot:"Transparent",attrObj:{text:"xs"}})]}),...l.map(e=>new r({class:"demo-color-box demo-color-box-other demo-color-box-lite",styleObj:{background:e.var.value,border:"1px solid "+(!S||e.name==="Base Background"?"var(--el-border-color-light)":"transparent")},slot:[e.name,new r({class:"value",slot:e.var.get().toUpperCase(),attrObj:{text:"xs"}})]}))]})})]}))}}class de extends G{constructor(){super(...arguments);v(this,"className","ColorWrapper")}setup(){this.className="ColorWrapper",J(`
      .demo-color-box {
        position: relative;
        border-radius: 4px;
        padding: 20px;
        margin: 8px 0;
        height: 112px;
        box-sizing: border-box;
        color: var(--td-color-white);
        font-size: 14px;
      
        .bg-color-sub {
          width: 100%;
          height: 40px;
          left: 0;
          bottom: 0;
          position: absolute;
      
          .bg-blue-sub-item {
            height: 100%;
            display: inline-block;
      
            &:first-child {
              border-radius: 0 0 0 var(--td-border-radius-base);
            }
          }
      
          .bg-secondary-sub-item {
            height: 100%;
            display: inline-block;
            &:first-child {
              border-radius: 0 0 0 var(--td-border-radius-base);
            }
          }
        }
      
        .value {
          margin-top: 2px;
        }
      }
      
      .demo-color-box-lite {
        color: var(--td-text-color-primary);
      }
    `),this.addChildren(new r({slot:"Color 色彩",styleObj:{fontSize:"2.2em",fontWeight:900,margin:"1em 0"}}),new w({slot:"TypeDom UI 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。"})),this.createMain(),this.createSecondary(),this.createNeutral()}createMain(){this.addChildren(new f({nodeName:"h2",slot:"主色"}),new w({slot:"Element Plus 默认的主题色是明亮、友好的蓝色。"}),new ee)}createSecondary(){this.addChildren(new f({nodeName:"h2",slot:"辅助色"}),new w({slot:"除了主颜色外，您需要在不同的场景中使用不同的场景颜色 (例如，危险的颜色表示危险的操作)"}),new oe)}createNeutral(){this.addChildren(new f({nodeName:"h2",slot:"中性色"}),new w({slot:"中性色用于文本、背景和边框颜色。 通过运用不同的中性色，来表现层次结构。"}),new te)}}export{de as ColorWrapper};
