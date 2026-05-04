document.addEventListener("DOMContentLoaded", () => {

    // 1. Анимация шторки прелоадера
    const openBtn = document.getElementById('open-invitation');
    const curtainContainer = document.getElementById('curtain');

    openBtn.addEventListener('click', () => {
        curtainContainer.classList.add('opened');
        // После открытия запускаем анимации элементов при скролле
        setTimeout(initScrollAnimations, 500);
    });

    // 2. Анимация появления контента при скролле (Intersection Observer)
    function initScrollAnimations() {
        const sections = document.querySelectorAll('.section');

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            // Hero секция уже видна, её не анимируем скроллом
            if (!section.classList.contains('hero')) {
                observer.observe(section);
            } else {
                section.classList.add('visible');
            }
        });
    }



    // 4. Таймер обратного отсчета
    const countDownDate = new Date("Aug 1, 2026 16:00:00").getTime();

    const timerInterval = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days < 10 ? '0' + days : days;
        document.getElementById("hours").innerHTML = hours < 10 ? '0' + hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("timer").innerHTML = "Ура! День настал!";
        }
    }, 1000);



    // 6. Navigation Dots (Apple style)
    const sectionsObj = document.querySelectorAll('.section');
    const indicatorContainer = document.getElementById('scroll-indicator');

    if (indicatorContainer && sectionsObj.length > 0) {
        sectionsObj.forEach((sec, index) => {
            const dot = document.createElement('div');
            dot.classList.add('scroll-dot');
            if (index === 0) dot.classList.add('active');

            // Клик для прокрутки к секции
            dot.addEventListener('click', () => {
                sec.scrollIntoView({ behavior: 'smooth' });
            });
            indicatorContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.scroll-dot');

        // Отслеживаем прокрутку окна для более точного определения центра экрана
        window.addEventListener('scroll', () => {
            let currentActiveIndex = 0;
            let minDistanceToCenter = Infinity;
            const windowCenter = window.innerHeight / 2;

            sectionsObj.forEach((sec, index) => {
                const rect = sec.getBoundingClientRect();
                const secCenter = rect.top + rect.height / 2;

                // Расстояние от центра секции до центра экрана
                const distanceToCenter = Math.abs(windowCenter - secCenter);

                if (distanceToCenter < minDistanceToCenter) {
                    minDistanceToCenter = distanceToCenter;
                    currentActiveIndex = index;
                }
            });

            // Обновляем активную точку
            dots.forEach(d => d.classList.remove('active'));
            if (dots[currentActiveIndex]) {
                dots[currentActiveIndex].classList.add('active');
            }
        });
    }
});
