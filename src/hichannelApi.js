/**
 * Copyright 2020 GoneTone
 *
 * HiNet hichannel 台灣電台
 * https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio
 *
 * @author   張文相 Zhang Wenxiang (旋風之音 GoneTone) <https://blog.reh.tw>
 * @license  MIT <https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio/blob/master/LICENSE>
 *
 * Hichannel Api
 */

'use strict';

const promisifiedAxios = require("./promisifiedAxios");
const m3u8Parser = require("m3u8-parser");
const Proxy = require("./Proxy");

class HichannelApi {
    /**
     * HichannelApi constructor.
     *
     * @param {string} hichannelChannelName Hichannel 頻道名稱
     * @param {Proxy|null} proxy 代理伺服器 (預設不使用代理)
     */
    constructor(hichannelChannelName, proxy = null) {
        this._hichannelChannelName = hichannelChannelName;

        this._hichannelUrl = "https://hichannel.hinet.net";

        this._hichannelRadioPath = "/radio/";
        this._hichannelImagePath = "/upload/radio/channel/";

        this._hichannelApiChannelList = "channelList.do";
        this._hichannelApiPlayerUrl = "cp.do";
        this._hichannelApiProgramList = "getProgramList.do";
        this._hichannelApiProgramNow = "getNowProgram.do";

        this._proxy = proxy;
    }

    /**
     * 加載 API
     *
     * @returns {boolean} 回傳結果
     */
    async loadApi() {
        const hichannelApiUrl = `${this._hichannelUrl}${this._hichannelRadioPath}`;
        let hichannelChannelList = [];

        const hichannelChannelIDAxios = await promisifiedAxios(`${hichannelApiUrl}${this._hichannelApiChannelList}?keyword=${encodeURIComponent(this._hichannelChannelName)}`, this._proxy);
        if (hichannelChannelIDAxios["status"] && hichannelChannelIDAxios["status"] === 200) {
            hichannelChannelList = hichannelChannelIDAxios["data"]["list"];

            if (hichannelChannelList.length > 0) {
                const hichannelChannelTitle = hichannelChannelList[0]["channel_title"];
                if (hichannelChannelTitle === this._hichannelChannelName) {
                    this._hichannelChannelID = hichannelChannelList[0]["channel_id"];

                    this._hichannelApiPlayerUrlAxios = await promisifiedAxios(`${hichannelApiUrl}${this._hichannelApiPlayerUrl}?id=${this._hichannelChannelID}`, this._proxy);
                    this._hichannelApiProgramListAxios = await promisifiedAxios(`${hichannelApiUrl}${this._hichannelApiProgramList}?channelId=${this._hichannelChannelID}`, this._proxy);
                    this._hichannelApiProgramNowAxios = await promisifiedAxios(`${hichannelApiUrl}${this._hichannelApiProgramNow}?id=${this._hichannelChannelID}&program=1`, this._proxy);

                    return true;
                }
            }
        }

        return false;
    }

    /**
     * m3u8 串流網址
     *
     * @returns {string|boolean} 回傳 m3u8 串流網址 (失敗回傳 false)
     */
    async m3u8Url() {
        const axios = this._hichannelApiPlayerUrlAxios;

        if (axios["status"] && axios["status"] === 200) {
            const m3u8Url = axios["data"]["_adc"];
            if (m3u8Url) {
                const m3u8Axios = await promisifiedAxios(m3u8Url, this._proxy);

                if (m3u8Axios["status"] && m3u8Axios["status"] === 200) {
                    const parseUrl = new URL(m3u8Url);
                    const parserM3u8Url = new m3u8Parser.Parser();

                    parserM3u8Url.push(m3u8Axios["data"]);
                    parserM3u8Url.end();

                    return `${parseUrl.protocol}//${parseUrl.hostname}${parseUrl.pathname.replace("playlist.m3u8", parserM3u8Url.manifest.playlists[0].uri)}`;
                }
            }
        }

        return false;
    }

    /**
     * 頻道名稱
     *
     * @returns {string|boolean} 回傳頻道名稱 (失敗回傳 false)
     */
    title() {
        const axios = this._hichannelApiProgramListAxios;

        if (axios["status"] && axios["status"] === 200) {
            return axios["data"]["channel_title"];
        }

        return false;
    }

    /**
     * 頻道 ID
     *
     * @returns {string} 回傳頻道 ID
     */
    id() {
        return this._hichannelChannelID;
    }

    /**
     * 頻道描述
     *
     * @returns {string|boolean} 回傳頻道描述 (失敗回傳 false)
     */
    desc() {
        const axios = this._hichannelApiProgramListAxios;

        if (axios["status"] && axios["status"] === 200) {
            return axios["data"]["channel_desc"];
        }

        return false;
    }

    /**
     * 頻道區域
     *
     * @returns {string|boolean} 回傳頻道區域 (失敗回傳 false)
     */
    area() {
        const axios = this._hichannelApiProgramListAxios;

        if (axios["status"] && axios["status"] === 200) {
            return axios["data"]["channel_area"];
        }

        return false;
    }

    /**
     * 頻道類型
     *
     * @returns {string|boolean} 回傳頻道類型 (失敗回傳 false)
     */
    type() {
        const axios = this._hichannelApiProgramListAxios;

        if (axios["status"] && axios["status"] === 200) {
            return axios["data"]["channel_type"];
        }

        return false;
    }

    /**
     * 頻道圖片網址
     *
     * @returns {string|boolean} 回傳頻道圖片網址 (失敗回傳 false)
     */
    imageUrl() {
        const axios = this._hichannelApiProgramListAxios;

        if (axios["status"] && axios["status"] === 200) {
            return `${this._hichannelUrl}${this._hichannelImagePath}${axios["data"]["channel_image"]}`;
        }

        return false;
    }

    /**
     * 頻道節目表
     *
     * @returns {object|boolean} 回傳頻道節目表 (失敗回傳 false)
     */
    programList() {
        const axios = this._hichannelApiProgramListAxios;

        if (axios["status"] && axios["status"] === 200) {
            return axios["data"]["list"];
        }

        return false;
    }

    /**
     * 頻道目前節目名稱
     *
     * @returns {string|boolean} 回傳目前節目名稱 (失敗回傳 false)
     */
    nowProgramName() {
        const axios = this._hichannelApiProgramNowAxios;

        if (axios["status"] && axios["status"] === 200) {
            return axios["data"]["programName"];
        }

        return false;
    }
}

module.exports = HichannelApi;
