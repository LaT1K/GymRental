import{j as e,W as d}from"./app-GfbQq372.js";const u=({onClick:a,children:n,type:l="button",className:o="",color:s="blue"})=>{const r="px-4 py-2 rounded-lg text-white focus:outline-none transition duration-200",t=s==="blue"?"bg-blue-500 hover:bg-blue-700":"bg-red-500 hover:bg-red-700";return e.jsx("button",{type:l,onClick:a,className:`${r} ${t} ${o}`,children:n})},c=()=>{const{data:a,setData:n,post:l,processing:o,errors:s}=d({start_date:"",end_date:"",duration_weeks:""}),r=t=>{t.preventDefault(),l("/game_periods",{onSuccess:()=>{window.location.href="/game_periods"}})};return e.jsxs("div",{className:"max-w-lg mx-auto bg-white rounded-lg shadow-md p-6",children:[e.jsx("h2",{className:"text-2xl font-semibold text-center mb-4",children:"Створити Період Гри"}),e.jsxs("form",{onSubmit:r,children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-gray-700 font-medium mb-2",children:"Початок"}),e.jsx("input",{type:"date",value:a.start_date,onChange:t=>n("start_date",t.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"}),s.start_date&&e.jsx("p",{className:"text-red-500 text-sm mt-1",children:s.start_date})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-gray-700 font-medium mb-2",children:"Кінець"}),e.jsx("input",{type:"date",value:a.end_date,onChange:t=>n("end_date",t.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"}),s.end_date&&e.jsx("p",{className:"text-red-500 text-sm mt-1",children:s.end_date})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block text-gray-700 font-medium mb-2",children:"Тривалість (тижні)"}),e.jsx("input",{type:"number",value:a.duration_weeks,onChange:t=>n("duration_weeks",t.target.value),className:"w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"}),s.duration_weeks&&e.jsx("p",{className:"text-red-500 text-sm mt-1",children:s.duration_weeks})]}),e.jsx(u,{type:"submit",className:"w-full",color:"blue",disabled:o,children:"Створити"})]})]})};export{c as default};