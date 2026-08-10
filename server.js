// 정적 사이트 서버 (Render 웹 서비스용)
const express = require('express');
const path = require('path');
const app = express();

// Render가 제공하는 PORT 사용 (없으면 10000)
const PORT = process.env.PORT || 10000;

// 현재 디렉터리의 정적 파일(index.html, style.css, image/) 서빙
app.use(express.static(__dirname));

// SPA 라우팅 대응: 알 수 없는 경로는 index.html 반환
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 정상 작동 중입니다.`);
});
