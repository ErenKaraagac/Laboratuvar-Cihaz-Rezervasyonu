const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Tüm laboratuvarları ve içlerindeki cihaz sayılarını listele (GET /api/laboratuvarlar)
router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT 
        l.id,
        l.ad,
        l.konum,
        l.kapasite,
        l.aciklama,
        COUNT(c.id) AS cihaz_sayisi
      FROM laboratuvarlar l
      LEFT JOIN cihazlar c ON c.laboratuvar_id = l.id
      GROUP BY l.id, l.ad, l.konum, l.kapasite, l.aciklama
      ORDER BY l.id ASC
    `;

    const [laboratuvarlar] = await db.query(sql);

    res.json({
      basarili: true,
      toplam: laboratuvarlar.length,
      veriler: laboratuvarlar
    });
  } catch (error) {
    console.error('Laboratuvarlar listelenirken hata:', error.message);
    res.status(500).json({
      basarili: false,
      mesaj: 'Laboratuvarlar getirilirken sunucu hatası oluştu.',
      hata: error.message
    });
  }
});

module.exports = router;