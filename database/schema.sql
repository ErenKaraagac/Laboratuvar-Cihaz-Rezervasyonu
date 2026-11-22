CREATE DATABASE IF NOT EXISTS lab_rezervasyon
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_turkish_ci;

USE lab_rezervasyon;

-- 1. Araştırmacılar (Kullanıcılar) Tablosu
CREATE TABLE IF NOT EXISTS arastirmacilar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad_soyad VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    sifre_hash VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'arastirmaci') NOT NULL DEFAULT 'arastirmaci',
    bolum VARCHAR(100),
    olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Laboratuvarlar Tablosu
CREATE TABLE IF NOT EXISTS laboratuvarlar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad VARCHAR(100) NOT NULL,
    konum VARCHAR(150) NOT NULL,
    kapasite INT DEFAULT 10,
    aciklama TEXT,
    olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Cihazlar Tablosu
CREATE TABLE IF NOT EXISTS cihazlar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ad VARCHAR(120) NOT NULL,
    model VARCHAR(100),
    seri_no VARCHAR(100) UNIQUE,
    durum ENUM('musait', 'bakimda', 'arizali') NOT NULL DEFAULT 'musait',
    laboratuvar_id INT NOT NULL,
    aciklama TEXT,
    olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (laboratuvar_id) REFERENCES laboratuvarlar(id) ON DELETE CASCADE
);

-- 4. Rezervasyonlar Tablosu
CREATE TABLE IF NOT EXISTS rezervasyonlar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    arastirmaci_id INT NOT NULL,
    cihaz_id INT NOT NULL,
    baslangic_zamani DATETIME NOT NULL,
    bitis_zamani DATETIME NOT NULL,
    amac VARCHAR(255),
    durum ENUM('beklemede', 'onaylandi', 'iptal', 'tamamlandi') NOT NULL DEFAULT 'beklemede',
    olusturma_tarihi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (arastirmaci_id) REFERENCES arastirmacilar(id) ON DELETE CASCADE,
    FOREIGN KEY (cihaz_id) REFERENCES cihazlar(id) ON DELETE CASCADE
);