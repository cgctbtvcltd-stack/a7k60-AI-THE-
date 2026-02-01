/* script.js - Tích hợp AI Chatbot & Hiệu ứng */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- PHẦN 1: CÁC HIỆU ỨNG CŨ (KHÔNG THAY ĐỔI) ---
    
    // 1.1 Kích hoạt AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 100 });
    }

    // 1.2 Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) header.classList.add('sticky');
        else header.classList.remove('sticky');
        
        // Hiện nút Back to top
        const toTopBtn = document.querySelector('.to-top-btn');
        if (toTopBtn) {
            toTopBtn.classList.toggle('show', window.scrollY > 300);
        }
    });

    // 1.3 Mobile Menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // 1.4 Scroll Top
    const toTopBtn = document.createElement('div');
    toTopBtn.className = 'to-top-btn';
    toTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(toTopBtn);
    toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // --- PHẦN 2: CHATBOT AI (MỚI THÊM) ---

    const chatToggle = document.getElementById('chat-toggle-btn');
    const chatBox = document.getElementById('chat-box');
    const chatClose = document.getElementById('chat-close-btn');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send-btn');
    const chatBody = document.getElementById('chat-body');

    // Mở/Đóng chat
    chatToggle.addEventListener('click', () => chatBox.classList.add('active'));
    chatClose.addEventListener('click', () => chatBox.classList.remove('active'));

    // Hàm xử lý gửi tin nhắn
    function handleChat() {
        const userText = chatInput.value.trim();
        if (userText === "") return;

        // 1. Hiện tin nhắn người dùng
        addMessage(userText, 'user-message');
        chatInput.value = '';

        // 2. AI suy nghĩ và trả lời (delay 0.5s cho giống thật)
        setTimeout(() => {
            const botReply = getBotResponse(userText.toLowerCase());
            addMessage(botReply, 'bot-message');
        }, 500);
    }

    // Sự kiện click nút gửi hoặc nhấn Enter
    chatSend.addEventListener('click', handleChat);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });

    // Hàm thêm tin nhắn vào khung
    function addMessage(text, className) {
        const div = document.createElement('div');
        div.className = `message ${className}`;
        div.innerHTML = text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight; // Tự cuộn xuống dưới cùng
    }

    // --- TRÍ TUỆ CỦA AI (DỮ LIỆU TỪ WEBSITE) ---
    function getBotResponse(input) {
        // Logic kiểm tra từ khóa (Keywords Matching)
        
        // 1. Về Lịch sử / Thành lập
        if (input.includes('năm nào') || input.includes('thành lập') || input.includes('lịch sử') || input.includes('bao nhiêu năm')) {
            return "Trường được thành lập ngày <b>12/09/1964</b>. Năm 2024, trường tự hào kỷ niệm <b>60 năm</b> xây dựng và phát triển.";
        }
        
        // 2. Về Tuyển sinh
        if (input.includes('tuyển sinh') || input.includes('lớp 10') || input.includes('hồ sơ') || input.includes('thi vào')) {
            return "Tuyển sinh Lớp 10 năm 2025-2026:<br>- Đối tượng: Sinh năm 2010.<br>- Phát hồ sơ: <b>Tháng 4</b>.<br>- Thi tuyển: <b>Tháng 6</b>.";
        }
        
        // 3. Về Học phí
        if (input.includes('học phí') || input.includes('tiền học') || input.includes('đóng tiền')) {
            return "Học phí áp dụng năm 2025: <b>170.000 VNĐ/tháng</b> (theo NQ 180/2025/NQ-HĐND). Nếu học Online thu 75%.";
        }
        
        // 4. Về Địa chỉ
        if (input.includes('địa chỉ') || input.includes('ở đâu') || input.includes('vị trí')) {
            return "Địa chỉ trường tại: <b>Số 479 Trần Phú, Thị trấn Hương Khê, Hà Tĩnh</b> (Đối diện hồ Bình Sơn).";
        }

        // 5. Về CLB
        if (input.includes('clb') || input.includes('câu lạc bộ') || input.includes('ngoại khóa')) {
            return "Trường có nhiều CLB sôi nổi: Bóng đá, Âm nhạc, Robotics, Tiếng Anh (English Club), Tình nguyện Hoa Phượng Đỏ...";
        }

        // 6. Quy định / Nội quy
        if (input.includes('nội quy') || input.includes('đồng phục') || input.includes('giờ học') || input.includes('xe máy')) {
            return "Học sinh đi học mặc áo trắng có logo. Cấm đi xe máy trên 50cc. Giờ truy bài: Sáng 6h45, Chiều 13h45.";
        }

        // 7. Các lời chào xã giao
        if (input.includes('xin chào') || input.includes('hi') || input.includes('hello')) {
            return "Chào bạn! Mình là AI của THPT Hương Khê. Mình có thể giúp gì cho bạn?";
        }
        if (input.includes('cảm ơn')) {
            return "Không có chi! Chúc bạn một ngày tốt lành.";
        }

        // Mặc định khi không hiểu
        return "Xin lỗi, mình chưa hiểu câu hỏi này. Bạn hãy thử hỏi về: <b>Học phí, Tuyển sinh, Địa chỉ</b> hoặc liên hệ Hotline nhà trường nhé!";
    }
});
