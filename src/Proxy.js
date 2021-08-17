/*
 * Copyright (c) 2014-2021 旋風之音 GoneTone
 *
 * Website: https://blog.reh.tw/
 * GitHub: https://github.com/GoneTone
 * Facebook: https://www.facebook.com/GoneToneDY
 * Twitter: https://twitter.com/TPGoneTone
 *
 *                               _oo0oo_
 *                              o8888888o
 *                              88" . "88
 *                              (| -_- |)
 *                              0\  =  /0
 *                            ___/`---'\___
 *                          .' \\|     |# '.
 *                         / \\|||  :  |||# \
 *                        / _||||| -:- |||||- \
 *                       |   | \\\  -  #/ |   |
 *                       | \_|  ''\---/''  |_/ |
 *                       \  .-\__  '-'  ___/-. /
 *                     ___'. .'  /--.--\  `. .'___
 *                  ."" '<  `.___\_<|>_/___.' >' "".
 *                 | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *                 \  \ `_.   \_ __\ /__ _/   .-` /  /
 *             =====`-.____`.___ \_____/___.-`___.-'=====
 *                               `=---='
 *           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *               佛祖保佑                       永無 BUG
 *
 * Project GitHub: https://github.com/GoneToneStudio/node-google-play-api
 */

'use strict'

class Proxy {
  /**
   * Proxy constructor.
   *
   * @param {String} host 主機名
   * @param {Number} port 端口 (預設 3128)
   * @param {String} protocol 協定 (預設 http)
   */
  constructor (host, port = 3128, protocol = 'http') {
    this._host = host
    this._port = port
    this._protocol = protocol
  }

  /**
   * 登入
   *
   * @param {String} username 帳號
   * @param {String} password 密碼
   */
  login (username, password) {
    this._username = username
    this._password = password
  }

  /**
   * 取得 URL
   *
   * @returns {String}
   */
  get () {
    const url = `${this._host}:${this._port}`

    let proxy = `${this._protocol}://${url}`
    if (this._username && this._password) {
      proxy = `${this._protocol}://${this._username}:${this._password}@${url}`
    }

    return proxy
  }
}

module.exports = Proxy
