/* script.js - PHIÊN BẢN "BÁCH KHOA TOÀN THƯ" CHO THPT HƯƠNG KHÊ */

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
    // PHẦN 2: CẤU HÌNH AI "SIÊU TRÍ TUỆ"
    // ============================================================

    const chatToggle = document.getElementById('chat-toggle-btn');
    const chatBox = document.getElementById('chat-box');
    const chatClose = document.getElementById('chat-close-btn');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send-btn');
    const chatBody = document.getElementById('chat-body');

    /* KNOWLEDGE BASE: BỘ NÃO CHỨA MỌI THÔNG TIN VỀ TRƯỜNG
       Được chia thành các nhóm chủ đề cụ thể để bao quát mọi câu hỏi.
    */
    const knowledgeBase = [
        // --- NHÓM 1: THÔNG TIN CƠ BẢN & LIÊN HỆ ---
        {
            keywords: ["địa chỉ", "ở đâu", "vị trí", "đường nào", "map"],
            answer: "📍 <b>Địa chỉ:</b> Số 479 Trần Phú, Thị trấn Hương Khê, Huyện Hương Khê, Tỉnh Hà Tĩnh (Đối diện hồ Bình Sơn)."
        },
        {
            keywords: ["số điện thoại", "sđt", "hotline", "liên hệ", "gọi"],
            answer: "📞 <b>Hotline văn phòng:</b> 0239.xxxx.xxx (Giờ hành chính).<br>📧 <b>Email:</b> thpthuongkhe@hatinh.edu.vn"
        },
        {
            keywords: ["website", "trang web", "link trường"],
            answer: "🌐 Website chính thức: <a href='http://thpthuongkhe.hatinh.edu.vn' target='_blank'>thpthuongkhe.hatinh.edu.vn</a>"
        },

        // --- NHÓM 2: LỊCH SỬ & THÀNH TÍCH ---
        {
            keywords: ["lịch sử", "thành lập", "bao nhiêu năm", "ngày sinh"],
            answer: "🏛️ Trường thành lập ngày <b>12/09/1964</b>. Tiền thân là Trường cấp 3 Hương Khê. Năm 2024, trường kỷ niệm <b>60 năm</b> xây dựng và phát triển."
        },
        {
            keywords: ["thành tích", "huân chương", "khen thưởng", "giải thưởng"],
            answer: "🏆 <b>Thành tích nổi bật:</b><br>- Huân chương Lao động hạng Nhì (2013).<br>- Đơn vị Anh hùng thời kỳ đổi mới.<br>- Nhiều giải HSG Quốc gia môn Tin, Toán, Văn."
        },

        // --- NHÓM 3: BAN GIÁM HIỆU & GIÁO VIÊN ---
        {
            keywords: ["hiệu trưởng", "ai đứng đầu", "thầy cương"],
            answer: "👨‍🏫 <b>Hiệu trưởng:</b> Thầy Hồ Đức Cương.<br>Thầy là người tâm huyết, luôn đi đầu trong đổi mới giáo dục tại nhà trường."
        },
        {
            keywords: ["phó hiệu trưởng", "ban giám hiệu", "hiệu phó"],
            answer: "Ban Giám hiệu còn có các thầy cô Phó Hiệu trưởng phụ trách chuyên môn và cơ sở vật chất, luôn sát sao với học sinh."
        },
        {
            keywords: ["giáo viên", "thầy cô", "chất lượng dạy"],
            answer: "Đội ngũ giáo viên 100% đạt chuẩn, nhiều Thạc sĩ và Giáo viên dạy giỏi cấp Tỉnh. Thầy cô rất nhiệt tình và thương học sinh."
        },

        // --- NHÓM 4: TUYỂN SINH (QUAN TRỌNG) ---
        {
            keywords: ["tuyển sinh", "lớp 10", "thi vào", "chỉ tiêu"],
            answer: "🎓 <b>Tuyển sinh Lớp 10 (2025-2026):</b><br>- Đối tượng: Sinh năm 2010.<br>- Hình thức: Thi tuyển 3 môn (Toán, Văn, Anh).<br>- Thời gian thi: Dự kiến đầu tháng 6/2026."
        },
        {
            keywords: ["hồ sơ", "giấy tờ", "đăng ký thi"],
            answer: "📁 <b>Hồ sơ gồm:</b><br>1. Đơn đăng ký dự thi (theo mẫu).<br>2. Học bạ THCS (bản chính).<br>3. Giấy khai sinh (bản sao).<br>4. Giấy chứng nhận ưu tiên (nếu có)."
        },
        {
            keywords: ["điểm chuẩn", "lấy bao nhiêu điểm", "điểm thi"],
            answer: "Điểm chuẩn thay đổi theo từng năm. Năm ngoái điểm chuẩn vào khoảng [Cập nhật số điểm]. Bạn nên ôn tập kỹ 3 môn Toán, Văn, Anh nhé!"
        },

        // --- NHÓM 5: TÀI CHÍNH & HỌC PHÍ ---
        {
            keywords: ["học phí", "tiền học", "đóng tiền", "bao nhiêu tiền"],
            answer: "💰 <b>Học phí 2025-2026:</b> 170.000 VNĐ/tháng (theo Nghị quyết 180 của HĐND Tỉnh Hà Tĩnh).<br>Học Online thu 75% mức này."
        },
        {
            keywords: ["miễn giảm", "hộ nghèo", "chính sách"],
            answer: "Nhà trường miễn giảm học phí cho: Hộ nghèo, Hộ cận nghèo, Con thương binh/liệt sĩ, Học sinh khuyết tật... (Cần nộp giấy chứng nhận)."
        },

        // --- NHÓM 6: CƠ SỞ VẬT CHẤT ---
        {
            keywords: ["cơ sở vật chất", "trường rộng", "phòng học"],
            answer: "🏫 Khuôn viên rộng <b>30.000m²</b>, gồm:<br>- 3 dãy nhà cao tầng kiên cố.<br>- Phòng máy tính, Lab thí nghiệm Lý-Hóa-Sinh.<br>- Thư viện đạt chuẩn tiên tiến."
        },
        {
            keywords: ["sân bóng", "thể thao", "nhà đa năng"],
            answer: "⚽ Trường có Sân bóng đá cỏ nhân tạo và Nhà đa năng rộng rãi phục vụ môn Thể dục và các giải đấu thể thao."
        },
        {
            keywords: ["nhà xe", "gửi xe", "xe đạp"],
            answer: "Nhà xe học sinh nằm sau dãy nhà A, có mái che và camera an ninh. Giá vé gửi xe theo quy định của nhà trường."
        },
        {
            keywords: ["canteen", "căng tin", "ăn sáng"],
            answer: "Canteen trường sạch sẽ, phục vụ ăn sáng (xôi, bánh mì) và nước uống giải khát. Là nơi tụ tập yêu thích giờ ra chơi! 🍔"
        },

        // --- NHÓM 7: NỘI QUY & NỀ NẾP ---
        {
            keywords: ["đồng phục", "mặc gì", "áo trắng"],
            answer: "👕 <b>Đồng phục:</b><br>- Mùa hè: Áo sơ mi trắng (có logo), quần tối màu.<br>- Mùa đông: Áo khoác gió đồng phục.<br>- Lưu ý: Luôn đeo thẻ học sinh và đi giày/dép quai hậu."
        },
        {
            keywords: ["điện thoại", "di động", "mang máy"],
            answer: "📵 <b>Quy định:</b> Học sinh KHÔNG được sử dụng điện thoại trong giờ học (trừ khi GV cho phép để phục vụ học tập). Vi phạm sẽ bị tịch thu và hạ hạnh kiểm."
        },
        {
            keywords: ["xe máy", "50cc", "đi xe"],
            answer: "🚫 Học sinh THPT chỉ được đi xe đạp điện hoặc xe máy dưới 50cc. Cấm đi xe máy phân khối lớn. Bắt buộc đội mũ bảo hiểm."
        },
        {
            keywords: ["giờ học", "mấy giờ", "truy bài"],
            answer: "⏰ <b>Thời gian biểu:</b><br>- Sáng: 6h45 Truy bài -> 7h00 Vào học.<br>- Chiều: 13h45 Truy bài -> 14h00 Vào học."
        },

        // --- NHÓM 8: HOẠT ĐỘNG & CLB ---
        {
            keywords: ["clb", "câu lạc bộ", "tham gia"],
            answer: "🌟 Trường có nhiều CLB sôi nổi:<br>- CLB Tiếng Anh (English Club).<br>- CLB Sách & Hành động.<br>- CLB Bóng đá, Guitar, Truyền thông.<br>Đăng ký tham gia vào đầu năm học nhé!"
        },
        {
            keywords: ["đoàn trường", "bí thư", "thanh niên"],
            answer: "Đoàn trường là nòng cốt trong các phong trào: Tiếp sức mùa thi, Chủ nhật xanh, Văn nghệ 20/11, Giải bóng đá trường..."
        },
        {
            keywords: ["s-race", "chạy", "giải"],
            answer: "🏃 Trường đang hưởng ứng giải chạy <b>S-Race School Online 2025</b>. Đây là hoạt động thể thao lớn nhằm nâng cao sức khỏe học đường."
        },

        // --- NHÓM 9: CÂU HỎI ĐỜI THƯỜNG (GIAO TIẾP TỰ NHIÊN) ---
        {
            keywords: ["xin chào", "hi", "hello", "alo"],
            answer: "Chào bạn! 👋 Mình là AI Trợ lý của THPT Hương Khê. Mình biết tuốt về trường, bạn cứ hỏi thoải mái nhé!"
        },
        {
            keywords: ["bạn tên gì", "ai tạo ra", "là ai"],
            answer: "Mình là Chatbot AI do đội ngũ kỹ thuật của trường tạo ra để hỗ trợ các bạn học sinh và phụ huynh. 🤖"
        },
        {
            keywords: ["cảm ơn", "thank", "ok", "tốt"],
            answer: "Rất vui được giúp bạn! Nếu thấy hữu ích hãy giới thiệu website trường cho bạn bè nhé! ❤️"
        },
        {
            keywords: ["tạm biệt", "bye", "ngủ đây"],
            answer: "Tạm biệt! Chúc bạn một ngày tốt lành. Hẹn gặp lại! 👋"
        },
        {
            keywords: ["người yêu", "crush", "tán tỉnh"],
            answer: "Mình là AI nên chỉ yêu... dữ liệu thôi! Nhưng chúc bạn sớm tìm được 'nửa kia' dưới mái trường Hương Khê nhé! 😉"
        },
        
        // --- NHÓM 10: CÁC VẤN ĐỀ KHÁC ---
        {
            keywords: ["chuyển trường", "rút học bạ"],
            answer: "Thủ tục chuyển trường cần liên hệ Phòng Văn thư để được hướng dẫn. Cần có đơn xin chuyển trường và ý kiến của nơi chuyển đi/chuyển đến."
        },
        {
            keywords: ["nghỉ tết", "lịch nghỉ"],
            answer: "🧧 Lịch nghỉ Tết Nguyên Đán dự kiến từ <b>20/01/2026</b>. Nhớ hoàn thành bài tập tết trước khi đi chơi nhé!"
        }
    ];

    // --- SETUP GIAO DIỆN CHAT ---
    if(chatToggle) {
        
        // 1. Tạo Gợi ý nhanh (Quick Chips)
        const suggestionHTML = `
            <div class="chat-suggestions">
                <div class="suggestion-chip" onclick="askAI('Tuyển sinh 2025')">Tuyển sinh</div>
                <div class="suggestion-chip" onclick="askAI('Học phí bao nhiêu?')">Học phí</div>
                <div class="suggestion-chip" onclick="askAI('Các CLB trong trường')">Các CLB</div>
                <div class="suggestion-chip" onclick="askAI('Địa chỉ trường')">Địa chỉ</div>
            </div>
        `;
        chatBox.insertBefore(createRange(suggestionHTML), chatBody);

        // 2. Hiệu ứng Typing
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

        // Hàm gọi từ nút Gợi ý
        window.askAI = function(text) {
            chatInput.value = text;
            handleChat();
        }

        function handleChat() {
            const userText = chatInput.value.trim();
            if (userText === "") return;

            // Hiện tin nhắn người dùng
            addMessage(userText, 'user-message');
            chatInput.value = '';

            // Bật hiệu ứng đang gõ
            showTyping(true);

            // Giả lập thời gian suy nghĩ (ngẫu nhiên 0.5s - 1s)
            const delay = Math.floor(Math.random() * 500) + 500;

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

        // --- THUẬT TOÁN TÌM KIẾM CÂU TRẢ LỜI (FUZZY LOGIC CAO CẤP) ---
        function findBestMatch(input) {
            // 1. Quét toàn bộ Knowledge Base
            for (const item of knowledgeBase) {
                // Kiểm tra từng từ khóa trong mảng keywords
                for (const key of item.keywords) {
                    if (input.includes(key)) {
                        return item.answer;
                    }
                }
            }
            
            // 2. Fallback thông minh (Khi không hiểu)
            const fallbacks = [
                "Câu hỏi này thú vị đấy! Nhưng hiện tại dữ liệu của mình chưa cập nhật thông tin này. Bạn thử hỏi về <b>Tuyển sinh</b> hoặc <b>Quy chế</b> xem?",
                "Xin lỗi, mình chưa hiểu rõ ý bạn lắm. Bạn có thể hỏi ngắn gọn hơn không? Ví dụ: 'Học phí', 'Địa chỉ'...",
                "Vấn đề này hơi chuyên sâu, bạn vui lòng liên hệ trực tiếp Văn phòng nhà trường qua Hotline 0239.xxxx.xxx nhé!",
                "Mình đang học hỏi thêm mỗi ngày. Bạn thử hỏi câu khác xem, ví dụ: 'Hiệu trưởng là ai?'"
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
