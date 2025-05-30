document.addEventListener('DOMContentLoaded', () => {
    const mainVideo = document.getElementById('mainVideo');
    const playlistElement = document.getElementById('playlist');
    const videoWrapper = document.querySelector('.video-wrapper');
    const videoTitleElement = document.querySelector('.video-title');

    // Contoh data video (ganti dengan video dan thumbnail Anda!)
    const videos = [
        { 
            title: "wallpaper live",
            src: "/home/juven/Video/Y2meta.app-KUMPULAN DJ FYP TIKTOK 2024 SOUND KANE JEDAG JEDUG FUL BAS TERBARU.mp4",  // Contoh video MP4
            thumbnail: "/home/juven/Gambar/download (4).jpeg"
        },
        {
            title: "DJ DANCE FLOOR THAILAND STYLE (Slowed + Reverb)",
            src: "/home/juven/Video/Y2meta.app-DJ DANCE FLOOR THAILAND STYLE (Slowed + Reverb) 🎧.mp4", // Contoh video MP4
            thumbnail: "/home/juven/Gambar/wukong.jpeg"
        },
        {
            title: "BREAKBEAT BARAT MIXTAPE TERBARU FULL ALBUM VERSION REMIX 2024",
            src: "/home/juven/Video/Y2meta.app-DJ BREAKBEAT BARAT MIXTAPE TERBARU FULL ALBUM VERSION REMIX 2024.mp4", // Contoh video MP4
            thumbnail: "/home/juven/Gambar/mila.png"
        },
        {
            title: "DJ SWEET LOVE X DYNASTY VIRAL TIKTOK SOUND HEALING",
            src: "/home/juven/Video/Y2meta.app-DJ SWEET LOVE X DYNASTY VIRAL TIKTOK SOUND HEALING.mp4", // Contoh video MP4
            thumbnail: "/home/juven/Gambar/ChatGPT Image 26 Mei 2025, 15.07.48.png"
        },
        {
            title: "ステップ！ - GAME VERSION",
            src: "/home/juven/Unduhan/「デレステ 4K60fps MV」 Step! 【ステップ !】.mp4", // Contoh video MP4
            thumbnail: "/home/juven/Gambar/lagu.jpeg"
        },
        {
            title: "jj pertamina",
            src: "/home/juven/Video/JEDAG JEDUG PERTAMINA MEME.mp4", // Contoh video MP4
            thumbnail: "/home/juven/Gambar/download (4).jpeg"
        }
    ];

    let currentVideoIndex = 0;

    // Fungsi untuk memuat video ke pemutar utama
    function loadVideo(index) {
        if (index < 0 || index >= videos.length) return;

        // Tambahkan kelas untuk transisi (video akan mengecil dan memudar)
        videoWrapper.classList.add('transitioning');
        videoTitleElement.classList.remove('show-title'); // Sembunyikan judul saat transisi

        // Tunggu sebentar sebelum mengganti sumber video untuk efek transisi
        setTimeout(() => {
            currentVideoIndex = index;
            const video = videos[currentVideoIndex];
            mainVideo.src = video.src;
            videoTitleElement.textContent = video.title;

            // Muat video dan putar
            mainVideo.load();
            mainVideo.play().catch(error => {
                console.error("Autoplay failed:", error);
                // Handle autoplay policy (e.g., show a play button)
            });

            // Hapus kelas transisi setelah video baru dimuat
            mainVideo.oncanplaythrough = () => {
                videoWrapper.classList.remove('transitioning');
                // Tampilkan judul setelah transisi selesai
                videoTitleElement.classList.add('show-title');
            };

            updatePlaylistActiveState();
        }, 500); // Durasi timeout harus sama dengan durasi transisi CSS
    }

    // Fungsi untuk memperbarui status "aktif" di daftar putar
    function updatePlaylistActiveState() {
        const playlistItems = playlistElement.querySelectorAll('li');
        playlistItems.forEach((item, index) => {
            if (index === currentVideoIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Membangun daftar putar (playlist)
    function buildPlaylist() {
        videos.forEach((video, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<img src="${video.thumbnail}" alt="Thumbnail"><span>${video.title}</span>`;
            listItem.dataset.index = index;
            listItem.addEventListener('click', () => loadVideo(index));
            playlistElement.appendChild(listItem);
        });
    }

    // Otomatis putar video berikutnya saat video selesai
    mainVideo.addEventListener('ended', () => {
        const nextIndex = (currentVideoIndex + 1) % videos.length;
        loadVideo(nextIndex);
    });

    // Inisialisasi: bangun daftar putar dan muat video pertama
    buildPlaylist();
    loadVideo(currentVideoIndex);
});