class MyHeader extends HTMLElement {
    constructor() {
        super();
        this.basePath = this.getBasePath();
    }

    connectedCallback() {
        this.render();
        this.highlightActiveLink();
    }

    getBasePath() {
        return location.pathname.includes('/pages/') ? '..' : '.';
    }

    render() {
        this.innerHTML = `
          <header>
            <nav class="navbar navbar-expand-lg">
              <div class="container-fluid">
                <a class="navbar-brand" href="${this.basePath}/index.html" aria-label="Main">
                  <img src="${this.basePath}/assets/images/logo-24.png" alt="logo" width="24" height="24" loading="lazy" />
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                  aria-label="Toggle Navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav">
                    ${this.getNavLinks()}
                  </ul>
                </div>
              </div>
            </nav>
          </header>
        `;

        const navbarBrand = this.querySelector('.navbar-brand');
        if (navbarBrand) {
            navbarBrand.addEventListener('click', event => {
                const currentPage = location.pathname.split('/').pop();
                if (currentPage === 'index.html' || currentPage === '') {
                    event.preventDefault();
                }
            });
        }
    }

    getNavLinks() {
        const navLinks = [
            { href: `${this.basePath}/pages/engagement.html`, text: 'الخطوبة', ariaLabel: 'Engagement' },
            { href: `${this.basePath}/pages/home.html`, text: 'المنزل', ariaLabel: 'Home' },
            { href: `${this.basePath}/pages/marriage.html`, text: 'الزواج', ariaLabel: 'Marriage' }
        ];

        return navLinks
            .map(link => `<li class="nav-item"><a class="nav-link" href="${link.href}" aria-label="${link.ariaLabel}">${link.text}</a></li>`)
            .join('');
    }

    highlightActiveLink() {
        const currentPage = location.pathname.split('/').pop();

        this.querySelectorAll('.nav-link').forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
                link.addEventListener('click', event => event.preventDefault());
            }
        });
    }
}

customElements.define('my-header', MyHeader);
