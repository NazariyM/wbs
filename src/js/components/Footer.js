import $ from 'jquery';
import { preloader } from './Preloader';
import { TimelineMax, TweenMax } from 'gsap';
import ScrollAnim from '../modules/dev/animation/scrollAnim';

class Footer {
  constructor() {
    this.$block = $('.footer');
    this.$nav = this.$block.find('.footer__nav');
    this.$progsTitle = this.$block.find('.footer__programs-title');
    this.$bottomL = this.$block.find('.footer__bottom-info');
    this.$bottomR = this.$block.find('.footer__bottom-contact');

    this.tl = new TimelineMax();
    this.init();
  }

  async init() {
    const _this = this;
    await preloader.wait();

    new ScrollAnim({
      el: _this.$block.get(0),
      onEnter: async () => {
        await _this.startAnim();
      }
    });
  }

  startAnim() {

    const $progLinksLeft = $('.footer__programs-links a:lt(2)');
    const $progLinksRight = Array.from($('.footer__programs-links a').slice(-2)).reverse();

    this.tl
      .to(this.$nav, .5, { autoAlpha: 1, y: 0 })
      .to(this.$progsTitle, .5, { autoAlpha: 1, y: 0 }, '-=.3')

      .staggerTo($progLinksLeft, .3, { x: 0, autoAlpha: 1 }, .1, '-=0.3. links')
      .staggerTo($progLinksRight, .3, { x: 0, autoAlpha: 1 }, .1, '-=0.3. links')

      .staggerTo(this.$bottomL, .4, { autoAlpha: 1, x: 0, delay: .2 }, .3, 'all')
      .staggerTo(this.$bottomR, .4, { autoAlpha: 1, x: 0, delay: .2 }, .3, 'all');
  }
}

export default new Footer();
