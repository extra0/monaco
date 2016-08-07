$(function(){

	// вызов фенсибокса
	$('[fancybox]').fancybox();

	// только цифры в инпутах
	$('[only-numbers]').bind("change keyup input click", function() {
		if (this.value.match(/[^0-9\.\+]/g, '')) {
			this.value = this.value.replace(/[^0-9]/g, '');
		}
	});

	// слайдер акций
	$('.action-slider__list').bxSlider({
		mode: 'fade'
	});

});