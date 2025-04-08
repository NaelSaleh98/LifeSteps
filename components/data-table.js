const currencies = ["دولار أمريكي", "شيكل", "دينار أردني"];

const presets = {
    engagement: [
        { name: "حلوان قراءة الفاتحة", description: "حلويات شرقية حسب عدد الحضور", price: 200, currency: "شيكل", status: "enabled" },
        { name: "ضيافة الخطوبة", description: "شوكولاتة وعصائر أو كولا", price: 500, currency: "شيكل", status: "enabled" },
        { name: "حفلة الخطوبة", description: "حجز قاعة للنساء، ومجلس للرجال", price: 1000, currency: "شيكل", status: "disabled" },
        { name: "تجهيزات العروس", description: "فستان خطوبة، تسريحة شعر، مكياج", price: 1000, currency: "شيكل", status: "disabled" },
        { name: "المهر", description: "المقدم والمؤخر", price: 5000, currency: "دينار أردني", status: "enabled" },
    ],
    home: [
        { name: "شراء شقة", description: "شقة غير مشطبة", price: 50000, currency: "دينار أردني", status: "enabled" },
        { name: "شراء شقة", description: "شقة مشطبة", price: 75000, currency: "دينار أردني", status: "disabled" },
        { name: "تشطيب شقة", description: "جميع تشطيبات الشقة", price: 100000, currency: "شيكل", status: "enabled" },
        { name: "تأثيث الشقة", description: "أثاث المنزل وأدوات ومستلزمات", price: 30000, currency: "شيكل", status: "enabled" },
    ],
    marriage: [
        { name: "القاعة", description: "حجز قاعة وتوابعها", price: 5000, currency: "شيكل", status: "enabled" },
        { name: "تجيهزات العروس", description: "فستان، تسريحة ومكياج", price: 5000, currency: "شيكل", status: "enabled" },
        { name: "تجيهزات العريس", description: "بدلة وتوابعها", price: 1000, currency: "شيكل", status: "enabled" },
        { name: "ضيافة", description: "حلويات وعصائر", price: 700, currency: "شيكل", status: "enabled" },
    ]
};

class DataTableComponent extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || 'جدول';
        const tableId = this.getAttribute('table-id') || `table-${Date.now()}`;
        const bodyId = this.getAttribute('body-id') || `${tableId}-body`;
        const totalId = this.getAttribute('total-id') || `${tableId}-total`;
        const addBtnId = this.getAttribute('add-btn-id') || `${tableId}-add`;
        const saveBtnId = this.getAttribute('save-btn-id') || `${tableId}-save`;
        const clearBtnId = this.getAttribute('clear-btn-id') || `${tableId}-clear`;
        const preset = this.getAttribute('preset');

        this.innerHTML = `
            <div class="container-fluid mb-5">
                <h2 class="mb-4">${title}</h2>
                <div class="table-responsive">
                    <table class="table table-hover align-middle" id="${tableId}">
                        <thead class="table-dark">
                            <tr>
                                <th>الاسم</th>
                                <th>الوصف</th>
                                <th>السعر</th>
                                <th>العملة</th>
                                <th>الحالة</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="${bodyId}"></tbody>
                        <tfoot>
                            <tr>
                                <td colspan="7">
                                    <div id="${totalId}" class="d-flex gap-4"></div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <button class="btn btn-primary" id="${addBtnId}">إضافة صف</button>
                <button class="btn btn-success" id="${saveBtnId}">حفظ <i class="fa-solid fa-floppy-disk"></i></button>
                <button class="btn btn-danger" id="${clearBtnId}">حذف <i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="toast-container position-fixed bottom-1 end-0 p-3" style="z-index: 1100">
              <div id="saveToast" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                  <div class="toast-body">
                    ✅ تم حفظ البيانات بنجاح!
                  </div>
                  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="إغلاق"></button>
                </div>
              </div>
            </div>
            <div class="toast-container position-fixed bottom-1 end-0 p-3" style="z-index: 1100">
              <div id="clearToast" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                  <div class="toast-body">
                    تم حذف بياناتك، واستعادة البيانات الافتراضية!
                  </div>
                  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="إغلاق"></button>
                </div>
              </div>
            </div>
        `;

        setupTableManager({
            tableBodyId: bodyId,
            totalDivId: totalId,
            addButtonId: addBtnId,
            saveButtonId: saveBtnId,
            clearButtonId: clearBtnId,
            preset: preset,
            tableId: tableId
        });
    }
}

function setupTableManager({ tableBodyId, totalDivId, addButtonId, saveButtonId, clearButtonId, preset, tableId }) {
    let rowCount = 0;

    function createRow(data = {}) {
        const rowId = `row-${tableBodyId}-${rowCount++}`;
        const { name = "", description = "", price = "", currency = "شيكل", status = "enabled" } = data;

        const row = $(`
          <tr data-row-id="${rowId}">
            <td><input type="text" class="form-control name table-input" value="${name}"></td>
            <td><input type="text" class="form-control description table-input" value="${description}"></td>
            <td><input type="number" class="form-control price table-input-number" value="${price}" step="0.1" min="0"></td>
            <td>
              <select class="form-select currency table-input-select">
                ${currencies.map(c => `<option value="${c}" ${currency === c ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
            </td>
            <td>
              <select class="form-select status table-input-select">
                <optgroup label="الحالة">
                  <option value="enabled" ${status === "enabled" ? 'selected' : ''}>مفعلة</option>
                  <option value="disabled" ${status === "disabled" ? 'selected' : ''}>معطلة</option>
                </optgroup>
                <optgroup label="الدفع">
                  <option value="paid" ${status === "paid" ? 'selected' : ''}>مدفوعة</option>
                  <option value="cheque" ${status === "cheque" ? 'selected' : ''}>شيك مؤجل</option>
                  <option value="dept" ${status === "dept" ? 'selected' : ''}>دين</option>
                </optgroup>
              </select>
            </td>
            <td class="text-center"><button class="btn btn-danger btn-sm remove-row"><i class="fa-regular fa-trash-can"></i></button></td>
          </tr>
        `);

        updateRowStyle(row, status);

        row.find('.status').on('change', function () {
            const newStatus = $(this).val();
            updateRowStyle(row, newStatus);
            calculateTotals();
        });

        row.find('input, select').on('change input', calculateTotals);
        row.find('.remove-row').on('click', function () {
            row.remove();
            calculateTotals();
        });

        $(`#${tableBodyId}`).append(row);
        calculateTotals();
    }

    function calculateTotals() {
        const totals = {};
        $(`#${tableBodyId} tr`).each(function () {
            const row = $(this);
            const status = row.find('.status').val();
            if (status !== "enabled") return;
            const currency = row.find('.currency').val();
            const price = parseFloat(row.find('.price').val()) || 0;
            totals[currency] = (totals[currency] || 0) + price;
        });

        const totalsDiv = $(`#${totalDivId}`);
        totalsDiv.empty();
        for (const [currency, total] of Object.entries(totals)) {
            totalsDiv.append(`<div class="currency-total">${total.toFixed(0)} ${currency}</div>`);
        }
    }

    function saveData() {
        const data = [];
        $(`#${tableBodyId} tr`).each(function () {
            const row = $(this);
            const name = row.find('.name').val();
            const description = row.find('.description').val();
            const price = parseFloat(row.find('.price').val()) || 0;
            const currency = row.find('.currency').val();
            const status = row.find('.status').val();
            data.push({ name, description, price, currency, status });
        });
        localStorage.setItem(`tableData-${tableId}`, JSON.stringify(data));

        const toast = new bootstrap.Toast(document.getElementById('saveToast'));
        toast.show();
    }

    function clearData() {
        const data = presets[preset] || [];
        $(`#${tableBodyId}`).empty();
        localStorage.removeItem(`tableData-${tableId}`);
        data.forEach(createRow);


        const toast = new bootstrap.Toast(document.getElementById('clearToast'));
        toast.show();
    }

    function updateRowStyle(row, status) {
        // Reset row styles
        row.removeClass('table-secondary table-success table-warning table-danger');
        row.find('input, select').prop('disabled', false).css('opacity', 1);

        switch (status) {
            case "enabled":
                // Keep the row as it is
                break;
            case "disabled":
                row.addClass('table-secondary');
                row.find('input, select').not('.status').prop('disabled', true);
                break;
            case "paid":
                row.addClass('table-success');
                row.find('input, select').not('.status').prop('disabled', true);
                break;
            case "cheque":
                row.addClass('table-warning');
                row.find('input, select').not('.status').prop('disabled', true);
                break;
            case "dept":
                row.addClass('table-danger');
                row.find('input, select').not('.status').prop('disabled', true);
                break;
        }
    }

    // Retrieve saved data from local storage
    const savedData = localStorage.getItem(`tableData-${tableId}`);
    const data = savedData ? JSON.parse(savedData) : (presets[preset] || []);

    $(`#${addButtonId}`).on('click', () => createRow());
    $(`#${saveButtonId}`).on('click', saveData);
    $(`#${clearButtonId}`).on('click', clearData);
    data.forEach(createRow);
}

customElements.define('data-table', DataTableComponent);