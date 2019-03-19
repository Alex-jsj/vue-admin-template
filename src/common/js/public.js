// 圆环canvas
export function circle_canvas(drawing_elem, percent, forecolor, bgcolor) {
    // @drawing_elem: 绘制对象
    // @percent：绘制圆环百分比, 范围[0, 100]
    // @forecolor: 绘制圆环的前景色，颜色代码
    // @bgcolor: 绘制圆环的背景色，颜色代码
    var context = drawing_elem.getContext('2d');
    var center_x = drawing_elem.width / 2;
    var center_y = drawing_elem.height / 2;
    var rad = (Math.PI * 2) / 100;
    var speed = 0;
    // drawing_elem.style.width = drawing_elem.parentNode.clientHeight + 'px';
    // drawing_elem.style.height = drawing_elem.parentNode.clientHeight + 'px';
    // drawing_elem.setAttribute('width', drawing_elem.parentNode.clientHeight * 2);
    // drawing_elem.setAttribute('height', drawing_elem.parentNode.clientHeight * 2);
    // 绘制背景圆圈
    function backgroundCircle() {
        context.save();
        context.beginPath();
        context.lineWidth = 8; //设置线宽
        var radius = center_x - context.lineWidth;
        context.lineCap = 'round';
        context.strokeStyle = bgcolor;
        context.arc(center_x, center_y, radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
        context.restore();
    }

    //绘制运动圆环
    function foregroundCircle(n) {
        context.save();
        context.strokeStyle = forecolor;
        context.lineWidth = 8;
        context.lineCap = 'round';
        var radius = center_x - context.lineWidth;
        context.beginPath();
        context.arc(
            center_x,
            center_y,
            radius,
            -Math.PI / 2,
            -Math.PI / 2 + n * rad,
            false
        ); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
        context.stroke();
        context.closePath();
        context.restore();
    }

    //执行动画
    (function drawFrame() {
        window.requestAnimationFrame(drawFrame);
        context.clearRect(0, 0, drawing_elem.width, drawing_elem.height);
        backgroundCircle();
        foregroundCircle(speed);
        if (speed >= percent) return;
        speed += 2;
    })();
}

// 计算百分比
export function component_percent(data, total) {
    // data 当前数值
    // total 总数值
    let percent = null;
    if (data > 0 && total > 0) {
        percent = ((data / total) * 100).toFixed(0);
    } else {
        percent = 0;
    }
    return percent;
}

// 格式化日期
export function filter_date(date, type) {
    let dataTime = '';
    let data = date || '';
    let year = data.getFullYear();
    let month = data.getMonth() + 1;
    let day = data.getDate();
    let hour = data.getHours();
    let minute = data.getMinutes();
    let second = data.getSeconds();
    month < 10 ? (month = '0' + month) : month;
    day < 10 ? (day = '0' + day) : day;
    hour < 10 ? (hour = '0' + hour) : hour;
    minute < 10 ? (minute = '0' + minute) : minute;
    second < 10 ? (second = '0' + second) : second;
    if (type == 'YMD') {
        dataTime = `${year}-${month}-${day}`;
    } else if (type == 'YMDHMS') {
        dataTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    } else if (type == 'HMS') {
        dataTime = `${hour}:${minute}:${second}`;
    } else if (type == 'YM') {
        dataTime = `${year}-${month}`;
    }
    return dataTime;
}

// 格式化身份证号
export function filter_IDCard(data, field) {
    let list = data || '';
    for (let key in list) {
        if (list[key][field]) {
            list[key].newIDCard = list[key][field].replace(
                list[key][field].substring(6, 14),
                '********'
            );
        }
    }
    return list;
}

// 格式化权限列表
export function format_permissions_arr(list) {
    let arr = []; // new array
    let _list = list || [];
    // 将属于同一个组的权限归类整理在一个数组中
    _list.forEach(function(data) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].title === data.group_title) {
                arr[i].jurisdictions.push({
                    title: data.title,
                    name: data.name,
                    id: data.id,
                    pivot: data.pivot,
                    guard_name: data.guard_name
                });
                arr[i].num++;
                return;
            }
        }
        arr.push({
            name: data.name.split('.')[0],
            title: data.group_title,
            checkAll: false, // 全选
            isIndeterminate: true,
            checkedOptions: [], // 已选
            num: 1,
            jurisdictions: [
                {
                    title: data.title,
                    name: data.name,
                    id: data.id,
                    pivot: data.pivot,
                    guard_name: data.guard_name
                }
            ] //所有权限
        });
    });
    return arr;
}

/* 清除对象的为空字段 */
export function cleanObject(obj) {
    let the_obj = JSON.parse(JSON.stringify(obj));
    for (let key in the_obj) {
        if (the_obj[key] === '' || the_obj[key] === null) {
            delete the_obj[key];
        }
    }
    return the_obj;
}

