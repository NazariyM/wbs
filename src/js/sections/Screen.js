import $ from 'jquery';
import { TimelineMax, TweenMax } from 'gsap';
import { preloader } from '../components/Preloader';
import { Resp } from '../modules/dev/_helpers';

class Screen {
  constructor() {
    this.$block = $('.screen');
    this.$content = this.$block.find('.screen__content');
    this.$item = this.$content.children();

    if (this.$block.length) this.init();

  }

  async init() {
    await preloader.wait();
    await this.startAnim();
  }

  startAnim() {
    const tl = new TimelineMax({ delay: .2 });

    tl
      .staggerTo(this.$item, .5, { autoAlpha: 1, x: 0 }, 0.2);
  }

  setFixedHeight() {
    const _this = this;

    if (!Resp.isDesk) {
      function calcVH() {
        const landscape = window.matchMedia('only screen and (max-width: 767px) and (orientation: landscape)').matches;
        const vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        const containerH = _this.$container.innerHeight() / 2;
        const newHeight = landscape ? (vH + containerH) : vH;
        document.querySelector('.screen').setAttribute('style', 'height:' + newHeight + 'px;');
      }

      calcVH();

      window.addEventListener('orientationchange', () => {
        setTimeout(() => {
          calcVH();
        }, 500);
      }, true);
    }
  }

}

export const ScreenAPI = new Screen();
