let allProducts = [];

// 1. Fetch Data dari Backend API
async function loadProducts() {
    try {
        // Panggil API yang kita buat di server.js
        const response = await fetch('http://localhost:3000/api/products');
        allProducts = await response.json();
        renderProducts(allProducts);
    } catch (error) {
        console.error("Gagal koneksi ke server", error);
        document.getElementById('game-list').innerHTML = "<p>Gagal memuat data. Pastikan Server.js berjalan!</p>";
    }
}

// 2. Render Kartu Produk
function renderProducts(data) {
    const gameContainer = document.getElementById('game-list');
    const pulsaContainer = document.getElementById('pulsa-list');
    
    gameContainer.innerHTML = '';
    pulsaContainer.innerHTML = '';

    data.forEach(item => {
        const cardHTML = `
            <div class="card" onclick='openModal(${JSON.stringify(item)})'>
                <img src="${item.image}" alt="${item.name}">
                <div class="card-info">
                    <span class="card-title">${item.name}</span>
                    <span class="card-dev">${item.developer}</span>
                </div>
            </div>
        `;

        if(item.category === 'Game') gameContainer.innerHTML += cardHTML;
        else pulsaContainer.innerHTML += cardHTML;
    });
}

// 3. Search Function
function filterProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(query));
    renderProducts(filtered);
}

// --- LOGIKA MODAL & TRANSAKSI ---
function openModal(item) {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-title').innerText = "Top Up " + item.name;
    
    const itemsContainer = document.getElementById('modal-items');
    itemsContainer.innerHTML = '';
    
    item.items.forEach(prod => {
        const div = document.createElement('div');
        div.className = 'item-opt';
        div.innerHTML = `<b>${prod.name}</b><br>Rp ${prod.price.toLocaleString()}`;
        div.onclick = () => selectItem(div, prod.sku);
        itemsContainer.appendChild(div);
    });
}

function selectItem(el, sku) {
    document.querySelectorAll('.item-opt').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('selectedSku').value = sku;
}

function selectPay(el, method) {
    document.querySelectorAll('.pay-opt').forEach(e => e.classList.remove('selected'));
    el.classList.add('selected');
    document.getElementById('selectedMethod').value = method;
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// KIRIM DATA KE BACKEND
async function submitOrder(e) {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const sku = document.getElementById('selectedSku').value;
    const method = document.getElementById('selectedMethod').value;

    if(!userId || !sku || !method) return alert("Mohon lengkapi data!");

    const btn = document.querySelector('.btn-buy');
    btn.innerHTML = "Memproses...";
    btn.disabled = true;

    try {
        const res = await fetch('http://localhost:3000/api/transaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, sku, method })
        });
        const result = await res.json();
        
        alert(`SUKSES!\nID Transaksi: ${result.trx_id}\nKode Bayar: ${result.payment_code}`);
        closeModal();
    } catch (err) {
        alert("Terjadi kesalahan sistem.");
    }
    
    btn.innerHTML = "BELI SEKARANG";
    btn.disabled = false;
}

// --- GOOGLE ASSISTANT LOGIC ---
function toggleChat() {
    const box = document.getElementById('chatBox');
    box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

function sendChat() {
    const input = document.getElementById('chatInput');
    const msg = input.value;
    if(!msg) return;

    const body = document.getElementById('chatBody');
    body.innerHTML += `<div class="msg user">${msg}</div>`;
    input.value = '';

    // Simulasi Jawaban Pintar (Google Logic)
    setTimeout(() => {
        let reply = "";
        const lower = msg.toLowerCase();

        if(lower.includes('cara') || lower.includes('top up')) {
            reply = "Pilih game, masukkan ID, pilih item, dan bayar via DANA/QRIS.";
        } else if(lower.includes('masalah') || lower.includes('gagal')) {
            reply = "Mohon hubungi admin via WhatsApp di menu bawah.";
        } else {
            // Mengarahkan ke Google Search Asli jika bot tidak tahu
            reply = `Saya tidak yakin. <a href="https://www.google.com/search?q=${msg}" target="_blank">Cari di Google: "${msg}"</a>`;
        }
        
        body.innerHTML += `<div class="msg bot">${reply}</div>`;
        body.scrollTop = body.scrollHeight;
    }, 1000);
}

// Jalankan saat load
loadProducts();
