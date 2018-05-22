import $ from 'jquery';
import 'slick-carousel';

class Sliders {
  constructor () {
    this.$viewSlider = $('.view-slider');

    this.defaultSlickOpts = {
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      infinite: true,
      arrows: false,
      speed: 800,
      cssEase: 'cubic-bezier(0.74, 0.1, 0.32, 0.98)',
      useTransform: true,
      adaptiveHeight: true,
      accessibility: false,
      swipe: true,
      rows: 0
    };

    this.init();
  }

  init() {
    if (this.$viewSlider.length) this.createViewSlider();
  }

  createViewSlider() {
    const _this = this;

    this.$viewSlider.each(function (i, slider) {
      const $slider = $(slider);
      const $sldFor = $slider.find('.view-slider__images');
      const $sldNav = $slider.find('.view-slider__text');

      $sldFor.slick($.extend({}, _this.defaultSlickOpts, {
        asNavFor: $sldNav,
        slidesToShow: 3,
        centerMode: true,
        focusOnSelect: true,
        speed: 650,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
            }
          }
        ]
      }));

      $sldNav.slick($.extend({}, _this.defaultSlickOpts, {
        asNavFor: $sldFor,
        swipe: false,
        centerMode: true,
        adaptiveHeight: true,
        speed: 650,
        fade: true,
        cssEase: 'linear',
        responsive: [
          {
            breakpoint: 767,
            settings: {
              dots: true,
            }
          }
        ]
      }));
    });
  }
}

export default new Sliders();
