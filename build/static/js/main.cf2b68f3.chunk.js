(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{33:function(e,t,n){e.exports=n(60)},60:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),c=n(28),r=n.n(c),u=n(3),o=n(29),s=n.n(o).a.create({baseURL:"http://localhost:9001"}),i=n(13),m=n(2),f=n(69);function E(){var e=Object(m.f)();return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",null,"SessionStatus"),l.a.createElement(f.a,{onClick:function(){e("/")}},"Click Me"))}function p(){var e=Object(m.f)();return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",null,"SessionManagement"),l.a.createElement(f.a,{onClick:function(){e("session=status")}},"Click Me"))}function d(){return l.a.createElement(i.a,null,l.a.createElement(m.c,null,l.a.createElement(m.a,{path:"/",element:l.a.createElement(p,null)}),l.a.createElement(m.a,{path:"/session=status",element:l.a.createElement(E,null)})))}var b=function(){var e=Object(a.useState)(null),t=Object(u.a)(e,2),n=(t[0],t[1]);return Object(a.useEffect)(function(){s.get("/test").then(function(e){var t=e.data;return n(t)}).catch(function(e){return console.error(e)})}),l.a.createElement(d,null)};window.onload=function(){r.a.render(l.a.createElement(b,null),document.getElementById("app"))}}},[[33,1,2]]]);
//# sourceMappingURL=main.cf2b68f3.chunk.js.map