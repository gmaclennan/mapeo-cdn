const window = this
!(function(e) {
  var t = {}
  function n(o) {
    if (t[o]) return t[o].exports
    var r = (t[o] = { i: o, l: !1, exports: {} })
    return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports
  }
  ;(n.m = e),
    (n.c = t),
    (n.d = function(e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o })
    }),
    (n.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 })
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e
      var o = Object.create(null)
      if (
        (n.r(o),
        Object.defineProperty(o, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var r in e)
          n.d(
            o,
            r,
            function(t) {
              return e[t]
            }.bind(null, r),
          )
      return o
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default
            }
          : function() {
              return e
            }
      return n.d(t, 'a', t), t
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }),
    (n.p = ''),
    n((n.s = 0))
})([
  function(e, t, n) {
    const o = n(0)
    addEventListener('fetch', e => {
      e.respondWith(
        (async function(e) {
          if ('GET' === e.request.method) {
            let t = await (async function(e) {
              const t = new URL(e.request.url),
                n = caches.default
              console.log('HELLO', typeof window)
              let s = await n.match(e.request)
              if (!s) {
                if (200 !== (s = await fetch(`${r}${t.pathname}`)).status) {
                  const e = o.toString(t.pathname)
                  console.log(e),
                    (s = new Response(e, {
                      headers: { 'content-type': 'text/html' },
                    }))
                } else {
                  const e = {
                    'cache-control': 'public, max-age=800',
                    'content-type': s.headers.get('content-type'),
                  }
                  s = new Response(s.body, { ...s, headers: e })
                }
                e.waitUntil(n.put(e.request, s.clone()))
              }
              return s
            })(e)
            return (
              t.status > 399 &&
                (t = new Response(t.statusText, { status: t.status })),
              t
            )
          }
          return new Response('Method not allowed', { status: 405 })
        })(e),
      )
    })
    const r = 'https://mapeo-webmaps.s3.amazonaws.com/public'
  },
])
