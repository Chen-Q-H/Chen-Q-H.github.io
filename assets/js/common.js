// aHR0cHM6Ly9naXRodWIuY29tL2x1b3N0MjYvYWNhZGVtaWMtaG9tZXBhZ2U=
$(function () {
    lazyLoadOptions = {
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        effectTime: 300,
        placeholder: "",
        onError: function(element) {
            console.log('[lazyload] Error loading ' + element.data('src'));
        },
        afterLoad: function(element) {
            if (element.is('img')) {
                // remove background-image style
                element.css('background-image', 'none');
                element.css('min-height', '0');
            } else if (element.is('div')) {
                // set the style to background-size: cover; 
                element.css('background-size', 'cover');
                element.css('background-position', 'center');
            }
        }
    }

    $('img.lazy, div.lazy:not(.always-load)').Lazy({visibleOnly: true, ...lazyLoadOptions});
    $('div.lazy.always-load').Lazy({visibleOnly: false, ...lazyLoadOptions});

    $('[data-toggle="tooltip"]').tooltip()

    // 优化Masonry布局初始化，减少布局重排
    var $grid = $('.grid');
    if ($grid.length > 0) {
        // 等待所有图片加载完成后再初始化Masonry
        $grid.imagesLoaded().done(function() {
            $grid.masonry({
                "percentPosition": false, // 禁用百分比定位，使用固定列宽
                "itemSelector": ".grid-item",
                "columnWidth": ".grid-sizer",
                "transitionDuration": 0 // 禁用过渡动画
            });
        });
    }

    function updateSidebarCard() {
        var placeholder = document.getElementById('sidebar-placeholder');
        var card = document.getElementById('sidebar-card');
        if (!placeholder || !card) return;

        // 直接设置最终宽度和位置，不使用动画
        if (window.innerWidth >= 768) {
            var rect = placeholder.getBoundingClientRect();
            card.style.width = rect.width + 'px';
            card.style.left = rect.left + 'px';
            placeholder.style.minHeight = card.offsetHeight + 'px';
        } else {
            card.style.width = '';
            card.style.left = '';
            placeholder.style.minHeight = '';
        }
    }

    function updateYearNavCard() {
        var placeholder = document.getElementById('year-nav-placeholder');
        var card = document.getElementById('year-nav-card');
        if (!placeholder || !card) return;

        // 直接设置最终宽度和位置，不使用动画
        var rect = placeholder.getBoundingClientRect();
        card.style.width = rect.width + 'px';
        card.style.left = rect.left + 'px';
    }

    // 延迟执行卡片更新，确保页面完全加载
    setTimeout(function() {
        updateSidebarCard();
        updateYearNavCard();
    }, 100);
    window.addEventListener('resize', function() {
        updateSidebarCard();
        updateYearNavCard();
    });

    // 生成樱花
    function createSakura() {
        const sakura = document.createElement('div');
        sakura.className = 'sakura';
        sakura.style.left = Math.random() * 100 + '%';
        sakura.style.animationDuration = (Math.random() * 10 + 10) + 's';
        sakura.style.animationDelay = Math.random() * 5 + 's';
        sakura.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        document.body.appendChild(sakura);
        
        setTimeout(() => {
            sakura.remove();
        }, 20000);
    }

    // 生成星星
    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = (Math.random() * 3 + 1) + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(star);
    }

    // 初始化樱花和星星
    function initAnimeElements() {
        // 生成樱花
        setInterval(createSakura, 1000);
        
        // 生成星星
        for (let i = 0; i < 50; i++) {
            setTimeout(createStar, i * 100);
        }
    }

    // 启动动漫元素
    initAnimeElements();
})
