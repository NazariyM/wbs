class PlayInView {
  constructor() {
    this.el = document.querySelector('.js-in-view');
    this.video = this.el.querySelector('video');

    if (this.el) this.init();
  }

  init() {
    this.detectEl();
  }

  detectEl() {
    const iObserver = new IntersectionObserver(items => {
      if (items[0].isIntersecting) {
        this.video.play();
      } else {
        this.video.pause();
      }
    });

    iObserver.observe(this.el);
  }
}

export default new PlayInView();
