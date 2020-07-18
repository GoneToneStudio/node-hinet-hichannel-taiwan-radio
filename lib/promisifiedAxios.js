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
 * @returns {Promise<axios.response>}
 */
const promisifiedAxios = (url) => {
    return new Promise((resolve) => {
        axios.get(url).then((response) => {
            return resolve(response);
        }).catch((error) => {
            return resolve(error);
        });
    });
}

module.exports = promisifiedAxios;
