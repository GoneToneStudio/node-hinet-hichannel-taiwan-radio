# HiNet hichannel 台灣電台 (Node.js 套件)

取得 HiNet hichannel 台灣電台的 m3u8 串流網址、節目表和其他資訊！

PHP 版本：<https://github.com/GoneToneStudio/php-hinet-hichannel-taiwan-radio>

## 注意

- HiNet hichannel m3u8 串流網址會阻擋國外 IP 訪問 (HTTP 403 Forbidden)。
- 播放端 IP 和用來取得 m3u8 串流網址的伺服器 IP 要是相同的，不然無法播放 (HTTP 403 Forbidden)，可以嘗試在伺服端處理好在串流給播放端，就二次串流。

## 問題

如果發現任何 BUG，請在此回報：<https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio/issues>

## 安裝

需要 Node.js 14.0.0 或更高版本。

```sh-session
npm install hinet-hichannel-taiwan-radio
```

## 取得 Hichannel 頻道名稱方法

1. 前往 [HiNet hichannel 網站](https://hichannel.hinet.net/)
2. 點選您想要聽的電台並確認可以播放
3. 複製完整頻道名稱，使用時名稱要完全一樣 (如果不能直接複製可以利用 F12，或者就乖乖用打的XDD)

## 使用範例

```javascript
const { HiNetHichannel } = require('hinet-hichannel-taiwan-radio')

const hichannel = new HiNetHichannel()

/* 取得所有電台頻道列表 */
hichannel.getChannels().then((channels) => {
  console.log('所有電台頻道列表：')
  console.log(channels)
})

/* 利用關鍵字搜尋取得電台頻道列表 */
hichannel.getChannels('警廣').then((channels) => {
  console.log('關鍵字搜尋電台頻道列表：')
  console.log(channels)
})

/* 取得熱門排行電台頻道列表 */
hichannel.getRankingChannels().then((channels) => {
  console.log('熱門排行電台頻道列表：')
  console.log(channels)
})

/* 取得指定電台頻道資料 */
hichannel.getChannel('KISS RADIO 大眾廣播電台').then((channel) => { // 請輸入完整頻道名稱
  console.log('指定電台頻道資料：')
  console.log(channel)
})

/* 設定電台頻道 */
hichannel.setChannel('KISS RADIO 大眾廣播電台') // 請輸入完整頻道名稱

/* 取得電台頻道 m3u8 串流網址 */
hichannel.getChannelM3u8Url().then((m3u8Url) => {
  console.log(`電台頻道 m3u8 串流網址：${m3u8Url}`)
})

/* 取得電台頻道節目資訊 */
hichannel.getChannelProgramInfo().then((info) => {
  console.log('電台頻道節目資訊：')
  console.log(info)
})
```

## 代理 (Proxy)

如果運行此程式的伺服器不在台灣，請設定台灣的 Proxy 伺服器，否則取得的串流網址會驗證失敗 (HTTP 403 Forbidden)，但如果播放端 IP 和用來取得 m3u8 串流網址的伺服器 IP 不同一樣會被阻擋就是了，可以嘗試在伺服端處理好在串流給播放端，就二次串流。

```javascript
const { HiNetHichannel, Proxy } = require('hinet-hichannel-taiwan-radio')

/* 連線到 Proxy 伺服器 */
const proxy = new Proxy({
  host: '主機名',
  port: 3128,
  protocol: 'http'
})
// proxy.login('帳號', '密碼') // 如果 Proxy 伺服器需要驗證，請調用這登入

const hichannel = new HiNetHichannel(proxy)
```

## License

[MIT](LICENSE)
