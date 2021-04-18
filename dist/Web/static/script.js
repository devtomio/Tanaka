const scroll_To=e=>{const l=e.replace("#","");document.getElementById(l).scrollIntoView({behavior:"smooth",inline:"nearest"}),history.pushState(null,null,`#${l}`)};window.addEventListener("scroll",(()=>{const e=window.scrollY,l=document.getElementsByClassName("arrow")[0];e>=100?l.classList.add("arrow--scrolled"):l.classList.remove("arrow--scrolled")}));
//# sourceMappingURL=script.js.map
