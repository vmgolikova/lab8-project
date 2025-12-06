// main.js - Скрипты для сайта-портфолио Валерии Голиковой
// Лабораторная работа №8

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт портфолио Валерии Голиковой загружен!');
    
    // 1. Подсветка активной ссылки в навигации
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // 2. Обработка формы обратной связи
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Простая валидация
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все обязательные поля!');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Пожалуйста, введите корректный email адрес!');
                return;
            }
            
            // Имитация отправки (в учебных целях)
            alert('Спасибо, ' + name + '! Ваше сообщение отправлено.\nВ реальном проекте здесь была бы отправка на сервер.');
            
            // Очистка формы
            contactForm.reset();
        });
    }
    
    // 3. Счетчик посещений (локальное хранилище)
    updateVisitCounter();
    
    // 4. Год в подвале
    updateFooterYear();
    
    // 5. Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // 6. Ленивая загрузка изображений
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Вспомогательные функции
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function updateVisitCounter() {
    if (typeof Storage !== 'undefined') {
        let visits = localStorage.getItem('portfolioVisits');
        visits = visits ? parseInt(visits) + 1 : 1;
        localStorage.setItem('portfolioVisits', visits);
        
        // Можно вывести счетчик, например, в консоль
        console.log(`Вы посетили этот сайт ${visits} раз(а)`);
    }
}

function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    } else {
        // Или добавим год в существующий подвал
        const footer = document.querySelector('footer p');
        if (footer && !footer.textContent.includes('2025')) {
            const currentYear = new Date().getFullYear();
            const yearText = currentYear > 2025 ? `2025-${currentYear}` : '2025';
            footer.innerHTML = footer.innerHTML.replace('2025', yearText);
        }
    }
}

// Дополнительные утилиты
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Текст скопирован: ' + text);
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
}

// Для страницы проектов - фильтрация
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Обновляем активную кнопку
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    // Фильтруем проекты
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}