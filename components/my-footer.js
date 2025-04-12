class MyFooter extends HTMLElement {
    constructor() {
        super();
        this.basePath = this.getBasePath();
    }

    connectedCallback() {
        this.render();
        this.updateLinkEvents();
    }

    getBasePath() {
        return location.pathname.includes('/pages/') ? '..' : '.';
    }

    render() {
        this.innerHTML = `
          <footer class="py-3">
              <ul class="nav justify-content-center">
                <li class="nav-item">
                  <a href="${this.basePath}/pages/privacy.html" class="nav-link px-2">سياسة الخصوصية</a>
                </li>
                <li class="nav-item">
                  <a href="${this.basePath}/pages/terms.html" class="nav-link px-2">شروط الاستخدام</a>
                </li>
                <li class="nav-item">
                  <a href="${this.basePath}/pages/about-us.html" class="nav-link px-2">من نحن</a>
                </li>
              </ul>
          </footer>
        `;
    }

    updateLinkEvents() {
        const currentPage = location.pathname.split('/').pop();

        this.querySelectorAll('.nav-link').forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.addEventListener('click', event => event.preventDefault());
            }
        });
    }
}

customElements.define('my-footer', MyFooter);