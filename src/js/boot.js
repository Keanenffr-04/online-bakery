/* boot.js: runs in <head> so the saved theme is applied before the page paints (no flash). */
(function(){try{var s=(window.top!==window&&JSON.parse(sessionStorage.getItem("sb_preview")||"null"))||JSON.parse(localStorage.getItem("sb_settings")||"null");
document.documentElement.dataset.theme=(s&&s.theme)||"classic"}catch(e){document.documentElement.dataset.theme="classic"}})();
/* v10.26.5: DARK MODE for working at night. Switched on ONLY when the site is opened from your own computer (a file, or localhost).
   The real website is never dark and there is no switch for visitors: nothing is saved and the phone's own dark setting is ignored. */
(function(){try{var h=location.hostname;if(location.protocol==="file:"||h==="localhost"||h==="127.0.0.1")document.documentElement.dataset.mode="dark"}catch(e){}})();
