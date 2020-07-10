# HiNet hichannel 台灣電台 (Node.js 套件)
取得 HiNet hichannel 台灣電台的 Token 或串流 m3u8 網址！

## 安裝
### Node.js
    npm install hinet-hichannel-taiwan-radio

### 瀏覽器
```html
<script src="dist/HiNetHichannel.bundle.js"></script>
```

### Webpack
    npm run webpack

## 使用方法
### 使用 HiNetHichannel 類別
```js
const hichannel = new HiNetHichannel("Hichannel 頻道代碼 (string)", "IP 位置 (string)");
```

### 取得 m3u8 串流網址
```js
hichannel.buildPlayUrl().then(m3u8Url => {
    console.log(m3u8Url); //取得 HiNet hichannel m3u8 串流網址
}).catch(e => {
    console.error(e);
});
```

### 只取得 Hichannel Token
```js
console.log(hichannel.getToken("時間戳 (int)", "填入 1 或 2 (int)"));
```

### 完整範例 (Node.js)
```js
const network = require("network");
const HiNetHichannel = require("hinet-hichannel-taiwan-radio");

network.get_public_ip(function(err, ip) {
    if (!err) {
        const hichannel = new HiNetHichannel("hich-ra000040", ip); //hich-ra000040 => KISS RADIO 大眾廣播電台

        /* 取得 HiNet hichannel m3u8 串流網址 */
        hichannel.buildPlayUrl().then(m3u8Url => {
            console.log(`m3u8 串流網址：${m3u8Url}`);
        }).catch(e => {
            console.error(e);
        });

        /* 取得 HiNet hichannel Token */
        const expire1 = (Math.floor(Date.now() / 1000) + (60 * 5));
        const expire2 = (expire1 + (60 * 60 * 24));

        console.log(`Token1：${hichannel.getToken(expire1, 1)}`);
        console.log(`Token2：${hichannel.getToken(expire2, 2)}`);
    } else {
        console.log(`無法取得 IP：${err}`);
    }
});
```

## 取得 Hichannel 頻道代碼方法
1. 前往 [HiNet hichannel 網站](https://hichannel.hinet.net/)
2. 點選您要聽的電台並開始播放
3. 開啟開發人員工具 (按 F12)
4. 上方點選 Network，看最下面那行，格式為 `rich-ra000000` (例如 `hich-ra000040`)，後續的 -audio 不需要

![](/images/get_hichannel_code.gif)

## License
[MIT](LICENSE)
