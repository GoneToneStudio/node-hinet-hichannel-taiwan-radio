/**
 * Copyright 2020 GoneTone
 *
 * HiNet hichannel 台灣電台
 * https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio
 *
 * @author   張文相 Zhang Wenxiang (旋風之音 GoneTone) <https://blog.reh.tw>
 * @license  MIT <https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio/blob/master/LICENSE>
 *
 * 取得 m3u8 串流網址
 */

'use strict';

const promisifiedAxios = require("./promisifiedAxios");
const m3u8Parser = require("m3u8-parser");

/**
 * 取得 m3u8 串流網址
 *
 * @param {string} hichannelChannelCode Hichannel 頻道代碼
 * @param {string} token1 Token 1
 * @param {string} token2 Token 2
 * @param {number} expire1 到期時間戳 1
 * @param {number} expire2 到期時間戳 2
 *
 * @returns {string|boolean} 回傳 m3u8 串流網址 (失敗回傳 false)
 */
const getM3u8Url = async(hichannelChannelCode, token1, token2, expire1, expire2) => {
    const url = `https://radio-hichannel.cdn.hinet.net`;
    const path = `/live/pool/${hichannelChannelCode}/ra-hls/`;

    let axios = await promisifiedAxios(url + path + `index.m3u8?token1=${token1}&token2=${token2}&expire1=${expire1}&expire2=${expire2}`);

    if (axios["status"] && axios["status"] === 200) {
        const parser = new m3u8Parser.Parser();

        parser.push(axios["data"]);
        parser.end();

        return url + path + parser.manifest.playlists[0].uri;
    }

    return false;
}

module.exports = getM3u8Url;
