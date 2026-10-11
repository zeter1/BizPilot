# BizPilot

**Язык / Language:** [Русский](README.md) · **English**

BizPilot is a browser workspace for small businesses: clients, orders, sales, invoices, finances, cash flow, services, notes, calendar and analytics.

## Get started

1. Download https://github.com/zeter1/BizPilot/archive/refs/heads/main.zip and extract the whole folder.
2. Open `index.html` in a modern browser. A backend, Node.js and a server database are not required for normal use.
3. Explore the demo mode, then set up your business profile and add your first client and order.
4. Save a ZIP backup from the data section before moving to another browser or clearing browser storage.

## Data and backups

Working data is stored in the current browser profile using `localStorage`. There is no server synchronization or shared multi-user workspace. Clearing storage without a backup can cause data loss. Exported backups may contain client, financial and banking information; remove private details before sharing them.

## For developers

An optional development server can be started from the project folder:

```sh
python -m http.server 8000
```

Open http://localhost:8000. Focused JavaScript checks documented by the project are:

```sh
node --check js/app.js
node --check js/cashflow.js
node scripts/test-cashflow.mjs
```

See the [project structure](README.md#структура-проекта), [CI and verification notes](README.md#проверка-и-ci) and [change history](CHANGELOG.md). These detailed documents are currently in Russian. Automated boot and cash-flow checks do not cover every interactive creation, persistence or backup/restore scenario.

## Support and security

Report a bug at https://github.com/zeter1/BizPilot/issues/new?template=bug_report.yml. Include the browser/version, application section, steps, expected result and actual result. Mention whether demo mode, local storage or ZIP restore is involved. Back up important data before clearing storage. Use [SECURITY.md](SECURITY.md) for vulnerability disclosure.

## Developer contacts

**Язык / Language:** [Русский](README.md#контакты-для-связи-с-разработчиком) · **English**

- [zeter11@gmail.com](mailto:zeter11@gmail.com)
- [https://t.me/zeter1](https://t.me/zeter1)
- [https://www.linkedin.com/in/zeter/](https://www.linkedin.com/in/zeter/)
- [https://www.facebook.com/zeter1](https://www.facebook.com/zeter1)
- [https://vk.ru/zeter1](https://vk.ru/zeter1)
- [https://www.instagram.com/zeter1992/](https://www.instagram.com/zeter1992/)
- [https://tenchat.ru/zeter](https://tenchat.ru/zeter)
- [https://x.com/zeter1](https://x.com/zeter1)
- [https://www.threads.com/@zeter1992](https://www.threads.com/@zeter1992)
- [https://ok.ru/zeter1](https://ok.ru/zeter1)
- [https://t.me/zeterchat](https://t.me/zeterchat) — Telegram group: about me, projects and chat
