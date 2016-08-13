$(function(){

	// вызов фенсибокса
	$('[fancybox]').fancybox({
		closeBtn: false
	});

	$('.modal__close').on('click', function(){
		$.fancybox.close();
	});

	// только цифры в инпутах
	$('[only-numbers]').bind("change keyup input click", function() {
		if (this.value.match(/[^0-9\.\+]/g, '')) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	});

	// collapse
	$('[collapse]').on('click',function(){
		$('[collapse]').toggleClass('active');
		$('.header__menu').toggleClass('active');
	});

	// слайдер акций
	$('.action-slider__list').bxSlider({
		mode: 'fade'
	});

	// слайдер туров и отелей
	var maxSlides = 0;
	if ($(window).width() >= 768 && $(window).width() <= 991) {
		maxSlides = 2;
	} else if ($(window).width() < 768) {
		maxSlides = 1;
	} else {
		maxSlides = 4;
	}

	var itemSlider = $('.item__slider').bxSlider({
		pager: false,
		slideWidth: 350,
		maxSlides: maxSlides,
		minSlides: maxSlides,
		slideMargin: 10,
		adaptiveHeight: true
	});

	// слайдер отелей
	var hSlider = $('.hotels-choose__slider').bxSlider({
		pager: false,
		infiniteLoop: false,
		adaptiveHeight: true,
		hideControlOnEnd: true,
		onSlideBefore: function(){ // меняем состояние точек при смене слайдов
			$('.hotels-choose__map-dot').removeClass('active');
	    	$('.hotels-choose__map-dot[data-index='+ hSlider.getCurrentSlide() +']').addClass('active');
	  	},
	  	onSliderLoad: function() {
	  		$('.hotels-choose__slider-item').each(function(k){
	  			$('.hotels-choose__map-dot').eq(k).attr('data-category', $(this).attr('data-category')); // проставляем категории для точек
	  		});
	  	}
	});


	// фильтрация отелей по категориям
	$('.hotels-choose__filter-list-trigger').click(function(e){
		e.preventDefault();
		var category = event.target.getAttribute('data-category'),
			slideIndex = $('.active-slide').index();

		$('.hotels-choose__slider-item').show();
		$('.hotels-choose__map-dot').removeClass('active');
		$('.hotels-choose__slider-item').removeClass('active-slide slshow');
		$('.hotels-choose__slider-item[data-' + category + ']').addClass('slshow');
		e.preventDefault();
		$('li.hotels-choose__slider-item').not('.slshow').hide();
		$('li.hotels-choose__slider-item').removeClass('active-slide');
		$('li.hotels-choose__slider-item.slshow:first').addClass('active-slide');

		hSlider.reloadSlider({
			pager: false,
			infiniteLoop: false,
			adaptiveHeight: true,
			hideControlOnEnd: true,
			onSliderLoad: function(currentIndex) {
				// $('.hotels-choose__slider-wrap').find('.bx-viewport').find('ul').children().eq(0).addClass('active-slide');
				$('li.hotels-choose__slider-item').not('.slshow').hide();
				$('.hotels-choose__map-dot[data-index='+ (slideIndex+1) +']').addClass('active');
			},
			onSlideBefore: function($slideElement) {
				$('.hotels-choose__slider-wrap').find('.bx-viewport').find('ul').children().removeClass('active-slide');
				$slideElement.addClass('active-slide');
				$('.hotels-choose__map-dot').removeClass('active');
		    	$('.hotels-choose__map-dot[data-index='+ hSlider.getCurrentSlide() +']').addClass('active');
			},
			slideSelector:'li.hotels-choose__slider-item.slshow'
		});
	});


	// меняем активные состояния кнопок фильтра
	$('.hotels-choose__filter-list-trigger').on('click', function(){
		$('.hotels-choose__filter-list-trigger').removeClass('active');
		$(this).addClass('active');

		$('.hotels-choose__map-dot[data-category='+ $(this).attr('data-category') +']').hide();
	});

	$('.hotels-choose__map-dot, .tabs__items-link').each(function(i){$(this).attr('data-index', i);}); // проставляем индексы
	$('.tabs__content-item').each(function(i){$(this).attr('data-index', i);}); // проставляем индексы

	// меняем слайды по клику на точки
	$('.hotels-choose__map-dot').on('click', function(){
		$('.hotels-choose__map-dot').removeClass('active');
		$(this).addClass('active');
		hSlider.goToSlide(parseInt($(this).attr('data-index')));
	});

	// табы
	$('.tabs__items-link').on('click', function(){
		$('.tabs__items-link, .tabs__content-item').removeClass('active');
		$(this).addClass('active');
		$('.tabs__content-item[data-index='+ $(this).attr('data-index') +']').addClass('active');
	});


	// открываем меню
	var menu = $('.header__menu'),
		collapse = $('[collapse]');

	// закрываем меню по клику вне области
	$(document).mouseup(function(e) {
		if (collapse.has(e.target).length === 0 && menu.has(e.target).length === 0) {
			menu.removeClass('active');
			collapse.removeClass('active');
		}
	});


	if ($(window).width() < 768) {
		$('.tabs__items-link').bind("click", function(e) {
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('data-index')).offset().top
			}, 1000);
			e.preventDefault();
		});
	}

});