/* boot.js: runs in <head> so the saved theme is applied before the page paints (no flash). */
(function(){try{var s=(window.top!==window&&JSON.parse(sessionStorage.getItem("sb_preview")||"null"))||JSON.parse(localStorage.getItem("sb_settings")||"null");
document.documentElement.dataset.theme=(s&&s.theme)||"classic"}catch(e){document.documentElement.dataset.theme="classic"}})();
/* v10.26.5: DARK MODE for working at night. Switched on ONLY when the site is opened from your own computer (a file, or localhost).
   The real website is never dark and there is no switch for visitors: nothing is saved and the phone's own dark setting is ignored.
   v10.26.10: "View site as a customer" (a tile in preview.html) opens any page with ?as=customer. Then, on your computer only and until you go back to preview.html, the pages show exactly what a visitor sees:
   light (no dark mode), none of your own unsaved local changes, plus a small "Viewing as a customer" pill with a way back. It does nothing on the real website. */
(function(){try{var h=location.hostname,local=location.protocol==="file:"||h==="localhost"||h==="127.0.0.1";
if(local&&/[?&]as=customer(&|$)/.test(location.search))sessionStorage.setItem("sb_as_customer","1");
var asC=local&&sessionStorage.getItem("sb_as_customer")==="1";window.SB_AS_CUSTOMER=asC;
if(local&&!asC)document.documentElement.dataset.mode="dark";
if(asC)document.addEventListener("DOMContentLoaded",function(){var d=document.createElement("div");d.setAttribute("role","status");
d.style.cssText="position:fixed;left:.6rem;bottom:3.4rem;z-index:99999;display:flex;gap:.6rem;align-items:center;padding:.4rem .4rem .4rem .8rem;border-radius:999px;background:#2b2b2b;color:#fff;font:600 .8rem system-ui,sans-serif;box-shadow:0 2px 10px rgba(0,0,0,.3)";
d.innerHTML='<span title="Viewing as a customer">\ud83d\udc40 Customer view</span><a href="'+(location.pathname.indexOf("/src/")>-1?"../":"")+'preview.html" style="color:#2b2b2b;background:#fff;border-radius:999px;padding:.25rem .7rem;text-decoration:none">Back to preview</a>';document.body.appendChild(d)})}catch(e){}})();
