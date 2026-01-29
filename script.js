/* script.js - Code xử lý hiệu ứng cho website THPT Hương Khê */

document.addEventListener('DOMContentLoaded', function() {
    
    // --------------------------------------------------
    // 1. KÍCH HOẠT HIỆU ỨNG CUỘN (AOS LIBRARY)
    // --------------------------------------------------
    // Kiểm tra xem thư viện AOS đã được tải chưa, nếu có thì kích hoạt
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800, // Thời gian hiệu ứng (ms)
            once: true,    // Chỉ chạy hiệu ứng 1 lần khi cuộn tới
            offset: 100    // Khoảng cách bắt đầu chạy hiệu ứng
        });
    }

    // --------------------------------------------------
    // 2. HIỆU ỨNG STICKY HEADER (Menu bám dính)
    // --------------------------------------------------
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        // Nếu cuộn quá 50px thì thêm class 'sticky'
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Hiện/Ẩn nút "Lên đầu trang"
        const toTopBtn = document.querySelector('.to-top-btn');
        if (toTopBtn) {
            if (window.scrollY > 300) {
                toTopBtn.classList.add('show');
            } else {
                toTopBtn.classList.remove('show');
            }
        }
    });

    // --------------------------------------------------
    // 3. MOBILE MENU (Xử lý nút 3 gạch)
    // --------------------------------------------------
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Đổi icon từ 3 gạch (fa-bars) sang dấu X (fa-times)
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --------------------------------------------------
    // 4. TẠO NÚT "LÊN ĐẦU TRANG" (AUTO CREATE)
    // --------------------------------------------------
    const toTopBtn = document.createElement('div');
    toTopBtn.className = 'to-top-btn';
    toTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(toTopBtn);

    toTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --------------------------------------------------
    // 5. TỰ ĐÓNG MENU KHI BẤM LINK (UX)
    // --------------------------------------------------
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            // Chỉ đóng nếu đang ở chế độ mobile (có class active)
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Đổi icon lại thành 3 gạch
                const icon = menuBtn.querySelector('i');
                if(icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

});
