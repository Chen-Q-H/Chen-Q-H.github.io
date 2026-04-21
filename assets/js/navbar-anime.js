// 导航栏动漫效果
(function() {
    'use strict';
    
    // 页面刷新时重置滚动位置到顶部
    if (window.history.scrollRestoration) {
        window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    
    // 等待DOM加载完成
    document.addEventListener('DOMContentLoaded', function() {
        // 确保页面加载时滚动到顶部
        window.scrollTo(0, 0);
        
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        // 创建装饰容器
        const decorationsContainer = navbar.querySelector('.navbar-decorations');
        if (!decorationsContainer) return;
        
        // 生成更多动态装饰元素
        generateNavbarDecorations(decorationsContainer);
        
        // 添加滚动效果监听
        window.addEventListener('scroll', function() {
            handleNavbarScroll(navbar);
        });
        
        // 初始调用一次
        handleNavbarScroll(navbar);
    });
    
    // 生成导航栏装饰元素
    function generateNavbarDecorations(container) {
        // 生成更多星星（只在导航栏高度范围内）
        for (let i = 0; i < 8; i++) {
            const star = document.createElement('div');
            star.className = 'navbar-star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%'; // 在导航栏高度范围内随机位置
            star.style.animationDelay = Math.random() * 6 + 's';
            container.appendChild(star);
        }
        
        // 生成更多闪烁光点
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'navbar-sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 4 + 's';
            container.appendChild(sparkle);
        }
        
        // 生成漂浮的心形（只在导航栏高度范围内）
        for (let i = 0; i < 3; i++) {
            const heart = document.createElement('div');
            heart.className = 'navbar-heart';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%'; // 在导航栏高度范围内随机位置
            heart.style.animationDelay = Math.random() * 8 + 's';
            container.appendChild(heart);
        }
    }
    
    // 处理导航栏滚动效果
    function handleNavbarScroll(navbar) {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 根据滚动位置调整装饰元素的透明度
        const decorations = navbar.querySelectorAll('.navbar-star, .navbar-sparkle, .navbar-heart');
        const opacity = Math.max(0.3, 1 - scrollY / 200);
        
        decorations.forEach(el => {
            el.style.opacity = opacity;
        });
    }
    
    // 添加心形样式（通过CSS注入）
    const style = document.createElement('style');
    style.textContent = `
        .navbar-heart {
            position: absolute;
            width: 8px;
            height: 8px;
            background: var(--anime-pink);
            transform: rotate(45deg);
            animation: navbar-heart-float 10s linear infinite;
            opacity: 0.6;
        }
        
        .navbar-heart::before,
        .navbar-heart::after {
            content: '';
            position: absolute;
            width: 8px;
            height: 8px;
            background: var(--anime-pink);
            border-radius: 50%;
        }
        
        .navbar-heart::before {
            top: -4px;
            left: 0;
        }
        
        .navbar-heart::after {
            top: 0;
            left: -4px;
        }
        
        @keyframes navbar-heart-float {
            0% {
                transform: translateY(0) rotate(45deg) scale(0.8);
                opacity: 0;
            }
            20% {
                opacity: 0.6;
                transform: translateY(-20%) rotate(45deg) scale(1);
            }
            80% {
                opacity: 0.6;
                transform: translateY(-80%) rotate(45deg) scale(1);
            }
            100% {
                transform: translateY(-100%) rotate(45deg) scale(0.8);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
})();