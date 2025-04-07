﻿const currencies = ["دولار أمريكي", "شيكل", "دينار أردني"];

const presets = {
    engagement: [
        { name: "حلوان قراءة الفاتحة", description: "حلويات شرقية حسب عدد الحضور", price: 200, currency: "شيكل", enable: true },
        { name: "ضيافة الخطوبة", description: "شوكولاتة وعصائر أو كولا", price: 500, currency: "شيكل", enable: true },
        { name: "حفلة الخطوبة", description: "حجز قاعة للنساء، ومجلس للرجال", price: 1000, currency: "شيكل", enable: false },
        { name: "تجهيزات العروس", description: "فستان خطوبة، تسريحة شعر، مكياج", price: 1000, currency: "شيكل", enable: false },
        { name: "المهر", description: "المقدم والمؤخر", price: 5000, currency: "دينار أردني", enable: true },
    ],
    home: [
        { name: "شراء شقة", description: "شقة غير مشطبة", price: 50000, currency: "دينار أردني", enable: true },
        { name: "شراء شقة", description: "شقة مشطبة", price: 75000, currency: "دينار أردني", enable: false },
        { name: "تشطيب شقة", description: "جميع تشطيبات الشقة", price: 100000, currency: "شيكل", enable: true },
        { name: "تأثيث الشقة", description: "أثاث المنزل وأدوات ومستلزمات", price: 30000, currency: "شيكل", enable: true },
    ],
    marriage: [
        { name: "القاعة", description: "حجز قاعة وتوابعها", price: 5000, currency: "شيكل", enable: true },
        { name: "تجيهزات العروس", description: "فستان، تسريحة ومكياج", price: 5000, currency: "شيكل", enable: true },
        { name: "تجيهزات العريس", description: "بدلة وتوابعها", price: 1000, currency: "شيكل", enable: true },
        { name: "ضيافة", description: "حلويات وعصائر", price: 700, currency: "شيكل", enable: true },
    ]
};

function setupTableManager({ tableBodyId, totalDivId, addButtonId, predefinedData = [] }) {
    let rowCount = 0;

    function createRow(data = {}) {
        const rowId = `row-${tableBodyId}-${rowCount++}`;
        const { name = "", description = "", price = "", currency = "شيكل", enable = false } = data;

        const row = $(`
          <tr data-row-id="${rowId}">
            <td><input type="text" class="form-control name" value="${name}"></td>
            <td><input type="text" class="form-control description" value="${description}"></td>
            <td><input type="number" class="form-control price" value="${price}" step="0.1" min="0"></td>
            <td>
              <select class="form-select currency">
                ${currencies.map(c => `<option value="${c}" ${currency === c ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
            </td>
            <td class="text-center"><input type="checkbox" class="form-check-input enable" ${enable ? 'checked' : ''}></td>
            <td class="text-center"><button class="btn btn-danger btn-sm remove-row"><i class="fa-regular fa-trash-can"></i></button></td>
          </tr>
        `);

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
            if (!row.find('.enable').is(':checked')) return;
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

    $(`#${addButtonId}`).on('click', () => createRow());
    predefinedData.forEach(createRow);
}
class DataTableComponent extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || 'جدول';
        const tableId = this.getAttribute('table-id') || `table-${Date.now()}`;
        const bodyId = this.getAttribute('body-id') || `${tableId}-body`;
        const totalId = this.getAttribute('total-id') || `${tableId}-total`;
        const addBtnId = this.getAttribute('add-btn-id') || `${tableId}-add`;
        const preset = this.getAttribute('preset');

        const data = presets[preset] || [];

        this.innerHTML = `
            <div class="container-fluid mb-5">
                <h2 class="mb-4">${title}</h2>
                <div class="table-responsive">
                    <table class="table table-bordered table-hover align-middle" id="${tableId}">
                        <thead class="table-dark">
                            <tr>
                                <th>الاسم</th>
                                <th>الوصف</th>
                                <th>السعر</th>
                                <th>العملة</th>
                                <th>تفعيل</th>
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
            </div>
        `;

        setupTableManager({
            tableBodyId: bodyId,
            totalDivId: totalId,
            addButtonId: addBtnId,
            predefinedData: data
        });
    }
}

customElements.define('data-table', DataTableComponent);
