/*! For license information please see home.js.LICENSE.txt */
(() => {
  "use strict";
  function t(t) {
    var e;
    switch (t) {
      case "safari":
        e = void 0 !== window.safari && window.safari.pushNotification;
        break;
      case "safari mobile":
        e =
          (/iPhone/i.test(navigator.userAgent) ||
            /iPad/i.test(navigator.userAgent)) &&
          /Safari/i.test(navigator.userAgent);
        break;
      case "ios":
        e =
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
        e = /SamsungBrowser/.test(navigator.userAgent);
        break;
      case "chrome":
        e =
          /Chrome/.test(navigator.userAgent) &&
          /Google Inc/.test(navigator.vendor) &&
          !/SamsungBrowser/.test(navigator.userAgent);
        break;
      case "chrome mobile":
        e =
          /Chrome/.test(navigator.userAgent) &&
          /Google Inc/.test(navigator.vendor) &&
          !/SamsungBrowser/.test(navigator.userAgent) &&
          window.chrome &&
          !window.chrome.webstore;
        break;
      case "chrome mobile ios":
        e =
          /iPhone/i.test(navigator.userAgent) &&
          /Chrome/.test(navigator.userAgent) &&
          /Google Inc/.test(navigator.vendor) &&
          !/SamsungBrowser/.test(navigator.userAgent) &&
          window.chrome &&
          !window.chrome.webstore;
        break;
      case "firefox mobile":
        e =
          !/Chrome/.test(navigator.userAgent) &&
          /Mozilla/.test(navigator.userAgent) &&
          /Firefox/.test(navigator.userAgent) &&
          /Mobile/.test(navigator.userAgent);
        break;
      case "firefox":
        e =
          !/Chrome/.test(navigator.userAgent) &&
          /Mozilla/.test(navigator.userAgent) &&
          /Firefox/.test(navigator.userAgent);
        break;
      case "ie":
        e =
          /MSIE/.test(window.navigator.userAgent) ||
          /NET/.test(window.navigator.userAgent);
        break;
      case "edge":
        e = /Edge/.test(window.navigator.userAgent);
        break;
      case "ms":
        e =
          /Edge/.test(window.navigator.userAgent) ||
          /MSIE/.test(window.navigator.userAgent) ||
          /NET/.test(window.navigator.userAgent);
        break;
      default:
        e = !1;
    }
    return e;
  }
  const e = function () {
      let e = !t("chrome") && !t("chrome mobile") && !t("ios");
      try {
        const i = window.navigator.userAgent.match(/Version\/.{2}/);
        t("safari mobile") &&
          i &&
          i[0] &&
          Number(i[0].toLowerCase().replace("version/", "")) < 14 &&
          (e = !0);
      } catch (t) {}
      return !e;
    },
    i = function () {
      try {
        return document.createEvent("TouchEvent"), !0;
      } catch (t) {
        return !1;
      }
    };
  function s(t) {
    var e;
    switch (t) {
      case "safari":
        e = void 0 !== window.safari && window.safari.pushNotification;
        break;
      case "safari mobile":
        e =
          /iPhone/i.test(navigator.userAgent) &&
          /Safari/i.test(navigator.userAgent);
        break;
      case "samsung":
        e = /SamsungBrowser/.test(navigator.userAgent);
        break;
      case "chrome":
        e =
          /Chrome/.test(navigator.userAgent) &&
          /Google Inc/.test(navigator.vendor) &&
          !/SamsungBrowser/.test(navigator.userAgent);
        break;
      case "chrome mobile":
        e =
          /Chrome/.test(navigator.userAgent) &&
          /Google Inc/.test(navigator.vendor) &&
          !/SamsungBrowser/.test(navigator.userAgent) &&
          window.chrome &&
          !window.chrome.webstore;
        break;
      case "firefox mobile":
        e =
          !/Chrome/.test(navigator.userAgent) &&
          /Mozilla/.test(navigator.userAgent) &&
          /Firefox/.test(navigator.userAgent) &&
          /Mobile/.test(navigator.userAgent);
        break;
      case "firefox":
        e =
          !/Chrome/.test(navigator.userAgent) &&
          /Mozilla/.test(navigator.userAgent) &&
          /Firefox/.test(navigator.userAgent);
        break;
      case "ie":
        e =
          /MSIE/.test(window.navigator.userAgent) ||
          /NET/.test(window.navigator.userAgent);
        break;
      case "edge":
        e = /Edge/.test(window.navigator.userAgent);
        break;
      case "ms":
        e =
          /Edge/.test(window.navigator.userAgent) ||
          /MSIE/.test(window.navigator.userAgent) ||
          /NET/.test(window.navigator.userAgent);
        break;
      default:
        e = !1;
    }
    return e;
  }
  function r(t, e) {
    var i = new Image();
    return (i.src = t), (i.onload = e), i;
  }
  const n = {
    isLite: function () {
      return navigator.hardwareConcurrency < 8;
    },
    isTouch: function () {
      try {
        return document.createEvent("TouchEvent"), !0;
      } catch (t) {
        return !1;
      }
    },
    getStyleNumber: function (t, e) {
      return Number(getComputedStyle(t)[e].replace("px", ""));
    },
    random: function (t, e) {
      return Math.random() * (e - t) + t;
    },
    waitForLoader: function (t) {
      document.documentElement.getAttribute("data-custom-loaded")
        ? t()
        : window.addEventListener("customload", () => {
            t();
          });
    },
    waitForFont: function (t, e) {
      if (document.fonts.check(`1em ${t}`) && s("chrome")) e();
      else if (document.fonts.size > 0)
        document.fonts.ready.then(() => {
          e();
        });
      else {
        const t = setInterval(() => {
          document.fonts.size > 0 &&
            (t && clearInterval(t),
            document.fonts.ready.then(() => {
              e();
            }));
        }, 100);
      }
    },
    isInViewportDom: function (t, e) {
      var i,
        s,
        r,
        n,
        a = t.getBoundingClientRect();
      (i = a.left),
        (s = a.top + (void 0 !== e ? e : 0)),
        (r = a.width),
        (n = a.height);
      var o = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      );
      return (
        s <
          Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0
          ) &&
        s + n > 0 &&
        i < o &&
        i + r > 0
      );
    },
    getPosition: function (t) {
      for (var e = 0, i = 0; t; )
        (e += t.offsetLeft - t.scrollLeft + t.clientLeft),
          (i += t.offsetTop - t.scrollTop + t.clientTop),
          (t = t.offsetParent);
      return { x: e, y: i };
    },
    testBrowser: s,
    getBrowser: function () {
      return s("chrome")
        ? "chrome"
        : s("safari")
        ? "safari"
        : s("safari mobile")
        ? "safari-mobile"
        : s("firefox")
        ? "firefox"
        : s("ie")
        ? "ie"
        : s("edge")
        ? "edge"
        : void 0;
    },
    ease: {
      bounce: function (t) {
        return (
          Math.pow(2, -10 * t) * Math.sin(((t - 0.075) * (2 * Math.PI)) / 0.3) +
          1
        );
      },
      out: function (t) {
        return 1 - --t * t * t * t;
      },
      inQuint: function (t) {
        return t * t * t * t * t * t * t * t * t * t * t * t * t;
      },
      easeInCirc: function (t) {
        return 1 - Math.sqrt(1 - Math.pow(t, 2));
      },
      easeInOutCirc: (t) => -(Math.cos(PI * t) - 1) / 2,
      out2: function (t) {
        return t * (2 - t);
      },
    },
    round: function (t, e) {
      return (e = e ? Math.pow(10, e) : 1e3), Math.round(t * e) / e;
    },
    lerp: function (t, e, i) {
      return (1 - i) * t + i * e;
    },
    loadImages: function (t, e) {
      for (
        var i = [],
          s = t.length,
          n = function () {
            0 == --s && e(i);
          },
          a = 0;
        a < s;
        ++a
      ) {
        var o = r(t[a], n);
        i.push(o);
      }
    },
    loadImage: r,
    supportWebp: function () {
      let t = !s("chrome") && !s("chrome mobile") && !s("ios");
      try {
        const e = window.navigator.userAgent.match(/Version\/.{2}/);
        s("safari mobile") &&
          e &&
          e[0] &&
          Number(e[0].toLowerCase().replace("version/", "")) < 14 &&
          (t = !0);
      } catch (t) {}
      return !t;
    },
  };
  function a(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  function o(t, e) {
    (t.prototype = Object.create(e.prototype)),
      (t.prototype.constructor = t),
      (t.__proto__ = e);
  }
  var h,
    u,
    l,
    c,
    d,
    p,
    g,
    f,
    m,
    v,
    _,
    w,
    y,
    x,
    b,
    M,
    A,
    T,
    E,
    S,
    C,
    F,
    P,
    R,
    D,
    k,
    O,
    z,
    L = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: { lineHeight: "" },
    },
    j = { duration: 0.5, overwrite: !1, delay: 0 },
    I = 1e8,
    B = 1e-8,
    U = 2 * Math.PI,
    N = U / 4,
    q = 0,
    V = Math.sqrt,
    G = Math.cos,
    W = Math.sin,
    Y = function (t) {
      return "string" == typeof t;
    },
    X = function (t) {
      return "function" == typeof t;
    },
    H = function (t) {
      return "number" == typeof t;
    },
    $ = function (t) {
      return void 0 === t;
    },
    Z = function (t) {
      return "object" == typeof t;
    },
    Q = function (t) {
      return !1 !== t;
    },
    K = function () {
      return "undefined" != typeof window;
    },
    J = function (t) {
      return X(t) || Y(t);
    },
    tt =
      ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
      function () {},
    et = Array.isArray,
    it = /(?:-?\.?\d|\.)+/gi,
    st = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    rt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    nt = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    at = /[+-]=-?[.\d]+/,
    ot = /[^,'"\[\]\s]+/gi,
    ht = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    ut = {},
    lt = {},
    ct = function (t) {
      return (lt = jt(t, ut)) && Ei;
    },
    dt = function (t, e) {
      return console.warn(
        "Invalid property",
        t,
        "set to",
        e,
        "Missing plugin? gsap.registerPlugin()"
      );
    },
    pt = function (t, e) {
      return !e && console.warn(t);
    },
    gt = function (t, e) {
      return (t && (ut[t] = e) && lt && (lt[t] = e)) || ut;
    },
    ft = function () {
      return 0;
    },
    mt = {},
    vt = [],
    _t = {},
    wt = {},
    yt = {},
    xt = 30,
    bt = [],
    Mt = "",
    At = function (t) {
      var e,
        i,
        s = t[0];
      if ((Z(s) || X(s) || (t = [t]), !(e = (s._gsap || {}).harness))) {
        for (i = bt.length; i-- && !bt[i].targetTest(s); );
        e = bt[i];
      }
      for (i = t.length; i--; )
        (t[i] && (t[i]._gsap || (t[i]._gsap = new $e(t[i], e)))) ||
          t.splice(i, 1);
      return t;
    },
    Tt = function (t) {
      return t._gsap || At(ge(t))[0]._gsap;
    },
    Et = function (t, e, i) {
      return (i = t[e]) && X(i)
        ? t[e]()
        : ($(i) && t.getAttribute && t.getAttribute(e)) || i;
    },
    St = function (t, e) {
      return (t = t.split(",")).forEach(e) || t;
    },
    Ct = function (t) {
      return Math.round(1e5 * t) / 1e5 || 0;
    },
    Ft = function (t) {
      return Math.round(1e7 * t) / 1e7 || 0;
    },
    Pt = function (t, e) {
      var i = e.charAt(0),
        s = parseFloat(e.substr(2));
      return (
        (t = parseFloat(t)),
        "+" === i ? t + s : "-" === i ? t - s : "*" === i ? t * s : t / s
      );
    },
    Rt = function (t, e) {
      for (var i = e.length, s = 0; t.indexOf(e[s]) < 0 && ++s < i; );
      return s < i;
    },
    Dt = function () {
      var t,
        e,
        i = vt.length,
        s = vt.slice(0);
      for (_t = {}, vt.length = 0, t = 0; t < i; t++)
        (e = s[t]) &&
          e._lazy &&
          (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
    },
    kt = function (t, e, i, s) {
      vt.length && Dt(), t.render(e, i, s), vt.length && Dt();
    },
    Ot = function (t) {
      var e = parseFloat(t);
      return (e || 0 === e) && (t + "").match(ot).length < 2
        ? e
        : Y(t)
        ? t.trim()
        : t;
    },
    zt = function (t) {
      return t;
    },
    Lt = function (t, e) {
      for (var i in e) i in t || (t[i] = e[i]);
      return t;
    },
    jt = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    },
    It = function t(e, i) {
      for (var s in i)
        "__proto__" !== s &&
          "constructor" !== s &&
          "prototype" !== s &&
          (e[s] = Z(i[s]) ? t(e[s] || (e[s] = {}), i[s]) : i[s]);
      return e;
    },
    Bt = function (t, e) {
      var i,
        s = {};
      for (i in t) i in e || (s[i] = t[i]);
      return s;
    },
    Ut = function (t) {
      var e,
        i = t.parent || u,
        s = t.keyframes
          ? ((e = et(t.keyframes)),
            function (t, i) {
              for (var s in i)
                s in t ||
                  ("duration" === s && e) ||
                  "ease" === s ||
                  (t[s] = i[s]);
            })
          : Lt;
      if (Q(t.inherit))
        for (; i; ) s(t, i.vars.defaults), (i = i.parent || i._dp);
      return t;
    },
    Nt = function (t, e, i, s, r) {
      void 0 === i && (i = "_first"), void 0 === s && (s = "_last");
      var n,
        a = t[s];
      if (r) for (n = e[r]; a && a[r] > n; ) a = a._prev;
      return (
        a
          ? ((e._next = a._next), (a._next = e))
          : ((e._next = t[i]), (t[i] = e)),
        e._next ? (e._next._prev = e) : (t[s] = e),
        (e._prev = a),
        (e.parent = e._dp = t),
        e
      );
    },
    qt = function (t, e, i, s) {
      void 0 === i && (i = "_first"), void 0 === s && (s = "_last");
      var r = e._prev,
        n = e._next;
      r ? (r._next = n) : t[i] === e && (t[i] = n),
        n ? (n._prev = r) : t[s] === e && (t[s] = r),
        (e._next = e._prev = e.parent = null);
    },
    Vt = function (t, e) {
      t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t),
        (t._act = 0);
    },
    Gt = function (t, e) {
      if (t && (!e || e._end > t._dur || e._start < 0))
        for (var i = t; i; ) (i._dirty = 1), (i = i.parent);
      return t;
    },
    Wt = function (t) {
      for (var e = t.parent; e && e.parent; )
        (e._dirty = 1), e.totalDuration(), (e = e.parent);
      return t;
    },
    Yt = function t(e) {
      return !e || (e._ts && t(e.parent));
    },
    Xt = function (t) {
      return t._repeat ? Ht(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
    },
    Ht = function (t, e) {
      var i = Math.floor((t /= e));
      return t && i === t ? i - 1 : i;
    },
    $t = function (t, e) {
      return (
        (t - e._start) * e._ts +
        (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
      );
    },
    Zt = function (t) {
      return (t._end = Ft(
        t._start + (t._tDur / Math.abs(t._ts || t._rts || B) || 0)
      ));
    },
    Qt = function (t, e) {
      var i = t._dp;
      return (
        i &&
          i.smoothChildTiming &&
          t._ts &&
          ((t._start = Ft(
            i._time -
              (t._ts > 0
                ? e / t._ts
                : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)
          )),
          Zt(t),
          i._dirty || Gt(i, t)),
        t
      );
    },
    Kt = function (t, e) {
      var i;
      if (
        ((e._time || (e._initted && !e._dur)) &&
          ((i = $t(t.rawTime(), e)),
          (!e._dur || le(0, e.totalDuration(), i) - e._tTime > B) &&
            e.render(i, !0)),
        Gt(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
      ) {
        if (t._dur < t.duration())
          for (i = t; i._dp; )
            i.rawTime() >= 0 && i.totalTime(i._tTime), (i = i._dp);
        t._zTime = -1e-8;
      }
    },
    Jt = function (t, e, i, s) {
      return (
        e.parent && Vt(e),
        (e._start = Ft(
          (H(i) ? i : i || t !== u ? oe(t, i, e) : t._time) + e._delay
        )),
        (e._end = Ft(
          e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
        )),
        Nt(t, e, "_first", "_last", t._sort ? "_start" : 0),
        se(e) || (t._recent = e),
        s || Kt(t, e),
        t
      );
    },
    te = function (t, e) {
      return (
        (ut.ScrollTrigger || dt("scrollTrigger", e)) &&
        ut.ScrollTrigger.create(e, t)
      );
    },
    ee = function (t, e, i, s) {
      return (
        si(t, e),
        t._initted
          ? !i &&
            t._pt &&
            ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
            g !== Le.frame
            ? (vt.push(t), (t._lazy = [e, s]), 1)
            : void 0
          : 1
      );
    },
    ie = function t(e) {
      var i = e.parent;
      return i && i._ts && i._initted && !i._lock && (i.rawTime() < 0 || t(i));
    },
    se = function (t) {
      var e = t.data;
      return "isFromStart" === e || "isStart" === e;
    },
    re = function (t, e, i, s) {
      var r = t._repeat,
        n = Ft(e) || 0,
        a = t._tTime / t._tDur;
      return (
        a && !s && (t._time *= n / t._dur),
        (t._dur = n),
        (t._tDur = r ? (r < 0 ? 1e10 : Ft(n * (r + 1) + t._rDelay * r)) : n),
        a > 0 && !s ? Qt(t, (t._tTime = t._tDur * a)) : t.parent && Zt(t),
        i || Gt(t.parent, t),
        t
      );
    },
    ne = function (t) {
      return t instanceof Qe ? Gt(t) : re(t, t._dur);
    },
    ae = { _start: 0, endTime: ft, totalDuration: ft },
    oe = function t(e, i, s) {
      var r,
        n,
        a,
        o = e.labels,
        h = e._recent || ae,
        u = e.duration() >= I ? h.endTime(!1) : e._dur;
      return Y(i) && (isNaN(i) || i in o)
        ? ((n = i.charAt(0)),
          (a = "%" === i.substr(-1)),
          (r = i.indexOf("=")),
          "<" === n || ">" === n
            ? (r >= 0 && (i = i.replace(/=/, "")),
              ("<" === n ? h._start : h.endTime(h._repeat >= 0)) +
                (parseFloat(i.substr(1)) || 0) *
                  (a ? (r < 0 ? h : s).totalDuration() / 100 : 1))
            : r < 0
            ? (i in o || (o[i] = u), o[i])
            : ((n = parseFloat(i.charAt(r - 1) + i.substr(r + 1))),
              a && s && (n = (n / 100) * (et(s) ? s[0] : s).totalDuration()),
              r > 1 ? t(e, i.substr(0, r - 1), s) + n : u + n))
        : null == i
        ? u
        : +i;
    },
    he = function (t, e, i) {
      var s,
        r,
        n = H(e[1]),
        a = (n ? 2 : 1) + (t < 2 ? 0 : 1),
        o = e[a];
      if ((n && (o.duration = e[1]), (o.parent = i), t)) {
        for (s = o, r = i; r && !("immediateRender" in s); )
          (s = r.vars.defaults || {}), (r = Q(r.vars.inherit) && r.parent);
        (o.immediateRender = Q(s.immediateRender)),
          t < 2 ? (o.runBackwards = 1) : (o.startAt = e[a - 1]);
      }
      return new hi(e[0], o, e[a + 1]);
    },
    ue = function (t, e) {
      return t || 0 === t ? e(t) : e;
    },
    le = function (t, e, i) {
      return i < t ? t : i > e ? e : i;
    },
    ce = function (t, e) {
      return Y(t) && (e = ht.exec(t)) ? e[1] : "";
    },
    de = [].slice,
    pe = function (t, e) {
      return (
        t &&
        Z(t) &&
        "length" in t &&
        ((!e && !t.length) || (t.length - 1 in t && Z(t[0]))) &&
        !t.nodeType &&
        t !== l
      );
    },
    ge = function (t, e, i) {
      return !Y(t) || i || (!c && je())
        ? et(t)
          ? (function (t, e, i) {
              return (
                void 0 === i && (i = []),
                t.forEach(function (t) {
                  var s;
                  return (Y(t) && !e) || pe(t, 1)
                    ? (s = i).push.apply(s, ge(t))
                    : i.push(t);
                }) || i
              );
            })(t, i)
          : pe(t)
          ? de.call(t, 0)
          : t
          ? [t]
          : []
        : de.call((e || d).querySelectorAll(t), 0);
    },
    fe = function (t) {
      return t.sort(function () {
        return 0.5 - Math.random();
      });
    },
    me = function (t) {
      if (X(t)) return t;
      var e = Z(t) ? t : { each: t },
        i = Ge(e.ease),
        s = e.from || 0,
        r = parseFloat(e.base) || 0,
        n = {},
        a = s > 0 && s < 1,
        o = isNaN(s) || a,
        h = e.axis,
        u = s,
        l = s;
      return (
        Y(s)
          ? (u = l = { center: 0.5, edges: 0.5, end: 1 }[s] || 0)
          : !a && o && ((u = s[0]), (l = s[1])),
        function (t, a, c) {
          var d,
            p,
            g,
            f,
            m,
            v,
            _,
            w,
            y,
            x = (c || e).length,
            b = n[x];
          if (!b) {
            if (!(y = "auto" === e.grid ? 0 : (e.grid || [1, I])[1])) {
              for (
                _ = -I;
                _ < (_ = c[y++].getBoundingClientRect().left) && y < x;

              );
              y--;
            }
            for (
              b = n[x] = [],
                d = o ? Math.min(y, x) * u - 0.5 : s % y,
                p = y === I ? 0 : o ? (x * l) / y - 0.5 : (s / y) | 0,
                _ = 0,
                w = I,
                v = 0;
              v < x;
              v++
            )
              (g = (v % y) - d),
                (f = p - ((v / y) | 0)),
                (b[v] = m = h ? Math.abs("y" === h ? f : g) : V(g * g + f * f)),
                m > _ && (_ = m),
                m < w && (w = m);
            "random" === s && fe(b),
              (b.max = _ - w),
              (b.min = w),
              (b.v = x =
                (parseFloat(e.amount) ||
                  parseFloat(e.each) *
                    (y > x
                      ? x - 1
                      : h
                      ? "y" === h
                        ? x / y
                        : y
                      : Math.max(y, x / y)) ||
                  0) * ("edges" === s ? -1 : 1)),
              (b.b = x < 0 ? r - x : r),
              (b.u = ce(e.amount || e.each) || 0),
              (i = i && x < 0 ? qe(i) : i);
          }
          return (
            (x = (b[t] - b.min) / b.max || 0),
            Ft(b.b + (i ? i(x) : x) * b.v) + b.u
          );
        }
      );
    },
    ve = function (t) {
      var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
      return function (i) {
        var s = Math.round(parseFloat(i) / t) * t * e;
        return (s - (s % 1)) / e + (H(i) ? 0 : ce(i));
      };
    },
    _e = function (t, e) {
      var i,
        s,
        r = et(t);
      return (
        !r &&
          Z(t) &&
          ((i = r = t.radius || I),
          t.values
            ? ((t = ge(t.values)), (s = !H(t[0])) && (i *= i))
            : (t = ve(t.increment))),
        ue(
          e,
          r
            ? X(t)
              ? function (e) {
                  return (s = t(e)), Math.abs(s - e) <= i ? s : e;
                }
              : function (e) {
                  for (
                    var r,
                      n,
                      a = parseFloat(s ? e.x : e),
                      o = parseFloat(s ? e.y : 0),
                      h = I,
                      u = 0,
                      l = t.length;
                    l--;

                  )
                    (r = s
                      ? (r = t[l].x - a) * r + (n = t[l].y - o) * n
                      : Math.abs(t[l] - a)) < h && ((h = r), (u = l));
                  return (
                    (u = !i || h <= i ? t[u] : e),
                    s || u === e || H(e) ? u : u + ce(e)
                  );
                }
            : ve(t)
        )
      );
    },
    we = function (t, e, i, s) {
      return ue(et(t) ? !e : !0 === i ? !!(i = 0) : !s, function () {
        return et(t)
          ? t[~~(Math.random() * t.length)]
          : (i = i || 1e-5) &&
              (s = i < 1 ? Math.pow(10, (i + "").length - 2) : 1) &&
              Math.floor(
                Math.round(
                  (t - i / 2 + Math.random() * (e - t + 0.99 * i)) / i
                ) *
                  i *
                  s
              ) / s;
      });
    },
    ye = function (t, e, i) {
      return ue(i, function (i) {
        return t[~~e(i)];
      });
    },
    xe = function (t) {
      for (var e, i, s, r, n = 0, a = ""; ~(e = t.indexOf("random(", n)); )
        (s = t.indexOf(")", e)),
          (r = "[" === t.charAt(e + 7)),
          (i = t.substr(e + 7, s - e - 7).match(r ? ot : it)),
          (a +=
            t.substr(n, e - n) +
            we(r ? i : +i[0], r ? 0 : +i[1], +i[2] || 1e-5)),
          (n = s + 1);
      return a + t.substr(n, t.length - n);
    },
    be = function (t, e, i, s, r) {
      var n = e - t,
        a = s - i;
      return ue(r, function (e) {
        return i + (((e - t) / n) * a || 0);
      });
    },
    Me = function (t, e, i) {
      var s,
        r,
        n,
        a = t.labels,
        o = I;
      for (s in a)
        (r = a[s] - e) < 0 == !!i &&
          r &&
          o > (r = Math.abs(r)) &&
          ((n = s), (o = r));
      return n;
    },
    Ae = function (t, e, i) {
      var s,
        r,
        n = t.vars,
        a = n[e];
      if (a)
        return (
          (s = n[e + "Params"]),
          (r = n.callbackScope || t),
          i && vt.length && Dt(),
          s ? a.apply(r, s) : a.call(r)
        );
    },
    Te = function (t) {
      return (
        Vt(t),
        t.scrollTrigger && t.scrollTrigger.kill(!1),
        t.progress() < 1 && Ae(t, "onInterrupt"),
        t
      );
    },
    Ee = function (t) {
      var e = (t = (!t.name && t.default) || t).name,
        i = X(t),
        s =
          e && !i && t.init
            ? function () {
                this._props = [];
              }
            : t,
        r = {
          init: ft,
          render: vi,
          add: ei,
          kill: wi,
          modifier: _i,
          rawVars: 0,
        },
        n = { targetTest: 0, get: 0, getSetter: pi, aliases: {}, register: 0 };
      if ((je(), t !== s)) {
        if (wt[e]) return;
        Lt(s, Lt(Bt(t, r), n)),
          jt(s.prototype, jt(r, Bt(t, n))),
          (wt[(s.prop = e)] = s),
          t.targetTest && (bt.push(s), (mt[e] = 1)),
          (e =
            ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) +
            "Plugin");
      }
      gt(e, s), t.register && t.register(Ei, s, bi);
    },
    Se = 255,
    Ce = {
      aqua: [0, Se, Se],
      lime: [0, Se, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, Se],
      navy: [0, 0, 128],
      white: [Se, Se, Se],
      olive: [128, 128, 0],
      yellow: [Se, Se, 0],
      orange: [Se, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [Se, 0, 0],
      pink: [Se, 192, 203],
      cyan: [0, Se, Se],
      transparent: [Se, Se, Se, 0],
    },
    Fe = function (t, e, i) {
      return (
        ((6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1
          ? e + (i - e) * t * 6
          : t < 0.5
          ? i
          : 3 * t < 2
          ? e + (i - e) * (2 / 3 - t) * 6
          : e) *
          Se +
          0.5) |
        0
      );
    },
    Pe = function (t, e, i) {
      var s,
        r,
        n,
        a,
        o,
        h,
        u,
        l,
        c,
        d,
        p = t ? (H(t) ? [t >> 16, (t >> 8) & Se, t & Se] : 0) : Ce.black;
      if (!p) {
        if (("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), Ce[t]))
          p = Ce[t];
        else if ("#" === t.charAt(0)) {
          if (
            (t.length < 6 &&
              ((s = t.charAt(1)),
              (r = t.charAt(2)),
              (n = t.charAt(3)),
              (t =
                "#" +
                s +
                s +
                r +
                r +
                n +
                n +
                (5 === t.length ? t.charAt(4) + t.charAt(4) : ""))),
            9 === t.length)
          )
            return [
              (p = parseInt(t.substr(1, 6), 16)) >> 16,
              (p >> 8) & Se,
              p & Se,
              parseInt(t.substr(7), 16) / 255,
            ];
          p = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & Se, t & Se];
        } else if ("hsl" === t.substr(0, 3))
          if (((p = d = t.match(it)), e)) {
            if (~t.indexOf("="))
              return (p = t.match(st)), i && p.length < 4 && (p[3] = 1), p;
          } else
            (a = (+p[0] % 360) / 360),
              (o = +p[1] / 100),
              (s =
                2 * (h = +p[2] / 100) -
                (r = h <= 0.5 ? h * (o + 1) : h + o - h * o)),
              p.length > 3 && (p[3] *= 1),
              (p[0] = Fe(a + 1 / 3, s, r)),
              (p[1] = Fe(a, s, r)),
              (p[2] = Fe(a - 1 / 3, s, r));
        else p = t.match(it) || Ce.transparent;
        p = p.map(Number);
      }
      return (
        e &&
          !d &&
          ((s = p[0] / Se),
          (r = p[1] / Se),
          (n = p[2] / Se),
          (h = ((u = Math.max(s, r, n)) + (l = Math.min(s, r, n))) / 2),
          u === l
            ? (a = o = 0)
            : ((c = u - l),
              (o = h > 0.5 ? c / (2 - u - l) : c / (u + l)),
              (a =
                u === s
                  ? (r - n) / c + (r < n ? 6 : 0)
                  : u === r
                  ? (n - s) / c + 2
                  : (s - r) / c + 4),
              (a *= 60)),
          (p[0] = ~~(a + 0.5)),
          (p[1] = ~~(100 * o + 0.5)),
          (p[2] = ~~(100 * h + 0.5))),
        i && p.length < 4 && (p[3] = 1),
        p
      );
    },
    Re = function (t) {
      var e = [],
        i = [],
        s = -1;
      return (
        t.split(ke).forEach(function (t) {
          var r = t.match(rt) || [];
          e.push.apply(e, r), i.push((s += r.length + 1));
        }),
        (e.c = i),
        e
      );
    },
    De = function (t, e, i) {
      var s,
        r,
        n,
        a,
        o = "",
        h = (t + o).match(ke),
        u = e ? "hsla(" : "rgba(",
        l = 0;
      if (!h) return t;
      if (
        ((h = h.map(function (t) {
          return (
            (t = Pe(t, e, 1)) &&
            u +
              (e
                ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3]
                : t.join(",")) +
              ")"
          );
        })),
        i && ((n = Re(t)), (s = i.c).join(o) !== n.c.join(o)))
      )
        for (a = (r = t.replace(ke, "1").split(rt)).length - 1; l < a; l++)
          o +=
            r[l] +
            (~s.indexOf(l)
              ? h.shift() || u + "0,0,0,0)"
              : (n.length ? n : h.length ? h : i).shift());
      if (!r)
        for (a = (r = t.split(ke)).length - 1; l < a; l++) o += r[l] + h[l];
      return o + r[a];
    },
    ke = (function () {
      var t,
        e =
          "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
      for (t in Ce) e += "|" + t + "\\b";
      return new RegExp(e + ")", "gi");
    })(),
    Oe = /hsl[a]?\(/,
    ze = function (t) {
      var e,
        i = t.join(" ");
      if (((ke.lastIndex = 0), ke.test(i)))
        return (
          (e = Oe.test(i)),
          (t[1] = De(t[1], e)),
          (t[0] = De(t[0], e, Re(t[1]))),
          !0
        );
    },
    Le =
      ((M = Date.now),
      (A = 500),
      (T = 33),
      (E = M()),
      (S = E),
      (F = C = 1e3 / 240),
      (R = function t(e) {
        var i,
          s,
          r,
          n,
          a = M() - S,
          o = !0 === e;
        if (
          (a > A && (E += a - T),
          ((i = (r = (S += a) - E) - F) > 0 || o) &&
            ((n = ++y.frame),
            (x = r - 1e3 * y.time),
            (y.time = r /= 1e3),
            (F += i + (i >= C ? 4 : C - i)),
            (s = 1)),
          o || (v = _(t)),
          s)
        )
          for (b = 0; b < P.length; b++) P[b](r, x, n, e);
      }),
      (y = {
        time: 0,
        frame: 0,
        tick: function () {
          R(!0);
        },
        deltaRatio: function (t) {
          return x / (1e3 / (t || 60));
        },
        wake: function () {
          p &&
            (!c &&
              K() &&
              ((l = c = window),
              (d = l.document || {}),
              (ut.gsap = Ei),
              (l.gsapVersions || (l.gsapVersions = [])).push(Ei.version),
              ct(lt || l.GreenSockGlobals || (!l.gsap && l) || {}),
              (w = l.requestAnimationFrame)),
            v && y.sleep(),
            (_ =
              w ||
              function (t) {
                return setTimeout(t, (F - 1e3 * y.time + 1) | 0);
              }),
            (m = 1),
            R(2));
        },
        sleep: function () {
          (w ? l.cancelAnimationFrame : clearTimeout)(v), (m = 0), (_ = ft);
        },
        lagSmoothing: function (t, e) {
          (A = t || 1e8), (T = Math.min(e, A, 0));
        },
        fps: function (t) {
          (C = 1e3 / (t || 240)), (F = 1e3 * y.time + C);
        },
        add: function (t, e, i) {
          var s = e
            ? function (e, i, r, n) {
                t(e, i, r, n), y.remove(s);
              }
            : t;
          return y.remove(t), P[i ? "unshift" : "push"](s), je(), s;
        },
        remove: function (t, e) {
          ~(e = P.indexOf(t)) && P.splice(e, 1) && b >= e && b--;
        },
        _listeners: (P = []),
      })),
    je = function () {
      return !m && Le.wake();
    },
    Ie = {},
    Be = /^[\d.\-M][\d.\-,\s]/,
    Ue = /["']/g,
    Ne = function (t) {
      for (
        var e,
          i,
          s,
          r = {},
          n = t.substr(1, t.length - 3).split(":"),
          a = n[0],
          o = 1,
          h = n.length;
        o < h;
        o++
      )
        (i = n[o]),
          (e = o !== h - 1 ? i.lastIndexOf(",") : i.length),
          (s = i.substr(0, e)),
          (r[a] = isNaN(s) ? s.replace(Ue, "").trim() : +s),
          (a = i.substr(e + 1).trim());
      return r;
    },
    qe = function (t) {
      return function (e) {
        return 1 - t(1 - e);
      };
    },
    Ve = function t(e, i) {
      for (var s, r = e._first; r; )
        r instanceof Qe
          ? t(r, i)
          : !r.vars.yoyoEase ||
            (r._yoyo && r._repeat) ||
            r._yoyo === i ||
            (r.timeline
              ? t(r.timeline, i)
              : ((s = r._ease),
                (r._ease = r._yEase),
                (r._yEase = s),
                (r._yoyo = i))),
          (r = r._next);
    },
    Ge = function (t, e) {
      return (
        (t &&
          (X(t)
            ? t
            : Ie[t] ||
              (function (t) {
                var e,
                  i,
                  s,
                  r,
                  n = (t + "").split("("),
                  a = Ie[n[0]];
                return a && n.length > 1 && a.config
                  ? a.config.apply(
                      null,
                      ~t.indexOf("{")
                        ? [Ne(n[1])]
                        : ((e = t),
                          (i = e.indexOf("(") + 1),
                          (s = e.indexOf(")")),
                          (r = e.indexOf("(", i)),
                          e.substring(
                            i,
                            ~r && r < s ? e.indexOf(")", s + 1) : s
                          ))
                            .split(",")
                            .map(Ot)
                    )
                  : Ie._CE && Be.test(t)
                  ? Ie._CE("", t)
                  : a;
              })(t))) ||
        e
      );
    },
    We = function (t, e, i, s) {
      void 0 === i &&
        (i = function (t) {
          return 1 - e(1 - t);
        }),
        void 0 === s &&
          (s = function (t) {
            return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
          });
      var r,
        n = { easeIn: e, easeOut: i, easeInOut: s };
      return (
        St(t, function (t) {
          for (var e in ((Ie[t] = ut[t] = n),
          (Ie[(r = t.toLowerCase())] = i),
          n))
            Ie[
              r + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")
            ] = Ie[t + "." + e] = n[e];
        }),
        n
      );
    },
    Ye = function (t) {
      return function (e) {
        return e < 0.5 ? (1 - t(1 - 2 * e)) / 2 : 0.5 + t(2 * (e - 0.5)) / 2;
      };
    },
    Xe = function t(e, i, s) {
      var r = i >= 1 ? i : 1,
        n = (s || (e ? 0.3 : 0.45)) / (i < 1 ? i : 1),
        a = (n / U) * (Math.asin(1 / r) || 0),
        o = function (t) {
          return 1 === t ? 1 : r * Math.pow(2, -10 * t) * W((t - a) * n) + 1;
        },
        h =
          "out" === e
            ? o
            : "in" === e
            ? function (t) {
                return 1 - o(1 - t);
              }
            : Ye(o);
      return (
        (n = U / n),
        (h.config = function (i, s) {
          return t(e, i, s);
        }),
        h
      );
    },
    He = function t(e, i) {
      void 0 === i && (i = 1.70158);
      var s = function (t) {
          return t ? --t * t * ((i + 1) * t + i) + 1 : 0;
        },
        r =
          "out" === e
            ? s
            : "in" === e
            ? function (t) {
                return 1 - s(1 - t);
              }
            : Ye(s);
      return (
        (r.config = function (i) {
          return t(e, i);
        }),
        r
      );
    };
  St("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
    var i = e < 5 ? e + 1 : e;
    We(
      t + ",Power" + (i - 1),
      e
        ? function (t) {
            return Math.pow(t, i);
          }
        : function (t) {
            return t;
          },
      function (t) {
        return 1 - Math.pow(1 - t, i);
      },
      function (t) {
        return t < 0.5
          ? Math.pow(2 * t, i) / 2
          : 1 - Math.pow(2 * (1 - t), i) / 2;
      }
    );
  }),
    (Ie.Linear.easeNone = Ie.none = Ie.Linear.easeIn),
    We("Elastic", Xe("in"), Xe("out"), Xe()),
    (D = 7.5625),
    (O = 1 / (k = 2.75)),
    We(
      "Bounce",
      function (t) {
        return 1 - z(1 - t);
      },
      (z = function (t) {
        return t < O
          ? D * t * t
          : t < 0.7272727272727273
          ? D * Math.pow(t - 1.5 / k, 2) + 0.75
          : t < 0.9090909090909092
          ? D * (t -= 2.25 / k) * t + 0.9375
          : D * Math.pow(t - 2.625 / k, 2) + 0.984375;
      })
    ),
    We("Expo", function (t) {
      return t ? Math.pow(2, 10 * (t - 1)) : 0;
    }),
    We("Circ", function (t) {
      return -(V(1 - t * t) - 1);
    }),
    We("Sine", function (t) {
      return 1 === t ? 1 : 1 - G(t * N);
    }),
    We("Back", He("in"), He("out"), He()),
    (Ie.SteppedEase =
      Ie.steps =
      ut.SteppedEase =
        {
          config: function (t, e) {
            void 0 === t && (t = 1);
            var i = 1 / t,
              s = t + (e ? 0 : 1),
              r = e ? 1 : 0;
            return function (t) {
              return (((s * le(0, 0.99999999, t)) | 0) + r) * i;
            };
          },
        }),
    (j.ease = Ie["quad.out"]),
    St(
      "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
      function (t) {
        return (Mt += t + "," + t + "Params,");
      }
    );
  var $e = function (t, e) {
      (this.id = q++),
        (t._gsap = this),
        (this.target = t),
        (this.harness = e),
        (this.get = e ? e.get : Et),
        (this.set = e ? e.getSetter : pi);
    },
    Ze = (function () {
      function t(t) {
        (this.vars = t),
          (this._delay = +t.delay || 0),
          (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
            ((this._rDelay = t.repeatDelay || 0),
            (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
          (this._ts = 1),
          re(this, +t.duration, 1, 1),
          (this.data = t.data),
          m || Le.wake();
      }
      var e = t.prototype;
      return (
        (e.delay = function (t) {
          return t || 0 === t
            ? (this.parent &&
                this.parent.smoothChildTiming &&
                this.startTime(this._start + t - this._delay),
              (this._delay = t),
              this)
            : this._delay;
        }),
        (e.duration = function (t) {
          return arguments.length
            ? this.totalDuration(
                this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t
              )
            : this.totalDuration() && this._dur;
        }),
        (e.totalDuration = function (t) {
          return arguments.length
            ? ((this._dirty = 0),
              re(
                this,
                this._repeat < 0
                  ? t
                  : (t - this._repeat * this._rDelay) / (this._repeat + 1)
              ))
            : this._tDur;
        }),
        (e.totalTime = function (t, e) {
          if ((je(), !arguments.length)) return this._tTime;
          var i = this._dp;
          if (i && i.smoothChildTiming && this._ts) {
            for (
              Qt(this, t), !i._dp || i.parent || Kt(i, this);
              i && i.parent;

            )
              i.parent._time !==
                i._start +
                  (i._ts >= 0
                    ? i._tTime / i._ts
                    : (i.totalDuration() - i._tTime) / -i._ts) &&
                i.totalTime(i._tTime, !0),
                (i = i.parent);
            !this.parent &&
              this._dp.autoRemoveChildren &&
              ((this._ts > 0 && t < this._tDur) ||
                (this._ts < 0 && t > 0) ||
                (!this._tDur && !t)) &&
              Jt(this._dp, this, this._start - this._delay);
          }
          return (
            (this._tTime !== t ||
              (!this._dur && !e) ||
              (this._initted && Math.abs(this._zTime) === B) ||
              (!t && !this._initted && (this.add || this._ptLookup))) &&
              (this._ts || (this._pTime = t), kt(this, t, e)),
            this
          );
        }),
        (e.time = function (t, e) {
          return arguments.length
            ? this.totalTime(
                Math.min(this.totalDuration(), t + Xt(this)) %
                  (this._dur + this._rDelay) || (t ? this._dur : 0),
                e
              )
            : this._time;
        }),
        (e.totalProgress = function (t, e) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * t, e)
            : this.totalDuration()
            ? Math.min(1, this._tTime / this._tDur)
            : this.ratio;
        }),
        (e.progress = function (t, e) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                  Xt(this),
                e
              )
            : this.duration()
            ? Math.min(1, this._time / this._dur)
            : this.ratio;
        }),
        (e.iteration = function (t, e) {
          var i = this.duration() + this._rDelay;
          return arguments.length
            ? this.totalTime(this._time + (t - 1) * i, e)
            : this._repeat
            ? Ht(this._tTime, i) + 1
            : 1;
        }),
        (e.timeScale = function (t) {
          if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
          if (this._rts === t) return this;
          var e =
            this.parent && this._ts ? $t(this.parent._time, this) : this._tTime;
          return (
            (this._rts = +t || 0),
            (this._ts = this._ps || -1e-8 === t ? 0 : this._rts),
            this.totalTime(le(-this._delay, this._tDur, e), !0),
            Zt(this),
            Wt(this)
          );
        }),
        (e.paused = function (t) {
          return arguments.length
            ? (this._ps !== t &&
                ((this._ps = t),
                t
                  ? ((this._pTime =
                      this._tTime || Math.max(-this._delay, this.rawTime())),
                    (this._ts = this._act = 0))
                  : (je(),
                    (this._ts = this._rts),
                    this.totalTime(
                      this.parent && !this.parent.smoothChildTiming
                        ? this.rawTime()
                        : this._tTime || this._pTime,
                      1 === this.progress() &&
                        Math.abs(this._zTime) !== B &&
                        (this._tTime -= B)
                    ))),
              this)
            : this._ps;
        }),
        (e.startTime = function (t) {
          if (arguments.length) {
            this._start = t;
            var e = this.parent || this._dp;
            return (
              e && (e._sort || !this.parent) && Jt(e, this, t - this._delay),
              this
            );
          }
          return this._start;
        }),
        (e.endTime = function (t) {
          return (
            this._start +
            (Q(t) ? this.totalDuration() : this.duration()) /
              Math.abs(this._ts || 1)
          );
        }),
        (e.rawTime = function (t) {
          var e = this.parent || this._dp;
          return e
            ? t &&
              (!this._ts ||
                (this._repeat && this._time && this.totalProgress() < 1))
              ? this._tTime % (this._dur + this._rDelay)
              : this._ts
              ? $t(e.rawTime(t), this)
              : this._tTime
            : this._tTime;
        }),
        (e.globalTime = function (t) {
          for (var e = this, i = arguments.length ? t : e.rawTime(); e; )
            (i = e._start + i / (e._ts || 1)), (e = e._dp);
          return i;
        }),
        (e.repeat = function (t) {
          return arguments.length
            ? ((this._repeat = t === 1 / 0 ? -2 : t), ne(this))
            : -2 === this._repeat
            ? 1 / 0
            : this._repeat;
        }),
        (e.repeatDelay = function (t) {
          if (arguments.length) {
            var e = this._time;
            return (this._rDelay = t), ne(this), e ? this.time(e) : this;
          }
          return this._rDelay;
        }),
        (e.yoyo = function (t) {
          return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
        }),
        (e.seek = function (t, e) {
          return this.totalTime(oe(this, t), Q(e));
        }),
        (e.restart = function (t, e) {
          return this.play().totalTime(t ? -this._delay : 0, Q(e));
        }),
        (e.play = function (t, e) {
          return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
        }),
        (e.reverse = function (t, e) {
          return (
            null != t && this.seek(t || this.totalDuration(), e),
            this.reversed(!0).paused(!1)
          );
        }),
        (e.pause = function (t, e) {
          return null != t && this.seek(t, e), this.paused(!0);
        }),
        (e.resume = function () {
          return this.paused(!1);
        }),
        (e.reversed = function (t) {
          return arguments.length
            ? (!!t !== this.reversed() &&
                this.timeScale(-this._rts || (t ? -1e-8 : 0)),
              this)
            : this._rts < 0;
        }),
        (e.invalidate = function () {
          return (this._initted = this._act = 0), (this._zTime = -1e-8), this;
        }),
        (e.isActive = function () {
          var t,
            e = this.parent || this._dp,
            i = this._start;
          return !(
            e &&
            !(
              this._ts &&
              this._initted &&
              e.isActive() &&
              (t = e.rawTime(!0)) >= i &&
              t < this.endTime(!0) - B
            )
          );
        }),
        (e.eventCallback = function (t, e, i) {
          var s = this.vars;
          return arguments.length > 1
            ? (e
                ? ((s[t] = e),
                  i && (s[t + "Params"] = i),
                  "onUpdate" === t && (this._onUpdate = e))
                : delete s[t],
              this)
            : s[t];
        }),
        (e.then = function (t) {
          var e = this;
          return new Promise(function (i) {
            var s = X(t) ? t : zt,
              r = function () {
                var t = e.then;
                (e.then = null),
                  X(s) && (s = s(e)) && (s.then || s === e) && (e.then = t),
                  i(s),
                  (e.then = t);
              };
            (e._initted && 1 === e.totalProgress() && e._ts >= 0) ||
            (!e._tTime && e._ts < 0)
              ? r()
              : (e._prom = r);
          });
        }),
        (e.kill = function () {
          Te(this);
        }),
        t
      );
    })();
  Lt(Ze.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -1e-8,
    _prom: 0,
    _ps: !1,
    _rts: 1,
  });
  var Qe = (function (t) {
    function e(e, i) {
      var s;
      return (
        void 0 === e && (e = {}),
        ((s = t.call(this, e) || this).labels = {}),
        (s.smoothChildTiming = !!e.smoothChildTiming),
        (s.autoRemoveChildren = !!e.autoRemoveChildren),
        (s._sort = Q(e.sortChildren)),
        u && Jt(e.parent || u, a(s), i),
        e.reversed && s.reverse(),
        e.paused && s.paused(!0),
        e.scrollTrigger && te(a(s), e.scrollTrigger),
        s
      );
    }
    o(e, t);
    var i = e.prototype;
    return (
      (i.to = function (t, e, i) {
        return he(0, arguments, this), this;
      }),
      (i.from = function (t, e, i) {
        return he(1, arguments, this), this;
      }),
      (i.fromTo = function (t, e, i, s) {
        return he(2, arguments, this), this;
      }),
      (i.set = function (t, e, i) {
        return (
          (e.duration = 0),
          (e.parent = this),
          Ut(e).repeatDelay || (e.repeat = 0),
          (e.immediateRender = !!e.immediateRender),
          new hi(t, e, oe(this, i), 1),
          this
        );
      }),
      (i.call = function (t, e, i) {
        return Jt(this, hi.delayedCall(0, t, e), i);
      }),
      (i.staggerTo = function (t, e, i, s, r, n, a) {
        return (
          (i.duration = e),
          (i.stagger = i.stagger || s),
          (i.onComplete = n),
          (i.onCompleteParams = a),
          (i.parent = this),
          new hi(t, i, oe(this, r)),
          this
        );
      }),
      (i.staggerFrom = function (t, e, i, s, r, n, a) {
        return (
          (i.runBackwards = 1),
          (Ut(i).immediateRender = Q(i.immediateRender)),
          this.staggerTo(t, e, i, s, r, n, a)
        );
      }),
      (i.staggerFromTo = function (t, e, i, s, r, n, a, o) {
        return (
          (s.startAt = i),
          (Ut(s).immediateRender = Q(s.immediateRender)),
          this.staggerTo(t, e, s, r, n, a, o)
        );
      }),
      (i.render = function (t, e, i) {
        var s,
          r,
          n,
          a,
          o,
          h,
          l,
          c,
          d,
          p,
          g,
          f,
          m = this._time,
          v = this._dirty ? this.totalDuration() : this._tDur,
          _ = this._dur,
          w = t <= 0 ? 0 : Ft(t),
          y = this._zTime < 0 != t < 0 && (this._initted || !_);
        if (
          (this !== u && w > v && t >= 0 && (w = v),
          w !== this._tTime || i || y)
        ) {
          if (
            (m !== this._time &&
              _ &&
              ((w += this._time - m), (t += this._time - m)),
            (s = w),
            (d = this._start),
            (h = !(c = this._ts)),
            y && (_ || (m = this._zTime), (t || !e) && (this._zTime = t)),
            this._repeat)
          ) {
            if (
              ((g = this._yoyo),
              (o = _ + this._rDelay),
              this._repeat < -1 && t < 0)
            )
              return this.totalTime(100 * o + t, e, i);
            if (
              ((s = Ft(w % o)),
              w === v
                ? ((a = this._repeat), (s = _))
                : ((a = ~~(w / o)) && a === w / o && ((s = _), a--),
                  s > _ && (s = _)),
              (p = Ht(this._tTime, o)),
              !m && this._tTime && p !== a && (p = a),
              g && 1 & a && ((s = _ - s), (f = 1)),
              a !== p && !this._lock)
            ) {
              var x = g && 1 & p,
                b = x === (g && 1 & a);
              if (
                (a < p && (x = !x),
                (m = x ? 0 : _),
                (this._lock = 1),
                (this.render(m || (f ? 0 : Ft(a * o)), e, !_)._lock = 0),
                (this._tTime = w),
                !e && this.parent && Ae(this, "onRepeat"),
                this.vars.repeatRefresh && !f && (this.invalidate()._lock = 1),
                (m && m !== this._time) ||
                  h !== !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act))
              )
                return this;
              if (
                ((_ = this._dur),
                (v = this._tDur),
                b &&
                  ((this._lock = 2),
                  (m = x ? _ : -1e-4),
                  this.render(m, !0),
                  this.vars.repeatRefresh && !f && this.invalidate()),
                (this._lock = 0),
                !this._ts && !h)
              )
                return this;
              Ve(this, f);
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              ((l = (function (t, e, i) {
                var s;
                if (i > e)
                  for (s = t._first; s && s._start <= i; ) {
                    if ("isPause" === s.data && s._start > e) return s;
                    s = s._next;
                  }
                else
                  for (s = t._last; s && s._start >= i; ) {
                    if ("isPause" === s.data && s._start < e) return s;
                    s = s._prev;
                  }
              })(this, Ft(m), Ft(s))),
              l && (w -= s - (s = l._start))),
            (this._tTime = w),
            (this._time = s),
            (this._act = !c),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = t),
              (m = 0)),
            !m && s && !e && (Ae(this, "onStart"), this._tTime !== w))
          )
            return this;
          if (s >= m && t >= 0)
            for (r = this._first; r; ) {
              if (
                ((n = r._next), (r._act || s >= r._start) && r._ts && l !== r)
              ) {
                if (r.parent !== this) return this.render(t, e, i);
                if (
                  (r.render(
                    r._ts > 0
                      ? (s - r._start) * r._ts
                      : (r._dirty ? r.totalDuration() : r._tDur) +
                          (s - r._start) * r._ts,
                    e,
                    i
                  ),
                  s !== this._time || (!this._ts && !h))
                ) {
                  (l = 0), n && (w += this._zTime = -1e-8);
                  break;
                }
              }
              r = n;
            }
          else {
            r = this._last;
            for (var M = t < 0 ? t : s; r; ) {
              if (
                ((n = r._prev), (r._act || M <= r._end) && r._ts && l !== r)
              ) {
                if (r.parent !== this) return this.render(t, e, i);
                if (
                  (r.render(
                    r._ts > 0
                      ? (M - r._start) * r._ts
                      : (r._dirty ? r.totalDuration() : r._tDur) +
                          (M - r._start) * r._ts,
                    e,
                    i
                  ),
                  s !== this._time || (!this._ts && !h))
                ) {
                  (l = 0), n && (w += this._zTime = M ? -1e-8 : B);
                  break;
                }
              }
              r = n;
            }
          }
          if (
            l &&
            !e &&
            (this.pause(),
            (l.render(s >= m ? 0 : -1e-8)._zTime = s >= m ? 1 : -1),
            this._ts)
          )
            return (this._start = d), Zt(this), this.render(t, e, i);
          this._onUpdate && !e && Ae(this, "onUpdate", !0),
            ((w === v && this._tTime >= this.totalDuration()) || (!w && m)) &&
              ((d !== this._start && Math.abs(c) === Math.abs(this._ts)) ||
                this._lock ||
                ((t || !_) &&
                  ((w === v && this._ts > 0) || (!w && this._ts < 0)) &&
                  Vt(this, 1),
                e ||
                  (t < 0 && !m) ||
                  (!w && !m && v) ||
                  (Ae(
                    this,
                    w === v && t >= 0 ? "onComplete" : "onReverseComplete",
                    !0
                  ),
                  this._prom &&
                    !(w < v && this.timeScale() > 0) &&
                    this._prom())));
        }
        return this;
      }),
      (i.add = function (t, e) {
        var i = this;
        if ((H(e) || (e = oe(this, e, t)), !(t instanceof Ze))) {
          if (et(t))
            return (
              t.forEach(function (t) {
                return i.add(t, e);
              }),
              this
            );
          if (Y(t)) return this.addLabel(t, e);
          if (!X(t)) return this;
          t = hi.delayedCall(0, t);
        }
        return this !== t ? Jt(this, t, e) : this;
      }),
      (i.getChildren = function (t, e, i, s) {
        void 0 === t && (t = !0),
          void 0 === e && (e = !0),
          void 0 === i && (i = !0),
          void 0 === s && (s = -I);
        for (var r = [], n = this._first; n; )
          n._start >= s &&
            (n instanceof hi
              ? e && r.push(n)
              : (i && r.push(n),
                t && r.push.apply(r, n.getChildren(!0, e, i)))),
            (n = n._next);
        return r;
      }),
      (i.getById = function (t) {
        for (var e = this.getChildren(1, 1, 1), i = e.length; i--; )
          if (e[i].vars.id === t) return e[i];
      }),
      (i.remove = function (t) {
        return Y(t)
          ? this.removeLabel(t)
          : X(t)
          ? this.killTweensOf(t)
          : (qt(this, t),
            t === this._recent && (this._recent = this._last),
            Gt(this));
      }),
      (i.totalTime = function (e, i) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = Ft(
                Le.time -
                  (this._ts > 0
                    ? e / this._ts
                    : (this.totalDuration() - e) / -this._ts)
              )),
            t.prototype.totalTime.call(this, e, i),
            (this._forcing = 0),
            this)
          : this._tTime;
      }),
      (i.addLabel = function (t, e) {
        return (this.labels[t] = oe(this, e)), this;
      }),
      (i.removeLabel = function (t) {
        return delete this.labels[t], this;
      }),
      (i.addPause = function (t, e, i) {
        var s = hi.delayedCall(0, e || ft, i);
        return (
          (s.data = "isPause"), (this._hasPause = 1), Jt(this, s, oe(this, t))
        );
      }),
      (i.removePause = function (t) {
        var e = this._first;
        for (t = oe(this, t); e; )
          e._start === t && "isPause" === e.data && Vt(e), (e = e._next);
      }),
      (i.killTweensOf = function (t, e, i) {
        for (var s = this.getTweensOf(t, i), r = s.length; r--; )
          Ke !== s[r] && s[r].kill(t, e);
        return this;
      }),
      (i.getTweensOf = function (t, e) {
        for (var i, s = [], r = ge(t), n = this._first, a = H(e); n; )
          n instanceof hi
            ? Rt(n._targets, r) &&
              (a
                ? (!Ke || (n._initted && n._ts)) &&
                  n.globalTime(0) <= e &&
                  n.globalTime(n.totalDuration()) > e
                : !e || n.isActive()) &&
              s.push(n)
            : (i = n.getTweensOf(r, e)).length && s.push.apply(s, i),
            (n = n._next);
        return s;
      }),
      (i.tweenTo = function (t, e) {
        e = e || {};
        var i,
          s = this,
          r = oe(s, t),
          n = e,
          a = n.startAt,
          o = n.onStart,
          h = n.onStartParams,
          u = n.immediateRender,
          l = hi.to(
            s,
            Lt(
              {
                ease: e.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: r,
                overwrite: "auto",
                duration:
                  e.duration ||
                  Math.abs(
                    (r - (a && "time" in a ? a.time : s._time)) / s.timeScale()
                  ) ||
                  B,
                onStart: function () {
                  if ((s.pause(), !i)) {
                    var t =
                      e.duration ||
                      Math.abs(
                        (r - (a && "time" in a ? a.time : s._time)) /
                          s.timeScale()
                      );
                    l._dur !== t && re(l, t, 0, 1).render(l._time, !0, !0),
                      (i = 1);
                  }
                  o && o.apply(l, h || []);
                },
              },
              e
            )
          );
        return u ? l.render(0) : l;
      }),
      (i.tweenFromTo = function (t, e, i) {
        return this.tweenTo(e, Lt({ startAt: { time: oe(this, t) } }, i));
      }),
      (i.recent = function () {
        return this._recent;
      }),
      (i.nextLabel = function (t) {
        return void 0 === t && (t = this._time), Me(this, oe(this, t));
      }),
      (i.previousLabel = function (t) {
        return void 0 === t && (t = this._time), Me(this, oe(this, t), 1);
      }),
      (i.currentLabel = function (t) {
        return arguments.length
          ? this.seek(t, !0)
          : this.previousLabel(this._time + B);
      }),
      (i.shiftChildren = function (t, e, i) {
        void 0 === i && (i = 0);
        for (var s, r = this._first, n = this.labels; r; )
          r._start >= i && ((r._start += t), (r._end += t)), (r = r._next);
        if (e) for (s in n) n[s] >= i && (n[s] += t);
        return Gt(this);
      }),
      (i.invalidate = function () {
        var e = this._first;
        for (this._lock = 0; e; ) e.invalidate(), (e = e._next);
        return t.prototype.invalidate.call(this);
      }),
      (i.clear = function (t) {
        void 0 === t && (t = !0);
        for (var e, i = this._first; i; )
          (e = i._next), this.remove(i), (i = e);
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          t && (this.labels = {}),
          Gt(this)
        );
      }),
      (i.totalDuration = function (t) {
        var e,
          i,
          s,
          r = 0,
          n = this,
          a = n._last,
          o = I;
        if (arguments.length)
          return n.timeScale(
            (n._repeat < 0 ? n.duration() : n.totalDuration()) /
              (n.reversed() ? -t : t)
          );
        if (n._dirty) {
          for (s = n.parent; a; )
            (e = a._prev),
              a._dirty && a.totalDuration(),
              (i = a._start) > o && n._sort && a._ts && !n._lock
                ? ((n._lock = 1), (Jt(n, a, i - a._delay, 1)._lock = 0))
                : (o = i),
              i < 0 &&
                a._ts &&
                ((r -= i),
                ((!s && !n._dp) || (s && s.smoothChildTiming)) &&
                  ((n._start += i / n._ts), (n._time -= i), (n._tTime -= i)),
                n.shiftChildren(-i, !1, -Infinity),
                (o = 0)),
              a._end > r && a._ts && (r = a._end),
              (a = e);
          re(n, n === u && n._time > r ? n._time : r, 1, 1), (n._dirty = 0);
        }
        return n._tDur;
      }),
      (e.updateRoot = function (t) {
        if ((u._ts && (kt(u, $t(t, u)), (g = Le.frame)), Le.frame >= xt)) {
          xt += L.autoSleep || 120;
          var e = u._first;
          if ((!e || !e._ts) && L.autoSleep && Le._listeners.length < 2) {
            for (; e && !e._ts; ) e = e._next;
            e || Le.sleep();
          }
        }
      }),
      e
    );
  })(Ze);
  Lt(Qe.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
  var Ke,
    Je,
    ti = function (t, e, i, s, r, n, a) {
      var o,
        h,
        u,
        l,
        c,
        d,
        p,
        g,
        f = new bi(this._pt, t, e, 0, 1, mi, null, r),
        m = 0,
        v = 0;
      for (
        f.b = i,
          f.e = s,
          i += "",
          (p = ~(s += "").indexOf("random(")) && (s = xe(s)),
          n && (n((g = [i, s]), t, e), (i = g[0]), (s = g[1])),
          h = i.match(nt) || [];
        (o = nt.exec(s));

      )
        (l = o[0]),
          (c = s.substring(m, o.index)),
          u ? (u = (u + 1) % 5) : "rgba(" === c.substr(-5) && (u = 1),
          l !== h[v++] &&
            ((d = parseFloat(h[v - 1]) || 0),
            (f._pt = {
              _next: f._pt,
              p: c || 1 === v ? c : ",",
              s: d,
              c: "=" === l.charAt(1) ? Pt(d, l) - d : parseFloat(l) - d,
              m: u && u < 4 ? Math.round : 0,
            }),
            (m = nt.lastIndex));
      return (
        (f.c = m < s.length ? s.substring(m, s.length) : ""),
        (f.fp = a),
        (at.test(s) || p) && (f.e = 0),
        (this._pt = f),
        f
      );
    },
    ei = function (t, e, i, s, r, n, a, o, h) {
      X(s) && (s = s(r || 0, t, n));
      var u,
        l = t[e],
        c =
          "get" !== i
            ? i
            : X(l)
            ? h
              ? t[
                  e.indexOf("set") || !X(t["get" + e.substr(3)])
                    ? e
                    : "get" + e.substr(3)
                ](h)
              : t[e]()
            : l,
        d = X(l) ? (h ? ci : li) : ui;
      if (
        (Y(s) &&
          (~s.indexOf("random(") && (s = xe(s)),
          "=" === s.charAt(1) &&
            ((u = Pt(c, s) + (ce(c) || 0)) || 0 === u) &&
            (s = u)),
        c !== s || Je)
      )
        return isNaN(c * s) || "" === s
          ? (!l && !(e in t) && dt(e, s),
            ti.call(this, t, e, c, s, d, o || L.stringFilter, h))
          : ((u = new bi(
              this._pt,
              t,
              e,
              +c || 0,
              s - (c || 0),
              "boolean" == typeof l ? fi : gi,
              0,
              d
            )),
            h && (u.fp = h),
            a && u.modifier(a, this, t),
            (this._pt = u));
    },
    ii = function (t, e, i, s, r, n) {
      var a, o, h, u;
      if (
        wt[t] &&
        !1 !==
          (a = new wt[t]()).init(
            r,
            a.rawVars
              ? e[t]
              : (function (t, e, i, s, r) {
                  if (
                    (X(t) && (t = ni(t, r, e, i, s)),
                    !Z(t) || (t.style && t.nodeType) || et(t) || tt(t))
                  )
                    return Y(t) ? ni(t, r, e, i, s) : t;
                  var n,
                    a = {};
                  for (n in t) a[n] = ni(t[n], r, e, i, s);
                  return a;
                })(e[t], s, r, n, i),
            i,
            s,
            n
          ) &&
        ((i._pt = o = new bi(i._pt, r, t, 0, 1, a.render, a, 0, a.priority)),
        i !== f)
      )
        for (h = i._ptLookup[i._targets.indexOf(r)], u = a._props.length; u--; )
          h[a._props[u]] = o;
      return a;
    },
    si = function t(e, i) {
      var s,
        r,
        n,
        a,
        o,
        l,
        c,
        d,
        p,
        g,
        f,
        m,
        v,
        _ = e.vars,
        w = _.ease,
        y = _.startAt,
        x = _.immediateRender,
        b = _.lazy,
        M = _.onUpdate,
        A = _.onUpdateParams,
        T = _.callbackScope,
        E = _.runBackwards,
        S = _.yoyoEase,
        C = _.keyframes,
        F = _.autoRevert,
        P = e._dur,
        R = e._startAt,
        D = e._targets,
        k = e.parent,
        O = k && "nested" === k.data ? k.parent._targets : D,
        z = "auto" === e._overwrite && !h,
        L = e.timeline;
      if (
        (L && (!C || !w) && (w = "none"),
        (e._ease = Ge(w, j.ease)),
        (e._yEase = S ? qe(Ge(!0 === S ? w : S, j.ease)) : 0),
        S &&
          e._yoyo &&
          !e._repeat &&
          ((S = e._yEase), (e._yEase = e._ease), (e._ease = S)),
        (e._from = !L && !!_.runBackwards),
        !L || (C && !_.stagger))
      ) {
        if (
          ((m = (d = D[0] ? Tt(D[0]).harness : 0) && _[d.prop]),
          (s = Bt(_, mt)),
          R && (Vt(R.render(-1, !0)), (R._lazy = 0)),
          y)
        )
          if (
            (Vt(
              (e._startAt = hi.set(
                D,
                Lt(
                  {
                    data: "isStart",
                    overwrite: !1,
                    parent: k,
                    immediateRender: !0,
                    lazy: Q(b),
                    startAt: null,
                    delay: 0,
                    onUpdate: M,
                    onUpdateParams: A,
                    callbackScope: T,
                    stagger: 0,
                  },
                  y
                )
              ))
            ),
            i < 0 && !x && !F && e._startAt.render(-1, !0),
            x)
          ) {
            if ((i > 0 && !F && (e._startAt = 0), P && i <= 0))
              return void (i && (e._zTime = i));
          } else !1 === F && (e._startAt = 0);
        else if (E && P)
          if (R) !F && (e._startAt = 0);
          else if (
            (i && (x = !1),
            (n = Lt(
              {
                overwrite: !1,
                data: "isFromStart",
                lazy: x && Q(b),
                immediateRender: x,
                stagger: 0,
                parent: k,
              },
              s
            )),
            m && (n[d.prop] = m),
            Vt((e._startAt = hi.set(D, n))),
            i < 0 && e._startAt.render(-1, !0),
            (e._zTime = i),
            x)
          ) {
            if (!i) return;
          } else t(e._startAt, B);
        for (
          e._pt = e._ptCache = 0, b = (P && Q(b)) || (b && !P), r = 0;
          r < D.length;
          r++
        ) {
          if (
            ((c = (o = D[r])._gsap || At(D)[r]._gsap),
            (e._ptLookup[r] = g = {}),
            _t[c.id] && vt.length && Dt(),
            (f = O === D ? r : O.indexOf(o)),
            d &&
              !1 !== (p = new d()).init(o, m || s, e, f, O) &&
              ((e._pt = a =
                new bi(e._pt, o, p.name, 0, 1, p.render, p, 0, p.priority)),
              p._props.forEach(function (t) {
                g[t] = a;
              }),
              p.priority && (l = 1)),
            !d || m)
          )
            for (n in s)
              wt[n] && (p = ii(n, s, e, f, o, O))
                ? p.priority && (l = 1)
                : (g[n] = a =
                    ei.call(e, o, n, "get", s[n], f, O, 0, _.stringFilter));
          e._op && e._op[r] && e.kill(o, e._op[r]),
            z &&
              e._pt &&
              ((Ke = e),
              u.killTweensOf(o, g, e.globalTime(i)),
              (v = !e.parent),
              (Ke = 0)),
            e._pt && b && (_t[c.id] = 1);
        }
        l && xi(e), e._onInit && e._onInit(e);
      }
      (e._onUpdate = M),
        (e._initted = (!e._op || e._pt) && !v),
        C && i <= 0 && L.render(I, !0, !0);
    },
    ri = function (t, e, i, s) {
      var r,
        n,
        a = e.ease || s || "power1.inOut";
      if (et(e))
        (n = i[t] || (i[t] = [])),
          e.forEach(function (t, i) {
            return n.push({ t: (i / (e.length - 1)) * 100, v: t, e: a });
          });
      else
        for (r in e)
          (n = i[r] || (i[r] = [])),
            "ease" === r || n.push({ t: parseFloat(t), v: e[r], e: a });
    },
    ni = function (t, e, i, s, r) {
      return X(t)
        ? t.call(e, i, s, r)
        : Y(t) && ~t.indexOf("random(")
        ? xe(t)
        : t;
    },
    ai = Mt + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    oi = {};
  St(ai + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
    return (oi[t] = 1);
  });
  var hi = (function (t) {
    function e(e, i, s, r) {
      var n;
      "number" == typeof i && ((s.duration = i), (i = s), (s = null));
      var o,
        l,
        c,
        d,
        p,
        g,
        f,
        m,
        v = (n = t.call(this, r ? i : Ut(i)) || this).vars,
        _ = v.duration,
        w = v.delay,
        y = v.immediateRender,
        x = v.stagger,
        b = v.overwrite,
        M = v.keyframes,
        A = v.defaults,
        T = v.scrollTrigger,
        E = v.yoyoEase,
        S = i.parent || u,
        C = (et(e) || tt(e) ? H(e[0]) : "length" in i) ? [e] : ge(e);
      if (
        ((n._targets = C.length
          ? At(C)
          : pt(
              "GSAP target " + e + " not found. https://greensock.com",
              !L.nullTargetWarn
            ) || []),
        (n._ptLookup = []),
        (n._overwrite = b),
        M || x || J(_) || J(w))
      ) {
        if (
          ((i = n.vars),
          (o = n.timeline =
            new Qe({ data: "nested", defaults: A || {} })).kill(),
          (o.parent = o._dp = a(n)),
          (o._start = 0),
          x || J(_) || J(w))
        ) {
          if (((d = C.length), (f = x && me(x)), Z(x)))
            for (p in x) ~ai.indexOf(p) && (m || (m = {}), (m[p] = x[p]));
          for (l = 0; l < d; l++)
            ((c = Bt(i, oi)).stagger = 0),
              E && (c.yoyoEase = E),
              m && jt(c, m),
              (g = C[l]),
              (c.duration = +ni(_, a(n), l, g, C)),
              (c.delay = (+ni(w, a(n), l, g, C) || 0) - n._delay),
              !x &&
                1 === d &&
                c.delay &&
                ((n._delay = w = c.delay), (n._start += w), (c.delay = 0)),
              o.to(g, c, f ? f(l, g, C) : 0),
              (o._ease = Ie.none);
          o.duration() ? (_ = w = 0) : (n.timeline = 0);
        } else if (M) {
          Ut(Lt(o.vars.defaults, { ease: "none" })),
            (o._ease = Ge(M.ease || i.ease || "none"));
          var F,
            P,
            R,
            D = 0;
          if (et(M))
            M.forEach(function (t) {
              return o.to(C, t, ">");
            });
          else {
            for (p in ((c = {}), M))
              "ease" === p || "easeEach" === p || ri(p, M[p], c, M.easeEach);
            for (p in c)
              for (
                F = c[p].sort(function (t, e) {
                  return t.t - e.t;
                }),
                  D = 0,
                  l = 0;
                l < F.length;
                l++
              )
                ((R = {
                  ease: (P = F[l]).e,
                  duration: ((P.t - (l ? F[l - 1].t : 0)) / 100) * _,
                })[p] = P.v),
                  o.to(C, R, D),
                  (D += R.duration);
            o.duration() < _ && o.to({}, { duration: _ - o.duration() });
          }
        }
        _ || n.duration((_ = o.duration()));
      } else n.timeline = 0;
      return (
        !0 !== b || h || ((Ke = a(n)), u.killTweensOf(C), (Ke = 0)),
        Jt(S, a(n), s),
        i.reversed && n.reverse(),
        i.paused && n.paused(!0),
        (y ||
          (!_ &&
            !M &&
            n._start === Ft(S._time) &&
            Q(y) &&
            Yt(a(n)) &&
            "nested" !== S.data)) &&
          ((n._tTime = -1e-8), n.render(Math.max(0, -w))),
        T && te(a(n), T),
        n
      );
    }
    o(e, t);
    var i = e.prototype;
    return (
      (i.render = function (t, e, i) {
        var s,
          r,
          n,
          a,
          o,
          h,
          u,
          l,
          c,
          d = this._time,
          p = this._tDur,
          g = this._dur,
          f = t > p - B && t >= 0 ? p : t < B ? 0 : t;
        if (g) {
          if (
            f !== this._tTime ||
            !t ||
            i ||
            (!this._initted && this._tTime) ||
            (this._startAt && this._zTime < 0 != t < 0)
          ) {
            if (((s = f), (l = this.timeline), this._repeat)) {
              if (((a = g + this._rDelay), this._repeat < -1 && t < 0))
                return this.totalTime(100 * a + t, e, i);
              if (
                ((s = Ft(f % a)),
                f === p
                  ? ((n = this._repeat), (s = g))
                  : ((n = ~~(f / a)) && n === f / a && ((s = g), n--),
                    s > g && (s = g)),
                (h = this._yoyo && 1 & n) && ((c = this._yEase), (s = g - s)),
                (o = Ht(this._tTime, a)),
                s === d && !i && this._initted)
              )
                return (this._tTime = f), this;
              n !== o &&
                (l && this._yEase && Ve(l, h),
                !this.vars.repeatRefresh ||
                  h ||
                  this._lock ||
                  ((this._lock = i = 1),
                  (this.render(Ft(a * n), !0).invalidate()._lock = 0)));
            }
            if (!this._initted) {
              if (ee(this, t < 0 ? t : s, i, e)) return (this._tTime = 0), this;
              if (d !== this._time) return this;
              if (g !== this._dur) return this.render(t, e, i);
            }
            if (
              ((this._tTime = f),
              (this._time = s),
              !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
              (this.ratio = u = (c || this._ease)(s / g)),
              this._from && (this.ratio = u = 1 - u),
              s && !d && !e && (Ae(this, "onStart"), this._tTime !== f))
            )
              return this;
            for (r = this._pt; r; ) r.r(u, r.d), (r = r._next);
            (l &&
              l.render(
                t < 0 ? t : !s && h ? -1e-8 : l._dur * l._ease(s / this._dur),
                e,
                i
              )) ||
              (this._startAt && (this._zTime = t)),
              this._onUpdate &&
                !e &&
                (t < 0 && this._startAt && this._startAt.render(t, !0, i),
                Ae(this, "onUpdate")),
              this._repeat &&
                n !== o &&
                this.vars.onRepeat &&
                !e &&
                this.parent &&
                Ae(this, "onRepeat"),
              (f !== this._tDur && f) ||
                this._tTime !== f ||
                (t < 0 &&
                  this._startAt &&
                  !this._onUpdate &&
                  this._startAt.render(t, !0, !0),
                (t || !g) &&
                  ((f === this._tDur && this._ts > 0) ||
                    (!f && this._ts < 0)) &&
                  Vt(this, 1),
                e ||
                  (t < 0 && !d) ||
                  (!f && !d) ||
                  (Ae(this, f === p ? "onComplete" : "onReverseComplete", !0),
                  this._prom &&
                    !(f < p && this.timeScale() > 0) &&
                    this._prom()));
          }
        } else
          !(function (t, e, i, s) {
            var r,
              n,
              a,
              o = t.ratio,
              h =
                e < 0 ||
                (!e &&
                  ((!t._start && ie(t) && (t._initted || !se(t))) ||
                    ((t._ts < 0 || t._dp._ts < 0) && !se(t))))
                  ? 0
                  : 1,
              u = t._rDelay,
              l = 0;
            if (
              (u &&
                t._repeat &&
                ((l = le(0, t._tDur, e)),
                (n = Ht(l, u)),
                t._yoyo && 1 & n && (h = 1 - h),
                n !== Ht(t._tTime, u) &&
                  ((o = 1 - h),
                  t.vars.repeatRefresh && t._initted && t.invalidate())),
              h !== o || s || t._zTime === B || (!e && t._zTime))
            ) {
              if (!t._initted && ee(t, e, s, i)) return;
              for (
                a = t._zTime,
                  t._zTime = e || (i ? B : 0),
                  i || (i = e && !a),
                  t.ratio = h,
                  t._from && (h = 1 - h),
                  t._time = 0,
                  t._tTime = l,
                  r = t._pt;
                r;

              )
                r.r(h, r.d), (r = r._next);
              t._startAt && e < 0 && t._startAt.render(e, !0, !0),
                t._onUpdate && !i && Ae(t, "onUpdate"),
                l && t._repeat && !i && t.parent && Ae(t, "onRepeat"),
                (e >= t._tDur || e < 0) &&
                  t.ratio === h &&
                  (h && Vt(t, 1),
                  i ||
                    (Ae(t, h ? "onComplete" : "onReverseComplete", !0),
                    t._prom && t._prom()));
            } else t._zTime || (t._zTime = e);
          })(this, t, e, i);
        return this;
      }),
      (i.targets = function () {
        return this._targets;
      }),
      (i.invalidate = function () {
        return (
          (this._pt =
            this._op =
            this._startAt =
            this._onUpdate =
            this._lazy =
            this.ratio =
              0),
          (this._ptLookup = []),
          this.timeline && this.timeline.invalidate(),
          t.prototype.invalidate.call(this)
        );
      }),
      (i.resetTo = function (t, e, i, s) {
        m || Le.wake(), this._ts || this.play();
        var r = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
        return (
          this._initted || si(this, r),
          (function (t, e, i, s, r, n, a) {
            var o,
              h,
              u,
              l = ((t._pt && t._ptCache) || (t._ptCache = {}))[e];
            if (!l)
              for (
                l = t._ptCache[e] = [], h = t._ptLookup, u = t._targets.length;
                u--;

              ) {
                if ((o = h[u][e]) && o.d && o.d._pt)
                  for (o = o.d._pt; o && o.p !== e; ) o = o._next;
                if (!o)
                  return (Je = 1), (t.vars[e] = "+=0"), si(t, a), (Je = 0), 1;
                l.push(o);
              }
            for (u = l.length; u--; )
              ((o = l[u]).s =
                (!s && 0 !== s) || r ? o.s + (s || 0) + n * o.c : s),
                (o.c = i - o.s),
                o.e && (o.e = Ct(i) + ce(o.e)),
                o.b && (o.b = o.s + ce(o.b));
          })(this, t, e, i, s, this._ease(r / this._dur), r)
            ? this.resetTo(t, e, i, s)
            : (Qt(this, 0),
              this.parent ||
                Nt(
                  this._dp,
                  this,
                  "_first",
                  "_last",
                  this._dp._sort ? "_start" : 0
                ),
              this.render(0))
        );
      }),
      (i.kill = function (t, e) {
        if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e))))
          return (this._lazy = this._pt = 0), this.parent ? Te(this) : this;
        if (this.timeline) {
          var i = this.timeline.totalDuration();
          return (
            this.timeline.killTweensOf(t, e, Ke && !0 !== Ke.vars.overwrite)
              ._first || Te(this),
            this.parent &&
              i !== this.timeline.totalDuration() &&
              re(this, (this._dur * this.timeline._tDur) / i, 0, 1),
            this
          );
        }
        var s,
          r,
          n,
          a,
          o,
          h,
          u,
          l = this._targets,
          c = t ? ge(t) : l,
          d = this._ptLookup,
          p = this._pt;
        if (
          (!e || "all" === e) &&
          (function (t, e) {
            for (
              var i = t.length, s = i === e.length;
              s && i-- && t[i] === e[i];

            );
            return i < 0;
          })(l, c)
        )
          return "all" === e && (this._pt = 0), Te(this);
        for (
          s = this._op = this._op || [],
            "all" !== e &&
              (Y(e) &&
                ((o = {}),
                St(e, function (t) {
                  return (o[t] = 1);
                }),
                (e = o)),
              (e = (function (t, e) {
                var i,
                  s,
                  r,
                  n,
                  a = t[0] ? Tt(t[0]).harness : 0,
                  o = a && a.aliases;
                if (!o) return e;
                for (s in ((i = jt({}, e)), o))
                  if ((s in i))
                    for (r = (n = o[s].split(",")).length; r--; )
                      i[n[r]] = i[s];
                return i;
              })(l, e))),
            u = l.length;
          u--;

        )
          if (~c.indexOf(l[u]))
            for (o in ((r = d[u]),
            "all" === e
              ? ((s[u] = e), (a = r), (n = {}))
              : ((n = s[u] = s[u] || {}), (a = e)),
            a))
              (h = r && r[o]) &&
                (("kill" in h.d && !0 !== h.d.kill(o)) || qt(this, h, "_pt"),
                delete r[o]),
                "all" !== n && (n[o] = 1);
        return this._initted && !this._pt && p && Te(this), this;
      }),
      (e.to = function (t, i) {
        return new e(t, i, arguments[2]);
      }),
      (e.from = function (t, e) {
        return he(1, arguments);
      }),
      (e.delayedCall = function (t, i, s, r) {
        return new e(i, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: t,
          onComplete: i,
          onReverseComplete: i,
          onCompleteParams: s,
          onReverseCompleteParams: s,
          callbackScope: r,
        });
      }),
      (e.fromTo = function (t, e, i) {
        return he(2, arguments);
      }),
      (e.set = function (t, i) {
        return (i.duration = 0), i.repeatDelay || (i.repeat = 0), new e(t, i);
      }),
      (e.killTweensOf = function (t, e, i) {
        return u.killTweensOf(t, e, i);
      }),
      e
    );
  })(Ze);
  Lt(hi.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
    St("staggerTo,staggerFrom,staggerFromTo", function (t) {
      hi[t] = function () {
        var e = new Qe(),
          i = de.call(arguments, 0);
        return i.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, i);
      };
    });
  var ui = function (t, e, i) {
      return (t[e] = i);
    },
    li = function (t, e, i) {
      return t[e](i);
    },
    ci = function (t, e, i, s) {
      return t[e](s.fp, i);
    },
    di = function (t, e, i) {
      return t.setAttribute(e, i);
    },
    pi = function (t, e) {
      return X(t[e]) ? li : $(t[e]) && t.setAttribute ? di : ui;
    },
    gi = function (t, e) {
      return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
    },
    fi = function (t, e) {
      return e.set(e.t, e.p, !!(e.s + e.c * t), e);
    },
    mi = function (t, e) {
      var i = e._pt,
        s = "";
      if (!t && e.b) s = e.b;
      else if (1 === t && e.e) s = e.e;
      else {
        for (; i; )
          (s =
            i.p +
            (i.m
              ? i.m(i.s + i.c * t)
              : Math.round(1e4 * (i.s + i.c * t)) / 1e4) +
            s),
            (i = i._next);
        s += e.c;
      }
      e.set(e.t, e.p, s, e);
    },
    vi = function (t, e) {
      for (var i = e._pt; i; ) i.r(t, i.d), (i = i._next);
    },
    _i = function (t, e, i, s) {
      for (var r, n = this._pt; n; )
        (r = n._next), n.p === s && n.modifier(t, e, i), (n = r);
    },
    wi = function (t) {
      for (var e, i, s = this._pt; s; )
        (i = s._next),
          (s.p === t && !s.op) || s.op === t
            ? qt(this, s, "_pt")
            : s.dep || (e = 1),
          (s = i);
      return !e;
    },
    yi = function (t, e, i, s) {
      s.mSet(t, e, s.m.call(s.tween, i, s.mt), s);
    },
    xi = function (t) {
      for (var e, i, s, r, n = t._pt; n; ) {
        for (e = n._next, i = s; i && i.pr > n.pr; ) i = i._next;
        (n._prev = i ? i._prev : r) ? (n._prev._next = n) : (s = n),
          (n._next = i) ? (i._prev = n) : (r = n),
          (n = e);
      }
      t._pt = s;
    },
    bi = (function () {
      function t(t, e, i, s, r, n, a, o, h) {
        (this.t = e),
          (this.s = s),
          (this.c = r),
          (this.p = i),
          (this.r = n || gi),
          (this.d = a || this),
          (this.set = o || ui),
          (this.pr = h || 0),
          (this._next = t),
          t && (t._prev = this);
      }
      return (
        (t.prototype.modifier = function (t, e, i) {
          (this.mSet = this.mSet || this.set),
            (this.set = yi),
            (this.m = t),
            (this.mt = i),
            (this.tween = e);
        }),
        t
      );
    })();
  St(
    Mt +
      "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
    function (t) {
      return (mt[t] = 1);
    }
  ),
    (ut.TweenMax = ut.TweenLite = hi),
    (ut.TimelineLite = ut.TimelineMax = Qe),
    (u = new Qe({
      sortChildren: !1,
      defaults: j,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0,
    })),
    (L.stringFilter = ze);
  var Mi = {
    registerPlugin: function () {
      for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
        e[i] = arguments[i];
      e.forEach(function (t) {
        return Ee(t);
      });
    },
    timeline: function (t) {
      return new Qe(t);
    },
    getTweensOf: function (t, e) {
      return u.getTweensOf(t, e);
    },
    getProperty: function (t, e, i, s) {
      Y(t) && (t = ge(t)[0]);
      var r = Tt(t || {}).get,
        n = i ? zt : Ot;
      return (
        "native" === i && (i = ""),
        t
          ? e
            ? n(((wt[e] && wt[e].get) || r)(t, e, i, s))
            : function (e, i, s) {
                return n(((wt[e] && wt[e].get) || r)(t, e, i, s));
              }
          : t
      );
    },
    quickSetter: function (t, e, i) {
      if ((t = ge(t)).length > 1) {
        var s = t.map(function (t) {
            return Ei.quickSetter(t, e, i);
          }),
          r = s.length;
        return function (t) {
          for (var e = r; e--; ) s[e](t);
        };
      }
      t = t[0] || {};
      var n = wt[e],
        a = Tt(t),
        o = (a.harness && (a.harness.aliases || {})[e]) || e,
        h = n
          ? function (e) {
              var s = new n();
              (f._pt = 0),
                s.init(t, i ? e + i : e, f, 0, [t]),
                s.render(1, s),
                f._pt && vi(1, f);
            }
          : a.set(t, o);
      return n
        ? h
        : function (e) {
            return h(t, o, i ? e + i : e, a, 1);
          };
    },
    quickTo: function (t, e, i) {
      var s,
        r = Ei.to(
          t,
          jt((((s = {})[e] = "+=0.1"), (s.paused = !0), s), i || {})
        ),
        n = function (t, i, s) {
          return r.resetTo(e, t, i, s);
        };
      return (n.tween = r), n;
    },
    isTweening: function (t) {
      return u.getTweensOf(t, !0).length > 0;
    },
    defaults: function (t) {
      return t && t.ease && (t.ease = Ge(t.ease, j.ease)), It(j, t || {});
    },
    config: function (t) {
      return It(L, t || {});
    },
    registerEffect: function (t) {
      var e = t.name,
        i = t.effect,
        s = t.plugins,
        r = t.defaults,
        n = t.extendTimeline;
      (s || "").split(",").forEach(function (t) {
        return (
          t && !wt[t] && !ut[t] && pt(e + " effect requires " + t + " plugin.")
        );
      }),
        (yt[e] = function (t, e, s) {
          return i(ge(t), Lt(e || {}, r), s);
        }),
        n &&
          (Qe.prototype[e] = function (t, i, s) {
            return this.add(yt[e](t, Z(i) ? i : (s = i) && {}, this), s);
          });
    },
    registerEase: function (t, e) {
      Ie[t] = Ge(e);
    },
    parseEase: function (t, e) {
      return arguments.length ? Ge(t, e) : Ie;
    },
    getById: function (t) {
      return u.getById(t);
    },
    exportRoot: function (t, e) {
      void 0 === t && (t = {});
      var i,
        s,
        r = new Qe(t);
      for (
        r.smoothChildTiming = Q(t.smoothChildTiming),
          u.remove(r),
          r._dp = 0,
          r._time = r._tTime = u._time,
          i = u._first;
        i;

      )
        (s = i._next),
          (!e &&
            !i._dur &&
            i instanceof hi &&
            i.vars.onComplete === i._targets[0]) ||
            Jt(r, i, i._start - i._delay),
          (i = s);
      return Jt(u, r, 0), r;
    },
    utils: {
      wrap: function t(e, i, s) {
        var r = i - e;
        return et(e)
          ? ye(e, t(0, e.length), i)
          : ue(s, function (t) {
              return ((r + ((t - e) % r)) % r) + e;
            });
      },
      wrapYoyo: function t(e, i, s) {
        var r = i - e,
          n = 2 * r;
        return et(e)
          ? ye(e, t(0, e.length - 1), i)
          : ue(s, function (t) {
              return e + ((t = (n + ((t - e) % n)) % n || 0) > r ? n - t : t);
            });
      },
      distribute: me,
      random: we,
      snap: _e,
      normalize: function (t, e, i) {
        return be(t, e, 0, 1, i);
      },
      getUnit: ce,
      clamp: function (t, e, i) {
        return ue(i, function (i) {
          return le(t, e, i);
        });
      },
      splitColor: Pe,
      toArray: ge,
      selector: function (t) {
        return (
          (t = ge(t)[0] || pt("Invalid scope") || {}),
          function (e) {
            var i = t.current || t.nativeElement || t;
            return ge(
              e,
              i.querySelectorAll
                ? i
                : i === t
                ? pt("Invalid scope") || d.createElement("div")
                : t
            );
          }
        );
      },
      mapRange: be,
      pipe: function () {
        for (var t = arguments.length, e = new Array(t), i = 0; i < t; i++)
          e[i] = arguments[i];
        return function (t) {
          return e.reduce(function (t, e) {
            return e(t);
          }, t);
        };
      },
      unitize: function (t, e) {
        return function (i) {
          return t(parseFloat(i)) + (e || ce(i));
        };
      },
      interpolate: function t(e, i, s, r) {
        var n = isNaN(e + i)
          ? 0
          : function (t) {
              return (1 - t) * e + t * i;
            };
        if (!n) {
          var a,
            o,
            h,
            u,
            l,
            c = Y(e),
            d = {};
          if ((!0 === s && (r = 1) && (s = null), c))
            (e = { p: e }), (i = { p: i });
          else if (et(e) && !et(i)) {
            for (h = [], u = e.length, l = u - 2, o = 1; o < u; o++)
              h.push(t(e[o - 1], e[o]));
            u--,
              (n = function (t) {
                t *= u;
                var e = Math.min(l, ~~t);
                return h[e](t - e);
              }),
              (s = i);
          } else r || (e = jt(et(e) ? [] : {}, e));
          if (!h) {
            for (a in i) ei.call(d, e, a, "get", i[a]);
            n = function (t) {
              return vi(t, d) || (c ? e.p : e);
            };
          }
        }
        return ue(s, n);
      },
      shuffle: fe,
    },
    install: ct,
    effects: yt,
    ticker: Le,
    updateRoot: Qe.updateRoot,
    plugins: wt,
    globalTimeline: u,
    core: {
      PropTween: bi,
      globals: gt,
      Tween: hi,
      Timeline: Qe,
      Animation: Ze,
      getCache: Tt,
      _removeLinkedListItem: qt,
      suppressOverwrites: function (t) {
        return (h = t);
      },
    },
  };
  St("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
    return (Mi[t] = hi[t]);
  }),
    Le.add(Qe.updateRoot),
    (f = Mi.to({}, { duration: 0 }));
  var Ai = function (t, e) {
      for (var i = t._pt; i && i.p !== e && i.op !== e && i.fp !== e; )
        i = i._next;
      return i;
    },
    Ti = function (t, e) {
      return {
        name: t,
        rawVars: 1,
        init: function (t, i, s) {
          s._onInit = function (t) {
            var s, r;
            if (
              (Y(i) &&
                ((s = {}),
                St(i, function (t) {
                  return (s[t] = 1);
                }),
                (i = s)),
              e)
            ) {
              for (r in ((s = {}), i)) s[r] = e(i[r]);
              i = s;
            }
            !(function (t, e) {
              var i,
                s,
                r,
                n = t._targets;
              for (i in e)
                for (s = n.length; s--; )
                  (r = t._ptLookup[s][i]) &&
                    (r = r.d) &&
                    (r._pt && (r = Ai(r, i)),
                    r && r.modifier && r.modifier(e[i], t, n[s], i));
            })(t, i);
          };
        },
      };
    },
    Ei =
      Mi.registerPlugin(
        {
          name: "attr",
          init: function (t, e, i, s, r) {
            var n, a;
            for (n in e)
              (a = this.add(
                t,
                "setAttribute",
                (t.getAttribute(n) || 0) + "",
                e[n],
                s,
                r,
                0,
                0,
                n
              )) && (a.op = n),
                this._props.push(n);
          },
        },
        {
          name: "endArray",
          init: function (t, e) {
            for (var i = e.length; i--; ) this.add(t, i, t[i] || 0, e[i]);
          },
        },
        Ti("roundProps", ve),
        Ti("modifiers"),
        Ti("snap", _e)
      ) || Mi;
  (hi.version = Qe.version = Ei.version = "3.10.2"),
    (p = 1),
    K() && je(),
    Ie.Power0,
    Ie.Power1,
    Ie.Power2,
    Ie.Power3,
    Ie.Power4,
    Ie.Linear,
    Ie.Quad,
    Ie.Cubic,
    Ie.Quart,
    Ie.Quint,
    Ie.Strong,
    Ie.Elastic,
    Ie.Back,
    Ie.SteppedEase,
    Ie.Bounce,
    Ie.Sine,
    Ie.Expo,
    Ie.Circ;
  var Si,
    Ci,
    Fi,
    Pi,
    Ri,
    Di,
    ki,
    Oi = {},
    zi = 180 / Math.PI,
    Li = Math.PI / 180,
    ji = Math.atan2,
    Ii = /([A-Z])/g,
    Bi = /(left|right|width|margin|padding|x)/i,
    Ui = /[\s,\(]\S/,
    Ni = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity",
    },
    qi = function (t, e) {
      return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
    },
    Vi = function (t, e) {
      return e.set(
        e.t,
        e.p,
        1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
        e
      );
    },
    Gi = function (t, e) {
      return e.set(
        e.t,
        e.p,
        t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
        e
      );
    },
    Wi = function (t, e) {
      var i = e.s + e.c * t;
      e.set(e.t, e.p, ~~(i + (i < 0 ? -0.5 : 0.5)) + e.u, e);
    },
    Yi = function (t, e) {
      return e.set(e.t, e.p, t ? e.e : e.b, e);
    },
    Xi = function (t, e) {
      return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
    },
    Hi = function (t, e, i) {
      return (t.style[e] = i);
    },
    $i = function (t, e, i) {
      return t.style.setProperty(e, i);
    },
    Zi = function (t, e, i) {
      return (t._gsap[e] = i);
    },
    Qi = function (t, e, i) {
      return (t._gsap.scaleX = t._gsap.scaleY = i);
    },
    Ki = function (t, e, i, s, r) {
      var n = t._gsap;
      (n.scaleX = n.scaleY = i), n.renderTransform(r, n);
    },
    Ji = function (t, e, i, s, r) {
      var n = t._gsap;
      (n[e] = i), n.renderTransform(r, n);
    },
    ts = "transform",
    es = ts + "Origin",
    is = function (t, e) {
      var i = Ci.createElementNS
        ? Ci.createElementNS(
            (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
            t
          )
        : Ci.createElement(t);
      return i.style ? i : Ci.createElement(t);
    },
    ss = function t(e, i, s) {
      var r = getComputedStyle(e);
      return (
        r[i] ||
        r.getPropertyValue(i.replace(Ii, "-$1").toLowerCase()) ||
        r.getPropertyValue(i) ||
        (!s && t(e, ns(i) || i, 1)) ||
        ""
      );
    },
    rs = "O,Moz,ms,Ms,Webkit".split(","),
    ns = function (t, e, i) {
      var s = (e || Ri).style,
        r = 5;
      if (t in s && !i) return t;
      for (
        t = t.charAt(0).toUpperCase() + t.substr(1);
        r-- && !(rs[r] + t in s);

      );
      return r < 0 ? null : (3 === r ? "ms" : r >= 0 ? rs[r] : "") + t;
    },
    as = function () {
      "undefined" != typeof window &&
        window.document &&
        ((Si = window),
        (Ci = Si.document),
        (Fi = Ci.documentElement),
        (Ri = is("div") || { style: {} }),
        is("div"),
        (ts = ns(ts)),
        (es = ts + "Origin"),
        (Ri.style.cssText =
          "border-width:0;line-height:0;position:absolute;padding:0"),
        (ki = !!ns("perspective")),
        (Pi = 1));
    },
    os = function t(e) {
      var i,
        s = is(
          "svg",
          (this.ownerSVGElement &&
            this.ownerSVGElement.getAttribute("xmlns")) ||
            "http://www.w3.org/2000/svg"
        ),
        r = this.parentNode,
        n = this.nextSibling,
        a = this.style.cssText;
      if (
        (Fi.appendChild(s),
        s.appendChild(this),
        (this.style.display = "block"),
        e)
      )
        try {
          (i = this.getBBox()),
            (this._gsapBBox = this.getBBox),
            (this.getBBox = t);
        } catch (t) {}
      else this._gsapBBox && (i = this._gsapBBox());
      return (
        r && (n ? r.insertBefore(this, n) : r.appendChild(this)),
        Fi.removeChild(s),
        (this.style.cssText = a),
        i
      );
    },
    hs = function (t, e) {
      for (var i = e.length; i--; )
        if (t.hasAttribute(e[i])) return t.getAttribute(e[i]);
    },
    us = function (t) {
      var e;
      try {
        e = t.getBBox();
      } catch (i) {
        e = os.call(t, !0);
      }
      return (
        (e && (e.width || e.height)) ||
          t.getBBox === os ||
          (e = os.call(t, !0)),
        !e || e.width || e.x || e.y
          ? e
          : {
              x: +hs(t, ["x", "cx", "x1"]) || 0,
              y: +hs(t, ["y", "cy", "y1"]) || 0,
              width: 0,
              height: 0,
            }
      );
    },
    ls = function (t) {
      return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !us(t));
    },
    cs = function (t, e) {
      if (e) {
        var i = t.style;
        e in Oi && e !== es && (e = ts),
          i.removeProperty
            ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) ||
                (e = "-" + e),
              i.removeProperty(e.replace(Ii, "-$1").toLowerCase()))
            : i.removeAttribute(e);
      }
    },
    ds = function (t, e, i, s, r, n) {
      var a = new bi(t._pt, e, i, 0, 1, n ? Xi : Yi);
      return (t._pt = a), (a.b = s), (a.e = r), t._props.push(i), a;
    },
    ps = { deg: 1, rad: 1, turn: 1 },
    gs = function t(e, i, s, r) {
      var n,
        a,
        o,
        h,
        u = parseFloat(s) || 0,
        l = (s + "").trim().substr((u + "").length) || "px",
        c = Ri.style,
        d = Bi.test(i),
        p = "svg" === e.tagName.toLowerCase(),
        g = (p ? "client" : "offset") + (d ? "Width" : "Height"),
        f = 100,
        m = "px" === r,
        v = "%" === r;
      return r === l || !u || ps[r] || ps[l]
        ? u
        : ("px" !== l && !m && (u = t(e, i, s, "px")),
          (h = e.getCTM && ls(e)),
          (!v && "%" !== l) || (!Oi[i] && !~i.indexOf("adius"))
            ? ((c[d ? "width" : "height"] = f + (m ? l : r)),
              (a =
                ~i.indexOf("adius") || ("em" === r && e.appendChild && !p)
                  ? e
                  : e.parentNode),
              h && (a = (e.ownerSVGElement || {}).parentNode),
              (a && a !== Ci && a.appendChild) || (a = Ci.body),
              (o = a._gsap) && v && o.width && d && o.time === Le.time
                ? Ct((u / o.width) * f)
                : ((v || "%" === l) && (c.position = ss(e, "position")),
                  a === e && (c.position = "static"),
                  a.appendChild(Ri),
                  (n = Ri[g]),
                  a.removeChild(Ri),
                  (c.position = "absolute"),
                  d && v && (((o = Tt(a)).time = Le.time), (o.width = a[g])),
                  Ct(m ? (n * u) / f : n && u ? (f / n) * u : 0)))
            : ((n = h ? e.getBBox()[d ? "width" : "height"] : e[g]),
              Ct(v ? (u / n) * f : (u / 100) * n)));
    },
    fs = function (t, e, i, s) {
      var r;
      return (
        Pi || as(),
        e in Ni &&
          "transform" !== e &&
          ~(e = Ni[e]).indexOf(",") &&
          (e = e.split(",")[0]),
        Oi[e] && "transform" !== e
          ? ((r = Es(t, s)),
            (r =
              "transformOrigin" !== e
                ? r[e]
                : r.svg
                ? r.origin
                : Ss(ss(t, es)) + " " + r.zOrigin + "px"))
          : (!(r = t.style[e]) ||
              "auto" === r ||
              s ||
              ~(r + "").indexOf("calc(")) &&
            (r =
              (ws[e] && ws[e](t, e, i)) ||
              ss(t, e) ||
              Et(t, e) ||
              ("opacity" === e ? 1 : 0)),
        i && !~(r + "").trim().indexOf(" ") ? gs(t, e, r, i) + i : r
      );
    },
    ms = function (t, e, i, s) {
      if (!i || "none" === i) {
        var r = ns(e, t, 1),
          n = r && ss(t, r, 1);
        n && n !== i
          ? ((e = r), (i = n))
          : "borderColor" === e && (i = ss(t, "borderTopColor"));
      }
      var a,
        o,
        h,
        u,
        l,
        c,
        d,
        p,
        g,
        f,
        m,
        v = new bi(this._pt, t.style, e, 0, 1, mi),
        _ = 0,
        w = 0;
      if (
        ((v.b = i),
        (v.e = s),
        (i += ""),
        "auto" == (s += "") &&
          ((t.style[e] = s), (s = ss(t, e) || s), (t.style[e] = i)),
        ze((a = [i, s])),
        (s = a[1]),
        (h = (i = a[0]).match(rt) || []),
        (s.match(rt) || []).length)
      ) {
        for (; (o = rt.exec(s)); )
          (d = o[0]),
            (g = s.substring(_, o.index)),
            l
              ? (l = (l + 1) % 5)
              : ("rgba(" !== g.substr(-5) && "hsla(" !== g.substr(-5)) ||
                (l = 1),
            d !== (c = h[w++] || "") &&
              ((u = parseFloat(c) || 0),
              (m = c.substr((u + "").length)),
              "=" === d.charAt(1) && (d = Pt(u, d) + m),
              (p = parseFloat(d)),
              (f = d.substr((p + "").length)),
              (_ = rt.lastIndex - f.length),
              f ||
                ((f = f || L.units[e] || m),
                _ === s.length && ((s += f), (v.e += f))),
              m !== f && (u = gs(t, e, c, f) || 0),
              (v._pt = {
                _next: v._pt,
                p: g || 1 === w ? g : ",",
                s: u,
                c: p - u,
                m: (l && l < 4) || "zIndex" === e ? Math.round : 0,
              }));
        v.c = _ < s.length ? s.substring(_, s.length) : "";
      } else v.r = "display" === e && "none" === s ? Xi : Yi;
      return at.test(s) && (v.e = 0), (this._pt = v), v;
    },
    vs = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%",
    },
    _s = function (t, e) {
      if (e.tween && e.tween._time === e.tween._dur) {
        var i,
          s,
          r,
          n = e.t,
          a = n.style,
          o = e.u,
          h = n._gsap;
        if ("all" === o || !0 === o) (a.cssText = ""), (s = 1);
        else
          for (r = (o = o.split(",")).length; --r > -1; )
            (i = o[r]),
              Oi[i] && ((s = 1), (i = "transformOrigin" === i ? es : ts)),
              cs(n, i);
        s &&
          (cs(n, ts),
          h &&
            (h.svg && n.removeAttribute("transform"),
            Es(n, 1),
            (h.uncache = 1)));
      }
    },
    ws = {
      clearProps: function (t, e, i, s, r) {
        if ("isFromStart" !== r.data) {
          var n = (t._pt = new bi(t._pt, e, i, 0, 0, _s));
          return (n.u = s), (n.pr = -10), (n.tween = r), t._props.push(i), 1;
        }
      },
    },
    ys = [1, 0, 0, 1, 0, 0],
    xs = {},
    bs = function (t) {
      return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
    },
    Ms = function (t) {
      var e = ss(t, ts);
      return bs(e) ? ys : e.substr(7).match(st).map(Ct);
    },
    As = function (t, e) {
      var i,
        s,
        r,
        n,
        a = t._gsap || Tt(t),
        o = t.style,
        h = Ms(t);
      return a.svg && t.getAttribute("transform")
        ? "1,0,0,1,0,0" ===
          (h = [
            (r = t.transform.baseVal.consolidate().matrix).a,
            r.b,
            r.c,
            r.d,
            r.e,
            r.f,
          ]).join(",")
          ? ys
          : h
        : (h !== ys ||
            t.offsetParent ||
            t === Fi ||
            a.svg ||
            ((r = o.display),
            (o.display = "block"),
            ((i = t.parentNode) && t.offsetParent) ||
              ((n = 1), (s = t.nextSibling), Fi.appendChild(t)),
            (h = Ms(t)),
            r ? (o.display = r) : cs(t, "display"),
            n &&
              (s
                ? i.insertBefore(t, s)
                : i
                ? i.appendChild(t)
                : Fi.removeChild(t))),
          e && h.length > 6 ? [h[0], h[1], h[4], h[5], h[12], h[13]] : h);
    },
    Ts = function (t, e, i, s, r, n) {
      var a,
        o,
        h,
        u = t._gsap,
        l = r || As(t, !0),
        c = u.xOrigin || 0,
        d = u.yOrigin || 0,
        p = u.xOffset || 0,
        g = u.yOffset || 0,
        f = l[0],
        m = l[1],
        v = l[2],
        _ = l[3],
        w = l[4],
        y = l[5],
        x = e.split(" "),
        b = parseFloat(x[0]) || 0,
        M = parseFloat(x[1]) || 0;
      i
        ? l !== ys &&
          (o = f * _ - m * v) &&
          ((h = b * (-m / o) + M * (f / o) - (f * y - m * w) / o),
          (b = b * (_ / o) + M * (-v / o) + (v * y - _ * w) / o),
          (M = h))
        : ((b = (a = us(t)).x + (~x[0].indexOf("%") ? (b / 100) * a.width : b)),
          (M =
            a.y + (~(x[1] || x[0]).indexOf("%") ? (M / 100) * a.height : M))),
        s || (!1 !== s && u.smooth)
          ? ((w = b - c),
            (y = M - d),
            (u.xOffset = p + (w * f + y * v) - w),
            (u.yOffset = g + (w * m + y * _) - y))
          : (u.xOffset = u.yOffset = 0),
        (u.xOrigin = b),
        (u.yOrigin = M),
        (u.smooth = !!s),
        (u.origin = e),
        (u.originIsAbsolute = !!i),
        (t.style[es] = "0px 0px"),
        n &&
          (ds(n, u, "xOrigin", c, b),
          ds(n, u, "yOrigin", d, M),
          ds(n, u, "xOffset", p, u.xOffset),
          ds(n, u, "yOffset", g, u.yOffset)),
        t.setAttribute("data-svg-origin", b + " " + M);
    },
    Es = function (t, e) {
      var i = t._gsap || new $e(t);
      if ("x" in i && !e && !i.uncache) return i;
      var s,
        r,
        n,
        a,
        o,
        h,
        u,
        l,
        c,
        d,
        p,
        g,
        f,
        m,
        v,
        _,
        w,
        y,
        x,
        b,
        M,
        A,
        T,
        E,
        S,
        C,
        F,
        P,
        R,
        D,
        k,
        O,
        z = t.style,
        j = i.scaleX < 0,
        I = "px",
        B = "deg",
        U = ss(t, es) || "0";
      return (
        (s = r = n = h = u = l = c = d = p = 0),
        (a = o = 1),
        (i.svg = !(!t.getCTM || !ls(t))),
        (m = As(t, i.svg)),
        i.svg &&
          ((E =
            (!i.uncache || "0px 0px" === U) &&
            !e &&
            t.getAttribute("data-svg-origin")),
          Ts(t, E || U, !!E || i.originIsAbsolute, !1 !== i.smooth, m)),
        (g = i.xOrigin || 0),
        (f = i.yOrigin || 0),
        m !== ys &&
          ((y = m[0]),
          (x = m[1]),
          (b = m[2]),
          (M = m[3]),
          (s = A = m[4]),
          (r = T = m[5]),
          6 === m.length
            ? ((a = Math.sqrt(y * y + x * x)),
              (o = Math.sqrt(M * M + b * b)),
              (h = y || x ? ji(x, y) * zi : 0),
              (c = b || M ? ji(b, M) * zi + h : 0) &&
                (o *= Math.abs(Math.cos(c * Li))),
              i.svg && ((s -= g - (g * y + f * b)), (r -= f - (g * x + f * M))))
            : ((O = m[6]),
              (D = m[7]),
              (F = m[8]),
              (P = m[9]),
              (R = m[10]),
              (k = m[11]),
              (s = m[12]),
              (r = m[13]),
              (n = m[14]),
              (u = (v = ji(O, R)) * zi),
              v &&
                ((E = A * (_ = Math.cos(-v)) + F * (w = Math.sin(-v))),
                (S = T * _ + P * w),
                (C = O * _ + R * w),
                (F = A * -w + F * _),
                (P = T * -w + P * _),
                (R = O * -w + R * _),
                (k = D * -w + k * _),
                (A = E),
                (T = S),
                (O = C)),
              (l = (v = ji(-b, R)) * zi),
              v &&
                ((_ = Math.cos(-v)),
                (k = M * (w = Math.sin(-v)) + k * _),
                (y = E = y * _ - F * w),
                (x = S = x * _ - P * w),
                (b = C = b * _ - R * w)),
              (h = (v = ji(x, y)) * zi),
              v &&
                ((E = y * (_ = Math.cos(v)) + x * (w = Math.sin(v))),
                (S = A * _ + T * w),
                (x = x * _ - y * w),
                (T = T * _ - A * w),
                (y = E),
                (A = S)),
              u &&
                Math.abs(u) + Math.abs(h) > 359.9 &&
                ((u = h = 0), (l = 180 - l)),
              (a = Ct(Math.sqrt(y * y + x * x + b * b))),
              (o = Ct(Math.sqrt(T * T + O * O))),
              (v = ji(A, T)),
              (c = Math.abs(v) > 2e-4 ? v * zi : 0),
              (p = k ? 1 / (k < 0 ? -k : k) : 0)),
          i.svg &&
            ((E = t.getAttribute("transform")),
            (i.forceCSS = t.setAttribute("transform", "") || !bs(ss(t, ts))),
            E && t.setAttribute("transform", E))),
        Math.abs(c) > 90 &&
          Math.abs(c) < 270 &&
          (j
            ? ((a *= -1),
              (c += h <= 0 ? 180 : -180),
              (h += h <= 0 ? 180 : -180))
            : ((o *= -1), (c += c <= 0 ? 180 : -180))),
        (e = e || i.uncache),
        (i.x =
          s -
          ((i.xPercent =
            s &&
            ((!e && i.xPercent) ||
              (Math.round(t.offsetWidth / 2) === Math.round(-s) ? -50 : 0)))
            ? (t.offsetWidth * i.xPercent) / 100
            : 0) +
          I),
        (i.y =
          r -
          ((i.yPercent =
            r &&
            ((!e && i.yPercent) ||
              (Math.round(t.offsetHeight / 2) === Math.round(-r) ? -50 : 0)))
            ? (t.offsetHeight * i.yPercent) / 100
            : 0) +
          I),
        (i.z = n + I),
        (i.scaleX = Ct(a)),
        (i.scaleY = Ct(o)),
        (i.rotation = Ct(h) + B),
        (i.rotationX = Ct(u) + B),
        (i.rotationY = Ct(l) + B),
        (i.skewX = c + B),
        (i.skewY = d + B),
        (i.transformPerspective = p + I),
        (i.zOrigin = parseFloat(U.split(" ")[2]) || 0) && (z[es] = Ss(U)),
        (i.xOffset = i.yOffset = 0),
        (i.force3D = L.force3D),
        (i.renderTransform = i.svg ? Os : ki ? ks : Fs),
        (i.uncache = 0),
        i
      );
    },
    Ss = function (t) {
      return (t = t.split(" "))[0] + " " + t[1];
    },
    Cs = function (t, e, i) {
      var s = ce(e);
      return Ct(parseFloat(e) + parseFloat(gs(t, "x", i + "px", s))) + s;
    },
    Fs = function (t, e) {
      (e.z = "0px"),
        (e.rotationY = e.rotationX = "0deg"),
        (e.force3D = 0),
        ks(t, e);
    },
    Ps = "0deg",
    Rs = "0px",
    Ds = ") ",
    ks = function (t, e) {
      var i = e || this,
        s = i.xPercent,
        r = i.yPercent,
        n = i.x,
        a = i.y,
        o = i.z,
        h = i.rotation,
        u = i.rotationY,
        l = i.rotationX,
        c = i.skewX,
        d = i.skewY,
        p = i.scaleX,
        g = i.scaleY,
        f = i.transformPerspective,
        m = i.force3D,
        v = i.target,
        _ = i.zOrigin,
        w = "",
        y = ("auto" === m && t && 1 !== t) || !0 === m;
      if (_ && (l !== Ps || u !== Ps)) {
        var x,
          b = parseFloat(u) * Li,
          M = Math.sin(b),
          A = Math.cos(b);
        (b = parseFloat(l) * Li),
          (x = Math.cos(b)),
          (n = Cs(v, n, M * x * -_)),
          (a = Cs(v, a, -Math.sin(b) * -_)),
          (o = Cs(v, o, A * x * -_ + _));
      }
      f !== Rs && (w += "perspective(" + f + Ds),
        (s || r) && (w += "translate(" + s + "%, " + r + "%) "),
        (y || n !== Rs || a !== Rs || o !== Rs) &&
          (w +=
            o !== Rs || y
              ? "translate3d(" + n + ", " + a + ", " + o + ") "
              : "translate(" + n + ", " + a + Ds),
        h !== Ps && (w += "rotate(" + h + Ds),
        u !== Ps && (w += "rotateY(" + u + Ds),
        l !== Ps && (w += "rotateX(" + l + Ds),
        (c === Ps && d === Ps) || (w += "skew(" + c + ", " + d + Ds),
        (1 === p && 1 === g) || (w += "scale(" + p + ", " + g + Ds),
        (v.style[ts] = w || "translate(0, 0)");
    },
    Os = function (t, e) {
      var i,
        s,
        r,
        n,
        a,
        o = e || this,
        h = o.xPercent,
        u = o.yPercent,
        l = o.x,
        c = o.y,
        d = o.rotation,
        p = o.skewX,
        g = o.skewY,
        f = o.scaleX,
        m = o.scaleY,
        v = o.target,
        _ = o.xOrigin,
        w = o.yOrigin,
        y = o.xOffset,
        x = o.yOffset,
        b = o.forceCSS,
        M = parseFloat(l),
        A = parseFloat(c);
      (d = parseFloat(d)),
        (p = parseFloat(p)),
        (g = parseFloat(g)) && ((p += g = parseFloat(g)), (d += g)),
        d || p
          ? ((d *= Li),
            (p *= Li),
            (i = Math.cos(d) * f),
            (s = Math.sin(d) * f),
            (r = Math.sin(d - p) * -m),
            (n = Math.cos(d - p) * m),
            p &&
              ((g *= Li),
              (a = Math.tan(p - g)),
              (r *= a = Math.sqrt(1 + a * a)),
              (n *= a),
              g &&
                ((a = Math.tan(g)), (i *= a = Math.sqrt(1 + a * a)), (s *= a))),
            (i = Ct(i)),
            (s = Ct(s)),
            (r = Ct(r)),
            (n = Ct(n)))
          : ((i = f), (n = m), (s = r = 0)),
        ((M && !~(l + "").indexOf("px")) || (A && !~(c + "").indexOf("px"))) &&
          ((M = gs(v, "x", l, "px")), (A = gs(v, "y", c, "px"))),
        (_ || w || y || x) &&
          ((M = Ct(M + _ - (_ * i + w * r) + y)),
          (A = Ct(A + w - (_ * s + w * n) + x))),
        (h || u) &&
          ((a = v.getBBox()),
          (M = Ct(M + (h / 100) * a.width)),
          (A = Ct(A + (u / 100) * a.height))),
        (a =
          "matrix(" +
          i +
          "," +
          s +
          "," +
          r +
          "," +
          n +
          "," +
          M +
          "," +
          A +
          ")"),
        v.setAttribute("transform", a),
        b && (v.style[ts] = a);
    },
    zs = function (t, e, i, s, r) {
      var n,
        a,
        o = 360,
        h = Y(r),
        u = parseFloat(r) * (h && ~r.indexOf("rad") ? zi : 1) - s,
        l = s + u + "deg";
      return (
        h &&
          ("short" === (n = r.split("_")[1]) &&
            (u %= o) != u % 180 &&
            (u += u < 0 ? o : -360),
          "cw" === n && u < 0
            ? (u = ((u + 36e9) % o) - ~~(u / o) * o)
            : "ccw" === n && u > 0 && (u = ((u - 36e9) % o) - ~~(u / o) * o)),
        (t._pt = a = new bi(t._pt, e, i, s, u, Vi)),
        (a.e = l),
        (a.u = "deg"),
        t._props.push(i),
        a
      );
    },
    Ls = function (t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    },
    js = function (t, e, i) {
      var s,
        r,
        n,
        a,
        o,
        h,
        u,
        l = Ls({}, i._gsap),
        c = i.style;
      for (r in (l.svg
        ? ((n = i.getAttribute("transform")),
          i.setAttribute("transform", ""),
          (c[ts] = e),
          (s = Es(i, 1)),
          cs(i, ts),
          i.setAttribute("transform", n))
        : ((n = getComputedStyle(i)[ts]),
          (c[ts] = e),
          (s = Es(i, 1)),
          (c[ts] = n)),
      Oi))
        (n = l[r]) !== (a = s[r]) &&
          "perspective,force3D,transformOrigin,svgOrigin".indexOf(r) < 0 &&
          ((o = ce(n) !== (u = ce(a)) ? gs(i, r, n, u) : parseFloat(n)),
          (h = parseFloat(a)),
          (t._pt = new bi(t._pt, s, r, o, h - o, qi)),
          (t._pt.u = u || 0),
          t._props.push(r));
      Ls(s, l);
    };
  St("padding,margin,Width,Radius", function (t, e) {
    var i = "Top",
      s = "Right",
      r = "Bottom",
      n = "Left",
      a = (e < 3 ? [i, s, r, n] : [i + n, i + s, r + s, r + n]).map(function (
        i
      ) {
        return e < 2 ? t + i : "border" + i + t;
      });
    ws[e > 1 ? "border" + t : t] = function (t, e, i, s, r) {
      var n, o;
      if (arguments.length < 4)
        return (
          (n = a.map(function (e) {
            return fs(t, e, i);
          })),
          5 === (o = n.join(" ")).split(n[0]).length ? n[0] : o
        );
      (n = (s + "").split(" ")),
        (o = {}),
        a.forEach(function (t, e) {
          return (o[t] = n[e] = n[e] || n[((e - 1) / 2) | 0]);
        }),
        t.init(e, o, r);
    };
  });
  var Is,
    Bs,
    Us = {
      name: "css",
      register: as,
      targetTest: function (t) {
        return t.style && t.nodeType;
      },
      init: function (t, e, i, s, r) {
        var n,
          a,
          o,
          h,
          u,
          l,
          c,
          d,
          p,
          g,
          f,
          m,
          v,
          _,
          w,
          y,
          x,
          b,
          M,
          A = this._props,
          T = t.style,
          E = i.vars.startAt;
        for (c in (Pi || as(), e))
          if (
            "autoRound" !== c &&
            ((a = e[c]), !wt[c] || !ii(c, e, i, s, t, r))
          )
            if (
              ((u = typeof a),
              (l = ws[c]),
              "function" === u && (u = typeof (a = a.call(i, s, t, r))),
              "string" === u && ~a.indexOf("random(") && (a = xe(a)),
              l)
            )
              l(this, t, c, a, i) && (w = 1);
            else if ("--" === c.substr(0, 2))
              (n = (getComputedStyle(t).getPropertyValue(c) + "").trim()),
                (a += ""),
                (ke.lastIndex = 0),
                ke.test(n) || ((d = ce(n)), (p = ce(a))),
                p ? d !== p && (n = gs(t, c, n, p) + p) : d && (a += d),
                this.add(T, "setProperty", n, a, s, r, 0, 0, c),
                A.push(c);
            else if ("undefined" !== u) {
              if (
                (E && c in E
                  ? ((n =
                      "function" == typeof E[c] ? E[c].call(i, s, t, r) : E[c]),
                    Y(n) && ~n.indexOf("random(") && (n = xe(n)),
                    ce(n + "") || (n += L.units[c] || ce(fs(t, c)) || ""),
                    "=" === (n + "").charAt(1) && (n = fs(t, c)))
                  : (n = fs(t, c)),
                (h = parseFloat(n)),
                (g = "string" === u && "=" === a.charAt(1) && a.substr(0, 2)) &&
                  (a = a.substr(2)),
                (o = parseFloat(a)),
                c in Ni &&
                  ("autoAlpha" === c &&
                    (1 === h &&
                      "hidden" === fs(t, "visibility") &&
                      o &&
                      (h = 0),
                    ds(
                      this,
                      T,
                      "visibility",
                      h ? "inherit" : "hidden",
                      o ? "inherit" : "hidden",
                      !o
                    )),
                  "scale" !== c &&
                    "transform" !== c &&
                    ~(c = Ni[c]).indexOf(",") &&
                    (c = c.split(",")[0])),
                (f = c in Oi))
              )
                if (
                  (m ||
                    (((v = t._gsap).renderTransform && !e.parseTransform) ||
                      Es(t, e.parseTransform),
                    (_ = !1 !== e.smoothOrigin && v.smooth),
                    ((m = this._pt =
                      new bi(
                        this._pt,
                        T,
                        ts,
                        0,
                        1,
                        v.renderTransform,
                        v,
                        0,
                        -1
                      )).dep = 1)),
                  "scale" === c)
                )
                  (this._pt = new bi(
                    this._pt,
                    v,
                    "scaleY",
                    v.scaleY,
                    (g ? Pt(v.scaleY, g + o) : o) - v.scaleY || 0
                  )),
                    A.push("scaleY", c),
                    (c += "X");
                else {
                  if ("transformOrigin" === c) {
                    (x = void 0),
                      (b = void 0),
                      (M = void 0),
                      (b = (x = (y = a).split(" "))[0]),
                      (M = x[1] || "50%"),
                      ("top" !== b &&
                        "bottom" !== b &&
                        "left" !== M &&
                        "right" !== M) ||
                        ((y = b), (b = M), (M = y)),
                      (x[0] = vs[b] || b),
                      (x[1] = vs[M] || M),
                      (a = x.join(" ")),
                      v.svg
                        ? Ts(t, a, 0, _, 0, this)
                        : ((p = parseFloat(a.split(" ")[2]) || 0) !==
                            v.zOrigin && ds(this, v, "zOrigin", v.zOrigin, p),
                          ds(this, T, c, Ss(n), Ss(a)));
                    continue;
                  }
                  if ("svgOrigin" === c) {
                    Ts(t, a, 1, _, 0, this);
                    continue;
                  }
                  if (c in xs) {
                    zs(this, v, c, h, g ? Pt(h, g + a) : a);
                    continue;
                  }
                  if ("smoothOrigin" === c) {
                    ds(this, v, "smooth", v.smooth, a);
                    continue;
                  }
                  if ("force3D" === c) {
                    v[c] = a;
                    continue;
                  }
                  if ("transform" === c) {
                    js(this, a, t);
                    continue;
                  }
                }
              else c in T || (c = ns(c) || c);
              if (
                f ||
                ((o || 0 === o) && (h || 0 === h) && !Ui.test(a) && c in T)
              )
                o || (o = 0),
                  (d = (n + "").substr((h + "").length)) !==
                    (p = ce(a) || (c in L.units ? L.units[c] : d)) &&
                    (h = gs(t, c, n, p)),
                  (this._pt = new bi(
                    this._pt,
                    f ? v : T,
                    c,
                    h,
                    (g ? Pt(h, g + o) : o) - h,
                    f || ("px" !== p && "zIndex" !== c) || !1 === e.autoRound
                      ? qi
                      : Wi
                  )),
                  (this._pt.u = p || 0),
                  d !== p && "%" !== p && ((this._pt.b = n), (this._pt.r = Gi));
              else if (c in T) ms.call(this, t, c, n, g ? g + a : a);
              else {
                if (!(c in t)) {
                  dt(c, a);
                  continue;
                }
                this.add(t, c, n || t[c], g ? g + a : a, s, r);
              }
              A.push(c);
            }
        w && xi(this);
      },
      get: fs,
      aliases: Ni,
      getSetter: function (t, e, i) {
        var s = Ni[e];
        return (
          s && s.indexOf(",") < 0 && (e = s),
          e in Oi && e !== es && (t._gsap.x || fs(t, "x"))
            ? i && Di === i
              ? "scale" === e
                ? Qi
                : Zi
              : (Di = i || {}) && ("scale" === e ? Ki : Ji)
            : t.style && !$(t.style[e])
            ? Hi
            : ~e.indexOf("-")
            ? $i
            : pi(t, e)
        );
      },
      core: { _removeProperty: cs, _getMatrix: As },
    };
  (Ei.utils.checkPrefix = ns),
    (Bs = St(
      "x,y,z,scale,scaleX,scaleY,xPercent,yPercent" +
        "," +
        (Is = "rotation,rotationX,rotationY,skewX,skewY") +
        ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
      function (t) {
        Oi[t] = 1;
      }
    )),
    St(Is, function (t) {
      (L.units[t] = "deg"), (xs[t] = 1);
    }),
    (Ni[Bs[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + Is),
    St(
      "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
      function (t) {
        var e = t.split(":");
        Ni[e[1]] = Bs[e[0]];
      }
    ),
    St(
      "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
      function (t) {
        L.units[t] = "px";
      }
    ),
    Ei.registerPlugin(Us);
  var Ns = Ei.registerPlugin(Us) || Ei;
  Ns.core.Tween;
  class qs {
    constructor(t) {
      (this.page = t.page),
        (this.hideCursor = t.hideCursor),
        (this.sections = []),
        (this.tween = null),
        (this.isFirefox = n.testBrowser("firefox")),
        (this.isIE = n.testBrowser("ie")),
        (this.m = this.isIE ? 0.12 : 0.09),
        (this.winW = window.innerWidth),
        (this.winH = window.innerHeight),
        (this.isMobile = n.isTouch()),
        (this.scrollingElement = this.isMobile
          ? document.documentElement
          : document.getElementById("main")),
        (this.pointer = t.pointer),
        (this.pausePointer = !1),
        (this.sectionsL = this.sections.length),
        (this.paralax = t.paralax || []),
        (this.max = document.body.scrollHeight),
        (this.maxVirtual = 0),
        (this.maxDelta = 80),
        (this.touch = { prev: 0, start: 0 }),
        (this.target = 0),
        (this.event = {}),
        (this.pause = !1),
        (this.data = { t: 0, c: 0, l: 0 }),
        (this.isDown = !1),
        (this.onlyVirtual = !1),
        (this.delta = 0),
        (this.pauseEvents = !1),
        (this.render = this.render.bind(this)),
        (this.touchStart = this.touchStart.bind(this)),
        (this.clickStart = this.clickStart.bind(this)),
        (this.clickUp = this.clickUp.bind(this)),
        (this.mouseMove = this.mouseMove.bind(this)),
        (this.onMove = this.onMove.bind(this)),
        (this.eventsManager = this.eventsManager.bind(this)),
        (this.resize = this.resize.bind(this)),
        this.init();
    }
    init() {
      this.updateSections(),
        this.isMobile
          ? (this.scrollingElement.addEventListener("scroll", () => {
              this.handleScroll();
            }),
            document.addEventListener("touchstart", this.touchStart, {
              passive: !0,
            }),
            document.addEventListener("touchmove", this.onMove, {
              passive: !0,
            }))
          : (document.addEventListener("mouseup", this.clickUp),
            document.addEventListener("mousemove", this.onMove),
            document.addEventListener("wheel", this.onMove),
            document.addEventListener("keydown", this.onMove)),
        this.resize(),
        this.updateElements(0),
        window.addEventListener("resize", () => {
          clearTimeout(this.resizedFinished),
            (this.resizedFinished = setTimeout(() => {
              this.resize();
            }, 250));
        }),
        this.render();
    }
    handleScroll() {
      (this.target = -this.scrollingElement.scrollTop), this.update();
    }
    goTo(t, e) {
      const i = !window.isNaN(t),
        s = n.isElement(t) || i ? t : document.querySelector(t);
      if (s || i) {
        let r = i ? t : n.getPosition(s).y;
        (this.isDown = r > this.data.c),
          this.timeOut && clearTimeout(this.timeOut),
          this.isMobile
            ? ((r = r),
              Ns.to(this.scrollingElement, {
                duration: e ? 0 : 0.5,
                scrollTop: r,
                ease: "power3.out",
              }))
            : this.scrollTo(r);
      }
    }
    updateSections(t) {
      (this.sections =
        t ||
        Array.from(document.querySelectorAll("[data-scroll-section]")).map(
          (t) => ({ $el: t })
        )),
        (this.sectionsL = this.sections.length);
      for (var e = 0; e < this.sectionsL; e++) {
        var i = this.sections[e];
        null == i.$el && (i.$el = document.querySelector(i.selector)),
          i.$el.classList.add("hide"),
          i.$el.classList.add("section"),
          (i.rect = {}),
          (i.out = !0);
      }
      this.resize();
    }
    touchStart(t) {
      (this.touch.prev = this.target),
        (this.touch.start = t.targetTouches[0].pageY);
    }
    clickStart(t) {
      (this.clickdown = !0),
        (this.touch.prev = this.target),
        (this.touch.start = t.clientY);
    }
    clickUp(t) {
      this.clickdown = !1;
    }
    onMove(t) {
      (this.event = t),
        this.prevent(t),
        this.pauseEvents ||
          this.pause ||
          (requestAnimationFrame(this.eventsManager), (this.pauseEvents = !0));
    }
    prevent(t) {
      this.pause ||
        !t.cancelable ||
        "keydown" === t.type ||
        this.isMobile ||
        t.preventDefault();
    }
    eventsManager() {
      switch (this.event.type) {
        case "wheel":
          this.wheel();
          break;
        case "mousemove":
          this.mouseMove();
          break;
        case "touchmove":
          this.touchMove();
          break;
        case "keydown":
          this.keyDown();
      }
    }
    touchMove() {
      this.tween && this.tween.kill();
      var t = this.event.targetTouches[0].pageY - this.touch.start;
      (this.delta = 2.9 * t),
        (this.target = this.delta + this.touch.prev),
        this.update();
    }
    mouseMove() {
      (this.pauseEvents = !1),
        (this.pausePointer = !0),
        (this.pointer.style.pointerEvents = "none");
    }
    wheel() {
      this.pausePointer = !1;
      var t = this.event.wheelDeltaY || -1 * this.event.deltaY;
      this.isFirefox && this.event.deltaMode && (t *= 60),
        this.isIE && (t *= 2),
        (t *= 0.554),
        this.onlyVirtual &&
          (t =
            t < 0
              ? -Math.min(Math.abs(0.7 * t), Math.abs(0.4 * this.maxDelta))
              : Math.min(Math.abs(0.7 * t), Math.abs(0.4 * this.maxDelta))),
        (this.delta = t),
        (this.target += this.delta),
        this.update();
    }
    keyDown() {
      var t,
        e = this.event.keyCode;
      (38 !== e && 40 !== e) ||
        ((t = 38 === e ? 80 : 40 === e ? -80 : 0),
        (this.delta = t),
        (this.target += this.delta)),
        this.update();
    }
    scrollTo(t, e) {
      this.isMobile
        ? this.goTo(t, e)
        : ((this.target = n.round(Math.max(Math.min(-t, 0), -this.max))),
          this.update());
    }
    update() {
      this.onlyVirtual
        ? (this.target =
            0 === this.maxVirtual
              ? n.round(Math.min(this.target, 0))
              : n.round(Math.max(Math.min(this.target, 0), -this.maxVirtual)))
        : (this.target = n.round(
            Math.max(Math.min(this.target, 0), -this.max)
          )),
        this.scroll(-this.target),
        (this.pauseEvents = !1);
    }
    scroll(t) {
      this.data.t = n.round(t);
    }
    getMax() {
      var t = this.page.offsetHeight,
        e = window.innerHeight;
      this.isMobile && (t = this.page.scrollHeight),
        (this.max = Math.max(t - e, 0)),
        (this.data.t = n.round(Math.min(this.data.t, this.max))),
        (this.data.c = this.data.t),
        (this.data.l = this.data.t);
    }
    render() {
      this.data.c += this.m * (this.data.t - this.data.c);
      var t = n.round(this.data.c);
      this.data.c > this.data.l
        ? (this.isDown = !0)
        : this.data.c < this.data.l && (this.isDown = !1),
        t !== this.data.t || this.isMobile
          ? (this.updateElements(t),
            this.pausePointer ||
              ((this.pausePointer = !0),
              this.isMobile ||
                ((this.pointer.style.pointerEvents = "all"),
                this.hideCursor && this.hideCursor())))
          : ((this.pausePointer = !0),
            (this.pointer.style.pointerEvents = "none")),
        (this.data.l = this.data.c),
        requestAnimationFrame(this.render);
    }
    addParalax(t) {
      -1 === this.paralax.indexOf(t) && this.paralax.push(t);
    }
    removeParalax(t) {
      const e = this.paralax.indexOf(t);
      -1 !== e && this.paralax.splice(e, 1);
    }
    updateElements(t) {
      if (
        (this.paralax &&
          this.paralax.forEach((e) => e(t, this.max, this.delta, this.isDown)),
        !this.onlyVirtual && !this.isMobile)
      )
        for (var e = 0; e < this.sectionsL; ++e) {
          var i = this.sections[e];
          t >= i.rect.top && t <= i.rect.bottom
            ? ((i.out = !1),
              i.$el.classList.remove("hide"),
              this.translate(i, t))
            : i.out ||
              ((i.out = !0), this.translate(i, t), i.$el.classList.add("hide"));
        }
    }
    translate(t, e) {
      this.isMobile || (t.$el.style.transform = `translate3d(0, ${-e}px, 0)`);
    }
    resize() {
      this.getMax(),
        (this.winW = window.innerWidth),
        (this.winH = window.innerHeight),
        (this.isMobile = n.isTouch());
      for (var t = 0; t < this.sectionsL; ++t) {
        var e = this.sections[t];
        this.translate(e, this.data.t);
        var i = e.$el.getBoundingClientRect().top,
          s = i + e.$el.offsetHeight;
        (e.rect.top = i - this.winH + this.data.t),
          (e.rect.bottom = s + this.data.t);
      }
      (this.spaceDelta = 0.7 * this.winH), this.update();
    }
    resizeAnimate() {
      let t = { c: this.data.t, t: this.data.t };
      this.getMax(),
        (t.t = this.data.t),
        (this.winW = window.innerWidth),
        (this.winH = window.innerHeight),
        (this.isMobile = n.isTouch());
      for (var e = 0; e < this.sectionsL; ++e) {
        var i = this.sections[e];
        Ns.fromTo(
          t,
          { c: t.c },
          {
            duration: 0.5,
            c: t.t,
            ease: "Power2.easeOut",
            onUpdate: () => {
              this.translate(i, t.c);
              var e = i.$el.getBoundingClientRect().top,
                s = e + i.$el.offsetHeight;
              (i.rect.top = e - this.winH + t.c), (i.rect.bottom = s + t.c);
            },
          }
        );
      }
      (this.spaceDelta = 0.7 * this.winH), this.update();
    }
  }
  function Vs(t) {
    let e = t[0],
      i = t[1],
      s = t[2];
    return Math.sqrt(e * e + i * i + s * s);
  }
  function Gs(t, e) {
    return (t[0] = e[0]), (t[1] = e[1]), (t[2] = e[2]), t;
  }
  function Ws(t, e, i) {
    return (t[0] = e[0] + i[0]), (t[1] = e[1] + i[1]), (t[2] = e[2] + i[2]), t;
  }
  function Ys(t, e, i) {
    return (t[0] = e[0] - i[0]), (t[1] = e[1] - i[1]), (t[2] = e[2] - i[2]), t;
  }
  function Xs(t, e, i) {
    return (t[0] = e[0] * i), (t[1] = e[1] * i), (t[2] = e[2] * i), t;
  }
  function Hs(t) {
    let e = t[0],
      i = t[1],
      s = t[2];
    return e * e + i * i + s * s;
  }
  function $s(t, e) {
    let i = e[0],
      s = e[1],
      r = e[2],
      n = i * i + s * s + r * r;
    return (
      n > 0 && (n = 1 / Math.sqrt(n)),
      (t[0] = e[0] * n),
      (t[1] = e[1] * n),
      (t[2] = e[2] * n),
      t
    );
  }
  function Zs(t, e) {
    return t[0] * e[0] + t[1] * e[1] + t[2] * e[2];
  }
  function Qs(t, e, i) {
    let s = e[0],
      r = e[1],
      n = e[2],
      a = i[0],
      o = i[1],
      h = i[2];
    return (
      (t[0] = r * h - n * o), (t[1] = n * a - s * h), (t[2] = s * o - r * a), t
    );
  }
  const Ks = (function () {
    const t = [0, 0, 0],
      e = [0, 0, 0];
    return function (i, s) {
      Gs(t, i), Gs(e, s), $s(t, t), $s(e, e);
      let r = Zs(t, e);
      return r > 1 ? 0 : r < -1 ? Math.PI : Math.acos(r);
    };
  })();
  class Js extends Array {
    constructor(t = 0, e = t, i = t) {
      return super(t, e, i), this;
    }
    get x() {
      return this[0];
    }
    get y() {
      return this[1];
    }
    get z() {
      return this[2];
    }
    set x(t) {
      this[0] = t;
    }
    set y(t) {
      this[1] = t;
    }
    set z(t) {
      this[2] = t;
    }
    set(t, e = t, i = t) {
      return t.length
        ? this.copy(t)
        : ((function (t, e, i, s) {
            (t[0] = e), (t[1] = i), (t[2] = s);
          })(this, t, e, i),
          this);
    }
    copy(t) {
      return Gs(this, t), this;
    }
    add(t, e) {
      return e ? Ws(this, t, e) : Ws(this, this, t), this;
    }
    sub(t, e) {
      return e ? Ys(this, t, e) : Ys(this, this, t), this;
    }
    multiply(t) {
      var e, i, s;
      return (
        t.length
          ? ((i = this),
            (s = t),
            ((e = this)[0] = i[0] * s[0]),
            (e[1] = i[1] * s[1]),
            (e[2] = i[2] * s[2]))
          : Xs(this, this, t),
        this
      );
    }
    divide(t) {
      var e, i, s;
      return (
        t.length
          ? ((i = this),
            (s = t),
            ((e = this)[0] = i[0] / s[0]),
            (e[1] = i[1] / s[1]),
            (e[2] = i[2] / s[2]))
          : Xs(this, this, 1 / t),
        this
      );
    }
    inverse(t = this) {
      var e, i;
      return (
        (i = t),
        ((e = this)[0] = 1 / i[0]),
        (e[1] = 1 / i[1]),
        (e[2] = 1 / i[2]),
        this
      );
    }
    len() {
      return Vs(this);
    }
    distance(t) {
      return t
        ? (function (t, e) {
            let i = e[0] - t[0],
              s = e[1] - t[1],
              r = e[2] - t[2];
            return Math.sqrt(i * i + s * s + r * r);
          })(this, t)
        : Vs(this);
    }
    squaredLen() {
      return Hs(this);
    }
    squaredDistance(t) {
      return t
        ? (function (t, e) {
            let i = e[0] - t[0],
              s = e[1] - t[1],
              r = e[2] - t[2];
            return i * i + s * s + r * r;
          })(this, t)
        : Hs(this);
    }
    negate(t = this) {
      var e, i;
      return (
        (i = t), ((e = this)[0] = -i[0]), (e[1] = -i[1]), (e[2] = -i[2]), this
      );
    }
    cross(t, e) {
      return e ? Qs(this, t, e) : Qs(this, this, t), this;
    }
    scale(t) {
      return Xs(this, this, t), this;
    }
    normalize() {
      return $s(this, this), this;
    }
    dot(t) {
      return Zs(this, t);
    }
    equals(t) {
      return (e = t), this[0] === e[0] && this[1] === e[1] && this[2] === e[2];
      var e;
    }
    applyMatrix3(t) {
      return (
        (function (t, e, i) {
          let s = e[0],
            r = e[1],
            n = e[2];
          (t[0] = s * i[0] + r * i[3] + n * i[6]),
            (t[1] = s * i[1] + r * i[4] + n * i[7]),
            (t[2] = s * i[2] + r * i[5] + n * i[8]);
        })(this, this, t),
        this
      );
    }
    applyMatrix4(t) {
      return (
        (function (t, e, i) {
          let s = e[0],
            r = e[1],
            n = e[2],
            a = i[3] * s + i[7] * r + i[11] * n + i[15];
          (a = a || 1),
            (t[0] = (i[0] * s + i[4] * r + i[8] * n + i[12]) / a),
            (t[1] = (i[1] * s + i[5] * r + i[9] * n + i[13]) / a),
            (t[2] = (i[2] * s + i[6] * r + i[10] * n + i[14]) / a);
        })(this, this, t),
        this
      );
    }
    scaleRotateMatrix4(t) {
      return (
        (function (t, e, i) {
          let s = e[0],
            r = e[1],
            n = e[2],
            a = i[3] * s + i[7] * r + i[11] * n + i[15];
          (a = a || 1),
            (t[0] = (i[0] * s + i[4] * r + i[8] * n) / a),
            (t[1] = (i[1] * s + i[5] * r + i[9] * n) / a),
            (t[2] = (i[2] * s + i[6] * r + i[10] * n) / a);
        })(this, this, t),
        this
      );
    }
    applyQuaternion(t) {
      return (
        (function (t, e, i) {
          let s = e[0],
            r = e[1],
            n = e[2],
            a = i[0],
            o = i[1],
            h = i[2],
            u = o * n - h * r,
            l = h * s - a * n,
            c = a * r - o * s,
            d = o * c - h * l,
            p = h * u - a * c,
            g = a * l - o * u,
            f = 2 * i[3];
          (u *= f),
            (l *= f),
            (c *= f),
            (d *= 2),
            (p *= 2),
            (g *= 2),
            (t[0] = s + u + d),
            (t[1] = r + l + p),
            (t[2] = n + c + g);
        })(this, this, t),
        this
      );
    }
    angle(t) {
      return Ks(this, t);
    }
    lerp(t, e) {
      return (
        (function (t, e, i, s) {
          let r = e[0],
            n = e[1],
            a = e[2];
          (t[0] = r + s * (i[0] - r)),
            (t[1] = n + s * (i[1] - n)),
            (t[2] = a + s * (i[2] - a));
        })(this, this, t, e),
        this
      );
    }
    clone() {
      return new Js(this[0], this[1], this[2]);
    }
    fromArray(t, e = 0) {
      return (this[0] = t[e]), (this[1] = t[e + 1]), (this[2] = t[e + 2]), this;
    }
    toArray(t = [], e = 0) {
      return (t[e] = this[0]), (t[e + 1] = this[1]), (t[e + 2] = this[2]), t;
    }
    transformDirection(t) {
      const e = this[0],
        i = this[1],
        s = this[2];
      return (
        (this[0] = t[0] * e + t[4] * i + t[8] * s),
        (this[1] = t[1] * e + t[5] * i + t[9] * s),
        (this[2] = t[2] * e + t[6] * i + t[10] * s),
        this.normalize()
      );
    }
  }
  const tr = new Js();
  let er = 1;
  class ir {
    constructor({
      canvas: t = document.createElement("canvas"),
      width: e = 300,
      height: i = 150,
      dpr: s = 1,
      alpha: r = !1,
      depth: n = !0,
      stencil: a = !1,
      antialias: o = !1,
      premultipliedAlpha: h = !1,
      preserveDrawingBuffer: u = !1,
      powerPreference: l = "default",
      autoClear: c = !0,
      webgl: d = 2,
    } = {}) {
      const p = {
        alpha: r,
        depth: n,
        stencil: a,
        antialias: o,
        premultipliedAlpha: h,
        preserveDrawingBuffer: u,
        powerPreference: l,
      };
      (this.dpr = s),
        (this.alpha = r),
        (this.color = !0),
        (this.depth = n),
        (this.stencil = a),
        (this.premultipliedAlpha = h),
        (this.autoClear = c),
        (this.id = er++),
        2 === d && (this.gl = t.getContext("webgl2", p)),
        (this.isWebgl2 = !!this.gl),
        this.gl || (this.gl = t.getContext("webgl", p)),
        this.gl || console.error("unable to create webgl context"),
        (this.gl.renderer = this),
        this.setSize(e, i),
        (this.state = {}),
        (this.state.blendFunc = { src: this.gl.ONE, dst: this.gl.ZERO }),
        (this.state.blendEquation = { modeRGB: this.gl.FUNC_ADD }),
        (this.state.cullFace = null),
        (this.state.frontFace = this.gl.CCW),
        (this.state.depthMask = !0),
        (this.state.depthFunc = this.gl.LESS),
        (this.state.premultiplyAlpha = !1),
        (this.state.flipY = !1),
        (this.state.unpackAlignment = 4),
        (this.state.framebuffer = null),
        (this.state.viewport = { x: 0, y: 0, width: null, height: null }),
        (this.state.textureUnits = []),
        (this.state.activeTextureUnit = 0),
        (this.state.boundBuffer = null),
        (this.state.uniformLocations = new Map()),
        (this.extensions = {}),
        this.isWebgl2
          ? (this.getExtension("EXT_color_buffer_float"),
            this.getExtension("OES_texture_float_linear"))
          : (this.getExtension("OES_texture_float"),
            this.getExtension("OES_texture_float_linear"),
            this.getExtension("OES_texture_half_float"),
            this.getExtension("OES_texture_half_float_linear"),
            this.getExtension("OES_element_index_uint"),
            this.getExtension("OES_standard_derivatives"),
            this.getExtension("EXT_sRGB"),
            this.getExtension("WEBGL_depth_texture"),
            this.getExtension("WEBGL_draw_buffers")),
        this.getExtension("WEBGL_compressed_texture_astc"),
        this.getExtension("EXT_texture_compression_bptc"),
        this.getExtension("WEBGL_compressed_texture_s3tc"),
        this.getExtension("WEBGL_compressed_texture_etc1"),
        this.getExtension("WEBGL_compressed_texture_pvrtc"),
        this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),
        (this.vertexAttribDivisor = this.getExtension(
          "ANGLE_instanced_arrays",
          "vertexAttribDivisor",
          "vertexAttribDivisorANGLE"
        )),
        (this.drawArraysInstanced = this.getExtension(
          "ANGLE_instanced_arrays",
          "drawArraysInstanced",
          "drawArraysInstancedANGLE"
        )),
        (this.drawElementsInstanced = this.getExtension(
          "ANGLE_instanced_arrays",
          "drawElementsInstanced",
          "drawElementsInstancedANGLE"
        )),
        (this.createVertexArray = this.getExtension(
          "OES_vertex_array_object",
          "createVertexArray",
          "createVertexArrayOES"
        )),
        (this.bindVertexArray = this.getExtension(
          "OES_vertex_array_object",
          "bindVertexArray",
          "bindVertexArrayOES"
        )),
        (this.deleteVertexArray = this.getExtension(
          "OES_vertex_array_object",
          "deleteVertexArray",
          "deleteVertexArrayOES"
        )),
        (this.drawBuffers = this.getExtension(
          "WEBGL_draw_buffers",
          "drawBuffers",
          "drawBuffersWEBGL"
        )),
        (this.parameters = {}),
        (this.parameters.maxTextureUnits = this.gl.getParameter(
          this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS
        )),
        (this.parameters.maxAnisotropy = this.getExtension(
          "EXT_texture_filter_anisotropic"
        )
          ? this.gl.getParameter(
              this.getExtension("EXT_texture_filter_anisotropic")
                .MAX_TEXTURE_MAX_ANISOTROPY_EXT
            )
          : 0);
    }
    setSize(t, e) {
      (this.width = t),
        (this.height = e),
        (this.gl.canvas.width = t * this.dpr),
        (this.gl.canvas.height = e * this.dpr),
        Object.assign(this.gl.canvas.style, {
          width: t + "px",
          height: e + "px",
        });
    }
    setViewport(t, e, i = 0, s = 0) {
      (this.state.viewport.width === t && this.state.viewport.height === e) ||
        ((this.state.viewport.width = t),
        (this.state.viewport.height = e),
        (this.state.viewport.x = i),
        (this.state.viewport.y = s),
        this.gl.viewport(i, s, t, e));
    }
    setScissor(t, e, i = 0, s = 0) {
      this.gl.scissor(i, s, t, e);
    }
    enable(t) {
      !0 !== this.state[t] && (this.gl.enable(t), (this.state[t] = !0));
    }
    disable(t) {
      !1 !== this.state[t] && (this.gl.disable(t), (this.state[t] = !1));
    }
    setBlendFunc(t, e, i, s) {
      (this.state.blendFunc.src === t &&
        this.state.blendFunc.dst === e &&
        this.state.blendFunc.srcAlpha === i &&
        this.state.blendFunc.dstAlpha === s) ||
        ((this.state.blendFunc.src = t),
        (this.state.blendFunc.dst = e),
        (this.state.blendFunc.srcAlpha = i),
        (this.state.blendFunc.dstAlpha = s),
        void 0 !== i
          ? this.gl.blendFuncSeparate(t, e, i, s)
          : this.gl.blendFunc(t, e));
    }
    setBlendEquation(t, e) {
      (t = t || this.gl.FUNC_ADD),
        (this.state.blendEquation.modeRGB === t &&
          this.state.blendEquation.modeAlpha === e) ||
          ((this.state.blendEquation.modeRGB = t),
          (this.state.blendEquation.modeAlpha = e),
          void 0 !== e
            ? this.gl.blendEquationSeparate(t, e)
            : this.gl.blendEquation(t));
    }
    setCullFace(t) {
      this.state.cullFace !== t &&
        ((this.state.cullFace = t), this.gl.cullFace(t));
    }
    setFrontFace(t) {
      this.state.frontFace !== t &&
        ((this.state.frontFace = t), this.gl.frontFace(t));
    }
    setDepthMask(t) {
      this.state.depthMask !== t &&
        ((this.state.depthMask = t), this.gl.depthMask(t));
    }
    setDepthFunc(t) {
      this.state.depthFunc !== t &&
        ((this.state.depthFunc = t), this.gl.depthFunc(t));
    }
    activeTexture(t) {
      this.state.activeTextureUnit !== t &&
        ((this.state.activeTextureUnit = t),
        this.gl.activeTexture(this.gl.TEXTURE0 + t));
    }
    bindFramebuffer({
      target: t = this.gl.FRAMEBUFFER,
      buffer: e = null,
    } = {}) {
      this.state.framebuffer !== e &&
        ((this.state.framebuffer = e), this.gl.bindFramebuffer(t, e));
    }
    getExtension(t, e, i) {
      return e && this.gl[e]
        ? this.gl[e].bind(this.gl)
        : (this.extensions[t] || (this.extensions[t] = this.gl.getExtension(t)),
          e
            ? this.extensions[t]
              ? this.extensions[t][i].bind(this.extensions[t])
              : null
            : this.extensions[t]);
    }
    sortOpaque(t, e) {
      return t.renderOrder !== e.renderOrder
        ? t.renderOrder - e.renderOrder
        : t.program.id !== e.program.id
        ? t.program.id - e.program.id
        : t.zDepth !== e.zDepth
        ? t.zDepth - e.zDepth
        : e.id - t.id;
    }
    sortTransparent(t, e) {
      return t.renderOrder !== e.renderOrder
        ? t.renderOrder - e.renderOrder
        : t.zDepth !== e.zDepth
        ? e.zDepth - t.zDepth
        : e.id - t.id;
    }
    sortUI(t, e) {
      return t.renderOrder !== e.renderOrder
        ? t.renderOrder - e.renderOrder
        : t.program.id !== e.program.id
        ? t.program.id - e.program.id
        : e.id - t.id;
    }
    getRenderList({ scene: t, camera: e, frustumCull: i, sort: s }) {
      let r = [];
      if (
        (e && i && e.updateFrustum(),
        t.traverse((t) => {
          if (!t.visible) return !0;
          t.draw &&
            ((i && t.frustumCulled && e && !e.frustumIntersectsMesh(t)) ||
              r.push(t));
        }),
        s)
      ) {
        const t = [],
          i = [],
          s = [];
        r.forEach((r) => {
          r.program.transparent
            ? r.program.depthTest
              ? i.push(r)
              : s.push(r)
            : t.push(r),
            (r.zDepth = 0),
            0 === r.renderOrder &&
              r.program.depthTest &&
              e &&
              (r.worldMatrix.getTranslation(tr),
              tr.applyMatrix4(e.projectionViewMatrix),
              (r.zDepth = tr.z));
        }),
          t.sort(this.sortOpaque),
          i.sort(this.sortTransparent),
          s.sort(this.sortUI),
          (r = t.concat(i, s));
      }
      return r;
    }
    render({
      scene: t,
      camera: e,
      target: i = null,
      update: s = !0,
      sort: r = !0,
      frustumCull: n = !0,
      clear: a,
    }) {
      null === i
        ? (this.bindFramebuffer(),
          this.setViewport(this.width * this.dpr, this.height * this.dpr))
        : (this.bindFramebuffer(i), this.setViewport(i.width, i.height)),
        (a || (this.autoClear && !1 !== a)) &&
          (!this.depth ||
            (i && !i.depth) ||
            (this.enable(this.gl.DEPTH_TEST), this.setDepthMask(!0)),
          this.gl.clear(
            (this.color ? this.gl.COLOR_BUFFER_BIT : 0) |
              (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) |
              (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0)
          )),
        s && t.updateMatrixWorld(),
        e && e.updateMatrixWorld(),
        this.getRenderList({
          scene: t,
          camera: e,
          frustumCull: n,
          sort: r,
        }).forEach((t) => {
          t.draw({ camera: e });
        });
    }
  }
  function sr(t, e, i) {
    let s = e[0],
      r = e[1],
      n = e[2],
      a = e[3],
      o = i[0],
      h = i[1],
      u = i[2],
      l = i[3];
    return (
      (t[0] = s * l + a * o + r * u - n * h),
      (t[1] = r * l + a * h + n * o - s * u),
      (t[2] = n * l + a * u + s * h - r * o),
      (t[3] = a * l - s * o - r * h - n * u),
      t
    );
  }
  class rr extends Array {
    constructor(t = 0, e = 0, i = 0, s = 1) {
      return super(t, e, i, s), (this.onChange = () => {}), this;
    }
    get x() {
      return this[0];
    }
    get y() {
      return this[1];
    }
    get z() {
      return this[2];
    }
    get w() {
      return this[3];
    }
    set x(t) {
      (this[0] = t), this.onChange();
    }
    set y(t) {
      (this[1] = t), this.onChange();
    }
    set z(t) {
      (this[2] = t), this.onChange();
    }
    set w(t) {
      (this[3] = t), this.onChange();
    }
    identity() {
      var t;
      return (
        ((t = this)[0] = 0),
        (t[1] = 0),
        (t[2] = 0),
        (t[3] = 1),
        this.onChange(),
        this
      );
    }
    set(t, e, i, s) {
      return t.length
        ? this.copy(t)
        : ((function (t, e, i, s, r) {
            (t[0] = e), (t[1] = i), (t[2] = s), (t[3] = r);
          })(this, t, e, i, s),
          this.onChange(),
          this);
    }
    rotateX(t) {
      return (
        (function (t, e, i) {
          i *= 0.5;
          let s = e[0],
            r = e[1],
            n = e[2],
            a = e[3],
            o = Math.sin(i),
            h = Math.cos(i);
          (t[0] = s * h + a * o),
            (t[1] = r * h + n * o),
            (t[2] = n * h - r * o),
            (t[3] = a * h - s * o);
        })(this, this, t),
        this.onChange(),
        this
      );
    }
    rotateY(t) {
      return (
        (function (t, e, i) {
          i *= 0.5;
          let s = e[0],
            r = e[1],
            n = e[2],
            a = e[3],
            o = Math.sin(i),
            h = Math.cos(i);
          (t[0] = s * h - n * o),
            (t[1] = r * h + a * o),
            (t[2] = n * h + s * o),
            (t[3] = a * h - r * o);
        })(this, this, t),
        this.onChange(),
        this
      );
    }
    rotateZ(t) {
      return (
        (function (t, e, i) {
          i *= 0.5;
          let s = e[0],
            r = e[1],
            n = e[2],
            a = e[3],
            o = Math.sin(i),
            h = Math.cos(i);
          (t[0] = s * h + r * o),
            (t[1] = r * h - s * o),
            (t[2] = n * h + a * o),
            (t[3] = a * h - n * o);
        })(this, this, t),
        this.onChange(),
        this
      );
    }
    inverse(t = this) {
      return (
        (function (t, e) {
          let i = e[0],
            s = e[1],
            r = e[2],
            n = e[3],
            a = i * i + s * s + r * r + n * n,
            o = a ? 1 / a : 0;
          (t[0] = -i * o), (t[1] = -s * o), (t[2] = -r * o), (t[3] = n * o);
        })(this, t),
        this.onChange(),
        this
      );
    }
    conjugate(t = this) {
      var e, i;
      return (
        (i = t),
        ((e = this)[0] = -i[0]),
        (e[1] = -i[1]),
        (e[2] = -i[2]),
        (e[3] = i[3]),
        this.onChange(),
        this
      );
    }
    copy(t) {
      return (
        (i = t),
        ((e = this)[0] = i[0]),
        (e[1] = i[1]),
        (e[2] = i[2]),
        (e[3] = i[3]),
        this.onChange(),
        this
      );
      var e, i;
    }
    normalize(t = this) {
      return (
        (function (t, e) {
          let i = e[0],
            s = e[1],
            r = e[2],
            n = e[3],
            a = i * i + s * s + r * r + n * n;
          a > 0 && (a = 1 / Math.sqrt(a)),
            (t[0] = i * a),
            (t[1] = s * a),
            (t[2] = r * a),
            (t[3] = n * a);
        })(this, t),
        this.onChange(),
        this
      );
    }
    multiply(t, e) {
      return e ? sr(this, t, e) : sr(this, this, t), this.onChange(), this;
    }
    dot(t) {
      return (
        (i = t), (e = this)[0] * i[0] + e[1] * i[1] + e[2] * i[2] + e[3] * i[3]
      );
      var e, i;
    }
    fromMatrix3(t) {
      return (
        (function (t, e) {
          let i,
            s = e[0] + e[4] + e[8];
          if (s > 0)
            (i = Math.sqrt(s + 1)),
              (t[3] = 0.5 * i),
              (i = 0.5 / i),
              (t[0] = (e[5] - e[7]) * i),
              (t[1] = (e[6] - e[2]) * i),
              (t[2] = (e[1] - e[3]) * i);
          else {
            let s = 0;
            e[4] > e[0] && (s = 1), e[8] > e[3 * s + s] && (s = 2);
            let r = (s + 1) % 3,
              n = (s + 2) % 3;
            (i = Math.sqrt(e[3 * s + s] - e[3 * r + r] - e[3 * n + n] + 1)),
              (t[s] = 0.5 * i),
              (i = 0.5 / i),
              (t[3] = (e[3 * r + n] - e[3 * n + r]) * i),
              (t[r] = (e[3 * r + s] + e[3 * s + r]) * i),
              (t[n] = (e[3 * n + s] + e[3 * s + n]) * i);
          }
        })(this, t),
        this.onChange(),
        this
      );
    }
    fromEuler(t) {
      return (
        (function (t, e, i = "YXZ") {
          let s = Math.sin(0.5 * e[0]),
            r = Math.cos(0.5 * e[0]),
            n = Math.sin(0.5 * e[1]),
            a = Math.cos(0.5 * e[1]),
            o = Math.sin(0.5 * e[2]),
            h = Math.cos(0.5 * e[2]);
          "XYZ" === i
            ? ((t[0] = s * a * h + r * n * o),
              (t[1] = r * n * h - s * a * o),
              (t[2] = r * a * o + s * n * h),
              (t[3] = r * a * h - s * n * o))
            : "YXZ" === i
            ? ((t[0] = s * a * h + r * n * o),
              (t[1] = r * n * h - s * a * o),
              (t[2] = r * a * o - s * n * h),
              (t[3] = r * a * h + s * n * o))
            : "ZXY" === i
            ? ((t[0] = s * a * h - r * n * o),
              (t[1] = r * n * h + s * a * o),
              (t[2] = r * a * o + s * n * h),
              (t[3] = r * a * h - s * n * o))
            : "ZYX" === i
            ? ((t[0] = s * a * h - r * n * o),
              (t[1] = r * n * h + s * a * o),
              (t[2] = r * a * o - s * n * h),
              (t[3] = r * a * h + s * n * o))
            : "YZX" === i
            ? ((t[0] = s * a * h + r * n * o),
              (t[1] = r * n * h + s * a * o),
              (t[2] = r * a * o - s * n * h),
              (t[3] = r * a * h - s * n * o))
            : "XZY" === i &&
              ((t[0] = s * a * h - r * n * o),
              (t[1] = r * n * h - s * a * o),
              (t[2] = r * a * o + s * n * h),
              (t[3] = r * a * h + s * n * o));
        })(this, t, t.order),
        this
      );
    }
    fromAxisAngle(t, e) {
      return (
        (function (t, e, i) {
          i *= 0.5;
          let s = Math.sin(i);
          (t[0] = s * e[0]),
            (t[1] = s * e[1]),
            (t[2] = s * e[2]),
            (t[3] = Math.cos(i));
        })(this, t, e),
        this
      );
    }
    slerp(t, e) {
      return (
        (function (t, e, i, s) {
          let r,
            n,
            a,
            o,
            h,
            u = e[0],
            l = e[1],
            c = e[2],
            d = e[3],
            p = i[0],
            g = i[1],
            f = i[2],
            m = i[3];
          (n = u * p + l * g + c * f + d * m),
            n < 0 && ((n = -n), (p = -p), (g = -g), (f = -f), (m = -m)),
            1 - n > 1e-6
              ? ((r = Math.acos(n)),
                (a = Math.sin(r)),
                (o = Math.sin((1 - s) * r) / a),
                (h = Math.sin(s * r) / a))
              : ((o = 1 - s), (h = s)),
            (t[0] = o * u + h * p),
            (t[1] = o * l + h * g),
            (t[2] = o * c + h * f),
            (t[3] = o * d + h * m);
        })(this, this, t, e),
        this
      );
    }
    fromArray(t, e = 0) {
      return (
        (this[0] = t[e]),
        (this[1] = t[e + 1]),
        (this[2] = t[e + 2]),
        (this[3] = t[e + 3]),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this[0]),
        (t[e + 1] = this[1]),
        (t[e + 2] = this[2]),
        (t[e + 3] = this[3]),
        t
      );
    }
  }
  function nr(t, e, i) {
    let s = e[0],
      r = e[1],
      n = e[2],
      a = e[3],
      o = e[4],
      h = e[5],
      u = e[6],
      l = e[7],
      c = e[8],
      d = e[9],
      p = e[10],
      g = e[11],
      f = e[12],
      m = e[13],
      v = e[14],
      _ = e[15],
      w = i[0],
      y = i[1],
      x = i[2],
      b = i[3];
    return (
      (t[0] = w * s + y * o + x * c + b * f),
      (t[1] = w * r + y * h + x * d + b * m),
      (t[2] = w * n + y * u + x * p + b * v),
      (t[3] = w * a + y * l + x * g + b * _),
      (w = i[4]),
      (y = i[5]),
      (x = i[6]),
      (b = i[7]),
      (t[4] = w * s + y * o + x * c + b * f),
      (t[5] = w * r + y * h + x * d + b * m),
      (t[6] = w * n + y * u + x * p + b * v),
      (t[7] = w * a + y * l + x * g + b * _),
      (w = i[8]),
      (y = i[9]),
      (x = i[10]),
      (b = i[11]),
      (t[8] = w * s + y * o + x * c + b * f),
      (t[9] = w * r + y * h + x * d + b * m),
      (t[10] = w * n + y * u + x * p + b * v),
      (t[11] = w * a + y * l + x * g + b * _),
      (w = i[12]),
      (y = i[13]),
      (x = i[14]),
      (b = i[15]),
      (t[12] = w * s + y * o + x * c + b * f),
      (t[13] = w * r + y * h + x * d + b * m),
      (t[14] = w * n + y * u + x * p + b * v),
      (t[15] = w * a + y * l + x * g + b * _),
      t
    );
  }
  function ar(t, e) {
    let i = e[0],
      s = e[1],
      r = e[2],
      n = e[4],
      a = e[5],
      o = e[6],
      h = e[8],
      u = e[9],
      l = e[10];
    return (
      (t[0] = Math.hypot(i, s, r)),
      (t[1] = Math.hypot(n, a, o)),
      (t[2] = Math.hypot(h, u, l)),
      t
    );
  }
  const or = (function () {
    const t = [0, 0, 0];
    return function (e, i) {
      let s = t;
      ar(s, i);
      let r = 1 / s[0],
        n = 1 / s[1],
        a = 1 / s[2],
        o = i[0] * r,
        h = i[1] * n,
        u = i[2] * a,
        l = i[4] * r,
        c = i[5] * n,
        d = i[6] * a,
        p = i[8] * r,
        g = i[9] * n,
        f = i[10] * a,
        m = o + c + f,
        v = 0;
      return (
        m > 0
          ? ((v = 2 * Math.sqrt(m + 1)),
            (e[3] = 0.25 * v),
            (e[0] = (d - g) / v),
            (e[1] = (p - u) / v),
            (e[2] = (h - l) / v))
          : o > c && o > f
          ? ((v = 2 * Math.sqrt(1 + o - c - f)),
            (e[3] = (d - g) / v),
            (e[0] = 0.25 * v),
            (e[1] = (h + l) / v),
            (e[2] = (p + u) / v))
          : c > f
          ? ((v = 2 * Math.sqrt(1 + c - o - f)),
            (e[3] = (p - u) / v),
            (e[0] = (h + l) / v),
            (e[1] = 0.25 * v),
            (e[2] = (d + g) / v))
          : ((v = 2 * Math.sqrt(1 + f - o - c)),
            (e[3] = (h - l) / v),
            (e[0] = (p + u) / v),
            (e[1] = (d + g) / v),
            (e[2] = 0.25 * v)),
        e
      );
    };
  })();
  class hr extends Array {
    constructor(
      t = 1,
      e = 0,
      i = 0,
      s = 0,
      r = 0,
      n = 1,
      a = 0,
      o = 0,
      h = 0,
      u = 0,
      l = 1,
      c = 0,
      d = 0,
      p = 0,
      g = 0,
      f = 1
    ) {
      return super(t, e, i, s, r, n, a, o, h, u, l, c, d, p, g, f), this;
    }
    get x() {
      return this[12];
    }
    get y() {
      return this[13];
    }
    get z() {
      return this[14];
    }
    get w() {
      return this[15];
    }
    set x(t) {
      this[12] = t;
    }
    set y(t) {
      this[13] = t;
    }
    set z(t) {
      this[14] = t;
    }
    set w(t) {
      this[15] = t;
    }
    set(t, e, i, s, r, n, a, o, h, u, l, c, d, p, g, f) {
      return t.length
        ? this.copy(t)
        : ((function (t, e, i, s, r, n, a, o, h, u, l, c, d, p, g, f, m) {
            (t[0] = e),
              (t[1] = i),
              (t[2] = s),
              (t[3] = r),
              (t[4] = n),
              (t[5] = a),
              (t[6] = o),
              (t[7] = h),
              (t[8] = u),
              (t[9] = l),
              (t[10] = c),
              (t[11] = d),
              (t[12] = p),
              (t[13] = g),
              (t[14] = f),
              (t[15] = m);
          })(this, t, e, i, s, r, n, a, o, h, u, l, c, d, p, g, f),
          this);
    }
    translate(t, e = this) {
      return (
        (function (t, e, i) {
          let s,
            r,
            n,
            a,
            o,
            h,
            u,
            l,
            c,
            d,
            p,
            g,
            f = i[0],
            m = i[1],
            v = i[2];
          e === t
            ? ((t[12] = e[0] * f + e[4] * m + e[8] * v + e[12]),
              (t[13] = e[1] * f + e[5] * m + e[9] * v + e[13]),
              (t[14] = e[2] * f + e[6] * m + e[10] * v + e[14]),
              (t[15] = e[3] * f + e[7] * m + e[11] * v + e[15]))
            : ((s = e[0]),
              (r = e[1]),
              (n = e[2]),
              (a = e[3]),
              (o = e[4]),
              (h = e[5]),
              (u = e[6]),
              (l = e[7]),
              (c = e[8]),
              (d = e[9]),
              (p = e[10]),
              (g = e[11]),
              (t[0] = s),
              (t[1] = r),
              (t[2] = n),
              (t[3] = a),
              (t[4] = o),
              (t[5] = h),
              (t[6] = u),
              (t[7] = l),
              (t[8] = c),
              (t[9] = d),
              (t[10] = p),
              (t[11] = g),
              (t[12] = s * f + o * m + c * v + e[12]),
              (t[13] = r * f + h * m + d * v + e[13]),
              (t[14] = n * f + u * m + p * v + e[14]),
              (t[15] = a * f + l * m + g * v + e[15]));
        })(this, e, t),
        this
      );
    }
    rotate(t, e, i = this) {
      return (
        (function (t, e, i, s) {
          let r,
            n,
            a,
            o,
            h,
            u,
            l,
            c,
            d,
            p,
            g,
            f,
            m,
            v,
            _,
            w,
            y,
            x,
            b,
            M,
            A,
            T,
            E,
            S,
            C = s[0],
            F = s[1],
            P = s[2],
            R = Math.hypot(C, F, P);
          Math.abs(R) < 1e-6 ||
            ((R = 1 / R),
            (C *= R),
            (F *= R),
            (P *= R),
            (r = Math.sin(i)),
            (n = Math.cos(i)),
            (a = 1 - n),
            (o = e[0]),
            (h = e[1]),
            (u = e[2]),
            (l = e[3]),
            (c = e[4]),
            (d = e[5]),
            (p = e[6]),
            (g = e[7]),
            (f = e[8]),
            (m = e[9]),
            (v = e[10]),
            (_ = e[11]),
            (w = C * C * a + n),
            (y = F * C * a + P * r),
            (x = P * C * a - F * r),
            (b = C * F * a - P * r),
            (M = F * F * a + n),
            (A = P * F * a + C * r),
            (T = C * P * a + F * r),
            (E = F * P * a - C * r),
            (S = P * P * a + n),
            (t[0] = o * w + c * y + f * x),
            (t[1] = h * w + d * y + m * x),
            (t[2] = u * w + p * y + v * x),
            (t[3] = l * w + g * y + _ * x),
            (t[4] = o * b + c * M + f * A),
            (t[5] = h * b + d * M + m * A),
            (t[6] = u * b + p * M + v * A),
            (t[7] = l * b + g * M + _ * A),
            (t[8] = o * T + c * E + f * S),
            (t[9] = h * T + d * E + m * S),
            (t[10] = u * T + p * E + v * S),
            (t[11] = l * T + g * E + _ * S),
            e !== t &&
              ((t[12] = e[12]),
              (t[13] = e[13]),
              (t[14] = e[14]),
              (t[15] = e[15])));
        })(this, i, t, e),
        this
      );
    }
    scale(t, e = this) {
      return (
        (function (t, e, i) {
          let s = i[0],
            r = i[1],
            n = i[2];
          (t[0] = e[0] * s),
            (t[1] = e[1] * s),
            (t[2] = e[2] * s),
            (t[3] = e[3] * s),
            (t[4] = e[4] * r),
            (t[5] = e[5] * r),
            (t[6] = e[6] * r),
            (t[7] = e[7] * r),
            (t[8] = e[8] * n),
            (t[9] = e[9] * n),
            (t[10] = e[10] * n),
            (t[11] = e[11] * n),
            (t[12] = e[12]),
            (t[13] = e[13]),
            (t[14] = e[14]),
            (t[15] = e[15]);
        })(this, e, "number" == typeof t ? [t, t, t] : t),
        this
      );
    }
    multiply(t, e) {
      return e ? nr(this, t, e) : nr(this, this, t), this;
    }
    identity() {
      var t;
      return (
        ((t = this)[0] = 1),
        (t[1] = 0),
        (t[2] = 0),
        (t[3] = 0),
        (t[4] = 0),
        (t[5] = 1),
        (t[6] = 0),
        (t[7] = 0),
        (t[8] = 0),
        (t[9] = 0),
        (t[10] = 1),
        (t[11] = 0),
        (t[12] = 0),
        (t[13] = 0),
        (t[14] = 0),
        (t[15] = 1),
        this
      );
    }
    copy(t) {
      var e, i;
      return (
        (i = t),
        ((e = this)[0] = i[0]),
        (e[1] = i[1]),
        (e[2] = i[2]),
        (e[3] = i[3]),
        (e[4] = i[4]),
        (e[5] = i[5]),
        (e[6] = i[6]),
        (e[7] = i[7]),
        (e[8] = i[8]),
        (e[9] = i[9]),
        (e[10] = i[10]),
        (e[11] = i[11]),
        (e[12] = i[12]),
        (e[13] = i[13]),
        (e[14] = i[14]),
        (e[15] = i[15]),
        this
      );
    }
    fromPerspective({ fov: t, aspect: e, near: i, far: s } = {}) {
      return (
        (function (t, e, i, s, r) {
          let n = 1 / Math.tan(e / 2),
            a = 1 / (s - r);
          (t[0] = n / i),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = n),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = (r + s) * a),
            (t[11] = -1),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = 2 * r * s * a),
            (t[15] = 0);
        })(this, t, e, i, s),
        this
      );
    }
    fromOrthogonal({ left: t, right: e, bottom: i, top: s, near: r, far: n }) {
      return (
        (function (t, e, i, s, r, n, a) {
          let o = 1 / (e - i),
            h = 1 / (s - r),
            u = 1 / (n - a);
          (t[0] = -2 * o),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = -2 * h),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = 2 * u),
            (t[11] = 0),
            (t[12] = (e + i) * o),
            (t[13] = (r + s) * h),
            (t[14] = (a + n) * u),
            (t[15] = 1);
        })(this, t, e, i, s, r, n),
        this
      );
    }
    fromQuaternion(t) {
      return (
        (function (t, e) {
          let i = e[0],
            s = e[1],
            r = e[2],
            n = e[3],
            a = i + i,
            o = s + s,
            h = r + r,
            u = i * a,
            l = s * a,
            c = s * o,
            d = r * a,
            p = r * o,
            g = r * h,
            f = n * a,
            m = n * o,
            v = n * h;
          (t[0] = 1 - c - g),
            (t[1] = l + v),
            (t[2] = d - m),
            (t[3] = 0),
            (t[4] = l - v),
            (t[5] = 1 - u - g),
            (t[6] = p + f),
            (t[7] = 0),
            (t[8] = d + m),
            (t[9] = p - f),
            (t[10] = 1 - u - c),
            (t[11] = 0),
            (t[12] = 0),
            (t[13] = 0),
            (t[14] = 0),
            (t[15] = 1);
        })(this, t),
        this
      );
    }
    setPosition(t) {
      return (this.x = t[0]), (this.y = t[1]), (this.z = t[2]), this;
    }
    inverse(t = this) {
      return (
        (function (t, e) {
          let i = e[0],
            s = e[1],
            r = e[2],
            n = e[3],
            a = e[4],
            o = e[5],
            h = e[6],
            u = e[7],
            l = e[8],
            c = e[9],
            d = e[10],
            p = e[11],
            g = e[12],
            f = e[13],
            m = e[14],
            v = e[15],
            _ = i * o - s * a,
            w = i * h - r * a,
            y = i * u - n * a,
            x = s * h - r * o,
            b = s * u - n * o,
            M = r * u - n * h,
            A = l * f - c * g,
            T = l * m - d * g,
            E = l * v - p * g,
            S = c * m - d * f,
            C = c * v - p * f,
            F = d * v - p * m,
            P = _ * F - w * C + y * S + x * E - b * T + M * A;
          P &&
            ((P = 1 / P),
            (t[0] = (o * F - h * C + u * S) * P),
            (t[1] = (r * C - s * F - n * S) * P),
            (t[2] = (f * M - m * b + v * x) * P),
            (t[3] = (d * b - c * M - p * x) * P),
            (t[4] = (h * E - a * F - u * T) * P),
            (t[5] = (i * F - r * E + n * T) * P),
            (t[6] = (m * y - g * M - v * w) * P),
            (t[7] = (l * M - d * y + p * w) * P),
            (t[8] = (a * C - o * E + u * A) * P),
            (t[9] = (s * E - i * C - n * A) * P),
            (t[10] = (g * b - f * y + v * _) * P),
            (t[11] = (c * y - l * b - p * _) * P),
            (t[12] = (o * T - a * S - h * A) * P),
            (t[13] = (i * S - s * T + r * A) * P),
            (t[14] = (f * w - g * x - m * _) * P),
            (t[15] = (l * x - c * w + d * _) * P));
        })(this, t),
        this
      );
    }
    compose(t, e, i) {
      return (
        (function (t, e, i, s) {
          let r = e[0],
            n = e[1],
            a = e[2],
            o = e[3],
            h = r + r,
            u = n + n,
            l = a + a,
            c = r * h,
            d = r * u,
            p = r * l,
            g = n * u,
            f = n * l,
            m = a * l,
            v = o * h,
            _ = o * u,
            w = o * l,
            y = s[0],
            x = s[1],
            b = s[2];
          (t[0] = (1 - (g + m)) * y),
            (t[1] = (d + w) * y),
            (t[2] = (p - _) * y),
            (t[3] = 0),
            (t[4] = (d - w) * x),
            (t[5] = (1 - (c + m)) * x),
            (t[6] = (f + v) * x),
            (t[7] = 0),
            (t[8] = (p + _) * b),
            (t[9] = (f - v) * b),
            (t[10] = (1 - (c + g)) * b),
            (t[11] = 0),
            (t[12] = i[0]),
            (t[13] = i[1]),
            (t[14] = i[2]),
            (t[15] = 1);
        })(this, t, e, i),
        this
      );
    }
    getRotation(t) {
      return or(t, this), this;
    }
    getTranslation(t) {
      var e, i;
      return (
        (i = this), ((e = t)[0] = i[12]), (e[1] = i[13]), (e[2] = i[14]), this
      );
    }
    getScaling(t) {
      return ar(t, this), this;
    }
    getMaxScaleOnAxis() {
      return (function (t) {
        let e = t[0],
          i = t[1],
          s = t[2],
          r = t[4],
          n = t[5],
          a = t[6],
          o = t[8],
          h = t[9],
          u = t[10];
        const l = e * e + i * i + s * s,
          c = r * r + n * n + a * a,
          d = o * o + h * h + u * u;
        return Math.sqrt(Math.max(l, c, d));
      })(this);
    }
    lookAt(t, e, i) {
      return (
        (function (t, e, i, s) {
          let r = e[0],
            n = e[1],
            a = e[2],
            o = s[0],
            h = s[1],
            u = s[2],
            l = r - i[0],
            c = n - i[1],
            d = a - i[2],
            p = l * l + c * c + d * d;
          0 === p
            ? (d = 1)
            : ((p = 1 / Math.sqrt(p)), (l *= p), (c *= p), (d *= p));
          let g = h * d - u * c,
            f = u * l - o * d,
            m = o * c - h * l;
          (p = g * g + f * f + m * m),
            0 === p &&
              (u ? (o += 1e-6) : h ? (u += 1e-6) : (h += 1e-6),
              (g = h * d - u * c),
              (f = u * l - o * d),
              (m = o * c - h * l),
              (p = g * g + f * f + m * m)),
            (p = 1 / Math.sqrt(p)),
            (g *= p),
            (f *= p),
            (m *= p),
            (t[0] = g),
            (t[1] = f),
            (t[2] = m),
            (t[3] = 0),
            (t[4] = c * m - d * f),
            (t[5] = d * g - l * m),
            (t[6] = l * f - c * g),
            (t[7] = 0),
            (t[8] = l),
            (t[9] = c),
            (t[10] = d),
            (t[11] = 0),
            (t[12] = r),
            (t[13] = n),
            (t[14] = a),
            (t[15] = 1);
        })(this, t, e, i),
        this
      );
    }
    determinant() {
      return (function (t) {
        let e = t[0],
          i = t[1],
          s = t[2],
          r = t[3],
          n = t[4],
          a = t[5],
          o = t[6],
          h = t[7],
          u = t[8],
          l = t[9],
          c = t[10],
          d = t[11],
          p = t[12],
          g = t[13],
          f = t[14],
          m = t[15];
        return (
          (e * a - i * n) * (c * m - d * f) -
          (e * o - s * n) * (l * m - d * g) +
          (e * h - r * n) * (l * f - c * g) +
          (i * o - s * a) * (u * m - d * p) -
          (i * h - r * a) * (u * f - c * p) +
          (s * h - r * o) * (u * g - l * p)
        );
      })(this);
    }
    fromArray(t, e = 0) {
      return (
        (this[0] = t[e]),
        (this[1] = t[e + 1]),
        (this[2] = t[e + 2]),
        (this[3] = t[e + 3]),
        (this[4] = t[e + 4]),
        (this[5] = t[e + 5]),
        (this[6] = t[e + 6]),
        (this[7] = t[e + 7]),
        (this[8] = t[e + 8]),
        (this[9] = t[e + 9]),
        (this[10] = t[e + 10]),
        (this[11] = t[e + 11]),
        (this[12] = t[e + 12]),
        (this[13] = t[e + 13]),
        (this[14] = t[e + 14]),
        (this[15] = t[e + 15]),
        this
      );
    }
    toArray(t = [], e = 0) {
      return (
        (t[e] = this[0]),
        (t[e + 1] = this[1]),
        (t[e + 2] = this[2]),
        (t[e + 3] = this[3]),
        (t[e + 4] = this[4]),
        (t[e + 5] = this[5]),
        (t[e + 6] = this[6]),
        (t[e + 7] = this[7]),
        (t[e + 8] = this[8]),
        (t[e + 9] = this[9]),
        (t[e + 10] = this[10]),
        (t[e + 11] = this[11]),
        (t[e + 12] = this[12]),
        (t[e + 13] = this[13]),
        (t[e + 14] = this[14]),
        (t[e + 15] = this[15]),
        t
      );
    }
  }
  const ur = new hr();
  class lr extends Array {
    constructor(t = 0, e = t, i = t, s = "YXZ") {
      return super(t, e, i), (this.order = s), (this.onChange = () => {}), this;
    }
    get x() {
      return this[0];
    }
    get y() {
      return this[1];
    }
    get z() {
      return this[2];
    }
    set x(t) {
      (this[0] = t), this.onChange();
    }
    set y(t) {
      (this[1] = t), this.onChange();
    }
    set z(t) {
      (this[2] = t), this.onChange();
    }
    set(t, e = t, i = t) {
      return t.length
        ? this.copy(t)
        : ((this[0] = t), (this[1] = e), (this[2] = i), this.onChange(), this);
    }
    copy(t) {
      return (
        (this[0] = t[0]),
        (this[1] = t[1]),
        (this[2] = t[2]),
        this.onChange(),
        this
      );
    }
    reorder(t) {
      return (this.order = t), this.onChange(), this;
    }
    fromRotationMatrix(t, e = this.order) {
      return (
        (function (t, e, i = "YXZ") {
          "XYZ" === i
            ? ((t[1] = Math.asin(Math.min(Math.max(e[8], -1), 1))),
              Math.abs(e[8]) < 0.99999
                ? ((t[0] = Math.atan2(-e[9], e[10])),
                  (t[2] = Math.atan2(-e[4], e[0])))
                : ((t[0] = Math.atan2(e[6], e[5])), (t[2] = 0)))
            : "YXZ" === i
            ? ((t[0] = Math.asin(-Math.min(Math.max(e[9], -1), 1))),
              Math.abs(e[9]) < 0.99999
                ? ((t[1] = Math.atan2(e[8], e[10])),
                  (t[2] = Math.atan2(e[1], e[5])))
                : ((t[1] = Math.atan2(-e[2], e[0])), (t[2] = 0)))
            : "ZXY" === i
            ? ((t[0] = Math.asin(Math.min(Math.max(e[6], -1), 1))),
              Math.abs(e[6]) < 0.99999
                ? ((t[1] = Math.atan2(-e[2], e[10])),
                  (t[2] = Math.atan2(-e[4], e[5])))
                : ((t[1] = 0), (t[2] = Math.atan2(e[1], e[0]))))
            : "ZYX" === i
            ? ((t[1] = Math.asin(-Math.min(Math.max(e[2], -1), 1))),
              Math.abs(e[2]) < 0.99999
                ? ((t[0] = Math.atan2(e[6], e[10])),
                  (t[2] = Math.atan2(e[1], e[0])))
                : ((t[0] = 0), (t[2] = Math.atan2(-e[4], e[5]))))
            : "YZX" === i
            ? ((t[2] = Math.asin(Math.min(Math.max(e[1], -1), 1))),
              Math.abs(e[1]) < 0.99999
                ? ((t[0] = Math.atan2(-e[9], e[5])),
                  (t[1] = Math.atan2(-e[2], e[0])))
                : ((t[0] = 0), (t[1] = Math.atan2(e[8], e[10]))))
            : "XZY" === i &&
              ((t[2] = Math.asin(-Math.min(Math.max(e[4], -1), 1))),
              Math.abs(e[4]) < 0.99999
                ? ((t[0] = Math.atan2(e[6], e[5])),
                  (t[1] = Math.atan2(e[8], e[0])))
                : ((t[0] = Math.atan2(-e[9], e[10])), (t[1] = 0)));
        })(this, t, e),
        this
      );
    }
    fromQuaternion(t, e = this.order) {
      return ur.fromQuaternion(t), this.fromRotationMatrix(ur, e);
    }
    toArray(t = [], e = 0) {
      return (t[e] = this[0]), (t[e + 1] = this[1]), (t[e + 2] = this[2]), t;
    }
  }
  class cr {
    constructor() {
      (this.parent = null),
        (this.children = []),
        (this.visible = !0),
        (this.matrix = new hr()),
        (this.worldMatrix = new hr()),
        (this.matrixAutoUpdate = !0),
        (this.position = new Js()),
        (this.quaternion = new rr()),
        (this.scale = new Js(1)),
        (this.rotation = new lr()),
        (this.up = new Js(0, 1, 0)),
        (this.rotation.onChange = () =>
          this.quaternion.fromEuler(this.rotation)),
        (this.quaternion.onChange = () =>
          this.rotation.fromQuaternion(this.quaternion));
    }
    setParent(t, e = !0) {
      this.parent && t !== this.parent && this.parent.removeChild(this, !1),
        (this.parent = t),
        e && t && t.addChild(this, !1);
    }
    addChild(t, e = !0) {
      ~this.children.indexOf(t) || this.children.push(t),
        e && t.setParent(this, !1);
    }
    removeChild(t, e = !0) {
      ~this.children.indexOf(t) &&
        this.children.splice(this.children.indexOf(t), 1),
        e && t.setParent(null, !1);
    }
    updateMatrixWorld(t) {
      this.matrixAutoUpdate && this.updateMatrix(),
        (this.worldMatrixNeedsUpdate || t) &&
          (null === this.parent
            ? this.worldMatrix.copy(this.matrix)
            : this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix),
          (this.worldMatrixNeedsUpdate = !1),
          (t = !0));
      for (let e = 0, i = this.children.length; e < i; e++)
        this.children[e].updateMatrixWorld(t);
    }
    updateMatrix() {
      this.matrix.compose(this.quaternion, this.position, this.scale),
        (this.worldMatrixNeedsUpdate = !0);
    }
    traverse(t) {
      if (!t(this))
        for (let e = 0, i = this.children.length; e < i; e++)
          this.children[e].traverse(t);
    }
    decompose() {
      this.matrix.getTranslation(this.position),
        this.matrix.getRotation(this.quaternion),
        this.matrix.getScaling(this.scale),
        this.rotation.fromQuaternion(this.quaternion);
    }
    lookAt(t, e = !1) {
      e
        ? this.matrix.lookAt(this.position, t, this.up)
        : this.matrix.lookAt(t, this.position, this.up),
        this.matrix.getRotation(this.quaternion),
        this.rotation.fromQuaternion(this.quaternion);
    }
  }
  const dr = new hr(),
    pr = new Js(),
    gr = new Js();
  class fr extends cr {
    constructor(
      t,
      {
        near: e = 0.1,
        far: i = 100,
        fov: s = 45,
        aspect: r = 1,
        left: n,
        right: a,
        bottom: o,
        top: h,
        zoom: u = 1,
      } = {}
    ) {
      super(),
        Object.assign(this, {
          near: e,
          far: i,
          fov: s,
          aspect: r,
          left: n,
          right: a,
          bottom: o,
          top: h,
          zoom: u,
        }),
        (this.projectionMatrix = new hr()),
        (this.viewMatrix = new hr()),
        (this.projectionViewMatrix = new hr()),
        (this.worldPosition = new Js()),
        (this.type = n || a ? "orthographic" : "perspective"),
        "orthographic" === this.type ? this.orthographic() : this.perspective();
    }
    perspective({
      near: t = this.near,
      far: e = this.far,
      fov: i = this.fov,
      aspect: s = this.aspect,
    } = {}) {
      return (
        Object.assign(this, { near: t, far: e, fov: i, aspect: s }),
        this.projectionMatrix.fromPerspective({
          fov: i * (Math.PI / 180),
          aspect: s,
          near: t,
          far: e,
        }),
        (this.type = "perspective"),
        this
      );
    }
    orthographic({
      near: t = this.near,
      far: e = this.far,
      left: i = this.left,
      right: s = this.right,
      bottom: r = this.bottom,
      top: n = this.top,
      zoom: a = this.zoom,
    } = {}) {
      return (
        Object.assign(this, {
          near: t,
          far: e,
          left: i,
          right: s,
          bottom: r,
          top: n,
          zoom: a,
        }),
        (i /= a),
        (s /= a),
        (r /= a),
        (n /= a),
        this.projectionMatrix.fromOrthogonal({
          left: i,
          right: s,
          bottom: r,
          top: n,
          near: t,
          far: e,
        }),
        (this.type = "orthographic"),
        this
      );
    }
    updateMatrixWorld() {
      return (
        super.updateMatrixWorld(),
        this.viewMatrix.inverse(this.worldMatrix),
        this.worldMatrix.getTranslation(this.worldPosition),
        this.projectionViewMatrix.multiply(
          this.projectionMatrix,
          this.viewMatrix
        ),
        this
      );
    }
    lookAt(t) {
      return super.lookAt(t, !0), this;
    }
    project(t) {
      return (
        t.applyMatrix4(this.viewMatrix),
        t.applyMatrix4(this.projectionMatrix),
        this
      );
    }
    unproject(t) {
      return (
        t.applyMatrix4(dr.inverse(this.projectionMatrix)),
        t.applyMatrix4(this.worldMatrix),
        this
      );
    }
    updateFrustum() {
      this.frustum ||
        (this.frustum = [
          new Js(),
          new Js(),
          new Js(),
          new Js(),
          new Js(),
          new Js(),
        ]);
      const t = this.projectionViewMatrix;
      (this.frustum[0].set(t[3] - t[0], t[7] - t[4], t[11] - t[8]).constant =
        t[15] - t[12]),
        (this.frustum[1].set(t[3] + t[0], t[7] + t[4], t[11] + t[8]).constant =
          t[15] + t[12]),
        (this.frustum[2].set(t[3] + t[1], t[7] + t[5], t[11] + t[9]).constant =
          t[15] + t[13]),
        (this.frustum[3].set(t[3] - t[1], t[7] - t[5], t[11] - t[9]).constant =
          t[15] - t[13]),
        (this.frustum[4].set(t[3] - t[2], t[7] - t[6], t[11] - t[10]).constant =
          t[15] - t[14]),
        (this.frustum[5].set(t[3] + t[2], t[7] + t[6], t[11] + t[10]).constant =
          t[15] + t[14]);
      for (let t = 0; t < 6; t++) {
        const e = 1 / this.frustum[t].distance();
        this.frustum[t].multiply(e), (this.frustum[t].constant *= e);
      }
    }
    frustumIntersectsMesh(t) {
      if (!t.geometry.attributes.position) return !0;
      if (
        ((t.geometry.bounds && t.geometry.bounds.radius !== 1 / 0) ||
          t.geometry.computeBoundingSphere(),
        !t.geometry.bounds)
      )
        return !0;
      const e = pr;
      e.copy(t.geometry.bounds.center), e.applyMatrix4(t.worldMatrix);
      const i = t.geometry.bounds.radius * t.worldMatrix.getMaxScaleOnAxis();
      return this.frustumIntersectsSphere(e, i);
    }
    frustumIntersectsSphere(t, e) {
      const i = gr;
      for (let s = 0; s < 6; s++) {
        const r = this.frustum[s];
        if (i.copy(r).dot(t) + r.constant < -e) return !1;
      }
      return !0;
    }
  }
  function mr({
    font: t,
    text: e,
    width: i = 1 / 0,
    align: s = "left",
    size: r = 1,
    letterSpacing: n = 0,
    lineHeight: a = 1.4,
    wordSpacing: o = 0,
    wordBreak: h = !1,
  }) {
    const u = this;
    let l, c, d, p, g;
    const f = /\n/,
      m = /\s/;
    function v() {
      (d = t.common.lineHeight), (p = t.common.base), (g = r / p);
      let i = e.replace(/[ \n]/g, "").length;
      c = {
        position: new Float32Array(4 * i * 3),
        uv: new Float32Array(4 * i * 2),
        id: new Float32Array(4 * i),
        index: new Uint16Array(6 * i),
      };
      for (let t = 0; t < i; t++)
        (c.id[t] = t),
          c.index.set(
            [4 * t, 4 * t + 2, 4 * t + 1, 4 * t + 1, 4 * t + 2, 4 * t + 3],
            6 * t
          );
      _();
    }
    function _() {
      const d = [];
      let p = 0,
        v = 0,
        _ = 0,
        y = x();
      function x() {
        const t = { width: 0, glyphs: [] };
        return d.push(t), (v = p), (_ = 0), t;
      }
      let b = 0;
      for (; p < e.length && b < 100; ) {
        b++;
        const t = e[p];
        if (!y.width && m.test(t)) {
          p++, (v = p), (_ = 0);
          continue;
        }
        if (f.test(t)) {
          p++, (y = x());
          continue;
        }
        const s = l[t] || l[" "];
        if (y.glyphs.length) {
          const t = y.glyphs[y.glyphs.length - 1][0];
          let e = w(s.id, t.id) * g;
          (y.width += e), (_ += e);
        }
        y.glyphs.push([s, y.width]);
        let a = 0;
        if (
          (m.test(t) ? ((v = p), (_ = 0), (a += o * r)) : (a += n * r),
          (a += s.xadvance * g),
          (y.width += a),
          (_ += a),
          y.width > i)
        ) {
          if (h && y.glyphs.length > 1) {
            (y.width -= a), y.glyphs.pop(), (y = x());
            continue;
          }
          if (!h && _ !== y.width) {
            let t = p - v + 1;
            y.glyphs.splice(-t, t), (p = v), (y.width -= _), (y = x());
            continue;
          }
        }
        p++, (b = 0);
      }
      y.width || d.pop(),
        (function (e) {
          const i = t.common.scaleW,
            n = t.common.scaleH;
          let o = 0.07 * r,
            h = 0;
          for (let t = 0; t < e.length; t++) {
            let u = e[t];
            for (let t = 0; t < u.glyphs.length; t++) {
              const e = u.glyphs[t][0];
              let r = u.glyphs[t][1];
              if (
                ("center" === s
                  ? (r -= 0.5 * u.width)
                  : "right" === s && (r -= u.width),
                m.test(e.char))
              )
                continue;
              (r += e.xoffset * g), (o -= e.yoffset * g);
              let a = e.width * g,
                l = e.height * g;
              c.position.set(
                [r, o - l, 0, r, o, 0, r + a, o - l, 0, r + a, o, 0],
                4 * h * 3
              );
              let d = e.x / i,
                p = e.width / i,
                f = 1 - e.y / n,
                v = e.height / n;
              c.uv.set([d, f - v, d, f, d + p, f - v, d + p, f], 4 * h * 2),
                (o += e.yoffset * g),
                h++;
            }
            o -= r * a;
          }
          (u.buffers = c),
            (u.numLines = e.length),
            (u.height = u.numLines * r * a),
            (u.width = Math.max(...e.map((t) => t.width)));
        })(d);
    }
    function w(e, i) {
      for (let s = 0; s < t.kernings.length; s++) {
        let r = t.kernings[s];
        if (!(r.first < e || r.second < i))
          return r.first > e || (r.first === e && r.second > i) ? 0 : r.amount;
      }
      return 0;
    }
    (l = {}),
      t.chars.forEach((t) => (l[t.char] = t)),
      v(),
      (this.resize = function (t) {
        ({ width: i } = t), _();
      }),
      (this.update = function (t) {
        ({ text: e } = t), v();
      });
  }
  const vr = new Uint8Array(4);
  function _r(t) {
    return 0 == (t & (t - 1));
  }
  let wr = 1;
  class yr {
    constructor(
      t,
      {
        image: e,
        target: i = t.TEXTURE_2D,
        type: s = t.UNSIGNED_BYTE,
        format: r = t.RGBA,
        internalFormat: n = r,
        wrapS: a = t.CLAMP_TO_EDGE,
        wrapT: o = t.CLAMP_TO_EDGE,
        generateMipmaps: h = !0,
        minFilter: u = h ? t.NEAREST_MIPMAP_LINEAR : t.LINEAR,
        magFilter: l = t.LINEAR,
        premultiplyAlpha: c = !1,
        unpackAlignment: d = 4,
        flipY: p = i == t.TEXTURE_2D,
        anisotropy: g = 0,
        level: f = 0,
        width: m,
        height: v = m,
      } = {}
    ) {
      (this.gl = t),
        (this.id = wr++),
        (this.image = e),
        (this.target = i),
        (this.type = s),
        (this.format = r),
        (this.internalFormat = n),
        (this.minFilter = u),
        (this.magFilter = l),
        (this.wrapS = a),
        (this.wrapT = o),
        (this.generateMipmaps = h),
        (this.premultiplyAlpha = c),
        (this.unpackAlignment = d),
        (this.flipY = p),
        (this.anisotropy = Math.min(
          g,
          this.gl.renderer.parameters.maxAnisotropy
        )),
        (this.level = f),
        (this.width = m),
        (this.height = v),
        (this.texture = this.gl.createTexture()),
        (this.store = { image: null }),
        (this.glState = this.gl.renderer.state),
        (this.state = {}),
        (this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR),
        (this.state.magFilter = this.gl.LINEAR),
        (this.state.wrapS = this.gl.REPEAT),
        (this.state.wrapT = this.gl.REPEAT),
        (this.state.anisotropy = 0);
    }
    bind() {
      this.glState.textureUnits[this.glState.activeTextureUnit] !== this.id &&
        (this.gl.bindTexture(this.target, this.texture),
        (this.glState.textureUnits[this.glState.activeTextureUnit] = this.id));
    }
    update(t = 0) {
      const e = !(this.image === this.store.image && !this.needsUpdate);
      if (
        ((e || this.glState.textureUnits[t] !== this.id) &&
          (this.gl.renderer.activeTexture(t), this.bind()),
        e)
      ) {
        if (
          ((this.needsUpdate = !1),
          this.flipY !== this.glState.flipY &&
            (this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY),
            (this.glState.flipY = this.flipY)),
          this.premultiplyAlpha !== this.glState.premultiplyAlpha &&
            (this.gl.pixelStorei(
              this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,
              this.premultiplyAlpha
            ),
            (this.glState.premultiplyAlpha = this.premultiplyAlpha)),
          this.unpackAlignment !== this.glState.unpackAlignment &&
            (this.gl.pixelStorei(
              this.gl.UNPACK_ALIGNMENT,
              this.unpackAlignment
            ),
            (this.glState.unpackAlignment = this.unpackAlignment)),
          this.minFilter !== this.state.minFilter &&
            (this.gl.texParameteri(
              this.target,
              this.gl.TEXTURE_MIN_FILTER,
              this.minFilter
            ),
            (this.state.minFilter = this.minFilter)),
          this.magFilter !== this.state.magFilter &&
            (this.gl.texParameteri(
              this.target,
              this.gl.TEXTURE_MAG_FILTER,
              this.magFilter
            ),
            (this.state.magFilter = this.magFilter)),
          this.wrapS !== this.state.wrapS &&
            (this.gl.texParameteri(
              this.target,
              this.gl.TEXTURE_WRAP_S,
              this.wrapS
            ),
            (this.state.wrapS = this.wrapS)),
          this.wrapT !== this.state.wrapT &&
            (this.gl.texParameteri(
              this.target,
              this.gl.TEXTURE_WRAP_T,
              this.wrapT
            ),
            (this.state.wrapT = this.wrapT)),
          this.anisotropy &&
            this.anisotropy !== this.state.anisotropy &&
            (this.gl.texParameterf(
              this.target,
              this.gl.renderer.getExtension("EXT_texture_filter_anisotropic")
                .TEXTURE_MAX_ANISOTROPY_EXT,
              this.anisotropy
            ),
            (this.state.anisotropy = this.anisotropy)),
          this.image)
        ) {
          if (
            (this.image.width &&
              ((this.width = this.image.width),
              (this.height = this.image.height)),
            this.target === this.gl.TEXTURE_CUBE_MAP)
          )
            for (let t = 0; t < 6; t++)
              this.gl.texImage2D(
                this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + t,
                this.level,
                this.internalFormat,
                this.format,
                this.type,
                this.image[t]
              );
          else if (ArrayBuffer.isView(this.image))
            this.gl.texImage2D(
              this.target,
              this.level,
              this.internalFormat,
              this.width,
              this.height,
              0,
              this.format,
              this.type,
              this.image
            );
          else if (this.image.isCompressedTexture)
            for (let t = 0; t < this.image.length; t++)
              this.gl.compressedTexImage2D(
                this.target,
                t,
                this.internalFormat,
                this.image[t].width,
                this.image[t].height,
                0,
                this.image[t].data
              );
          else
            this.gl.texImage2D(
              this.target,
              this.level,
              this.internalFormat,
              this.format,
              this.type,
              this.image
            );
          this.generateMipmaps &&
            (this.gl.renderer.isWebgl2 ||
            (_r(this.image.width) && _r(this.image.height))
              ? this.gl.generateMipmap(this.target)
              : ((this.generateMipmaps = !1),
                (this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE),
                (this.minFilter = this.gl.LINEAR))),
            this.onUpdate && this.onUpdate();
        } else if (this.target === this.gl.TEXTURE_CUBE_MAP)
          for (let t = 0; t < 6; t++)
            this.gl.texImage2D(
              this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + t,
              0,
              this.gl.RGBA,
              1,
              1,
              0,
              this.gl.RGBA,
              this.gl.UNSIGNED_BYTE,
              vr
            );
        else
          this.width
            ? this.gl.texImage2D(
                this.target,
                this.level,
                this.internalFormat,
                this.width,
                this.height,
                0,
                this.format,
                this.type,
                null
              )
            : this.gl.texImage2D(
                this.target,
                0,
                this.gl.RGBA,
                1,
                1,
                0,
                this.gl.RGBA,
                this.gl.UNSIGNED_BYTE,
                vr
              );
        this.store.image = this.image;
      }
    }
  }
  let xr = 1;
  const br = {};
  class Mr {
    constructor(
      t,
      {
        vertex: e,
        fragment: i,
        uniforms: s = {},
        transparent: r = !1,
        cullFace: n = t.BACK,
        frontFace: a = t.CCW,
        depthTest: o = !0,
        depthWrite: h = !0,
        depthFunc: u = t.LESS,
      } = {}
    ) {
      t.canvas || console.error("gl not passed as fist argument to Program"),
        (this.gl = t),
        (this.uniforms = s),
        (this.id = xr++),
        e || console.warn("vertex shader not supplied"),
        i || console.warn("fragment shader not supplied"),
        (this.transparent = r),
        (this.cullFace = n),
        (this.frontFace = a),
        (this.depthTest = o),
        (this.depthWrite = h),
        (this.depthFunc = u),
        (this.blendFunc = {}),
        (this.blendEquation = {}),
        this.transparent &&
          !this.blendFunc.src &&
          (this.gl.renderer.premultipliedAlpha
            ? this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA)
            : this.setBlendFunc(
                this.gl.SRC_ALPHA,
                this.gl.ONE_MINUS_SRC_ALPHA
              ));
      const l = t.createShader(t.VERTEX_SHADER);
      t.shaderSource(l, e),
        t.compileShader(l),
        "" !== t.getShaderInfoLog(l) &&
          console.warn(`${t.getShaderInfoLog(l)}\nVertex Shader\n${Tr(e)}`);
      const c = t.createShader(t.FRAGMENT_SHADER);
      if (
        (t.shaderSource(c, i),
        t.compileShader(c),
        "" !== t.getShaderInfoLog(c) &&
          console.warn(`${t.getShaderInfoLog(c)}\nFragment Shader\n${Tr(i)}`),
        (this.program = t.createProgram()),
        t.attachShader(this.program, l),
        t.attachShader(this.program, c),
        t.linkProgram(this.program),
        !t.getProgramParameter(this.program, t.LINK_STATUS))
      )
        return console.warn(t.getProgramInfoLog(this.program));
      t.deleteShader(l), t.deleteShader(c), (this.uniformLocations = new Map());
      let d = t.getProgramParameter(this.program, t.ACTIVE_UNIFORMS);
      for (let e = 0; e < d; e++) {
        let i = t.getActiveUniform(this.program, e);
        this.uniformLocations.set(
          i,
          t.getUniformLocation(this.program, i.name)
        );
        const s = i.name.match(/(\w+)/g);
        (i.uniformName = s[0]),
          3 === s.length
            ? ((i.isStructArray = !0),
              (i.structIndex = Number(s[1])),
              (i.structProperty = s[2]))
            : 2 === s.length &&
              isNaN(Number(s[1])) &&
              ((i.isStruct = !0), (i.structProperty = s[1]));
      }
      this.attributeLocations = new Map();
      const p = [],
        g = t.getProgramParameter(this.program, t.ACTIVE_ATTRIBUTES);
      for (let e = 0; e < g; e++) {
        const i = t.getActiveAttrib(this.program, e),
          s = t.getAttribLocation(this.program, i.name);
        (p[s] = i.name), this.attributeLocations.set(i, s);
      }
      this.attributeOrder = p.join("");
    }
    setBlendFunc(t, e, i, s) {
      (this.blendFunc.src = t),
        (this.blendFunc.dst = e),
        (this.blendFunc.srcAlpha = i),
        (this.blendFunc.dstAlpha = s),
        t && (this.transparent = !0);
    }
    setBlendEquation(t, e) {
      (this.blendEquation.modeRGB = t), (this.blendEquation.modeAlpha = e);
    }
    applyState() {
      this.depthTest
        ? this.gl.renderer.enable(this.gl.DEPTH_TEST)
        : this.gl.renderer.disable(this.gl.DEPTH_TEST),
        this.cullFace
          ? this.gl.renderer.enable(this.gl.CULL_FACE)
          : this.gl.renderer.disable(this.gl.CULL_FACE),
        this.blendFunc.src
          ? this.gl.renderer.enable(this.gl.BLEND)
          : this.gl.renderer.disable(this.gl.BLEND),
        this.cullFace && this.gl.renderer.setCullFace(this.cullFace),
        this.gl.renderer.setFrontFace(this.frontFace),
        this.gl.renderer.setDepthMask(this.depthWrite),
        this.gl.renderer.setDepthFunc(this.depthFunc),
        this.blendFunc.src &&
          this.gl.renderer.setBlendFunc(
            this.blendFunc.src,
            this.blendFunc.dst,
            this.blendFunc.srcAlpha,
            this.blendFunc.dstAlpha
          ),
        this.gl.renderer.setBlendEquation(
          this.blendEquation.modeRGB,
          this.blendEquation.modeAlpha
        );
    }
    use({ flipFaces: t = !1 } = {}) {
      let e = -1;
      this.gl.renderer.currentProgram === this.id ||
        (this.gl.useProgram(this.program),
        (this.gl.renderer.currentProgram = this.id)),
        this.uniformLocations.forEach((t, i) => {
          let s = i.uniformName,
            r = this.uniforms[s];
          if (
            (i.isStruct &&
              ((r = r[i.structProperty]), (s += `.${i.structProperty}`)),
            i.isStructArray &&
              ((r = r[i.structIndex][i.structProperty]),
              (s += `[${i.structIndex}].${i.structProperty}`)),
            !r)
          )
            return Sr(`Active uniform ${s} has not been supplied`);
          if (r && void 0 === r.value)
            return Sr(`${s} uniform is missing a value parameter`);
          if (r.value.texture)
            return (e += 1), r.value.update(e), Ar(this.gl, i.type, t, e);
          if (r.value.length && r.value[0].texture) {
            const s = [];
            return (
              r.value.forEach((t) => {
                (e += 1), t.update(e), s.push(e);
              }),
              Ar(this.gl, i.type, t, s)
            );
          }
          Ar(this.gl, i.type, t, r.value);
        }),
        this.applyState(),
        t &&
          this.gl.renderer.setFrontFace(
            this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW
          );
    }
    remove() {
      this.gl.deleteProgram(this.program);
    }
  }
  function Ar(t, e, i, s) {
    s = s.length
      ? (function (t) {
          const e = t.length,
            i = t[0].length;
          if (void 0 === i) return t;
          const s = e * i;
          let r = br[s];
          r || (br[s] = r = new Float32Array(s));
          for (let s = 0; s < e; s++) r.set(t[s], s * i);
          return r;
        })(s)
      : s;
    const r = t.renderer.state.uniformLocations.get(i);
    if (s.length)
      if (void 0 === r || r.length !== s.length)
        t.renderer.state.uniformLocations.set(i, s.slice(0));
      else {
        if (
          (function (t, e) {
            if (t.length !== e.length) return !1;
            for (let i = 0, s = t.length; i < s; i++)
              if (t[i] !== e[i]) return !1;
            return !0;
          })(r, s)
        )
          return;
        r.set
          ? r.set(s)
          : (function (t, e) {
              for (let i = 0, s = t.length; i < s; i++) t[i] = e[i];
            })(r, s),
          t.renderer.state.uniformLocations.set(i, r);
      }
    else {
      if (r === s) return;
      t.renderer.state.uniformLocations.set(i, s);
    }
    switch (e) {
      case 5126:
        return s.length ? t.uniform1fv(i, s) : t.uniform1f(i, s);
      case 35664:
        return t.uniform2fv(i, s);
      case 35665:
        return t.uniform3fv(i, s);
      case 35666:
        return t.uniform4fv(i, s);
      case 35670:
      case 5124:
      case 35678:
      case 35680:
        return s.length ? t.uniform1iv(i, s) : t.uniform1i(i, s);
      case 35671:
      case 35667:
        return t.uniform2iv(i, s);
      case 35672:
      case 35668:
        return t.uniform3iv(i, s);
      case 35673:
      case 35669:
        return t.uniform4iv(i, s);
      case 35674:
        return t.uniformMatrix2fv(i, !1, s);
      case 35675:
        return t.uniformMatrix3fv(i, !1, s);
      case 35676:
        return t.uniformMatrix4fv(i, !1, s);
    }
  }
  function Tr(t) {
    let e = t.split("\n");
    for (let t = 0; t < e.length; t++) e[t] = t + 1 + ": " + e[t];
    return e.join("\n");
  }
  let Er = 0;
  function Sr(t) {
    Er > 100 ||
      (console.warn(t),
      Er++,
      Er > 100 &&
        console.warn("More than 100 program warnings - stopping logs."));
  }
  const Cr = new Js();
  let Fr = 1,
    Pr = 1,
    Rr = !1;
  class Dr {
    constructor(t, e = {}) {
      t.canvas || console.error("gl not passed as first argument to Geometry"),
        (this.gl = t),
        (this.attributes = e),
        (this.id = Fr++),
        (this.VAOs = {}),
        (this.drawRange = { start: 0, count: 0 }),
        (this.instancedCount = 0),
        this.gl.renderer.bindVertexArray(null),
        (this.gl.renderer.currentGeometry = null),
        (this.glState = this.gl.renderer.state);
      for (let t in e) this.addAttribute(t, e[t]);
    }
    addAttribute(t, e) {
      if (
        ((this.attributes[t] = e),
        (e.id = Pr++),
        (e.size = e.size || 1),
        (e.type =
          e.type ||
          (e.data.constructor === Float32Array
            ? this.gl.FLOAT
            : e.data.constructor === Uint16Array
            ? this.gl.UNSIGNED_SHORT
            : this.gl.UNSIGNED_INT)),
        (e.target =
          "index" === t ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER),
        (e.normalized = e.normalized || !1),
        (e.stride = e.stride || 0),
        (e.offset = e.offset || 0),
        (e.count =
          e.count ||
          (e.stride ? e.data.byteLength / e.stride : e.data.length / e.size)),
        (e.divisor = e.instanced || 0),
        (e.needsUpdate = !1),
        (e.usage = e.usage || this.gl.STATIC_DRAW),
        e.buffer || this.updateAttribute(e),
        e.divisor)
      ) {
        if (
          ((this.isInstanced = !0),
          this.instancedCount && this.instancedCount !== e.count * e.divisor)
        )
          return (
            console.warn(
              "geometry has multiple instanced buffers of different length"
            ),
            (this.instancedCount = Math.min(
              this.instancedCount,
              e.count * e.divisor
            ))
          );
        this.instancedCount = e.count * e.divisor;
      } else
        "index" === t
          ? (this.drawRange.count = e.count)
          : this.attributes.index ||
            (this.drawRange.count = Math.max(this.drawRange.count, e.count));
    }
    updateAttribute(t) {
      const e = !t.buffer;
      e && (t.buffer = this.gl.createBuffer()),
        this.glState.boundBuffer !== t.buffer &&
          (this.gl.bindBuffer(t.target, t.buffer),
          (this.glState.boundBuffer = t.buffer)),
        e
          ? this.gl.bufferData(t.target, t.data, t.usage)
          : this.gl.bufferSubData(t.target, 0, t.data),
        (t.needsUpdate = !1);
    }
    setIndex(t) {
      this.addAttribute("index", t);
    }
    setDrawRange(t, e) {
      (this.drawRange.start = t), (this.drawRange.count = e);
    }
    setInstancedCount(t) {
      this.instancedCount = t;
    }
    createVAO(t) {
      (this.VAOs[t.attributeOrder] = this.gl.renderer.createVertexArray()),
        this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),
        this.bindAttributes(t);
    }
    bindAttributes(t) {
      t.attributeLocations.forEach((t, { name: e, type: i }) => {
        if (!this.attributes[e])
          return void console.warn(`active attribute ${e} not being supplied`);
        const s = this.attributes[e];
        this.gl.bindBuffer(s.target, s.buffer),
          (this.glState.boundBuffer = s.buffer);
        let r = 1;
        35674 === i && (r = 2), 35675 === i && (r = 3), 35676 === i && (r = 4);
        const n = s.size / r,
          a = 1 === r ? 0 : r * r * r,
          o = 1 === r ? 0 : r * r;
        for (let e = 0; e < r; e++)
          this.gl.vertexAttribPointer(
            t + e,
            n,
            s.type,
            s.normalized,
            s.stride + a,
            s.offset + e * o
          ),
            this.gl.enableVertexAttribArray(t + e),
            this.gl.renderer.vertexAttribDivisor(t + e, s.divisor);
      }),
        this.attributes.index &&
          this.gl.bindBuffer(
            this.gl.ELEMENT_ARRAY_BUFFER,
            this.attributes.index.buffer
          );
    }
    draw({ program: t, mode: e = this.gl.TRIANGLES }) {
      this.gl.renderer.currentGeometry !== `${this.id}_${t.attributeOrder}` &&
        (this.VAOs[t.attributeOrder] || this.createVAO(t),
        this.gl.renderer.bindVertexArray(this.VAOs[t.attributeOrder]),
        (this.gl.renderer.currentGeometry = `${this.id}_${t.attributeOrder}`)),
        t.attributeLocations.forEach((t, { name: e }) => {
          const i = this.attributes[e];
          i.needsUpdate && this.updateAttribute(i);
        }),
        this.isInstanced
          ? this.attributes.index
            ? this.gl.renderer.drawElementsInstanced(
                e,
                this.drawRange.count,
                this.attributes.index.type,
                this.attributes.index.offset + 2 * this.drawRange.start,
                this.instancedCount
              )
            : this.gl.renderer.drawArraysInstanced(
                e,
                this.drawRange.start,
                this.drawRange.count,
                this.instancedCount
              )
          : this.attributes.index
          ? this.gl.drawElements(
              e,
              this.drawRange.count,
              this.attributes.index.type,
              this.attributes.index.offset + 2 * this.drawRange.start
            )
          : this.gl.drawArrays(e, this.drawRange.start, this.drawRange.count);
    }
    getPosition() {
      const t = this.attributes.position;
      return t.data
        ? t
        : Rr
        ? void 0
        : (console.warn("No position buffer data found to compute bounds"),
          (Rr = !0));
    }
    computeBoundingBox(t) {
      t || (t = this.getPosition());
      const e = t.data,
        i = t.stride ? t.stride / e.BYTES_PER_ELEMENT : t.size;
      this.bounds ||
        (this.bounds = {
          min: new Js(),
          max: new Js(),
          center: new Js(),
          scale: new Js(),
          radius: 1 / 0,
        });
      const s = this.bounds.min,
        r = this.bounds.max,
        n = this.bounds.center,
        a = this.bounds.scale;
      s.set(1 / 0), r.set(-1 / 0);
      for (let t = 0, n = e.length; t < n; t += i) {
        const i = e[t],
          n = e[t + 1],
          a = e[t + 2];
        (s.x = Math.min(i, s.x)),
          (s.y = Math.min(n, s.y)),
          (s.z = Math.min(a, s.z)),
          (r.x = Math.max(i, r.x)),
          (r.y = Math.max(n, r.y)),
          (r.z = Math.max(a, r.z));
      }
      a.sub(r, s), n.add(s, r).divide(2);
    }
    computeBoundingSphere(t) {
      t || (t = this.getPosition());
      const e = t.data,
        i = t.stride ? t.stride / e.BYTES_PER_ELEMENT : t.size;
      this.bounds || this.computeBoundingBox(t);
      let s = 0;
      for (let t = 0, r = e.length; t < r; t += i)
        Cr.fromArray(e, t),
          (s = Math.max(s, this.bounds.center.squaredDistance(Cr)));
      this.bounds.radius = Math.sqrt(s);
    }
    remove() {
      for (let t in this.VAOs)
        this.gl.renderer.deleteVertexArray(this.VAOs[t]), delete this.VAOs[t];
      for (let t in this.attributes)
        this.gl.deleteBuffer(this.attributes[t].buffer),
          delete this.attributes[t];
    }
  }
  function kr(t, e, i) {
    let s = e[0],
      r = e[1],
      n = e[2],
      a = e[3],
      o = e[4],
      h = e[5],
      u = e[6],
      l = e[7],
      c = e[8],
      d = i[0],
      p = i[1],
      g = i[2],
      f = i[3],
      m = i[4],
      v = i[5],
      _ = i[6],
      w = i[7],
      y = i[8];
    return (
      (t[0] = d * s + p * a + g * u),
      (t[1] = d * r + p * o + g * l),
      (t[2] = d * n + p * h + g * c),
      (t[3] = f * s + m * a + v * u),
      (t[4] = f * r + m * o + v * l),
      (t[5] = f * n + m * h + v * c),
      (t[6] = _ * s + w * a + y * u),
      (t[7] = _ * r + w * o + y * l),
      (t[8] = _ * n + w * h + y * c),
      t
    );
  }
  class Or extends Array {
    constructor(t = 1, e = 0, i = 0, s = 0, r = 1, n = 0, a = 0, o = 0, h = 1) {
      return super(t, e, i, s, r, n, a, o, h), this;
    }
    set(t, e, i, s, r, n, a, o, h) {
      return t.length
        ? this.copy(t)
        : ((function (t, e, i, s, r, n, a, o, h, u) {
            (t[0] = e),
              (t[1] = i),
              (t[2] = s),
              (t[3] = r),
              (t[4] = n),
              (t[5] = a),
              (t[6] = o),
              (t[7] = h),
              (t[8] = u);
          })(this, t, e, i, s, r, n, a, o, h),
          this);
    }
    translate(t, e = this) {
      return (
        (function (t, e, i) {
          let s = e[0],
            r = e[1],
            n = e[2],
            a = e[3],
            o = e[4],
            h = e[5],
            u = e[6],
            l = e[7],
            c = e[8],
            d = i[0],
            p = i[1];
          (t[0] = s),
            (t[1] = r),
            (t[2] = n),
            (t[3] = a),
            (t[4] = o),
            (t[5] = h),
            (t[6] = d * s + p * a + u),
            (t[7] = d * r + p * o + l),
            (t[8] = d * n + p * h + c);
        })(this, e, t),
        this
      );
    }
    rotate(t, e = this) {
      return (
        (function (t, e, i) {
          let s = e[0],
            r = e[1],
            n = e[2],
            a = e[3],
            o = e[4],
            h = e[5],
            u = e[6],
            l = e[7],
            c = e[8],
            d = Math.sin(i),
            p = Math.cos(i);
          (t[0] = p * s + d * a),
            (t[1] = p * r + d * o),
            (t[2] = p * n + d * h),
            (t[3] = p * a - d * s),
            (t[4] = p * o - d * r),
            (t[5] = p * h - d * n),
            (t[6] = u),
            (t[7] = l),
            (t[8] = c);
        })(this, e, t),
        this
      );
    }
    scale(t, e = this) {
      return (
        (function (t, e, i) {
          let s = i[0],
            r = i[1];
          (t[0] = s * e[0]),
            (t[1] = s * e[1]),
            (t[2] = s * e[2]),
            (t[3] = r * e[3]),
            (t[4] = r * e[4]),
            (t[5] = r * e[5]),
            (t[6] = e[6]),
            (t[7] = e[7]),
            (t[8] = e[8]);
        })(this, e, t),
        this
      );
    }
    multiply(t, e) {
      return e ? kr(this, t, e) : kr(this, this, t), this;
    }
    identity() {
      var t;
      return (
        ((t = this)[0] = 1),
        (t[1] = 0),
        (t[2] = 0),
        (t[3] = 0),
        (t[4] = 1),
        (t[5] = 0),
        (t[6] = 0),
        (t[7] = 0),
        (t[8] = 1),
        this
      );
    }
    copy(t) {
      var e, i;
      return (
        (i = t),
        ((e = this)[0] = i[0]),
        (e[1] = i[1]),
        (e[2] = i[2]),
        (e[3] = i[3]),
        (e[4] = i[4]),
        (e[5] = i[5]),
        (e[6] = i[6]),
        (e[7] = i[7]),
        (e[8] = i[8]),
        this
      );
    }
    fromMatrix4(t) {
      var e, i;
      return (
        (i = t),
        ((e = this)[0] = i[0]),
        (e[1] = i[1]),
        (e[2] = i[2]),
        (e[3] = i[4]),
        (e[4] = i[5]),
        (e[5] = i[6]),
        (e[6] = i[8]),
        (e[7] = i[9]),
        (e[8] = i[10]),
        this
      );
    }
    fromQuaternion(t) {
      return (
        (function (t, e) {
          let i = e[0],
            s = e[1],
            r = e[2],
            n = e[3],
            a = i + i,
            o = s + s,
            h = r + r,
            u = i * a,
            l = s * a,
            c = s * o,
            d = r * a,
            p = r * o,
            g = r * h,
            f = n * a,
            m = n * o,
            v = n * h;
          (t[0] = 1 - c - g),
            (t[3] = l - v),
            (t[6] = d + m),
            (t[1] = l + v),
            (t[4] = 1 - u - g),
            (t[7] = p - f),
            (t[2] = d - m),
            (t[5] = p + f),
            (t[8] = 1 - u - c);
        })(this, t),
        this
      );
    }
    fromBasis(t, e, i) {
      return (
        this.set(t[0], t[1], t[2], e[0], e[1], e[2], i[0], i[1], i[2]), this
      );
    }
    inverse(t = this) {
      return (
        (function (t, e) {
          let i = e[0],
            s = e[1],
            r = e[2],
            n = e[3],
            a = e[4],
            o = e[5],
            h = e[6],
            u = e[7],
            l = e[8],
            c = l * a - o * u,
            d = -l * n + o * h,
            p = u * n - a * h,
            g = i * c + s * d + r * p;
          g &&
            ((g = 1 / g),
            (t[0] = c * g),
            (t[1] = (-l * s + r * u) * g),
            (t[2] = (o * s - r * a) * g),
            (t[3] = d * g),
            (t[4] = (l * i - r * h) * g),
            (t[5] = (-o * i + r * n) * g),
            (t[6] = p * g),
            (t[7] = (-u * i + s * h) * g),
            (t[8] = (a * i - s * n) * g));
        })(this, t),
        this
      );
    }
    getNormalMatrix(t) {
      return (
        (function (t, e) {
          let i = e[0],
            s = e[1],
            r = e[2],
            n = e[3],
            a = e[4],
            o = e[5],
            h = e[6],
            u = e[7],
            l = e[8],
            c = e[9],
            d = e[10],
            p = e[11],
            g = e[12],
            f = e[13],
            m = e[14],
            v = e[15],
            _ = i * o - s * a,
            w = i * h - r * a,
            y = i * u - n * a,
            x = s * h - r * o,
            b = s * u - n * o,
            M = r * u - n * h,
            A = l * f - c * g,
            T = l * m - d * g,
            E = l * v - p * g,
            S = c * m - d * f,
            C = c * v - p * f,
            F = d * v - p * m,
            P = _ * F - w * C + y * S + x * E - b * T + M * A;
          P &&
            ((P = 1 / P),
            (t[0] = (o * F - h * C + u * S) * P),
            (t[1] = (h * E - a * F - u * T) * P),
            (t[2] = (a * C - o * E + u * A) * P),
            (t[3] = (r * C - s * F - n * S) * P),
            (t[4] = (i * F - r * E + n * T) * P),
            (t[5] = (s * E - i * C - n * A) * P),
            (t[6] = (f * M - m * b + v * x) * P),
            (t[7] = (m * y - g * M - v * w) * P),
            (t[8] = (g * b - f * y + v * _) * P));
        })(this, t),
        this
      );
    }
  }
  let zr = 0;
  class Lr extends cr {
    constructor(
      t,
      {
        geometry: e,
        program: i,
        mode: s = t.TRIANGLES,
        frustumCulled: r = !0,
        renderOrder: n = 0,
      } = {}
    ) {
      super(),
        t.canvas || console.error("gl not passed as first argument to Mesh"),
        (this.gl = t),
        (this.id = zr++),
        (this.geometry = e),
        (this.program = i),
        (this.mode = s),
        (this.frustumCulled = r),
        (this.renderOrder = n),
        (this.modelViewMatrix = new hr()),
        (this.normalMatrix = new Or()),
        (this.beforeRenderCallbacks = []),
        (this.afterRenderCallbacks = []);
    }
    onBeforeRender(t) {
      return this.beforeRenderCallbacks.push(t), this;
    }
    onAfterRender(t) {
      return this.afterRenderCallbacks.push(t), this;
    }
    draw({ camera: t } = {}) {
      this.beforeRenderCallbacks.forEach(
        (e) => e && e({ mesh: this, camera: t })
      ),
        t &&
          (this.program.uniforms.modelMatrix ||
            Object.assign(this.program.uniforms, {
              modelMatrix: { value: null },
              viewMatrix: { value: null },
              modelViewMatrix: { value: null },
              normalMatrix: { value: null },
              projectionMatrix: { value: null },
              cameraPosition: { value: null },
            }),
          (this.program.uniforms.projectionMatrix.value = t.projectionMatrix),
          (this.program.uniforms.cameraPosition.value = t.worldPosition),
          (this.program.uniforms.viewMatrix.value = t.viewMatrix),
          this.modelViewMatrix.multiply(t.viewMatrix, this.worldMatrix),
          this.normalMatrix.getNormalMatrix(this.modelViewMatrix),
          (this.program.uniforms.modelMatrix.value = this.worldMatrix),
          (this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix),
          (this.program.uniforms.normalMatrix.value = this.normalMatrix));
      let e = this.program.cullFace && this.worldMatrix.determinant() < 0;
      this.program.use({ flipFaces: e }),
        this.geometry.draw({ mode: this.mode, program: this.program }),
        this.afterRenderCallbacks.forEach(
          (e) => e && e({ mesh: this, camera: t })
        );
    }
  }
  let jr = "1.0";
  n.testBrowser("chrome") && ((jr = "40.0"), n.isLite() && (jr = "1.0"));
  const Ir =
      "uniform sampler2D tMap;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n  vec3 tex = texture2D(tMap, vUv).rgb;\n  float signedDist = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;\n  float d = fwidth(signedDist);\n  float alpha = smoothstep(-d, d, signedDist);\n\n  vec3 final = vec3(1.0, 1.0, 1.0);\n\n  gl_FragColor.rgb = final;\n  gl_FragColor.a = alpha;\n}".replace(
        "${repeats}",
        jr
      ),
    Br =
      "#extension GL_OES_standard_derivatives : enable\n  precision highp float;\n" +
      Ir,
    Ur =
      "#version 300 es\n  precision highp float;\n  #define varying in\n  #define texture2D texture\n  #define gl_FragColor FragColor\n  out vec4 FragColor;\n" +
      Ir;
  class Nr {
    constructor() {
      (this.speed = 0),
        (this.mouse = { c: { x: 0, y: 0 }, t: { x: 0, y: 0 } }),
        i() ||
          (this.createRenderer(),
          this.createCamera(),
          this.createScene(),
          (this.onMove = this.onMove.bind(this)),
          (this.onResize = this.onResize.bind(this)),
          window.addEventListener("mousemove", this.onMove),
          window.addEventListener("resize", this.onResize),
          this.onResize(),
          this.createHome(),
          (this.update = this.update.bind(this)),
          this.waitForGL(() => {
            this.update();
          }));
    }
    waitForGL(t) {
      "/" === window.location.pathname
        ? document.documentElement.getAttribute("data-gl-loaded")
          ? t()
          : window.addEventListener("glload", () => {
              t();
            })
        : t();
    }
    createRenderer() {
      (this.renderer = new ir({ dpr: 2 })),
        (this.gl = this.renderer.gl),
        document.querySelector("main").appendChild(this.gl.canvas);
    }
    createCamera() {
      (this.camera = new fr(this.gl)), (this.camera.position.z = 5);
    }
    createScene() {
      this.scene = new cr();
    }
    createHome() {
      this.home = new (class {
        constructor({ gl: t, renderer: e, scene: i, sizes: s }) {
          (this.event = new CustomEvent("glload")),
            (this.gl = t),
            (this.renderer = e),
            (this.scene = i),
            (this.sizes = s),
            (this.group = new cr()),
            this.group.setParent(this.scene),
            (this.$items = Array.from(
              document.querySelectorAll(".project-title")
            )),
            (this.itemsGL = []),
            (this.velocity = 2),
            this.createTexts(() => {
              this.onResize({ sizes: this.sizes }),
                this.initIntro(),
                document.documentElement.setAttribute("data-gl-loaded", !0),
                window.dispatchEvent(this.event);
            });
        }
        async createTexts(t) {
          const e = await (
              await fetch("./assets/fonts/gl/Panchang-Bold.json")
            ).json(),
            i = new Image();
          (i.onload = () => {
            this.$items.forEach((t, s) => {
              this.itemsGL.push(
                new (class {
                  constructor({
                    element: t,
                    gl: e,
                    renderer: i,
                    index: s,
                    scene: r,
                    sizes: n,
                    font: a,
                    media: o,
                  }) {
                    (this.element = t),
                      (this.gl = e),
                      (this.renderer = i),
                      (this.index = s),
                      (this.scene = r),
                      (this.sizes = n),
                      (this.font = a),
                      (this.media = o),
                      (this.hover = { t: 0, c: 0 }),
                      (this.top = this.y = 0),
                      this.loadText();
                  }
                  async loadText() {
                    const t = this.element.innerHTML.toUpperCase(),
                      e = n.getStyleNumber(this.element, "font-size");
                    (this.text = new mr({
                      font: this.font,
                      text: t,
                      align: "center",
                      size: (e / window.innerHeight) * this.sizes.height,
                      lineHeight: n.getStyleNumber(this.element, "line-height"),
                    })),
                      this.createTexture(),
                      this.createProgram(),
                      this.createGeometry(),
                      this.createMesh();
                  }
                  createTexture() {
                    (this.texture = new yr(this.gl, { generateMipmaps: !1 })),
                      (this.texture.image = this.media);
                  }
                  createProgram() {
                    (this.program = new Mr(this.gl, {
                      vertex: this.renderer.isWebgl2
                        ? "#version 300 es\n  #define attribute in\n  #define varying out\n#define PI 3.1415926535897932384626433832795\n\nattribute vec2 uv;\nattribute vec3 position;\n\nuniform float uSpeed;\nuniform vec2 uViewportSizes;\nuniform vec2 uMouse;\nuniform float uHover;\nuniform float uTime;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nvarying vec2 vUv;\n\nfloat circle(in vec2 _st, in vec2 _center, in float _radius, in float _ratio){\n  _st.y *= _ratio;\n  _center.y *= _ratio;\n  vec2 dist = _st-vec2(_center);\n  float r1 = _radius-(_radius*-0.054);\n  float r2 = _radius+(_radius*-0.982);\n\treturn 1.-smoothstep(r1, r2, dot(dist,dist)*5.);\n}\n// 2D Random\nfloat random (in vec2 st) {\n    return fract(sin(dot(st.xy,\n                         vec2(12.9898,78.233)))\n                 * 43758.5453123);\n}\n\n// 2D Noise based on Morgan McGuire @morgan3d\n// https://www.shadertoy.com/view/4dS3Wd\nfloat noise (in vec2 st) {\n    vec2 i = floor(st);\n    vec2 f = fract(st);\n\n    // Four corners in 2D of a tile\n    float a = random(i);\n    float b = random(i + vec2(1.0, 0.0));\n    float c = random(i + vec2(0.0, 1.0));\n    float d = random(i + vec2(1.0, 1.0));\n\n    // Smooth Interpolation\n\n    // Cubic Hermine Curve.  Same as SmoothStep()\n    vec2 u = f*f*(3.0-2.0*f);\n    // u = smoothstep(0.,1.,f);\n\n    // Mix 4 coorners percentages\n    return mix(a, b, u.x) +\n            (c - a)* u.y * (1.0 - u.x) +\n            (d - b) * u.x * u.y;\n}\n\nvoid main() {\n  vUv = uv;\n  float ratio = uViewportSizes.y/uViewportSizes.x;\n\n  vec2 mousePos = uMouse;\n  mousePos.y *= -1.;\n  mousePos.y += 1.;\n\n  float mouse = circle(vUv, mousePos, 0.2, ratio);\n\n  float wave = noise(vUv * uTime * 0.1) * 0.05;\n  vec4 newPosition = modelViewMatrix * vec4(position + wave * uHover, 1.0);\n  float curve = smoothstep(0.05, 4.0, distance(0.05, newPosition.x));\n  newPosition.x -= newPosition.x * mouse * uHover * 0.1;\n\n\n  newPosition.z += (sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0)) * uSpeed;\n  newPosition.z += curve + curve * uViewportSizes.y / uViewportSizes.x * 1.2;\n\n  gl_Position = projectionMatrix * newPosition;\n}\n"
                        : " \n#define PI 3.1415926535897932384626433832795\n\nattribute vec2 uv;\nattribute vec3 position;\n\nuniform float uSpeed;\nuniform vec2 uViewportSizes;\nuniform vec2 uMouse;\nuniform float uHover;\nuniform float uTime;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nvarying vec2 vUv;\n\nfloat circle(in vec2 _st, in vec2 _center, in float _radius, in float _ratio){\n  _st.y *= _ratio;\n  _center.y *= _ratio;\n  vec2 dist = _st-vec2(_center);\n  float r1 = _radius-(_radius*-0.054);\n  float r2 = _radius+(_radius*-0.982);\n\treturn 1.-smoothstep(r1, r2, dot(dist,dist)*5.);\n}\n// 2D Random\nfloat random (in vec2 st) {\n    return fract(sin(dot(st.xy,\n                         vec2(12.9898,78.233)))\n                 * 43758.5453123);\n}\n\n// 2D Noise based on Morgan McGuire @morgan3d\n// https://www.shadertoy.com/view/4dS3Wd\nfloat noise (in vec2 st) {\n    vec2 i = floor(st);\n    vec2 f = fract(st);\n\n    // Four corners in 2D of a tile\n    float a = random(i);\n    float b = random(i + vec2(1.0, 0.0));\n    float c = random(i + vec2(0.0, 1.0));\n    float d = random(i + vec2(1.0, 1.0));\n\n    // Smooth Interpolation\n\n    // Cubic Hermine Curve.  Same as SmoothStep()\n    vec2 u = f*f*(3.0-2.0*f);\n    // u = smoothstep(0.,1.,f);\n\n    // Mix 4 coorners percentages\n    return mix(a, b, u.x) +\n            (c - a)* u.y * (1.0 - u.x) +\n            (d - b) * u.x * u.y;\n}\n\nvoid main() {\n  vUv = uv;\n  float ratio = uViewportSizes.y/uViewportSizes.x;\n\n  vec2 mousePos = uMouse;\n  mousePos.y *= -1.;\n  mousePos.y += 1.;\n\n  float mouse = circle(vUv, mousePos, 0.2, ratio);\n\n  float wave = noise(vUv * uTime * 0.1) * 0.05;\n  vec4 newPosition = modelViewMatrix * vec4(position + wave * uHover, 1.0);\n  float curve = smoothstep(0.05, 4.0, distance(0.05, newPosition.x));\n  newPosition.x -= newPosition.x * mouse * uHover * 0.1;\n\n\n  newPosition.z += (sin(newPosition.y / uViewportSizes.y * PI + PI / 2.0)) * uSpeed;\n  newPosition.z += curve + curve * uViewportSizes.y / uViewportSizes.x * 1.2;\n\n  gl_Position = projectionMatrix * newPosition;\n}\n",
                      fragment: this.renderer.isWebgl2 ? Ur : Br,
                      uniforms: {
                        tMap: { value: this.texture },
                        uSpeed: { value: 0 },
                        uTime: { value: 0 },
                        uHover: { value: 0 },
                        uMouse: { value: [0, 0] },
                        uViewportSizes: {
                          value: [this.sizes.width, this.sizes.height],
                        },
                      },
                      transparent: !0,
                      cullFace: null,
                      depthWrite: !1,
                    })),
                      this.element
                        .closest(".project")
                        .addEventListener("mouseover", () => {
                          (this.hover.t = 1), setTimeout(() => {}, 300);
                        }),
                      this.element
                        .closest(".project")
                        .addEventListener("mouseout", () => {
                          this.hover.t = 0;
                        });
                  }
                  createGeometry() {
                    this.geometry = new Dr(this.gl, {
                      position: { size: 3, data: this.text.buffers.position },
                      uv: { size: 2, data: this.text.buffers.uv },
                      id: { size: 1, data: this.text.buffers.id },
                      index: { data: this.text.buffers.index },
                    });
                  }
                  createMesh() {
                    (this.mesh = new Lr(this.gl, {
                      geometry: this.geometry,
                      program: this.program,
                    })),
                      this.mesh.setParent(this.scene);
                  }
                  onResize(t) {
                    (this.sizes = t.sizes),
                      (this.y = this.top = n.getPosition(this.element).y);
                  }
                  update(t, e, i) {
                    if (this.mesh) {
                      const t = window.scroll.data ? window.scroll.data.c : 0;
                      this.mesh.position.y =
                        (-(this.y - t) / window.innerHeight) *
                          this.sizes.height +
                        this.sizes.height / 2;
                    }
                    this.program &&
                      ((this.hover.c += 0.09 * (this.hover.t - this.hover.c)),
                      (this.program.uniforms.uHover.value = this.hover.c),
                      (this.program.uniforms.uTime.value = t / 100),
                      void 0 !== e && (this.program.uniforms.uSpeed.value = e),
                      void 0 !== i &&
                        (this.program.uniforms.uMouse.value = [i.c.x, i.c.y]));
                  }
                })({
                  element: t,
                  index: s,
                  renderer: this.renderer,
                  gl: this.gl,
                  scene: this.group,
                  sizes: this.sizes,
                  font: e,
                  media: i,
                })
              );
            }),
              t && t();
          }),
            (i.src = "./assets/fonts/gl/Panchang-Bold.min.png");
        }
        initIntro() {
          (this.$projectsInViewport = this.$items.filter((t) =>
            n.isInViewportDom(t)
          )),
            this.$items.forEach((t, e) => {
              this.itemsGL[e].y = window.innerHeight;
            });
        }
        intro() {
          let t = 0.5;
          this.$items.forEach((e, i) => {
            Ns.to(this.itemsGL[i], {
              y: this.itemsGL[i].top,
              duration: 2,
              delay: t,
              ease: "power4.out",
            }),
              this.$projectsInViewport.includes(e) && (t += 0.2);
          });
        }
        onResize(t) {
          (this.sizes = t.sizes), this.itemsGL.forEach((e) => e.onResize(t));
        }
        update(t, e, i) {
          this.itemsGL.forEach((s) => s.update(t, e, i));
        }
        destroy() {
          this.scene.removeChild(this.group);
        }
      })({
        gl: this.gl,
        renderer: this.renderer,
        scene: this.scene,
        sizes: this.sizes,
      });
    }
    intro() {
      this.home.intro();
    }
    onMove(t) {
      (this.mouse.t.x = t.clientX / window.innerWidth),
        (this.mouse.t.y = t.clientY / window.innerHeight);
    }
    onResize() {
      this.renderer.setSize(window.innerWidth, window.innerHeight),
        this.camera.perspective({
          aspect: this.gl.canvas.width / this.gl.canvas.height,
        });
      const t = this.camera.fov * (Math.PI / 180),
        e = 2 * Math.tan(t / 2) * this.camera.position.z,
        i = e * this.camera.aspect;
      this.sizes = { height: e, width: i };
      const s = { sizes: this.sizes };
      this.home && this.home.onResize(s);
    }
    update(t) {
      const e = window.scroll.data ? window.scroll.data.t : 0,
        i = window.scroll.data ? window.scroll.max : 0,
        s = window.scroll.data ? window.scroll.delta : 0;
      (e === i && !0 === window.scroll.isDown) ||
        (0 === e && !1 === window.scroll.isDown) ||
        (this.speed += 0.05 * (0.02 * s - this.speed)),
        (this.mouse.c.x += 0.05 * (this.mouse.t.x - this.mouse.c.x)),
        (this.mouse.c.y += 0.05 * (this.mouse.t.y - this.mouse.c.y)),
        this.home && this.home.update(t, this.speed, this.mouse),
        this.renderer.render({ camera: this.camera, scene: this.scene }),
        requestAnimationFrame(this.update);
    }
  }
  const qr = JSON.parse(
    '[{"title":"Espacio Crudo","slug":"espacio-crudo","url":"https://espaciocrudo.com","tags":[{"name":"Date","value":"2022"},{"name":"Agency","value":"Contra Studio"},{"name":"Client","value":"Espacio Crudo"},{"name":"Role","value":"Front-end dev & Motion"}],"color":"#0D1C19","cover":"/assets/img/espacio-crudo/cover.jpg","preview":["/assets/img/espacio-crudo/preview-1.jpg","/assets/img/espacio-crudo/preview-2.jpg","/assets/img/espacio-crudo/preview-3.jpg"],"content":[["/assets/img/espacio-crudo/content-1.jpg"],["/assets/img/espacio-crudo/content-2.jpg","/assets/img/espacio-crudo/content-3.jpg"],["/assets/img/espacio-crudo/content-4.jpg"]]},{"title":"UNAIDS survivors","slug":"unaids-survivors","url":"https://survivors.unaids.org","tags":[{"name":"Date","value":"2021"},{"name":"Agency","value":"Elkanodata"},{"name":"Client","value":"UNAIDS"},{"name":"Role","value":"Front-end dev"}],"color":"#19281D","cover":"/assets/img/unaids-survivors/cover.jpg","preview":["/assets/img/unaids-survivors/preview-1.jpg","/assets/img/unaids-survivors/preview-2.jpg","/assets/img/unaids-survivors/preview-3.jpg"],"content":[["/assets/img/unaids-survivors/content-1.jpg"],["/assets/img/unaids-survivors/content-2.jpg","/assets/img/unaids-survivors/content-3.jpg"],["/assets/img/unaids-survivors/content-4.jpg"],["/assets/img/unaids-survivors/content-5.jpg"]]},{"title":"Marfala","slug":"marfala","url":"https://marfala.com","tags":[{"name":"Date","value":"2021"},{"name":"Agency","value":"Contra Studio"},{"name":"Client","value":"Marfala"},{"name":"Role","value":"Front-end dev & Motion"}],"color":"#293814","cover":"/assets/img/marfala/cover.jpg","preview":["/assets/img/marfala/preview-1.jpg","/assets/img/marfala/preview-2.jpg","/assets/img/marfala/preview-3.jpg"],"content":[["/assets/img/marfala/content-1.jpg"],["/assets/img/marfala/content-2.jpg","/assets/img/marfala/content-3.jpg"],["/assets/img/marfala/content-4.jpg"],["/assets/img/marfala/content-5.jpg"]]},{"title":"Yummy Colours","slug":"yummy-colours","url":"https://yummycolours.com","tags":[{"name":"Date","value":"2021"},{"name":"Agency","value":"Twoo®"},{"name":"Client","value":"Yummy Colours"},{"name":"Role","value":"Front-end dev & Motion"}],"color":"#0b24fb","cover":"/assets/img/yummy-colours/cover.jpg","preview":["/assets/img/yummy-colours/preview-1.jpg","/assets/img/yummy-colours/preview-2.jpg","/assets/img/yummy-colours/preview-3.gif"],"content":[["/assets/img/yummy-colours/content-1.jpg"],["/assets/img/yummy-colours/content-2.jpg","/assets/img/yummy-colours/preview-3.gif"],["/assets/img/yummy-colours/content-4.jpg"],["/assets/img/yummy-colours/content-5.jpg"]]},{"title":"Follow the change","url":"https://followthechange.yml.co/","tags":[{"name":"Date","value":"2021"},{"name":"Client","value":"YML"},{"name":"Role","value":"Front-end dev"}],"color":"#F0E8D3","preview":["/assets/img/follow-the-change/preview-1.jpg","/assets/img/follow-the-change/preview-2.jpg","/assets/img/follow-the-change/preview-3.jpg"]},{"title":"Anastasiia","url":"http://anastasiiasobolieva.com/","tags":[{"name":"Date","value":"2022"},{"name":"Client","value":"Anastaiia Sobolieva"},{"name":"Role","value":"Front-end dev & Motion"}],"color":"#C4FF1C","preview":["/assets/img/anastasiia/preview-1.jpg","/assets/img/anastasiia/preview-2.jpg","/assets/img/anastasiia/preview-3.jpg"]},{"title":"The virtual is real","slug":"the-virtual-is-real","url":"https://unfpa.org/thevirtualisreal","tags":[{"name":"Date","value":"2021"},{"name":"Agency","value":"Elkanodata"},{"name":"Client","value":"UNFPA"},{"name":"Role","value":"Front-end dev & Motion"}],"color":"#9D9C90","cover":"/assets/img/the-virtual-is-real/cover.jpg","preview":["/assets/img/the-virtual-is-real/preview-1.jpg","/assets/img/the-virtual-is-real/preview-2.jpg","/assets/img/the-virtual-is-real/preview-3.jpg"],"content":[["/assets/img/the-virtual-is-real/content-1.jpg"],["/assets/img/the-virtual-is-real/content-2.jpg","/assets/img/the-virtual-is-real/content-3.jpg"],["/assets/img/the-virtual-is-real/content-4.jpg"],["/assets/img/the-virtual-is-real/content-5.jpg"]]},{"title":"Grata","slug":"grata","url":"https://grata.studio","tags":[{"name":"Date","value":"2020"},{"name":"Agency","value":"Contra Studio"},{"name":"Client","value":"Grata"},{"name":"Role","value":"Front-end dev & Motion"}],"color":"#FCCAB8","cover":"/assets/img/grata/cover.jpg","preview":["/assets/img/grata/preview-1.jpg","/assets/img/grata/preview-2.jpg","/assets/img/grata/preview-3.jpg"],"content":[["/assets/img/grata/content-1.jpg"],["/assets/img/grata/content-2.jpg","/assets/img/grata/content-3.jpg"],["/assets/img/grata/content-4.jpg"],["/assets/img/grata/content-5.jpg"]]},{"title":"Geoff Levy","slug":"geoff-levy","url":"https://geofflevy.com","tags":[{"name":"Date","value":"2019"},{"name":"Agency","value":"Twoo®"},{"name":"Client","value":"Geoff Levy"},{"name":"Role","value":"Front-end dev & Motion"}],"color":"#C6A1A9","cover":"/assets/img/geoff-levy/cover.jpg","preview":["/assets/img/geoff-levy/preview-1.jpg","/assets/img/geoff-levy/preview-2.jpg","/assets/img/geoff-levy/preview-3.jpg"],"content":[["/assets/img/geoff-levy/content-1.jpg"],["/assets/img/geoff-levy/content-2.jpg","/assets/img/geoff-levy/content-3.jpg"],["/assets/img/geoff-levy/content-4.jpg"],["/assets/img/geoff-levy/content-5.jpg"]]},{"title":"Folk Estudio","slug":"folk-estudio","url":"https://folk-estudio.com","tags":[{"name":"Date","value":"2021"},{"name":"Client","value":"Folk Estudio"},{"name":"Role","value":"Front-end dev & Motion"}],"color":"#FD7D68","cover":"/assets/img/folk-estudio/cover.jpg","preview":["/assets/img/folk-estudio/preview-1.jpg","/assets/img/folk-estudio/preview-2.jpg","/assets/img/folk-estudio/preview-3.jpg"],"content":[["/assets/img/folk-estudio/content-1.jpg"],["/assets/img/folk-estudio/content-2.jpg","/assets/img/folk-estudio/content-3.jpg"],["/assets/img/folk-estudio/content-4.jpg"],["/assets/img/folk-estudio/content-5.jpg"]]},{"title":"Generation Equality","slug":"generation-equality","url":"https://interactive.unwomen.org/multimedia/feature/generationequalityrising/en/index.html","tags":[{"name":"Date","value":"2021"},{"name":"Agency","value":"Elkanodata"},{"name":"Client","value":"UN Women"},{"name":"Role","value":"Front-end dev & Motion"}],"color":"#CEF6FB","cover":"/assets/img/generation-equality/cover.jpg","preview":["/assets/img/generation-equality/preview-1.jpg","/assets/img/generation-equality/preview-2.jpg","/assets/img/generation-equality/preview-3.jpg"],"content":[["/assets/img/generation-equality/content-1.jpg"],["/assets/img/generation-equality/content-2.jpg","/assets/img/generation-equality/content-3.jpg"],["/assets/img/generation-equality/content-4.jpg"],["/assets/img/generation-equality/content-5.jpg"]]},{"title":"Renaissance","url":"https://therenaissanceperiod.com","tags":[{"name":"Date","value":"2022"},{"name":"Collaboration","value":"Alex Tkachev"},{"name":"Role","value":"Front-end dev & Motion"}],"color":"#DFDDDB","preview":["/assets/img/renaissance/preview-1.jpg","/assets/img/renaissance/preview-2.jpg","/assets/img/renaissance/preview-3.jpg"]},{"title":"Nina Simone","url":"https://nina.jorgetoloza.co","tags":[{"name":"Date","value":"2020"},{"name":"Series","value":"Weeked experiments"},{"name":"Role","value":"Front-end dev, Design & Motion"}],"color":"#C2B6A4","preview":["/assets/img/nina-simone/preview-1.jpg","/assets/img/nina-simone/preview-2.jpg","/assets/img/nina-simone/preview-3.jpg"]},{"title":"The lighthouse","url":"https://the-lighthouse.jorgetoloza.co","tags":[{"name":"Date","value":"2020"},{"name":"Series","value":"Weeked experiments"},{"name":"Role","value":"Front-end dev, Design & Motion"}],"color":"#FFFFFF","preview":["/assets/img/the-lighthouse/preview-1.jpg","/assets/img/the-lighthouse/preview-2.jpg","/assets/img/the-lighthouse/preview-3.jpg"]},{"title":"Joy Crookes","url":"https://joy.jorgetoloza.co","tags":[{"name":"Date","value":"2020"},{"name":"Series","value":"Weeked experiments"},{"name":"Role","value":"Front-end dev, Design & Motion"}],"color":"#FFF3BF","preview":["/assets/img/joy/preview-1.jpg","/assets/img/joy/preview-2.jpg","/assets/img/joy/preview-3.jpg"]}]'
  );
  new (class extends class {
    constructor(t) {
      this.options = t || {};
      let e = location.pathname;
      "/" !== e[e.length - 1] && (e += "/"),
        (n.isTouch() || window.innerWidth <= 768) &&
        "about" !== e.replace(/\//g, "") &&
        "404" !== e.replace(/\//g, "")
          ? (location.href = "/about/")
          : (this.init(), this.initIntro(), n.waitForLoader(this.pageReady));
    }
    init() {
      (this.resize = this.resize.bind(this)),
        (this.pageReady = this.pageReady.bind(this)),
        (this.paralax = this.paralax.bind(this)),
        (this.isMobile = !1),
        (this.mobileInitialized = !1),
        (this.winW = window.innerWidth),
        (this.winH = window.innerHeight),
        (this.$nav = document.querySelector("#nav")),
        document.documentElement.setAttribute("data-browser", n.getBrowser()),
        document.documentElement.setAttribute("data-touch", n.isTouch()),
        this.resize(),
        window.addEventListener("resize", () => {
          clearTimeout(this.resizeTO),
            this.resize(),
            (this.resizeTO = setTimeout(() => {
              this.resize();
            }, 500));
        }),
        (this.overlay = document.getElementById("overlay")),
        Array.from(document.querySelectorAll(".inner-link")).forEach((t) => {
          t.addEventListener("click", (e) => {
            e.preventDefault(),
              this.overlay.classList.add("show"),
              setTimeout(() => {
                let e = t.href;
                location.href = e;
              }, 350);
          });
        }),
        window.addEventListener("beforeunload", () => {
          this.overlay.classList.add("show");
        }),
        window.addEventListener("pagehide", () => {
          this.overlay.classList.remove("show");
        }),
        this.setOS();
    }
    pageReady() {
      this.resize(),
        (window.scroll = new qs({
          page: document.querySelector("#page"),
          pointer: document.querySelector("#scroll-pointer"),
          paralax: [this.paralax],
          native: this.options.nativeScroll,
        })),
        this.paralax(),
        this.intro();
    }
    paralax(t) {
      this.scrollItems.forEach((t) => {
        const e = Number(t.getAttribute("data-scroll-item-offset") || 120);
        !t.classList.contains("show") &&
          n.isInViewportDom(t, e) &&
          t.classList.add("show");
      });
    }
    initIntro() {}
    intro() {}
    setOS() {
      let t = "osx";
      navigator.platform
        ? navigator.platform.indexOf("Win") > -1
          ? (t = "windows")
          : navigator.platform.indexOf("Mac") > -1
          ? (t = "osx")
          : navigator.platform.indexOf("Linux") > -1 && (t = "linux")
        : navigator.userAgent.indexOf("Windows") > -1
        ? (t = "windows")
        : navigator.userAgent.indexOf("Mac") > -1
        ? (t = "osx")
        : navigator.userAgent.indexOf("Linux") > -1 && (t = "linux"),
        document.documentElement.setAttribute("data-os", t);
    }
    updateScrollElements() {
      this.scrollItems = [
        ...Array.from(document.querySelectorAll(".fade-in")),
        ...Array.from(document.querySelectorAll(".fade-in-y")),
        ...Array.from(document.querySelectorAll("[data-scroll-item]")),
      ];
    }
    resize() {
      (this.winW = window.innerWidth), (this.winH = window.innerHeight);
      const t = 0.01 * this.winH;
      (this.isMobile = window.innerWidth <= 1024),
        this.isMobile && !this.mobileInitialized
          ? ((this.mobileInitialized = !0),
            document.documentElement.style.setProperty("--vh", `${t}px`))
          : this.isMobile ||
            document.documentElement.style.setProperty("--vh", `${t}px`);
      let e,
        i = document.querySelector(".container");
      i
        ? (e = i.getBoundingClientRect())
        : ((i = document.createElement("div")),
          i.classList.add("container"),
          document.body.append(i),
          (e = i.getBoundingClientRect()),
          i.remove()),
        e &&
          (document.documentElement.style.setProperty(
            "--container-margin",
            `${e.left}px`
          ),
          document.documentElement.style.setProperty(
            "--container-width",
            `${e.width}px`
          )),
        this.updateScrollElements();
    }
  } {
    constructor() {
      super(),
        (this.projectsContainer = document.querySelector("#projects")),
        !i() &&
          window.innerWidth >= 768 &&
          (this.initProjects(), (this.canvas = new Nr()));
    }
    pageReady() {
      super.pageReady(),
        !i() &&
          window.innerWidth >= 768 &&
          (this.canvas.intro(), this.initNav());
    }
    initIntro() {
      document.querySelector("#header").classList.add("no-events"),
        this.$nav
          .querySelector(".nav-info-item:first-child")
          .classList.remove("show");
    }
    intro() {
      setTimeout(() => {
        document.querySelector("#header").classList.remove("no-events"),
          this.$nav
            .querySelector(".nav-info-item:first-child")
            .classList.add("show");
      }, 1500);
    }
    initProjects() {
      const t = document.querySelector("#nav-info"),
        i = e();
      qr.forEach((t, e) => {
        const s = document.createElement("a");
        s.classList.add("project");
        const r = t.tags.map((t) => t.value).join(" - "),
          n = t.preview
            .map((t, s) => {
              let r = t;
              return (
                i && (r = t.replace(/\.jpg|\.gif/, ".webp")),
                `<figure class="project-image" style="background-image: url('${
                  e < 5 ? r : ""
                }')" ${e >= 5 ? 'data-src="' + r + '"' : ""}"></figure>`
              );
            })
            .join(""),
          a = t.slug ? `./work/${t.slug}/` : t.url;
        t.slug
          ? s.classList.add("inner-link")
          : s.setAttribute("target", "_blank"),
          s.setAttribute("href", a),
          s.setAttribute("data-color", t.color),
          (s.innerHTML = `\n        <div class="project-subtitle">${r}</div>\n        <h1 class="project-title">${t.title}</h1>\n        <div class="project-images">${n} </div>\n      `),
          this.projectsContainer.appendChild(s);
      }),
        Array.from(this.projectsContainer.querySelectorAll(".project")).forEach(
          (e, i) => {
            e.addEventListener("mouseover", () => {
              const s = e.closest(".project").getAttribute("data-color");
              this.projectsContainer.style.background = s;
              const r = t.querySelector(".nav-info-item.show");
              r && r.classList.remove("show");
              const n = t.querySelector(
                ".nav-info-item:nth-child(" + (i + 2) + ")"
              );
              n && n.classList.add("show"),
                Array.from(
                  e
                    .closest(".project")
                    .querySelectorAll(".project-image[data-src]")
                ).forEach((t) => {
                  (t.style.backgroundImage = `url(${t.getAttribute(
                    "data-src"
                  )})`),
                    t.removeAttribute("data-src");
                });
            });
          }
        );
    }
    initNav() {
      const t = document.querySelector("#nav-info");
      qr.forEach((e, i) => {
        const s = document.createElement("div"),
          r = e.tags
            .filter((t, e) => e < 3)
            .map(
              (t) =>
                `<div class="nav-info-column">${t.value
                  .split("")
                  .map(
                    (t) =>
                      `<span class="nav-info-letter-mask"><span class="nav-info-letter">${t}</span></span>`
                  )
                  .join("")}</div>`
            )
            .join("");
        s.classList.add("nav-info-item"), (s.innerHTML = r), t.appendChild(s);
      });
    }
  })();
})();
