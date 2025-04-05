class MyHeader extends HTMLElement {
    connectedCallback() {
        const isInPages = location.pathname.includes('/pages/');
        const base = isInPages ? '..' : '.';

        this.innerHTML = `
      <header>
        <nav class="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="${base}/index.html">
              <img src="${base}/assets/images/logo-24.png" alt="logo" width="30" height="24" />
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
              aria-label="التبديل بين العناصر">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="${base}/pages/engagement.html">خطبة</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="${base}/pages/home.html">تجهيزات المنزل</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="${base}/pages/marriage.html">زواج</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    `;

        const currentPage = location.pathname.split('/').pop();

        this.querySelectorAll('.nav-link').forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

customElements.define('my-header', MyHeader);
