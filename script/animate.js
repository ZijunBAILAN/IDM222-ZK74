function animate(obj,target,callback) { 
    // 相当于callback = function(){} 回调函数写在定时器里面
    clearInterval(obj.timer)
    obj.timer = setInterval(() => {
        // 如果比0大 就向上取整 如果比0小 就向下取整
        var step = (target - obj.offsetLeft) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        obj.style.left = obj.offsetLeft + step + 'px';
        if(obj.offsetLeft == target){
            clearInterval(obj.timer);
            callback && callback();
        }
        
    }, 15);
 }