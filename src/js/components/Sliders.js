import $ from 'jquery';
import 'slick-carousel';

class Sliders {
  constructor () {
    this.$viewSlider = $('.view-slider');
    this.$aroundSlider = $('.around-slider');

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

  createAroundSlider() {

    var windowWidth = $(window).width();

    function slider(parent, rotationDeg, stepNumber, testNumber) {
      // init slider
      var timeoutSlider;
      var timerResize = 500;
      var statusResize = true;
      var loaderResize = $('.around-slider__loader');
      var counterSlider = 0;
      $('.around-slider__item').removeClass('active-slide').eq(0).addClass('active-slide');
      var fields = $(parent + '.around-slider__item'),
        container = $(parent).find('.around-slider__slider__point'),
        lenghtSlider = fields.length;
      function initPosition() {
        if (windowWidth <= 1200 && windowWidth >= 768) {
          var radius = 187; // adjust to move out items in and out
        } else {
          var radius = 0;
        }
        if (windowWidth >= 1200) {
          var radius = 215; // adjust to move out items in and out
        }
        var containerWidth = container.width(),
          containerHeight = container.height(),
          angle = 0,
          step = (stepNumber * Math.PI) / lenghtSlider;
        fields.each(function () {
          var x = Math.round(containerWidth / 2 + radius * Math.cos(angle) - $(this).width() / 2);
          var y = Math.round(containerHeight / 2 + radius * Math.sin(angle) - $(this).height() / 2);
          $(this).css({
            left: x - 3 + 'px',
            top: y - 3 + 'px'
          });
          angle += step;
        });
      }
      initPosition();
      $(window).resize(function () {
        if ($(window).width() > 767) {
          $('.around-slider').addClass('loading-slider');
          loaderResize.addClass('active-loader');
          clearTimeout(timeoutSlider);

          timeoutSlider = setTimeout(function () {
            initPosition();
            setTimeout(function () {
              loaderResize.removeClass('active-loader');
              $('.around-slider').removeClass('loading-slider');
            }, 600);
          }, 700);
        }
      });


      // contorls slider and rotation
      var stepRotateon = rotationDeg;
      function rotationSlider(_this) {
        if (windowWidth >= 768) {
          $(parent + '.around-slider__slider__point').css({
            transform: 'rotate(-' + counterSlider * stepRotateon + 'deg)'
          });
          $(parent + '.around-slider__item').css({
            transform: 'rotate(' + counterSlider * stepRotateon + 'deg)'
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
      $(window).resize(function () {
        if ($(window).width() > 767) {
          $('.around-slider').addClass('loading-slider');
          loaderResize.addClass('active-loader');
          clearTimeout(timeoutSlider);

          timeoutSlider = setTimeout(function () {
            initPosition();
            rotationSlider();
            setTimeout(function () {
              loaderResize.removeClass('active-loader');
              $('.around-slider').removeClass('loading-slider');
            }, 600);
          }, 700);
        }
      });

      $(parent + '.arrow-right').click(function () {
        if (counterSlider < lenghtSlider - 1) {
          counterSlider++;
        } else {
          counterSlider = 0;
        }
        $(parent + '.around-slider__item').eq(counterSlider).click();
      });

      $(parent + '.arrow-left').click(function () {
        if (counterSlider > 0) {
          counterSlider--;
        } else {
          counterSlider = lenghtSlider - 1;
        }
        $(parent + '.around-slider__item').eq(counterSlider).click();
      });

      $(parent + '.around-slider__item').click(function () {
        if (windowWidth >= 768) {
          $(parent + '.around-slider__item').removeClass('around-slider__active');
          var index = $(parent + ' .around-slider__item').index(this);
          counterSlider = index;
          $(this).addClass('what-program__active');
          $(this).closest('.around-slider')
            .find('.around-slider__slide')
            .removeClass('active-slide')
            .eq(counterSlider)
            .addClass('active-slide');
          $(this).closest('.around-slider')
            .find('.around-slider__item')
            .removeClass('around-slider__active')
            .eq(counterSlider)
            .addClass('around-slider__active');
          rotationSlider(this);
          $(parent + ' .around-slider__item').removeClass('around-slider__item__right').removeClass('around-slider__item__left').addClass('around-slider__item__left');
          console.log('index  - number:' + counterSlider);
          var i = 0;
          var test1 = counterSlider;
          var test2 = counterSlider;
          while (i <= 1) {
            i++;
            console.log('go up - number:' + test1++);
            console.log('go down - number:' + test2--);
            $(parent + ' .around-slider__item').eq(test1).removeClass('around-slider__item__left').addClass('around-slider__item__right');
            if (test2 >= 0) {
              $(parent + ' .around-slider__item').eq(test2).removeClass('around-slider__item__left').addClass('around-slider__item__right');
            }
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
    }

    $('.what-program .around-slider__item').click(function () {
      var nuberText = $(this).attr('data-number');
      $('.around-slider__number').text('0' + nuberText);
    });

    slider('.what-program ', 33.72, 1.5, 1);

    $(window).resize(function () {
      windowWidth = $(window).width();
    });

  }
}

export default new Sliders();
