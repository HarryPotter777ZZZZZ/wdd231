document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.createElement('button');
    navToggle.textContent = 'Menu';
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-controls', 'navigation');
    navToggle.classList.add('nav-toggle');

    const nav = document.querySelector('nav');
    nav.insertBefore(navToggle, nav.firstChild);

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        document.querySelector('nav ul').classList.toggle('expanded', !isExpanded);
    });
});