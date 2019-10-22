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

		this.loadProducts();

		$(window).resize(function () {
			home.eventSlider();
		});
	},

	eventSlider: function () {
		if ($(window).width() < 990) {

			$('.block-cards').unbind('leoSlider');
			$('.block-cards').leoSlider({
				itemClass: '.item-card',
				itemsPerSlide: 1,
				autoplay: false
			});

		} else {

			$('.block-cards').unbind('leoSlider');
			$('.block-cards').leoSlider({
				itemClass: '.item-card',
				itemsPerSlide: 2,
				autoplay: true
			});

		}
	},

	loadProducts: function () {
		let templateProducts = '';

		$.get(`${apiUrl}people`)
			.done(function (res) {

				res.results.forEach(function (person, index) {
					if (index <= 5) {
						templateProducts += home.buildTemplateProducts(person, index + 1);
					}
				});

				$('.block-cards .inner-slider').append(templateProducts);

				home.eventSlider();

				setTimeout(() => {
					$('#loader-section').remove();
				}, 500);

			})
			.fail(function (err) {
				console.error('An error occurred ===> ', err);
			});
	},
	buildTemplateProducts: function (person, id) {
		return `
		<a href="product/${id}" class="item-card">
			<div>
				<div class="image-thumb">
					<img src="https://starwars-visualguide.com/assets/img/characters/${id}.jpg" alt="${person.name}">
				</div>
				<h5 class="title-card">${person.name}</h5>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, at deserunt eum illo optio
					perspiciatis quasi repudiandae.
				</p>
			</div>
		</a>
		`;
	}
};