document.addEventListener('DOMContentLoaded', () => {
  laboratuvarlariYukle();
  cihazlariYukle();

  const filtreSelect = document.getElementById('laboratuvar-filtre');
  filtreSelect.addEventListener('change', (e) => {
    cihazlariYukle(e.target.value);
  });
});

function metinTemizle(metin) {
  if (!metin) return '';
  const div = document.createElement('div');
  div.textContent = metin;
  return div.innerHTML;
}

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

async function laboratuvarlariYukle() {
  const filtreSelect = document.getElementById('laboratuvar-filtre');
  const labListeAlani = document.getElementById('laboratuvar-listesi');

  try {
    const yanit = await fetch('/api/laboratuvarlar');
    const sonuc = await yanit.json();

    if (!yanit.ok || !sonuc.basarili) {
      throw new Error(sonuc.mesaj || 'Laboratuvar verileri alınamadı.');
    }

    // Açılır filtre menüsünü doldur
    sonuc.veriler.forEach((lab) => {
      const option = document.createElement('option');
      option.value = lab.id;
      option.textContent = `${lab.ad} (${lab.cihaz_sayisi} cihaz)`;
      filtreSelect.appendChild(option);
    });

    // Alt bölümdeki laboratuvar kartlarını bas
    labListeAlani.innerHTML = sonuc.veriler
      .map(
        (lab) => `
          <article class="cihaz-card">
            <div class="card-header">
              <h4>${metinTemizle(lab.ad)}</h4>
              <span class="badge badge-musait">${lab.cihaz_sayisi} Cihaz</span>
            </div>
            <p class="card-model"><strong>Konum:</strong> ${metinTemizle(lab.konum)} • <strong>Kapasite:</strong> ${lab.kapasite} kişi</p>
            <p class="card-desc">${metinTemizle(lab.aciklama)}</p>
            <button class="btn-rezerve btn-secondary" onclick="laboratuvaraGoreFiltrele(${lab.id})">
              Bu Laboratuvarın Cihazlarını Göster
            </button>
          </article>
        `
      )
      .join('');
  } catch (error) {
    console.error('Laboratuvar yükleme hatası:', error);
    labListeAlani.innerHTML = `<p class="placeholder-text error-text">Hata: ${metinTemizle(error.message)}</p>`;
  }
}

function laboratuvaraGoreFiltrele(labId) {
  const filtreSelect = document.getElementById('laboratuvar-filtre');
  filtreSelect.value = String(labId);
  cihazlariYukle(labId);
  document.getElementById('cihazlar').scrollIntoView({ behavior: 'smooth' });
}

async function cihazlariYukle(laboratuvarId = '') {
  const listeAlani = document.getElementById('cihaz-listesi');
  const sayacAlani = document.getElementById('cihaz-sayac');
  listeAlani.innerHTML = '<p class="placeholder-text">Cihazlar yükleniyor...</p>';

  try {
    const url = laboratuvarId
      ? `/api/cihazlar?laboratuvar_id=${encodeURIComponent(laboratuvarId)}`
      : '/api/cihazlar';

    const yanit = await fetch(url);
    const sonuc = await yanit.json();

    if (!yanit.ok || !sonuc.basarili) {
      throw new Error(sonuc.mesaj || 'Cihaz verileri alınamadı.');
    }

    sayacAlani.textContent = `Toplam ${sonuc.toplam} cihaz gösteriliyor`;

    if (sonuc.veriler.length === 0) {
      listeAlani.innerHTML = '<p class="placeholder-text">Seçili laboratuvarda kayıtlı cihaz bulunamadı.</p>';
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