if ('serviceWorker' in navigator) {
    const {error, log} = console;
    window.addEventListener('load', () => {
        navigator
            .serviceWorker
            .register('/sw.js')
            .then(registration => {
                log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                error('ServiceWorker registration failed: ', err);
            });
    });
    // navigator
    //     .serviceWorker
    //     .ready
    //     .then(registration => {
    //         log('serviceWorker.ready', registration);
    //         return registration
    //             .sync
    //             .register('myFirstSync');
    //     });
}