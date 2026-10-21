// Data Alur Cerita Game
const storyNodes = {
    start: {
        text: "Kamu melihat salah satu teman sekelasmu menjadi bahan olok-olok dan komentar negatif di grup WhatsApp kelas karena penampilannya. Apa yang akan kamu lakukan?",
        choices: [
            { text: "Ikut tertawa agar tidak dikucilkan oleh kelompok tersebut.", next: "ikutTertawa", empathyChange: -20 },
            { text: "Hanya membaca pesannya saja (diam) karena takut ikut diserang.", next: "diamSaja", empathyChange: -5 },
            { text: "Mengingatkan mereka secara baik-baik di grup bahwa tindakan itu tidak baik.", next: "tegurLangsung", empathyChange: +20 }
        ]
    },
    ikutTertawa: {
        text: "Kamu memilih ikut tertawa. Temanmu yang menjadi korban merasa sangat hancur dan terisolasi karena mengira kamu adalah temannya. Tindakan kecil ini ternyata berdampak besar pada mentalnya.",
        choices: [
            { text: "Mulai merasa bersalah dan ingin memperbaiki keadaan.", next: "start", empathyChange: 0 }
        ]
    },
    diamSaja: {
        text: "Kamu memilih diam. Walau kamu tidak ikut merundung, sikap diam dari penonton membuat pelaku merasa didukung untuk terus melanjutkan perundungannya.",
        choices: [
            { text: "Coba ambil langkah lain yang lebih peduli.", next: "start", empathyChange: 0 }
        ]
    },
    tegurLangsung: {
        text: "Luar biasa! Kamu berani bersuara. Meskipun beberapa orang sempat protes, tindakanmu membuat perundung menghentikan aksinya, dan korban merasa jauh lebih tenang karena tahu dia tidak sendirian.",
        choices: [
            { text: "Mainkan ulang skenario dari awal.", next: "start", empathyChange: 0 }
        ]
    }
};

// Variabel Status Pemain
let currentEmpathy = 50;

// Elemen DOM (Document Object Model)
const storyTextElement = document.getElementById("story-text");
const choicesBoxElement = document.getElementById("choices-box");
const empathyScoreElement = document.getElementById("empathy-score");

// Fungsi untuk Memuat Cerita Berdasarkan Node
function loadStoryNode(nodeKey) {
    const node = storyNodes[nodeKey];
    
    // Tampilkan teks cerita
    storyTextElement.textContent = node.text;
    
    // Bersihkan tombol pilihan sebelumnya
    choicesBoxElement.innerHTML = "";
    
    // Buat tombol pilihan baru secara dinamis
    node.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.classList.add("choice-btn");
        
        // Event listener saat tombol diklik
        button.addEventListener("click", () => {
            currentEmpathy += choice.empathyChange;
            // Batasi skor empati antara 0 dan 100
            if (currentEmpathy > 100) currentEmpathy = 100;
            if (currentEmpathy < 0) currentEmpathy = 0;
            
            empathyScoreElement.textContent = currentEmpathy;
            
            // Lanjut ke cerita berikutnya
            loadStoryNode(choice.next);
        });
        
        choicesBoxElement.appendChild(button);
    });
}

// Menjalankan game saat pertama kali dibuka
loadStoryNode("start");
