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

	// меняем активные состояния кнопок фильтра
	$('.hotels-choose__filter-list-trigger').on('click', function(){
		$('.hotels-choose__filter-list-trigger').removeClass('active');
		$(this).addClass('active');

		$('.hotels-choose__map-dot[data-category='+ $(this).attr('data-category') +']').hide();
	});

	$('.hotels-choose__map-dot').each(function(i){$(this).attr('data-index', i);}); // проставляем индексы на точки

	// меняем слайды по клику на точки
	$('.hotels-choose__map-dot').on('click', function(){
		$('.hotels-choose__map-dot').removeClass('active');
		$(this).addClass('active');
		hSlider.goToSlide(parseInt($(this).attr('data-index')));
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

});