window.addEventListener('load', function() {
        // 单获得焦点时隐藏文本框内容，失去焦点时获得文本框内容 start
        // 获取元素
        var text = document.querySelector('.text');
        // 注册事件 获得焦点事件 onfocus  失去焦点事件 onblur
        text.onfocus = function() {
            // console.log('111');
            if (this.value == '语言开发') {
                this.value = '';
            }
            // 获得焦点需要把文本框里面的文字颜色变黑
            this.style.color = '#333';

        }
        text.onblur = function() {
                if (this.value == '') {
                    this.value = '语言开发';
                }
                // 失去焦点需要把文本框里面的文字颜色变浅色
                this.style.color = '#999';
            }
            // 单获得焦点时隐藏文本框内容，失去焦点时获得文本框内容 end
    })
    // 轮播图制作
window.addEventListener('load', function() {
        // 1. 获取元素
        var arrow_l = document.querySelector('.arrow-l');
        var arrow_r = document.querySelector('.arrow-r');
        var focus = document.querySelector('.focus');
        var focusWidth = focus.offsetWidth;
        // 2. 鼠标经过focus 就显示隐藏左右按钮
        focus.addEventListener('mouseenter', function() {
            arrow_l.style.display = 'block';
            arrow_r.style.display = 'block';
            clearInterval(timer);
            timer = null; // 清除定时器变量
        });
        focus.addEventListener('mouseleave', function() {
            arrow_l.style.display = 'none';
            arrow_r.style.display = 'none';
            timer = setInterval(function() {
                //手动调用点击事件
                arrow_r.click();
            }, 2000);
        });
        // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
        var ul = focus.querySelector('ul');
        var ol = focus.querySelector('.circle');
        // console.log(ul.children.length);
        for (var i = 0; i < ul.children.length; i++) {
            // 创建一个小li 
            var li = document.createElement('li');
            // 记录当前小圆圈的索引号 通过自定义属性来做 
            li.setAttribute('index', i);
            // 把小li插入到ol 里面
            ol.appendChild(li);
            // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
            li.addEventListener('click', function() {
                // 干掉所有人 把所有的小li 清除 current 类名
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                }
                // 留下我自己  当前的小li 设置current 类名
                this.className = 'current';
                // 5. 点击小圆圈，移动图片 当然移动的是 ul 
                // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
                // 当我们点击了某个小li 就拿到当前小li 的索引号
                var index = this.getAttribute('index');
                // 当我们点击了某个小li 就要把这个li 的索引号给 num  
                num = index;
                // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
                circle = index;
                // num = circle = index;
                console.log(focusWidth);
                console.log(index);

                animate(ul, -index * focusWidth);
            })
        }
        // 把ol里面的第一个小li设置类名为 current
        ol.children[0].className = 'current';
        // 6. 克隆第一张图片(li)放到ul 最后面
        var first = ul.children[0].cloneNode(true);
        ul.appendChild(first);
        // 7. 点击右侧按钮， 图片滚动一张
        var num = 0;
        // circle 控制小圆圈的播放
        var circle = 0;
        // flag 节流阀
        var flag = true;
        arrow_r.addEventListener('click', function() {
            if (flag) {
                flag = false; // 关闭节流阀
                // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                animate(ul, -num * focusWidth, function() {
                    flag = true; // 打开节流阀
                });
                // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
                circle++;
                // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
                if (circle == ol.children.length) {
                    circle = 0;
                }
                // 调用函数
                circleChange();
            }
        });

        // 9. 左侧按钮做法
        arrow_l.addEventListener('click', function() {
            if (flag) {
                flag = false;
                if (num == 0) {
                    num = ul.children.length - 1;
                    ul.style.left = -num * focusWidth + 'px';

                }
                num--;
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
                circle--;
                // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
                // if (circle < 0) {
                //     circle = ol.children.length - 1;
                // }
                circle = circle < 0 ? ol.children.length - 1 : circle;
                // 调用函数
                circleChange();
            }
        });

        function circleChange() {
            // 先清除其余小圆圈的current类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下当前的小圆圈的current类名
            ol.children[circle].className = 'current';
        }
        // 10. 自动播放轮播图
        var timer = setInterval(function() {
            //手动调用点击事件
            arrow_r.click();
        }, 2000);

    })
    // 菜单下拉
$(function() {
        // $(".slide>ul>li").mouseover(function() {
        //     $(this).children("div").stop().slideDown(200);
        // });
        // $(".slide>ul>li").mouseout(function() {
        //     $(this).children("div").stop().slideUp(200);
        // });
        // 1. 事件切换 hover 就是鼠标经过和离开的复合写法
        // $(".slide>ul>li").hover(function() {
        //     $(this).children("div").stop().slideDown(200);
        // }, function() {
        //     $(this).children("div").stop().slideUp(200);
        // });
        // 2. 事件切换 hover  如果只写一个函数，那么鼠标经过和鼠标离开都会触发这个函数
        $(".slide>ul>li").hover(function() {
            $(this).children("div").stop().slideToggle();
        });

    })
    //     // 导航栏固定，显示与隐藏 js方法
    // $(function() {
    //     //1. 获取元素
    //     var fixedtool = document.querySelector('.fixedtool');
    //     var floor = document.querySelector('.floor');
    //     var recommend = document.querySelector('.recommend');
    //     // floor.offestTop 就是被卷去头部的大小 一定要写到滚动的外面
    //     var floorTop = floor.offsetTop;
    //     var recommendTop = recommend.offsetTop;
    //     // 当我们侧边栏固定定位之后应该变化的数值
    //     var fixedtoolTop = fixedtool.offsetTop - recommendTop;
    //     var goBack = document.querySelector('.goback');
    //     // 2. 页面滚动事件 scroll
    //     document.addEventListener('scroll', function() {
    //         console.log(fixedtoolTop);
    //         if (window.pageYOffset >= recommendTop) {
    //             fixedtool.style.position = 'fixed';
    //             fixedtool.style.top = fixedtoolTop + 'px';
    //         } else {
    //             fixedtool.style.position = 'absolute';
    //             fixedtool.style.top = '350px';
    //         }
    //         // 4. 当我们页面滚动到floor盒子，就显示 goback模块
    //         if (window.pageYOffset >= floorTop) {
    //             goBack.style.display = 'block';
    //         } else {
    //             goBack.style.display = 'none';
    //         }

//     })
// })
//电梯导航
$(function() {
    //显示与隐藏电梯导航
    var recommend = $(".recommend").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= recommend) {
            $(".fixedtool").fadeIn()
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    // 当我们点击了小li 此时不需要执行 页面滚动事件里面的 li 的背景选择 添加 current
    // 节流阀  互斥锁 
    var flag = true;
    $(window).scroll(function() {
        console.log($(document).scrollTop());

        toggleTool();
        // 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名
        if (flag) {
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current");
                }
            });
        }
        if ($(document).scrollTop() >= $(".floor").offset().top) {
            $(".fixedtool .goBack").css("display", "block");
        } else {
            $(".fixedtool .goBack").css("display", "none");
        }

    });
    //点击电梯导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function() {
            flag = false;
            // 当我们每次点击小li 就需要计算出页面要去往的位置 
            // 选出对应索引号的内容区的盒子 $(this).index()   计算它的.offset().top
            var current = $(".floor .w").eq($(this).index()).offset().top;
            // 页面动画滚动效果
            $("body, html").stop().animate({
                    scrollTop: current
                }, function() {
                    flag = true;
                })
                // 点击之后，让当前的小li 添加current 类名 ，姐妹移除current类名
            $(this).addClass("current").siblings().removeClass("current");

        })
        //点击返回顶部，页面直接划到顶部。
    $(".goBack").click(function() {
        $("body, html").stop().animate({
            scrollTop: 0
        })
    })

})