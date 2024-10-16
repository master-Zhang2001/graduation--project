
/**
 * 将'key1.key2'形式的字符串分隔成['key1','key2']的数组
 * @param value {string}
 * @returns {array}
 */
const splitByDot = function (value) {
    if (value) {
        return value.split('.');
    } else {
        return [];
    }
};
/**
 * 通过字符串对object多层设值,字符串为'key1.key2'的形式
 * @param obj {object} 目标对象
 * @param keyString {string} 要设置值的key,形为'key1.key2'的字符串
 * @param val {*} 需要设置的值
 */
const setValByKey = function (obj, keyString, val) {
    let current = obj;
    const keyArray = splitByDot(keyString);
    const len = keyArray.length;
    if (len > 0) {
        keyArray.forEach((key, index) => {
            if (len === 1) {   // 如果为单层,则直接设置
                obj[key] = val;
            } else {   // 否则在最后一层设置值,以保持对象的引用
                if (index === len - 1) {
                    current[key] = val;
                }
                current = current[key];
            }
        });
    }

}
/**
 * @param {Object} json
 * @returns {Array}
 */
const param = function (json) {
    if (!json) return ''
    return cleanArray(
        Object.keys(json).map(key => {
            if (json[key] === undefined) return ''
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
        })
    ).join('&')
}
/**
 * @param {Array} actual
 * @returns {Array}
 */
const cleanArray = (actual) => {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i])
        }
    }
    return newArray
}
//   导出
const downloadFile = function (url, params, name) {
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = `${url}?${param(params)}`
    link.setAttribute('download', name)
    document.body.appendChild(link)
    link.click()
}

const downloadBlobFile = function (filename, blob) {
    //   if (window.navigator.msSaveOrOpenBlob) {
    //     navigator.msSaveBlob(blob, filename);
    //   } else {
    const link = document.createElement('a');
    const body = document.querySelector('body');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    // fix Firefox
    link.style.display = 'none';
    body.appendChild(link);

    link.click();
    body.removeChild(link);

    window.URL.revokeObjectURL(link.href);
    //   }
}
//   复制
const copyUrl = function (content) {//复制到粘贴板
    return new Promise((resolve, reject) => {
        var oInput = document.createElement('input');
        oInput.value = content;
        oInput.style.opacity = '0';
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        if (document.execCommand('copy')) {
            document.execCommand("Copy"); // 执行浏览器复制命令
            resolve()
        } else {
            reject()
        }
        document.body.removeChild(oInput)
    })
}
const dateFormat = function (time, cFormat, tip = '--') {
    if (arguments.length === 0 || !time) return tip
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

function messages(title, icon) {
    uni.showToast({
        title,
        icon: icon || 'none',
        duration: 2000
    });
}

const utils = {
    setValByKey, copyUrl, downloadBlobFile, downloadFile, dateFormat, messages
}
export default utils