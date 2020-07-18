/**
 * Copyright 2020 GoneTone
 * HiNet hichannel 台灣電台
 */

'use strict';

const crypto = require("crypto");
const getM3u8Url = require("../lib/getM3u8Url");
const checkUrl = require("../lib/checkUrl");

class HiNetHichannel {
    /**
     * HiNetHichannel constructor.
     *
     * @param {string} hichannelChannelCode Hichannel 頻道代碼
     * @param {string} ip IP 位址
     */
    constructor(hichannelChannelCode, ip) {
        this._hichannelChannelCode = hichannelChannelCode;
        this._ip = ip;
    }

    /**
     * 取得 Hichannel Token
     *
     * @param {number} timestamp 時間戳
     * @param {number} tokenOrd 帶入 1 或 2
     *
     * @returns {string} Hichannel Token
     */
    getToken(timestamp, tokenOrd) {
        const path = `/live/pool/${this._hichannelChannelCode}/ra-hls/`;

        const constStr = "radio@himediaservice#t";
        const catStr = path + timestamp + this._ip + constStr + tokenOrd;
        const hashed = crypto.createHash("md5").update(catStr).digest();
        const base64Md5Hash = new Buffer.from(hashed).toString("base64");

        return base64Md5Hash.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }

    /**
     * 建立 Hichannel 播放網址 (m3u8)
     *
     * @returns {Promise<string|Error>|Error}
     */
    buildPlayUrl() {
        const expire1 = (Math.floor(Date.now() / 1000) + (60 * 5));
        const expire2 = (expire1 + (60 * 60 * 24));
        const token1 = this.getToken(expire1, 1);
        const token2 = this.getToken(expire2, 2);

        return new Promise(async(resolve, reject) => {
            const m3u8Url = await getM3u8Url(this._hichannelChannelCode, token1, token2, expire1, expire2);

            if (!m3u8Url) {
                return reject(Error(`Hichannel Code「${this._hichannelChannelCode}」廣播電台 m3u8 網址取得失敗。`));
            }

            let check;
            for (let i = 0; i < 10; i++) {
                check = await checkUrl(m3u8Url);
                if (check.status) {
                    return resolve(m3u8Url);
                }
            }

            return reject(Error(`取得的 Hichannel Code「${this._hichannelChannelCode}」廣播電台 m3u8 網址檢查失敗：${check.msg}`));
        });
    }
}

module.exports = HiNetHichannel;
