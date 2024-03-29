addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

const BUCKET_NAME = 'mapeo-webmaps'
const BUCKET_URL = `https://${BUCKET_NAME}.s3.amazonaws.com/public`

async function serveAsset(event) {
  const url = new URL(event.request.url)
  const cache = caches.default

  let response = await cache.match(event.request)

  if (!response) {
    response = await fetch(`${BUCKET_URL}${url.pathname}`)
    if (response.status !== 200) {
      response = await fetch(`${BUCKET_URL}/index.html`)
    }
    const headers = {
      'cache-control': 'public, max-age=800',
      'content-type': response.headers.get('content-type'),
    }
    response = new Response(response.body, { ...response, headers })
    event.waitUntil(cache.put(event.request, response.clone()))
  }
  return response
}

async function handleRequest(event) {
  if (event.request.method === 'GET') {
    let response = await serveAsset(event)
    if (response.status > 399) {
      response = new Response(response.statusText, { status: response.status })
    }
    return response
  } else {
    return new Response('Method not allowed', { status: 405 })
  }
}
