document.addEventListener('DOMContentLoaded', function () {
    // Multi-language functionality
    const langIdBtn = document.getElementById('lang-id');
    const langEnBtn = document.getElementById('lang-en');
    const langIdMobileBtn = document.getElementById('lang-id-mobile');
    const langEnMobileBtn = document.getElementById('lang-en-mobile');

    // Fungsi untuk update semua elemen bahasa
    function updateAllLanguageElements() {
        const langIdElements = document.querySelectorAll('.lang-id');
        const langEnElements = document.querySelectorAll('.lang-en');
        return { langIdElements, langEnElements };
    }

    function setLanguage(lang) {
        // Dapatkan elemen bahasa TERBARU setiap kali fungsi dipanggil
        const { langIdElements, langEnElements } = updateAllLanguageElements();
        
        if (lang === 'id') {
            // Gunakan class 'hidden' bukan style.display
            langIdElements.forEach(el => el.classList.remove('hidden'));
            langEnElements.forEach(el => el.classList.add('hidden'));
            
            document.querySelectorAll('#lang-id, #lang-id-mobile').forEach(btn => {
                btn.classList.add('active');
                btn.classList.remove('border-gray-600');
                btn.classList.add('border-blue-500');
            });
            document.querySelectorAll('#lang-en, #lang-en-mobile').forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('border-gray-600');
                btn.classList.remove('border-blue-500');
            });
            document.documentElement.lang = 'id';
        } else {
            // Gunakan class 'hidden' bukan style.display
            langIdElements.forEach(el => el.classList.add('hidden'));
            langEnElements.forEach(el => el.classList.remove('hidden'));
            
            document.querySelectorAll('#lang-en, #lang-en-mobile').forEach(btn => {
                btn.classList.add('active');
                btn.classList.remove('border-gray-600');
                btn.classList.add('border-blue-500');
            });
            document.querySelectorAll('#lang-id, #lang-id-mobile').forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('border-gray-600');
                btn.classList.remove('border-blue-500');
            });
            document.documentElement.lang = 'en';
        }
    }

    if (langIdBtn) langIdBtn.addEventListener('click', () => setLanguage('id'));
    if (langEnBtn) langEnBtn.addEventListener('click', () => setLanguage('en'));
    if (langIdMobileBtn) langIdMobileBtn.addEventListener('click', () => setLanguage('id'));
    if (langEnMobileBtn) langEnMobileBtn.addEventListener('click', () => setLanguage('en'));

    // Mobile menu toggle dengan animasi X yang benar-benar berfungsi
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    if (menuToggle && mobileMenu && menuOverlay) {
        menuToggle.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking overlay
        menuOverlay.addEventListener('click', toggleMobileMenu);

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', toggleMobileMenu);
        });

        // Close menu when clicking language buttons
        if (langIdMobileBtn) langIdMobileBtn.addEventListener('click', toggleMobileMenu);
        if (langEnMobileBtn) langEnMobileBtn.addEventListener('click', toggleMobileMenu);
    }

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Load More Certificates functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenCertificates = document.getElementById('hidden-certificates');
    const certificatesContainer = document.getElementById('certificates-container');
    const loadMoreContainer = document.getElementById('load-more-container');

    if (loadMoreBtn && hiddenCertificates) {
        loadMoreBtn.addEventListener('click', function () {
            // Show hidden certificates
            const hiddenCards = hiddenCertificates.querySelectorAll('.certificate-hidden');

            hiddenCards.forEach((card, index) => {
                // Clone and append each hidden card
                const clonedCard = card.cloneNode(true);
                clonedCard.classList.remove('certificate-hidden');
                clonedCard.classList.add('fade-in');

                // Add animation delay
                clonedCard.style.animationDelay = `${index * 0.1}s`;

                // Append to container
                certificatesContainer.appendChild(clonedCard);

                // Show with animation
                setTimeout(() => {
                    clonedCard.style.opacity = '1';
                    clonedCard.style.transform = 'translateY(0)';
                }, 10);
            });

            // Hide the load more button
            loadMoreContainer.classList.add('hidden');

            // Add animation to new cards
            const newCards = certificatesContainer.querySelectorAll('.glass-effect');
            newCards.forEach(card => {
                card.classList.add('opacity-0', 'translate-y-10');
                setTimeout(() => {
                    card.classList.remove('opacity-0', 'translate-y-10');
                    card.classList.add('opacity-100', 'translate-y-0');
                }, 100);
            });

            // PENTING: Terapkan ulang bahasa yang aktif setelah menambah elemen baru
            // Dapatkan bahasa yang sedang aktif
            const isEnglishActive = document.querySelector('#lang-en.active') || document.querySelector('#lang-en-mobile.active');
            const currentLang = isEnglishActive ? 'en' : 'id';
            
            // Tunggu sebentar agar DOM selesai update, lalu terapkan bahasa
            setTimeout(() => {
                setLanguage(currentLang);
            }, 50);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);

    // Animate elements on scroll - PERBAIKAN FINAL
    // Hanya animate elemen di section tertentu, bukan di navbar/mobile menu/hero
    const sectionsToAnimate = ['#about', '#skills', '#certificates', '#projects', '#contact'];

    sectionsToAnimate.forEach(sectionId => {
        const section = document.querySelector(sectionId);
        if (section) {
            section.querySelectorAll('.glass-effect').forEach(element => {
                element.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
                observer.observe(element);
            });
        }
    });

    // Gradient text animation
    const gradientTexts = document.querySelectorAll('.gradient-text');
    gradientTexts.forEach(text => {
        text.style.animation = 'gradient 3s ease-in-out infinite';
    });
});