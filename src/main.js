
import config from './config.js'
// 全局注入配置
window.EZ_CONFIG = config

const CONFIG_TIMEOUT = 5000; // 5 seconds

function loadConfigScript() {

  return new Promise((resolve, reject) => {

    const script = document.createElement('script');

    // script.src = `${CONFIG_FILE_NAME}?t=${Date.now()}`;

    script.async = true;



    const timer = setTimeout(() => {

      cleanup();

      reject(new Error('Config load timeout'));

    }, CONFIG_TIMEOUT);



    script.onload = () => {

      if (window.EZ_CONFIG && Object.keys(window.EZ_CONFIG).length > 0) {

        cleanup();

        resolve();

      } else {

        cleanup();

        reject(new Error('EZ_CONFIG is empty'));

      }

    };



    script.onerror = () => {

      cleanup();

      reject(new Error('Config script error'));

    };



    function cleanup() {

      clearTimeout(timer);

      script.onload = null;

      script.onerror = null;

    }



    document.head.appendChild(script);

  });

}


(async () => {
  await import('./appInit.js');
})();
