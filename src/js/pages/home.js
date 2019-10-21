var home = {
	init: function () {
		if ($('#home').length != 0) {
			this.load();
		}
	},
	load: function () {
		$('.banner').leoSlider();

		// this.loadProducts();
	},
	loadProducts: function () {
		let itemsProducts;

		$.get(`${apiUrl}people`)
			.done(function (res) {
				console.log(res);
			})
			.fail(function (err) {
				console.error('An error occurred ===> ', err);
			});
	}
};