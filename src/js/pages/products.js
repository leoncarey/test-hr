var products = {
	init: function () {
		setTimeout(() => {
			if ($('#products').length != 0) {
				this.load();
			}
		}, 500);
	},
	load: function () {
		this.loadProducts();
	},
	loadProducts: function () {
		let templateProducts = '';

		$.get(`${apiUrl}people`)
			.done(function (res) {

				res.results.forEach(function (person, index) {
					if (index <= 9) {
						templateProducts += home.buildTemplateProducts(person, index + 1);
					}
				});

				$('#loader-section').remove();
				$('.block-cards .inner-slider').append(templateProducts);

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