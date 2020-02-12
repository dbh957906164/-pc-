window.addEventListener('load', function() {
    // 获取元素
    // var input = document.getElementById('input');
    var input = document.querySelector('#input');
    var eye = document.getElementById('eye');
    // 注册事件
    var flag = 0
    eye.onclick = function() {
        if (flag == 0) {
            input.type = 'text';
            eye.src = 'images/open.png';
            flag = 1;
        } else {
            input.type = 'password';
            eye.src = 'images/close.png';
            flag = 0;
        }
    }
})