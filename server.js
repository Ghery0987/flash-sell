// Simpan sebagai: server.js
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Menyajikan file html/css/js

// --- DATABASE GAME (SIMULASI) ---
// Dalam dunia nyata, data ini diambil dari API Provider (seperti Digiflazz/Apigames)
const games = [
    { id: 'mlbb', name: 'Mobile Legends', developer: 'Moonton', category: 'Game', currency: 'Diamonds', image: 'https://cdn.icon-icons.com/icons2/2699/PNG/512/mobile_legends_logo_icon_169344.png', items: [
        { sku: 'ML3', name: '3 Diamonds', price: 1500 },
        { sku: 'ML86', name: '86 Diamonds', price: 22000 },
        { sku: 'ML172', name: '172 Diamonds', price: 45000 },
        { sku: 'MLWK', name: 'Weekly Diamond Pass', price: 28000 },
        { sku: 'MLSL', name: 'Starlight Member', price: 145000 }
    ]},
    { id: 'ff', name: 'Free Fire', developer: 'Garena', category: 'Game', currency: 'Diamonds', image: 'https://logodownload.org/wp-content/uploads/2020/11/free-fire-logo-2.png', items: [
        { sku: 'FF5', name: '5 Diamonds', price: 1000 },
        { sku: 'FF140', name: '140 Diamonds', price: 20000 },
        { sku: 'FF720', name: '720 Diamonds', price: 98000 }
    ]},
    { id: 'pubg', name: 'PUBG Mobile', developer: 'Tencent', category: 'Game', currency: 'UC', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/PUBG_Mobile_Logo.svg/1200px-PUBG_Mobile_Logo.svg.png', items: [
        { sku: 'UC60', name: '60 UC', price: 14500 },
        { sku: 'UC660', name: '660 UC', price: 145000 }
    ]},
    { id: 'genshin', name: 'Genshin Impact', developer: 'Hoyoverse', category: 'Game', currency: 'Genesis Crystal', image: 'https://upload.wikimedia.org/wikipedia/en/5/5d/Genshin_Impact_logo.svg', items: [
        { sku: 'GC60', name: '60 Genesis Crystal', price: 16000 },
        { sku: 'WELKIN', name: 'Welkin Moon', price: 79000 }
    ]},
    { id: 'valo', name: 'Valorant', developer: 'Riot Games', category: 'Game', currency: 'VP', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/2560px-Valorant_logo_-_pink_color_version.svg.png', items: [
        { sku: 'VP125', name: '125 Points', price: 15000 },
        { sku: 'VP700', name: '700 Points', price: 80000 }
    ]},
    // --- PULSA ---
    { id: 'tsel', name: 'Telkomsel', developer: 'Provider', category: 'Pulsa', currency: 'IDR', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Telkomsel_2021_icon.svg/1200px-Telkomsel_2021_icon.svg.png', items: [
        { sku: 'T5', name: 'Pulsa 5.000', price: 6500 },
        { sku: 'T100', name: 'Pulsa 100.000', price: 99000 }
    ]},
    { id: 'xl', name: 'XL Axiata', developer: 'Provider', category: 'Pulsa', currency: 'IDR', image: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Logo_Xl_Axiata.png', items: [
        { sku: 'X5', name: 'Pulsa 5.000', price: 6000 },
        { sku: 'XDATA', name: 'Xtra Combo', price: 55000 }
    ]},
    { id: 'byu', name: 'by.U', developer: 'Provider', category: 'Pulsa', currency: 'IDR', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/By.U_Logo.png', items: [
        { sku: 'B10', name: 'Data 10GB', price: 20000 }
    ]}
];

// --- API ENDPOINTS ---

// 1. Ambil Semua Data
app.get('/api/products', (req, res) => {
    res.json(games);
});

// 2. Proses Transaksi (Simulasi ke Payment Gateway)
app.post('/api/transaction', (req, res) => {
    const { userId, sku, method } = req.body;
    
    // Disini logika simpan ke database (MySQL/MongoDB) terjadi
    // Dan request ke API Tripay/Midtrans/Xendit
    
    console.log(`Order Baru: ID ${userId} membeli ${sku} via ${method}`);

    // Simulasi Sukses
    res.json({
        status: 'success',
        message: 'Transaksi berhasil dibuat!',
        trx_id: 'TRX-' + Date.now(),
        payment_code: 'QR-' + Math.floor(Math.random() * 999999), // Contoh kode QR
        total_amount: 'Menunggu Pembayaran'
    });
});

app.listen(port, () => {
    console.log(`Server FLASH SELL berjalan di http://localhost:${port}`);
});
