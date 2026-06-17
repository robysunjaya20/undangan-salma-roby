document.addEventListener("DOMContentLoaded", function () {
    
    // 1. MANAJEMEN PARAMETER NAMA TAMU DARI URL
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('to');
    const elemenNama = document.getElementById('nama-tamu');
    const inputRsvpNama = document.getElementById('rsvp-nama');

    if (namaTamu) {
        // decodeURIComponent berfungsi mengubah '%20' atau '%26' menjadi karakter asli
        const namaBersih = decodeURIComponent(namaTamu);
        elemenNama.innerText = namaBersih;
        
        // Otomatis mengisi kolom nama pada form RSVP jika elemennya tersedia
        if (inputRsvpNama) {
            inputRsvpNama.value = namaBersih;
        }
    } else {
        elemenNama.innerText = "Tamu Undangan";
    }

    // 2. LOGIKA PEMBUKAAN COVER & AUDIO CONTROLLER
    const btnBuka = document.getElementById('btn-buka');
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('main-content');
    const music = document.getElementById('wedding-music');
    const body = document.getElementById('body-lock');
    const btnPlayback = document.getElementById('btn-playback');
    const audioIcon = document.getElementById('audio-icon');
    
    let isPlaying = false;

    // Fungsi untuk memutar audio dan mengubah status ikon menjadi berputar
    function playAudio() {
        if (!music) return;
        music.play().then(() => {
            isPlaying = true;
            if (audioIcon) audioIcon.className = "fas fa-compact-disc"; 
            if (btnPlayback) btnPlayback.classList.remove('animation-paused');
        }).catch(err => {
            console.warn("Pemutaran audio diblokir oleh kebijakan browser. Menunggu interaksi lanjutan.", err);
        });
    }

    // Fungsi untuk menjeda audio
    function pauseAudio() {
        if (!music) return;
        music.pause();
        isPlaying = false;
        if (audioIcon) audioIcon.className = "fas fa-music";
        if (btnPlayback) btnPlayback.classList.add('animation-paused');
    }

    // Event Listener saat tombol "Buka Undangan" diklik
    if (btnBuka) {
        btnBuka.addEventListener('click', function() {
            if (mainContent) {
                mainContent.classList.remove('hidden');
                setTimeout(() => {
                    mainContent.classList.add('opacity-100');
                }, 50);
            }

            if (cover) cover.classList.add('cover-slide-up');
            if (body) body.classList.remove('overflow-hidden');
            if (btnPlayback) btnPlayback.classList.remove('hidden');

            // Jalankan pemutaran musik otomatis setelah ada interaksi klik
            playAudio();
        });
    }

    // Event Listener untuk tombol kontrol musik mandiri (Floating Button)
    if (btnPlayback) {
        btnPlayback.addEventListener('click', function() {
            if (isPlaying) {
                pauseAudio();
            } else {
                playAudio();
            }
        });
    }

    // LIGHTBOX

    const galleryImages =
        document.querySelectorAll(".gallery-image");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightbox-image");

    const closeLightbox =
        document.getElementById("close-lightbox");

    galleryImages.forEach(img => {

        img.addEventListener("click", () => {

            lightboxImage.src = img.src;

            lightbox.classList.remove("hidden");

            lightbox.classList.add("flex");

        });

    });

    closeLightbox?.addEventListener("click", () => {

        lightbox.classList.add("hidden");

        lightbox.classList.remove("flex");

    });


    // UCAPAN

    const wishForm =
        document.getElementById("wish-form");

    const wishList =
        document.getElementById("wish-list");

    wishForm?.addEventListener("submit", e => {

        e.preventDefault();

        const nama =
            document.getElementById("wish-name").value;

        const pesan =
            document.getElementById("wish-message").value;

        const card =
            document.createElement("div");

        card.className =
            "save-date-card p-6";

        card.innerHTML = `
            <h4 class="font-semibold mb-2">${nama}</h4>
            <p class="text-stone-300">${pesan}</p>
        `;

        wishList.prepend(card);

        wishForm.reset();

    });
});