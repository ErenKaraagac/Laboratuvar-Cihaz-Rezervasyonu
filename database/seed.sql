USE lab_rezervasyon;

-- 1. Örnek Laboratuvarlar
INSERT INTO laboratuvarlar (ad, konum, kapasite, aciklama) VALUES
('Elektronik ve Devre Laboratuvarı', 'Mühendislik Fakültesi B Blok, Kat 1, No: 104', 20, 'Osiloskop, güç kaynağı ve sinyal jeneratörlerinin bulunduğu temel elektronik laboratuvarı.'),
('Gömülü Sistemler ve IoT Laboratuvarı', 'Mühendislik Fakültesi B Blok, Kat 2, No: 208', 15, 'Mikrodenetleyici, FPGA ve sensör geliştirme kitleri için ayrılmış laboratuvar.'),
('Malzeme ve Kimya Analiz Laboratuvarı', 'Fen Bilimleri Binası A Blok, Zemin Kat, No: 012', 12, 'Spektrofotometre, mikroskop ve hassas ölçüm cihazlarının yer aldığı analiz laboratuvarı.');

-- 2. Örnek Cihazlar (laboratuvar_id değerleri yukarıdaki sıraya göre 1, 2, 3 olarak eşleşir)
INSERT INTO cihazlar (ad, model, seri_no, durum, laboratuvar_id, aciklama) VALUES
('Dijital Osiloskop', 'Rigol DS1054Z', 'OSC-2026-001', 'musait', 1, '4 kanallı, 50 MHz dijital depolamalı osiloskop.'),
('Programlanabilir DC Güç Kaynağı', 'Siglent SPD3303X', 'PSU-2026-002', 'musait', 1, '3 kanallı hassas laboratuvar güç kaynağı.'),
('Sinyal Jeneratörü', 'Tektronix AFG1022', 'SIG-2026-003', 'bakimda', 1, '25 MHz çift kanallı fonksiyon jeneratörü, kalibrasyonda.'),
('FPGA Geliştirme Kartı', 'Xilinx Basys 3', 'FPGA-2026-004', 'musait', 2, 'Artix-7 tabanlı sayısal tasarım ve gömülü sistem kartı.'),
('3D Yazıcı', 'Bambu Lab P1S', 'PRN-2026-005', 'musait', 2, 'Prototip kasa ve mekanik parça basımı için kapalı kasa 3D yazıcı.'),
('UV-Vis Spektrofotometre', 'Shimadzu UV-1800', 'SPC-2026-006', 'musait', 3, 'Çözelti konsantrasyon ve absorbans ölçüm cihazı.'),
('Dijital Optik Mikroskop', 'Olympus CX23', 'MIC-2026-007', 'arizali', 3, 'Işık kaynağı arızalı, yedek parça bekleniyor.');