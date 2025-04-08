const currencies = ["دولار أمريكي", "شيكل", "دينار أردني"];

const presets = {
    engagement: [
        { name: "حلوان قراءة الفاتحة", description: "حلويات شرقية حسب عدد الحضور", price: 200, currency: "شيكل", status: "enabled", locked: false },
        { name: "ضيافة الخطوبة", description: "شوكولاتة وعصائر أو كولا", price: 500, currency: "شيكل", status: "enabled", locked: false },
        { name: "حفلة الخطوبة", description: "حجز قاعة للنساء، ومجلس للرجال", price: 1000, currency: "شيكل", status: "disabled", locked: false },
        { name: "تجهيزات العروس", description: "فستان خطوبة، تسريحة شعر، مكياج", price: 1000, currency: "شيكل", status: "disabled", locked: false },
        { name: "المهر", description: "المقدم والمؤخر", price: 5000, currency: "دينار أردني", status: "enabled", locked: false },
    ],
    home: [
        { name: "شراء شقة", description: "شقة غير مشطبة", price: 50000, currency: "دينار أردني", status: "enabled", locked: false },
        { name: "شراء شقة", description: "شقة مشطبة", price: 75000, currency: "دينار أردني", status: "disabled", locked: false },
        { name: "تشطيب شقة", description: "جميع تشطيبات الشقة", price: 100000, currency: "شيكل", status: "enabled", locked: false },
        { name: "تأثيث الشقة", description: "أثاث المنزل وأدوات ومستلزمات", price: 30000, currency: "شيكل", status: "enabled", locked: false },
    ],
    marriage: [
        { name: "القاعة", description: "حجز قاعة وتوابعها", price: 5000, currency: "شيكل", status: "enabled", locked: false },
        { name: "تجيهزات العروس", description: "فستان، تسريحة ومكياج", price: 5000, currency: "شيكل", status: "enabled", locked: false },
        { name: "تجيهزات العريس", description: "بدلة وتوابعها", price: 1000, currency: "شيكل", status: "enabled", locked: false },
        { name: "ضيافة", description: "حلويات وعصائر", price: 700, currency: "شيكل", status: "enabled", locked: false },
    ]
};

class DataTableComponent extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('table-title') || 'جدول';
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
                        <tfoot id="${totalId}">
                        </tfoot>
                    </table>
                </div>
                <button class="btn btn-primary" id="${addBtnId}">إضافة صف</button>
                <button class="btn btn-success" id="${saveBtnId}">حفظ <i class="fa-solid fa-floppy-disk"></i></button>
                <button class="btn btn-danger" id="${clearBtnId}">حذف <i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="toast-container position-fixed top-0 start-0 p-3" style="z-index: 1100">
              <div id="saveToast" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                  <div class="toast-body">
                    ✅ تم حفظ البيانات بنجاح!
                  </div>
                  <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="إغلاق"></button>
                </div>
              </div>
            </div>
            <div class="toast-container position-fixed top-0 start-0 p-3" style="z-index: 1100">
              <div id="clearToast" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                  <div class="toast-body">
                    تم حذف الصفوف غير المقفلة!
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
        const { name = "", description = "", price = "", currency = "شيكل", status = "enabled", locked = false } = data;

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
                  <option value="cheque" ${status === "cheque" ? 'selected' : ''}>شيك</option>
                  <option value="dept" ${status === "dept" ? 'selected' : ''}>دين</option>
                </optgroup>
              </select>
            </td>
            <td class="text-center">
                <button class="btn btn-secondary btn-sm lock-row"><i class="fa-solid fa-lock"></i></button>
                <button class="btn btn-danger btn-sm remove-row"><i class="fa-regular fa-trash-can"></i></button>
            </td>
          </tr>
        `);

        updateRowStyle(row, status, locked);

        row.find('.status').on('change', function () {
            const newStatus = $(this).val();
            updateRowStyle(row, newStatus, row.data('locked'));
            calculateTotals();
        });

        row.find('input, select').on('change input', calculateTotals);

        row.find('.remove-row').on('click', function () {
            row.remove();
            calculateTotals();
        });

        row.find('.lock-row').on('click', function () {
            const isLocked = !row.data('locked');
            row.data('locked', isLocked);
            row.attr('data-locked', isLocked); 
            updateRowStyle(row, row.find('.status').val(), isLocked);
        });

        $(`#${tableBodyId}`).append(row);
        calculateTotals();
    }

    function calculateTotals() {
        const totals = {
            enabled: {},
            paid: {},
            cheque: {},
            dept: {}
        };

        $(`#${tableBodyId} tr`).each(function () {
            const row = $(this);
            const status = row.find('.status').val();
            const currency = row.find('.currency').val();
            const price = parseFloat(row.find('.price').val()) || 0;

            if (!totals[status]) return;
            totals[status][currency] = (totals[status][currency] || 0) + price;
        });

        const totalsTfoot = $(`#${totalDivId}`).closest('tfoot');
        totalsTfoot.empty(); // Clear existing totals

        // Render totals for each status
        const statusLabels = {
            enabled: "المستحقات",
            paid: "المدفوعات",
            cheque: "شيكات",
            dept: "الديون"
        };

        for (const [status, currencies] of Object.entries(totals)) {
            if (Object.keys(currencies).length === 0) continue;

            const statusRow = $('<tr></tr>');
            const statusCell = $(`<td><strong>${statusLabels[status]}:</strong></td>`);
            const totalsCell = $('<td></td>');

            for (const [currency, total] of Object.entries(currencies)) {
                totalsCell.append(`<div class="currency-total">${total.toFixed(0)} ${currency}</div>`);
            }

            statusRow.append(statusCell).append(totalsCell).append('<td colspan="4"></td>');
            totalsTfoot.append(statusRow);
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
            const locked = row.attr('data-locked') === 'true';
            data.push({ name, description, price, currency, status, locked });
        });
        localStorage.setItem(`tableData-${tableId}`, JSON.stringify(data));

        const toast = new bootstrap.Toast(document.getElementById('saveToast'));
        toast.show();
    }

    function clearData() {
        const data = presets[preset] || [];
        const lockedRows = [];

        // Iterate over all rows and remove only unlocked rows
        $(`#${tableBodyId} tr`).each(function () {
            const row = $(this);
            const isLocked = row.data('locked') || false;
            if (isLocked) {
                // Collect locked rows to preserve them
                const name = row.find('.name').val();
                const description = row.find('.description').val();
                const price = parseFloat(row.find('.price').val()) || 0;
                const currency = row.find('.currency').val();
                const status = row.find('.status').val();
                lockedRows.push({ name, description, price, currency, status, locked: true });
            } else {
                row.remove(); // Remove unlocked rows
            }
        });

        const updatedData = [];

        if (lockedRows.length > 0) {
            updatedData.push(...lockedRows);
        } else {
            // Add preset rows (if any) to the table
            data.forEach(createRow);
            updatedData.push(...data);
        }

        // Update local storage with locked rows and preset data
        localStorage.setItem(`tableData-${tableId}`, JSON.stringify(updatedData));

        const toast = new bootstrap.Toast(document.getElementById('clearToast'));
        toast.show();
    }

    function updateRowStyle(row, status, locked = false) {
        // Reset row styles
        row.removeClass('table-secondary table-success table-warning table-danger table-locked');
        row.find('input, select').prop('disabled', false).css('opacity', 1);
        row.find('.remove-row').prop('disabled', false);
        row.attr('data-locked', locked);

        if (locked) {
            row.addClass('table-locked');
            row.find('input, select').prop('disabled', true);
            row.find('.remove-row').prop('disabled', true);
            row.find('.lock-row').html('<i class="fa-solid fa-lock-open"></i>');
            return;
        }

        row.find('.lock-row').html('<i class="fa-solid fa-lock"></i>');

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
                break;
            case "cheque":
                row.addClass('table-warning');
                break;
            case "dept":
                row.addClass('table-danger');
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