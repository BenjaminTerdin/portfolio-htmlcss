const pages = document.querySelectorAll('.page');
const pageLinks = document.querySelectorAll('[data-page-link]');
const navigation = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');

function showPage(pageName) {
    const targetPage = document.querySelector(`[data-page="${pageName}"]`);
    if (!targetPage) return;

    pages.forEach((page) => page.classList.toggle('is-visible', page === targetPage));
    pageLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.pageLink === pageName));
    document.body.dataset.page = pageName;
    navigation.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

pageLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        showPage(link.dataset.pageLink);
        history.pushState(null, '', `#${link.dataset.pageLink}`);
    });
});

menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

window.addEventListener('popstate', () => showPage(window.location.hash.slice(1) || 'home'));
showPage(window.location.hash.slice(1) || 'home');