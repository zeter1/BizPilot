# Changelog

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
