const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// Render에서 제공하는 포트 또는 10000번 포트 사용
const PORT = process.env.PORT || 10000;

// ⚠️ 완성된 연결 주소 적용 완료
const MONGODB_URI = "mongodb+srv://venture:vent0412@main.quwxs4i.mongodb.net/venture?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB 연결 성공! (영구 저장 준비 완료)'))
    .catch(err => console.error('❌ DB 연결 에러:', err));

// 데이터 모델 정의
const Contact = mongoose.model('Contact', {
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 문의하기 데이터 저장 API
app.post('/api/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save(); // DB에 영구 저장
        res.json({ status: 'success', message: '데이터가 안전하게 DB에 저장되었습니다!' });
    } catch (err) {
        console.error('저장 에러:', err);
        res.status(500).json({ status: 'error', message: 'DB 저장 실패' });
    }
});

// 메인 페이지 연결
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 서버가 포트 ${PORT}에서 정상 작동 중입니다.`);
});