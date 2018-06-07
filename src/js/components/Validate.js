import { $window, css } from '../modules/dev/_helpers';
import 'jquery-form-validator';
import 'jquery-form-validator/form-validator/security';

export class Validate {
  constructor() {
    this.inputText = '.form-control';
    this.submit = '[type="submit"]';
  }

  init() {
    Validate.initValidator();
    this.onFocusOut();
    this.checkInputFill();
    $window.on('load', () => {
      this.checkInputFill();
    });
  }

  onFocusOut() {
    $(this.inputText).each(function () {
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

  checkInputFill() {
    $(this.inputText).each(function () {
      checkInput($(this));
    });
    $(this.inputText).blur(function () {
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

  static initValidator() {
    $.validate({
      validateOnBlur: true,
      showHelpOnFocus: false,
      addSuggestions: false,
      scrollToTopOnError: false,
      borderColorOnError: false,
      validateOnEvent: true,
      modules: 'security'
    });
  }
}

export default new Validate();

window.refreshValidate = function () {
  new Validate().init();
};
