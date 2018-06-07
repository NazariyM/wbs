import { $window, css } from '../modules/dev/_helpers';

export class Validate {
  constructor() {
    this.inputText = '.form-control';
    this.submit = '[type="submit"]';
  }

  init() {
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

}

export default new Validate();
