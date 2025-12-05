document.addEventListener('DOMContentLoaded', () => {
    // 1. Implementasi Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').length > 1 && this.getAttribute('href').startsWith('#')) { 
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth' 
                    });
                }
            }
        });
    });

    // 2. Implementasi Navbar Responsif (Pull Menu)
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileOverlay = document.getElementById('navbar-mobile-overlay');
    const mobileLinks = document.querySelectorAll('#navbar-mobile a');

    menuToggle.addEventListener('click', () => {
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });

    closeMenu.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; 
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // --- Observer Options (Digunakan untuk About dan Projects) ---
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 // Animasi muncul ketika 20% elemen terlihat
    };
    
    // 3. Implementasi Animasi On-Scroll (Project Section)
    const projectCards = document.querySelectorAll('.project-card');
    
    const projectObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const projectObserver = new IntersectionObserver(projectObserverCallback, observerOptions);

    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
    
    // 4. Implementasi Animasi On-Scroll (About Me Text)
    const aboutCard = document.querySelector('.about-card');

    const aboutObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Saat about card terlihat, tambahkan kelas 'animate'
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const aboutObserver = new IntersectionObserver(aboutObserverCallback, observerOptions);

    if (aboutCard) {
        aboutObserver.observe(aboutCard);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // 1. Implementasi Smooth Scroll (TETAP SAMA)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').length > 1 && this.getAttribute('href').startsWith('#')) { 
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth' 
                    });
                }
            }
        });
    });

    // 2. Implementasi Navbar Responsif (Pull Menu) (TETAP SAMA)
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileOverlay = document.getElementById('navbar-mobile-overlay');
    const mobileLinks = document.querySelectorAll('#navbar-mobile a');

    menuToggle.addEventListener('click', () => {
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });

    closeMenu.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; 
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // --- Observer Options (Digunakan untuk About dan Projects) ---
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.2 
    };
    
    // 3. Implementasi Animasi On-Scroll (Project Section) (TETAP SAMA)
    const projectCards = document.querySelectorAll('.project-card');
    
    const projectObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const projectObserver = new IntersectionObserver(projectObserverCallback, observerOptions);

    projectCards.forEach(card => {
        projectObserver.observe(card);
    });
    
    // 4. Implementasi Animasi On-Scroll (About Me Text) (TETAP SAMA)
    const aboutCard = document.querySelector('.about-card');

    const aboutObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const aboutObserver = new IntersectionObserver(aboutObserverCallback, observerOptions);

    if (aboutCard) {
        aboutObserver.observe(aboutCard);
    }

    // 5. VALIDASI FORM KONTAK DAN PESAN SUKSES (BARU) 💌
    const contactForm = document.querySelector('.contact-form');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const contactCard = document.querySelector('.contact-card');

    // Fungsi untuk menampilkan pesan (sukses atau error)
    function displayMessage(message, isSuccess) {
        // Hapus pesan lama jika ada
        const oldMessage = contactCard.querySelector('.feedback-message');
        if (oldMessage) {
            oldMessage.remove();
        }

        const msgDiv = document.createElement('div');
        msgDiv.classList.add('feedback-message');
        msgDiv.textContent = message;
        msgDiv.style.cssText = `
            padding: 15px;
            margin-top: 20px;
            text-align: center;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            background-color: ${isSuccess ? '#4CAF50' : '#f44336'}; 
            transition: opacity 0.5s ease;
        `;
        
        // Sisipkan pesan di dalam contact-card, di atas copyright
        contactCard.insertBefore(msgDiv, contactCard.querySelector('.copyright-text'));

        // Hilangkan pesan setelah 5 detik jika sukses
        if (isSuccess) {
            setTimeout(() => {
                msgDiv.style.opacity = '0';
                setTimeout(() => msgDiv.remove(), 500); 
            }, 5000);
        }
    }

    // Fungsi validasi email sederhana
    function isValidEmail(email) {
        // Regex sederhana untuk mengecek format email (e.g., user@domain.com)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Mencegah form reload halaman

        const emailValue = emailInput.value.trim();

        if (emailValue === '') {
            // Validasi jika email kosong
            displayMessage('❌ Harap masukkan alamat email Anda.', false);
            return;
        }

        if (!isValidEmail(emailValue)) {
            // Validasi jika format email salah
            displayMessage('❌ Alamat email tidak valid. Harap periksa formatnya.', false);
            return;
        }

        // --- SIMULASI PENGIRIMAN SUKSES ---
        // Karena tidak ada backend, ini hanya simulasi
        displayMessage('✅ Pesan berhasil dikirim! Terima kasih.', true);
        
        // Opsional: Membersihkan form setelah sukses
        contactForm.reset(); 
    });
});