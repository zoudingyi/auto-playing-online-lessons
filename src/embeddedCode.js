/**
 * @description: 在页面heade里嵌入JavaScript代码，自动16倍速播放，播放完毕后自动点击下一章。
 * ps：这里属于核心功能，原本是打算用selenium的功能来完成，但是翻遍了整个文档也没有找到可以像js那样直接操作原生DOM的api，所以干脆就直接用js来解决问题了。
 * @param {*}
 * @return {*}
 */

module.exports = `
  var script = document.createElement("script");
  script.innerHTML =
  \`
    (function () {
      var videoIndex = 0;
      var originalTitle = "";
      loop();
      async function loop() {
        console.log(videoIndex);
        try {
          await new Promise((res) => setTimeout(res, 2000)); // 防止页面没加载完成就执行
          const currentTitle = document.querySelector("#mainid h1").innerText;
          if (currentTitle === originalTitle) return; // 标题一样说明最后一章了

          const videoIframe = document
            .querySelector("#iframe")
            .contentWindow.document.querySelector("iframe");
          const nextBtn = document.querySelector(".orientationright");
          if (videoIframe) {
            const video = videoIframe.contentWindow.document.querySelector("video");
            if (video) {
              video.play();
              video.playbackRate = 2;
              video.addEventListener(
                "ended",
                function () {
                  console.log("当前视频播放结束");
                  nextBtn.click();
                  loop();
                },
                false
              );
            } else {
              console.log("选择题页 直接跳过");
              nextBtn.click();
              loop();
            }
          } else {
            console.log("标题页 直接跳过");
            nextBtn.click();
            loop();
          }
          originalTitle = currentTitle;
          videoIndex++;
        } catch (error) {
          console.error(error);
        }
      }
    })();
  \`
document.getElementsByTagName("head")[0].appendChild(script);
`
