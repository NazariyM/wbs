import { TimelineMax, TweenMax } from 'gsap';
import { preloader } from './Preloader';
import {
  throttle,
  css
} from '../modules/dev/_helpers';

class Header {
  constructor() {
    this.body = document.querySelector('body');
    this.header = document.querySelector('.header');
    this.nav = this.header.querySelector('.header__nav');
    this.navMobLinks = [...this.header.querySelector('.header__nav ul').children];
    this.navActionsBtns = [...this.header.querySelector('.header__nav-actions').children];
    this.navBtn = this.header.querySelector('.header__nav-toggle');
    this.lines = this.header.querySelectorAll('.header__line');
    this.lineLeft = this.header.querySelector('.header__line_l');
    this.lineRight = this.header.querySelector('.header__line_r');

    this.init();
  }

  async init() {
    await preloader.wait();
    await this.startAnim();
    this.prepareHeaderAnim();
    this.initFix();
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
    const tl = new TimelineMax({ onComplete: () => {
        this.header.classList.remove('no-transition');

        for (let line of this.lines) {
          line.classList.remove('no-transition');
        }
      } });

    tl
      .to(this.header, .4, { y: 0 })
      .to(this.lineLeft, .5, { right: '50%' }, 'animAll')
      .to(this.lineRight, .5, { left: '50%' }, 'animAll');
  }

  initFix() {
    const _this = this;
    const toggleHeaderScroll = throttle(() => {
      toggleHeader();
    }, 0, this);

    function toggleHeader() {

      if (window.pageYOffset > 0 && !_this.header.classList.contains(css.menuActive)) {
        _this.header.classList.add(css.fixed);
      } else {
        _this.header.classList.remove(css.fixed);
      }
    }

    window.addEventListener('scroll', toggleHeaderScroll);
  }

}

export const HeaderAPI = new Header();

