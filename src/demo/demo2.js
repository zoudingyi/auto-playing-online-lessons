const { Builder, By, until } = require('selenium-webdriver');

(async function myFunction() {
  // 创建一个driver实例
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // 1. 跳转到百度
    await driver.get('https://baidu.com');

    // 2. 搜索
    let searchText = 'selenium';
    // 定位到搜索框, 并输入关键字
    await driver.findElement(By.id('kw')).sendKeys(searchText);
    await new Promise(res => setTimeout(res, 1000));
    // 定位到搜索按钮, 并点击
    await driver.findElement(By.id('su')).click();

    // 3. 从结果列表中选择百度百科
    let containers = await driver.wait(until.elementsLocated(By.className('c-container')), 2000);
    let targetElement = null;
    for (let container of containers) {
      let element = await container.findElement(By.css('h3>a'));
      let title = await element.getText();
      if (title.indexOf('百度百科') > -1) {
        targetElement = element;
        break;
      }
    }
    if (targetElement) {
      // 4. 打开百度百科
      await targetElement.click();
      // 切换window handle
      let windows = await driver.getAllWindowHandles();
      await driver.switchTo().window(windows[1]);

      await driver.wait(until.elementLocated(By.className('main-content')), 5000);
      await new Promise(res => setTimeout(res, 2000));
    }
  } catch (error) {
    console.error(error);
  } finally {
    // 关闭浏览器
    await driver.quit();
  }
})();
