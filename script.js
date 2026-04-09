// ==========================================================
// SOAL 5: Manipulasi DOM & Array of Object (Produk Klinik)
// ==========================================================

// 1. Data awal minimal 4 item
let dataProduk = [
    { id: 1, nama: "Masker Medis 1 Box", harga: 35000 },
    { id: 2, nama: "Vitamin C 1000mg", harga: 50000 },
    { id: 3, nama: "Handsanitizer 500ml", harga: 45000 },
    { id: 4, nama: "Termometer Digital", harga: 85000 }
];

const containerProduk = document.getElementById("daftarItemContainer");

// Fungsi untuk menampilkan (render) produk ke HTML
function renderProduk() {
    containerProduk.innerHTML = ""; // Bersihkan kontainer sebelum diisi ulang

    dataProduk.forEach((produk) => {
        const card = document.createElement("div");
        card.className = "card";
        
        card.innerHTML = `
            <h3>${produk.nama}</h3>
            <p>Harga: Rp ${produk.harga.toLocaleString('id-ID')}</p>
            <button class="btn-delete" onclick="hapusProduk(${produk.id})">Hapus</button>
        `;
        
        containerProduk.appendChild(card);
    });
}

// Fungsi untuk menambah produk baru
document.getElementById("btnTambahProduk").addEventListener("click", function() {
    const namaInput = document.getElementById("inputNamaProduk").value;
    const hargaInput = document.getElementById("inputHargaProduk").value;

    if (namaInput === "" || hargaInput === "") {
        alert("Nama dan Harga produk tidak boleh kosong!");
        return;
    }

    const produkBaru = {
        id: Date.now(), // Memanfaatkan timestamp sebagai ID unik
        nama: namaInput,
        harga: parseInt(hargaInput)
    };

    dataProduk.push(produkBaru);
    renderProduk(); // Tampilkan ulang tanpa reload

    // Reset input
    document.getElementById("inputNamaProduk").value = "";
    document.getElementById("inputHargaProduk").value = "";
});

// Fungsi untuk menghapus produk
function hapusProduk(id) {
    dataProduk = dataProduk.filter(produk => produk.id !== id);
    renderProduk(); // Tampilkan ulang tanpa reload
}

// Jalankan render pertama kali saat halaman dimuat
renderProduk();


// ==========================================================
// SOAL 4: Validasi Formulir JavaScript
// ==========================================================

const form = document.getElementById("formRegistrasi");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Mencegah form reload halaman

    // Ambil elemen input
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const telepon = document.getElementById("telepon").value;
    const dokter = document.getElementById("dokter").value;
    const jk = document.querySelector('input[name="jk"]:checked');

    // Ambil elemen penampung error
    const errorNama = document.getElementById("errorNama");
    const errorEmail = document.getElementById("errorEmail");
    const errorTelepon = document.getElementById("errorTelepon");
    const errorDokter = document.getElementById("errorDokter");
    const errorJk = document.getElementById("errorJk");

    // Reset semua pesan error
    errorNama.innerText = "";
    errorEmail.innerText = "";
    errorTelepon.innerText = "";
    errorDokter.innerText = "";
    errorJk.innerText = "";

    let isFormValid = true;

    // 1. Validasi Wajib Tidak Boleh Kosong (Nama)
    if (nama === "") {
        errorNama.innerText = "Nama lengkap wajib diisi!";
        isFormValid = false;
    }

    // 2. Validasi Format Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        errorEmail.innerText = "Email wajib diisi!";
        isFormValid = false;
    } else if (!emailPattern.test(email)) {
        errorEmail.innerText = "Format email tidak valid!";
        isFormValid = false;
    }

    // 3. Validasi Angka Harus Bernilai Positif (Nomor Telepon)
    if (telepon === "") {
        errorTelepon.innerText = "Nomor telepon wajib diisi!";
        isFormValid = false;
    } else if (Number(telepon) <= 0) {
        errorTelepon.innerText = "Nomor telepon harus bernilai positif!";
        isFormValid = false;
    }

    // Validasi tambahan untuk select dan radio (opsional untuk menyempurnakan)
    if (dokter === "") {
        errorDokter.innerText = "Pilih salah satu dokter!";
        isFormValid = false;
    }
    
    if (!jk) {
        errorJk.innerText = "Pilih jenis kelamin!";
        isFormValid = false;
    }

    // Jika semua lolos validasi
    if (isFormValid) {
        alert("Pendaftaran berhasil diproses!");
        form.reset(); // Kosongkan form
    }
});