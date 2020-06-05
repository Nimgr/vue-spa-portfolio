/* mobile menu start */
mobileMenu = document.querySelector('.mobile-menu');
mobileMenuOpen = document.querySelector('.mobile-menu__open');
mobileMenuClose = document.querySelector('.mobile-menu__close');

function toggleMenu() {
    mobileMenu.classList.toggle('active');
}

mobileMenuOpen.addEventListener("click", function(){
    toggleMenu();
}, false);
/* mobile menu end */

mobileMenuClose.addEventListener("click", function(){
    toggleMenu();
}, false);
/* mobile menu end */