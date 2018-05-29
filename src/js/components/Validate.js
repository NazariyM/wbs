import { css } from '../modules/dev/_helpers';
import $ from 'jquery';
import 'jquery-form-validator';
import 'jquery-form-validator/form-validator/security';

export class Validate {
	constructor() {
    this.$form = $('.form');
    this.$input = this.$form.find('.form-control');
		this.submit = '[type="submit"]';
	}

	init() {
		Validate.initValidator();
		this.onFocusOut();
		this.checkFill();
		this.removeError();
	}

	onFocusOut() {
		$(this.$input).each(function () {
			let $self = $(this);
			if ($self.hasClass('js-no-error')) {
				$self.blur(() => {
					$self.parent().removeClass('has-error');
				});
			}
		});

		$(this.submit).each(function () {
			let $self = $(this);
			if ($self.hasClass('js-no-error')) {
				$self.blur(() => {
					$self.closest('form').find('.has-error').each(function () {
						$(this).removeClass('has-error');
					});
				});
			}
		});
	}

  checkFill() {
    this.$input.each(function () {
      checkInput($(this));
    });

    this.$input.blur(function () {
      checkInput($(this));
    });

    this.$input.on('keyup keydown keypress', function() {
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

	static initValidator() {
		$.validate({
			validateOnBlur: true,
			showHelpOnFocus: false,
			addSuggestions: false,
			scrollToTopOnError: false,
			borderColorOnError: false,
			validateOnEvent: true,
			modules: 'security html5'
		});

	}
}

export default new Validate();

window.refreshValidate = function () {
	new Validate().init();
};
