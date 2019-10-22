(function ($) {
	'use strict';

	$.fn.leoSlider = function (options) {
		let setup = $.extend({
			currentSlide: 0,
			itemClass: '.item-slider',
			speed: 5000,
			autoplay: true,
			itemsPerSlide: 1
		}, options);


		/**
		 * Init Slider
		 */
		$(this).addClass('leo-slider');

		let itemsSlider = $(this).find(setup.itemClass),
			slideSize = setup.itemsPerSlide != 1 ? $(this).width() : $(setup.itemClass).width(),
			totalSizeSlides = itemsSlider.length * itemsSlider.eq(0).width(),
			templateDots = '',
			self = this;

		if (setup.itemsPerSlide != 1) {
			let sizePerItem = $(this).width() / setup.itemsPerSlide;

			itemsSlider.css({
				width: sizePerItem,
				float: 'left'
			});
		}

		if ($(window).width() < 990) {
			let sizeItemResponsive = $(this).find('.wrapper-slide').width();

			slideSize = sizeItemResponsive;

			itemsSlider.css({
				width: sizeItemResponsive,
				float: 'left'
			});
		}

		for (let s = 1; s <= (setup.currentSlide + 1) * setup.itemsPerSlide; s++) {
			itemsSlider.eq(s).addClass('current-slide');
		}

		/**
		 * Resize wrapper
		 */
		$(this).find('.inner-slider').css({
			width: totalSizeSlides
		});


		/**
		 * Creation dots
		 */
		$(this).find('.dots').remove();
		$(this).append('<ul class="dots"></ul>');
		for (let s = 0; s < (itemsSlider.length / setup.itemsPerSlide); s++) {
			templateDots += `<li><a href="#"></a></li>`;
		}

		$(this).find('.dots').append(templateDots).find('li').eq(setup.currentSlide).addClass('active');
		$(this).find('.dots a').click(function (e) {
			e.preventDefault();

			setup.currentSlide = $(this).parent().index() - 1;
			goToSlide();
		});


		/**
		 * Timer slide
		 */
		if (setup.autoplay) {
			setInterval(() => {
				goToSlide();
			}, setup.speed);
		}


		/**
		 * Arrow events
		 */
		$(this).find('.arrow-slider').remove();
		$(this).append(`
			<button class="arrow-slider arrow-slider-left"></button>
			<button class="arrow-slider arrow-slider-right"></button>
		`);

		$(this).find('.arrow-slider-left').click(function (e) {
			e.preventDefault();
			goToSlide('prev');
		});
		$(this).find('.arrow-slider-right').click(function (e) {
			e.preventDefault();
			goToSlide();
		});


		/**
		 * Go to slide
		 * @param direction: 'next' is default or 'prev'
		 */
		function goToSlide(direction = 'next') {
			let finalSlider = Math.round(itemsSlider.length / setup.itemsPerSlide);

			if (direction == 'next') {

				setup.currentSlide =
					setup.currentSlide < itemsSlider.length - 1 ?
						setup.currentSlide + 1 : 0;

				if (setup.currentSlide >= finalSlider) {
					setup.currentSlide = 0;
				}

			} else {

				let decreaseNumber = setup.itemsPerSlide == 1 ?
					itemsSlider.length - 1 : setup.itemsPerSlide;

				setup.currentSlide =
					setup.currentSlide == 0 ? decreaseNumber : setup.currentSlide - 1;

			}

			$('.current-slide').removeClass('current-slide');

			$(self).find('.inner-slider').animate({
				left: -(slideSize * setup.currentSlide)
			});

			itemsSlider.eq(setup.currentSlide).addClass('current-slide');
			$(self).find('.dots li').removeClass('active').eq(setup.currentSlide).addClass('active');
		}


		return this;
	};

}(jQuery));