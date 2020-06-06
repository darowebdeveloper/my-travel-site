// Import only throttle function from lodash => run func every seconds continually
import throttle from 'lodash/throttle';
// Debounce triggers event handler after seconds only once 
import debounce from 'lodash/debounce';

class RevealOnScroll {
  constructor(items, thresholdPercent) {
    // To define how much of items scrolled to
    this.thresholdPercent = thresholdPercent;
    // Get all items to reveal
    this.itemsToReveal = items;
    // Get the browserHeight once rather asking browser many times
    this.browserHeight = window.innerHeight;
    // Hide items on first load
    this.hideInitially();
    // .bind means wherever the function called, this bound to the this of RevealOnScroll
    this.scrollThrottle = throttle(this.calCaller, 200).bind(this);
    // Call the events
    this.events();
  }
  events() {
    // When scroll, trigger this event but it triggers so many events not so good for cpu...
    // so we use throttle from npm i lodash to controll the numbers of func calling
    window.addEventListener('scroll', this.scrollThrottle);
    // Listen to the window when resized so that we can change the browserHeight...
    // But resize event trigger many times by different browsers...
    // so we can use debounce from lodash to help prevent those many times
    window.addEventListener('resize', debounce(() => {
      // console.log('Resize just ran');
      this.browserHeight = window.innerHeight;
    }, 333));
  }
  calCaller() {
    // console.log("Scroll function ran");
    this.itemsToReveal.forEach((item) => {
      // Only items not yet reveal, then do the calculation
      if(item.isRevealed == false) {
        // Call to user defined func
        this.calculateIfScrolledTo(item);
      }
    });
  }
  calculateIfScrolledTo(item) {
    // window.scrollY changes when page scroll
    // this.browserHeight = window.innerHeight is static and the heigh of the viewport
    // item.offsetTop is static and measured from the top of viewport to the top of item
    // Calling window.innerHeight every scroll not efficient => so create a property to hold its value
    if(window.scrollY + this.browserHeight > item.offsetTop) {
      // console.log("Ele was calculated");
      // .getBoundingClientRect().top changes and returns how far the top of item to the top of the bounding box (viewport)
      // The fomular below means when the item scroll to the 25% from the bottom viewport
      let scrollPercent =
        (item.getBoundingClientRect().top / this.browserHeight) * 100;
      // Because of we want 25% <=> now replace with this.thresholdPercent
      if (scrollPercent < this.thresholdPercent) {
        item.classList.add("reveal-item--is-visible");
        // Set the custom property isRevealed to true
        item.isRevealed = true;
        // If the last item is revealed then remove Event listener
        if (item.isLastItem) {
          // We need the name func this.scrollThrottle to remove the event
          window.removeEventListener("scroll", this.scrollThrottle);
        }
      }
    }
  }
  hideInitially() {
    this.itemsToReveal.forEach(item => {
      // Add the class from _reveal-item.css
      item.classList.add('reveal-item');
      // Create a custom property isRevealed to check if item is revealed; by default is false
      item.isRevealed = false;
    });
    // Create a custom property isLastItem to unsubscribe to the scroll event when last item is revealed; default to true
    this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
  }
}
export default RevealOnScroll;