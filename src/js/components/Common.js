import objectFitImages from 'object-fit-images';

import './Preloader';
import './Header';
import '../sections/Screen';
import './Sliders';
import './Anims';
import './Footer';
import './PlayInView';
import './Popup';
import './To-top';
import './SearchSelect';
import PageResize from './pageResize';
import './Dot';
import './form';
import './noTouch';

export class Common {
  /**
   * Cache data, make preparations and initialize common scripts.
   */
  constructor() {
    this.init();
  }
  /**
   * Initialize common scripts.
   */
  init() {
    objectFitImages();
    PageResize.init();
  }
}

/** Export initialized common scripts by default */
export default new Common();
