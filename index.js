const { Builder, By, Key, until } = require('selenium-webdriver');

(async function myFunction() {
  // 创建一个driver实例
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    // 1. 跳转到川大学生登录页面
    await driver.get('http://cce.scu.edu.cn/mana/view/home/loginPlatform.do?type=1');
    // 账号密码
    const account = {
      username: '',
      password: ''
    }
    // 2. 登录
    await driver.findElement(By.id('username')).sendKeys(account.username);
    await driver.findElement(By.id('password1')).sendKeys(account.password, Key.ENTER);
    // 跳转到学员空间 点击相应课程 
    await driver.findElement(By.xpath('/html/body/div[2]/table[2]/tbody/tr[2]/td[2]/div/table[4]/tbody/tr/td[2]/table/tbody/tr[7]/td[1]/font/a')).click();
    // 3. 进入网课页面 (网课列表是个iframe 先切换到iframe再获取元素)
    
    // const originalWindow  = await driver.getWindowHandle();
    let windows = await driver.getAllWindowHandles();
    await driver.switchTo().window(windows[1]); // 切换window handle
    await driver.wait(until.elementLocated(By.css('.mainright> #frame_content')), 15000);

    // (1) no such element: Unable to locate element: {"method":"css selector","selector":"*[id="frame_content"]"}
    // const iframe = driver.findElement(By.id('frame_content'));
    // await driver.switchTo().frame(iframe);

    // (2) invalid argument: 'id' can not be string
    // await driver.switchTo().frame('frame_content');

    // (3) no such frame
    await driver.switchTo().frame(0); // 切换到iframe

    await driver.findElement(By.xpath('/html/body/div[2]/div[2]/div[2]/a[1]')).click(); // 进入视频网页 （这里可选）
    // 4. 进入挂课的视频页面 （是个iframe嵌iframe）
    windows = await driver.getAllWindowHandles();
    // console.log('windows :>> ', windows);
    await driver.switchTo().window(windows[2]); // 切换window handle
    await driver.wait(until.elementLocated(By.className('main')), 10000);
    await driver.findElement(By.css('h3> a')).click(); // 这里从第一个视频开始
    await driver.wait(until.elementLocated(By.id('mainid')), 10000);

    const nextBtn =  await driver.findElement(By.className('orientationright')); // 下一章按钮
    await driver.switchTo().frame(0);
    await driver.switchTo().frame(0);
    await driver.findElement(By.className('vjs-big-play-button')).click(); // 播放视频
    // const video = await driver.findElement(By.id('video_html5_api'));
    const jsCode = `
      const video = document.querySelector('video');
      video.playbackRate = 16;
      video.addEventListener('ended', function () {
        console.log("播放结束");
        alert("音频播放完成");
    }, false);
    `;
    await driver.executeScript(jsCode);
    // const videoBox = await driver.findElement(By.id('video'));
  } catch (error) {
    console.error(error);
  } finally {
    // 关闭浏览器
    // await new Promise(res => setTimeout(res, 30000));
    // await driver.quit();
  }
})();
