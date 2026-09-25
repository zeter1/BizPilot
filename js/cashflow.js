(function attachBizPilotCashflow(root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.BizPilotCashflow = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createBizPilotCashflow() {
  'use strict';

  const DAY_MS = 24 * 60 * 60 * 1000;
  const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

  function normalizeIso(value) {
    const text = String(value || '');
    if (!ISO_DATE_RE.test(text)) return '';
    const [year, month, day] = text.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) return '';
    return text;
  }

  function isoDayNumber(value) {
    const iso = normalizeIso(value);
    if (!iso) return null;
    const [year, month, day] = iso.split('-').map(Number);
    return Date.UTC(year, month - 1, day) / DAY_MS;
  }

  function daysBetweenIso(from, to) {
    const start = isoDayNumber(from);
    const end = isoDayNumber(to);
    return start === null || end === null ? 0 : Math.round(end - start);
  }

  function addDaysIso(iso, days) {
    const dayNumber = isoDayNumber(iso);
    if (dayNumber === null) return '';
    return new Date((dayNumber + Number(days || 0)) * DAY_MS).toISOString().slice(0, 10);
  }

  function outstandingInvoices(invoices) {
    return (Array.isArray(invoices) ? invoices : []).filter(invoice => invoice && invoice.status !== 'paid');
  }

  function paymentTimingLabel(item, today) {
    const date = normalizeIso(item?.date);
    const base = normalizeIso(today);
    if (!date || !base) return 'Дата не указана';
    if (item?.completedAt) return 'Проведён';
    const diff = daysBetweenIso(base, date);
    if (diff < -1) return `Просрочен на ${Math.abs(diff)} дн.`;
    if (diff === -1) return 'Просрочен на 1 день';
    if (diff === 0) return 'Сегодня';
    if (diff === 1) return 'Завтра';
    return `Через ${diff} дн.`;
  }

  function receivablesAging(invoices, today) {
    const base = normalizeIso(today);
    const buckets = [
      { key:'notdue', label:'Не просрочено', cls:'info', amount:0, count:0 },
      { key:'d1_7', label:'1–7 дней', cls:'warning', amount:0, count:0 },
      { key:'d8_14', label:'8–14 дней', cls:'warning', amount:0, count:0 },
      { key:'d15_30', label:'15–30 дней', cls:'danger', amount:0, count:0 },
      { key:'d31plus', label:'31+ дней', cls:'danger', amount:0, count:0 }
    ];
    if (!base) return buckets;

    for (const invoice of outstandingInvoices(invoices)) {
      const due = normalizeIso(String(invoice?.due || '').includes('.') ? String(invoice.due).split('.').reverse().join('-') : invoice?.due);
      const amount = Math.max(0, Number(invoice?.amount || 0));
      const overdueDays = due ? daysBetweenIso(due, base) : 0;
      let bucket = buckets[0];
      if (overdueDays >= 31) bucket = buckets[4];
      else if (overdueDays >= 15) bucket = buckets[3];
      else if (overdueDays >= 8) bucket = buckets[2];
      else if (overdueDays >= 1) bucket = buckets[1];
      bucket.amount += amount;
      bucket.count += 1;
    }
    return buckets;
  }

  function cashflowForecast(options = {}) {
    const today = normalizeIso(options.today);
    if (!today) throw new Error('cashflowForecast requires a valid today date');

    const horizonDays = Math.max(1, Math.min(365, Math.round(Number(options.horizonDays || 30))));
    const endDate = addDaysIso(today, horizonDays);
    const startBalance = Number.isFinite(Number(options.startBalance)) ? Number(options.startBalance) : 0;
    const events = new Map();
    const addEvent = (date, amount, kind) => {
      const iso = normalizeIso(date);
      const value = Number(amount || 0);
      if (!iso || !Number.isFinite(value) || value === 0) return false;
      if (iso < today || iso > endDate) return false;
      const current = events.get(iso) || { amount:0, kinds:[] };
      current.amount += value;
      current.kinds.push(kind);
      events.set(iso, current);
      return true;
    };

    let expectedInvoices = 0;
    let plannedIncome = 0;
    let plannedExpense = 0;
    let excludedOverdueCount = 0;
    let excludedOverdueAmount = 0;

    for (const invoice of outstandingInvoices(options.invoices)) {
      const amount = Math.max(0, Number(invoice?.amount || 0));
      if (!amount) continue;

      const dueRaw = String(invoice?.due || '');
      const due = normalizeIso(dueRaw.includes('.') ? dueRaw.split('.').reverse().join('-') : dueRaw);
      const expected = normalizeIso(invoice?.expectedPaymentDate);
      const overdue = due && due < today;

      if (overdue && (!expected || expected < today)) {
        excludedOverdueCount += 1;
        excludedOverdueAmount += amount;
        continue;
      }

      const receiveDate = expected && expected >= today ? expected : due;
      if (receiveDate && addEvent(receiveDate, amount, 'invoice')) expectedInvoices += amount;
    }

    for (const item of Array.isArray(options.plannedPayments) ? options.plannedPayments : []) {
      if (!item || item.completedAt) continue;
      const amount = Math.max(0, Number(item.amount || 0));
      if (!amount) continue;
      const rawDate = normalizeIso(item.date);
      if (!rawDate) continue;
      const effectiveDate = rawDate < today ? today : rawDate;
      if (item.type === 'income') {
        if (addEvent(effectiveDate, amount, 'planned-income')) plannedIncome += amount;
      } else if (addEvent(effectiveDate, -amount, 'planned-expense')) {
        plannedExpense += amount;
      }
    }

    const points = [];
    let balance = startBalance;
    let minBalance = startBalance;
    let firstNegative = startBalance < 0 ? today : '';

    for (let offset = 0; offset <= horizonDays; offset += 1) {
      const date = addDaysIso(today, offset);
      const event = events.get(date);
      if (event) balance += event.amount;
      minBalance = Math.min(minBalance, balance);
      if (!firstNegative && balance < 0) firstNegative = date;
      points.push({ date, balance, delta:event?.amount || 0, eventCount:event?.kinds.length || 0 });
    }

    return {
      today,
      endDate,
      horizonDays,
      startBalance,
      expectedInvoices,
      plannedIncome,
      plannedExpense,
      endBalance:balance,
      minBalance,
      firstNegative,
      excludedOverdueCount,
      excludedOverdueAmount,
      points
    };
  }

  return {
    normalizeIso,
    daysBetweenIso,
    addDaysIso,
    outstandingInvoices,
    paymentTimingLabel,
    receivablesAging,
    cashflowForecast
  };
});
