import Axios from 'axios';

class ClientArea {
  constructor () {
    // Order matters
    this.injectHTML();
    this.form = document.querySelector('.client-area__form');
    this.field = document.querySelector('.client-area__input');
    this.contentArea = document.querySelector(".client-area__content-area");
    this.events();
  }

  events() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.sendRequest();
    });
  }
  sendRequest() {
    // npm i axios
    Axios.post('https://trusting-bartik-51e8c1.netlify.app/.netlify/functions/secret-area', {password: this.field.value})
    .then(response => {
      // Remove the form
      this.form.remove();
      // Add the response data to the html
      this.contentArea.innerHTML = response.data;
    }).catch(() => {
      // Catch the response status code 401
       this.contentArea.innerHTML = `<p class="client-area__error">That's secret prase is not correct. Try again!</p>`;
       // Clear the field valule
       this.field.value = '';
       this.field.focus();
    });
  }
  injectHTML() {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="client-area">
        <div class="wrapper wrapper--medium">
          <h2 class="section-title section-title--blue">Secret Client Area</h2>
          <form class="client-area__form" action="">
            <input class="client-area__input" type="text" placeholder="Enter the secret phrase">
            <button class="btn btn--orange">Submit</button>
          </form>
          <div class="client-area__content-area"></div>
        </div>
      </div>
    `);
  }
}

export default ClientArea;