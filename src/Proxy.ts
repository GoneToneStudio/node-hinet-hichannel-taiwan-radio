/*
 * Copyright (c) 2014-2022 旋風之音 GoneTone
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

import type { ProxyOptions } from './interfaces/ProxyInterface'

export class Proxy {
  private readonly _host: string
  private readonly _port: number
  private readonly _protocol: string
  private _username: string | undefined
  private _password: string | undefined

  /**
   * Proxy constructor.
   *
   * @param {ProxyOptions} options 主機名、端口 (預設 3128)、協定 (預設 http)
   */
  public constructor (options: ProxyOptions) {
    this._host = options.host
    this._port = options.port ?? 3128
    this._protocol = options.protocol ?? 'http'
  }

  /**
   * 登入 Proxy
   *
   * @param {string} username 帳號
   * @param {string} password 密碼
   */
  public login (username: string, password: string): void {
    this._username = username
    this._password = password
  }

  /**
   * 取得 Proxy URL
   *
   * @returns {string}
   */
  public get (): string {
    const url = `${this._host}:${this._port}`

    let proxy = `${this._protocol}://${url}`
    if (this._username && this._password) {
      proxy = `${this._protocol}://${this._username}:${this._password}@${url}`
    }

    return proxy
  }
}
