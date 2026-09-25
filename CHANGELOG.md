# Changelog

## 2026-09-25 — Cash-flow runtime recovery

### Исправлено

- Найдена реальная startup-регрессия через новый headless browser smoke: dashboard падал на `cashflowForecast is not defined`.
- Восстановлен полный cash-flow helper layer: прогноз остатка, неоплаченные счета, aging дебиторки, timing плановых платежей, date arithmetic и SVG chart rendering.
- Просроченные счета без актуальной ожидаемой даты оплаты сознательно исключаются из прогнозируемых поступлений.
- Добавлен `scripts/test-cashflow.mjs` с regression tests для forecast math, cash-gap detection и receivables aging.
- `js/cashflow.js` вынесен как тестируемый browser/Node module.


## 2026-09-25 — Browser smoke verification

### Изменено

- Startup BizPilot теперь выставляет `data-bizpilot-boot="ready"` только после завершения синхронной инициализации приложения.
- Добавлен `scripts/browser-smoke.sh` с локальным HTTP-server + headless Chrome.
- GitHub Actions теперь проверяет фактическое выполнение startup logic и наличие dashboard root, а не только доступность статических файлов.
- README уточняет границу между автоматическим boot smoke и полным пользовательским E2E.

### Диагностика boot smoke

- Добавлены `data-bizpilot-boot-stage` и `data-bizpilot-boot-error`, чтобы CI показывал точный startup stage при ранней browser-ошибке.
- Browser smoke печатает состояние корневого `<html>` при failure, не скрывая первопричину за общей ошибкой boot marker.

### Проверка

Автоматический smoke доказывает загрузку и запуск приложения в Chromium. Сценарии CRUD, persistence, demo-mode и ZIP backup/restore требуют отдельного E2E/runtime proof.
