import{j as e,L as s}from"./index-df7e93fe.js";import{S as o,a as n}from"./swiper-react-81e44bd0.js";import"./index-c19a5acf.js";import{F as l}from"./FormInput-e05bc9e5.js";import{V as d}from"./VerticalForm-e05ec428.js";import{o as c,c as x,a as i}from"./yup-0bbf89b9.js";import{N as m}from"./navigation-b435515a.js";import{A as h}from"./autoplay-0d1847f1.js";import{w as u}from"./white-wave-ae4a4ecd.js";import{s as j,p,t as g}from"./data-f8528d42.js";import"./create-element-if-not-defined-7aead6df.js";import"./google-721ba9c0.js";import"./img-2-9275dc86.js";const v=()=>{const r=c(x().shape({name:i().required("Please enter name"),subject:i().required("Please enter subject"),email:i().required("Please enter email").email("Please enter valid email"),message:i().required("Please enter message")}));return e.jsx("section",{className:"pt-20",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"grid lg:grid-cols-2 grid-cols-1 gap-6",children:[e.jsxs("div",{"data-aos":"fade-up","data-aos-duration":600,children:[e.jsx("h2",{className:"md:text-3xl text-xl font-semibold my-5",children:"Just say hi."}),e.jsx("p",{className:"text-slate-700",children:"I am open to discuss your next project, improve user experience of an existing one or help with your UX/UI design challenges."}),e.jsx("p",{className:"text-slate-500 mt-12",children:"Email me at"}),e.jsx("h4",{children:e.jsx(s,{to:"",className:"text-lg font-semibold text-slate-600",children:"hello@coderthemes.com"})}),e.jsx("div",{className:"mt-12",children:e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("h5",{className:"text-slate-400",children:"Social"}),e.jsxs("div",{className:"flex gap-5",children:[e.jsx("div",{children:e.jsx(s,{to:"",children:e.jsxs("svg",{className:"w-7 h-7 text-slate-500",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",children:[" ",e.jsx("circle",{cx:12,cy:12,r:10})," ",e.jsx("path",{d:"M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"})," "]})})}),e.jsx("div",{children:e.jsx(s,{to:"",children:e.jsxs("svg",{className:"w-7 h-7 text-slate-500",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",children:[" ",e.jsx("path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"})," "]})})}),e.jsx("div",{children:e.jsx(s,{to:"",children:e.jsxs("svg",{className:"w-7 h-7 text-slate-500",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",children:[" ",e.jsx("path",{d:"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"})," "]})})}),e.jsx("div",{children:e.jsx(s,{to:"",children:e.jsxs("svg",{className:"w-7 h-7 text-slate-500",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",children:[" ",e.jsx("path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"})," ",e.jsx("rect",{x:2,y:9,width:4,height:12})," ",e.jsx("circle",{cx:4,cy:4,r:2})," "]})})}),e.jsx("div",{children:e.jsx(s,{to:"",children:e.jsxs("svg",{className:"w-7 h-7 text-slate-500",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",children:[" ",e.jsx("rect",{x:2,y:2,width:20,height:20,rx:5,ry:5})," ",e.jsx("path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"})," ",e.jsx("line",{x1:"17.5",y1:"6.5",x2:"17.51",y2:"6.5"})," "]})})})]})]})})]}),e.jsx("div",{"data-aos":"fade-up","data-aos-duration":900,children:e.jsxs(d,{onSubmit:()=>{},resolver:r,children:[e.jsx(l,{type:"text",name:"name",className:"w-full text-gray-700 border border-slate-200 rounded py-3 px-4 leading-tight focus:outline-none",containerClass:"mb-4",placeholder:"Your name"}),e.jsx(l,{type:"email",name:"email",className:"w-full text-gray-700 border border-slate-200 rounded py-3 px-4 leading-tight focus:outline-none",placeholder:"Your email where we can reach",containerClass:"mb-4"}),e.jsx(l,{type:"text",name:"subject",className:"w-full text-gray-700 border border-slate-200 rounded py-3 px-4 leading-tight focus:outline-none",placeholder:"Subject",containerClass:"mb-4"}),e.jsx(l,{type:"textarea",name:"message",className:"w-full text-gray-700 border border-slate-200 rounded py-3 px-4 leading-tight focus:outline-none",placeholder:"Write your message here. Keep it simple, concise and intriguing!",rows:5,containerClass:"mb-4"}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{type:"submit",className:"py-3 px-6 rounded border border-red-500 font-semibold text-white bg-red-500 hover:shadow-lg hover:shadow-red-500/50 focus:outline focus:outline-red-500/50 transition-all duration-500",children:"Submit"})})]})})]}),e.jsx("hr",{className:"mt-10"})]})})},f=()=>e.jsx("section",{className:"py-8",children:e.jsxs("div",{className:"container",children:[e.jsxs("ul",{className:"flex flex-wrap items-center justify-center gap-5",children:[e.jsx("li",{className:"after:content-['-'] after:text-slate-300 after:font-extrabold",children:e.jsx(s,{to:"",className:"text-slate-600 hover:text-blue-600 me-4",children:"About"})}),e.jsx("li",{className:"after:content-['-'] after:text-slate-300 after:font-extrabold",children:e.jsx(s,{to:"",className:"text-slate-600 hover:text-blue-600 me-4",children:"Services"})}),e.jsx("li",{children:e.jsx(s,{to:"",className:"text-slate-600 hover:text-blue-600 me-4",children:"Contact"})})]}),e.jsxs("p",{className:"mt-5 text-center text-slate-600",children:[new Date().getFullYear()," © Prompt. All rights reserved. Crafted by",e.jsx(s,{to:"",className:"hover:text-blue-600",children:"Coderthemes"})]})]})}),N=""+new URL("portfolio1-c10c47ac.png",import.meta.url).href,b=()=>e.jsx("section",{className:"pt-44 relative bg-gradient-to-b from-red-500/5 to-amber-500/5",children:e.jsxs("div",{children:[e.jsxs("div",{className:"hero-with-shapes -z-10",children:[e.jsx("div",{className:"shape1"}),e.jsx("div",{className:"shape2"}),e.jsx("div",{className:"shape3"})]}),e.jsx("div",{className:"container",children:e.jsxs("div",{className:"grid lg:grid-cols-2 grid-cols-1 gap-6",children:[e.jsxs("div",{className:"pb-3","data-aos":"fade-right","data-aos-duration":1e3,children:[e.jsx("h4",{className:"text-lg",children:"Hola! I am Greeva N."}),e.jsx("h1",{className:"md:text-5xl text-3xl font-medium my-3",children:"I'm a freelance UX/UI Designer."}),e.jsx("p",{className:"text-base mt-6 mb-20 text-slate-700",children:"A top-notch web designer helping business to craft their meaningful and interactive product experiences"}),e.jsxs("div",{className:"flex flex-wrap items-center gap-5",children:[e.jsx(s,{to:"",className:"py-3 px-6 rounded border border-red-500 font-semibold text-white bg-red-500 hover:shadow-lg hover:shadow-red-500/50 focus:outline focus:outline-red-500/50 transition-all duration-500",children:"Hire Me"}),e.jsx(s,{to:"",className:"py-3 px-6 rounded border border-red-500 hover:border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/50 focus:outline focus:outline-red-500/50 transition-all duration-500",children:"Download CV"})]})]}),e.jsx("div",{"data-aos":"fade-up","data-aos-duration":500,children:e.jsx("img",{src:N,className:"lg:ms-auto lg:me-0 mx-auto z-10 relative"})})]})})]})}),w=({projects:r})=>e.jsx("section",{className:"py-20",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{className:"grid lg:grid-cols-2 gap-5",children:[e.jsx("div",{children:e.jsx("h1",{className:"text-3xl font-medium my-3",children:"Latest Projects"})}),e.jsxs("div",{className:"flex flex-wrap items-center gap-8",children:[e.jsxs("p",{children:[" ",e.jsx(s,{to:"",className:"font-medium text-blue-600",children:"UI/UX Design"})]}),e.jsx("p",{children:e.jsx(s,{to:"",className:"font-medium hover:text-blue-600",children:"Branding"})}),e.jsxs("p",{children:[" ",e.jsx(s,{to:"",className:"font-medium hover:text-blue-600",children:"Marketing"})]}),e.jsx("p",{children:e.jsx(s,{to:"",className:"font-medium hover:text-blue-600",children:"Web Development"})})]})]}),e.jsx("div",{className:"grid lg:grid-cols-2 grid-cols-1 gap-6","data-aos":"fade-up","data-aos-duration":600,children:(r||[]).map((t,a)=>e.jsxs("div",{className:"group relative mt-12 hover:opacity-80",children:[e.jsx("div",{className:"pt-12 ps-12 bg-slate-300/20 group-hover:bg-white/10 rounded-md group-hover:shadow-lg transition-all duration-300",children:e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center justify-between mb-7",children:[e.jsx("h3",{className:"text-xl",children:t.title}),e.jsx("p",{className:"font-medium text-slate-500 pe-8",children:t.description})]}),e.jsx("div",{children:e.jsx("img",{src:t.image,className:"rounded-md"})}),e.jsx("div",{className:"absolute inset-0 group-hover:flex items-center justify-center hidden transition-all duration-300 z-10",children:e.jsx(s,{to:"",className:"inline-block",children:e.jsxs("div",{className:"flex items-center gap-3 py-[6px] px-3 bg-red-500 rounded-md",children:[e.jsx("p",{className:"text-sm font-semibold text-white",children:"View Project"}),e.jsx("i",{className:"fa-solid fa-arrow-right text-white"})]})})})]})}),e.jsx("div",{className:"absolute inset-0 group-hover:bg-slate-300/20 transition-all duration-300"})]},a))})]})}),y=({services:r})=>e.jsx("section",{className:"py-20",children:e.jsxs("div",{className:"container",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"md:text-3xl text-xl font-semibold my-5",children:"What I Do"}),e.jsxs("p",{className:"text-slate-400 font-medium",children:["Connecting brands and companies with their customers through"," ",e.jsx("span",{className:"text-red-500",children:"good design"}),"."]})]}),e.jsx("div",{className:"grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 pt-14",children:(r||[]).map((t,a)=>e.jsx("div",{className:"group","data-aos":"fade-up","data-aos-duration":600,children:e.jsxs("div",{className:"p-6 rounded-md shadow group-hover:shadow-lg transition-all duration-500",children:[e.jsx("div",{className:"w-12 h-12 bg-red-500/10 flex items-center justify-center rounded-tr-xl rounded-bl-xl group-hover:rounded-tr-none group-hover:rounded-bl-none group-hover:rounded-tl-xl group-hover:rounded-br-xl transition-all duration-500",children:t.icon}),e.jsx("h4",{className:"text-lg mt-6",children:t.title}),e.jsx("p",{className:"text-base text-slate-400 leading-7 mt-2",children:t.description})]})},a))})]})}),k=({testimonials:r})=>e.jsxs("section",{className:"py-20 relative overflow-x-hidden bg-gradient-to-b from-red-500/5 to-amber-500/5","data-aos":"fade-up","data-aos-duration":600,children:[e.jsx("div",{className:"absolute top-0 inset-x-0 hidden sm:block",children:e.jsx("img",{src:u,alt:"svg",className:"w-full -scale-x-100"})}),e.jsx("div",{className:"container relative",children:e.jsxs("div",{className:"relative z-20",children:[e.jsxs("div",{className:"flex items-center justify-between pb-14",children:[e.jsx("div",{children:e.jsx("h2",{className:"md:text-3xl text-xl font-semibold my-5",children:"Kind words from excellent clients"})}),e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsx("div",{className:"button-prev swiper-custom-prev cursor-pointer",children:e.jsx("i",{className:"fa-solid fa-arrow-left"})}),e.jsxs("div",{className:"button-next swiper-custom-next cursor-pointer",children:[" ",e.jsx("i",{className:"fa-solid fa-arrow-right"})]})]})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("div",{className:"hidden sm:block",children:[e.jsx("div",{className:"before:w-24 before:h-24 before:absolute before:-top-10 before:-end-10 before:bg-[url('@/assets/images/pattern/dot3.svg')]"}),e.jsx("div",{className:"after:w-24 after:h-24 after:absolute after:-bottom-10 after:-start-10 after:bg-[url('@/assets/images/pattern/dot3.svg')]"})]}),e.jsx("div",{id:"swiper_two",className:"swiper",children:e.jsx(o,{modules:[h,m],autoplay:{delay:2500,disableOnInteraction:!1},slidesPerView:2,spaceBetween:30,loop:!0,navigation:{nextEl:".swiper-custom-next",prevEl:".swiper-custom-prev"},children:(r||[]).map((t,a)=>e.jsx(n,{children:e.jsxs("div",{className:"p-12 bg-white border",children:[e.jsx("p",{className:"text-slate-800",children:t.description}),e.jsxs("div",{className:"flex items-center justify-between mt-5",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{children:e.jsx("img",{src:t.image,className:"w-10 rounded-full"})}),e.jsxs("div",{children:[e.jsx("h6",{children:t.name}),e.jsx("p",{className:"text-sm text-slate-500",children:t.position})]})]}),e.jsx("div",{children:e.jsx("img",{src:t.brand,className:"w-24"})})]})]})},a))})})]})]})})]}),V=()=>e.jsxs(e.Fragment,{children:[e.jsx(b,{}),e.jsx(y,{services:j}),e.jsx(w,{projects:p}),e.jsx(k,{testimonials:g}),e.jsx(v,{}),e.jsx(f,{})]});export{V as default};