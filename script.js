 document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SMOOTH SCROLLING UNTUK NAVIGASI ---
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah loncatan instan
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. ANIMASI SAAT GULIR (INTERSECTION OBSERVER) ---
    const observerOptions = {
        root: null, // Menggunakan viewport sebagai root
        threshold: 0.1, // Memicu animasi saat 10% elemen terlihat
        rootMargin: '0px 0px -50px 0px' // Memicu sedikit lebih awal
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Opsional: Hentikan observasi setelah animasi dimainkan
                // observer.unobserve(entry.target); 
            } else {
                // Jika ingin animasi berulang setiap kali elemen muncul
                // entry.target.classList.remove('show');
            }
        });
    }, observerOptions);

    // Target semua elemen yang akan dianimasikan
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));


    // --- 3. MENANDA LINK NAVIGASI YANG AKTIF ---
    const sections = document.querySelectorAll('section[id]');
    const navLinksActive = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hapus kelas 'active' dari semua link
                navLinksActive.forEach(link => link.classList.remove('active'));
                
                // Tambahkan kelas 'active' ke link yang sesuai
                const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 }); // Trigger saat 50% section terlihat

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});
