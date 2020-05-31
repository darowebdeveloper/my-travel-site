// Import style.css for webpack to bundle the css file <=> add config to webpack
// When ready for productions, will export css to its own files
import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu';

let mobileMenu = new MobileMenu();
// For hot module replacement with webpack-dev-server
if(module.hot) {
    module.hot.accept();
}
