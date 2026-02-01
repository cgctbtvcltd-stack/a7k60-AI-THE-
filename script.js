/* script.js - Tích hợp AI Chatbot V3 & Hiệu ứng */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- PHẦN 1: GIỮ NGUYÊN CÁC HIỆU ỨNG GIAO DIỆN ---
    
    // 1.1 Kích hoạt AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 100 });
    }

    // 1.2 Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) header.classList.add('sticky');
        else header.classList.remove('sticky');
        
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


    // --- PHẦN 2: LOGIC CHATBOT (KHÔNG ĐỔI) ---

    const chatToggle = document.getElementById('chat-toggle-btn');
    const chatBox = document.getElementById('chat-box');
    const chatClose = document.getElementById('chat-close-btn');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send-btn');
    const chatBody = document.getElementById('chat-body');

    if(chatToggle) {
        chatToggle.addEventListener('click', () => chatBox.classList.add('active'));
        chatClose.addEventListener('click', () => chatBox.classList.remove('active'));

        function handleChat() {
            const userText = chatInput.value.trim();
            if (userText === "") return;

            addMessage(userText, 'user-message');
            chatInput.value = '';

            // AI trả lời nhanh hơn (0.5s)
            setTimeout(() => {
                const botReply = getBotResponse(userText.toLowerCase());
                addMessage(botReply, 'bot-message');
            }, 500);
        }

        chatSend.addEventListener('click', handleChat);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChat();
        });

        function addMessage(text, className) {
            const div = document.createElement('div');
            div.className = `message ${className}`;
            div.innerHTML = text;
            chatBody.appendChild(div);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }


    // --- PHẦN 3: BỘ NÃO AI (THÊM NHIỀU CÂU HỎI MỚI) ---
    function getBotResponse(input) {
        
        // NHÓM 1: LỊCH SỬ & TỔNG QUAN
        if (input.includes('năm nào') || input.includes('thành lập') || input.includes('lịch sử')) {
            return "Trường thành lập ngày <b>12/09/1964</b>. Trải qua 60 năm phát triển, trường đã vinh dự nhận Huân chương Lao động hạng Nhì.";
        }
        if (input.includes('tại sao') || input.includes('chọn trường') || input.includes('có tốt không')) {
            return "THPT Hương Khê là ngôi trường 'Cánh chim đầu đàn' của huyện với bề dày 60 năm, CSVC hiện đại, đội ngũ giáo viên giỏi và phong trào đoàn hội sôi nổi. Đây là môi trường lý tưởng để bạn phát triển!";
        }

        // NHÓM 2: NHÂN SỰ & GIÁO VIÊN
        if (input.includes('hiệu trưởng') || input.includes('thầy nào')) {
            return "Hiệu trưởng nhà trường là <b>Thầy Hồ Đức Cương</b>. Các Phó Hiệu trưởng gồm thầy Phan Thanh Toàn, cô Nguyễn Thị Hải Lý...";
        }
        if (input.includes('giáo viên') || input.includes('thầy cô')) {
            return "Trường có hơn 100 cán bộ giáo viên, 100% đạt chuẩn, nhiều thầy cô có trình độ Thạc sĩ và là Giáo viên dạy giỏi cấp Tỉnh.";
        }

        // NHÓM 3: TUYỂN SINH & HỌC TẬP
        if (input.includes('tuyển sinh') || input.includes('lớp 10') || input.includes('thi vào')) {
            return "Tuyển sinh lớp 10 năm 2025-2026:<br>1. Đối tượng: Sinh 2010.<br>2. Môn thi: Toán, Văn, Anh.<br>3. Thời gian: Tháng 6/2026.<br>Bạn nhớ theo dõi Website để cập nhật lịch thi nhé!";
        }
        if (input.includes('lịch học') || input.includes('giờ học') || input.includes('mấy giờ')) {
            return "Buổi sáng: 6h45 truy bài, 7h00 vào học.<br>Buổi chiều: 13h45 truy bài, 14h00 vào học.<br>Mỗi buổi học thường kéo dài 4-5 tiết.";
        }
        if (input.includes('nghỉ tết') || input.includes('lịch nghỉ')) {
            return "Lịch nghỉ Tết Nguyên Đán 2026 dự kiến bắt đầu từ ngày <b>20/01/2026</b>. Chúc bạn kỳ nghỉ vui vẻ!";
        }

        // NHÓM 4: TÀI CHÍNH & THỦ TỤC
        if (input.includes('học phí') || input.includes('tiền học')) {
            return "Học phí 2025-2026 là <b>170.000đ/tháng</b>. Các khoản thu khác (Bảo hiểm, nước uống...) thực hiện đúng theo quy định nhà nước.";
        }
        if (input.includes('chuyển trường') || input.includes('rút hồ sơ') || input.includes('học bạ')) {
            return "Để rút hồ sơ hoặc chuyển trường, phụ huynh cần đến <b>Phòng Văn thư</b> vào giờ hành chính để được hướng dẫn thủ tục.";
        }

        // NHÓM 5: HOẠT ĐỘNG & CLB
        if (input.includes('đoàn trường') || input.includes('bí thư')) {
            return "Đoàn trường là nơi tổ chức các hoạt động sôi nổi như S-Race, Chủ nhật xanh, Văn nghệ... Bí thư Đoàn trường là thầy giáo năng động, nhiệt huyết.";
        }
        if (input.includes('clb') || input.includes('câu lạc bộ')) {
            return "Trường có rất nhiều CLB: <br>- Học thuật: Tiếng Anh, Tin học, STEM.<br>- Năng khiếu: Bóng đá, Guitar, Múa.<br>- Kỹ năng: Tình nguyện Hoa Phượng Đỏ, Truyền thông.";
        }
        if (input.includes('thư viện') || input.includes('sách')) {
            return "Thư viện trường mở cửa các ngày trong tuần. Hiện CLB Sách đang hoạt động rất mạnh, vừa ra mắt số 01 về tiểu thuyết 'Người Mẹ'.";
        }

        // NHÓM 6: CƠ SỞ VẬT CHẤT & TIỆN ÍCH
        if (input.includes('cơ sở vật chất') || input.includes('phòng học')) {
            return "Trường có 3 dãy nhà cao tầng, Nhà đa năng, Sân bóng nhân tạo, Phòng Lab thí nghiệm và khuôn viên Xanh - Sạch - Đẹp.";
        }
        if (input.includes('nhà xe') || input.includes('gửi xe')) {
            return "Nhà xe học sinh nằm phía sau dãy nhà A, có mái che và camera an ninh giám sát 24/7.";
        }
        if (input.includes('canteen') || input.includes('căng tin') || input.includes('ăn sáng')) {
            return "Canteen trường phục vụ ăn sáng, nước uống đảm bảo vệ sinh ATTP. Giờ ra chơi là lúc đông vui nhất!";
        }

        // NHÓM 7: QUY ĐỊNH
        if (input.includes('điện thoại')) {
            return "Học sinh <b>KHÔNG</b> được sử dụng điện thoại trong giờ học (trừ khi giáo viên cho phép để học tập).";
        }
        if (input.includes('xe máy')) {
            return "Cấm học sinh đi xe máy trên 50cc. Nếu đi xe đạp điện/xe máy điện phải đội mũ bảo hiểm.";
        }

        // NHÓM 8: GIAO TIẾP
        if (input.includes('chào') || input.includes('hello')) return "Chào bạn! Mình là AI siêu cấp của THPT Hương Khê. Bạn cần hỏi gì nào?";
        if (input.includes('cảm ơn')) return "Không có chi! Cần gì cứ hỏi mình nhé.";
        if (input.includes('tạm biệt')) return "Bye bye! Hẹn gặp lại bạn.";

        // Mặc định
        return "Câu này khó quá! Bạn thử hỏi về: <b>Tuyển sinh, Lịch học, CLB, Học phí</b> hoặc <b>Đoàn trường</b> xem sao?";
    }
});
