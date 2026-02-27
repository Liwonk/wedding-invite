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
            if(!section.classList.contains('hero')) {
                observer.observe(section);
            } else {
                section.classList.add('visible');
            }
        });
    }

    // 3. Обработка чекбоксов алкоголя (не больше 3х)
    const alcoholChecks = document.querySelectorAll('input[name="alcohol"]');
    alcoholChecks.forEach(check => {
        check.addEventListener('change', () => {
            const checkedCount = document.querySelectorAll('input[name="alcohol"]:checked').length;
            if (checkedCount >= 3) {
                // Блокируем остальные
                alcoholChecks.forEach(c => {
                    if (!c.checked) c.disabled = true;
                });
            } else {
                // Разблокируем
                alcoholChecks.forEach(c => c.disabled = false);
            }
            
            // Если выбрал "Не буду пить", отменяем остальные
            if(check.value === "Не буду пить алкоголь" && check.checked) {
                alcoholChecks.forEach(c => {
                    if (c !== check) {
                        c.checked = false;
                        c.disabled = true;
                    }
                });
            } else if (check.value === "Не буду пить алкоголь" && !check.checked) {
                alcoholChecks.forEach(c => c.disabled = false);
            }
        });
    });

    // 4. Таймер обратного отсчета
    const countDownDate = new Date("Sep 5, 2026 15:30:00").getTime();

    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days < 10 ? '0'+days : days;
        document.getElementById("hours").innerHTML = hours < 10 ? '0'+hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? '0'+minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? '0'+seconds : seconds;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("timer").innerHTML = "Ура! День настал!";
        }
    }, 1000);

    // 5. Простая отправка формы (для теста уберем стандартный submit если нет форминга)
    const form = document.getElementById('rsvpForm');
    form.addEventListener('submit', function(e) {
        // e.preventDefault();
        // В продакшене вы используете action="https://formspree.io/..."
        // Для Formspree preventDefault не нужен, форма сама отправится.
        alert('Спасибо за ваш ответ! Форма в процессе отправки.');
    });
});
