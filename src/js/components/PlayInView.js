class PlayInView {
  constructor() {
    this.el = document.querySelector('.js-in-view');
    if (!this.el) return;

    this.video = this.el.querySelector('video');

    this.init();
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
