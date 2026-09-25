import { createRequire } from 'node:module';
import assert from 'node:assert/strict';

const require = createRequire(import.meta.url);
const cashflow = require('../js/cashflow.js');

assert.equal(cashflow.daysBetweenIso('2026-09-25','2026-09-28'),3);
assert.equal(cashflow.daysBetweenIso('2026-09-28','2026-09-25'),-3);
assert.equal(cashflow.paymentTimingLabel({date:'2026-09-25'},'2026-09-25'),'Сегодня');
assert.equal(cashflow.paymentTimingLabel({date:'2026-09-24'},'2026-09-25'),'Просрочен на 1 день');

const invoices=[
  {id:'A',status:'waiting',due:'27.09.2026',amount:500},
  {id:'B',status:'overdue',due:'20.09.2026',amount:200},
  {id:'C',status:'overdue',due:'20.09.2026',expectedPaymentDate:'2026-09-30',amount:300},
  {id:'D',status:'paid',due:'26.09.2026',amount:999}
];
const plans=[
  {uid:'p1',type:'expense',date:'2026-09-26',amount:400},
  {uid:'p2',type:'income',date:'2026-09-28',amount:100},
  {uid:'p3',type:'expense',date:'2026-09-26',amount:999,completedAt:'2026-09-25T08:00:00Z'}
];
const forecast=cashflow.cashflowForecast({
  today:'2026-09-25',
  horizonDays:10,
  startBalance:1000,
  invoices,
  plannedPayments:plans
});
assert.equal(forecast.expectedInvoices,800);
assert.equal(forecast.plannedIncome,100);
assert.equal(forecast.plannedExpense,400);
assert.equal(forecast.endBalance,1500);
assert.equal(forecast.excludedOverdueCount,1);
assert.equal(forecast.excludedOverdueAmount,200);
assert.equal(forecast.points.length,11);

const risk=cashflow.cashflowForecast({
  today:'2026-09-25',
  horizonDays:3,
  startBalance:100,
  invoices:[],
  plannedPayments:[{type:'expense',date:'2026-09-26',amount:150}]
});
assert.equal(risk.firstNegative,'2026-09-26');
assert.equal(risk.minBalance,-50);

const aging=cashflow.receivablesAging([
  {status:'waiting',due:'28.09.2026',amount:10},
  {status:'overdue',due:'24.09.2026',amount:20},
  {status:'overdue',due:'15.09.2026',amount:30},
  {status:'overdue',due:'01.08.2026',amount:40},
  {status:'paid',due:'01.08.2026',amount:500}
],'2026-09-25');
assert.deepEqual(aging.map(item=>item.count),[1,1,1,0,1]);
assert.deepEqual(aging.map(item=>item.amount),[10,20,30,0,40]);

console.log('BizPilot cash-flow regression tests passed.');
