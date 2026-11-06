/* boot.js: runs in <head> so the saved theme is applied before the page paints (no flash). */
(function(){try{var s=(window.top!==window&&JSON.parse(sessionStorage.getItem("sb_preview")||"null"))||JSON.parse(localStorage.getItem("sb_settings")||"null");
document.documentElement.dataset.theme=(s&&s.theme)||"classic"}catch(e){document.documentElement.dataset.theme="classic"}})();
