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

import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { HttpsProxyAgent } from 'https-proxy-agent'
import type { Proxy } from './Proxy'
import type * as ChannelListAPIInterface from './interfaces/ChannelListAPIInterface'
import type * as GetRankingAPIInterface from './interfaces/GetRankingAPIInterface'
import type * as CpAPIInterface from './interfaces/CpAPIInterface'
import type * as GetProgramListAPIInterface from './interfaces/GetProgramListAPIInterface'
import type * as GetNowProgramAPIInterface from './interfaces/GetNowProgramAPIInterface'
import type { ChannelProgramInfo } from './interfaces/HiNetHichannelInterface'

export class HiNetHichannel {
  private readonly _hichannelUrl: string
  private readonly _hichannelRadioPath: string
  private readonly _hichannelImagePath: string
  private readonly _hichannelApiChannelList: string
  private readonly _hichannelApiRanking: string
  private readonly _hichannelApiPlayerUrl: string
  private readonly _hichannelApiProgramList: string
  private readonly _hichannelApiNowProgram: string
  private readonly _axiosInstance: AxiosInstance
  private _hichannelChannelName: string

  /**
   * HiNetHichannel constructor.
   *
   * @param {Proxy} proxy 代理伺服器 (預設不使用代理)
   */
  public constructor (proxy?: Proxy) {
    this._hichannelUrl = 'https://hichannel.hinet.net'

    this._hichannelRadioPath = '/radio/'
    this._hichannelImagePath = '/upload/radio/channel/'

    this._hichannelApiChannelList = 'channelList.do'
    this._hichannelApiRanking = 'getRanking.do'
    this._hichannelApiPlayerUrl = 'cp.do'
    this._hichannelApiProgramList = 'getProgramList.do'
    this._hichannelApiNowProgram = 'getNowProgram.do'

    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
    this._axiosInstance = axios.create({
      baseURL: this._hichannelUrl,
      headers: {
        'User-Agent': userAgent,
        Referer: `${this._hichannelUrl}${this._hichannelRadioPath}index.do`
      }
    })

    if (proxy) this._axiosInstance.defaults.httpsAgent = new HttpsProxyAgent(proxy.get())

    this._hichannelChannelName = ''
  }

  /**
   * 取得電台頻道列表
   *
   * @param {string} keyword 搜尋關鍵字
   *
   * @returns {Promise<ChannelListAPIInterface.List[]>}
   */
  public async getChannels (keyword?: string): Promise<ChannelListAPIInterface.List[]> {
    try {
      let response: AxiosResponse
      if (keyword) {
        response = await this._axiosInstance.get(`${this._hichannelRadioPath}${this._hichannelApiChannelList}`, {
          params: {
            keyword
          }
        })
      } else {
        response = await this._axiosInstance.get(`${this._hichannelRadioPath}${this._hichannelApiChannelList}`)
      }

      const datas: ChannelListAPIInterface.List[] = response.data.list

      return datas.map((data) => {
        data.channel_image = `${this._hichannelUrl}${this._hichannelImagePath}${data.channel_image}`
        return data
      })
    } catch (e: any) {
      throw Error(`取得 Hichannel 電台頻道列表時發生錯誤：${e.message}`)
    }
  }

  /**
   * 取得熱門排行電台頻道
   *
   * @returns {Promise<GetRankingAPIInterface.List[]>}
   */
  public async getRankingChannels (): Promise<GetRankingAPIInterface.List[]> {
    try {
      const response = await this._axiosInstance.get(`${this._hichannelRadioPath}${this._hichannelApiRanking}`)

      const datas: GetRankingAPIInterface.List[] = response.data.list

      return datas.map((data) => {
        data.channel_image = `${this._hichannelUrl}${this._hichannelImagePath}${data.channel_image}`
        return data
      })
    } catch (e: any) {
      throw Error(`取得 Hichannel 熱門排行電台頻道時發生錯誤：${e.message}`)
    }
  }

  /**
   * 取得指定電台頻道資料
   *
   * @param {string} hichannelChannelName Hichannel 電台頻道名稱
   *
   * @returns {Promise<GetRankingAPIInterface.List>}
   */
  public async getChannel (hichannelChannelName: string): Promise<GetRankingAPIInterface.List> {
    try {
      const channels = await this.getChannels(hichannelChannelName)
      const channel = channels.find(channel => channel.channel_title === hichannelChannelName) as GetRankingAPIInterface.List

      if (channel) return channel
    } catch (e: any) {
      throw Error(`取得 Hichannel 電台頻道「${hichannelChannelName}」時發生錯誤：${e.message}`)
    }

    throw Error(`Hichannel 電台頻道名稱「${hichannelChannelName}」未找到。`)
  }

  /**
   * 設定電台頻道
   *
   * @param {string} hichannelChannelName Hichannel 電台頻道名稱
   */
  public setChannel (hichannelChannelName: string) {
    this._hichannelChannelName = hichannelChannelName
  }

  /**
   * 取得電台頻道 m3u8 串流網址
   *
   * @returns {Promise<string>}
   */
  public async getChannelM3u8Url (): Promise<string> {
    if (this._hichannelChannelName) {
      const channel = await this.getChannel(this._hichannelChannelName)

      try {
        const response = await this._axiosInstance.get(`${this._hichannelRadioPath}${this._hichannelApiPlayerUrl}`, {
          params: {
            id: channel.channel_id
          }
        })

        const data: CpAPIInterface.Data = response.data

        return data._adc
      } catch (e: any) {
        throw Error(`取得 Hichannel 電台頻道「${channel.channel_title}」m3u8 網址時發生錯誤：${e.message}`)
      }
    }

    throw Error('未設定 Hichannel 電台頻道，請使用 "hichannel.setChannel(\'電台頻道名稱\')" 來設定頻道。')
  }

  /**
   * 取得電台頻道節目資訊
   *
   * @returns {Promise<ChannelProgramInfo>}
   */
  public async getChannelProgramInfo (): Promise<ChannelProgramInfo> {
    if (this._hichannelChannelName) {
      const channel = await this.getChannel(this._hichannelChannelName)

      try {
        const programListAxios = await this._axiosInstance.get(`${this._hichannelRadioPath}${this._hichannelApiProgramList}`, {
          params: {
            channelId: channel.channel_id
          }
        })
        const programList: GetProgramListAPIInterface.Data = programListAxios.data
        programList.channel_image = `${this._hichannelUrl}${this._hichannelImagePath}${programList.channel_image}`

        const nowProgramAxios = await this._axiosInstance.get(`${this._hichannelRadioPath}${this._hichannelApiNowProgram}`, {
          params: {
            id: channel.channel_id,
            program: 1
          }
        })
        const nowProgram: GetNowProgramAPIInterface.Data = nowProgramAxios.data

        return { ...programList, ...nowProgram }
      } catch (e: any) {
        throw Error(`取得 Hichannel 電台頻道「${channel.channel_title}」節目資訊時發生錯誤：${e.message}`)
      }
    }

    throw Error('未設定 Hichannel 電台頻道，請使用 "hichannel.setChannel(\'電台頻道名稱\')" 來設定頻道。')
  }
}
