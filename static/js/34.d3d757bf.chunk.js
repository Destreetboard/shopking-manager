(this["webpackJsonpshopking-manager"]=this["webpackJsonpshopking-manager"]||[]).push([[34],{995:function(e,t,a){"use strict";a.r(t);var n=a(30),c=a(460),s=a(1),i=a(461),l=a(87),r=a(609),o=a(563),d=a(608),j=a(554),b=a(588),u=a(604),p=a(622),m=a(578),h=a(581),g=a(602),x=a(576),O=a(620),v=a(572),f=a(9),N={Sent:{color:"light-secondary",icon:r.a},Paid:{color:"light-success",icon:o.a},Draft:{color:"light-primary",icon:d.a},Downloaded:{color:"light-info",icon:j.a},"Past Due":{color:"light-danger",icon:b.a},"Partial Payment":{color:"light-warning",icon:u.a}},w=function(e){var t=["light-success","light-danger","light-warning","light-info","light-primary","light-secondary"][Math.floor(6*Math.random())];return e.avatar.length?Object(f.jsx)(i.a,{className:"me-50",img:e.avatar,width:"32",height:"32"}):Object(f.jsx)(i.a,{color:t,className:"me-50",content:e.client?e.client.name:"John Doe",initials:!0})},C=[{name:"#",sortable:!0,sortField:"id",minWidth:"107px",cell:function(e){return Object(f.jsx)(c.b,{to:"/apps/invoice/preview/".concat(e.id),children:"#".concat(e.id)})}},{sortable:!0,minWidth:"102px",sortField:"invoiceStatus",name:Object(f.jsx)(p.a,{size:14}),cell:function(e){var t=N[e.invoiceStatus]?N[e.invoiceStatus].color:"primary",a=N[e.invoiceStatus]?N[e.invoiceStatus].icon:m.a;return Object(f.jsxs)(s.Fragment,{children:[Object(f.jsx)(i.a,{color:t,icon:Object(f.jsx)(a,{size:14}),id:"av-tooltip-".concat(e.id)}),Object(f.jsxs)(l.M,{placement:"top",target:"av-tooltip-".concat(e.id),children:[Object(f.jsx)("span",{className:"fw-bold",children:e.invoiceStatus}),Object(f.jsx)("br",{}),Object(f.jsx)("span",{className:"fw-bold",children:"Balance:"})," ",e.balance,Object(f.jsx)("br",{}),Object(f.jsx)("span",{className:"fw-bold",children:"Due Date:"})," ",e.dueDate]})]})}},{name:"Client",sortable:!0,minWidth:"350px",sortField:"client.name",cell:function(e){var t=e.client?e.client.name:"John Doe",a=e.client?e.client.companyEmail:"johnDoe@email.com";return Object(f.jsxs)("div",{className:"d-flex justify-content-left align-items-center",children:[w(e),Object(f.jsxs)("div",{className:"d-flex flex-column",children:[Object(f.jsx)("h6",{className:"user-name text-truncate mb-0",children:t}),Object(f.jsx)("small",{className:"text-truncate text-muted mb-0",children:a})]})]})}},{name:"Total",sortable:!0,minWidth:"150px",sortField:"total",cell:function(e){return Object(f.jsxs)("span",{children:["$",e.total||0]})}},{sortable:!0,minWidth:"200px",name:"Issued Date",sortField:"dueDate",cell:function(e){return e.dueDate}},{sortable:!0,name:"Balance",minWidth:"164px",sortField:"balance",cell:function(e){return 0!==e.balance?Object(f.jsx)("span",{children:e.balance}):Object(f.jsx)(l.b,{color:"light-success",pill:!0,children:"Paid"})}},{name:"Action",minWidth:"110px",cell:function(e){return Object(f.jsxs)("div",{className:"column-action d-flex align-items-center",children:[Object(f.jsx)(r.a,{className:"cursor-pointer",size:17,id:"send-tooltip-".concat(e.id)}),Object(f.jsx)(l.M,{placement:"top",target:"send-tooltip-".concat(e.id),children:"Send Mail"}),Object(f.jsx)(c.b,{to:"/apps/invoice/preview/".concat(e.id),id:"pw-tooltip-".concat(e.id),children:Object(f.jsx)(h.a,{size:17,className:"mx-1"})}),Object(f.jsx)(l.M,{placement:"top",target:"pw-tooltip-".concat(e.id),children:"Preview Invoice"}),Object(f.jsxs)(l.L,{children:[Object(f.jsx)(l.p,{tag:"span",children:Object(f.jsx)(g.a,{size:17,className:"cursor-pointer"})}),Object(f.jsxs)(l.o,{end:!0,children:[Object(f.jsxs)(l.n,{tag:"a",href:"/",className:"w-100",onClick:function(e){return e.preventDefault()},children:[Object(f.jsx)(x.a,{size:14,className:"me-50"}),Object(f.jsx)("span",{className:"align-middle",children:"Download"})]}),Object(f.jsxs)(l.n,{tag:c.b,to:"/apps/invoice/edit/".concat(e.id),className:"w-100",children:[Object(f.jsx)(m.a,{size:14,className:"me-50"}),Object(f.jsx)("span",{className:"align-middle",children:"Edit"})]}),Object(f.jsxs)(l.n,{tag:"a",href:"/",className:"w-100",onClick:function(e){e.preventDefault()},children:[Object(f.jsx)(O.a,{size:14,className:"me-50"}),Object(f.jsx)("span",{className:"align-middle",children:"Delete"})]}),Object(f.jsxs)(l.n,{tag:"a",href:"/",className:"w-100",onClick:function(e){return e.preventDefault()},children:[Object(f.jsx)(v.a,{size:14,className:"me-50"}),Object(f.jsx)("span",{className:"align-middle",children:"Duplicate"})]})]})]})]})}}],P=a(466),S=a.n(P),D=a(565),k=a(467),y=a.n(k),F=a(503),z=a(121),L=(a(491),a(473),function(e){var t=e.handleFilter,a=e.value,n=e.handleStatusValue,s=e.statusValue,i=e.handlePerPage,r=e.rowsPerPage;return Object(f.jsx)("div",{className:"invoice-list-table-header w-100 py-2",children:Object(f.jsxs)(l.F,{children:[Object(f.jsxs)(l.k,{lg:"6",className:"d-flex align-items-center px-0 px-lg-1",children:[Object(f.jsxs)("div",{className:"d-flex align-items-center me-2",children:[Object(f.jsx)("label",{htmlFor:"rows-per-page",children:"Show"}),Object(f.jsxs)(l.t,{type:"select",id:"rows-per-page",value:r,onChange:i,className:"form-control ms-50 pe-3",children:[Object(f.jsx)("option",{value:"10",children:"10"}),Object(f.jsx)("option",{value:"25",children:"25"}),Object(f.jsx)("option",{value:"50",children:"50"})]})]}),Object(f.jsx)(l.e,{tag:c.b,to:"/apps/invoice/add",color:"primary",children:"Add Record"})]}),Object(f.jsxs)(l.k,{lg:"6",className:"actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0",children:[Object(f.jsxs)("div",{className:"d-flex align-items-center",children:[Object(f.jsx)("label",{htmlFor:"search-invoice",children:"Search"}),Object(f.jsx)(l.t,{id:"search-invoice",className:"ms-50 me-2 w-100",type:"text",value:a,onChange:function(e){return t(e.target.value)},placeholder:"Search Invoice"})]}),Object(f.jsxs)(l.t,{className:"w-auto ",type:"select",value:s,onChange:n,children:[Object(f.jsx)("option",{value:"",children:"Select Status"}),Object(f.jsx)("option",{value:"downloaded",children:"Downloaded"}),Object(f.jsx)("option",{value:"draft",children:"Draft"}),Object(f.jsx)("option",{value:"paid",children:"Paid"}),Object(f.jsx)("option",{value:"partial payment",children:"Partial Payment"}),Object(f.jsx)("option",{value:"past due",children:"Past Due"}),Object(f.jsx)("option",{value:"sent",children:"Sent"})]})]})]})})});t.default=function(){var e=Object(z.b)(),t=Object(z.c)((function(e){return e.invoice})),a=Object(s.useState)(""),c=Object(n.a)(a,2),i=c[0],r=c[1],o=Object(s.useState)("desc"),d=Object(n.a)(o,2),j=d[0],b=d[1],u=Object(s.useState)("id"),p=Object(n.a)(u,2),m=p[0],h=p[1],g=Object(s.useState)(1),x=Object(n.a)(g,2),O=x[0],v=x[1],N=Object(s.useState)(""),w=Object(n.a)(N,2),P=w[0],k=w[1],q=Object(s.useState)(10),I=Object(n.a)(q,2),W=I[0],M=I[1];Object(s.useEffect)((function(){e(Object(F.b)({sort:j,q:i,sortColumn:m,page:O,perPage:W,status:P}))}),[e,t.data.length]);return Object(f.jsx)("div",{className:"invoice-list-wrapper",children:Object(f.jsx)(l.f,{children:Object(f.jsx)("div",{className:"invoice-list-dataTable react-dataTable",children:Object(f.jsx)(y.a,{noHeader:!0,pagination:!0,sortServer:!0,paginationServer:!0,subHeader:!0,columns:C,responsive:!0,onSort:function(t,a){b(a),h(t.sortField),e(Object(F.b)({q:i,page:O,sort:a,status:P,perPage:W,sortColumn:t.sortField}))},data:function(){var e={q:i,status:P},a=Object.keys(e).some((function(t){return e[t].length>0}));return t.data.length>0?t.data:0===t.data.length&&a?[]:t.allData.slice(0,W)}(),sortIcon:Object(f.jsx)(D.a,{}),className:"react-dataTable",defaultSortField:"invoiceId",paginationDefaultPage:O,paginationComponent:function(){var a=Number((t.total/W).toFixed(0));return Object(f.jsx)(S.a,{nextLabel:"",breakLabel:"...",previousLabel:"",pageCount:a||1,activeClassName:"active",breakClassName:"page-item",pageClassName:"page-item",breakLinkClassName:"page-link",nextLinkClassName:"page-link",pageLinkClassName:"page-link",nextClassName:"page-item next",previousLinkClassName:"page-link",previousClassName:"page-item prev",onPageChange:function(t){return function(t){e(Object(F.b)({sort:j,q:i,sortColumn:m,status:P,perPage:W,page:t.selected+1})),v(t.selected+1)}(t)},forcePage:0!==O?O-1:0,containerClassName:"pagination react-paginate justify-content-end p-1"})},subHeaderComponent:Object(f.jsx)(L,{value:i,statusValue:P,rowsPerPage:W,handleFilter:function(t){r(t),e(Object(F.b)({sort:j,q:t,sortColumn:m,page:O,perPage:W,status:P}))},handlePerPage:function(t){e(Object(F.b)({sort:j,q:i,sortColumn:m,page:O,status:P,perPage:parseInt(t.target.value)})),M(parseInt(t.target.value))},handleStatusValue:function(t){k(t.target.value),e(Object(F.b)({sort:j,q:i,sortColumn:m,page:O,perPage:W,status:t.target.value}))}})})})})})}}}]);
//# sourceMappingURL=34.d3d757bf.chunk.js.map