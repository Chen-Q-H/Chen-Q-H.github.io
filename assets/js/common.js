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

    var $grid = $('.grid').masonry({
        "percentPosition": true,
        "itemSelector": ".grid-item",
        "columnWidth": ".grid-sizer"
    });
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress(function () {
        $grid.masonry('layout');
    });

    $(".lazy").on("load", function () {
        $grid.masonry('layout');
    });

    function updateSidebarCard() {
        var placeholder = document.getElementById('sidebar-placeholder');
        var card = document.getElementById('sidebar-card');
        if (!placeholder || !card) return;

        var rect = placeholder.getBoundingClientRect();
        card.style.width = rect.width + 'px';
        card.style.left = rect.left + 'px';
        placeholder.style.minHeight = card.offsetHeight + 'px';
    }

    function updateYearNavCard() {
        var placeholder = document.getElementById('year-nav-placeholder');
        var card = document.getElementById('year-nav-card');
        if (!placeholder || !card) return;

        var rect = placeholder.getBoundingClientRect();
        card.style.width = rect.width + 'px';
        card.style.left = rect.left + 'px';
    }

    updateSidebarCard();
    updateYearNavCard();
    window.addEventListener('resize', function() {
        updateSidebarCard();
        updateYearNavCard();
    });
})
