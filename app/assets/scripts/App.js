// Import style.css for webpack to bundle the css file <=> add config to webpack
// When ready for productions, will export css to its own files
import '../styles/styles.css';
// Import modular js to the file
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';

// Create the object
new Modal();
new RevealOnScroll(document.querySelectorAll('.feature-item'), 75 );
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
let stickyHeader = new StickyHeader();
let mobileMenu = new MobileMenu();

// For hot module replacement with webpack-dev-server
if(module.hot) {
    module.hot.accept();
}
