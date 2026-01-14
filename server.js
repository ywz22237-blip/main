const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const app = express();

// Render는 process.env.PORT를 통해 포트를 지정합니다.
const PORT = process.env.PORT || 10000; 

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const DATA_FILE = path.join(__dirname, 'contacts.json');

// 기본 경로 접속 확인용
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 데이터 저장 API
app.post('/api/contact', (req, res) => {
    const newData = req.body;
    newData.date = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    let contacts = [];
    try {
        if (fs.existsSync(DATA_FILE)) {
            const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
            contacts = fileContent ? JSON.parse(fileContent) : [];
        }
    } catch (e) {
        contacts = [];
    }
    
    contacts.push(newData);
    fs.writeFileSync(DATA_FILE, JSON.stringify(contacts, null, 2));
    
    res.json({ status: 'success', message: '데이터가 서버에 저장되었습니다!' });
});

// 서버 실행 및 로그 출력
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});