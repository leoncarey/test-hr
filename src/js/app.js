/**
 * Global config
 */
var apiUrl = 'https://swapi.co/api/',
	baseUrl = 'http://localhost:8080/';


/**
 * Loaders
 */
var application = {
	init: function () {
		home.init();
		products.init();
	},
	menu: function () {
		$('.hamburger').on('click', function (e) {
			e.preventDefault();
			$('.menu').addClass('opened');
			return false;
		});

		$('.close-button').on('click', function (e) {
			e.preventDefault();
			$('.menu').removeClass('opened');
			return false;
		});
	}
};


jQuery(($) => {
	application.menu();
});