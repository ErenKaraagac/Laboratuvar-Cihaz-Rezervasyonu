const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Tüm cihazları (veya seçili laboratuvarın cihazlarını) listele (GET /api/cihazlar)
router.get('/', async (req, res) => {
  try {
    const { laboratuvar_id } = req.query;
    const params = [];

    let sql = `
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
    `;

    if (laboratuvar_id) {
      sql += ' WHERE c.laboratuvar_id = ?';
      params.push(laboratuvar_id);
    }

    sql += ' ORDER BY c.id ASC';

    const [cihazlar] = await db.query(sql, params);

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