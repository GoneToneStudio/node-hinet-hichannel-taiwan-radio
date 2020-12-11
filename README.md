# HiNet hichannel 台灣電台 (Node.js 套件)
取得 HiNet hichannel 台灣電台的 m3u8 串流網址、節目表和其他資訊！

PHP 版本：[https://github.com/GoneToneStudio/php-hinet-hichannel-taiwan-radio](https://github.com/GoneToneStudio/php-hinet-hichannel-taiwan-radio)

## 注意
- HiNet hichannel m3u8 串流網址會阻擋國外 IP 訪問 (HTTP 403 Forbidden)。

## 問題
如果發現任何 BUG，請在此回報：[https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio/issues](https://github.com/GoneToneStudio/node-hinet-hichannel-taiwan-radio/issues)

## 安裝
### NPM
    npm install hinet-hichannel-taiwan-radio

## 取得 Hichannel 頻道名稱方法
1. 前往 [HiNet hichannel 網站](https://hichannel.hinet.net/)
2. 點選您想要聽的電台並確認可以播放
3. 複製完整頻道名稱，使用時名稱要完全一樣 (如果不能直接複製可以利用 F12，或者就乖乖用打的XDD)

## 使用方法
### 使用 HiNetHichannel 物件
```javascript
const hichannel = new HiNetHichannel("Hichannel 完整頻道名稱 (string)");
```

### 取得 m3u8 串流網址
```javascript
hichannel.loadApi().then(() => { //加載 HiNet hichannel API
    hichannel.playUrl().then(playUrl => {
        console.log(playUrl); //HiNet hichannel m3u8 串流網址 (string)
    }).catch(e => {
        console.error(e);
    });
}).catch(e => {
    console.error(e);
});
```

### 取得頻道名稱
```javascript
hichannel.loadApi().then(() => { //加載 HiNet hichannel API
    try {
        console.log(hichannel.title()); //HiNet hichannel 頻道名稱 (string)
    } catch (e) {
        console.error(e);
    }
}).catch(e => {
    console.error(e);
});
```

### 取得頻道 ID
```javascript
hichannel.loadApi().then(() => { //加載 HiNet hichannel API
    try {
        console.log(hichannel.id()); //HiNet hichannel 頻道 ID (string)
    } catch (e) {
        console.error(e);
    }
}).catch(e => {
    console.error(e);
});
```

### 取得頻道描述
```javascript
hichannel.loadApi().then(() => { //加載 HiNet hichannel API
    try {
        console.log(hichannel.desc()); //HiNet hichannel 頻道描述 (string)
    } catch (e) {
        console.error(e);
    }
}).catch(e => {
    console.error(e);
});
```

### 取得頻道區域
```javascript
hichannel.loadApi().then(() => { //加載 HiNet hichannel API
    try {
        console.log(hichannel.area()); //HiNet hichannel 頻道區域 (string)
    } catch (e) {
        console.error(e);
    }
}).catch(e => {
    console.error(e);
});
```

### 取得頻道類型
```javascript
hichannel.loadApi().then(() => { //加載 HiNet hichannel API
    try {
        console.log(hichannel.type()); //HiNet hichannel 頻道類型 (string)
    } catch (e) {
        console.error(e);
    }
}).catch(e => {
    console.error(e);
});
```

### 取得頻道圖片網址
```javascript
hichannel.loadApi().then(() => { //加載 HiNet hichannel API
    try {
        console.log(hichannel.imageUrl()); //HiNet hichannel 頻道圖片網址 (string)
    } catch (e) {
        console.error(e);
    }
}).catch(e => {
    console.error(e);
});
```

### 取得頻道節目表
```javascript
hichannel.loadApi().then(() => { //加載 HiNet hichannel API
    try {
        console.log(hichannel.programList()); //HiNet hichannel 頻道節目表 (object)
    } catch (e) {
        console.error(e);
    }
}).catch(e => {
    console.error(e);
});
```

### 取得頻道目前節目名稱
```javascript
hichannel.loadApi().then(() => { //加載 HiNet hichannel API
    try {
        console.log(hichannel.nowProgramName()); //HiNet hichannel 頻道目前節目名稱 (string)
    } catch (e) {
        console.error(e);
    }
}).catch(e => {
    console.error(e);
});
```

## 範例
### 完整範例
```javascript
const HiNetHichannel = require("hinet-hichannel-taiwan-radio");

const hichannel = new HiNetHichannel("KISS RADIO 大眾廣播電台"); //請輸入完整頻道名稱

/* 加載 HiNet hichannel API */
hichannel.loadApi().then(() => {
    /* 取得 HiNet hichannel m3u8 串流網址 */
    hichannel.playUrl().then(playUrl => {
        console.log(`m3u8 串流網址：${playUrl}`);
    }).catch(e => {
        console.error(e);
    });

    try {
        /* 取得 HiNet hichannel 頻道名稱 */
        console.log(`頻道名稱：${hichannel.title()}`);

        /* 取得 HiNet hichannel 頻道 ID */
        console.log(`頻道 ID：${hichannel.id()}`);

        /* 取得 HiNet hichannel 頻道描述 */
        console.log(`頻道描述：${hichannel.desc()}`);

        /* 取得 HiNet hichannel 頻道區域 */
        console.log(`頻道區域：${hichannel.area()}`);

        /* 取得 HiNet hichannel 頻道類型 */
        console.log(`頻道類型：${hichannel.type()}`);

        /* 取得 HiNet hichannel 頻道圖片網址 */
        console.log(`頻道圖片網址：${hichannel.imageUrl()}`);

        /* 取得 HiNet hichannel 頻道目前節目名稱 */
        console.log(`頻道目前節目名稱：${hichannel.nowProgramName()}`);

        /* 取得 HiNet hichannel 頻道節目表 */
        console.log("頻道節目表：");
        console.log(hichannel.programList());
    } catch (e) {
        console.error(e);
    }
}).catch(e => {
    console.error(e);
});
```

## 補充
如果需要取得新資料，必須再次調用 `hichannel.loadApi()` 才會取得最新資料。
```javascript
hichannel.loadApi().then(() => {
    /* 取得最新 HiNet hichannel m3u8 串流網址 */
    hichannel.playUrl().then(playUrl => {
        console.log(`m3u8 串流網址：${playUrl}`);
    }).catch(e => {
        console.error(e);
    });

    try {
        /* 取得最新 HiNet hichannel 頻道目前節目名稱 */
        console.log(`頻道目前節目名稱：${hichannel.nowProgramName()}`);
    } catch (e) {
        console.error(e);
    }
}).catch(e => {
    console.error(e);
});
```

## License
[MIT](LICENSE)
