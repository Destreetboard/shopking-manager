(this["webpackJsonpshopking-manager"]=this["webpackJsonpshopking-manager"]||[]).push([[17],{463:function(e,a,t){"use strict";var s=t(460),n=t(586),r=t(544),c=t(545),l=t(543),i=t(562),o=t(87),j=t(9);a.a=function(e){var a=e.breadCrumbTitle,t=e.breadCrumbParent,d=e.breadCrumbParent2,m=e.breadCrumbParent3,b=e.breadCrumbActive;return Object(j.jsxs)("div",{className:"content-header row",children:[Object(j.jsx)("div",{className:"content-header-left col-md-9 col-12 mb-2",children:Object(j.jsx)("div",{className:"row breadcrumbs-top",children:Object(j.jsxs)("div",{className:"col-12",children:[a?Object(j.jsx)("h2",{className:"content-header-title float-start mb-0",children:a}):"",Object(j.jsx)("div",{className:"breadcrumb-wrapper vs-breadcrumbs d-sm-block d-none col-12",children:Object(j.jsxs)(o.c,{children:[Object(j.jsx)(o.d,{tag:"li",children:Object(j.jsx)(s.b,{to:"/",children:"Home"})}),Object(j.jsx)(o.d,{tag:"li",className:"text-primary",children:t}),d?Object(j.jsx)(o.d,{tag:"li",className:"text-primary",children:d}):"",m?Object(j.jsx)(o.d,{tag:"li",className:"text-primary",children:m}):"",Object(j.jsx)(o.d,{tag:"li",active:!0,children:b})]})})]})})}),Object(j.jsx)("div",{className:"content-header-right text-md-end col-md-3 col-12 d-md-block d-none",children:Object(j.jsx)("div",{className:"breadcrumb-right dropdown",children:Object(j.jsxs)(o.K,{children:[Object(j.jsx)(o.p,{color:"primary",size:"sm",className:"btn-icon btn-round dropdown-toggle",children:Object(j.jsx)(n.a,{size:14})}),Object(j.jsxs)(o.o,{tag:"ul",end:!0,children:[Object(j.jsxs)(o.n,{tag:s.b,to:"/apps/todo",children:[Object(j.jsx)(r.a,{className:"me-1",size:14}),Object(j.jsx)("span",{className:"align-middle",children:"Todo"})]}),Object(j.jsxs)(o.n,{tag:s.b,to:"/apps/chat",children:[Object(j.jsx)(c.a,{className:"me-1",size:14}),Object(j.jsx)("span",{className:"align-middle",children:"Chat"})]}),Object(j.jsxs)(o.n,{tag:s.b,to:"/apps/email",children:[Object(j.jsx)(l.a,{className:"me-1",size:14}),Object(j.jsx)("span",{className:"align-middle",children:"Email"})]}),Object(j.jsxs)(o.n,{tag:s.b,to:"/apps/calendar",children:[Object(j.jsx)(i.a,{className:"me-1",size:14}),Object(j.jsx)("span",{className:"align-middle",children:"Calendar"})]})]})]})})})]})}},468:function(e,a,t){"use strict";t.r(a),a.default=t.p+"static/media/avatar-s-20.40d668f5.jpg"},479:function(e,a,t){var s={"./avatar-s-1.jpg":38,"./avatar-s-10.jpg":89,"./avatar-s-11.jpg":63,"./avatar-s-12.jpg":227,"./avatar-s-13.jpg":127,"./avatar-s-14.jpg":228,"./avatar-s-15.jpg":224,"./avatar-s-16.jpg":480,"./avatar-s-17.jpg":481,"./avatar-s-18.jpg":225,"./avatar-s-19.jpg":482,"./avatar-s-2.jpg":48,"./avatar-s-20.jpg":468,"./avatar-s-21.jpg":483,"./avatar-s-22.jpg":226,"./avatar-s-23.jpg":484,"./avatar-s-24.jpg":485,"./avatar-s-25.jpg":230,"./avatar-s-26.jpg":229,"./avatar-s-3.jpg":31,"./avatar-s-4.jpg":64,"./avatar-s-5.jpg":49,"./avatar-s-6.jpg":88,"./avatar-s-7.jpg":62,"./avatar-s-8.jpg":47,"./avatar-s-9.jpg":25};function n(e){var a=r(e);return t(a)}function r(e){if(!t.o(s,e)){var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}return s[e]}n.keys=function(){return Object.keys(s)},n.resolve=r,e.exports=n,n.id=479},480:function(e,a,t){"use strict";t.r(a),a.default=t.p+"static/media/avatar-s-16.1850b51c.jpg"},481:function(e,a,t){"use strict";t.r(a),a.default=t.p+"static/media/avatar-s-17.ac876056.jpg"},482:function(e,a,t){"use strict";t.r(a),a.default=t.p+"static/media/avatar-s-19.f39063a2.jpg"},483:function(e,a,t){"use strict";t.r(a),a.default=t.p+"static/media/avatar-s-21.d383013d.jpg"},484:function(e,a,t){"use strict";t.r(a),a.default=t.p+"static/media/avatar-s-23.c1d416e5.jpg"},485:function(e,a,t){"use strict";t.r(a),a.default=t.p+"static/media/avatar-s-24.a649af23.jpg"},486:function(e,a,t){},989:function(e,a,t){"use strict";t.r(a);var s,n=t(30),r=t(1),c=t(463),l=t(87),i=t(464),o=t(122),j=(t(461),t(5)),d=t.n(j),m=(t(602),t(583),t(553),t(620),t(578),t(9));d.a.get("/api/datatables/initial-data").then((function(e){s=e.data}));var b=[{name:"Name",sortable:!0,minWidth:"200px",selector:function(e){return e.full_name}},{name:"Email",sortable:!0,minWidth:"250px",selector:function(e){return e.email}},{name:"Post",sortable:!0,minWidth:"250px",selector:function(e){return e.post}},{name:"City",sortable:!0,minWidth:"150px",selector:function(e){return e.city}},{name:"Date",sortable:!0,minWidth:"150px",selector:function(e){return e.start_date}},{name:"Salary",sortable:!0,minWidth:"100px",selector:function(e){return e.salary}}],g=t(512),u=t.n(g),h=t(466),p=t.n(h),O=t(565),v=t(467),x=t.n(v),f=(t(486),function(){var e=Object(r.useState)(""),a=Object(n.a)(e,2),t=a[0],c=a[1],i=Object(r.useState)(""),j=Object(n.a)(i,2),d=j[0],g=j[1],h=Object(r.useState)(""),v=Object(n.a)(h,2),f=v[0],N=v[1],C=Object(r.useState)(""),w=Object(n.a)(C,2),L=w[0],y=w[1],k=Object(r.useState)(0),S=Object(n.a)(k,2),D=S[0],P=S[1],W=Object(r.useState)(""),T=Object(n.a)(W,2),F=T[0],_=T[1],z=Object(r.useState)(""),E=Object(n.a)(z,2),M=E[0],B=E[1],A=Object(r.useState)([]),H=Object(n.a)(A,2),J=H[0],U=H[1],Y=function(){return d.length||f.length||F.length||L.length||M.length||t.length?J:s};return Object(m.jsx)(r.Fragment,{children:Object(m.jsxs)(l.f,{children:[Object(m.jsx)(l.h,{className:"border-bottom",children:Object(m.jsx)(l.j,{tag:"h4",children:"Sub Locations"})}),Object(m.jsx)(l.g,{children:Object(m.jsxs)(l.F,{className:"mt-1 mb-50",children:[Object(m.jsxs)(l.k,{lg:"4",md:"6",className:"mb-1",children:[Object(m.jsx)(l.w,{className:"form-label",for:"name",children:"Name:"}),Object(m.jsx)(l.t,{id:"name",placeholder:"Bruce Wayne",value:d,onChange:function(e){var a=e.target.value,n=[];g(a),a.length&&(n=(F.length||f.length||L.length||M.length||t.length?J:s).filter((function(e){var t=e.full_name.toLowerCase().startsWith(a.toLowerCase()),s=e.full_name.toLowerCase().includes(a.toLowerCase());return t||(!t&&s?s:null)})),U(Object(o.a)(n)),g(a))}})]}),Object(m.jsxs)(l.k,{lg:"4",md:"6",className:"mb-1",children:[Object(m.jsx)(l.w,{className:"form-label",for:"email",children:"Email:"}),Object(m.jsx)(l.t,{type:"email",id:"email",placeholder:"Bwayne@email.com",value:F,onChange:function(e){var a=e.target.value,n=[];_(a),a.length&&(n=(d.length||f.length||L.length||M.length||t.length?J:s).filter((function(e){var t=e.email.toLowerCase().startsWith(a.toLowerCase()),s=e.email.toLowerCase().includes(a.toLowerCase());return t||(!t&&s?s:null)})),U(Object(o.a)(n)),_(a))}})]}),Object(m.jsxs)(l.k,{lg:"4",md:"6",className:"mb-1",children:[Object(m.jsx)(l.w,{className:"form-label",for:"post",children:"Post:"}),Object(m.jsx)(l.t,{id:"post",placeholder:"Web Designer",value:f,onChange:function(e){var a=e.target.value,n=[];N(a),a.length&&(n=(F.length||d.length||L.length||M.length||t.length?J:s).filter((function(e){var t=e.post.toLowerCase().startsWith(a.toLowerCase()),s=e.post.toLowerCase().includes(a.toLowerCase());return t||(!t&&s?s:null)})),U(Object(o.a)(n)),N(a))}})]}),Object(m.jsxs)(l.k,{lg:"4",md:"6",className:"mb-1",children:[Object(m.jsx)(l.w,{className:"form-label",for:"city",children:"City:"}),Object(m.jsx)(l.t,{id:"city",placeholder:"San Diego",value:L,onChange:function(e){var a=e.target.value,n=[];y(a),a.length&&(n=(F.length||d.length||f.length||M.length||t.length?J:s).filter((function(e){var t=e.city.toLowerCase().startsWith(a.toLowerCase()),s=e.city.toLowerCase().includes(a.toLowerCase());return t||(!t&&s?s:null)})),U(Object(o.a)(n)),y(a))}})]}),Object(m.jsxs)(l.k,{lg:"4",md:"6",className:"mb-1",children:[Object(m.jsx)(l.w,{className:"form-label",for:"date",children:"Date:"}),Object(m.jsx)(u.a,{className:"form-control",id:"date",value:t,options:{mode:"range",dateFormat:"m/d/Y"},onChange:function(e){return function(e){var a=[],t=[];e.map((function(e){var t=new Date(e),s=t.getFullYear(),n=(1+t.getMonth()).toString();n=n.length>1?n:"0".concat(n);var r=t.getDate().toString();return r=r.length>1?r:"0".concat(r),a.push("".concat(n,"/").concat(r,"/").concat(s)),!0})),c(e),e.length&&(t=(F.length||d.length||f.length||L.length||M.length?J:s).filter((function(e){return new Date(e.start_date).getTime()>=new Date(a[0]).getTime()&&new Date(e.start_date).getTime()<=new Date(a[1]).getTime()})),U(Object(o.a)(t)),c(e))}(e)}})]}),Object(m.jsxs)(l.k,{lg:"4",md:"6",className:"mb-1",children:[Object(m.jsx)(l.w,{className:"form-label",for:"salary",children:"Salary:"}),Object(m.jsx)(l.t,{id:"salary",placeholder:"10000",value:M,onChange:function(e){var a=e.target.value,n=[];B(a),a.length&&(n=(F.length||d.length||f.length||L.length||t.length?J:s).filter((function(e){var t=e.salary.toLowerCase().startsWith(a.toLowerCase()),s=e.salary.toLowerCase().includes(a.toLowerCase());return t||(!t&&s?s:null)})),U(Object(o.a)(n)),B(a))}})]})]})}),Object(m.jsx)("div",{className:"react-dataTable",children:Object(m.jsx)(x.a,{noHeader:!0,pagination:!0,columns:b,paginationPerPage:7,className:"react-dataTable",sortIcon:Object(m.jsx)(O.a,{size:10}),paginationDefaultPage:D+1,paginationComponent:function(){return Object(m.jsx)(p.a,{previousLabel:"",nextLabel:"",forcePage:D,onPageChange:function(e){return function(e){return P(e.selected)}(e)},pageCount:Math.ceil(Y().length/7)||1,breakLabel:"...",pageRangeDisplayed:2,marginPagesDisplayed:2,activeClassName:"active",pageClassName:"page-item",breakClassName:"page-item",nextLinkClassName:"page-link",pageLinkClassName:"page-link",breakLinkClassName:"page-link",previousLinkClassName:"page-link",nextClassName:"page-item next-item",previousClassName:"page-item prev-item",containerClassName:"pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"})},data:Y()})})]})})}),N=[{value:"",label:"Select Location"},{value:"basic",label:"Basic"},{value:"company",label:"Company"},{value:"enterprise",label:"Enterprise"},{value:"team",label:"Team"}];a.default=function(){var e=Object(r.useState)({value:"",label:"Select Location"}),a=Object(n.a)(e,2),t=a[0],s=a[1];return Object(m.jsxs)(r.Fragment,{children:[Object(m.jsx)(c.a,{breadCrumbTitle:"Sub Locations",breadCrumbParent:"Location Mgnt",breadCrumbActive:"Sub Locations"}),Object(m.jsxs)(l.f,{children:[Object(m.jsx)(l.h,{children:Object(m.jsx)(l.j,{tag:"h4",children:"Create Sub Location"})}),Object(m.jsx)(l.g,{children:Object(m.jsx)(l.q,{children:Object(m.jsxs)(l.F,{children:[Object(m.jsxs)(l.k,{md:"6",sm:"12",className:"mb-1",children:[Object(m.jsx)(l.w,{className:"form-label",for:"nameMulti",children:"Select Location"}),Object(m.jsx)(i.a,{options:N,className:"react-select",classNamePrefix:"select",onChange:function(e){s(e)},value:t})]}),Object(m.jsxs)(l.k,{md:"6",sm:"12",className:"mb-1",children:[Object(m.jsx)(l.w,{className:"form-label",for:"nameMulti",children:"Sub Location Name"}),Object(m.jsx)(l.t,{type:"text",name:"name",id:"sub-location-name",placeholder:"E.g: Divine Favour Lodge."})]}),Object(m.jsx)(l.k,{sm:"12",children:Object(m.jsxs)("div",{className:"d-flex",children:[Object(m.jsx)(l.e,{className:"me-1",color:"primary",type:"submit",onClick:function(e){return e.preventDefault()},children:"Create"}),Object(m.jsx)(l.e,{outline:!0,color:"secondary",type:"reset",children:"Clear"})]})})]})})})]}),Object(m.jsx)(f,{})]})}}}]);
//# sourceMappingURL=17.06c59475.chunk.js.map