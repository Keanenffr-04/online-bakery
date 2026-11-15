/* pwa.js (v10.26.17): registers the service worker (live https site only) and offers "Install the app" in the footer.
   Never runs on file:// / localhost previews, in "View site as a customer", or in the admin. Nothing is sent anywhere. */
(function () {
  var h = location.hostname, local = location.protocol === "file:" || h === "localhost" || h === "127.0.0.1";
  if (location.protocol !== "https:" || local || window.SB_AS_CUSTOMER) return;
  var standalone = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
  if ("serviceWorker" in navigator) window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
  if (standalone) return;   // already installed: no hint

  var ev = null, ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
  function spot() { return document.querySelector(".site-footer small"); }
  function show(text, act) {
    if (document.getElementById("sb-install")) return;
    var host = spot(); if (!host) return;
    var b = document.createElement("button"); b.id = "sb-install"; b.type = "button"; b.className = "sb-install"; b.textContent = text;
    b.addEventListener("click", act); host.parentNode.insertBefore(b, host);
  }
  window.addEventListener("beforeinstallprompt", function (e) {   // Android Chrome, Edge, desktop Chrome
    e.preventDefault(); ev = e;
    show("\uD83D\uDCF2 Install the app", function () { if (!ev) return; ev.prompt(); ev.userChoice.then(function () { ev = null; var x = document.getElementById("sb-install"); if (x) x.remove(); }); });
  });
  window.addEventListener("appinstalled", function () { var x = document.getElementById("sb-install"); if (x) x.remove(); });
  if (ios) document.addEventListener("DOMContentLoaded", function () {   // iPhone / iPad Safari has no install button: show the two taps
    setTimeout(function () { show("\uD83D\uDCF2 Add to Home Screen", function () { alert("To add this website to your Home Screen: tap the Share button in Safari, then \"Add to Home Screen\"."); }); }, 600);
  });
})();
