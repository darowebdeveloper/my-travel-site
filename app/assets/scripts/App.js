// Import style.css for webpack to bundle the css file <=> add config to webpack
// When ready for productions, will export css to its own files
import '../styles/styles.css';
// Load npm i lazysizes for lazy-load images
import 'lazysizes';
// Import modular js to the file
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import ClientArea from './modules/ClientArea';

// Create the object
new ClientArea();
new RevealOnScroll(document.querySelectorAll('.feature-item'), 75 );
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60);
let stickyHeader = new StickyHeader();
let mobileMenu = new MobileMenu();
// Create a modal variable for global scope
let modal;
// Code to load the modal only when click
document.querySelectorAll('.open-modal').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault();
        // Check if modal file downloaded already?
        if(typeof modal == 'undefined') {
            // To give the loaded file a name with webpackChunkName; don't 4get to refresh webpack
            import(/* webpackChunkName: "modal" */'./modules/Modal')
                .then((x) => {
                    // Create a new instanc of a Modal class
                    modal = new x.default();
                    // Create a few seconds for browser to load and create the modal in html
                    setTimeout(() => modal.openTheModal(), 20);
                })
                .catch((err) => {
                    console.log('There was a problem loading the code');
                });
        } else {
            modal.openTheModal();
        }
    });
});
// For hot module replacement with webpack-dev-server
if(module.hot) {
    module.hot.accept();
}
