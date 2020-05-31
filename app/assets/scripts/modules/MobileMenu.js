class MobileMenu {
  constructor() {
    // The burger element menu icon
    this.menuIcon = document.querySelector('.site-header__menu-icon');
    //  The whole menu content
    this.menuContent = document.querySelector('.site-header__menu-content');
    //  Get the siteHeader to give light blue background which is-expanded
    this.siteHeader = document.querySelector('.site-header');
    // Call this.events() when instantiate
    this.events();
  }
  events() {
    // We use arrow function to bind this to this class cuz of addEventListener making this points to the element clicked
    this.menuIcon.addEventListener('click', () => this.toggleTheMenu());
  }
  toggleTheMenu() {
    // Toggle the visible class
    this.menuContent.classList.toggle('site-header__menu-content--is-visible');
    this.siteHeader.classList.toggle('site-header--is-expanded');
    // To add the X close animation class
    this.menuIcon.classList.toggle('site-header__menu-icon--close-x');
  }
}

export default MobileMenu;