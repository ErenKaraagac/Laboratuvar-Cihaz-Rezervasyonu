const express = require('express');
const path = require('path');
require('dotenv').config();
const db = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Veritabanı bağlantı testi rotası
app.get('/api/db-test', async (req, res) => {
  try {
    const [rows] = await db.query('SHOW TABLES');
    res.json({
      basarili: true,
      mesaj: 'MySQL baglantisi basarili!',
      tablolar: rows
    });
  } catch (error) {
    console.error('Veritabani baglanti hatasi:', error.message);
    res.status(500).json({
      basarili: false,
      mesaj: 'Veritabanina baglanilamadi.',
      hata: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde calisiyor.`);
});