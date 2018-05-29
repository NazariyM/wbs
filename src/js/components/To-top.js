import { $scrolledElements, $window, throttle } from '../modules/dev/_helpers';

class ToTop {
	constructor() {
		this.$btn = $('.to-top');
		this.$scrollBtn = $('.js-scroll-top');

		if (this.$btn.length) this.init();
	}
	
	init() {
		this.bindEvents();
		this.checkScroll();
	}
	
	checkScroll() {
		const windowHeight = $window.height();
		
		checkScroll.apply(this);
		
		$window.on('scroll', throttle(() => {
			checkScroll.apply(this);
		}, 250, this));
		
		function checkScroll() {
			if ($window.scrollTop() > windowHeight * 1.5) {
				this.$btn.addClass('is-active');
			} else {
				this.$btn.removeClass('is-active');
			}
		}
	}
	
	bindEvents() {
    this.$scrollBtn.on('click', () => {
			$scrolledElements.animate({ scrollTop: 0 }, 1500);
		});
	}
}

export default new ToTop();
