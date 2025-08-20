# 電商平台（Ecommerce System）

# 系統介紹
本專案為模擬 線上購物商城 的練習專案，採用 前後端分離架構：
- 前端：以 React.js + Tailwind CSS 開發，提供使用者操作介面。
- 後端：以 Spring Boot + MySQL 建立 RESTful API，並支援 JWT 驗證與授權。
- 支付串接：支援 Line Pay 與 Stripe，模擬完整線上購物付款流程。
- 本檔案為 **前端原始碼**，後端原始碼請見：(link)

# 功能介紹
- 使用者驗證：註冊、登入、登出，並支援表單驗證密碼、Email格式、重複帳號。
- 商品瀏覽：瀏覽商品圖片、介紹，也可按商品類型篩選、分類和排序商品。
- 購物車：加入商品、調整數量、刪除商品。
- 結帳流程：完成商品選購、填寫地址，可選擇LinePay或Stripe付款。
- 訂單查詢：查詢歷史訂單狀態。

# 系統展示

**系統網址**  
[www.ff.com](http://www.ff.com)

**測試帳號 / 密碼**
<br>
- 可使用以下資料登入網頁，請輸入 **帳號或電郵** 和密碼。  
- 也歡迎註冊新帳密進行登入。

|帳號     |電郵                   |密碼      |
|--------|--------------------- |----------|
| User1  | user1@example.com    |admin123  |
| User2  |user2@example.com    |user123   |

### 會員註冊與登入
具備表單驗證功能
<br/>

### 商品瀏覽、篩選
可於首頁瀏覽及選購商品，也可進入商品頁面瀏覽或按商品類型篩選商品
<br/>

### 商品加入購物車、購物車內容修改
<br/>

### 填寫地址、儲存地址、訂單結帳
<br/>

### 訂單查詢
<br/><br/>

# 建構技術
- Vite
- React.js
- Tailwind.css

# 本機安裝
1. 取得原始碼  
   ```bash
   git clone https://github.com/yourname/todo-frontend.git
   cd todo-frontend
   ```
2. 安裝套件
   ```bash
   npm install
   ```
3. 設定環境變數
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   ```
4. 啟動伺服器
   ```bash
   npm run dev
   ```






