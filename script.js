/* script.js - ULTIMATE AI VERSION: TRẢ LỜI ĐA DẠNG MỌI CHỦ ĐỀ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================================
    // PHẦN 1: GIAO DIỆN & HIỆU ỨNG (KHÔNG ĐỔI)
    // ============================================================
    if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true, offset: 100 });

    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) header.classList.add('sticky');
        else header.classList.remove('sticky');
        
        const toTopBtn = document.querySelector('.to-top-btn');
        if (toTopBtn) toTopBtn.classList.toggle('show', window.scrollY > 300);
    });

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

    const toTopBtn = document.createElement('div');
    toTopBtn.className = 'to-top-btn';
    toTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(toTopBtn);
    toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


    // ============================================================
    // PHẦN 2: CẤU HÌNH AI CHATBOT THÔNG MINH
    // ============================================================

    const chatToggle = document.getElementById('chat-toggle-btn');
    const chatBox = document.getElementById('chat-box');
    const chatClose = document.getElementById('chat-close-btn');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send-btn');
    const chatBody = document.getElementById('chat-body');

    // --- KHO DỮ LIỆU KHỔNG LỒ (BIG DATA) ---
    const knowledgeBase = [
        // --- NHÓM 1: CHUYÊN MÔN VỀ TRƯỜNG (Ưu tiên số 1) ---
        {
            keywords: ["tuyển sinh", "lớp 10", "thi vào", "hồ sơ", "đăng ký", "nguyện vọng"],
            answer: "🎓 <b>Tuyển sinh 2025-2026:</b><br>• Đối tượng: Sinh năm 2010.<br>• Môn thi: Toán, Văn, Anh.<br>• Hồ sơ: Học bạ, Khai sinh, Đơn ĐKDT.<br>• Thời gian: Phát hồ sơ tháng 4, Thi tháng 6."
        },
        {
            keywords: ["học phí", "tiền học", "đóng tiền", "lệ phí"],
            answer: "💰 <b>Học phí 2025:</b> 170.000đ/tháng (theo NQ 180 HĐND Tỉnh).<br>• Học Online: Thu 75%.<br>• Miễn giảm cho hộ nghèo, cận nghèo."
        },
        {
            keywords: ["lịch sử", "thành lập", "năm nào", "bao nhiêu tuổi"],
            answer: "🏛️ Trường thành lập ngày <b>12/09/1964</b>. Năm 2024, trường tự hào kỷ niệm <b>60 năm</b> xây dựng và phát triển."
        },
        {
            keywords: ["địa chỉ", "ở đâu", "vị trí", "map"],
            answer: "📍 Địa chỉ: <b>479 Trần Phú, TT. Hương Khê, Hà Tĩnh</b> (Đối diện hồ Bình Sơn). Trường nằm ngay trung tâm thị trấn, rất dễ tìm!"
        },
        {
            keywords: ["hiệu trưởng", "ban giám hiệu", "thầy cô"],
            answer: "👨‍🏫 Hiệu trưởng: <b>Thầy Hồ Đức Cương</b>.<br>Đội ngũ giáo viên nhà trường 100% đạt chuẩn, tâm huyết và giàu kinh nghiệm."
        },
        {
            keywords: ["clb", "câu lạc bộ", "ngoại khóa"],
            answer: "⚽ Trường có nhiều CLB: Tiếng Anh, Sách, Bóng đá, Robotics, Tình nguyện... Bạn thích tham gia mảng nào?"
        },
        {
            keywords: ["s-race", "chạy bộ", "sự kiện mới"],
            answer: "🏃 Sự kiện HOT nhất: <b>S-Race School Online 2025</b>. Toàn trường đang tích cực tham gia chạy bộ hưởng ứng đấy!"
        },
        {
            keywords: ["khám mắt", "y tế"],
            answer: "🏥 Trường vừa phối hợp với BV Đa khoa Sài Gòn Hà Tĩnh khám mắt miễn phí cho học sinh. Y tế học đường luôn được chú trọng."
        },
        
        // --- NHÓM 2: CÂU HỎI ĐỜI SỐNG & GIAO TIẾP (Tạo cảm giác như người thật) ---
        {
            keywords: ["xin chào", "hi", "hello", "bạn là ai", "tên gì"],
            answer: "Chào bạn! Mình là <b>AI Trợ lý ảo của THPT Hương Khê</b>. Mình ở đây để giải đáp mọi thắc mắc của bạn về nhà trường và hơn thế nữa! 😄"
        },
        {
            keywords: ["khỏe không", "có mệt không", "thế nào"],
            answer: "Cảm ơn bạn đã hỏi thăm! Là AI nên mình không biết mệt, lúc nào cũng sẵn sàng 24/7 để hỗ trợ bạn đây! 💪"
        },
        {
            keywords: ["người yêu", "bạn gái", "bạn trai", "crush"],
            answer: "Hihi, tình yêu lớn nhất của mình là được phục vụ các bạn học sinh THPT Hương Khê. Còn bạn, bạn có crush ai trong trường chưa? 😉"
        },
        {
            keywords: ["ăn cơm", "đói", "ăn gì"],
            answer: "Mình chạy bằng điện nên không cần ăn cơm. Nhưng nếu bạn đói, Canteen trường mình có bánh mì và xôi rất ngon đấy! 🍔"
        },
        {
            keywords: ["mấy giờ", "thời gian", "ngày mấy"],
            answer: () => `Bây giờ là <b>${new Date().toLocaleTimeString('vi-VN')}</b> ngày <b>${new Date().toLocaleDateString('vi-VN')}</b>. Đừng quên giờ vào lớp nhé!`
        },
        {
            keywords: ["thời tiết", "mưa", "nắng"],
            answer: "Mình chưa có mắt thần để nhìn trời, nhưng bạn nhớ mang ô/áo mưa khi đi học đề phòng thời tiết thất thường ở Hương Khê nhé! ☔"
        },
        {
            keywords: ["hát", "kể chuyện", "vui"],
            answer: "🎵 *AI cất giọng hát*... Đùa chút thôi, mình hát dở lắm. Nhưng mình có thể kể cho bạn nghe về lịch sử hào hùng 60 năm của trường ta, bạn muốn nghe không?"
        },
        {
            keywords: ["cảm ơn", "thank", "ok"],
            answer: "Không có chi! Rất vui được giúp bạn. Nếu cần gì cứ gọi mình nhé! ❤️"
        },
        {
            keywords: ["tạm biệt", "bye"],
            answer: "Tạm biệt! Chúc bạn một ngày học tập và làm việc thật hiệu quả. Hẹn gặp lại! 👋"
        },

        // --- NHÓM 3: HỌC TẬP & KIẾN THỨC (Trả lời khéo léo) ---
        {
            keywords: ["giải toán", "bài tập", "văn mẫu", "tiếng anh"],
            answer: "Mình là AI tư vấn tuyển sinh nên không giỏi giải bài tập lắm 😅. Tuy nhiên, các thầy cô tổ Tự nhiên và Xã hội trường mình dạy rất hay, bạn hãy chú ý nghe giảng trên lớp nhé!"
        },
        {
            keywords: ["bí quyết", "học giỏi", "kinh nghiệm"],
            answer: "Bí quyết là: Chăm chỉ + Phương pháp đúng. Ở THPT Hương Khê, bạn nên tham gia các CLB học thuật (Sách, Tiếng Anh) để rèn luyện thêm kỹ năng."
        },
        {
            keywords: ["đại học", "nguyện vọng", "ngành nghề"],
            answer: "Trường mình năm nào cũng có tỷ lệ đậu Đại học rất cao. Các thầy cô chủ nhiệm sẽ tư vấn hướng nghiệp kỹ càng cho bạn vào năm lớp 12."
        }
    ];

    // --- SETUP LOGIC CHATBOT ---
    if(chatToggle) {
        
        // 1. Tạo Suggestions (Gợi ý)
        const suggestionHTML = `
            <div class="chat-suggestions">
                <div class="suggestion-chip" onclick="askAI('Tuyển sinh 2025')">Tuyển sinh 2025</div>
                <div class="suggestion-chip" onclick="askAI('Học phí')">Học phí</div>
                <div class="suggestion-chip" onclick="askAI('Mấy giờ rồi?')">Mấy giờ rồi?</div>
                <div class="suggestion-chip" onclick="askAI('Có người yêu chưa?')">Có người yêu chưa?</div>
            </div>
        `;
        chatBox.insertBefore(createRange(suggestionHTML), chatBody);

        // 2. Typing Effect
        const typingHTML = `
            <div class="typing-indicator" id="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        `;
        chatBody.insertAdjacentHTML('beforeend', typingHTML);
        const typingIndicator = document.getElementById('typing-indicator');

        // Event Listeners
        chatToggle.addEventListener('click', () => chatBox.classList.add('active'));
        chatClose.addEventListener('click', () => chatBox.classList.remove('active'));

        window.askAI = function(text) {
            chatInput.value = text;
            handleChat();
        }

        function handleChat() {
            const userText = chatInput.value.trim();
            if (userText === "") return;

            addMessage(userText, 'user-message');
            chatInput.value = '';

            showTyping(true);

            // Giả lập thời gian suy nghĩ (ngẫu nhiên từ 0.5s - 1.5s cho giống thật)
            const delay = Math.floor(Math.random() * 1000) + 500;

            setTimeout(() => {
                const botReply = findBestMatch(userText.toLowerCase());
                showTyping(false);
                addMessage(botReply, 'bot-message');
            }, delay);
        }

        chatSend.addEventListener('click', handleChat);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChat();
        });

        // HÀM TÌM KIẾM THÔNG MINH (FUZZY LOGIC)
        function findBestMatch(input) {
            // 1. Tìm trong Database
            for (const item of knowledgeBase) {
                for (const key of item.keywords) {
                    if (input.includes(key)) {
                        // Nếu câu trả lời là một hàm (ví dụ xem giờ), hãy chạy hàm đó
                        return typeof item.answer === 'function' ? item.answer() : item.answer;
                    }
                }
            }
            
            // 2. Nếu không tìm thấy, trả lời ngẫu nhiên để đỡ nhàm chán
            const fallbacks = [
                "Câu này thú vị quá, nhưng nằm ngoài dữ liệu của mình. Bạn thử hỏi về <b>Tuyển sinh</b> hoặc <b>Học phí</b> xem?",
                "Mình đang học hỏi thêm mỗi ngày. Vấn đề này bạn có thể liên hệ trực tiếp văn phòng nhà trường nhé!",
                "Xin lỗi, mình chưa hiểu ý bạn lắm. Bạn có thể diễn đạt lại không?",
                "Chà, câu hỏi hóc búa ghê! Mình xin phép nợ câu trả lời này nhé. 😅"
            ];
            return fallbacks[Math.floor(Math.random() * fallbacks.length)];
        }

        function addMessage(text, className) {
            const div = document.createElement('div');
            div.className = `message ${className}`;
            div.innerHTML = text;
            chatBody.insertBefore(div, typingIndicator);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        function showTyping(show) {
            if(show) {
                typingIndicator.style.display = 'block';
                chatBody.scrollTop = chatBody.scrollHeight;
            } else {
                typingIndicator.style.display = 'none';
            }
        }

        function createRange(html) {
            return document.createRange().createContextualFragment(html);
        }
    }
});
