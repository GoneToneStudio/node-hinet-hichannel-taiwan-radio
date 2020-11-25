/**
 * Copyright 2020 GoneTone
 *
 * HiNet hichannel 台灣電台
 * https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio
 *
 * @author   張文相 Zhang Wenxiang (旋風之音 GoneTone) <https://blog.reh.tw>
 * @license  MIT <https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio/blob/master/LICENSE>
 *
 * Promisified Axios
 */

'use strict';

const axios = require("axios");

/**
 * @param {string} url 網址
 *
 * @returns {Promise<axios.response>|boolean}
 */
const promisifiedAxios = (url) => {
    const parseUrl = new URL(url);
    let options = {};

    if (typeof window === "undefined") { //Node.js 執行
        const userAgent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.82 Safari/537.36";
        options = {
            headers: {
                "User-Agent": userAgent,
                "Referer": "https://hichannel.hinet.net/radio/index.do"
            }
        };
    } else { //瀏覽器或其他執行
        return false; //因瀏覽器安全性問題無法偽造 Header
    }

    return new Promise((resolve) => {
        axios.get(url, options).then((response) => {
            return resolve(response);
        }).catch((error) => {
            return resolve(error);
        });
    });
}

module.exports = promisifiedAxios;
