import { TimelineMax, TweenMax } from 'gsap';
import { preloader } from './Preloader';
import {
  $body,
  $window,
  throttle,
  css,
  Resp
} from '../modules/dev/_helpers';

class Header {
  constructor() {
    this.body = document.querySelector('body');
    this.header = document.querySelector('.header');
    this.nav = this.header.querySelector('.header__nav');
    this.navMobLinks = [...this.header.querySelector('.header__nav ul').children];
    this.navActionsBtns = [...this.header.querySelector('.header__nav-actions').children];
    this.navBtn = this.header.querySelector('.header__nav-toggle');
    this.lineLeft = this.header.querySelector('.header__line_l');
    this.lineRight = this.header.querySelector('.header__line_r');

    this.init();
  }

  async init() {
    await preloader.wait();
    await this.startAnim();
    this.prepareHeaderAnim();
    this.bindEvents();
  }

  bindEvents() {
    this.navBtn.addEventListener('click', () => {
      this.toggleMenu();
    });
  }

  toggleMenu(state = false) {
    switch (state) {
      case 'open':
        this.navBtn.classList.add(css.active);
        break;
      case 'close':
        this.navBtn.classList.remove(css.active);
        break;
      default:
        this.burgerActiveState = css.active;
    }
    this.toggleNav();

    return HeaderAPI;
  }

  lockBody() {
    this.body.classList.toggle(css.locked);
  }

  set burgerActiveState(className) {
    this.navBtn.classList.toggle(className);
  }

  get burgerActiveState() {
    return this.navBtn.classList.contains(css.active);
  }

  prepareHeaderAnim() {
    this.mobTl = new TimelineMax({ paused: true });

    this.mobTl
      .to(this.nav, .35, {
        y: 0
      })
      .staggerTo(this.navMobLinks, 0.15, {
        autoAlpha: 1,
        y: 0
      }, 0.125)
      .staggerTo(this.navActionsBtns, 0.15, {
        autoAlpha: 1,
        y: 0
      }, 0.125);

  }

  toggleNav() {
    this.burgerActiveState ? this.mobTl.timeScale(1).play() : this.mobTl.timeScale(3).reverse();
    this.lockBody();
  }

  startAnim() {
    const tl = new TimelineMax();

    tl
      .to(this.header, .4, { y: 0 })
      .to(this.lineLeft, .5, { right: '50%' }, 'animAll')
      .to(this.lineRight, .5, { left: '50%' }, 'animAll');
  }

}

export const HeaderAPI = new Header();

