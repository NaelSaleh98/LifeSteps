class MyFooter extends HTMLElement {
    connectedCallback() {
        const isInPages = location.pathname.includes('/pages/');
        const base = isInPages ? '..' : '.';

        this.innerHTML = `
      <footer class="bg-primary text-white text-center py-3">
        <div class="container">
          <p>&copy; 2025 رحلة الزواج. جميع الحقوق محفوظة.</p>
          <ul class="list-inline">
            <li class="list-inline-item">
              <a href="${base}/pages/privacy.html" class="text-white">سياسة الخصوصية</a>
            </li>
            <li class="list-inline-item">
              <a href="${base}/pages/terms.html" class="text-white">شروط الاستخدام</a>
            </li>
            <li class="list-inline-item">
              <a href="${base}/pages/contact.html" class="text-white">اتصل بنا</a>
            </li>
          </ul>
        </div>
      </footer>
    `;
    }
}

customElements.define('my-footer', MyFooter);