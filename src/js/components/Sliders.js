import $ from 'jquery';
import 'slick-carousel';
import { $window, Resp } from '../modules/dev/_helpers';

class Sliders {
  constructor () {
    this.$viewSlider = $('.view-slider');
    this.$aroundSlider = $('.around-slider');
    this.$respSlider = $('.js-responsive-slider');
    this.$mobSlider = $('.js-mobile-slider');

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
    if (this.$aroundSlider.length) this.createAroundSlider();

    if (this.$respSlider) this.responsiveSlider();

  }

  responsiveSlider() {
    const _this = this;
    const slickInit = '.slick-initialized';
    const $slickCount = $('.slick-count').find('span');

    if (!Resp.isDesk) {
      this.$respSlider.not(slickInit).slick($.extend({}, this.defaultSlickOpts, {
        dots: true,
        infinite: false,
        onInit: countSlides()
      }));

    }

    if (Resp.isMobile) {
      this.$mobSlider.not(slickInit).slick($.extend({}, this.defaultSlickOpts, {
        dots: true,
        dotsClass: 'slick-dots slick-dots_white'
      }));

    }

    function countSlides() {
      _this.$respSlider.on('init afterChange reInit  ', function (event, slick, currentSlide, nextSlide) {
        let i = (currentSlide ? currentSlide : 0) + 1;
        $slickCount.text(i);
      });
    }

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
              centerPadding: 0
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
              dots: true
            }
          }
        ]
      }));
    });
  }

  createAroundSlider() {
    const _this = this;

    function slider(parent, rotationDeg, stepNumber, testNumber) {
      // init slider
      var timeoutSlider;
      var timerResize = 500;
      var statusResize = true;
      var $loaderResize = $('.around-slider__loader');
      var counterSlider = 0;
      const activeSldClass = 'around-slider__active';

      $('.around-slider__item').removeClass('active-slide').eq(0).addClass('active-slide');

      const $fields = $(parent + '.around-slider__item');
      const container = $(parent).find('.around-slider__slider__point');
      const lenghtSlider = $fields.length;

      function initPosition() {
        if (Resp.isTablet) {
          var radius = 187; // adjust to move out items in and out
        } else {
          var radius = 0;
        }
        if (Resp.isDesk) {
          var radius = 215; // adjust to move out items in and out
        }

        let containerWidth = container.width(),
          containerHeight = container.height(),
          angle = 0,
          step = (stepNumber * Math.PI) / lenghtSlider;

        $fields.each(function () {
          const x = Math.round(containerWidth / 2 + radius * Math.cos(angle) - $(this).width() / 2);
          const y = Math.round(containerHeight / 2 + radius * Math.sin(angle) - $(this).height() / 2);

          $(this).css({
            left: x + 'px',
            top: y + 'px'
          });
          angle += step;
        });
      }
      initPosition();

      $window.on('resize', () => {
        if (!Resp.isMobile) {
          _this.$aroundSlider.addClass('loading-slider');
          $loaderResize.addClass('active-loader');
          clearTimeout(timeoutSlider);

          timeoutSlider = setTimeout(function () {
            initPosition();
            setTimeout(() => {
              $loaderResize.removeClass('active-loader');
              _this.$aroundSlider.removeClass('loading-slider');
            }, 600);
          }, 700);
        }

      });

      // contorls slider and rotation
      const stepRotation = rotationDeg;
      function rotationSlider(_this) {
        if (!Resp.isMobile) {
          $(parent + '.around-slider__slider__point').css({
            transform: 'rotate(-' + counterSlider * stepRotation + 'deg)'
          });
          $(parent + '.around-slider__item').css({
            transform: 'rotate(' + counterSlider * stepRotation + 'deg)'
          });
        } else {
          $(parent + '.around-slider__slider__point').css({
            transform: 'rotate(0deg)'
          });
          $(parent + '.around-slider__item').css({
            transform: 'rotate(0deg)'
          });
        }
      }

      $(parent + '.arrow-right').on('click', () => {
        if (counterSlider < lenghtSlider - 1) {
          counterSlider++;
        } else {
          counterSlider = 0;
        }
        $(parent + '.around-slider__item').eq(counterSlider).click();
      });

      $(parent + '.arrow-left').on('click', () => {
        if (counterSlider > 0) {
          counterSlider--;
        } else {
          counterSlider = lenghtSlider - 1;
        }
        $(parent + '.around-slider__item').eq(counterSlider).click();
      });

      $(parent + '.around-slider__item').on('click', function () {
        if (Resp.isDesk) {
          $(parent + '.around-slider__item').removeClass(activeSldClass);
          let index = $(parent + ' .around-slider__item').index(this);
          counterSlider = index;

          $(this)
            .closest('.around-slider')
            .find('.around-slider__slide')
            .removeClass('active-slide')
            .eq(counterSlider)
            .addClass('active-slide');

          $(this)
            .closest('.around-slider')
            .find('.around-slider__item')
            .removeClass(activeSldClass)
            .eq(counterSlider)
            .addClass(activeSldClass);

          rotationSlider(this);

          $(parent + ' .around-slider__item').removeClass('around-slider__item__right').removeClass('around-slider__item__left').addClass('around-slider__item__left');

          var i = 0;
          var test1 = counterSlider;
          var test2 = counterSlider;

          while (i <= 1) {
            i++;
            test1++;
            test2--;

            $(parent + ' .around-slider__item').eq(test1).removeClass('around-slider__item__left').addClass('around-slider__item__right');

            if (test2 >= 0) {
              $(parent + ' .around-slider__item').eq(test2).removeClass('around-slider__item__left').addClass('around-slider__item__right');
            }

            if (counterSlider >= 2) {
              $('.around-slider__item').removeClass('around-slider__item__center');
              $(`.${activeSldClass}`).prev().prev().addClass('around-slider__item__center');
            }

            if (counterSlider === 0) {
              $('.around-slider__item').removeClass('around-slider__item__center');
            }

            $(parent + ' .around-slider__item').removeClass('around-slider__item__bottom');
            $(`.${activeSldClass}`).next().next().addClass('around-slider__item__bottom');

          }

        } else {
          $(parent + '.around-slider__slider__point').css({
            transform: 'rotate(0deg)'
          });
          $(parent + '.around-slider__item').css({
            transform: 'rotate(0deg)'
          });
        }
      });

      $(`.${activeSldClass}`).next().next().addClass('around-slider__item__bottom');
    }

    slider('.what-program ', 46, 1.25, 1);

  }
}

export default new Sliders();
