// Load throttle to control the scroll events
import throttle from 'lodash/throttle';
// Debounce triggers event handler after seconds only once 
import debounce from 'lodash/debounce';
class StickyHeader {
  constructor() {
    // BrowserHeight
    this.browserHeight = window.innerHeight;
    // Get the .site-header
    this.siteHeader = document.querySelector('.site-header');
    // Get all the page sections
    this.pageSections = document.querySelectorAll('.page-section');
    // Call the events
    this.events();
    // Take note of initial scrollY value
    this.previousScrollY = window.scrollY;
  }
  events() {
    // Listen to the scroll event with throttle control
    window.addEventListener('scroll', throttle(() => {
      this.runOnScroll();
    }, 200));
    // Listen to the window when resized so that we can change the browserHeight...
    // But resize event trigger many times by different browsers...
    // so we can use debounce from lodash to help prevent those many times
    window.addEventListener('resize', debounce(() => {
      // console.log('Resize just ran');
      this.browserHeight  = window.innerHeight;
    }, 333));
  }
  runOnScroll() {
    this.determineScrollDirection();
    // If scroll 60 px down
    if(window.scrollY > 60) {
      this.siteHeader.classList.add('site-header--dark');
    } else {
      this.siteHeader.classList.remove('site-header--dark');
    }
    // For page sections to highlight header when page section is scrolled to
    this.pageSections.forEach((el) => {
      // Call this method when el is scrolled to
      this.calSection(el);
    });
  }
  determineScrollDirection() {
    if(window.scrollY > this.previousScrollY) {
      // Add custom property this. scrollDirection to the StickyHeader
      this.scrollDirection = 'down';
    } else {
      this.scrollDirection = 'up';
    }
    this.previousScrollY = window.scrollY;
  }
  calSection(el) {
    // Only if el is in the viewport 
    if(window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
      let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight)*100;
      // Then only if 25% of el scrolled to
      if(scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down' || scrollPercent < 33 && this.scrollDirection == 'up') {
        // Get the class
        let matchingLink = el.getAttribute('data-matching-link');
        // Remove .is-current-link class
        document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(el => {
          el.classList.remove('is-current-link');
        });
        // Add .is-current-link class 
        document.querySelector(matchingLink).classList.add('is-current-link');
      }
    }
  }
}
export default StickyHeader;