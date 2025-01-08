import{r as o,R as A,j as e,L as J}from"./index-9688397a.js";import"./swiper-react-8064e097.js";import{N as le,F as ne}from"./Navbar-3b4c5f70.js";import"./index-cd4d834f.js";import ie from"./ScrollToTop-8d5e2577.js";import{a as oe}from"./img-8-12d78f2f.js";import{F as y}from"./FormInput-d43d68fa.js";import{f as ce,c as Z,p as de,S as Q,D as O,y as _,s as Y,o as S,l as B,X as U,I as ee,a as ue,u as D,b as M,N as W,e as me,d as w,O as $,M as v,t as fe}from"./PopoverLayout-22cf5e6c.js";import"./logo-dark-a7523ff3.js";import"./OffcanvasLayout-fbf41302.js";function xe({onFocus:r}){let[t,a]=o.useState(!0),s=ce();return t?A.createElement(Z,{as:"button",type:"button",features:de.Focusable,onFocus:i=>{i.preventDefault();let l,c=50;function b(){if(c--<=0){l&&cancelAnimationFrame(l);return}if(r()){if(cancelAnimationFrame(l),!s.current)return;a(!1);return}l=requestAnimationFrame(b)}l=requestAnimationFrame(b)}}):null}const re=o.createContext(null);function be(){return{groups:new Map,get(r,t){var a;let s=this.groups.get(r);s||(s=new Map,this.groups.set(r,s));let i=(a=s.get(t))!=null?a:0;s.set(t,i+1);let l=Array.from(s.keys()).indexOf(t);function c(){let b=s.get(t);b>1?s.set(t,b-1):s.delete(t)}return[l,c]}}}function pe({children:r}){let t=o.useRef(be());return o.createElement(re.Provider,{value:t},r)}function te(r){let t=o.useContext(re);if(!t)throw new Error("You must wrap your component in a <StableCollection>");let a=he(),[s,i]=t.current.get(r,a);return o.useEffect(()=>i,[]),s}function he(){var r,t,a;let s=(a=(t=(r=o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED)==null?void 0:r.ReactCurrentOwner)==null?void 0:t.current)!=null?a:null;if(!s)return Symbol();let i=[],l=s;for(;l;)i.push(l.index),l=l.return;return"$."+i.join(".")}var ge=(r=>(r[r.Forwards=0]="Forwards",r[r.Backwards=1]="Backwards",r))(ge||{}),ye=(r=>(r[r.Less=-1]="Less",r[r.Equal=0]="Equal",r[r.Greater=1]="Greater",r))(ye||{}),we=(r=>(r[r.SetSelectedIndex=0]="SetSelectedIndex",r[r.RegisterTab=1]="RegisterTab",r[r.UnregisterTab=2]="UnregisterTab",r[r.RegisterPanel=3]="RegisterPanel",r[r.UnregisterPanel=4]="UnregisterPanel",r))(we||{});let ve={0(r,t){var a;let s=M(r.tabs,u=>u.current),i=M(r.panels,u=>u.current),l=s.filter(u=>{var P;return!((P=u.current)!=null&&P.hasAttribute("disabled"))}),c={...r,tabs:s,panels:i};if(t.index<0||t.index>s.length-1){let u=D(Math.sign(t.index-r.selectedIndex),{[-1]:()=>1,0:()=>D(Math.sign(t.index),{[-1]:()=>0,0:()=>0,1:()=>1}),1:()=>0});return l.length===0?c:{...c,selectedIndex:D(u,{0:()=>s.indexOf(l[0]),1:()=>s.indexOf(l[l.length-1])})}}let b=s.slice(0,t.index),N=[...s.slice(t.index),...b].find(u=>l.includes(u));if(!N)return c;let p=(a=s.indexOf(N))!=null?a:r.selectedIndex;return p===-1&&(p=r.selectedIndex),{...c,selectedIndex:p}},1(r,t){var a;if(r.tabs.includes(t.tab))return r;let s=r.tabs[r.selectedIndex],i=M([...r.tabs,t.tab],c=>c.current),l=(a=i.indexOf(s))!=null?a:r.selectedIndex;return l===-1&&(l=r.selectedIndex),{...r,tabs:i,selectedIndex:l}},2(r,t){return{...r,tabs:r.tabs.filter(a=>a!==t.tab)}},3(r,t){return r.panels.includes(t.panel)?r:{...r,panels:M([...r.panels,t.panel],a=>a.current)}},4(r,t){return{...r,panels:r.panels.filter(a=>a!==t.panel)}}},z=o.createContext(null);z.displayName="TabsDataContext";function F(r){let t=o.useContext(z);if(t===null){let a=new Error(`<${r} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(a,F),a}return t}let X=o.createContext(null);X.displayName="TabsActionsContext";function H(r){let t=o.useContext(X);if(t===null){let a=new Error(`<${r} /> is missing a parent <Tab.Group /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(a,H),a}return t}function Ne(r,t){return D(t.type,ve,r,t)}let je=o.Fragment;function ke(r,t){let{defaultIndex:a=0,vertical:s=!1,manual:i=!1,onChange:l,selectedIndex:c=null,...b}=r;const N=s?"vertical":"horizontal",p=i?"manual":"auto";let u=c!==null,P=_(t),[d,g]=o.useReducer(Ne,{selectedIndex:c??a,tabs:[],panels:[]}),f=o.useMemo(()=>({selectedIndex:d.selectedIndex}),[d.selectedIndex]),R=Y(l||(()=>{})),L=Y(d.tabs),x=o.useMemo(()=>({orientation:N,activation:p,...d}),[N,p,d]),h=S(m=>(g({type:1,tab:m}),()=>g({type:2,tab:m}))),T=S(m=>(g({type:3,panel:m}),()=>g({type:4,panel:m}))),I=S(m=>{E.current!==m&&R.current(m),u||g({type:0,index:m})}),E=Y(u?r.selectedIndex:d.selectedIndex),V=o.useMemo(()=>({registerTab:h,registerPanel:T,change:I}),[]);B(()=>{g({type:0,index:c??a})},[c]),B(()=>{if(E.current===void 0||d.tabs.length<=0)return;let m=M(d.tabs,C=>C.current);m.some((C,n)=>d.tabs[n]!==C)&&I(m.indexOf(d.tabs[E.current]))});let q={ref:P};return A.createElement(pe,null,A.createElement(X.Provider,{value:V},A.createElement(z.Provider,{value:x},x.tabs.length<=0&&A.createElement(xe,{onFocus:()=>{var m,C;for(let n of L.current)if(((m=n.current)==null?void 0:m.tabIndex)===0)return(C=n.current)==null||C.focus(),!0;return!1}}),U({ourProps:q,theirProps:b,slot:f,defaultTag:je,name:"Tabs"}))))}let Pe="div";function Ce(r,t){let{orientation:a,selectedIndex:s}=F("Tab.List"),i=_(t);return U({ourProps:{ref:i,role:"tablist","aria-orientation":a},theirProps:r,slot:{selectedIndex:s},defaultTag:Pe,name:"Tabs.List"})}let Te="button";function Ie(r,t){var a,s;let i=ee(),{id:l=`headlessui-tabs-tab-${i}`,...c}=r,{orientation:b,activation:N,selectedIndex:p,tabs:u,panels:P}=F("Tab"),d=H("Tab"),g=F("Tab"),f=o.useRef(null),R=_(f,t);B(()=>d.registerTab(f),[d,f]);let L=te("tabs"),x=u.indexOf(f);x===-1&&(x=L);let h=x===p,T=S(n=>{var j;let G=n();if(G===W.Success&&N==="auto"){let ae=(j=me(f))==null?void 0:j.activeElement,K=g.tabs.findIndex(se=>se.current===ae);K!==-1&&d.change(K)}return G}),I=S(n=>{let j=u.map(G=>G.current).filter(Boolean);if(n.key===w.Space||n.key===w.Enter){n.preventDefault(),n.stopPropagation(),d.change(x);return}switch(n.key){case w.Home:case w.PageUp:return n.preventDefault(),n.stopPropagation(),T(()=>$(j,v.First));case w.End:case w.PageDown:return n.preventDefault(),n.stopPropagation(),T(()=>$(j,v.Last))}if(T(()=>D(b,{vertical(){return n.key===w.ArrowUp?$(j,v.Previous|v.WrapAround):n.key===w.ArrowDown?$(j,v.Next|v.WrapAround):W.Error},horizontal(){return n.key===w.ArrowLeft?$(j,v.Previous|v.WrapAround):n.key===w.ArrowRight?$(j,v.Next|v.WrapAround):W.Error}}))===W.Success)return n.preventDefault()}),E=o.useRef(!1),V=S(()=>{var n;E.current||(E.current=!0,(n=f.current)==null||n.focus(),d.change(x),fe(()=>{E.current=!1}))}),q=S(n=>{n.preventDefault()}),m=o.useMemo(()=>({selected:h}),[h]),C={ref:R,onKeyDown:I,onMouseDown:q,onClick:V,id:l,role:"tab",type:ue(r,f),"aria-controls":(s=(a=P[x])==null?void 0:a.current)==null?void 0:s.id,"aria-selected":h,tabIndex:h?0:-1};return U({ourProps:C,theirProps:c,slot:m,defaultTag:Te,name:"Tabs.Tab"})}let Ee="div";function Se(r,t){let{selectedIndex:a}=F("Tab.Panels"),s=_(t),i=o.useMemo(()=>({selectedIndex:a}),[a]);return U({ourProps:{ref:s},theirProps:r,slot:i,defaultTag:Ee,name:"Tabs.Panels"})}let $e="div",Ae=Q.RenderStrategy|Q.Static;function Fe(r,t){var a,s,i,l;let c=ee(),{id:b=`headlessui-tabs-panel-${c}`,tabIndex:N=0,...p}=r,{selectedIndex:u,tabs:P,panels:d}=F("Tab.Panel"),g=H("Tab.Panel"),f=o.useRef(null),R=_(f,t);B(()=>g.registerPanel(f),[g,f]);let L=te("panels"),x=d.indexOf(f);x===-1&&(x=L);let h=x===u,T=o.useMemo(()=>({selected:h}),[h]),I={ref:R,id:b,role:"tabpanel","aria-labelledby":(s=(a=P[x])==null?void 0:a.current)==null?void 0:s.id,tabIndex:h?N:-1};return!h&&((i=p.unmount)==null||i)&&!((l=p.static)!=null&&l)?A.createElement(Z,{as:"span",...I}):U({ourProps:I,theirProps:p,slot:T,defaultTag:$e,features:Ae,visible:h,name:"Tabs.Panel"})}let Re=O(Ie),Le=O(ke),Me=O(Ce),De=O(Se),Oe=O(Fe),k=Object.assign(Re,{Group:Le,List:Me,Panels:De,Panel:Oe});const _e=()=>e.jsx("div",{className:"bg-slate-100 h-full mt-[77px]  py-3 px-3",children:e.jsx("section",{className:"relative overflow-hidden",children:e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"flex",children:e.jsxs("div",{className:"w-full",children:[e.jsx("h3",{className:"text-xl text-gray-800 mt-2",children:"Account Settings"}),e.jsx("p",{className:"mt-1 font-medium mb-4",children:"Change your account settings"})]})}),e.jsx("div",{className:"flex mt-2",children:e.jsx("div",{className:"w-full",children:e.jsx("div",{className:"bg-white rounded",children:e.jsx("div",{className:"p-6",children:e.jsx("div",{className:"grid lg:grid-cols-4 gap-6","data-fc-type":"tab",children:e.jsxs(k.Group,{vertical:!0,children:[e.jsx("div",{className:"col-span-1",children:e.jsxs(k.List,{as:"nav","aria-label":"Tabs",className:"flex flex-row lg:flex-col gap-2 w-auto lg:w-full bg-slate-100 p-1.5 rounded-md lg:justify-start",children:[e.jsx(k,{as:"button",className:({selected:r})=>`text-start py-2 px-4 rounded transition-all ${r?"bg-white text-primary":"bg-transparent"}`,type:"button",children:"Account"}),e.jsx(k,{as:"button",className:({selected:r})=>`text-start py-2 px-4 rounded transition-all ${r?"bg-white text-primary":"bg-transparent"}`,type:"button",children:"Password"}),e.jsx(k,{as:"button",className:({selected:r})=>`text-start py-2 px-4 rounded transition-all ${r?"bg-white text-primary":"bg-transparent"}`,type:"button",children:"Notifications"})]})}),e.jsxs(k.Panels,{className:"lg:col-span-3 transition-all px-4 h-full",children:[e.jsxs(k.Panel,{id:"account",className:"min-h-[650px]",children:[e.jsx("h4",{className:"text-base text-gray-800",children:"Account Information"}),e.jsxs("form",{action:"#",children:[e.jsx("h6",{className:"mt-6 mb-2.5 text-sm text-gray-800",children:"Your Avatar"}),e.jsxs("div",{className:"flex items-center gap-6",children:[e.jsx("div",{className:"sharink",children:e.jsx("div",{className:"w-16 h-16",children:e.jsx("img",{src:oe,className:"max-w-full max-h-full rounded-full shadow",alt:"..."})})}),e.jsxs("div",{className:"grow flex items-center gap-3",children:[e.jsx(J,{to:"",className:"inline-flex items-center justify-center rounded text-xs font-semibold border border-primary text-primary transition-all hover:shadow-lg hover:bg-primary hover:text-white hover:shadow-primary/30 focus:shadow-none focus:outline focus:outline-primary/40 px-3 py-2",children:"Upload"}),e.jsx(J,{to:"",className:"inline-flex items-center justify-center rounded text-xs font-semibold border border-red-500 text-red-500 transition-all hover:shadow-lg hover:bg-red-500 hover:text-white hover:shadow-red-500/30 focus:shadow-none focus:outline focus:outline-red-500/40 px-3 py-2",children:"Remove"})]})]}),e.jsx("hr",{className:"my-6"}),e.jsxs("div",{className:"grid grid-cols-2 items-center gap-6",children:[e.jsxs("div",{children:[e.jsx(y,{name:"fullname",label:"Full Name",type:"text",labelClassName:"block text-sm font-semibold mb-1 text-gray-600",className:"py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0",placeholder:"Your Name",defaultValue:"Greeva Navadiya",containerClass:"mb-4"}),e.jsx(y,{name:"email",label:"Email",type:"email",labelClassName:"block text-sm font-semibold mb-1 text-gray-600",className:"py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0",placeholder:"Email",defaultValue:"greeva@coderthemes.com",containerClass:"mb-4"})]}),e.jsxs("div",{children:[e.jsx(y,{name:"user_name",label:"User Name",type:"text",labelClassName:"block text-sm font-semibold mb-1 text-gray-600",className:"py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0",placeholder:"user name",defaultValue:"Greeva N",containerClass:"mb-4"}),e.jsx(y,{name:"phone",label:"Phone",type:"text",labelClassName:"block text-sm font-semibold mb-1 text-gray-600",className:"py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded text-sm focus:border-gray-300 focus:ring-0",placeholder:"Phone number",defaultValue:"+1 254 024 5400",containerClass:"mb-4"})]})]}),e.jsx("hr",{className:"mb-3"}),e.jsxs("div",{className:"flex flex-wrap my-4",children:[e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-semibold mb-1 text-gray-600",children:"Profile Visibility"}),e.jsxs("div",{className:"flex gap-4 my-2",children:[e.jsx(y,{name:"visibility",label:"Public",type:"radio",labelClassName:"text-sm font-medium text-gray-700",className:"h-4 w-4 rounded-full border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400",defaultChecked:!0}),e.jsx(y,{name:"visibility",label:"Private",type:"radio",labelClassName:"text-sm font-medium text-gray-700",className:"h-4 w-4 rounded-full border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"})]}),e.jsx("small",{className:"text-xs text-slate-500 mt-3",children:"Making your profile public means anyone can see your information"})]})}),e.jsx("div",{className:"w-full mt-2",children:e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-sm font-semibold mb-1 text-gray-600",children:"Contact Info Visibility"}),e.jsxs("div",{className:"flex gap-4 my-2",children:[e.jsx(y,{name:"infovisibility",label:"Public",type:"radio",labelClassName:"text-sm font-medium text-gray-700",className:"h-4 w-4 rounded-full border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400",defaultChecked:!0}),e.jsx(y,{name:"infovisibility",label:"Private",type:"radio",labelClassName:"text-sm font-medium text-gray-700",className:"h-4 w-4 rounded-full border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400"})]}),e.jsx("small",{className:"text-xs text-slate-500 mt-3",children:"Making your contact info public means anyone can see your email and phone number"})]})})]}),e.jsx("hr",{className:"mb-3"}),e.jsx("div",{className:"flex",children:e.jsx("div",{className:"w-full",children:e.jsxs("div",{className:"flex items-center my-2",children:[e.jsxs("div",{className:"shrink",children:[e.jsx("label",{className:"inline text-sm font-semibold mb-1 text-gray-800",children:"Remove account "}),e.jsx("small",{className:"text-xs text-slate-500",children:"your account you will lose all your data"})]}),e.jsx("div",{className:"grow text-end",children:e.jsx("button",{type:"button",className:"inline-flex items-center justify-center rounded text-xs font-semibold border border-red-500 text-red-500 transition-all hover:shadow-lg hover:bg-red-500 hover:text-white hover:shadow-red-500/30 focus:shadow-none focus:outline focus:outline-red-500/40 px-3 py-2",children:"Remove Account"})})]})})}),e.jsx("hr",{className:"my-4"}),e.jsx("div",{className:"flex mt-3",children:e.jsx("div",{className:"w-full",children:e.jsx("button",{type:"submit",className:"inline-flex items-center justify-center py-3 px-4 rounded-lg text-sm font-semibold transition-all hover:shadow-lg bg-primary text-white hover:shadow-primary/30 focus:shadow-none focus:outline focus:outline-primary/40 ",children:"Save Changes"})})})]})]}),e.jsxs(k.Panel,{id:"password",className:"min-h-[650px]",children:[e.jsx("h4",{className:"text-base text-gray-800",children:"Password"}),e.jsxs("form",{action:"",className:"mt-6",children:[e.jsx(y,{name:"current_password",type:"password",label:"Current Password",labelClassName:"block text-sm font-semibold mb-1 text-gray-600",className:"py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded rounded-e-none text-sm focus:border-gray-300 focus:ring-0",containerClass:"mb-4"}),e.jsx(y,{name:"new_password",type:"password",label:"New Password",labelClassName:"block text-sm font-semibold mb-1 text-gray-600",className:"py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded rounded-e-none text-sm focus:border-gray-300 focus:ring-0",containerClass:"mb-4"}),e.jsx(y,{name:"confirm_password",type:"password",label:"Confirm Password",labelClassName:"block text-sm font-semibold mb-1 text-gray-600",className:"py-2 px-4 leading-6 block w-full text-gray-700 border-gray-300 rounded rounded-e-none text-sm focus:border-gray-300 focus:ring-0",containerClass:"mb-4"}),e.jsx("hr",{className:"my-6"}),e.jsx("div",{className:"row mt-3",children:e.jsx("div",{className:"col-lg-12",children:e.jsx("button",{type:"submit",className:"inline-flex items-center justify-center py-3 px-4 rounded-lg text-sm font-semibold transition-all hover:shadow-lg bg-primary text-white hover:shadow-primary/30 focus:shadow-none focus:outline focus:outline-primary/40",children:"Update Password"})})})]})]}),e.jsxs(k.Panel,{id:"notifications",className:"min-h-[650px]",children:[e.jsx("h4",{className:"text-base text-gray-800",children:"Password"}),e.jsxs("div",{className:"my-6",children:[e.jsx("h6",{className:"text-sm font-medium text-gray-800 mb-4",children:"Send me an email, when"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex gap-2",children:[e.jsxs("label",{htmlFor:"check1",className:"relative inline-flex cursor-pointer items-center",children:[e.jsx("input",{type:"checkbox",id:"check1",className:"peer sr-only",defaultChecked:!0}),e.jsx("div",{className:"h-5 w-9 rounded-full bg-gray-100 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-gray-200 peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50"})]}),e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Someone mentions me"})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs("label",{htmlFor:"check2",className:"relative inline-flex cursor-pointer items-center",children:[e.jsx("input",{type:"checkbox",id:"check2",className:"peer sr-only"}),e.jsx("div",{className:"h-5 w-9 rounded-full bg-gray-100 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-gray-200 peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50"})]}),e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Someone replies to me"})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs("label",{htmlFor:"check3",className:"relative inline-flex cursor-pointer items-center",children:[e.jsx("input",{type:"checkbox",id:"check3",className:"peer sr-only",defaultChecked:!0}),e.jsx("div",{className:"h-5 w-9 rounded-full bg-gray-100 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-gray-200 peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50"})]}),e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Someone shares the content"})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs("label",{htmlFor:"check4",className:"relative inline-flex cursor-pointer items-center",children:[e.jsx("input",{type:"checkbox",id:"check4",className:"peer sr-only"}),e.jsx("div",{className:"h-5 w-9 rounded-full bg-gray-100 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-gray-200 peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50"})]}),e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"There is a new published content"})]})]})]}),e.jsx("hr",{className:"my-6"}),e.jsxs("div",{className:"my-6",children:[e.jsx("h6",{className:"text-sm font-medium text-gray-800 mb-4",children:"Send me an email, when"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex gap-2",children:[e.jsxs("label",{htmlFor:"check5",className:"relative inline-flex cursor-pointer items-center",children:[e.jsx("input",{type:"checkbox",id:"check5",className:"peer sr-only",defaultChecked:!0}),e.jsx("div",{className:"h-5 w-9 rounded-full bg-gray-100 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-gray-200 peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50"})]}),e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Weekly newsletter"})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs("label",{htmlFor:"check6",className:"relative inline-flex cursor-pointer items-center",children:[e.jsx("input",{type:"checkbox",id:"check6",className:"peer sr-only"}),e.jsx("div",{className:"h-5 w-9 rounded-full bg-gray-100 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-gray-200 peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50"})]}),e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Weekly jobs"})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs("label",{htmlFor:"check7",className:"relative inline-flex cursor-pointer items-center",children:[e.jsx("input",{type:"checkbox",id:"check7",className:"peer sr-only",defaultChecked:!0}),e.jsx("div",{className:"h-5 w-9 rounded-full bg-gray-100 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] hover:bg-gray-200 peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 peer-disabled:cursor-not-allowed peer-disabled:bg-gray-100 peer-disabled:after:bg-gray-50"})]}),e.jsx("span",{className:"text-sm font-medium text-gray-700",children:"Events new me"})]})]})]}),e.jsx("hr",{className:"my-6"}),e.jsx("div",{className:"flex mt-4",children:e.jsx("div",{className:"w-full",children:e.jsx("button",{type:"submit",className:"inline-flex items-center justify-center py-3 px-4 rounded-lg text-sm font-semibold transition-all hover:shadow-lg bg-primary text-white hover:shadow-primary/30 focus:shadow-none focus:outline focus:outline-primary/40",children:"Update Preferences"})})})]})]})]})})})})})})]})})}),Ke=()=>e.jsxs(e.Fragment,{children:[e.jsx(le,{}),e.jsx(_e,{}),e.jsx(ne,{}),e.jsx(ie,{})]});export{Ke as default};