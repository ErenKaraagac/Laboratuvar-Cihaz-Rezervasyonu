const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Tüm cihazları laboratuvar bilgileriyle birlikte listele (GET /api/cihazlar)
router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT 
        c.id,
        c.ad,
        c.model,
        c.seri_no,
        c.durum,
        c.aciklama,
        c.laboratuvar_id,
        l.ad AS laboratuvar_adi,
        l.konum AS laboratuvar_konumu
      FROM cihazlar c
      LEFT JOIN laboratuvarlar l ON c.laboratuvar_id = l.id
      ORDER BY c.id ASC
    `;

    const [cihazlar] = await db.query(sql);

    res.json({
      basarili: true,
      toplam: cihazlar.length,
      veriler: cihazlar
    });
  } catch (error) {
    console.error('Cihazlar listelenirken hata:', error.message);
    res.status(500).json({
      basarili: false,
      mesaj: 'Cihazlar getirilirken sunucu hatası oluştu.',
      hata: error.message
    });
  }
});

module.exports = router;