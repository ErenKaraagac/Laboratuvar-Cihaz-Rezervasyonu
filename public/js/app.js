document.addEventListener('DOMContentLoaded', () => {
  cihazlariYukle();
});

// HTML özel karakterlerini temizleyerek güvenli metin basar
function metinTemizle(metin) {
  if (!metin) return '';
  const div = document.createElement('div');
  div.textContent = metin;
  return div.innerHTML;
}

// Veritabanındaki durum değerini Türkçe etikete ve CSS sınıfına çevirir
function durumBilgisiGetir(durum) {
  switch (durum) {
    case 'musait':
      return { etiket: 'Müsait', sinif: 'badge-musait', rezerveEdilebilir: true };
    case 'bakimda':
      return { etiket: 'Bakımda', sinif: 'badge-bakimda', rezerveEdilebilir: false };
    case 'arizali':
      return { etiket: 'Arızalı', sinif: 'badge-arizali', rezerveEdilebilir: false };
    default:
      return { etiket: durum || 'Bilinmiyor', sinif: 'badge-bakimda', rezerveEdilebilir: false };
  }
}

async function cihazlariYukle() {
  const listeAlani = document.getElementById('cihaz-listesi');
  listeAlani.innerHTML = '<p class="placeholder-text">Cihazlar yükleniyor...</p>';

  try {
    const yanit = await fetch('/api/cihazlar');
    const sonuc = await yanit.json();

    if (!yanit.ok || !sonuc.basarili) {
      throw new Error(sonuc.mesaj || 'Cihaz verileri alınamadı.');
    }

    if (sonuc.veriler.length === 0) {
      listeAlani.innerHTML = '<p class="placeholder-text">Sistemde kayıtlı cihaz bulunamadı.</p>';
      return;
    }

    listeAlani.innerHTML = sonuc.veriler
      .map((cihaz) => {
        const durum = durumBilgisiGetir(cihaz.durum);

        return `
          <article class="cihaz-card">
            <div class="card-header">
              <h4>${metinTemizle(cihaz.ad)}</h4>
              <span class="badge ${durum.sinif}">${durum.etiket}</span>
            </div>

            <p class="card-model"><strong>Model:</strong> ${metinTemizle(cihaz.model)} • <strong>Seri No:</strong> ${metinTemizle(cihaz.seri_no)}</p>
            <p class="card-desc">${metinTemizle(cihaz.aciklama)}</p>

            <div class="card-lab">
              <span><strong>Laboratuvar:</strong> ${metinTemizle(cihaz.laboratuvar_adi)}</span>
              <small>${metinTemizle(cihaz.laboratuvar_konumu)}</small>
            </div>

            <button 
              class="btn-rezerve" 
              data-cihaz-id="${cihaz.id}"
              ${durum.rezerveEdilebilir ? '' : 'disabled'}
            >
              ${durum.rezerveEdilebilir ? 'Rezervasyon Yap' : 'Şu An Kullanılamaz'}
            </button>
          </article>
        `;
      })
      .join('');
  } catch (error) {
    console.error('Cihaz yükleme hatası:', error);
    listeAlani.innerHTML = `<p class="placeholder-text error-text">Hata: ${metinTemizle(error.message)}</p>`;
  }
}