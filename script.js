document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        header.classList.toggle('sticky', window.scrollY > 50);
        
        // 2. Scroll to Top Button
        const btn = document.querySelector('.to-top-btn');
        if(btn) btn.classList.toggle('show', window.scrollY > 300);
    });

    // 3. Mobile Menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav-links');
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // 4. Create Scroll Top Button
    const btnTop = document.createElement('div');
    btnTop.className = 'to-top-btn';
    btnTop.innerHTML = '⬆';
    document.body.appendChild(btnTop);
    btnTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
});