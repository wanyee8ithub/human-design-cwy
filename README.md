# 人類圖學習筆記 — Human Design Study Notes

可離線使用、可安裝到手機桌面的 PWA（漸進式網頁應用）。資料儲存在你的瀏覽器本機（localStorage），不需要伺服器、不需要登入。

## 這是什麼

- 64 個閘門 + 36 條通道的學習筆記工具
- 每個項目可記錄無限條筆記（每讀一本新書就加一條）
- 溫習模式：依時間順序瀏覽所有已記錄的筆記
- 離線可用，安裝後像原生 App 一樣在手機桌面開啟
- AI 助手（選用）：需要你自己的 Anthropic API Key，存在本機瀏覽器

## 一、部署到 GitHub Pages（電腦上做一次即可）

### 1. 建立 GitHub Repository
1. 到 [github.com](https://github.com) 新增一個 repository，例如命名為 `human-design-notes`
2. 設成 Public（GitHub Pages 免費版需要 public repo）

### 2. 上傳這個專案資料夾
在你電腦的終端機（Terminal / 命令提示字元）執行：

```bash
cd human-design-notes      # 進入這個解壓縮後的資料夾
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的帳號/human-design-notes.git
git push -u origin main
```

### 3. 確認 `vite.config.js` 裡的路徑跟你的 repo 名字一致
打開 `vite.config.js`，找到這一行：
```js
base: "/human-design-notes/",
```
把 `human-design-notes` 改成**你實際的 repo 名稱**（如果你 repo 取名不同，這裡一定要對應修改，否則部署後會打不開）。

### 4. 開啟 GitHub Pages
1. 到你的 repo 頁面 → Settings → Pages
2. Source 選擇 **GitHub Actions**（不是 "Deploy from a branch"）
3. 存檔後，回到 repo 的 **Actions** 分頁，會看到一個叫 "Deploy to GitHub Pages" 的流程正在跑（第一次 push 就會自動觸發）
4. 等待約 1-2 分鐘，跑完後到 Settings → Pages 頂部會顯示網址，類似：
   ```
   https://你的帳號.github.io/human-design-notes/
   ```

之後每次你修改程式碼並 `git push`，網站會自動重新部署。

## 二、安裝到手機桌面

### iPhone (Safari)
1. 用 Safari 打開你的網址
2. 點下方分享按鈕（方框+箭頭）
3. 選「加入主畫面」
4. 完成後桌面會出現一個圖示，點開就像原生 App，全螢幕無瀏覽器網址列

### Android (Chrome)
1. 用 Chrome 打開你的網址
2. 右上角選單 → 「安裝應用程式」或「新增至主畫面」
3. 完成後桌面會出現圖示

安裝後即使沒有網路，App 也能正常開啟、記錄筆記（因為已經被瀏覽器快取，且資料存在本機）。

## 三、AI 助手設定（選用）

AI 聊天功能需要你自己的 Anthropic API Key（因為這是純前端網站，沒有後端伺服器幫你保管金鑰）。

1. 到 [console.anthropic.com](https://console.anthropic.com) 註冊帳號、儲值
2. 建立一組 API Key（格式 `sk-ant-…`）
3. 在 App 右下角點 ✨ 開啟聊天視窗 → 點「金鑰」→ 貼上 Key → 儲存
4. Key 只存在你手機/電腦本機的瀏覽器裡，不會上傳到任何第三方

**注意：** API Key 會產生費用（依 Anthropic 用量計價）。如果不需要 AI 功能，可以完全不設定，其餘記錄/溫習功能照常使用。

## 四、本機開發測試（進階，選用）

如果你想在自己電腦上先預覽再上傳：

```bash
npm install
npm run dev
```

瀏覽器開啟 `http://localhost:5173` 即可預覽。

```bash
npm run build      # 打包成正式版本到 dist/ 資料夾
npm run preview    # 預覽打包後的版本
```

## 檔案結構

```
human-design-notes/
├── index.html              # HTML 入口
├── vite.config.js          # 建構設定（含 PWA 設定，注意修改 base 路徑）
├── package.json
├── .github/workflows/deploy.yml   # 自動部署腳本
├── public/
│   ├── icon-192.png        # App 圖示（小）
│   ├── icon-512.png        # App 圖示（大）
│   └── favicon.svg
└── src/
    ├── main.jsx             # React 進入點
    └── App.jsx               # 主程式（所有功能都在這裡）
```

## 資料備份提醒

筆記資料存在瀏覽器的 localStorage，這代表：
- 清除瀏覽器資料 / 重灌手機 / 換瀏覽器，筆記會消失
- 不同裝置（手機、電腦）之間的筆記**不會自動同步**
- 建議定期手動備份重要內容（之後可以請我加上「匯出 / 匯入 JSON」功能）

如果之後想要跨裝置同步，可以考慮接上一個免費的雲端資料庫服務（如 Supabase），到時候再請我加。
