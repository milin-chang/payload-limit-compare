# Javascirpt Payload Limit Compare - based on Bin Packing Problem
本專案為後端優化範例，在伺服器加上 Payload Size Limit 會對伺服器整體響應提高，以實驗數據佐證。使用的服務以 Bin Packing Problem 作為 Web 服務。在撰寫 Bin Packinng Problem 演算法論文實驗可以參考本專案來套用不同演算法在 Javascript 上的計算速度作為實驗之一。

## 實驗簡短介紹
實驗旨在比較兩個不同版本的 Node.js 服務（original 與 various）在處理 Bin Packing API 請求時的性能表現。透過對多種不同大小的 payload 進行重複測試，我們量測每個請求的平均、最小與最大響應時間，並記錄 HTTP 狀態碼。

## 時間比較圖
<image src=visualize.png>

## 目錄結構
- <code> __test__</code>：測試單元，測試超過 payload 限制是否會回傳正確的錯誤碼 (413)
- <code> __benchmark__</code>：生成測試資料，跑測試實驗
- <code> public</code>：撰寫的 HTML，可以視覺化 Bin Packing Problem 的小網頁
- <code> server</code>：兩個不同的小 Express 伺服器，Original 是沒有 payload limit，Various 是有 Limit

## 前置需求
- [Docker](https://docs.docker.com/get-docker/)
- [Node.js](https://nodejs.org/en)
- （可選）Python 3，如果要跑 `visualize.py` 

## 指令順序
1. 建立 Docker Image4
```bash
docker build -t node-profile-benchmark .
```
2. 執行測試
```bash
docker run --rm node-profile-benchmark npm test
```
3. 執行 benchmark
```bash
docker run --rm node-profile-benchmark npm run benchmark
```



