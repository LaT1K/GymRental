import{r as i,j as e}from"./app-GfbQq372.js";import{d}from"./index-C7PetVPu.js";const m=()=>{const[t,r]=i.useState({name:"",phone:"",telegram_username:"",joined_date:""}),n=a=>{r({...t,[a.target.name]:a.target.value})},s=a=>{a.preventDefault(),d.Inertia.post("/participants",t)};return e.jsxs("div",{children:[e.jsx("h1",{children:"Add Participant"}),e.jsxs("form",{onSubmit:s,children:[e.jsxs("div",{children:[e.jsx("label",{children:"Name:"}),e.jsx("input",{type:"text",name:"name",value:t.name,onChange:n,required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{children:"Phone:"}),e.jsx("input",{type:"text",name:"phone",value:t.phone,onChange:n,required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{children:"Telegram Username:"}),e.jsx("input",{type:"text",name:"telegram_username",value:t.telegram_username,onChange:n})]}),e.jsxs("div",{children:[e.jsx("label",{children:"Joined Date:"}),e.jsx("input",{type:"date",name:"joined_date",value:t.joined_date,onChange:n,required:!0})]}),e.jsx("button",{type:"submit",children:"Add Participant"})]})]})};export{m as default};