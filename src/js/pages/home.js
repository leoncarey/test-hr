var home = {
	init: function () {
		if ($('#home').length != 0) {
			this.load();
		}
	},
	load: function () {
		$('.banner').leoSlider({
			autoplay: false
		});
	}
};