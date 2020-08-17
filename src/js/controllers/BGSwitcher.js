import { getImgUrl } from '../api/bgAPI';

const DEFAULT_IMG = './assets/bg.jpg';

export class BGSwitcher {
  constructor(switcher, bgConatiner) {
    this.switcher = switcher;
    this.bgConatiner = bgConatiner;
    this.lastQuery = [];
    this.lastURL = '';
    this.addEvents();
  }

  addEvents() {
    this.switcher.addEventListener('click', () => {
      this.updateBG();
    });
  }

  async updateBG(query) {
    let imgURL = '';
    if (query) {
      this.lastQuery = query;
    }
    this.switcher.classList.add('load');
    try {
      imgURL = await getImgUrl(this.lastQuery);
    } catch {
      imgURL = DEFAULT_IMG;
    } finally {
      this.bgConatiner.classList.add('disappear');
      this.bgConatiner.addEventListener('transitionend', () => {
        if (this.bgConatiner.classList.contains('disappear')) {
          const bgImg = new Image();
          bgImg.onload = () => {
            if (bgImg.src === this.lastURL) {
              return;
            }
            this.bgConatiner.style.backgroundImage = `url(${bgImg.src})`;
            this.switcher.classList.remove('load');
            this.bgConatiner.classList.remove('disappear');
            this.lastURL = bgImg.src;
          };
          bgImg.src = imgURL;
        }
      });
      console.log(`Query parametres for image search: ${this.lastQuery}`);
    }
  }
}
