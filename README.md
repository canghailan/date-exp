# 时间表达式

## 用法
```javascript
var lastMonday = new DateExp('yyyy-MM-dd HH:mm:ss.SSSZ - PeD + P1D').exec();
```

## 常用表达式
* 现在：```yyyy-MM-dd HH:mm:ss```
* 上个小时：```yyyy-MM-dd HH:mm:ss - PT1H```
* 今天开始：```yyyy-MM-dd 00:00:00```
* 今天结束：```yyyy-MM-dd 23:59:59```
* 明天开始：```yyyy-MM-dd 00:00:00 + P1D```
* 今天：```yyyy-MM-dd```
* 昨天：```yyyy-MM-dd - P1D```
* 上周：```yyyy-MM-dd - P1W``` 或 ```yyyy-MM-dd - P7D```
* 本周一：```yyyy-MM-dd - PeD + P1D```
* 下周一：```yyyy-MM-dd - PeD + P8D```
* 本月第一天：```yyyy-MM-01```
* 上个月第一天：```yyyy-MM-01 - P1M```
* 下个月第一天：```yyyy-MM-01 + P1M```
* 本月最后第一天：```yyyy-MM-01 + P1M - P1D```
* 今年第一天：```yyyy-01-01```
* 明年第一天：```yyyy-01-01 + P1Y```
* 今年最后一天：```yyyy-12-31``` 或 ```yyyy-01-01 + P1Y - P1D```


## 表达式

### 结构
时间表达式 加上 多个时间调整表达式
```javascript
date + duration1 - duration2
```

### 变量
* yyyy 年，4位
* MM 月，2位，01-12
* dd 日，2位，01-31
* HH 时，2位，00-23
* mm 分，2位，00-59
* ss 秒，2位，00-59
* SSS 毫秒，3位，000-999
* e 星期，1位，0-6
* Z 时区，5位，如+0800

### 时间
ISO 8601 Date Time
```
YYYY-MM-DDThh:mm:ss.sssZ
```
如：
```
2018-01-01T23:59:59+0800
```
日期、时间部分均可使用变量或常量

### 时长
ISO 8601 Duration
```
PnYnMnDTnHnMnS
PnW
```
如：
```
P1Y # 1年
P1M # 1个月
P1D # 1天
PT1H # 1个小时
PT1M # 1分钟
PT1S # 1秒
P1Y2M3DT4H5M6S # 1年2个月3天又4小时5分钟6秒
P1W # 1周
```
n可使用变量或常量


## 兼容性
兼容浏览器及NodeJS，低版本浏览器需要polyfill（```String.trim```, ```String.padStart```）


## 参考文档
[IETF RFC 3339](https://tools.ietf.org/html/rfc3339), based on ISO 8601:2000


## License
MIT