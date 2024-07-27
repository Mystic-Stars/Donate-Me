document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById('qrModal');
    const btn = document.getElementById('showQRCode');
    const spans = document.getElementsByClassName('close');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const backToTop = document.getElementById('backToTop');
    const scrollProgress = document.querySelector('.scroll-progress');

    btn.onclick = function() {
        modal.style.display = "block";
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    for (let span of spans) {
        span.onclick = function() {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = "none";
            }, 300);
        }
    }

    // 主题切换功能
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        updateThemeToggleText();
    });

    function updateThemeToggleText() {
        themeToggle.textContent = body.classList.contains('dark-mode') ? '🌞' : '🌖';
    }

    // 初始化主题
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme.matches) {
        body.classList.add('dark-mode');
    }
    updateThemeToggleText();

    // 监听系统颜色模式变化
    prefersDarkScheme.addListener((e) => {
        if (e.matches) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        updateThemeToggleText();
    });

    // 添加滚动动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.profile-card, .donate-card, .acknowledgments-card, .donate-option, .acknowledgments-item, .acknowledgments-instructions').forEach(el => {
        observer.observe(el);
    });

    // 添加鼠标悬停效果
    const cards = document.querySelectorAll('.profile-card, .donate-card, .acknowledgments-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 添加打字机效果
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    const subtitle = document.querySelector('.subtitle');
    typeWriter(subtitle, "您对我的每一份支持，都将是我前进的动力", 100);

    // 滚动进度条
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    });

    // 返回顶部按钮
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 动态背景
    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 3 + 2}s`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        document.querySelector('.dynamic-bg').appendChild(star);

        star.addEventListener('animationend', () => {
            star.remove();
            createStar();
        });
    }

    for (let i = 0; i < 50; i++) {
        createStar();
    }
});