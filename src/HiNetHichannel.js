/**
 * Copyright 2020 GoneTone
 *
 * HiNet hichannel 台灣電台
 * https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio
 *
 * @author   張文相 Zhang Wenxiang (旋風之音 GoneTone) <https://blog.reh.tw>
 * @license  MIT <https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio/blob/master/LICENSE>
 */

'use strict';

const hichannelApi = require("./hichannelApi");
const checkUrl = require("./checkUrl");

class HiNetHichannel {
    /**
     * HiNetHichannel constructor.
     *
     * @param {string} hichannelChannelName Hichannel 頻道名稱
     */
    constructor(hichannelChannelName) {
        this._hichannelChannelName = hichannelChannelName;

        this._hichannel = new hichannelApi(this._hichannelChannelName);
        this._loadApi = false;
    }

    /**
     * 加載 API
     *
     * @returns {void}
     */
    async loadApi() {
        const api = await this._hichannel.loadApi();
        if (api) {
            this._loadApi = true;
        } else {
            throw Error(`Hichannel 頻道名稱「${this._hichannelChannelName}」廣播電台找不到，請確認您輸入的頻道名稱是否完全一樣並且正確。`);
        }
    }

    /**
     * Hichannel 播放網址 (m3u8)
     *
     * @returns {string|Error}
     */
    async playUrl() {
        if (this._loadApi) {
            const m3u8Url = await this._hichannel.m3u8Url();

            if (!m3u8Url) {
                throw Error(`Hichannel 頻道名稱「${this._hichannelChannelName}」廣播電台 m3u8 網址取得失敗。`);
            }

            let check;
            for (let i = 0; i < 10; i++) {
                check = await checkUrl(m3u8Url);
                if (check.status) {
                    return m3u8Url;
                }
            }

            throw Error(`取得的 Hichannel 頻道名稱「${this._hichannelChannelName}」廣播電台 m3u8 網址檢查失敗：${check.msg}`);
        }

        throw Error(`Hichannel API 未加載。`);
    }

    /**
     * Hichannel 頻道名稱
     *
     * @returns {string|Error}
     */
    title() {
        if (this._loadApi) {
            const title = this._hichannel.title();

            if (!title) {
                throw Error(`Hichannel 頻道名稱「${this._hichannelChannelName}」廣播電台頻道名稱取得失敗。`);
            }

            return title;
        }

        throw Error(`Hichannel API 未加載。`);
    }

    /**
     * Hichannel 頻道 ID
     *
     * @returns {string}
     */
    id() {
        if (this._loadApi) {
            const id = this._hichannel.id();

            if (!id) {
                throw Error(`Hichannel 頻道名稱「${this._hichannelChannelName}」廣播電台頻道 ID 取得失敗。`);
            }

            return id;
        }

        throw Error(`Hichannel API 未加載。`);
    }

    /**
     * Hichannel 頻道描述
     *
     * @returns {string|Error}
     */
    desc() {
        if (this._loadApi) {
            const desc = this._hichannel.desc();

            if (!desc) {
                throw Error(`Hichannel 頻道名稱「${this._hichannelChannelName}」廣播電台頻道描述取得失敗。`);
            }

            return desc;
        }

        throw Error(`Hichannel API 未加載。`);
    }

    /**
     * Hichannel 頻道區域
     *
     * @returns {string|Error}
     */
    area() {
        if (this._loadApi) {
            const area = this._hichannel.area();

            if (!area) {
                throw Error(`Hichannel 頻道名稱「${this._hichannelChannelName}」廣播電台頻道區域取得失敗。`);
            }

            return area;
        }

        throw Error(`Hichannel API 未加載。`);
    }

    /**
     * Hichannel 頻道類型
     *
     * @returns {string|Error}
     */
    type() {
        if (this._loadApi) {
            const type = this._hichannel.type();

            if (!type) {
                throw Error(`Hichannel 頻道名稱「${this._hichannelChannelName}」廣播電台頻道類型取得失敗。`);
            }

            return type;
        }

        throw Error(`Hichannel API 未加載。`);
    }

    /**
     * Hichannel 頻道圖片網址
     *
     * @returns {string|Error}
     */
    imageUrl() {
        if (this._loadApi) {
            const imageUrl = this._hichannel.imageUrl();

            if (!imageUrl) {
                throw Error(`Hichannel 頻道名稱「${this._hichannelChannelName}」廣播電台頻道圖片網址取得失敗。`);
            }

            return imageUrl;
        }

        throw Error(`Hichannel API 未加載。`);
    }

    /**
     * Hichannel 頻道節目表
     *
     * @returns {object|Error}
     */
    programList() {
        if (this._loadApi) {
            const programList = this._hichannel.programList();

            if (!programList) {
                throw Error(`Hichannel 頻道名稱「${this._hichannelChannelName}」廣播電台頻道節目表取得失敗。`);
            }

            return programList;
        }

        throw Error(`Hichannel API 未加載。`);
    }

    /**
     * Hichannel 頻道目前節目名稱
     *
     * @returns {string|Error}
     */
    nowProgramName() {
        if (this._loadApi) {
            const nowProgramName = this._hichannel.nowProgramName();

            if (!nowProgramName) {
                throw Error(`Hichannel 頻道名稱「${this._hichannelChannelName}」廣播電台頻道目前節目名稱取得失敗。`);
            }

            return nowProgramName;
        }

        throw Error(`Hichannel API 未加載。`);
    }
}

module.exports = HiNetHichannel;
