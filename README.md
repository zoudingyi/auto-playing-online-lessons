# auto-playing-online-lessons

This is a project that can help you automatically play annoying online lessons.

> 这是一个基于 Selenium + JavaScript 开发的一个用来模拟用户操作浏览器的项目。<br>
开发目的是用来挂网课，每次都要手动点下一个视频，非常麻烦 ┐(-｡ｰ;)┌ <br> 于是自己研究了一个播放完成自动点击下一个视频的程序。

***目前仅支持[四川大学成人继续教育学院](http://cce.scu.edu.cn/)***

### 功能

- [x] 自动登录并跳转到网课页。
- [x] 最大16倍速播放视频。
- [x] 播放完毕自动跳转下一章。
- [x] 自动跳过一些没有视频的页面。

### 依赖

[Selenium](https://www.selenium.dev/zh-cn/documentation/)<br>

使用Selenium需要安装浏览器驱动，详情请看[官方文档](https://www.selenium.dev/zh-cn/documentation/getting_started/installing_browser_drivers/)。

### 使用

1. 打开`src/config.js` 文件
2. 修改`config`配置
3. 运行项目

```shell
  userName: '', // 账号
  passWord: '', // 密码
  loginPage: '', // 登录页
  lesson : 1, // 第几课 - 从[进行中的课程]列表顺序来选择 入下图所示
  chapter: 1, // 第几章
  section: 1 // 第几节
  
  // ps：若想从课程目录2.4开始挂课。设置 chapter: 2, section: 4 则从第二章第四节开始挂课， 默认为第一课第一章第一小节开始挂课。
```

![课程列表顺序](./src/img/50726580-858D-424e-9CDB-225102F01288.png)

### 本地运行

1. 克隆项目

```shell
git clone https://github.com/zoudingyi/auto-playing-online-lessons.git

cd auto-playing-online-lessons
```

2. 安装依赖

```shell
npm install
```

3. 启动项目

```shell
npm run dev
```

### 注意
**【2022年1月25日】：** 根据反馈发现网站做了倍数监听，一旦设置超过2倍数就会暂停。要调整倍数目前只能通过chrome dev tools 的API: getEventListeners去删除该监听，然后重新修改倍数。

运行项目以后 F12打开控制台console页，top改为视频的iframe下的index.html， 输入下面代码：

```
const video = document.querySelector("video"); // 获取video
getEventListeners(video).ratechange.forEach(rate => video.removeEventListener('ratechange', rate.listener)); // 删除该video下的所有ratechange监听。
video.playbackRate = 16; // 重新调整倍数。
```

由于切换下一个视频后是一个新的iframe 所以得再次执行以上代码，清除监听。所以无法自动16倍数了 (Ｔ▽Ｔ)