/**
 *  Simple Router jQuery kkk
 */
let pathName = window.location.pathname,
	baseUrl = window.location.origin,
	pageLoad = '';

if (pathName != '/') {
	jQuery.get(`${baseUrl}/pages${pathName}.html`)
		.done((page) => {
			let pageExists = page.includes('<main id="app"></main>');

			if (!pageExists) {
				pageLoad = `${baseUrl}/pages${pathName}.html`;
			} else {
				pageLoad = `${baseUrl}/pages/404.html`;
			}

			loadPage(pageLoad);
		})
		.fail((err) => {
			console.error(err);
			pageLoad = `${baseUrl}/pages/404.html`;
			loadPage(pageLoad);
		});
} else {
	pageLoad = `${baseUrl}/pages/home.html`;
	loadPage(pageLoad);
}

function loadPage(pageLoad) {
	jQuery('#app').load(pageLoad);

	setTimeout(() => {
		jQuery('#loader').addClass('site-loaded');
	}, 600);
}