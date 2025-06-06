document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const authMenu = document.getElementById('auth-menu');

    menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    authMenu.classList.toggle('active');
});
})
