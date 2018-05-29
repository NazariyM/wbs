import 'select2';

class AutocompleteSelect {
  constructor() {
    this.$el = $('.js-autocomplete-select');
    this.$placeholder = this.$el.data('placeholder');

    if (this.$el.length) this.init();
  }
	
  init() {
    this.$el.select2({
      minimumResultsForSearch: 0,
      placeholder: this.$placeholder,
      allowClear: false,
      language: {
        noResults: function () {
          return 'не найдено';
        }
      },
      escapeMarkup: function (markup) {
        return markup;
      }
    })
     .on('select2:opening', function (e) {
      $(this).closest('.form-group').removeClass('has-error');
    })
    ;
  }
}

export default new AutocompleteSelect();

window.reInitSelect = reInitSelect;

function reInitSelect() {
  new AutocompleteSelect().init();
}
