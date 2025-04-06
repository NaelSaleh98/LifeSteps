const currencies = ["دولار أمريكي", "شيكل", "دينار أردني"];
let rowCount = 0;

const predefinedData = [
    { name: "شراء شقة", description: "شقة غير مشطبة", price: 50000, currency: "دينار أردني", enable: true },
    { name: "شراء شقة", description: "شقة مشطبة", price: 75000, currency: "دينار أردني", enable: false },
    { name: "تشطيب شقة", description: "جميع تشطيبات الشقة", price: 100000, currency: "شيكل", enable: true },
    { name: "تأثيث الشقة", description: "أثاث المنزل وأدوات ومستلزمات", price: 30000, currency: "شيكل", enable: true },
];

function createRow(data = {}) {
    const rowId = `row-${rowCount++}`;
    const {
        name = "",
        description = "",
        price = "",
        currency = "شيكل",
        enable = false
    } = data;

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
        <td class="text-center"><input type="checkbox" class="form-check-input enable" ${enable ? 'checked' : ''}></td>
        <td class="text-center"><button class="btn btn-danger btn-sm remove-row"><i class="fa-regular fa-trash-can"></i></button></td>
      </tr>
    `);

    row.find('input, select').on('change input', calculateTotals);
    row.find('.remove-row').on('click', function () {
        row.remove();
        calculateTotals();
    });

    $('#homeTableBody').append(row);
    calculateTotals();
}

function calculateTotals() {
    const totals = {};

    $('#homeTableBody tr').each(function () {
        const row = $(this);
        const enabled = row.find('.enable').is(':checked');
        if (!enabled) return;

        const currency = row.find('.currency').val();
        const price = parseFloat(row.find('.price').val()) || 0;
        const subtotal = price;

        if (!totals[currency]) totals[currency] = 0;
        totals[currency] += subtotal;
    });

    const totalsDiv = $('#homeTotal');
    totalsDiv.empty();
    Object.keys(totals).forEach(currency => {
        totalsDiv.append(`<div class="currency-total">${totals[currency].toFixed(0)} ${currency}</div>`);
    });
}

$('#addHomeRow').on('click', () => createRow());


predefinedData.forEach(data => createRow(data));