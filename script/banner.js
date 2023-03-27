window.onload = function () {
    var leftIcon = document.querySelector('.left')
    var rightIcon = document.querySelector('.right')
    var banner = document.querySelector('.banner')
    var bannerContainer = document.querySelector('.banner-container')
    var ol = bannerContainer.querySelector('ol')
    var ul = banner.querySelector('ul')


    //鼠标经过banner 显示左右按钮 停止定时器
    banner.addEventListener('mouseenter', function () {
        leftIcon.style.display = 'block';
        rightIcon.style.display = 'block';
        clearInterval(timer)
        timer = null
    })
    // 鼠标离开banner 影藏左右按钮 开启定时器
    banner.addEventListener('mouseleave', function () {

        timer = setInterval(() => {
            // 手动调用点击事件
            rightIcon.click();
        }, 3000);
    })

    // 动态生成小圆点
    for (var i = 0; i < ul.children.length; i++) {

        var newli = document.createElement('li')
        // 通过自定义属性设置当前小圆圈的所索引号
        newli.setAttribute('index', i)
        ol.appendChild(newli)
    }
    ol.children[0].className = 'active'

    //排他思想完成选中小圆点
    var yuan = ol.querySelectorAll('li')
    // 点击小圆圈移动图片  ul的移动距离就是小圆圈的索引号 乘以 ul的宽度
    var ulWidth = ul.offsetWidth;
    for (var i = 0; i < yuan.length; i++) {
        yuan[i].addEventListener('click', function () {
            for (var i = 0; i < yuan.length; i++) {
                yuan[i].className = ''
            }
            this.className = 'active';
            // 被点击时拿到当前小圆圈索引号
            var index = this.getAttribute('index');
            animate(ul, -index * ulWidth);
            // 当我们点击了某个小li 就要把这个li 的索引号给 num
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle
            circle = index;
        })
    }
    // 克隆第一张图片 放到ul的最后面
    var first = ul.children[0].cloneNode(true)
    ul.appendChild(first)

    // 点击按钮 图片滚动
    var num = 0
    // 控制小圆圈播放
    var circle = 0
    // flag 定义节流阀
    var flag = true;
    rightIcon.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 如果走到了最后复制的一张图片 此时 我们的ul要快速复原 left改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * ulWidth, function () {
                flag = true
            })

            // 点击右侧按钮 小圆圈随之变化 是用排他思想清除之前的样式
            circle++;
            if (circle == ol.children.length) {
                circle = 0
            }
            circleChange();
        }
    })

    // 左侧按钮
    leftIcon.addEventListener('click', function () {
        if (flag) {
            flag = false;
            // 如果走到了最后复制的一张图片 此时 我们的ul要快速复原 left改为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * ulWidth + 'px';

            }
            num--;
            animate(ul, -num * ulWidth, function () {
                flag = true;
            })

            // 点击右侧按钮 小圆圈随之变化 是用排他思想清除之前的样式
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange();
        }
    })

    // 优化代码
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'active';
    }

    // 自动播放
    var timer = setInterval(() => {
        // 手动调用点击事件
        rightIcon.click();
    }, 2000);

    // 点击图片跳转
    ul.addEventListener('click', (e) => {
        if(e.target.id === 'img3'){
            window.location.href = './specific-4.html'
        }else if(e.target.id === 'img4'){
            window.location.href = './specific-3.html'
        }
    })

/*    // 获取contact us
    var contact = document.getElementById('contact')
    contact.addEventListener('click', () => {
        window.location.href = './contach.html'
    })*/
}

