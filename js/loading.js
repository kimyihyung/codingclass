(() => {
  "use strict";
  function e(e) {
    var t;
    switch (e) {
      case "safari":
        t = void 0 !== window.safari && window.safari.pushNotification;
        break;
      case "safari mobile":
        t =
          (/iPhone/i.test(navigator.userAgent) ||
            /iPad/i.test(navigator.userAgent)) &&
          /Safari/i.test(navigator.userAgent);
        break;
      case "ios":
        t =
          [
            "iPad Simulator",
            "iPhone Simulator",
            "iPod Simulator",
            "iPad",
            "iPhone",
            "iPod",
          ].includes(navigator.platform) ||
          (navigator.userAgent.includes("Mac") && "ontouchend" in document);
        break;
      case "samsung":
        t = /SamsungBrowser/.test(navigator.userAgent);
        break;
      case "chrome":
        t =
          /Chrome/.test(navigator.userAgent) &&
          /Google Inc/.test(navigator.vendor) &&
          !/SamsungBrowser/.test(navigator.userAgent);
        break;
      case "chrome mobile":
        t =
          /Chrome/.test(navigator.userAgent) &&
          /Google Inc/.test(navigator.vendor) &&
          !/SamsungBrowser/.test(navigator.userAgent) &&
          window.chrome &&
          !window.chrome.webstore;
        break;
      case "chrome mobile ios":
        t =
          /iPhone/i.test(navigator.userAgent) &&
          /Chrome/.test(navigator.userAgent) &&
          /Google Inc/.test(navigator.vendor) &&
          !/SamsungBrowser/.test(navigator.userAgent) &&
          window.chrome &&
          !window.chrome.webstore;
        break;
      case "firefox mobile":
        t =
          !/Chrome/.test(navigator.userAgent) &&
          /Mozilla/.test(navigator.userAgent) &&
          /Firefox/.test(navigator.userAgent) &&
          /Mobile/.test(navigator.userAgent);
        break;
      case "firefox":
        t =
          !/Chrome/.test(navigator.userAgent) &&
          /Mozilla/.test(navigator.userAgent) &&
          /Firefox/.test(navigator.userAgent);
        break;
      case "ie":
        t =
          /MSIE/.test(window.navigator.userAgent) ||
          /NET/.test(window.navigator.userAgent);
        break;
      case "edge":
        t = /Edge/.test(window.navigator.userAgent);
        break;
      case "ms":
        t =
          /Edge/.test(window.navigator.userAgent) ||
          /MSIE/.test(window.navigator.userAgent) ||
          /NET/.test(window.navigator.userAgent);
        break;
      default:
        t = !1;
    }
    return t;
  }
  const t = function (t, a) {
      if (document.fonts.check(`1em ${t}`) && e("chrome")) a();
      else if (document.fonts.size > 0)
        document.fonts.ready.then(() => {
          a();
        });
      else {
        const e = setInterval(() => {
          document.fonts.size > 0 &&
            (e && clearInterval(e),
            document.fonts.ready.then(() => {
              a();
            }));
        }, 100);
      }
    },
    a = function () {
      let t = !e("chrome") && !e("chrome mobile") && !e("ios");
      try {
        const a = window.navigator.userAgent.match(/Version\/.{2}/);
        e("safari mobile") &&
          a &&
          a[0] &&
          Number(a[0].toLowerCase().replace("version/", "")) < 14 &&
          (t = !0);
      } catch (e) {}
      return !t;
    };
  new (class {
    constructor() {
      (this.el = document.getElementById("loading")),
        (this.bg = document.querySelector("#loading-bg")),
        (this.shape = document.querySelector("#loading-shape-container")),
        (this.number = document.querySelector("#loading-number")),
        (this.done = !1),
        (this.progress = this.progress.bind(this)),
        (this.startDate = new Date()),
        (this.event = new CustomEvent("customload")),
        (this.isMobile = window.innerWidth < 970),
        this.hideItems(),
        this.waitForContent(() => {
          this.loadImages(() => {
            (this.done = !0),
              this.number && (this.number.innerHTML = "100%"),
              this.close();
          }, this.progress);
        }),
        setTimeout(() => {
          this.done || this.open();
        }, 3e3);
    }
    setImages() {
      this.isMobile &&
        (Array.from(
          document.querySelectorAll("img[data-responsive-src]")
        ).forEach((e) => {
          let t = e.src;
          e.src = t.replace(/\.jpg|\.webp/, (e) => "-m" + e);
        }),
        Array.from(
          document.querySelectorAll("[data-bg-img][data-responsive-src]")
        ).forEach((e) => {
          let t = e.getAttribute("data-bg-img");
          e.setAttribute(
            "data-bg-img",
            t.replace(/\.jpg|\.webp/, (e) => "-m" + e)
          );
        }));
      let e = !a();
      document.documentElement.setAttribute("data-webp", !e),
        e &&
          (Array.from(document.querySelectorAll("img[src]")).forEach((e) => {
            let t = e.src,
              a = e.getAttribute("data-format")
                ? e.getAttribute("data-format")
                : "jpg";
            -1 !== t.indexOf(".webp") && (e.src = t.replace(".webp", `.${a}`));
          }),
          Array.from(document.querySelectorAll("img[data-src]")).forEach(
            (e) => {
              let t = e.getAttribute("data-src"),
                a = e.getAttribute("data-format")
                  ? e.getAttribute("data-format")
                  : "jpg";
              -1 !== t.indexOf(".webp") &&
                e.setAttribute("data-src", t.replace(".webp", `.${a}`));
            }
          ),
          Array.from(document.querySelectorAll("[data-bg-img]")).forEach(
            (e) => {
              let t = e.getAttribute("data-bg-img"),
                a = e.getAttribute("data-format")
                  ? e.getAttribute("data-format")
                  : "jpg";
              -1 !== t.indexOf(".webp") &&
                e.setAttribute("data-bg-img", t.replace(".webp", `.${a}`));
            }
          )),
        Array.from(document.querySelectorAll("img[data-src]")).forEach((e) => {
          e.src = e.dataset.src;
        }),
        Array.from(
          document.querySelectorAll('[data-bg-img]:not([loading="lazy"])')
        ).forEach((e) => {
          e.style.backgroundImage = `url('${e.getAttribute("data-bg-img")}')`;
        });
    }
    loadImages(e, t) {
      this.setImages();
      let a = Array.from(
          document.querySelectorAll('img:not([loading="lazy"])')
        ),
        r = !1;
      function o() {
        return a.filter((e) => e.complete).length;
      }
      o() === a.length
        ? ((r = !0), e())
        : a.forEach((s) => {
            s.addEventListener("load", () => {
              t && t(o() / a.length), r || o() !== a.length || ((r = !0), e());
            });
          }),
        setTimeout(() => {
          r || ((r = !0), e());
        }, 15e3);
    }
    progress(e) {
      this.number && (this.number.innerHTML = `${Math.ceil(100 * e)}%`);
    }
    open() {
      (this.isOpen = !0), this.number && (this.number.style.opacity = 1);
    }
    close() {
      window.location.hash,
        t("Panchang", () => {
          t("Open Sans", () => {
            let e = 2.5;
            const t = (new Date() - this.startDate) / 1e3;
            t > e ? (e = 0.1) : (e -= t),
              setTimeout(() => {
                this.waitForGL(() => {
                  (this.isOpen = !1),
                    this.shape.classList.remove("show"),
                    setTimeout(() => {
                      this.el.classList.add("hide"),
                        (this.bg.style.opacity = 0),
                        this.number && (this.number.style.opacity = 0),
                        document.documentElement.setAttribute(
                          "data-custom-loaded",
                          !0
                        ),
                        window.dispatchEvent(this.event);
                    }, 1100);
                });
              }, 1e3 * e);
          });
        });
    }
    waitForGL(e) {
      "/" === window.location.pathname
        ? document.documentElement.getAttribute("data-gl-loaded")
          ? e()
          : window.addEventListener("glload", () => {
              e();
            })
        : e();
    }
    waitForContent(e) {
      "work" === location.pathname.split("/")[1]
        ? document.documentElement.getAttribute("data-content-loaded")
          ? e()
          : window.addEventListener("contentload", () => {
              e();
            })
        : e();
    }
    hideItems() {
      this.el.classList.add("no-transition"),
        this.number && (this.number.style.opacity = 0),
        setTimeout(() => {
          this.el.classList.remove("no-transition"),
            this.shape.classList.add("show");
        }, 500);
    }
  })();
})();
