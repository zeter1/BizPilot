(() => {
  'use strict';
  // Loaded only by the browser smoke test's temporary HTML, never by production.
  const root = document.documentElement;
  const stageKey = 'bizpilot-browser-smoke-stage';
  const storageKey = 'bizpilot-demo-v1';
  const clientName = 'BizPilot QA Browser Smoke Client';
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const hasClient = () => {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
    return Array.isArray(saved.clients) && saved.clients.some(client => client.name === clientName);
  };

  try {
    assert(root.dataset.bizpilotBoot === 'ready', 'BizPilot did not finish startup');
    assert(document.querySelectorAll('#cashflowMetrics .metric-card').length === 4, 'Cash-flow metrics did not render');
    assert(document.querySelectorAll('#financeMetrics .metric-card').length === 3, 'Finance metrics did not render');

    if (sessionStorage.getItem(stageKey) === 'verify') {
      sessionStorage.removeItem(stageKey);
      assert(hasClient(), 'New client did not survive page reload');
      assert(document.querySelector('#clientsTable')?.textContent.includes(clientName), 'Saved client did not render after reload');
      root.dataset.bizpilotSmoke = 'ready';
      return;
    }

    document.querySelector('.nav-item[data-view="clients"]').click();
    document.querySelector('[data-open-modal="client"]').click();
    const form = document.querySelector('#dynamicForm');
    assert(form.dataset.type === 'client', 'Client creation dialog failed to open');
    form.querySelector('input[name="name"]').value = clientName;
    form.requestSubmit();
    assert(!document.querySelector('#modalBackdrop').classList.contains('open'), 'Client dialog did not close after save');
    assert(document.querySelector('#clientsTable')?.textContent.includes(clientName), 'New client did not render');
    assert(hasClient(), 'New client was not saved to localStorage');
    sessionStorage.setItem(stageKey, 'verify');
    location.reload();
  } catch (error) {
    root.dataset.bizpilotSmoke = 'error';
    root.dataset.bizpilotSmokeError = String(error?.message || error).slice(0, 180);
  }
})();
