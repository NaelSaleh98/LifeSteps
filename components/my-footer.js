class MyFooter extends HTMLElement {
    connectedCallback() {
        const isInPages = location.pathname.includes('/pages/');
        const base = isInPages ? '..' : '.';

        this.innerHTML = `
          <footer class="py-3">
              <ul class="nav justify-content-center">
                <li class="nav-item">
                  <a href="${base}/pages/privacy.html" class="nav-link px-2">سياسة الخصوصية</a>
                </li>
                <li class="nav-item">
                  <a href="${base}/pages/terms.html" class="nav-link px-2">شروط الاستخدام</a>
                </li>
                <li class="nav-item">
                  <a href="${base}/pages/contact.html" class="nav-link px-2">اتصل بنا</a>
                </li>
              </ul>
          </footer>
        `;
    }
}

customElements.define('my-footer', MyFooter);