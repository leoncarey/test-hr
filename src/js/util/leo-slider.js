(function ($) {
	'use strict';

	$.fn.leoSlider = function (options) {
		let setup = $.extend({
			currentSlide: 0,
			itemClass: '.item-slider',
			speed: 5000,
			autoplay: true
		}, options);


		/**
		 * Init Slider
		 */
		let itemsSlider = $(this).find(setup.itemClass),
			slideSize = itemsSlider.width(),
			totalSizeSlides = itemsSlider.length * itemsSlider.eq(0).width(),
			templateDots = '';

		itemsSlider.eq(setup.currentSlide).addClass('current-slide');


		/**
		 * Resize wrapper
		 */
		$(this).find('.inner-slider').css({
			width: totalSizeSlides
		});


		/**
		 * Creation dots
		 */
		$(this).append('<ul class="dots"></ul>');
		for (let s = 0; s < itemsSlider.length; s++) {
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
		$(this).append(`
			<button class="arrow-slider arrow-slider-left"></button>
			<button class="arrow-slider arrow-slider-right"></button>
		`);

		$('.arrow-slider-left').click(function (e) {
			e.preventDefault();
			goToSlide('prev');
		});
		$('.arrow-slider-right').click(function (e) {
			e.preventDefault();
			goToSlide();
		});


		/**
		 * Go to slide
		 * @param direction: 'next' is default or 'prev'
		 */
		function goToSlide(direction = 'next') {
			if (direction == 'next') {
				setup.currentSlide = setup.currentSlide < itemsSlider.length - 1 ? setup.currentSlide + 1 : 0;
			} else {
				setup.currentSlide = setup.currentSlide > itemsSlider.length - 1 ? setup.currentSlide - 1 : 0;
			}

			$('.slider .current-slide').removeClass('current-slide');

			$('.slider .inner-slider').animate({
				left: -(slideSize * setup.currentSlide)
			});

			itemsSlider.eq(setup.currentSlide).addClass('current-slide');
			$('.slider .dots li').removeClass('active').eq(setup.currentSlide).addClass('active');
		}


		return this;
	};

}(jQuery));