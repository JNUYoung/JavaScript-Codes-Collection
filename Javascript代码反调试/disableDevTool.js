// 禁用鼠标右键的点击事件
window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    return false
})

// 禁用f12的打开控制台功能
window.onkeydown = window.onkeyup = window.onkeypress = function (event) {
    // 判断是否按下F12，F12键码为123
    if (event.keyCode === 123 || event.ctrlKey) {
        event.preventDefault(); // 阻止默认事件行为
    } else if (event.keyCode === 116) {
        if (navigator.userAgent.indexOf('MSIE') > 0) { // close IE
   if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
      window.opener = null;
      window.close();
   } else {
      window.open('', '_top');
      window.top.close();
   }
} else { // close chrome;It is effective when it is only one.
   window.opener = null;
   window.open('', '_self');
   window.close();
}
    }
}