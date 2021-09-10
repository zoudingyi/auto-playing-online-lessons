const { Builder } = require('selenium-webdriver');
    (async function myFunction() {
      let driver = await new Builder().forBrowser('chrome').build();

      // 导航到某个网站
      await driver.get('https://baidu.com');
      // 返回
      await driver.navigate().back();
      // 往前
      await driver.navigate().forward();
      // 刷新
      await driver.navigate().refresh();

      await driver.quit();
    })();