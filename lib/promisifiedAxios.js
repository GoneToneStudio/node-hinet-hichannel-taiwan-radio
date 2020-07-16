/**
 * Copyright 2020 GoneTone
 * HiNet hichannel 台灣電台
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
