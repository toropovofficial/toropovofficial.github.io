const PROLOADER_TIMER = 1000;
window.PRELOADER_INTERVAL = 500;


window.isPreloaderTimerFinish = false;

let preloaderInterval = null;


const hidePreloader = () => {
  const preloader = document.querySelector(`.preloader`);

  if (preloader) {
    preloader.classList.add(`js-isHide`);
    setTimeout(() => {
      preloader.remove();
    }, 1500);
  }
};

const checkLoad = () => {
  if (document.readyState === `complete`) {
    hidePreloader();
    if (preloaderInterval) {
      clearInterval(preloaderInterval);
    }
    return true;
  }

  return false;
};

setTimeout(() => {
  window.isPreloaderTimerFinish = true;

  if (!checkLoad()) {
    preloaderInterval = setInterval(checkLoad, window.PRELOADER_INTERVAL);
  }
}, PROLOADER_TIMER);
