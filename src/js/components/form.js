import { css } from '../modules/dev/_helpers';

class Form {
	constructor() {
		this.$form = $('.form');
		this.$input = this.$form.find('.form-control');

		this.init();
	}
	
	init() {
		this.checkFill();
		this.removeError();
	}

	checkFill() {
		this.$input.each(function () {
			checkInput($(this));
		});
		this.$input.blur(function () {
			checkInput($(this));
		});
		
		function checkInput(el) {
			if (el.val() !== '') {
				el.addClass(css.fill);
			} else {
				el.removeClass(css.fill);
			}
		}
	}
	
	removeError() {
		this.$input.on('click focus', (ev) => {
			$(ev.currentTarget).parent().removeClass(css.error);
		});
	}
}

export default new Form();
