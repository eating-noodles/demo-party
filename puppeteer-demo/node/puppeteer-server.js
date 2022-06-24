const puppeteer = require('puppeteer');

// node server.js --webUrl='http://localhost:3000'

// 参数： 路径 filePath、名称 fileName 、宽 width、高 hight
// sudo node  --unhandled-rejections=strict server.js --picPath=./ --webUrl='http://www.baidu.com'  --picName=h5.png --width=750 --height=3000
(async () => {
  console.log('[程序开始]:...');
  const config = {
    webUrl: '',
    picPath: '',
    picName: 'h5.png',
    width: 750,
    height: 0,
  };
  const params = process.argv.splice(2);
  console.log('[程序入参]:', params);
  params.forEach((el) => {
    const arr = el.split('=');
    arr[0] = arr[0].split('--')[1];
    config[arr[0]] = +arr[1] || arr[1];
  });
  console.log('[最终配置]:', config);
  if (config.webUrl) {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      ignoreDefaultArgs: ['--disable-extensions'],
    });
    const page = await browser.newPage();
    page.setViewport({
      width: config.width,
      height: config.height,
    });
    await page.goto(config.webUrl);
    setTimeout(async () => {
      console.log('[开始截图]:...');
      const pagesize = await page.evaluate((config) => {
        return {
          // width: document.documentElement.scrollWidth,
          // height: config.height || document.documentElement.scrollHeight
          width: document.getElementById('content').scrollWidth,
          height: config.height || document.body.children[0].clientHeight,
        };
      }, config);
      console.log(`${pagesize.width} x ${pagesize.height}`);
      // 重新调整viewport大小，适配真实的页面
      await page.setViewport({
        width: pagesize.width,
        height: pagesize.height,
      });
      await page.screenshot({ path: config.picPath + config.picName });
      browser.close();
    }, 10000);
  } else {
    console.log('[截图失败]:请传入目标网站地址');
  }
})();
