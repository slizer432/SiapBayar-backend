DELETE FROM jatah_urunan;
DELETE FROM pembayaran_pengeluaran;
DELETE FROM pengeluaran;
DELETE FROM anggota_kelompok;
DELETE FROM kelompok;
DELETE FROM anggota;

-- 1. Masukkan data ANGGOTA (variasi nama unik)
INSERT INTO anggota (id, nama_lengkap) VALUES
(1, 'Aditya Nugraha'),
(2, 'Lestari Putri'),
(3, 'Hendra Wijaya'),
(4, 'Maya Sari'),  
(5, 'Firman Santoso'),
(6, 'Rina Anggraini'),
(7, 'Tia Novita'),
(8, 'Bima Pratama');

-- 2. Masukkan data KELOMPOK (variasi nama dan deskripsi unik)
INSERT INTO kelompok (id, nama_kelompok, deskripsi) VALUES
(1, 'Trip Pantai Lombok', 'Petualangan ke Lombok untuk menikmati pantai dan snorkeling selama 5 hari'),
(2, 'Arisan Tetangga', 'Kumpulan arisan RT dengan acara makan malam dan karaoke'),
(3, 'Wisata Sejarah Jogja', 'Tur ke Yogyakarta untuk mengunjungi candi dan museum'),
(4, 'Charity Run', 'Acara lari amal untuk mendukung pendidikan anak kurang mampu');

-- 3. Masukkan ANGGOTA ke dalam KELOMPOK (tabel anggota_kelompok, variasi kombinasi)
INSERT INTO anggota_kelompok (id_kelompok, id_anggota) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), -- Trip Pantai Lombok: Aditya, Lestari, Hendra, Maya
(2, 7), (2, 1), (2, 2), (2, 5), -- Arisan Tetangga: Tia, Aditya, Lestari, Firman
(3, 1), (3, 2), (3, 3), (3, 6), -- Wisata Sejarah Jogja: Aditya, Lestari, Hendra, Rina
(4, 7), (4, 1), (4, 2), (4, 8); -- Charity Run: Tia, Aditya, Lestari, Bima

-- 4. Masukkan data PENGELUARAN (variasi deskripsi, jumlah, dan tanggal)
INSERT INTO pengeluaran (id, id_kelompok, deskripsi, jumlah_total, tanggal_pengeluaran) VALUES
(1, 1, 'Sewa Resort di Senggigi', 5200000.00, '2025-05-10'),
(2, 1, 'Penyewaan Alat Snorkeling dan Makan Siang', 2800000.00, '2025-05-11'),
(3, 2, 'Katering BBQ dan Sewa Sound System', 1500000.00, '2025-05-15'),
(4, 3, 'Tiket Masuk Candi Borobudur dan Transportasi', 3400000.00, '2025-05-20'),
(5, 4, 'Biaya Penyelenggaraan Lari Amal dan Donasi', 2500000.00, '2025-05-25');

-- 5. Masukkan data PEMBAYARAN PENGELUARAN (variasi pembayar dan jumlah)
INSERT INTO pembayaran_pengeluaran (id_pengeluaran, id_anggota_pembayar, jumlah_bayar) VALUES
(1, 2, 3000000.00), (1, 3, 2200000.00), -- Resort: Lestari (3M), Hendra (2.2M)
(2, 1, 1800000.00), (2, 4, 1000000.00), -- Snorkeling: Aditya (1.8M), Maya (1M)
(3, 7, 1000000.00), (3, 5, 500000.00),  -- BBQ: Tia (1M), Firman (0.5M)
(4, 2, 2000000.00), (4, 6, 1400000.00), -- Candi: Lestari (2M), Rina (1.4M)
(5, 7, 1500000.00), (5, 8, 1000000.00); -- Lari Amal: Tia (1.5M), Bima (1M)

-- 6. Masukkan rincian JATAH URUNAN (variasi jumlah jatah)
INSERT INTO jatah_urunan (id_pengeluaran, id_anggota_penanggung, jumlah_jatah) VALUES
-- Pengeluaran 1: Sewa Resort (5.200.000 / 4 = 1.300.000)
(1, 1, 1300000.00),
(1, 2, 1300000.00),
(1, 3, 1300000.00),
(1, 4, 1300000.00),
-- Pengeluaran 2: Snorkeling (2.800.000 / 4 = 700.000)
(2, 1, 700000.00),
(2, 2, 700000.00),
(2, 3, 700000.00),
(2, 4, 700000.00),
-- Pengeluaran 3: BBQ (1.500.000 / 4 = 375.000)
(3, 7, 375000.00),
(3, 1, 375000.00),
(3, 2, 375000.00),
(3, 5, 375000.00),
-- Pengeluaran 4: Candi (3.400.000 / 4 = 850.000)
(4, 1, 850000.00),
(4, 2, 850000.00),
(4, 3, 850000.00),
(4, 6, 850000.00),
-- Pengeluaran 5: Lari Amal (2.500.000 / 4 = 625.000)
(5, 7, 625000.00),
(5, 1, 625000.00),
(5, 2, 625000.00),
(5, 8, 625000.00);