import{j as x,R as y}from"./index-df7e93fe.js";import{u as i}from"./yup-0bbf89b9.js";const S=({defaultValues:e,resolver:o,children:t,onSubmit:s,formClass:a})=>{const m=i({defaultValues:e,resolver:o}),{handleSubmit:p,register:n,control:u,formState:{errors:f}}=m;return x.jsx("form",{onSubmit:p(s),className:a??"",noValidate:!0,children:Array.isArray(t)?t.map(r=>r.props&&r.props.name?y.createElement(r.type,{...r.props,register:n,key:r.props.name,errors:f,control:u}):r):t})};export{S as V};