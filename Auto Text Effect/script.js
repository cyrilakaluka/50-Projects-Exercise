(function () {
  const autoTextManager = (function () {
    let obj = {
      initStatus: false,
      textHolder: undefined,
      text: 'We Love Programming!',
      speed: 200,
      playStatus: 'play',
    };

    function init(textHolder) {
      if (!obj.initStatus) {
        obj.textHolder = textHolder;
        automateText();
        obj.initStatus = true;
      }
    }

    function notify(opts) {
      if (opts['text']) {
        obj.text = opts.text;
      }

      if (opts['speed']) {
        obj.speed = 200 / opts.speed;
      }

      if (opts['playStatus']) {
        obj.playStatus = opts.playStatus;
      }
    }

    function automateText() {
      const delay = time => {
        return new Promise(resolve => {
          setTimeout(resolve, time);
        });
      };

      (async function recursive() {
        let displayText = obj.text;
        obj.textHolder.innerHTML = '';
        await delay(obj.speed);
        for (const c of displayText) {
          // Check for updates
          if (obj.playStatus === 'pause') {
            await new Promise(resolve => {
              (function pollPlayStatus() {
                setTimeout(() => {
                  obj.playStatus === 'play' ? resolve() : pollPlayStatus();
                }, 10);
              })();
            });
          }

          if (displayText !== obj.text) {
            break;
          }
          // Update text holder element
          obj.textHolder.innerHTML += c;
          await delay(obj.speed);
        }

        recursive();
      })();
    }

    return {
      init: init,
      notify: notify,
      getPlayStatus: () => {
        return obj.playStatus;
      },
    };
  })();

  const topLevel = document.getElementById('top-level');
  const textHolder = document.getElementById('text-holder');
  const speed = document.getElementById('speed');
  const text = document.getElementById('text');
  const button = document.getElementById('button');

  autoTextManager.init(textHolder);

  button.addEventListener('click', () => {
    if (autoTextManager.getPlayStatus() === 'play') {
      autoTextManager.notify({ playStatus: 'pause' });
      topLevel.classList.remove('active');
    } else {
      autoTextManager.notify({ playStatus: 'play' });
      topLevel.classList.add('active');
    }
  });

  text.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
      autoTextManager.notify({ text: e.target.value });
      e.target.value = '';
    }
  });

  speed.addEventListener('change', e => autoTextManager.notify({ speed: e.target.value }));
})();
