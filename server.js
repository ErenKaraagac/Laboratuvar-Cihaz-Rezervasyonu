
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Ara yazılımlar (Middlewares)
app.use(cors()); // Farklı portlardan (Ön yüzden) gelen isteklere izin ver
app.use(express.json()); // Gelen JSON verilerini parse et

// Test Uç Noktası
app.get('/', (req, res) => {
    res.json({ mesaj: 'Lab Rezervasyon API Başarıyla Çalışıyor!' });
});

// Sunucuyu Dinlemeye Başla
app.listen(PORT, () => {
    console.log(`🚀 Sunucu http://localhost:${PORT} portunda ayağa kalktı.`);
});