const t=document.querySelector("body"),e=document.querySelector("button[data-start]"),r=document.querySelector("button[data-stop]");let l;e.style.width="100px",r.style.width="100px",e.style.height="50px",r.style.height="50px",e.style.marginTop="500px",e.style.marginLeft="calc(50% - 125px)",e.style.marginRight="50px";const a=()=>{l=`#${Math.floor(16777215*Math.random()).toString(16)}`,t.style.backgroundColor=l};let o;e.addEventListener("click",(t=>{t.currentTarget.setAttribute("disabled",""),a(),o=setInterval(a,1e3)}));r.addEventListener("click",(()=>{e.removeAttribute("disabled"),clearInterval(o)}));
//# sourceMappingURL=01-color-switcher.6f41f53c.js.map
