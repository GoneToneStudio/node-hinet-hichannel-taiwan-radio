/**
 * Copyright 2020 GoneTone
 *
 * HiNet hichannel 台灣電台
 * https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio
 *
 * @author   張文相 Zhang Wenxiang (旋風之音 GoneTone) <https://blog.reh.tw>
 * @license  MIT <https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio/blob/master/LICENSE>
 *
 * Proxy
 */

'use strict';

class Proxy {
    /**
     * Proxy constructor.
     *
     * @param {String} host 主機名
     * @param {Number} port 端口 (預設 3128)
     * @param {String} protocol 協定 (預設 http)
     */
    constructor(host, port = 3128, protocol = "http") {
        this._host = host;
        this._port = port;
        this._protocol = protocol;
    }

    /**
     * 登入
     *
     * @param {String} username 帳號
     * @param {String} password 密碼
     */
    login(username, password) {
        this._username = username;
        this._password = password;
    }

    /**
     * @returns {String}
     */
    get() {
        const url = `${this._host}:${this._port}`;

        let proxy = `${this._protocol}://${url}`;
        if (this._username && this._password) {
            proxy = `${this._protocol}://${this._username}:${this._password}@${url}`;
        }

        return proxy;
    }
}

module.exports = Proxy;
