// join.js
document.addEventListener('DOMContentLoaded', () => {
    // Set timestamp
    document.getElementById('timestamp').value = new Date().toISOString();

    // Modal handling
    const modals = document.querySelectorAll('.modal');
    const triggers = document.querySelectorAll('.modal-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.querySelector(trigger.getAttribute('href'));
            modal.style.display = 'block';
        });
    });

    modals.forEach(modal => {
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
        });
    });
});
