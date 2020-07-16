/**
 * Copyright 2020 GoneTone
 * HiNet hichannel 台灣電台
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
 * @param {string} url 網址
 *
 * @returns {string|boolean} 回傳 m3u8 串流網址 (失敗回傳 false)
 */
const getM3u8Url = async(hichannelChannelCode, url) => {
    let axios = await promisifiedAxios(url);

    if (axios["status"] && axios["status"] === 200) {
        const parser = new m3u8Parser.Parser();

        parser.push(axios["data"]);
        parser.end();

        return `http://radio-hichannel.cdn.hinet.net/live/pool/${hichannelChannelCode}/ra-hls/${parser.manifest.playlists[0].uri}`;
    }

    return false;
}

module.exports = getM3u8Url;
