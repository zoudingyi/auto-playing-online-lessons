const { Builder, By, Key, until } = require('selenium-webdriver');
const embeddedCode = require('./embeddedCode');
const {
  userName,
  passWord,
  loginPage,
  semester,
  lesson,
  chapter,
  section
} = require('./src/config');

(async function myFunction() {
  // 创建一个driver实例
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    // 1. 跳转到川大学生登录页面
    await driver.get(loginPage);

    // 2. 登录
    await driver.findElement(By.id('username')).sendKeys(userName);
    await driver.findElement(By.id('password1')).sendKeys(passWord, Key.ENTER);

    // 跳转到学员空间 点击相应课程 
    await driver.findElement(By.xpath('/html/body/div[2]/table[2]/tbody/tr[2]/td[2]/div/table[4]/tbody/tr/td[2]/table/tbody/tr[7]/td[1]/font/a')).click();
    
    // 3. 进入课程选择页面 (课程列表是个iframe 先切换到iframe再获取元素)
    let windows = await driver.getAllWindowHandles();
    await driver.switchTo().window(windows[1]); // 切换window handle
    await driver.wait(until.elementLocated(By.css('.mainright> #frame_content')), 15000);

    // 切换到iframe 选择课程
    await driver.switchTo().frame(0); 
    // await driver.findElement(By.className('courseImg')).click();
    const lessons = await driver.findElements(By.css('.bxCourse> .courseDetail'));
    lessons[lesson].findElement(By.className('courseImg')).click();

    // 4. 进入视频章节列表页面 选择章节（是个iframe嵌iframe）
    windows = await driver.getAllWindowHandles();
    await driver.switchTo().window(windows[2]); // 切换window handle
    await driver.wait(until.elementLocated(By.className('main')), 10000);

    // await driver.findElement(By.css('h3> a')).click(); // 这里从第一个视频开始
    const chapters = await driver.findElements(By.css('.timeline> .units')); // 章节
    const sections = await chapters[chapter - 1].findElements(By.css('.leveltwo')); // 小节
    sections[section - 1].findElement(By.css('h3> a')).click();  // 从第几章第几节开始

    // 5. 进入视频页面
    await driver.wait(until.elementLocated(By.id('mainid')), 10000);

    // 6. 嵌入循环播放代码 开始挂课
    await driver.executeScript(embeddedCode);

  } catch (error) {
    console.error(error);
    await driver.quit();
  } finally {
    // 关闭浏览器
    // await new Promise(res => setTimeout(res, 30000));
    // await driver.quit();
  }
})();
