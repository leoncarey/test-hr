/**
 * Global config
 */
var apiUrl = 'https://swapi.co/api/',
	baseUrl = 'http://localhost:8080/';


/**
 * Loaders
 */
jQuery(($) => {
	'use strict';

	home.init();
	products.init();
});