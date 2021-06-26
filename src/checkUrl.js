/**
 * Copyright 2020 GoneTone
 *
 * HiNet hichannel 台灣電台
 * https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio
 *
 * @author   張文相 Zhang Wenxiang (旋風之音 GoneTone) <https://blog.reh.tw>
 * @license  MIT <https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio/blob/master/LICENSE>
 *
 * 檢查網址
 */

'use strict';

const promisifiedAxios = require("./promisifiedAxios");

/**
 * 檢查網址狀態碼是否是 200
 *
 * @param {String} url 網址
 * @param {Proxy|null} proxy 代理伺服器 (預設不使用代理)
 *
 * @returns {Promise<{status: Boolean, msg: String}>}
 */
const checkUrl = async(url, proxy = null) => {
    let axios = await promisifiedAxios(url, proxy);

    if (axios["status"] && axios["status"] === 200) {
        return {
            "status": true,
            "msg": axios["statusText"]
        };
    }

    return {
        "status": false,
        "msg": axios["message"]
    };
}

module.exports = checkUrl;
