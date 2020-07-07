/**
 * Copyright 2020 GoneTone
 * HiNet hichannel 台灣電台
 *
 * 檢查網址
 */

'use strict';

const axios = require("axios");

/**
 * 檢查網址狀態碼是否是 200
 *
 * @param {string} url 網址
 *
 * @returns {{status: boolean, msg: string}}
 */
const checkUrl = async(url) => {
    let axios = await promisifiedAxios(url);

    if (axios.status && axios.status === 200) {
        return {
            "status": true,
            "msg": axios.statusText
        };
    }

    return {
        "status": false,
        "msg": axios.message
    };
}

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

module.exports = checkUrl;
