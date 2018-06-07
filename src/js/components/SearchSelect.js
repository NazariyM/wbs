import 'select2';

class SearchSelect {
  constructor() {
    this.$el = $('.js-search-select');
    this.$placeholder = this.$el.data('placeholder');

    if (this.$el.length) this.init();
  }

  init() {
    const textFind = this.$el.data('find');
    const placeholder = this.$el.data('placeholder');

    this.$el.select2({
      minimumResultsForSearch: 0,
      allowClear: false,
      placeholder: placeholder,
      language: {
        noResults: function () {
          return textFind;
        }
      },
      escapeMarkup: function (markup) {
        return markup;
      }
    })
      .on('select2:opening', function () {
        $(this).closest('.form-group').removeClass('has-error');
      });
  }
}

export default new SearchSelect();
