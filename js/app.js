(() => {
  'use strict';

  const markBootStage = stage => { document.documentElement.dataset.bizpilotBootStage = stage; };
  const markBootError = value => {
    const text = String(value?.message || value || 'unknown error').replace(/[\r\n]+/g, ' ').slice(0, 180);
    document.documentElement.dataset.bizpilotBoot = 'error';
    document.documentElement.dataset.bizpilotBootError = text;
  };
  window.addEventListener('error', event => markBootError(event.error || event.message));
  window.addEventListener('unhandledrejection', event => markBootError(event.reason));
  markBootStage('script');

  const STORAGE_KEY = 'bizpilot-demo-v1';
  const PREFS_KEY = 'bizpilot-prefs-v1';
  const CALC_KEY = 'bizpilot-calculators-v1';
  const UI_KEY = 'bizpilot-ui-v1';
  const RESET_NOTICE_KEY = 'bizpilot-reset-notice-v1';
  const APP_VERSION = '17.0';
  const DEMO_MODE_KEY = 'bizpilot-demo-mode-v1';
  const LIVE_SNAPSHOT_KEY = 'bizpilot-live-workspace-v1';
  const number = new Intl.NumberFormat('ru-RU');

  const seed = {
    orders: [
      { id: 'BP-1048', client: 'GreenPoint', service: 'Лендинг под запуск', due: '09.09.2026', amount: 1680, cost: 820, status: 'new' },
      { id: 'BP-1047', client: 'Mira Coffee', service: 'Интернет-магазин', due: '12.09.2026', amount: 4200, cost: 2300, status: 'work' },
      { id: 'BP-1046', client: 'Vector Lab', service: 'Поддержка сайта', due: '08.09.2026', amount: 1290, cost: 480, status: 'done' },
      { id: 'BP-1045', client: 'Nova Dental', service: 'Корпоративный сайт', due: '17.09.2026', amount: 3650, cost: 1700, status: 'work' },
      { id: 'BP-1044', client: 'AeroFit', service: 'UX/UI аудит', due: '03.09.2026', amount: 790, cost: 260, status: 'paid' },
      { id: 'BP-1043', client: 'Kraft Room', service: 'Лендинг под запуск', due: '29.08.2026', amount: 1550, cost: 600, status: 'paid' },
      { id: 'BP-1042', client: 'North House', service: 'Поддержка сайта', due: '27.08.2026', amount: 980, cost: 320, status: 'paid' }
    ],
    clients: [
      { uid: 'client-1', name: 'GreenPoint', clientType:'company', relationshipStatus:'regular', industry:'Ландшафт и благоустройство', website:'https://greenpoint.by', source:'Рекомендация', description:'Компания по озеленению и благоустройству коммерческих объектов.', tags:'постоянный клиент, B2B', person: 'Антон Новик', position:'Директор', email: 'hello@greenpoint.by', phone: '+375 29 510-22-18', altPhone:'', telegram:'@greenpoint', actualAddress:'Минск', legalName:'ООО «ГринПоинт»', taxId:'193000001', kpp:'', registrationNumber:'', country:'Беларусь', legalAddress:'г. Минск', bankName:'', bankCode:'', swift:'', correspondentAccount:'', bankAccounts:'BYN — BY00 DEMO 0000 0000 0000 0000 0000', contractNumber:'12/2026', contractDate:'2026-06-12', preferredCurrency:'BYN', paymentTerms:'50% предоплата, остаток после сдачи', importantNotes:'Предпочитает согласовывать ключевые решения в Telegram.', orders: 3, revenue: 4870, activity: 'Сегодня, 10:24' },
      { uid: 'client-2', name: 'Mira Coffee', clientType:'company', relationshipStatus:'regular', industry:'HoReCa / кофе', website:'', source:'Повторный клиент', description:'Сеть кофеен и собственная обжарка кофе.', tags:'VIP, повторный клиент', person: 'Алина Воронова', position:'Управляющая', email: 'mira@coffee.by', phone: '+375 44 731-80-11', altPhone:'', telegram:'', actualAddress:'Минск', legalName:'', taxId:'', kpp:'', registrationNumber:'', country:'Беларусь', legalAddress:'', bankName:'', bankCode:'', swift:'', correspondentAccount:'', bankAccounts:'', contractNumber:'', contractDate:'', preferredCurrency:'BYN', paymentTerms:'По счёту', importantNotes:'', orders: 6, revenue: 10340, activity: 'Сегодня, 09:12' },
      { uid: 'client-3', name: 'Vector Lab', person: 'Максим Волчек', email: 'team@vectorlab.by', phone: '+375 25 604-12-09', orders: 4, revenue: 7120, activity: 'Вчера, 17:40' },
      { uid: 'client-4', name: 'Nova Dental', person: 'Ольга Миронова', email: 'office@novadental.by', phone: '+375 29 881-72-54', orders: 2, revenue: 5110, activity: 'Вчера, 11:25' },
      { uid: 'client-5', name: 'AeroFit', person: 'Илья Савич', email: 'hi@aerofit.by', phone: '+375 33 460-06-21', orders: 5, revenue: 6900, activity: '05.09.2026' },
      { uid: 'client-6', name: 'Kraft Room', person: 'Вера Лис', email: 'kraft@room.by', phone: '+375 29 320-18-72', orders: 3, revenue: 4180, activity: '02.09.2026' }
    ],
    deals: [
      { uid: 'deal-1', company: 'Radian Group', contact: 'Егор Соколов', email: 'egor@radian.by', phone: '+375 29 440-18-20', value: 2800, stage: 'proposal', nextAction: 'Отправить уточнённое предложение после комментариев', nextActionDate: '2026-09-10', source: 'Рекомендация', notes: 'Нужен корпоративный сайт с каталогом.', createdAt: '2026-09-02T10:00:00.000Z', updatedAt: '2026-09-08T14:20:00.000Z', stageChangedAt: '2026-09-06T12:00:00.000Z' },
      { uid: 'deal-2', company: 'Forma Studio', contact: 'Мария Романова', email: 'maria@forma.by', phone: '+375 44 228-10-55', value: 1500, stage: 'contact', nextAction: 'Созвониться и уточнить объём первой версии', nextActionDate: '2026-09-08', source: 'Сайт', notes: 'Интерес к лендингу под новую услугу.', createdAt: '2026-09-05T09:40:00.000Z', updatedAt: '2026-09-07T11:10:00.000Z', stageChangedAt: '2026-09-07T11:10:00.000Z' },
      { uid: 'deal-3', company: 'Astra Logistics', contact: 'Павел Ермак', email: 'pavel@astra.by', phone: '+375 25 703-41-09', value: 4300, stage: 'negotiation', nextAction: 'Согласовать финальную цену и дату старта', nextActionDate: '2026-09-11', source: 'Повторное обращение', notes: 'Корпоративный сайт + поддержка после запуска.', createdAt: '2026-08-28T12:00:00.000Z', updatedAt: '2026-09-08T16:00:00.000Z', stageChangedAt: '2026-09-08T16:00:00.000Z' },
      { uid: 'deal-4', company: 'Mira Coffee', contact: 'Алина Воронова', email: 'mira@coffee.by', phone: '+375 44 731-80-11', value: 4200, stage: 'won', nextAction: '', nextActionDate: '', source: 'Повторный клиент', notes: 'Интернет-магазин.', orderId: 'BP-1047', createdAt: '2026-08-20T10:30:00.000Z', updatedAt: '2026-09-01T10:30:00.000Z', stageChangedAt: '2026-09-01T10:30:00.000Z', wonAt: '2026-09-01T10:30:00.000Z' },
      { uid: 'deal-5', company: 'Craft Bureau', contact: 'Олег Мельник', email: 'hello@craftbureau.by', phone: '+375 29 331-07-90', value: 950, stage: 'lost', nextAction: '', nextActionDate: '', source: 'Telegram', notes: 'Отложили проект из-за бюджета.', createdAt: '2026-08-19T14:00:00.000Z', updatedAt: '2026-08-30T13:00:00.000Z', stageChangedAt: '2026-08-30T13:00:00.000Z', lostAt: '2026-08-30T13:00:00.000Z' }
    ],
    invoices: [
      { id: 'INV-0268', client: 'Vector Lab', amount: 1290, issued: '02.09.2026', due: '08.09.2026', expectedPaymentDate: '2026-09-12', status: 'overdue' },
      { id: 'INV-0269', client: 'GreenPoint', amount: 1680, issued: '08.09.2026', due: '15.09.2026', status: 'waiting' },
      { id: 'INV-0270', client: 'Nova Dental', amount: 1825, issued: '09.09.2026', due: '19.09.2026', status: 'waiting' },
      { id: 'INV-0267', client: 'AeroFit', amount: 790, issued: '31.08.2026', due: '05.09.2026', status: 'paid' },
      { id: 'INV-0266', client: 'Kraft Room', amount: 1550, issued: '26.08.2026', due: '31.08.2026', status: 'paid' }
    ],
    transactions: [
      { id: 1, type: 'income', title: 'Оплата INV-0267', category: 'Продажи', date: '05.09.2026', amount: 790 },
      { id: 2, type: 'expense', title: 'Google Ads', category: 'Маркетинг', date: '04.09.2026', amount: 420 },
      { id: 3, type: 'expense', title: 'Figma Professional', category: 'Сервисы', date: '03.09.2026', amount: 48 },
      { id: 4, type: 'income', title: 'Оплата INV-0266', category: 'Продажи', date: '31.08.2026', amount: 1550 },
      { id: 5, type: 'expense', title: 'Хостинг и домены', category: 'Инфраструктура', date: '30.08.2026', amount: 132 },
      { id: 6, type: 'expense', title: 'Коворкинг', category: 'Офис', date: '29.08.2026', amount: 360 }
    ],
    plannedPayments: [
      { uid: 'planned-1', type: 'expense', title: 'Коворкинг', category: 'Офис', date: '2026-09-12', amount: 360, note: 'Ежемесячный платёж' },
      { uid: 'planned-2', type: 'expense', title: 'Реклама', category: 'Маркетинг', date: '2026-09-18', amount: 500, note: 'Плановый бюджет кампании' },
      { uid: 'planned-3', type: 'income', title: 'Предоплата по проекту', category: 'Продажи', date: '2026-09-22', amount: 1200, note: 'Ожидаемое поступление' }
    ],
    services: [
      { uid: 'service-1', name: 'Лендинг под запуск', description: 'Одностраничный продающий сайт с адаптивом и базовой аналитикой.', price: 1500, sold: 12, icon: 'L' },
      { uid: 'service-2', name: 'Корпоративный сайт', description: 'Многостраничный сайт компании с продуманной структурой и CMS.', price: 3200, sold: 7, icon: 'C' },
      { uid: 'service-3', name: 'Интернет-магазин', description: 'Каталог, карточки, корзина и сценарий оформления заказа.', price: 4200, sold: 5, icon: 'E' },
      { uid: 'service-4', name: 'UX/UI аудит', description: 'Разбор интерфейса, проблем конверсии и конкретные рекомендации.', price: 790, sold: 9, icon: 'U' },
      { uid: 'service-5', name: 'Поддержка сайта', description: 'Обновления, исправления, контент и контроль стабильности.', price: 980, sold: 16, icon: 'S' },
      { uid: 'service-6', name: 'Прототип продукта', description: 'Интерактивный прототип веб-сервиса для проверки идеи.', price: 1900, sold: 4, icon: 'P' }
    ],
    notebooks: [
      { uid: 'notebook-1', name: 'Бизнес', createdAt: '2026-09-01T09:00:00.000Z' },
      { uid: 'notebook-2', name: 'Клиенты и встречи', createdAt: '2026-09-01T09:05:00.000Z' },
      { uid: 'notebook-3', name: 'Идеи', createdAt: '2026-09-01T09:10:00.000Z' }
    ],
    notes: [
      { uid: 'note-1', title: 'Главные цели на сентябрь', content: '1. Закрыть текущие проекты без просрочек.\n2. Получить оплаты по выставленным счетам.\n3. Подготовить новое предложение по сопровождению сайтов.\n4. Собрать идеи для следующего портфолио-проекта.', notebookId: 'notebook-1', tags: ['цели','сентябрь'], pinned: true, archivedAt: null, trashedAt: null, createdAt: '2026-09-02T08:00:00.000Z', updatedAt: '2026-09-09T08:30:00.000Z' },
      { uid: 'note-2', title: 'GreenPoint — итоги созвона', content: 'Дата: 09.09.2026\n\nОбсудили следующий этап лендинга.\n\nДоговорённости:\n☐ Подготовить финальный блок преимуществ\n☐ Проверить мобильную версию\n☐ Отправить клиенту ссылку на предпросмотр', notebookId: 'notebook-2', tags: ['клиент','greenpoint','встреча'], pinned: false, reminderAt: '2026-09-10T09:00', reminderDoneAt: null, linkedType: 'client', linkedId: 'client-1', history: [], archivedAt: null, trashedAt: null, createdAt: '2026-09-09T09:15:00.000Z', updatedAt: '2026-09-09T09:20:00.000Z' },
      { uid: 'note-3', title: 'Идеи для роста NorthPeak', content: '• Пакеты сопровождения после запуска сайта.\n• Ежемесячный аудит конверсии.\n• Готовые отраслевые решения для малого бизнеса.\n• Партнёрская программа с дизайнерами и маркетологами.', notebookId: 'notebook-3', tags: ['идеи','рост'], pinned: true, archivedAt: null, trashedAt: null, createdAt: '2026-09-05T14:00:00.000Z', updatedAt: '2026-09-08T18:00:00.000Z' },
      { uid: 'note-4', title: 'Чек-лист запуска нового проекта', content: '☐ Получить материалы от клиента\n☐ Зафиксировать объём работ\n☐ Согласовать сроки\n☐ Создать заказ в BizPilot\n☐ Выставить счёт / предоплату\n☐ Добавить ключевые дедлайны в календарь', notebookId: 'notebook-1', tags: ['чек-лист','проект'], pinned: false, archivedAt: null, trashedAt: null, createdAt: '2026-09-06T10:00:00.000Z', updatedAt: '2026-09-06T10:00:00.000Z' }
    ],
    events: [
      { uid: 'event-1', title: 'Созвон с GreenPoint', date: '2026-09-10', time: '10:00', type: 'meeting', reminder: 60, note: 'Обсудить следующий этап проекта.' },
      { uid: 'event-2', title: 'Проверить оплату счёта INV-0269', date: '2026-09-15', time: '12:00', type: 'payment', reminder: 1440, note: 'Если оплаты нет — написать клиенту.' },
      { uid: 'event-3', title: 'Дедлайн Nova Dental', date: '2026-09-17', time: '17:00', type: 'deadline', reminder: 2880, note: 'Финальная проверка перед сдачей.' }
    ],
    notifications: [],
    notificationLedger: [],
    business: {
      businessName: 'NorthPeak Studio',
      industry: 'Веб-разработка и digital',
      currency: 'BYN',
      email: 'zeter11@gmail.com',
      description: 'Небольшая digital-студия: сайты, дизайн и поддержка.',
      cashBalance: 12000
    },
    profile: {
      fullName: 'Дмитрий Колесниченко',
      role: 'Владелец',
      email: 'zeter11@gmail.com',
      phone: '+375445935190',
      city: 'Минск',
      website: 'https://dkl.do.am',
      bio: 'Веб-разработчик и создатель цифровых продуктов для малого бизнеса.',
      legalName: 'ИП Колесниченко Д.',
      unp: '',
      legalAddress: 'Минск, Беларусь',
      bankName: '',
      iban: '',
      bic: ''
    },
    chart: {
      labels12: ['Окт','Ноя','Дек','Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен'],
      revenue12: [5200,6100,7600,6500,8400,9300,10200,9700,11800,12600,13900,15420],
      expense12: [2500,2800,3300,3100,3600,4100,3900,4300,4800,4600,5120,4380]
    }
  };

  const statusMeta = {
    new: { label: 'Новый', cls: 'info' },
    work: { label: 'В работе', cls: 'warning' },
    done: { label: 'Готов', cls: 'success' },
    paid: { label: 'Оплачен', cls: 'neutral' },
    waiting: { label: 'Ожидает', cls: 'warning' },
    overdue: { label: 'Просрочен', cls: 'danger' }
  };

  const dealStageMeta = {
    lead: { label: 'Новый лид', cls: 'info', probability: 15 },
    contact: { label: 'Контакт', cls: 'info', probability: 30 },
    proposal: { label: 'Предложение', cls: 'warning', probability: 55 },
    negotiation: { label: 'Переговоры', cls: 'warning', probability: 75 },
    won: { label: 'Выиграна', cls: 'success', probability: 100 },
    lost: { label: 'Проиграна', cls: 'neutral', probability: 0 }
  };
  const activeDealStages = ['lead','contact','proposal','negotiation'];

  // Локальный справочник наиболее распространённых банков Беларуси. Для IBAN используется
  // правило НБРБ: 4 символа после BYxx соответствуют первым 4 символам BIC.
  const BELARUS_BANKS = [
    { name:'ОАО «АСБ Беларусбанк»', bic:'AKBBBY2X', aliases:['беларусбанк','асб беларусбанк'] },
    { name:'ОАО «Белагропромбанк»', bic:'BAPBBY2X', aliases:['белагропромбанк','бапб'] },
    { name:'ОАО «Белинвестбанк»', bic:'BLBBBY2X', aliases:['белинвестбанк'] },
    { name:'ОАО «Белгазпромбанк»', bic:'OLMPBY2X', aliases:['белгазпромбанк'] },
    { name:'«Приорбанк» ОАО', bic:'PJCBBY2X', aliases:['приорбанк'] },
    { name:'ЗАО «Альфа-Банк»', bic:'ALFABY2X', aliases:['альфа банк','альфа-банк'] },
    { name:'ЗАО «МТБанк»', bic:'MTBKBY22', aliases:['мтбанк','мт банк'] },
    { name:'ЗАО «БСБ Банк»', bic:'UNBSBY2X', aliases:['бсб банк','бсб'] },
    { name:'ЗАО «Банк «Решение»»', bic:'RSHNBY2X', aliases:['банк решение','решение'] },
    { name:'ЗАО «Банк РРБ»', bic:'REDJBY22', aliases:['банк ррб','ррб банк','ррб'] },
    { name:'ЗАО Банк ВТБ (Беларусь)', bic:'SLANBY22', aliases:['втб беларусь','банк втб','втб'] },
    { name:'ОАО «Банк БелВЭБ»', bic:'BELBBY2X', aliases:['белвэб','банк белвэб'] },
    { name:'ОАО «Сбер Банк»', bic:'BPSBBY2X', aliases:['сбер банк','сбербанк','бпс сбербанк'] },
    { name:'ОАО «Технобанк»', bic:'TECNBY22', aliases:['технобанк'] }
  ];

  const viewTitles = {
    dashboard: ['Обзор', 'Обзор бизнеса'],
    orders: ['Заказы', 'Заказы'],
    clients: ['Клиенты', 'Клиенты'],
    sales: ['Продажи', 'Продажи и сделки'],
    finance: ['Финансы', 'Финансы'],
    cashflow: ['Денежный поток', 'Денежный поток и прогноз'],
    invoices: ['Счета', 'Счета и оплаты'],
    services: ['Услуги', 'Товары и услуги'],
    notes: ['Блокноты', 'Блокноты и заметки'],
    analytics: ['Аналитика', 'Аналитика бизнеса'],
    calendar: ['Календарь', 'Календарь и события'],
    notifications: ['Уведомления', 'Центр уведомлений'],
    calculations: ['Подсчёты', 'Подсчёты для предпринимателя'],
    learning: ['Обучение', 'Обучение и быстрый старт'],
    profile: ['Ваши данные', 'Ваши данные'],
    settings: ['Настройки', 'Настройки'],
    updates: ['Обновления', 'История обновлений']
  };

  const NOTE_TEMPLATES = {
    empty: { title: '', content: '', tags: [] },
    meeting: { title: 'Итоги встречи — ', content: 'Дата:\nУчастники:\nЦель встречи:\n\nЧто обсудили:\n• \n\nРешения:\n• \n\nСледующие шаги:\n☐ ', tags: ['встреча'] },
    client: { title: 'Клиент — ', content: 'Контакт:\nКомпания:\nТелефон / email:\n\nПотребность клиента:\n\nЧто предложили:\n\nДоговорённости:\n☐ \n\nСледующий контакт:', tags: ['клиент'] },
    idea: { title: 'Бизнес-идея — ', content: 'Проблема / возможность:\n\nИдея решения:\n\nДля кого:\n\nКакую ценность даёт:\n\nКак проверить быстро и дёшево:\n☐ ', tags: ['идея'] },
    weekly: { title: 'План недели — ', content: '3 главных результата недели:\n1. \n2. \n3. \n\nДеньги и оплаты:\n☐ \n\nКлиенты и продажи:\n☐ \n\nПроекты и дедлайны:\n☐ \n\nЧто не делать на этой неделе:\n• ', tags: ['план','неделя'] },
    sales: { title: 'Продажный созвон — ', content: 'Клиент:\nКонтакт:\nДата:\n\nЗадача клиента:\n\nБюджет / диапазон:\n\nСрок принятия решения:\n\nВозражения и вопросы:\n• \n\nСледующий шаг:\n☐ \n\nКогда связаться снова:', tags: ['продажи','лид'] },
    sop: { title: 'Инструкция — ', content: 'Цель процесса:\n\nКогда использовать:\n\nОтветственный:\n\nПошагово:\n1. \n2. \n3. \n\nКонтроль качества:\n☐ \n\nЧто делать при ошибке:\n', tags: ['инструкция','процесс'] },
    decision: { title: 'Решение — ', content: 'Что нужно решить:\n\nПочему это важно:\n\nВарианты:\n1. \n2. \n3. \n\nКритерии выбора:\n• \n\nРешение:\n\nПочему выбрали его:\n\nПроверить результат до:', tags: ['решение'] },
    marketing: { title: 'Маркетинговая гипотеза — ', content: 'Гипотеза:\n\nЦелевая аудитория:\n\nКанал:\n\nОффер:\n\nБюджет:\n\nГлавная метрика:\n\nКак поймём, что гипотеза сработала:\n☐ \n\nРезультат теста:', tags: ['маркетинг','гипотеза'] }
  };

  const CALCULATOR_DEFAULTS = {
    marginCost: 700, marginPrice: 1200,
    beFixed: 4000, bePrice: 500, beVariable: 180,
    rateIncome: 5000, rateCosts: 1500, rateTax: 6, rateHours: 100,
    discountPrice: 1500, discountRate: 10, discountCost: 700,
    roiSpend: 800, roiRevenue: 3200, roiCost: 1200,
    ltvMarketing: 1500, ltvNewClients: 10, ltvAverage: 1200, ltvPurchases: 3,
    planRevenue: 20000, planAverage: 1500, planDays: 22,
    runwayCash: 12000, runwayCosts: 3500, runwayTarget: 6,
    acqAmount: 2000, acqRate: 2.5, acqFixed: 0,
    rkoTurnover: 20000, rkoMonthlyFee: 35, rkoPayments: 20, rkoPaymentFee: 1.5, rkoOtherFees: 10
  };

  let demoMode = loadDemoMode();
  let data = loadData();
  let orderFilter = 'all';
  let invoiceFilter = 'all';
  let financeFilter = 'all';
  let financePeriod = 'month';
  let cashflowHorizon = 30;
  let activeView = 'dashboard';
  let prefs = loadPrefs();
  let calculatorState = loadCalculatorState();
  let uiState = loadUiState();
  let notificationTimer = null;
  let notificationFilter = 'all';
  let noteSaveTimer = null;
  let undoSnapshot = null;
  let storageWarningShown = false;
  let lastFocusedBeforeModal = null;
  let autoThemeTimer = null;
  let lastEffectiveTheme = '';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));

  function cloneSeed() { return JSON.parse(JSON.stringify(seed)); }
  function makeCleanState() {
    return {
      orders: [], clients: [], deals: [], invoices: [], transactions: [], plannedPayments: [], services: [], notebooks: [], notes: [], events: [], notifications: [], notificationLedger: [],
      business: { businessName: '', industry: '', currency: 'BYN', email: '', description: '', cashBalance: 0 },
      profile: { fullName: '', role: '', email: '', phone: '', city: '', website: '', bio: '', legalName: '', unp: '', legalAddress: '', bankName: '', iban: '', bic: '' },
      chart: { labels12: [...seed.chart.labels12], revenue12: Array(12).fill(0), expense12: Array(12).fill(0) }
    };
  }
  function safeStorageGet(key) {
    try { return localStorage.getItem(key); }
    catch (error) { console.warn('BizPilot: localStorage недоступен для чтения', error); return null; }
  }
  function safeStorageRemove(key) {
    try { localStorage.removeItem(key); return true; }
    catch (error) { console.warn('BizPilot: localStorage недоступен для удаления', error); return false; }
  }
  function safeSessionGet(key) {
    try { return sessionStorage.getItem(key); }
    catch { return null; }
  }
  function safeSessionSet(key, value) {
    try { sessionStorage.setItem(key, value); return true; }
    catch { return false; }
  }
  function safeSessionRemove(key) {
    try { sessionStorage.removeItem(key); }
    catch {}
  }
  function clearBizPilotStorage(type) {
    try {
      const storage = window[type];
      const isBizPilotKey = key => /biz[\s_-]*pilot/i.test(String(key));
      Object.keys(storage).filter(isBizPilotKey).forEach(key => storage.removeItem(key));
    } catch (error) { console.warn('BizPilot: не удалось полностью очистить браузерное хранилище', error); }
  }
  function loadDemoMode() {
    const stored = safeStorageGet(DEMO_MODE_KEY);
    if (stored !== null) return stored === '1';
    // Новая установка стартует с чистой рабочей областью. Старую v15-сессию
    // считаем демо только при явной сигнатуре встроенных примеров.
    try {
      const raw = JSON.parse(safeStorageGet(STORAGE_KEY));
      const hasLegacyDemoSignature =
        Array.isArray(raw?.orders) && raw.orders.some(item => item?.id === 'BP-1048') &&
        Array.isArray(raw?.clients) && raw.clients.some(item => item?.name === 'GreenPoint');
      return !!hasLegacyDemoSignature;
    } catch { return false; }
  }
  function safeStorageSet(key, value, label = 'данные') {
    try { localStorage.setItem(key, value); return true; }
    catch (error) {
      console.error(`BizPilot: не удалось сохранить ${label}`, error);
      if (!storageWarningShown) {
        storageWarningShown = true;
        setTimeout(() => toast('Не удалось сохранить данные в браузере. Скачайте ZIP-копию и освободите место в хранилище.', 'Открыть резервные копии', () => switchView('profile'), 9000), 0);
      }
      return false;
    }
  }
  function saveDemoMode() { safeStorageSet(DEMO_MODE_KEY, demoMode ? '1' : '0', 'режим работы'); }
  function hasLiveWorkspaceSnapshot() {
    try {
      const snapshot = JSON.parse(safeStorageGet(LIVE_SNAPSHOT_KEY));
      return !!(snapshot && snapshot.data && snapshot.savedAt);
    } catch { return false; }
  }
  function applyDemoMode() {
    document.body.classList.toggle('demo-active', demoMode);
    const badge = $('#navLearningDemoBadge');
    if (badge) badge.hidden = !demoMode;
  }
  function makeId(prefix) {
    const rand = (crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`).replace(/[^a-z0-9-]/gi, '');
    return `${prefix}-${rand}`;
  }
  function slug(value) { return String(value || '').toLowerCase().replace(/[^a-zа-яё0-9]+/gi, '-').replace(/^-+|-+$/g, '').slice(0, 32) || 'item'; }
  function normalizeData(raw, isDemo = demoMode) {
    const base = isDemo ? cloneSeed() : makeCleanState();
    if (raw && typeof raw === 'object') {
      ['orders','clients','deals','invoices','transactions','plannedPayments','services','notebooks','notes','events','notifications','notificationLedger'].forEach(key => { if (Array.isArray(raw[key])) base[key] = raw[key]; });
      if (raw.chart && typeof raw.chart === 'object') base.chart = { ...base.chart, ...raw.chart };
      if (raw.business && typeof raw.business === 'object') base.business = { ...base.business, ...raw.business };
      if (raw.profile && typeof raw.profile === 'object') base.profile = { ...base.profile, ...raw.profile };
    }
    base.clients = base.clients.map((c, i) => ({
      ...c,
      uid: c.uid || `client-${i + 1}-${slug(c.name || 'client')}`,
      name: String(c.name || '').trim(),
      clientType: ['company','entrepreneur','person'].includes(c.clientType) ? c.clientType : 'company',
      relationshipStatus: ['active','regular','paused','archived'].includes(c.relationshipStatus) ? c.relationshipStatus : 'active',
      industry: String(c.industry || '').trim(),
      website: String(c.website || '').trim(),
      source: String(c.source || '').trim(),
      description: String(c.description || ''),
      tags: String(c.tags || ''),
      person: String(c.person || '').trim(),
      position: String(c.position || '').trim(),
      email: String(c.email || '').trim(),
      phone: String(c.phone || '').trim(),
      altPhone: String(c.altPhone || '').trim(),
      telegram: String(c.telegram || '').trim(),
      actualAddress: String(c.actualAddress || ''),
      legalName: String(c.legalName || '').trim(),
      taxId: String(c.taxId || '').trim(),
      kpp: String(c.kpp || '').trim(),
      registrationNumber: String(c.registrationNumber || '').trim(),
      country: String(c.country || '').trim(),
      legalAddress: String(c.legalAddress || ''),
      bankName: String(c.bankName || '').trim(),
      bankCode: String(c.bankCode || '').trim(),
      swift: String(c.swift || '').trim(),
      correspondentAccount: String(c.correspondentAccount || '').trim(),
      bankAccounts: String(c.bankAccounts || ''),
      contractNumber: String(c.contractNumber || '').trim(),
      contractDate: /^\d{4}-\d{2}-\d{2}$/.test(String(c.contractDate || '')) ? String(c.contractDate) : '',
      preferredCurrency: ['BYN','RUB','USD','EUR'].includes(String(c.preferredCurrency || '')) ? String(c.preferredCurrency) : (['BYN','RUB','USD','EUR'].includes(String(base.business.currency || '')) ? String(base.business.currency) : 'BYN'),
      paymentTerms: String(c.paymentTerms || ''),
      importantNotes: String(c.importantNotes || ''),
      orders: Math.max(0, Number(c.orders || 0)),
      revenue: Math.max(0, Number(c.revenue || 0)),
      activity: String(c.activity || '')
    }));
    base.orders = (base.orders || []).map(item => ({ ...item, amount: Number(item.amount || 0), cost: item.cost === '' || item.cost == null ? null : Math.max(0, Number(item.cost || 0)), plannedHours: Math.max(0, Number(item.plannedHours || 0)), trackedMinutes: Math.max(0, Number(item.trackedMinutes || 0)), timerStartedAt: item.timerStartedAt && !Number.isNaN(new Date(item.timerStartedAt).getTime()) ? String(item.timerStartedAt) : null }));
    base.deals = (base.deals || []).map((item, i) => {
      const stage = dealStageMeta[item.stage] ? item.stage : 'lead';
      return { ...item, uid: item.uid || `deal-${i + 1}-${slug(item.company || 'deal')}`, company: String(item.company || '').trim(), contact: String(item.contact || '').trim(), email: String(item.email || '').trim(), phone: String(item.phone || '').trim(), value: Math.max(0, Number(item.value || 0)), stage, nextAction: String(item.nextAction || '').trim(), nextActionDate: /^\d{4}-\d{2}-\d{2}$/.test(String(item.nextActionDate || '')) ? String(item.nextActionDate) : '', source: String(item.source || '').trim(), notes: String(item.notes || ''), orderId: String(item.orderId || ''), createdAt: item.createdAt || new Date().toISOString(), updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(), stageChangedAt: item.stageChangedAt || item.updatedAt || item.createdAt || new Date().toISOString(), wonAt: item.wonAt || null, lostAt: item.lostAt || null };
    });
    base.services = base.services.map((item, i) => ({ ...item, uid: item.uid || `service-${i + 1}-${slug(item.name || 'service')}` }));
    base.invoices = (base.invoices || []).map(item => ({ ...item, expectedPaymentDate: /^\d{4}-\d{2}-\d{2}$/.test(String(item.expectedPaymentDate || '')) ? String(item.expectedPaymentDate) : '' }));
    base.notebooks = (base.notebooks || []).map((item, i) => ({ ...item, uid: item.uid || `notebook-${i + 1}-${slug(item.name || 'notebook')}`, name: String(item.name || `Блокнот ${i + 1}`).trim(), createdAt: item.createdAt || new Date().toISOString() }));
    const notebookIds = new Set(base.notebooks.map(item => item.uid));
    base.notes = (base.notes || []).map((item, i) => ({ ...item, uid: item.uid || `note-${i + 1}-${slug(item.title || 'note')}`, title: String(item.title || ''), content: String(item.content || ''), notebookId: notebookIds.has(item.notebookId) ? item.notebookId : '', tags: Array.isArray(item.tags) ? [...new Set(item.tags.map(tag => String(tag).trim().replace(/^#/, '')).filter(Boolean))] : [], pinned: !!item.pinned, reminderAt: String(item.reminderAt || ''), reminderDoneAt: item.reminderDoneAt || null, linkedType: ['client','deal','order','invoice','event'].includes(item.linkedType) ? item.linkedType : '', linkedId: String(item.linkedId || ''), history: Array.isArray(item.history) ? item.history.slice(-12).map(h => ({ savedAt: h.savedAt || new Date().toISOString(), title: String(h.title || ''), content: String(h.content || ''), notebookId: notebookIds.has(h.notebookId) ? h.notebookId : '', tags: Array.isArray(h.tags) ? h.tags.map(x=>String(x)) : [], reminderAt: String(h.reminderAt || ''), linkedType: ['client','deal','order','invoice','event'].includes(h.linkedType) ? h.linkedType : '', linkedId: String(h.linkedId || '') })) : [], archivedAt: item.archivedAt || null, trashedAt: item.trashedAt || null, createdAt: item.createdAt || new Date().toISOString(), updatedAt: item.updatedAt || item.createdAt || new Date().toISOString() }));
    base.events = (base.events || []).map((item, i) => ({ ...item, uid: item.uid || `event-${i + 1}-${slug(item.title || 'event')}`, reminder: Number(item.reminder ?? 60), completedAt: item.completedAt || null }));
    base.plannedPayments = (base.plannedPayments || []).map((item, i) => ({ ...item, uid: item.uid || `planned-${i + 1}-${slug(item.title || 'payment')}`, type: item.type === 'income' ? 'income' : 'expense', amount: Number(item.amount || 0), date: String(item.date || todayIso()), completedAt: item.completedAt || null }));
    base.business.cashBalance = Number(base.business.cashBalance || 0);
    base.notifications = (base.notifications || []).map((item, i) => ({ ...item, uid: item.uid || `notification-${i + 1}-${slug(item.title || 'notification')}` }));
    base.notificationLedger = Array.from(new Set(base.notificationLedger || []));
    base.transactions = base.transactions.map(t => {
      let next = { ...t };
      if (!next.invoiceId) { const m = String(next.title || '').match(/INV-\d+/i); if (m) next.invoiceId = m[0].toUpperCase(); }
      if (next.invoiceId) { next.type = 'income'; next.category = 'Продажи'; next.title = `Оплата ${next.invoiceId}`; }
      return next;
    });
    // Миграция старых демонстрационных контактов без перезаписи пользовательских данных.
    if (base.profile.email === 'hello@northpeak.by') base.profile.email = 'zeter11@gmail.com';
    if (base.profile.phone === '+375 29 000-00-00') base.profile.phone = '+375445935190';
    if (base.business.email === 'hello@northpeak.by') base.business.email = 'zeter11@gmail.com';
    return base;
  }
  function loadData() {
    try { return normalizeData(JSON.parse(safeStorageGet(STORAGE_KEY))); }
    catch { return demoMode ? cloneSeed() : makeCleanState(); }
  }
  function saveData() { return safeStorageSet(STORAGE_KEY, JSON.stringify(data), 'бизнес-данные'); }
  function loadPrefs() {
    const defaults = { theme: 'light', compact: false, autoLocation: null };
    try {
      const raw = JSON.parse(safeStorageGet(PREFS_KEY)) || {};
      const theme = ['light','dark','auto'].includes(raw.theme) ? raw.theme : 'light';
      const autoLocation = raw.autoLocation && Number.isFinite(Number(raw.autoLocation.lat)) && Number.isFinite(Number(raw.autoLocation.lon)) ? { lat:Number(raw.autoLocation.lat), lon:Number(raw.autoLocation.lon) } : null;
      return { ...defaults, ...raw, theme, autoLocation };
    }
    catch { return defaults; }
  }
  function savePrefs() { return safeStorageSet(PREFS_KEY, JSON.stringify(prefs), 'настройки интерфейса'); }

  function loadCalculatorState() {
    try { return { ...CALCULATOR_DEFAULTS, ...(JSON.parse(safeStorageGet(CALC_KEY)) || {}) }; }
    catch { return { ...CALCULATOR_DEFAULTS }; }
  }
  function saveCalculatorState() {
    calculatorState = collectCalculatorState();
    safeStorageSet(CALC_KEY, JSON.stringify(calculatorState), 'подсчёты');
  }
  function collectCalculatorState() {
    const out = { ...CALCULATOR_DEFAULTS };
    Object.keys(out).forEach(id => {
      const el = $(`#${id}`);
      if (el) out[id] = el.value === '' ? null : Number(el.value);
    });
    return out;
  }
  function restoreCalculatorInputs() {
    const state = { ...CALCULATOR_DEFAULTS, ...(calculatorState || {}) };
    Object.entries(state).forEach(([id, value]) => { const el = $(`#${id}`); if (el) el.value = value == null ? '' : value; });
  }
  function loadUiState() {
    try { return { focusDone: {}, learningDone: {}, chartPeriod: 6, calendarMonth: '', cashflowHorizon: 30, notesFilter: 'all', notesNotebook: 'all', notesTag: '', notesSort: 'updated', selectedNoteId: '', notePreview: false, noteHistoryOpen: false, noteFocus: false, noteTabs: [], ...(JSON.parse(safeStorageGet(UI_KEY)) || {}) }; }
    catch { return { focusDone: {}, learningDone: {}, chartPeriod: 6, calendarMonth: '', cashflowHorizon: 30, notesFilter: 'all', notesNotebook: 'all', notesTag: '', notesSort: 'updated', selectedNoteId: '', notePreview: false, noteHistoryOpen: false, noteFocus: false, noteTabs: [] }; }
  }
  function saveUiState() { return safeStorageSet(UI_KEY, JSON.stringify(uiState), 'состояние интерфейса'); }
  function restoreUiState() {
    const period = [6, 12].includes(Number(uiState.chartPeriod)) ? Number(uiState.chartPeriod) : 6;
    if ($('#chartPeriod')) $('#chartPeriod').value = String(period);
    uiState.focusDone = uiState.focusDone && typeof uiState.focusDone === 'object' && !Array.isArray(uiState.focusDone) ? uiState.focusDone : {};
    uiState.learningDone = uiState.learningDone && typeof uiState.learningDone === 'object' && !Array.isArray(uiState.learningDone) ? uiState.learningDone : {};
  }

  function reconcileDerivedData() {
    if (demoMode) return false;
    let changed = false;
    const orderCounts = new Map();
    data.orders.forEach(o => orderCounts.set(o.client, (orderCounts.get(o.client) || 0) + 1));
    const paidRevenue = new Map();
    data.invoices.filter(i => i.status === 'paid').forEach(i => paidRevenue.set(i.client, (paidRevenue.get(i.client) || 0) + Number(i.amount || 0)));
    data.clients.forEach(c => {
      const orders = orderCounts.get(c.name) || 0;
      const revenue = paidRevenue.get(c.name) || 0;
      if (Number(c.orders || 0) !== orders) { c.orders = orders; changed = true; }
      if (Number(c.revenue || 0) !== revenue) { c.revenue = revenue; changed = true; }
    });
    const soldCounts = new Map();
    data.orders.filter(o => ['done','paid'].includes(o.status)).forEach(o => soldCounts.set(o.service, (soldCounts.get(o.service) || 0) + 1));
    data.services.forEach(item => {
      const sold = soldCounts.get(item.name) || 0;
      if (Number(item.sold || 0) !== sold) { item.sold = sold; changed = true; }
    });
    return changed;
  }

  function collectDataHealthIssues() {
    const issues = [];
    const clientNames = data.clients.map(c => String(c.name || '').trim().toLowerCase()).filter(Boolean);
    const serviceNames = data.services.map(c => String(c.name || '').trim().toLowerCase()).filter(Boolean);
    const duplicateClients = clientNames.filter((name, i) => clientNames.indexOf(name) !== i);
    const duplicateServices = serviceNames.filter((name, i) => serviceNames.indexOf(name) !== i);
    const notebookNames = (data.notebooks || []).map(x => String(x.name || '').trim().toLowerCase()).filter(Boolean);
    const duplicateNotebooks = notebookNames.filter((name, i) => notebookNames.indexOf(name) !== i);
    const notebookIds = new Set((data.notebooks || []).map(x => x.uid));
    const orphanNotes = (data.notes || []).filter(note => note.notebookId && !notebookIds.has(note.notebookId));
    const noteLinkExists = note => !note.linkedType || !note.linkedId || (note.linkedType==='client' && data.clients.some(x=>x.uid===note.linkedId)) || (note.linkedType==='deal' && (data.deals||[]).some(x=>x.uid===note.linkedId)) || (note.linkedType==='order' && data.orders.some(x=>x.id===note.linkedId)) || (note.linkedType==='invoice' && data.invoices.some(x=>x.id===note.linkedId)) || (note.linkedType==='event' && (data.events||[]).some(x=>x.uid===note.linkedId));
    const orphanNoteLinks = (data.notes || []).filter(note => !noteLinkExists(note));
    const invalidNoteReminders = (data.notes || []).filter(note => note.reminderAt && !noteReminderTimestamp(note));
    if (duplicateClients.length) issues.push({ kind:'warning', fixable:false, text:`Дубликаты клиентов: ${new Set(duplicateClients).size}. Переименуйте один из дублей вручную.` });
    if (duplicateServices.length) issues.push({ kind:'warning', fixable:false, text:`Дубликаты услуг: ${new Set(duplicateServices).size}. Переименуйте один из дублей вручную.` });
    if (duplicateNotebooks.length) issues.push({ kind:'warning', fixable:false, text:`Дубликаты блокнотов: ${new Set(duplicateNotebooks).size}. Переименуйте один из дублей вручную.` });
    if (orphanNotes.length) issues.push({ kind:'warning', fixable:true, text:`Заметки без существующего блокнота: ${orphanNotes.length}` });
    if (orphanNoteLinks.length) issues.push({ kind:'warning', fixable:true, text:`Заметки со ссылкой на удалённые объекты: ${orphanNoteLinks.length}` });
    if (invalidNoteReminders.length) issues.push({ kind:'warning', fixable:true, text:`Заметки с некорректной датой напоминания: ${invalidNoteReminders.length}` });
    const paidWithoutPayment = data.invoices.filter(inv => inv.status === 'paid' && !data.transactions.some(t => t.invoiceId === inv.id));
    if (paidWithoutPayment.length) issues.push({ kind:'danger', fixable:true, text:`Оплаченные счета без финансовой операции: ${paidWithoutPayment.length}` });
    const orphanPayments = data.transactions.filter(t => t.invoiceId && !data.invoices.some(inv => inv.id === t.invoiceId));
    if (orphanPayments.length) issues.push({ kind:'warning', fixable:true, text:`Операции со ссылкой на удалённый счёт: ${orphanPayments.length}` });
    const duplicateLedger = (data.notificationLedger || []).length - new Set(data.notificationLedger || []).size;
    if (duplicateLedger > 0) issues.push({ kind:'warning', fixable:true, text:`Дубликаты служебных записей уведомлений: ${duplicateLedger}` });
    return issues;
  }

  function repairDataIntegrity() {
    let fixes = 0;
    (data.transactions || []).forEach(t => {
      if (t.invoiceId && !data.invoices.some(inv => inv.id === t.invoiceId)) { delete t.invoiceId; fixes++; }
    });
    data.invoices.filter(inv => inv.status === 'paid').forEach(inv => { if (ensureInvoicePayment(inv)) fixes++; });
    const notebookIds = new Set((data.notebooks || []).map(x => x.uid));
    (data.notes || []).forEach(note => { if (note.notebookId && !notebookIds.has(note.notebookId)) { note.notebookId = ''; fixes++; } });
    (data.notes || []).forEach(note => {
      const linked=noteLinkedEntity(note);
      if (linked?.type==='missing') { note.linkedType=''; note.linkedId=''; fixes++; }
      if (note.reminderAt && !noteReminderTimestamp(note)) { note.reminderAt=''; note.reminderDoneAt=null; fixes++; }
    });
    const uniqueLedger = Array.from(new Set(data.notificationLedger || []));
    if (uniqueLedger.length !== (data.notificationLedger || []).length) { data.notificationLedger = uniqueLedger; fixes++; }
    if (reconcileDerivedData()) fixes++;
    if (syncInvoiceStatuses()) fixes++;
    saveData(); renderAll();
    toast(fixes ? `Исправлено проблем: ${fixes}` : 'Проблем с целостностью не найдено');
  }

  function currencyCode() {
    const code = String(data?.business?.currency || 'BYN').toUpperCase();
    return ['BYN','RUB','USD','EUR'].includes(code) ? code : 'BYN';
  }
  function currencyLabel() { return currencyCode(); }
  function formatMoney(v) {
    const code = currencyCode();
    try {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: code, maximumFractionDigits: 0 }).format(Number(v) || 0);
    } catch {
      return `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(Number(v) || 0)} ${code}`;
    }
  }
  function updateCurrencyLabels() {
    const code = currencyLabel();
    $$('.calc-fields label > span').forEach(span => {
      if (!span.dataset.currencyTemplate && /BYN/.test(span.textContent)) span.dataset.currencyTemplate = span.textContent;
      if (span.dataset.currencyTemplate) span.textContent = span.dataset.currencyTemplate.replace(/BYN/g, code);
    });
  }
  function initials(name) { return String(name).split(/\s+/).filter(Boolean).slice(0,2).map(x => x[0]).join('').toUpperCase(); }
  function toast(message, actionLabel = '', action = null, timeout = 3400) {
    const el = document.createElement('div');
    el.className = 'toast';
    const text = document.createElement('span');
    text.textContent = message;
    el.appendChild(text);
    if (actionLabel && typeof action === 'function') {
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'toast-action'; btn.textContent = actionLabel;
      btn.addEventListener('click', () => { try { action(); } finally { el.remove(); } });
      el.appendChild(btn);
    }
    $('#toastStack').appendChild(el);
    setTimeout(() => el.remove(), timeout);
  }
  function snapshotForUndo(label) {
    undoSnapshot = { label, data: JSON.stringify(data), expiresAt: Date.now() + 12000 };
  }
  function offerUndo(message) {
    const snapshot = undoSnapshot;
    toast(message, 'Отменить', () => {
      if (!snapshot || snapshot.expiresAt < Date.now()) { toast('Время для отмены истекло'); return; }
      data = normalizeData(JSON.parse(snapshot.data));
      undoSnapshot = null; saveData(); renderAll(); toast('Удаление отменено');
    }, 12000);
  }

  function solarDayOfYear(date) {
    const start = Date.UTC(date.getUTCFullYear(), 0, 0);
    return Math.floor((Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start) / 86400000);
  }
  function norm360(value) { return ((value % 360) + 360) % 360; }
  function norm24(value) { return ((value % 24) + 24) % 24; }
  function solarEventTimestamp(date, lat, lon, sunrise) {
    const rad = Math.PI / 180, deg = 180 / Math.PI;
    const n = solarDayOfYear(date), lngHour = lon / 15;
    const t = n + ((sunrise ? 6 : 18) - lngHour) / 24;
    const m = (0.9856 * t) - 3.289;
    let l = norm360(m + 1.916 * Math.sin(m * rad) + 0.020 * Math.sin(2 * m * rad) + 282.634);
    let ra = norm360(Math.atan(0.91764 * Math.tan(l * rad)) * deg);
    const lQuadrant = Math.floor(l / 90) * 90, raQuadrant = Math.floor(ra / 90) * 90;
    ra = (ra + lQuadrant - raQuadrant) / 15;
    const sinDec = 0.39782 * Math.sin(l * rad), cosDec = Math.cos(Math.asin(sinDec));
    const zenith = 90.833;
    const cosH = (Math.cos(zenith * rad) - sinDec * Math.sin(lat * rad)) / (cosDec * Math.cos(lat * rad));
    if (!Number.isFinite(cosH) || cosH > 1 || cosH < -1) return null;
    let h = sunrise ? 360 - Math.acos(cosH) * deg : Math.acos(cosH) * deg;
    h /= 15;
    const localMean = h + ra - (0.06571 * t) - 6.622;
    const utcHour = norm24(localMean - lngHour);
    const hours = Math.floor(utcHour), minutes = Math.round((utcHour - hours) * 60);
    return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), hours, minutes, 0, 0);
  }
  function autoThemeWindow() {
    const loc = prefs.autoLocation;
    if (!loc) return null;
    const now = new Date();
    const sunrise = solarEventTimestamp(now, Number(loc.lat), Number(loc.lon), true);
    const sunset = solarEventTimestamp(now, Number(loc.lat), Number(loc.lon), false);
    return sunrise && sunset ? { sunrise, sunset } : null;
  }
  function effectiveTheme() {
    if (prefs.theme !== 'auto') return prefs.theme === 'dark' ? 'dark' : 'light';
    const windowInfo = autoThemeWindow();
    if (windowInfo) return Date.now() >= windowInfo.sunrise && Date.now() < windowInfo.sunset ? 'light' : 'dark';
    const hour = new Date().getHours();
    return hour >= 7 && hour < 19 ? 'light' : 'dark';
  }
  function formatClock(ts) { return new Date(ts).toLocaleTimeString('ru-RU', { hour:'2-digit', minute:'2-digit' }); }
  function requestAutoThemeLocation() {
    if (!navigator.geolocation) { toast('Геолокация недоступна — авто-тема будет работать по времени 07:00–19:00'); return; }
    navigator.geolocation.getCurrentPosition(pos => {
      prefs.autoLocation = { lat:pos.coords.latitude, lon:pos.coords.longitude };
      savePrefs(); applyPrefs(); renderChart(Number($('#chartPeriod')?.value || 6));
      toast('Авто-тема настроена по локальным восходу и закату');
    }, () => {
      prefs.autoLocation = null; savePrefs(); applyPrefs();
      toast('Геолокация не разрешена — авто-тема использует режим 07:00–19:00');
    }, { enableHighAccuracy:false, timeout:8000, maximumAge:86400000 });
  }
  function applyPrefs() {
    const resolved = effectiveTheme();
    document.documentElement.dataset.theme = resolved;
    document.body.classList.toggle('compact', !!prefs.compact);
    const themeSetting = $('#themeSetting');
    if (themeSetting) {
      themeSetting.classList.toggle('active', prefs.theme === 'dark');
      themeSetting.classList.toggle('auto', prefs.theme === 'auto');
    }
    const themeBtn = $('#themeBtn');
    if (themeBtn) {
      themeBtn.dataset.themeMode = prefs.theme;
      themeBtn.textContent = prefs.theme === 'auto' ? 'A' : prefs.theme === 'dark' ? '☾' : '☀';
      themeBtn.setAttribute('aria-label', prefs.theme === 'auto' ? 'Тема: авто по восходу и закату' : prefs.theme === 'dark' ? 'Тема: тёмная' : 'Тема: светлая');
    }
    const hint = $('#themeSettingHint');
    if (hint) {
      const windowInfo = prefs.theme === 'auto' ? autoThemeWindow() : null;
      hint.textContent = prefs.theme === 'auto' ? (windowInfo ? `Авто · светлая примерно ${formatClock(windowInfo.sunrise)}–${formatClock(windowInfo.sunset)}` : 'Авто · без геолокации: светлая 07:00–19:00') : prefs.theme === 'dark' ? 'Тёмная тема · нажмите ещё раз для авто' : 'Светлая тема · нажмите для тёмной';
    }
    const density = $('#densitySetting'); if (density) density.classList.toggle('active', !!prefs.compact);
    lastEffectiveTheme = resolved;
  }
  function startAutoThemeWatcher() {
    clearInterval(autoThemeTimer);
    autoThemeTimer = setInterval(() => {
      if (prefs.theme !== 'auto') return;
      const before = lastEffectiveTheme;
      applyPrefs();
      if (before && before !== lastEffectiveTheme) renderChart(Number($('#chartPeriod')?.value || 6));
    }, 60000);
  }

  function switchView(view) {
    if (!viewTitles[view]) return;
    activeView = view;
    $$('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.view === view));
    $$('.sidebar-version').forEach(btn => btn.classList.toggle('active', view === 'updates'));
    $$('.view').forEach(panel => panel.classList.toggle('active', panel.dataset.viewPanel === view));
    $('#breadcrumbText').textContent = viewTitles[view][0];
    $('#pageTitle').textContent = viewTitles[view][1];
    history.replaceState(null, '', '#' + view);
    closeSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'notes') renderNotes();
    if (view === 'calendar') renderCalendar();
    if (view === 'cashflow') renderCashflow();
    if (view === 'notifications') renderNotifications();
    if (view === 'learning') renderLearning();
  }

  function renderAll() {
    let dataChanged = false;
    if (syncInvoiceStatuses()) dataChanged = true;
    if (reconcileDerivedData()) dataChanged = true;
    if (dataChanged) saveData();
    renderDashboard();
    renderLearning();
    renderOrders();
    renderClients();
    renderSales();
    renderFinance();
    renderCashflow();
    renderInvoices();
    renderServices();
    renderNotes();
    renderAnalytics();
    generateImportantNotifications();
    renderCalendar();
    renderNotifications();
    renderPersistentReminders();
    renderIdentity();
    renderSettings();
    renderProfile();
    renderCalculators();
    updateCurrencyLabels();
    applyDemoMode();
    updateNotificationIndicator();
    $$('[data-app-version]').forEach(el => { el.textContent = APP_VERSION; });
    $('#navOrdersBadge').textContent = data.orders.filter(x => x.status === 'new').length;
    const noteBadge=$('#navNotesBadge'); if(noteBadge){const count=(data.notes||[]).filter(n=>!n.trashedAt&&!n.archivedAt&&n.reminderAt&&!n.reminderDoneAt&&noteReminderTimestamp(n)<=Date.now()).length;noteBadge.textContent=count;noteBadge.hidden=!count;noteBadge.classList.toggle('note-alert',count>0);}
  }

  function invoiceExpectedDate(inv) {
    const value = String(inv?.expectedPaymentDate || '');
    return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : '';
  }

  function getBusinessPriorities() {
    const today = todayIso();
    const priorities = [];
    const forecast = cashflowForecast(30);
    if (forecast.firstNegative) {
      priorities.push({ key:`cashgap:${forecast.firstNegative}:${today}`, score:120, severity:'danger', title:`Риск кассового разрыва ${toRuDate(forecast.firstNegative)}`, sub:`Минимальный прогнозный остаток ${formatMoney(forecast.minBalance)}. Проверьте поступления и будущие расходы.`, action:'cashflow', actionLabel:'Проверить деньги' });
    }
    [...outstandingInvoices()].forEach(inv => {
      const dueIso = toIsoDate(inv.due);
      if (!dueIso || dueIso >= today) return;
      const overdueDays = Math.max(1, daysBetweenIso(dueIso, today));
      const expected = invoiceExpectedDate(inv);
      const missingExpected = !expected || expected < today;
      priorities.push({
        key:`invoice:${inv.id}:${today}`,
        score:100 + Math.min(overdueDays, 40) + Math.min(Number(inv.amount||0)/1000, 10),
        severity:'danger',
        title: missingExpected ? `Уточнить дату оплаты: ${inv.client}` : `Просрочен счёт ${inv.id}`,
        sub: missingExpected ? `${inv.id} · ${formatMoney(inv.amount)} · просрочен на ${overdueDays} дн. · без ожидаемой даты` : `${inv.client} · ${formatMoney(inv.amount)} · просрочен на ${overdueDays} дн. · ожидаем ${toRuDate(expected)}`,
        action:`invoice:${inv.id}`,
        actionLabel: missingExpected ? 'Указать дату' : 'Открыть счёт'
      });
    });
    data.orders.filter(o => ['new','work'].includes(o.status)).forEach(order => {
      const dueIso = toIsoDate(order.due);
      if (!dueIso || dueIso >= today) return;
      const overdueDays = Math.max(1, daysBetweenIso(dueIso, today));
      priorities.push({ key:`order:${order.id}:${today}`, score:85 + Math.min(overdueDays, 30), severity:'warning', title:`Просрочен заказ ${order.id}`, sub:`${order.client} · ${order.service} · срок был ${order.due}`, action:'orders', actionLabel:'Открыть заказы' });
    });
    (data.plannedPayments || []).filter(p => !p.completedAt).forEach(item => {
      const diff = daysBetweenIso(today, item.date);
      if (diff > 3) return;
      if (diff < 0) {
        priorities.push({
          key:`planned:${item.uid}:${today}`,
          score:item.type==='expense'?96:88,
          severity:'danger',
          title:item.type==='expense'?`Просрочен плановый платёж: ${item.title}`:`Не подтверждено поступление: ${item.title}`,
          sub:`${formatMoney(item.amount)} · плановая дата ${toRuDate(item.date)} · ${paymentTimingLabel(item)}`,
          action:'cashflow',
          actionLabel:'Разобраться с планом'
        });
        return;
      }
      priorities.push({ key:`planned:${item.uid}:${today}`, score:item.type==='expense'?78:68, severity:item.type==='expense'?'warning':'info', title:item.type==='expense'?`Скоро платёж: ${item.title}`:`Ожидается поступление: ${item.title}`, sub:`${formatMoney(item.amount)} · ${toRuDate(item.date)} · ${paymentTimingLabel(item)}`, action:'cashflow', actionLabel:'Открыть план' });
    });
    activeDeals().forEach(deal => {
      const next=dealNextActionState(deal); const age=dealStageAgeDays(deal);
      if(next.overdue) priorities.push({key:`deal:${deal.uid}:${deal.nextActionDate}`,score:92+Math.min(Number(deal.value||0)/1000,8),severity:'danger',title:`Просрочен следующий шаг: ${deal.company}`,sub:`${deal.nextAction} · ${toRuDate(deal.nextActionDate)} · ${formatMoney(deal.value)}`,action:`deal:${deal.uid}`,actionLabel:'Открыть сделку'});
      else if((!deal.nextAction||!deal.nextActionDate) && age>=2) priorities.push({key:`deal-missing:${deal.uid}:${deal.stageChangedAt}`,score:73,severity:'warning',title:`У сделки нет следующего шага: ${deal.company}`,sub:`${dealStageMeta[deal.stage].label} · ${formatMoney(deal.value)} · зафиксируйте действие и срок`,action:`deal:${deal.uid}`,actionLabel:'Запланировать'});
      else if(age>=14) priorities.push({key:`deal-stale:${deal.uid}:${deal.stageChangedAt}`,score:69,severity:'warning',title:`Сделка зависла на этапе: ${deal.company}`,sub:`${dealStageMeta[deal.stage].label} · ${age} дн. без смены этапа · ${formatMoney(deal.value)}`,action:`deal:${deal.uid}`,actionLabel:'Проверить сделку'});
    });
    getUpcomingEvents(24*60).forEach(event => {
      priorities.push({ key:`event:${event.uid}:${today}`, score:64, severity:'info', title:event.title, sub:`Календарь · ${formatEventDateTime(event)}`, action:'calendar', actionLabel:'Открыть календарь' });
    });
    (data.notes || []).filter(note => !note.trashedAt && !note.archivedAt && note.reminderAt && !note.reminderDoneAt && noteReminderTimestamp(note) <= Date.now()).forEach(note => {
      priorities.push({ key:`note:${note.uid}:${today}`, score:70, severity:'warning', title:`Напоминание: ${note.title || 'Без названия'}`, sub:'Блокноты · напоминание требует внимания', action:'notes', actionLabel:'Открыть заметки' });
    });
    return priorities.sort((a,b) => b.score - a.score || a.title.localeCompare(b.title,'ru'));
  }

  function runPriorityAction(action) {
    if (!action) return;
    if (action.startsWith('invoice:')) {
      const id = action.slice('invoice:'.length);
      switchView('invoices');
      openModal('invoiceEdit', id);
      return;
    }
    if (action.startsWith('deal:')) {
      const id = action.slice('deal:'.length);
      switchView('sales');
      openModal('dealEdit', id);
      return;
    }
    switchView(action);
  }

  function renderDashboard() {
    const live = monthlyTransactionSeries(2);
    const liveRevenue = Number(live.revenue.at(-1) || 0);
    const liveExpenses = Number(live.expense.at(-1) || 0);
    const totalRevenue = demoMode ? Number(data.chart?.revenue12?.at(-1) || 0) : liveRevenue;
    const expenses = demoMode ? Number(data.chart?.expense12?.at(-1) || 0) : liveExpenses;
    const previousRevenue = demoMode ? Number(data.chart?.revenue12?.at(-2) || 0) : Number(live.revenue.at(-2) || 0);
    const previousProfit = demoMode ? Number((data.chart?.revenue12?.at(-2) || 0) - (data.chart?.expense12?.at(-2) || 0)) : Number((live.revenue.at(-2) || 0) - (live.expense.at(-2) || 0));
    const profit = totalRevenue - expenses;
    const revenueTrend = previousRevenue > 0 ? (totalRevenue - previousRevenue) / previousRevenue * 100 : null;
    const profitTrend = previousProfit !== 0 ? (profit - previousProfit) / Math.abs(previousProfit) * 100 : null;
    const avg = data.orders.length ? Math.round(data.orders.reduce((s,x) => s + Number(x.amount || 0), 0) / data.orders.length) : 0;
    const activeOrders = data.orders.filter(x => ['new','work'].includes(x.status)).length;
    const hasBusinessData = data.orders.length || data.invoices.length || data.transactions.length || data.clients.length || (data.deals||[]).length;
    const trendText = value => value == null ? '—' : `${value >= 0 ? '+' : ''}${value.toLocaleString('ru-RU',{maximumFractionDigits:1})}%`;
    const metrics = hasBusinessData ? [
      ['Выручка за месяц', formatMoney(totalRevenue), trendText(revenueTrend), previousRevenue ? 'к прошлому месяцу' : 'текущий месяц', '↗', revenueTrend == null || revenueTrend >= 0 ? 'up' : 'down'],
      ['Чистая прибыль', formatMoney(profit), trendText(profitTrend), 'выручка минус расходы', '₽', profit >= 0 ? 'up' : 'down'],
      ['Активные заказы', activeOrders, activeOrders ? 'в работе' : '—', data.orders.length ? 'новые + в работе' : 'нет данных', '▦', 'up'],
      ['Средний чек', formatMoney(avg), avg ? 'расчёт' : '—', avg ? 'по текущим заказам' : 'нет данных', '◇', 'up']
    ] : [
      ['Выручка за месяц', formatMoney(0), '—', 'добавьте операции', '↗', 'up'],
      ['Чистая прибыль', formatMoney(0), '—', 'пока нет данных', '₽', 'up'],
      ['Активные заказы', '0', '—', 'создайте первый заказ', '▦', 'up'],
      ['Средний чек', formatMoney(0), '—', 'пока нет заказов', '◇', 'up']
    ];
    $('#metricsGrid').innerHTML = metrics.map(m => metricCard(...m)).join('');
    const priorities = getBusinessPriorities();
    const visiblePriorities = priorities.filter(item => !uiState.focusDone?.[item.key]);
    const firstName = String(data.profile?.fullName || 'Пользователь').trim().split(/\s+/)[0] || 'Пользователь';
    $('#heroGreeting').textContent = `Добрый день, ${firstName}`;
    if ($('#heroHealth')) {
      const hasDanger = visiblePriorities.some(item => item.severity === 'danger');
      const hasWarning = visiblePriorities.some(item => item.severity === 'warning');
      $('#heroHealth').textContent = !hasBusinessData ? '● Готов к работе' : hasDanger ? '● Есть риски' : hasWarning ? '● Требует внимания' : '● Бизнес в норме';
      $('#heroHealth').className = !hasBusinessData ? 'pill neutral' : hasDanger ? 'pill danger' : hasWarning ? 'pill warning' : 'pill success';
    }
    $('#heroNewOrders').textContent = `${data.orders.filter(x => x.status === 'new').length} новых заказов`;
    $('#heroDueInvoices').textContent = `${data.invoices.filter(x => ['waiting','overdue'].includes(x.status)).length} счетов ждут оплату`;
    if($('#heroActiveDeals')) $('#heroActiveDeals').textContent = `${activeDeals().length} активных сделок`;
    $('#dashboardOrders').innerHTML = data.orders.length ? data.orders.slice(0,5).map(o => `
      <tr><td><span class="cell-main">${esc(o.id)}</span><div class="cell-sub">${esc(o.service)}</div></td><td>${esc(o.client)}</td><td>${formatMoney(o.amount)}</td><td>${statusPill(o.status)}</td></tr>`).join('') : emptyRow('Заказов пока нет', 4);
    const openInvoices = data.invoices.filter(x => x.status !== 'paid').sort((a,b)=>(ruDateToTimestamp(a.due,true)||0)-(ruDateToTimestamp(b.due,true)||0)).slice(0,4);
    $('#invoiceMiniList').innerHTML = openInvoices.length ? openInvoices.map(i => `
      <div class="invoice-mini"><div class="invoice-icon">▤</div><div class="invoice-mini-copy"><strong>${esc(i.id)} · ${esc(i.client)}</strong><span>${i.status==='overdue'?'Просрочен '+esc(i.due):'Оплатить до '+esc(i.due)}${invoiceExpectedDate(i)?` · ожидаем ${esc(toRuDate(invoiceExpectedDate(i)))}`:''}</span></div><div class="invoice-mini-amount"><strong>${formatMoney(i.amount)}</strong>${statusPill(i.status)}</div></div>`).join('') : '<div class="empty-mini">Счетов к оплате пока нет</div>';

    const shown = visiblePriorities.slice(0,4);
    const openCount = visiblePriorities.length;
    $('#focusCount').textContent = openCount ? `${openCount} ${openCount===1?'приоритет':openCount>=2&&openCount<=4?'приоритета':'приоритетов'}` : priorities.length ? 'всё обработано' : 'спокойный день';
    $('#focusList').innerHTML = shown.length ? shown.map(task => `<div class="focus-item ${esc(task.severity)}"><label class="focus-check"><input type="checkbox" data-focus-key="${esc(task.key)}"><span class="focus-copy"><strong>${esc(task.title)}</strong><small>${esc(task.sub)}</small></span></label><button type="button" class="btn btn-secondary btn-small focus-action" data-focus-action="${esc(task.action)}">${esc(task.actionLabel)}</button></div>`).join('') : priorities.length ? '<div class="empty-focus">Все приоритеты на сегодня обработаны. Новые риски и действия появятся здесь автоматически.</div>' : '<div class="empty-focus">Срочных рисков и ближайших действий не найдено. Продолжайте обновлять счета, заказы и плановые платежи.</div>';
    renderChart(Number($('#chartPeriod')?.value || 6));
  }

  function metricCard(label, value, trend, sub, icon, direction = 'up') {
    return `<article class="metric-card"><div class="metric-top"><span class="metric-label">${esc(label)}</span><span class="metric-icon">${esc(icon)}</span></div><div class="metric-value">${esc(value)}</div><div class="metric-bottom"><span class="trend ${direction}">${esc(trend)}</span><span>${esc(sub)}</span></div></article>`;
  }

  function statusPill(status) {
    const m = statusMeta[status] || { label: status, cls: 'neutral' };
    return `<span class="pill ${m.cls}">${esc(m.label)}</span>`;
  }

  function renderChart(period = 6) {
    const svg = $('#revenueChart');
    if (!svg) return;
    const liveSeries = monthlyTransactionSeries(period);
    const labels = demoMode ? data.chart.labels12.slice(-period) : liveSeries.labels;
    const rev = demoMode ? data.chart.revenue12.slice(-period) : liveSeries.revenue;
    const exp = demoMode ? data.chart.expense12.slice(-period) : liveSeries.expense;
    const all = [...rev, ...exp];
    if (!demoMode && all.length && all.every(v => Number(v) === 0)) {
      svg.innerHTML = `<text class="chart-empty-title" text-anchor="middle" x="360" y="132">Пока нет финансовых данных</text><text class="chart-empty-sub" text-anchor="middle" x="360" y="160">Добавьте поступления и расходы — здесь появится динамика бизнеса.</text>`;
      return;
    }
    const max = Math.max(5000, Math.ceil(Math.max(...all,0) / 5000) * 5000);
    const min = 0;
    const W = 720, H = 280, pad = {l:54,r:20,t:20,b:38};
    const x = i => pad.l + i * ((W-pad.l-pad.r)/(labels.length-1 || 1));
    const y = v => H-pad.b - ((v-min)/(max-min || 1))*(H-pad.t-pad.b);
    const path = arr => arr.map((v,i) => `${i?'L':'M'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
    const areaPath = `${path(rev)} L ${x(rev.length-1)} ${H-pad.b} L ${x(0)} ${H-pad.b} Z`;
    let grid = '', xt = '';
    for (let i=0;i<=4;i++) {
      const val = max - (max/4)*i;
      const yy = pad.t + ((H-pad.t-pad.b)/4)*i;
      grid += `<line class="chart-grid-line" x1="${pad.l}" y1="${yy}" x2="${W-pad.r}" y2="${yy}"/><text class="chart-text" x="8" y="${yy+4}">${Math.round(val/1000)}k</text>`;
    }
    labels.forEach((lab,i) => xt += `<text class="chart-text" text-anchor="middle" x="${x(i)}" y="${H-13}">${esc(lab)}</text>`);
    svg.innerHTML = `<defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--primary)" stop-opacity=".7"/><stop offset="100%" stop-color="var(--primary)" stop-opacity="0"/></linearGradient></defs>${grid}${xt}<path class="chart-area" d="${areaPath}"/><path class="chart-line-revenue" d="${path(rev)}"/><path class="chart-line-expense" d="${path(exp)}"/>${rev.map((v,i)=>`<circle class="chart-point" cx="${x(i)}" cy="${y(v)}" r="4"/>`).join('')}`;
  }

  function settleOrderTimer(order) {
    if (!order?.timerStartedAt) return;
    const started = new Date(order.timerStartedAt).getTime();
    if (Number.isFinite(started)) order.trackedMinutes = Math.max(0, Number(order.trackedMinutes || 0) + Math.max(0, (Date.now() - started) / 60000));
    order.timerStartedAt = null;
  }
  function orderTrackedMinutes(order) {
    let total = Math.max(0, Number(order?.trackedMinutes || 0));
    if (order?.timerStartedAt) {
      const started = new Date(order.timerStartedAt).getTime();
      if (Number.isFinite(started)) total += Math.max(0, (Date.now() - started) / 60000);
    }
    return total;
  }
  function formatTrackedTime(minutes) {
    const total = Math.max(0, Math.round(Number(minutes || 0)));
    const h = Math.floor(total / 60), m = total % 60;
    return h ? `${h} ч${m ? ` ${m} мин` : ''}` : `${m} мин`;
  }
  function toggleOrderTimer(id) {
    const order = data.orders.find(x => x.id === id); if (!order) return;
    if (order.timerStartedAt) {
      settleOrderTimer(order);
      toast(`Таймер ${order.id} остановлен · ${formatTrackedTime(orderTrackedMinutes(order))}`);
    } else {
      order.timerStartedAt = new Date().toISOString();
      if (order.status === 'new') order.status = 'work';
      toast(`Таймер ${order.id} запущен`);
    }
    touchClient(order.client); saveData(); renderAll();
  }

  function orderProfit(order) {
    if (order?.cost === null || order?.cost === undefined || order?.cost === '') return null;
    return Number(order.amount || 0) - Number(order.cost || 0);
  }
  function orderMargin(order) {
    const profit = orderProfit(order); const amount = Number(order?.amount || 0);
    return profit == null || amount <= 0 ? null : profit / amount * 100;
  }
  function dealProbability(deal) { return Number(dealStageMeta[deal?.stage]?.probability || 0); }
  function dealStagePill(stage) { const meta=dealStageMeta[stage]||dealStageMeta.lead; return `<span class="pill ${meta.cls}">${esc(meta.label)}</span>`; }
  function activeDeals() { return (data.deals||[]).filter(d=>activeDealStages.includes(d.stage)); }
  function dealStageAgeDays(deal) { const ts=new Date(deal?.stageChangedAt||deal?.updatedAt||deal?.createdAt||'').getTime(); return Number.isFinite(ts)?Math.max(0,Math.floor((Date.now()-ts)/86400000)):0; }
  function dealNextActionState(deal) {
    if(!activeDealStages.includes(deal.stage)) return {kind:'neutral',label:'Сделка закрыта',overdue:false};
    if(!deal.nextAction) return {kind:'warning',label:'Не указан следующий шаг',overdue:false};
    if(!deal.nextActionDate) return {kind:'warning',label:'Нет даты следующего шага',overdue:false};
    const diff=daysBetweenIso(todayIso(),deal.nextActionDate);
    if(diff<0) return {kind:'danger',label:`Просрочено на ${Math.abs(diff)} дн.`,overdue:true};
    if(diff===0) return {kind:'warning',label:'Сделать сегодня',overdue:false};
    if(diff===1) return {kind:'info',label:'Сделать завтра',overdue:false};
    return {kind:'neutral',label:`Через ${diff} дн.`,overdue:false};
  }

  function renderOrders() {
    const q = ($('#ordersSearch')?.value || '').toLowerCase().trim();
    const rows = data.orders.filter(o => (orderFilter === 'all' || o.status === orderFilter) && `${o.id} ${o.client} ${o.service}`.toLowerCase().includes(q));
    $('#ordersTable').innerHTML = rows.length ? rows.map(o => {
      const profit=orderProfit(o), margin=orderMargin(o), tracked=orderTrackedMinutes(o), planned=Math.max(0,Number(o.plannedHours||0));
      const over=planned>0 && tracked>planned*60;
      const timeHtml=`<div class="order-time"><div class="order-time-main"><button class="time-tracker-btn ${o.timerStartedAt?'running':''}" type="button" data-toggle-order-timer="${esc(o.id)}" title="${o.timerStartedAt?'Остановить таймер':'Запустить таймер'}">${o.timerStartedAt?'■':'▶'}</button><strong class="${over?'time-over':''}">${esc(formatTrackedTime(tracked))}</strong></div><div class="cell-sub ${over?'time-over':''}">${planned?`план ${planned.toLocaleString('ru-RU',{maximumFractionDigits:1})} ч${over?' · превышен':''}`:'план не указан'}</div></div>`;
      return `<tr><td><span class="cell-main">${esc(o.id)}</span></td><td><span class="cell-main">${esc(o.client)}</span></td><td>${esc(o.service)}</td><td>${esc(o.due)}</td><td><strong>${formatMoney(o.amount)}</strong></td><td>${profit==null?'<span class="cell-sub">не указаны прямые затраты</span>':`<strong class="${profit>=0?'profit-positive':'profit-negative'}">${esc(formatMoney(profit))}</strong><div class="cell-sub">маржа ${margin==null?'—':margin.toLocaleString('ru-RU',{maximumFractionDigits:0})+'%'}</div>`}</td><td>${timeHtml}</td><td><select class="status-select" data-order-status="${esc(o.id)}">${['new','work','done','paid'].map(st=>`<option value="${st}" ${st===o.status?'selected':''}>${statusMeta[st].label}</option>`).join('')}</select></td><td><div class="row-actions"><button class="row-action" data-edit-order="${esc(o.id)}" title="Редактировать">✎</button><button class="row-action danger-action" data-delete-order="${esc(o.id)}" title="Удалить">×</button></div></td></tr>`;
    }).join('') : emptyRow('Заказы не найдены', 9);
    const total = rows.reduce((sum,x)=>sum+Number(x.amount||0),0);
    const knownProfitRows=rows.filter(x=>orderProfit(x)!=null), profitTotal=knownProfitRows.reduce((sum,x)=>sum+orderProfit(x),0);
    const trackedTotal=rows.reduce((sum,x)=>sum+orderTrackedMinutes(x),0);
    $('#ordersSummary').textContent = `${rows.length} шт. · ${formatMoney(total)}${knownProfitRows.length?` · прибыль ${formatMoney(profitTotal)}${knownProfitRows.length<rows.length?` по ${knownProfitRows.length}/${rows.length} заказам`:''}`:''}${trackedTotal?` · учтено ${formatTrackedTime(trackedTotal)}`:''}`;
    $('#navOrdersBadge').textContent = data.orders.filter(x => x.status === 'new').length;
    const noteBadge=$('#navNotesBadge'); if(noteBadge){const count=(data.notes||[]).filter(n=>!n.trashedAt&&!n.archivedAt&&n.reminderAt&&!n.reminderDoneAt&&noteReminderTimestamp(n)<=Date.now()).length;noteBadge.textContent=count;noteBadge.hidden=!count;noteBadge.classList.toggle('note-alert',count>0);}
  }

  function renderClients() {
    const q = ($('#clientsSearch')?.value || '').toLowerCase().trim();
    const searchable = c => [
      c.name,c.legalName,c.person,c.position,c.email,c.phone,c.altPhone,c.telegram,c.website,c.industry,c.source,c.description,c.tags,
      c.taxId,c.kpp,c.registrationNumber,c.country,c.legalAddress,c.actualAddress,c.bankName,c.bankCode,c.swift,c.bankAccounts,
      c.contractNumber,c.paymentTerms,c.importantNotes
    ].join(' ').toLowerCase();
    const rows = data.clients.filter(c => searchable(c).includes(q));
    $('#clientsCount').textContent = `${rows.length} клиентов`;
    const statusLabels={active:'Активный',regular:'Постоянный',paused:'Пауза',archived:'Архив'};
    $('#clientsTable').innerHTML = rows.length ? rows.map(c => {
      const meta=[c.industry, c.taxId ? `УНП / ИНН ${c.taxId}` : ''].filter(Boolean).join(' · ');
      return `<tr><td><div class="client-name"><span class="avatar">${esc(initials(c.name))}</span><div><button type="button" class="client-name-button" data-edit-client="${esc(c.uid)}">${esc(c.name)}</button><div class="cell-sub">${esc(c.person || c.legalName || 'Контакт не указан')}</div>${meta?`<div class="client-mini-meta">${esc(meta)}</div>`:''}</div></div></td><td><span>${esc(c.email || '—')}</span><div class="cell-sub">${esc(c.phone || c.telegram || 'Контакты не указаны')}</div><div class="client-mini-meta">${esc(statusLabels[c.relationshipStatus] || 'Активный')}</div></td><td>${number.format(c.orders)}</td><td><strong>${formatMoney(c.revenue)}</strong></td><td>${esc(c.activity || '—')}</td><td><div class="row-actions"><button class="row-action contract-action" data-client-contract="${esc(c.uid)}" title="Сформировать договор">▤</button><button class="row-action" data-edit-client="${esc(c.uid)}" title="Открыть карточку клиента">✎</button><button class="row-action danger-action" data-delete-client="${esc(c.uid)}" title="Удалить">×</button></div></td></tr>`;
    }).join('') : emptyRow('Клиенты не найдены', 6);
  }


  function renderSales() {
    if(!$('#pipelineBoard')) return;
    const q=($('#salesSearch')?.value||'').toLowerCase().trim();
    const all=(data.deals||[]); const active=activeDeals();
    const visible=all.filter(d=>`${d.company} ${d.contact} ${d.email} ${d.phone} ${d.source} ${d.nextAction} ${d.notes}`.toLowerCase().includes(q));
    const activeValue=active.reduce((s,d)=>s+Number(d.value||0),0);
    const weighted=active.reduce((s,d)=>s+Number(d.value||0)*dealProbability(d)/100,0);
    const overdue=active.filter(d=>dealNextActionState(d).overdue).length;
    const closed=all.filter(d=>['won','lost'].includes(d.stage)); const won=closed.filter(d=>d.stage==='won').length; const winRate=closed.length?Math.round(won/closed.length*100):null;
    $('#salesMetrics').innerHTML=[
      ['Активная воронка',formatMoney(activeValue),active.length?'потенциал':'—','сумма незакрытых сделок','↗','up'],
      ['Взвешенный прогноз',formatMoney(weighted),active.length?'оценка':'—','с учётом этапа сделки','≈','up'],
      ['Активные сделки',active.length,active.length?'в работе':'—','от лида до переговоров','◎','up'],
      ['Просрочено действий',overdue,overdue?'нужно внимание':'в срок',overdue?'follow-up уже просрочен':'следующие шаги запланированы','! ',overdue?'down':'up']
    ].map(m=>metricCard(...m)).join('');
    const stale=active.filter(d=>dealStageAgeDays(d)>=14).length; const missing=active.filter(d=>!d.nextAction||!d.nextActionDate).length; const health=$('#salesHealth');
    if(health){
      if(overdue) health.innerHTML=`<div class="sales-health danger"><strong>Есть просроченные follow-up: ${overdue}</strong><span>Начните со сделок, где следующий шаг уже должен был состояться. В продажах важнее всего не потерять конкретное следующее действие.</span></div>`;
      else if(missing) health.innerHTML=`<div class="sales-health warning"><strong>У ${missing} сделок не зафиксирован следующий шаг или дата</strong><span>После каждого контакта оставляйте одно конкретное действие и срок — так воронка не превращается в список забытых лидов.</span></div>`;
      else if(stale) health.innerHTML=`<div class="sales-health warning"><strong>${stale} сделок находятся на одном этапе 14+ дней</strong><span>Проверьте, действительно ли они ещё живые, и обновите этап или следующий шаг.</span></div>`;
      else health.innerHTML=`<div class="sales-health success"><strong>Воронка под контролем</strong><span>Критичных просроченных действий нет. Продолжайте обновлять этап после каждого содержательного контакта.</span></div>`;
    }
    const renderCard=d=>{const next=dealNextActionState(d),age=dealStageAgeDays(d);return `<article class="deal-card" data-deal-card="${esc(d.uid)}"><div class="deal-card-head"><div><strong>${esc(d.company||'Без компании')}</strong><span>${esc(d.contact||'Контакт не указан')}</span></div><button class="row-action" data-edit-deal="${esc(d.uid)}" title="Редактировать сделку">✎</button></div><div class="deal-value">${esc(formatMoney(d.value))}<small>${dealProbability(d)}% · взвешено ${esc(formatMoney(Number(d.value||0)*dealProbability(d)/100))}</small></div><div class="deal-next ${esc(next.kind)}"><span>${esc(next.label)}</span><strong>${esc(d.nextAction||'Следующий шаг не указан')}</strong>${d.nextActionDate?`<small>${esc(toRuDate(d.nextActionDate))}</small>`:''}</div><div class="deal-meta"><span>${esc(d.source||'Источник не указан')}</span><span>${age} дн. на этапе</span></div><div class="deal-card-actions"><select class="mini-select deal-stage-select" data-deal-stage="${esc(d.uid)}" aria-label="Этап сделки">${Object.entries(dealStageMeta).map(([key,meta])=>`<option value="${key}" ${d.stage===key?'selected':''}>${esc(meta.label)}</option>`).join('')}</select><button class="row-action danger-action" data-delete-deal="${esc(d.uid)}" title="Удалить сделку">×</button></div></article>`};
    $('#pipelineBoard').innerHTML=activeDealStages.map(stage=>{const meta=dealStageMeta[stage];const items=visible.filter(d=>d.stage===stage);const total=items.reduce((s,d)=>s+Number(d.value||0),0);return `<section class="pipeline-stage"><div class="pipeline-stage-head"><div>${dealStagePill(stage)}<strong>${items.length}</strong></div><span>${esc(formatMoney(total))}</span></div><div class="pipeline-stage-list">${items.length?items.map(renderCard).join(''):'<div class="pipeline-empty">На этом этапе сделок нет</div>'}</div></section>`}).join('');
    const visibleClosed=visible.filter(d=>['won','lost'].includes(d.stage)).sort((a,b)=>new Date(b.updatedAt||0)-new Date(a.updatedAt||0));
    $('#salesClosedCount').textContent=`${visibleClosed.length} · win rate ${winRate==null?'—':winRate+'%'}`;
    $('#salesClosedList').innerHTML=visibleClosed.length?visibleClosed.map(d=>`<div class="closed-deal-row"><div><strong>${esc(d.company||'Без компании')}</strong><span>${esc(d.contact||d.source||'')}</span></div><strong>${esc(formatMoney(d.value))}</strong>${dealStagePill(d.stage)}<div class="closed-deal-actions">${d.stage==='won'?(d.orderId&&data.orders.some(o=>o.id===d.orderId)?`<button class="btn btn-secondary btn-small" data-open-deal-order="${esc(d.orderId)}">Заказ ${esc(d.orderId)}</button>`:`<button class="btn btn-secondary btn-small" data-deal-to-order="${esc(d.uid)}">Создать заказ</button>`):''}<button class="row-action" data-edit-deal="${esc(d.uid)}" title="Редактировать">✎</button><button class="row-action danger-action" data-delete-deal="${esc(d.uid)}" title="Удалить">×</button></div></div>`).join(''):'<div class="finance-empty">Закрытых сделок по текущему поиску нет.</div>';
    const badge=$('#navSalesBadge'); if(badge){badge.textContent=String(overdue);badge.hidden=!overdue;}
  }

  function setDealStage(deal, stage) {
    if(!deal || !dealStageMeta[stage] || deal.stage===stage) return;
    deal.stage=stage; deal.stageChangedAt=new Date().toISOString(); deal.updatedAt=deal.stageChangedAt;
    deal.wonAt=stage==='won'?deal.stageChangedAt:null; deal.lostAt=stage==='lost'?deal.stageChangedAt:null;
    if(['won','lost'].includes(stage)){deal.nextAction='';deal.nextActionDate='';archiveNotificationsForSource('deal',deal.uid,false);} else archiveNotificationsForSource('deal',deal.uid,true);
  }
  function convertDealToOrder(uid) {
    const deal=(data.deals||[]).find(d=>d.uid===uid); if(!deal)return;
    if(deal.orderId && data.orders.some(o=>o.id===deal.orderId)){switchView('orders');openModal('orderEdit',deal.orderId);return;}
    if(!data.services.length){toast('Сначала добавьте услугу — она нужна для создания заказа');openModal('service');return;}
    let client=data.clients.find(c=>String(c.name||'').trim().toLowerCase()===String(deal.company||'').trim().toLowerCase());
    if(!client){client={uid:makeId('client'),name:deal.company||'Новый клиент',clientType:'company',relationshipStatus:'active',industry:'',website:'',source:deal.source||'',description:deal.notes||'',tags:'',person:deal.contact||'',position:'',email:deal.email||'',phone:deal.phone||'',altPhone:'',telegram:'',actualAddress:'',legalName:'',taxId:'',kpp:'',registrationNumber:'',country:'',legalAddress:'',bankName:'',bankCode:'',swift:'',correspondentAccount:'',bankAccounts:'',contractNumber:'',contractDate:'',preferredCurrency:currencyCode(),paymentTerms:'',importantNotes:'',orders:0,revenue:0,activity:'Только что'};data.clients.unshift(client);saveData();}
    if(deal.stage!=='won'){setDealStage(deal,'won');saveData();}
    openModal('order'); const form=$('#dynamicForm'); if(form) form.dataset.dealUid=deal.uid;
    setTimeout(()=>{const f=$('#dynamicForm');if(!f)return;const clientField=f.elements.namedItem('client');const amountField=f.elements.namedItem('amount');if(clientField)clientField.value=client.name;if(amountField)amountField.value=deal.value||'';},20);
  }

  function learningSetupSteps() {
    return [
      { done: !!String(data.business?.businessName || '').trim(), title: 'Заполните данные бизнеса', text: 'Название, сфера и валюта нужны для документов и понятной аналитики.', go: 'settings' },
      { done: data.services.length > 0, title: 'Добавьте товар или услугу', text: 'Укажите, что продаёте и по какой ориентировочной цене.', modal: 'service' },
      { done: data.clients.length > 0, title: 'Добавьте первого клиента', text: 'Сохраните контакты и реквизиты, чтобы связать клиента с работой и оплатами.', modal: 'client' },
      { done: (data.deals||[]).length > 0, title: 'Зафиксируйте первую сделку', text: 'Укажите сумму, этап и следующий шаг — продажа не потеряется.', modal: 'deal' },
      { done: data.orders.length > 0 || data.invoices.length > 0, title: 'Создайте заказ или счёт', text: 'Так BizPilot начнёт собирать реальную рабочую картину.', modal: 'order' },
      { done: Number(data.business?.cashBalance || 0) > 0 || (data.plannedPayments || []).length > 0, title: 'Настройте денежный прогноз', text: 'Укажите текущий остаток и будущие платежи, чтобы видеть кассовые риски заранее.', go: 'cashflow' }
    ];
  }

  function learningLessons() {
    return [
      { id:'basics', time:'3 мин', title:'Поймите главную цепочку', text:'Разберите роли клиента, сделки, заказа, счёта и финансов. Это основа всего BizPilot.', goal:'Сможете объяснить, почему выставленный счёт ещё не является полученными деньгами.', scroll:'learningGuide', action:'Открыть карту сервиса' },
      { id:'sales', time:'5 мин', title:'Клиенты и сделки', text:'Научитесь хранить постоянные данные клиента отдельно от конкретной возможности продажи.', goal:'Создадите клиента и сделку с этапом, суммой и следующим шагом.', go:'sales', action:'Открыть продажи' },
      { id:'orders', time:'5 мин', title:'Заказы и рабочее время', text:'Поймите, когда продажа превращается в заказ и зачем фиксировать затраты, план часов и фактическое время.', goal:'Сможете контролировать срок и реальную трудоёмкость работы.', go:'orders', action:'Открыть заказы' },
      { id:'invoices', time:'5 мин', title:'Счета и реальные деньги', text:'Разделите дебиторку и факт оплаты. Освойте правильный момент, когда счёт можно отметить оплаченным.', goal:'Сможете быстро ответить: кто должен, сколько должен и сколько уже получено.', go:'invoices', action:'Открыть счета' },
      { id:'cashflow', time:'5 мин', title:'Денежный поток и кассовые риски', text:'Научитесь добавлять будущие платежи и читать прогноз остатка по датам.', goal:'Сможете заранее заметить период, когда денег может не хватить.', go:'cashflow', action:'Открыть прогноз' },
      { id:'organize', time:'4 мин', title:'Календарь, уведомления и блокноты', text:'Разделите даты, важные сигналы и свободный контекст, чтобы ничего не терять.', goal:'Будете понимать, что хранить в календаре, что в заметке, а что в сущности бизнеса.', go:'calendar', action:'Открыть календарь' },
      { id:'analytics', time:'5 мин', title:'Аналитика и подсчёты', text:'Научитесь отличать обзор фактов от калькуляторов для принятия решений.', goal:'Сможете проверить маржу, ставку часа и понять, какие услуги и клиенты полезнее бизнесу.', go:'analytics', action:'Открыть аналитику' },
      { id:'quality', time:'4 мин', title:'Качество данных и резервные копии', text:'Освойте правила: не создавать дубли, обновлять статусы и регулярно сохранять ZIP-копии.', goal:'Ваши цифры останутся целостными, а данные можно будет восстановить.', go:'profile', action:'Открыть резервные копии' },
      { id:'routine', time:'5 мин', title:'Выработайте рабочий ритм', text:'Закрепите короткую ежедневную, еженедельную и ежемесячную проверку BizPilot.', goal:'Сервис станет рабочей системой, а не местом, куда данные заносят задним числом.', scroll:'learningRoutine', action:'Посмотреть рабочий ритм' }
    ];
  }

  function learningActionAttrs(lesson) {
    if (lesson.go) return `data-go="${esc(lesson.go)}"`;
    if (lesson.modal) return `data-open-modal="${esc(lesson.modal)}"`;
    if (lesson.scroll) return `data-learning-scroll="${esc(lesson.scroll)}"`;
    return '';
  }

  function learningRecommendation() {
    if (demoMode) return { title:'Пройдите практическую миссию в демо', text:'Начните с раздела «Продажи»: поменяйте этап сделки, затем создайте заказ, проверьте счёт и оплату.', type:'go', value:'sales', label:'Начать практику' };
    if (!String(data.business?.businessName || '').trim()) return { title:'Заполните данные бизнеса', text:'Начните с названия, сферы и валюты. Это база для документов и понятных отчётов.', type:'go', value:'settings', label:'Настроить бизнес' };
    if (!(data.services||[]).length) return { title:'Добавьте первую услугу или товар', text:'После этого создание заказов станет быстрее, а аналитика сможет сравнивать направления.', type:'modal', value:'service', label:'Добавить услугу' };
    if (!(data.clients||[]).length) return { title:'Добавьте первого реального клиента', text:'Создайте одну карточку клиента и используйте её дальше в сделках, заказах и счетах.', type:'modal', value:'client', label:'Добавить клиента' };
    if (!(data.deals||[]).length) return { title:'Создайте первую сделку', text:'Зафиксируйте сумму, этап и следующий шаг. Так BizPilot начнёт помогать с продажами.', type:'modal', value:'deal', label:'Создать сделку' };
    if (!(data.orders||[]).length) return { title:'Переведите подтверждённую работу в заказ', text:'Добавьте срок, прямые затраты и план человеко-часов.', type:'modal', value:'order', label:'Создать заказ' };
    if (!(data.invoices||[]).length) return { title:'Выставьте первый счёт', text:'Счёт поможет отделить ожидаемые деньги от уже полученных и контролировать дебиторку.', type:'modal', value:'invoice', label:'Выставить счёт' };
    if (!(data.plannedPayments||[]).length && Number(data.business?.cashBalance || 0) <= 0) return { title:'Настройте денежный прогноз', text:'Укажите текущий остаток и хотя бы один будущий платёж, чтобы увидеть деньги вперёд.', type:'go', value:'cashflow', label:'Настроить прогноз' };
    const incomplete=learningLessons().find(x=>!uiState.learningDone?.[x.id]);
    if (incomplete) return { title:`Продолжите обучение: ${incomplete.title}`, text:incomplete.text, type:incomplete.go?'go':'scroll', value:incomplete.go||incomplete.scroll||'learningCourse', label:incomplete.action||'Продолжить' };
    return { title:'Проверьте бизнес как руководитель', text:'База настроена и обучение пройдено. Откройте обзор, затем раз в неделю проверяйте счета, денежный поток и аналитику.', type:'go', value:'dashboard', label:'Открыть обзор' };
  }

  function runLearningRecommendation() {
    const rec=learningRecommendation();
    if (rec.type==='go') switchView(rec.value);
    else if (rec.type==='modal') openModal(rec.value);
    else document.getElementById(rec.value)?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function renderLearningCourse() {
    const container=$('#learningCourseGrid');
    if(!container) return;
    uiState.learningDone = uiState.learningDone && typeof uiState.learningDone==='object' ? uiState.learningDone : {};
    const lessons=learningLessons();
    container.innerHTML=lessons.map((lesson,index)=>{
      const done=!!uiState.learningDone[lesson.id];
      return `<article class="learning-lesson-card ${done?'done':''}"><div class="learning-lesson-top"><span class="learning-lesson-num">${done?'✓':String(index+1).padStart(2,'0')}</span><span class="learning-lesson-time">${esc(lesson.time)}</span></div><h3>${esc(lesson.title)}</h3><p>${esc(lesson.text)}</p><div class="learning-lesson-goal"><b>После урока:</b> ${esc(lesson.goal)}</div><div class="learning-lesson-actions"><button type="button" class="btn btn-secondary" ${learningActionAttrs(lesson)}>${esc(lesson.action)}</button><button type="button" class="btn btn-secondary learning-lesson-toggle ${done?'done':''}" data-learning-complete="${esc(lesson.id)}">${done?'✓ Пройдено':'Отметить пройденным'}</button></div></article>`;
    }).join('');
    const doneCount=lessons.filter(x=>uiState.learningDone[x.id]).length;
    const percent=Math.round(doneCount/lessons.length*100);
    const value=$('#learningCourseProgress'); if(value)value.textContent=`${doneCount}/${lessons.length}`;
    const percentEl=$('#learningCoursePercent'); if(percentEl)percentEl.textContent=`${percent}%`;
    const hint=$('#learningCourseHint'); if(hint)hint.textContent=doneCount===lessons.length?'Программа обучения завершена':doneCount?`Осталось уроков: ${lessons.length-doneCount}`:'Отмечайте уроки после практики';
  }

  function renderLearning() {
    const container = $('#learningOnboarding');
    if (!container) return;
    const steps = learningSetupSteps();
    const doneCount = steps.filter(item => item.done).length;
    const percent = Math.round(doneCount / steps.length * 100);
    container.innerHTML = steps.map((s, i) => `<button type="button" class="onboarding-step ${s.done ? 'done' : ''}" ${s.modal ? `data-open-modal="${s.modal}"` : `data-go="${s.go}"`}><span class="onboarding-step-index">${s.done ? '✓' : i + 1}</span><span><strong>${esc(s.title)}</strong><small>${esc(s.text)}</small></span><span class="onboarding-arrow">→</span></button>`).join('');
    const doneEl = $('#learningStepsDone'); if (doneEl) doneEl.textContent = `${doneCount}/${steps.length}`;
    const bar = $('#learningStepsBar'); if (bar) bar.style.width = `${percent}%`;
    const progress = $('#learningProgressValue'); if (progress) progress.textContent = `${percent}%`;
    const progressBar = $('#learningProgressBar'); if (progressBar) progressBar.style.width = `${percent}%`;
    const hint = $('#learningProgressHint');
    if (hint) hint.textContent = demoMode ? 'В демо показаны учебные примеры' : doneCount === steps.length ? 'Базовая настройка завершена' : doneCount === 0 ? 'Начните с данных бизнеса' : `Осталось шагов: ${steps.length - doneCount}`;

    renderLearningCourse();
    const rec=learningRecommendation();
    const nextTitle=$('#learningNextTitle'); if(nextTitle) nextTitle.textContent=rec.title;
    const nextText=$('#learningNextText'); if(nextText) nextText.textContent=rec.text;
    const heroBtn=$('#learningNextActionBtn'); if(heroBtn) heroBtn.textContent=rec.label;
    const cardBtn=$('#learningNextCardBtn'); if(cardBtn) cardBtn.textContent=rec.label;

    const status = $('#demoLearningStatus');
    if (status) {
      status.textContent = demoMode ? 'Активен' : 'Выключен';
      status.className = `pill ${demoMode ? 'warning' : 'neutral'}`;
    }
    const chip = $('#learningModeChip');
    if (chip) {
      chip.textContent = demoMode ? 'Учебный демо-режим' : 'Рабочий режим';
      chip.classList.toggle('active', demoMode);
    }
    const startBtn = $('#startDemoModeBtn'); if (startBtn) startBtn.hidden = demoMode;
    const resetBtn = $('#resetTrainingDemoBtn'); if (resetBtn) resetBtn.hidden = !demoMode;
    const exitBtn = $('#exitDemoModeBtn'); if (exitBtn) {
      exitBtn.hidden = !demoMode;
      exitBtn.textContent = hasLiveWorkspaceSnapshot() ? 'Выйти и вернуть мои данные' : 'Выйти из демо';
    }
    const note = $('#demoLearningNote');
    if (note) {
      note.textContent = demoMode
        ? hasLiveWorkspaceSnapshot()
          ? 'Сейчас открыты только учебные данные. Ваша рабочая область сохранена отдельно в этом браузере и будет восстановлена после выхода.'
          : 'Сейчас открыты учебные данные. Отдельная рабочая область не найдена; при выходе BizPilot откроет чистое рабочее пространство.'
        : 'Демо можно включить в любой момент. Перед запуском текущая рабочая область автоматически сохраняется отдельно в этом браузере.';
    }
    applyDemoMode();
  }

  function renderCashflow() {
    if (!$('#cashflowPanel')) return;
    cashflowHorizon = [30,90].includes(Number(uiState.cashflowHorizon)) ? Number(uiState.cashflowHorizon) : 30;
    if($('#cashflowHorizon')) $('#cashflowHorizon').value=String(cashflowHorizon);
    if($('#cashBalanceInput')) $('#cashBalanceInput').value=Number(data.business?.cashBalance||0) || '';
    $$('[data-currency-code]').forEach(el=>el.textContent=currencyLabel());
    const f=cashflowForecast(cashflowHorizon);
    const overdueTotal=outstandingInvoices().filter(i=>ruDateToTimestamp(i.due,true)<Date.now()).reduce((s,i)=>s+Number(i.amount||0),0);
    $('#cashflowMetrics').innerHTML=[
      ['Доступно сейчас',formatMoney(f.startBalance),'остаток','на счетах и в кассе','₽','up'],
      [`Ожидаем за ${cashflowHorizon} дн.`,formatMoney(f.expectedInvoices+f.plannedIncome),'план','счета + плановые доходы','↑','up'],
      [`Плановые расходы`,formatMoney(f.plannedExpense),'план',`на ${cashflowHorizon} дней`,'↓',f.plannedExpense?'down':'up'],
      [`Остаток через ${cashflowHorizon} дн.`,formatMoney(f.endBalance),f.endBalance>=0?'прогноз':'риск',f.firstNegative?`кассовый разрыв с ${toRuDate(f.firstNegative)}`:'без отрицательного остатка','≈',f.endBalance>=0?'up':'down']
    ].map(m=>metricCard(...m)).join('');
    const alert=$('#cashflowAlert');
    if(f.firstNegative) alert.innerHTML=`<div class="cashflow-risk danger"><strong>⚠ Возможен кассовый разрыв ${esc(toRuDate(f.firstNegative))}</strong><span>Минимальный прогнозный остаток: ${esc(formatMoney(f.minBalance))}. Проверьте сроки оплат и будущие расходы.${f.excludedOverdueCount?` Ещё ${f.excludedOverdueCount} просроч. сч. на ${esc(formatMoney(f.excludedOverdueAmount))} не включены без ожидаемой даты оплаты.`:''}</span></div>`;
    else if(f.excludedOverdueCount) alert.innerHTML=`<div class="cashflow-risk warning"><strong>${f.excludedOverdueCount} просроч. сч. не включены в прогноз</strong><span>${esc(formatMoney(f.excludedOverdueAmount))} не считаются поступлением, пока вы не укажете реалистичную ожидаемую дату оплаты.</span></div>`;
    else if(overdueTotal>0) alert.innerHTML=`<div class="cashflow-risk warning"><strong>Есть просроченная дебиторка: ${esc(formatMoney(overdueTotal))}</strong><span>Прогноз учитывает указанные ожидаемые даты оплаты. Обновляйте их после разговора с клиентом.</span></div>`;
    else alert.innerHTML=`<div class="cashflow-risk success"><strong>На выбранном горизонте кассовый разрыв не виден</strong><span>Обновляйте остаток, ожидаемые даты оплат и плановые платежи, чтобы прогноз оставался полезным.</span></div>`;
    renderCashflowChart(f);
    $('#cashflowFacts').innerHTML=`<div><span>Неоплаченных счетов</span><strong>${outstandingInvoices().length}</strong></div><div><span>Просрочено к получению</span><strong>${esc(formatMoney(overdueTotal))}</strong></div><div><span>Без даты оплаты</span><strong>${f.excludedOverdueCount}</strong></div><div><span>Плановых платежей</span><strong>${(data.plannedPayments||[]).filter(p=>!p.completedAt).length}</strong></div>`;
    const aging=receivablesAging();
    $('#receivablesAging').innerHTML=aging.map(b=>`<div class="aging-item ${b.cls}"><span>${esc(b.label)}</span><strong>${esc(formatMoney(b.amount))}</strong><small>${b.count} сч.</small></div>`).join('');
    const plans=[...(data.plannedPayments||[])].filter(p=>!p.completedAt).sort((a,b)=>a.date.localeCompare(b.date));
    $('#plannedPaymentsList').innerHTML=plans.length?plans.map(p=>`<div class="planned-payment-row"><span class="planned-type ${p.type}">${p.type==='income'?'↑':'↓'}</span><div class="planned-copy"><strong>${esc(p.title)}</strong><small>${esc(toRuDate(p.date))} · ${esc(p.category||'Без категории')} · ${esc(paymentTimingLabel(p))}</small>${p.note?`<p>${esc(p.note)}</p>`:''}</div><div class="planned-amount ${p.type}">${p.type==='income'?'+':'−'} ${esc(formatMoney(p.amount))}</div><div class="row-actions"><button class="row-action success-action" data-complete-planned="${esc(p.uid)}" title="Провести как фактическую операцию">✓</button><button class="row-action" data-edit-planned="${esc(p.uid)}" title="Редактировать">✎</button><button class="row-action danger-action" data-delete-planned="${esc(p.uid)}" title="Удалить">×</button></div></div>`).join(''):'<div class="finance-empty">Плановых платежей пока нет. Добавьте аренду, налоги, зарплаты или ожидаемые поступления.</div>';
    const rec=[...outstandingInvoices()].sort((a,b)=>(ruDateToTimestamp(a.due,true)||0)-(ruDateToTimestamp(b.due,true)||0));
    $('#receivablesCount').textContent=`${rec.length} сч.`;
    $('#receivablesList').innerHTML=rec.length?rec.map(i=>{const due=ruDateToTimestamp(i.due,true),days=due?Math.floor((Date.now()-due)/(86400000)):0;const overdue=days>0;const expected=invoiceExpectedDate(i);return `<div class="receivable-row ${overdue?'is-overdue':''}"><div class="receivable-copy"><span class="invoice-number">${esc(i.id)}</span><strong>${esc(i.client)}</strong><small>${overdue?`Просрочен на ${days} дн.`:`Срок ${esc(i.due)}`} · ${expected?`ожидаем ${esc(toRuDate(expected))}`:'ожидаемая дата не указана'}</small></div><strong class="receivable-amount">${esc(formatMoney(i.amount))}</strong><div class="receivable-actions"><button class="btn btn-secondary btn-small" data-copy-reminder="${esc(i.id)}">Напоминание</button><button class="btn btn-secondary btn-small ${overdue&&!expected?'needs-attention':''}" data-edit-invoice="${esc(i.id)}">${overdue&&!expected?'Указать дату':'Открыть счёт'}</button></div></div>`}).join(''):'<div class="finance-empty">Неоплаченных счетов нет.</div>';
    const badge=$('#navCashflowBadge'); const risks=(f.firstNegative?1:0)+aging.filter(b=>b.key!=='notdue'&&b.count>0).reduce((s,b)=>s+b.count,0); if(badge){badge.textContent=String(risks);badge.hidden=risks===0;}
  }

  function renderFinance() {
    const q=($('#financeSearch')?.value||'').toLowerCase().trim();
    const currentMonth=data.transactions.filter(x=>isCurrentMonthRu(x.date));
    const monthIncome=currentMonth.filter(x=>x.type==='income').reduce((s,x)=>s+Number(x.amount||0),0);
    const monthExpense=currentMonth.filter(x=>x.type==='expense').reduce((s,x)=>s+Number(x.amount||0),0);
    $('#financeMetrics').innerHTML = [
      ['Поступления за месяц', formatMoney(monthIncome), monthIncome?'факт':'—', monthIncome?'по операциям':'нет поступлений', '↑', 'up'],
      ['Расходы за месяц', formatMoney(monthExpense), monthExpense?'факт':'—', monthExpense?'по операциям':'нет расходов', '↓', 'up'],
      ['Денежный поток', formatMoney(monthIncome-monthExpense), monthIncome||monthExpense?'итог':'—', 'доходы минус расходы', '≈', monthIncome-monthExpense>=0?'up':'down']
    ].map(m=>metricCard(...m)).join('');

    let rows=[...data.transactions];
    if(financePeriod==='month') rows=rows.filter(x=>isCurrentMonthRu(x.date));
    if(financeFilter!=='all') rows=rows.filter(x=>x.type===financeFilter);
    if(q) rows=rows.filter(x=>`${x.title} ${x.category} ${x.date}`.toLowerCase().includes(q));
    rows.sort((a,b)=>(ruDateToTimestamp(b.date,true)||0)-(ruDateToTimestamp(a.date,true)||0)||Number(b.id||0)-Number(a.id||0));
    const shownIncome=rows.filter(x=>x.type==='income').reduce((s,x)=>s+Number(x.amount||0),0);
    const shownExpense=rows.filter(x=>x.type==='expense').reduce((s,x)=>s+Number(x.amount||0),0);
    if($('#financeSummary')) $('#financeSummary').innerHTML=`<span>${rows.length} операций</span><strong>Баланс: ${esc(formatMoney(shownIncome-shownExpense))}</strong>`;
    $('#financeList').innerHTML = rows.length ? rows.map(t=>`<div class="finance-row"><div class="finance-icon ${t.type}">${t.type==='income'?'↑':'↓'}</div><div class="finance-copy"><strong>${esc(t.title)}</strong><small>${esc(t.category)} · ${esc(t.date)}</small></div><div class="finance-amount ${t.type}">${t.type==='income'?'+':'−'} ${formatMoney(t.amount)}</div><div class="row-actions"><button class="row-action" data-edit-transaction="${esc(t.id)}" title="Редактировать">✎</button><button class="row-action danger-action" data-delete-transaction="${esc(t.id)}" title="Удалить">×</button></div></div>`).join('') : '<div class="finance-empty">Операций по выбранным условиям пока нет.</div>';
    const cats = {};
    currentMonth.filter(x=>x.type==='expense').forEach(x => cats[x.category]=(cats[x.category]||0)+Number(x.amount||0));
    const max = Math.max(...Object.values(cats),1);
    $('#expenseBreakdown').innerHTML = Object.keys(cats).length ? Object.entries(cats).sort((a,b)=>b[1]-a[1]).map(([cat,val])=>`<div class="breakdown-row"><div class="breakdown-head"><strong>${esc(cat)}</strong><span>${formatMoney(val)}</span></div><div class="progress"><i style="width:${Math.round(val/max*100)}%"></i></div></div>`).join('') : '<div class="finance-empty compact">Расходов в текущем месяце пока нет.</div>';
  }

  function renderInvoices() {
    const rows = data.invoices.filter(i => invoiceFilter === 'all' || i.status === invoiceFilter);
    $('#invoiceGrid').innerHTML = rows.length ? rows.map(i => `
      <article class="card invoice-card"><div class="invoice-card-top"><div><div class="invoice-number">${esc(i.id)}</div><h3>${esc(i.client)}</h3><p>Выставлен ${esc(i.issued)}</p></div>${statusPill(i.status)}</div><div class="invoice-amount">${formatMoney(i.amount)}</div><div class="invoice-meta"><span>Срок оплаты</span><strong>${esc(i.due)}</strong></div>${i.comment ? `<p class="invoice-comment">${esc(i.comment)}</p>` : ''}<div class="invoice-actions">${i.status!=='paid'?`<button class="btn btn-secondary" data-pay-invoice="${esc(i.id)}">Оплатить</button><button class="btn btn-secondary" data-copy-reminder="${esc(i.id)}">Напомнить</button>`:''}<button class="btn btn-secondary" data-edit-invoice="${esc(i.id)}">Редактировать</button><button class="btn btn-secondary" data-print-invoice="${esc(i.id)}">Печать</button><button class="btn btn-secondary btn-danger-ghost" data-delete-invoice="${esc(i.id)}">Удалить</button></div></article>`).join('') : `<article class="card invoice-card"><p>Счетов с таким статусом нет.</p></article>`;
  }

  function renderServices() {
    $('#serviceGrid').innerHTML = data.services.length ? data.services.map(item => `<article class="card service-card"><div class="service-card-actions"><button class="row-action" data-edit-service="${esc(item.uid)}" title="Редактировать">✎</button><button class="row-action danger-action" data-delete-service="${esc(item.uid)}" title="Удалить">×</button></div><div class="service-icon">${esc(item.icon || initials(item.name))}</div><h3>${esc(item.name)}</h3><p>${esc(item.description)}</p><div class="service-footer"><div><div class="service-price">от ${formatMoney(item.price)}</div><span>${item.sold} продаж</span></div><span class="pill neutral">Активна</span></div></article>`).join('') : `<article class="card service-card"><p>Услуг пока нет.</p></article>`;
  }

  function noteTimestamp(value) {
    const time = new Date(value || 0).getTime();
    return Number.isFinite(time) ? time : 0;
  }
  function noteDateLabel(value) {
    const date = new Date(value || Date.now());
    const today = new Date();
    const sameDay = date.toDateString() === today.toDateString();
    return sameDay ? `Сегодня, ${date.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})}` : date.toLocaleDateString('ru-RU',{day:'2-digit',month:'short',year:date.getFullYear()!==today.getFullYear()?'numeric':undefined});
  }
  function noteExcerpt(content) {
    return String(content || '').replace(/[*_#>`~]/g, '').replace(/^[☐☑•]\s*/gm,'').replace(/\s+/g, ' ').trim().slice(0, 150);
  }
  function noteWordCount(content) { return String(content || '').trim() ? String(content).trim().split(/\s+/).length : 0; }
  function noteChecklistStats(content) {
    const lines=String(content||'').split('\n');
    const tasks=lines.filter(line=>/^[☐☑]\s+/.test(line));
    const done=tasks.filter(line=>/^☑\s+/.test(line)).length;
    return { total:tasks.length, done, open:Math.max(0,tasks.length-done), percent:tasks.length?Math.round(done/tasks.length*100):0 };
  }
  function noteHasOpenTasks(note) { return noteChecklistStats(note?.content).open > 0; }
  function noteReminderTimestamp(note) {
    if(!note?.reminderAt) return 0;
    const t=new Date(note.reminderAt).getTime(); return Number.isFinite(t)?t:0;
  }
  function noteReminderMeta(note) {
    const ts=noteReminderTimestamp(note); if(!ts) return {label:'',cls:'neutral',due:false};
    const d=new Date(ts), diff=ts-Date.now();
    const when=d.toLocaleString('ru-RU',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
    if(note.reminderDoneAt) return {label:`Обработано · ${when}`,cls:'success',due:false};
    if(diff<=0) return {label:`Нужно обработать · ${when}`,cls:'danger',due:true};
    if(diff<=24*60*60*1000) return {label:`Скоро · ${when}`,cls:'warning',due:false};
    return {label:`Напомнить ${when}`,cls:'info',due:false};
  }
  function noteLinkedEntity(note) {
    if(!note?.linkedType || !note.linkedId) return null;
    if(note.linkedType==='client') { const x=(data.clients||[]).find(i=>i.uid===note.linkedId); return x?{type:'client',key:x.uid,label:`Клиент · ${x.name}`}:{type:'missing',label:'Связанный клиент удалён'}; }
    if(note.linkedType==='deal') { const x=(data.deals||[]).find(d=>d.uid===note.linkedId); return x?{type:'deal',key:x.uid,label:`Сделка · ${x.company} · ${formatMoney(x.value)}`}:{type:'missing',label:'Связанная сделка удалена'}; }
    if(note.linkedType==='order') { const x=(data.orders||[]).find(i=>i.id===note.linkedId); return x?{type:'order',key:x.id,label:`Заказ · ${x.id} · ${x.client}`}:{type:'missing',label:'Связанный заказ удалён'}; }
    if(note.linkedType==='invoice') { const x=(data.invoices||[]).find(i=>i.id===note.linkedId); return x?{type:'invoice',key:x.id,label:`Счёт · ${x.id} · ${x.client}`}:{type:'missing',label:'Связанный счёт удалён'}; }
    if(note.linkedType==='event') { const x=(data.events||[]).find(i=>i.uid===note.linkedId); return x?{type:'event',key:x.uid,label:`Событие · ${x.title}`}:{type:'missing',label:'Связанное событие удалено'}; }
    return null;
  }
  function noteLinkOptions(note) {
    const current=note?.linkedType&&note?.linkedId?`${note.linkedType}:${note.linkedId}`:'';
    const opt=(value,label)=>`<option value="${esc(value)}" ${value===current?'selected':''}>${esc(label)}</option>`;
    const groups=[];
    if((data.clients||[]).length) groups.push(`<optgroup label="Клиенты">${data.clients.map(x=>opt(`client:${x.uid}`,x.name)).join('')}</optgroup>`);
    if((data.deals||[]).length) groups.push(`<optgroup label="Сделки">${data.deals.map(x=>opt(`deal:${x.uid}`,`${x.company} · ${dealStageMeta[x.stage]?.label||x.stage}`)).join('')}</optgroup>`);
    if((data.orders||[]).length) groups.push(`<optgroup label="Заказы">${data.orders.map(x=>opt(`order:${x.id}`,`${x.id} · ${x.client}`)).join('')}</optgroup>`);
    if((data.invoices||[]).length) groups.push(`<optgroup label="Счета">${data.invoices.map(x=>opt(`invoice:${x.id}`,`${x.id} · ${x.client}`)).join('')}</optgroup>`);
    if((data.events||[]).length) groups.push(`<optgroup label="Календарь">${data.events.map(x=>opt(`event:${x.uid}`,`${toRuDate(x.date)} · ${x.title}`)).join('')}</optgroup>`);
    return `<option value="">Не связано</option>${groups.join('')}`;
  }
  function currentNotesFilter() { return ['all','pinned','reminders','tasks','archive','trash'].includes(uiState.notesFilter) ? uiState.notesFilter : 'all'; }
  function getVisibleNotes() {
    const filter = currentNotesFilter();
    const notebook = uiState.notesNotebook || 'all';
    const tagFilter = String(uiState.notesTag || '').trim().toLowerCase();
    const q = String($('#notesSearch')?.value || '').trim().toLowerCase().replace(/^#/,'');
    let items = [...(data.notes || [])].filter(note => {
      const active=!note.archivedAt&&!note.trashedAt;
      if (filter === 'all' && !active) return false;
      if (filter === 'pinned' && (!note.pinned || !active)) return false;
      if (filter === 'reminders' && (!active || !note.reminderAt || note.reminderDoneAt)) return false;
      if (filter === 'tasks' && (!active || !noteHasOpenTasks(note))) return false;
      if (filter === 'archive' && (!note.archivedAt || note.trashedAt)) return false;
      if (filter === 'trash' && !note.trashedAt) return false;
      if (notebook !== 'all' && note.notebookId !== notebook) return false;
      if (tagFilter && !(note.tags || []).some(tag => String(tag).toLowerCase() === tagFilter)) return false;
      const linked=noteLinkedEntity(note)?.label||'';
      if (q && !`${note.title} ${note.content} ${(note.tags || []).join(' ')} ${linked}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const sort = uiState.notesSort || 'updated';
    items.sort((a,b) => {
      if (filter !== 'trash' && Number(!!b.pinned) !== Number(!!a.pinned)) return Number(!!b.pinned) - Number(!!a.pinned);
      if (filter==='reminders') return (noteReminderTimestamp(a)||Infinity)-(noteReminderTimestamp(b)||Infinity);
      if (sort === 'title') return String(a.title || '').localeCompare(String(b.title || ''), 'ru');
      if (sort === 'created') return noteTimestamp(b.createdAt) - noteTimestamp(a.createdAt);
      return noteTimestamp(b.updatedAt) - noteTimestamp(a.updatedAt);
    });
    return items;
  }
  function noteFilterLabel() {
    const names = { all:'Все заметки', pinned:'Закреплённые', reminders:'Напоминания', tasks:'Незавершённые задачи', archive:'Архив', trash:'Корзина' };
    const notebook = (data.notebooks || []).find(x => x.uid === uiState.notesNotebook);
    const parts=[names[currentNotesFilter()]];
    if(notebook) parts.push(notebook.name);
    if(uiState.notesTag) parts.push(`#${uiState.notesTag}`);
    return parts.join(' · ');
  }
  function renderNotesSidebar() {
    const notes = data.notes || [];
    const active = notes.filter(n => !n.archivedAt && !n.trashedAt);
    const counts = {
      all: active.length,
      pinned: active.filter(n => n.pinned).length,
      reminders: active.filter(n=>n.reminderAt&&!n.reminderDoneAt).length,
      tasks: active.filter(noteHasOpenTasks).length,
      archive: notes.filter(n => n.archivedAt && !n.trashedAt).length,
      trash: notes.filter(n => n.trashedAt).length
    };
    const ids={all:'notesAllCount',pinned:'notesPinnedCount',reminders:'notesReminderCount',tasks:'notesTasksCount',archive:'notesArchiveCount',trash:'notesTrashCount'};
    Object.entries(ids).forEach(([key,id])=>{if($(`#${id}`))$(`#${id}`).textContent=counts[key];});
    $$('#notesSmartFilters [data-notes-filter]').forEach(btn => btn.classList.toggle('active', btn.dataset.notesFilter === currentNotesFilter()));
    const list = $('#notebookList'); if (!list) return;
    const selected = uiState.notesNotebook || 'all';
    const allCount = notes.filter(n => !n.trashedAt).length;
    const rows = [`<button class="notebook-row ${selected==='all'?'active':''}" type="button" data-notebook-filter="all"><span class="notebook-icon">▧</span><span><strong>Все блокноты</strong><small>${allCount} заметок</small></span></button>`];
    (data.notebooks || []).forEach(book => {
      const count = notes.filter(n => n.notebookId === book.uid && !n.trashedAt).length;
      rows.push(`<div class="notebook-row-wrap ${selected===book.uid?'active':''}"><button class="notebook-row" type="button" data-notebook-filter="${esc(book.uid)}"><span class="notebook-icon">▤</span><span><strong>${esc(book.name)}</strong><small>${count} ${count===1?'заметка':'заметок'}</small></span></button><div class="notebook-actions"><button type="button" data-edit-notebook="${esc(book.uid)}" title="Переименовать">✎</button><button type="button" data-delete-notebook="${esc(book.uid)}" title="Удалить">×</button></div></div>`);
    });
    if (!(data.notebooks || []).length) rows.push('<div class="notebooks-empty">Создайте первый блокнот, чтобы разделить записи по темам.</div>');
    list.innerHTML = rows.join('');

    const tagList=$('#noteTagList');
    if(tagList){
      const tagMap=new Map();
      active.forEach(note=>(note.tags||[]).forEach(raw=>{const label=String(raw||'').trim();if(!label)return;const key=label.toLowerCase();const prev=tagMap.get(key)||{label,count:0};prev.count++;tagMap.set(key,prev);}));
      const tags=[...tagMap.values()].sort((a,b)=>b.count-a.count||a.label.localeCompare(b.label,'ru')).slice(0,16);
      const selectedTag=String(uiState.notesTag||'').toLowerCase();
      tagList.innerHTML=tags.length?tags.map(tag=>`<button type="button" class="note-tag-filter ${selectedTag===tag.label.toLowerCase()?'active':''}" data-note-tag-filter="${esc(tag.label)}"><span>#${esc(tag.label)}</span><strong>${tag.count}</strong></button>`).join(''):'<div class="note-tags-empty">Теги появятся здесь после добавления их к заметкам.</div>';
      const clearTag=$('#clearNoteTagFilter');if(clearTag)clearTag.hidden=!uiState.notesTag;
    }
  }
  function renderNotesList() {
    const list = $('#notesList'); if (!list) return;
    const items = getVisibleNotes();
    if ($('#notesListTitle')) $('#notesListTitle').textContent = noteFilterLabel();
    if ($('#notesListCount')) $('#notesListCount').textContent = `${items.length}`;
    if ($('#notesSort')) $('#notesSort').value = uiState.notesSort || 'updated';
    const selectedExists = items.some(n => n.uid === uiState.selectedNoteId);
    if (!selectedExists && items.length) { uiState.selectedNoteId = items[0].uid; saveUiState(); }
    if (!items.length) {
      const trash = currentNotesFilter() === 'trash';
      list.innerHTML = `<div class="notes-empty-list"><span>${trash?'✓':'▧'}</span><strong>${trash?'Корзина пуста':'Заметок не найдено'}</strong><p>${trash?'Удалённые заметки будут храниться здесь до ручного удаления.':'Создайте заметку или измените фильтр поиска.'}</p>${trash?'':'<button type="button" class="btn btn-primary btn-small" data-create-note="empty">+ Новая заметка</button>'}</div>`;
      if (!$('#notesSearch')?.value) uiState.selectedNoteId = '';
      return;
    }
    list.innerHTML = items.map(note => {
      const book = (data.notebooks || []).find(x => x.uid === note.notebookId);
      const excerpt = noteExcerpt(note.content) || 'Пустая заметка';
      const tags = (note.tags || []).slice(0,3).map(tag => `<span data-note-tag="${esc(tag)}" title="Показать заметки с тегом #${esc(tag)}">#${esc(tag)}</span>`).join('');
      const linked=noteLinkedEntity(note); const reminder=noteReminderMeta(note); const tasks=noteChecklistStats(note.content);
      return `<button type="button" class="note-list-item ${uiState.selectedNoteId===note.uid?'active':''}" data-select-note="${esc(note.uid)}"><div class="note-list-head"><strong>${esc(note.title || 'Без названия')}</strong>${note.pinned?'<span class="note-pin" title="Закреплено">◆</span>':''}</div><p>${esc(excerpt)}</p><div class="note-list-badges">${reminder.label&&!note.reminderDoneAt?`<span class="note-reminder-chip ${reminder.cls}">⏰ ${esc(reminder.label)}</span>`:''}${tasks.total?`<span class="note-task-chip ${tasks.open?'warning':'success'}">☑ ${tasks.done}/${tasks.total}</span>`:''}${linked?`<span class="note-link-chip">↗ ${esc(linked.label)}</span>`:''}</div><div class="note-list-foot"><span>${esc(book?.name || 'Без блокнота')}</span><span>${esc(noteDateLabel(note.updatedAt))}</span></div>${tags?`<div class="note-list-tags">${tags}</div>`:''}</button>`;
    }).join('');
  }
  function snapshotNoteState(note) {
    return { savedAt:new Date().toISOString(), title:note.title||'', content:note.content||'', notebookId:note.notebookId||'', tags:[...(note.tags||[])], reminderAt:note.reminderAt||'', linkedType:note.linkedType||'', linkedId:note.linkedId||'' };
  }
  function captureNoteHistory(note, force=false) {
    note.history=Array.isArray(note.history)?note.history:[];
    const last=note.history.at(-1); const now=Date.now();
    if(!force && last && now-noteTimestamp(last.savedAt)<3*60*1000) return;
    const snap=snapshotNoteState(note);
    const same=last && ['title','content','notebookId','reminderAt','linkedType','linkedId'].every(k=>String(last[k]||'')===String(snap[k]||'')) && JSON.stringify(last.tags||[])===JSON.stringify(snap.tags||[]);
    if(same) return;
    note.history.push(snap); if(note.history.length>12) note.history=note.history.slice(-12); while(note.history.length>2 && note.history.reduce((sum,h)=>sum+String(h.content||'').length+String(h.title||'').length,0)>250000) note.history.shift();
  }
  function noteInlineMarkup(value) {
    let safe=esc(value||'');
    safe=safe.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/_(.+?)_/g,'<em>$1</em>');
    return safe;
  }
  function renderNotePreview(content,uid) {
    const lines=String(content||'').split('\n');
    if(!lines.some(x=>x.trim())) return '<div class="note-preview-empty">В заметке пока нет текста.</div>';
    return `<div class="note-preview-content">${lines.map((line,index)=>{
      if(!line.trim()) return '<div class="note-preview-space"></div>';
      if(/^##\s+/.test(line)) return `<h3>${noteInlineMarkup(line.replace(/^##\s+/,''))}</h3>`;
      if(/^─{4,}/.test(line.trim())) return '<hr>';
      if(/^☐\s+/.test(line)||/^☑\s+/.test(line)) { const done=/^☑/.test(line); return `<button type="button" class="note-preview-check ${done?'done':''}" data-toggle-note-check="${esc(uid)}:${index}"><span>${done?'☑':'☐'}</span><span>${noteInlineMarkup(line.replace(/^[☐☑]\s+/,''))}</span></button>`; }
      if(/^•\s+/.test(line)) return `<p class="note-preview-bullet"><span>•</span>${noteInlineMarkup(line.replace(/^•\s+/,''))}</p>`;
      if(/^\d+\.\s+/.test(line)) { const mm=line.match(/^(\d+)\.\s+(.*)$/); return `<p class="note-preview-number"><span>${esc(mm[1])}.</span>${noteInlineMarkup(mm[2])}</p>`; }
      return `<p>${noteInlineMarkup(line)}</p>`;
    }).join('')}</div>`;
  }
  function renderNoteHistory(note) {
    if(!uiState.noteHistoryOpen) return '';
    const history=[...(note.history||[])].reverse();
    return `<section class="note-history-panel"><div class="note-history-head"><div><strong>История заметки</strong><span>До 12 предыдущих состояний. Можно восстановить нужную версию.</span></div><button type="button" class="row-action" data-toggle-note-history title="Закрыть историю">×</button></div>${history.length?`<div class="note-history-list">${history.map((h,idx)=>{const sourceIndex=(note.history||[]).length-1-idx;return `<div class="note-history-item"><div><strong>${esc(noteDateLabel(h.savedAt))}</strong><span>${esc(h.title||'Без названия')} · ${noteWordCount(h.content)} слов</span></div><button type="button" class="btn btn-secondary btn-small" data-restore-note-version="${sourceIndex}">Восстановить</button></div>`}).join('')}</div>`:'<div class="note-history-empty">Предыдущих версий пока нет. История создаётся автоматически во время работы.</div>'}</section>`;
  }
  function relatedNotesFor(note) {
    if(!note) return [];
    const sourceTags=new Set((note.tags||[]).map(x=>String(x).trim().toLowerCase()).filter(Boolean));
    return (data.notes||[]).filter(other=>other.uid!==note.uid&&!other.trashedAt&&!other.archivedAt).map(other=>{
      const otherTags=(other.tags||[]).map(x=>String(x).trim().toLowerCase()).filter(Boolean);
      const shared=otherTags.filter(tag=>sourceTags.has(tag));
      let score=shared.length*3; const reasons=[];
      if(shared.length){score+=shared.length;reasons.push(shared.slice(0,2).map(t=>`#${t}`).join(', '));}
      if(note.notebookId&&other.notebookId===note.notebookId){score+=1;reasons.push('тот же блокнот');}
      if(note.linkedType&&note.linkedId&&other.linkedType===note.linkedType&&other.linkedId===note.linkedId){score+=5;reasons.push('те же бизнес-данные');}
      return {note:other,score,reasons};
    }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score||noteTimestamp(b.note.updatedAt)-noteTimestamp(a.note.updatedAt)).slice(0,4);
  }
  function renderRelatedNotes(note) {
    const related=relatedNotesFor(note); if(!related.length) return '';
    return `<section class="note-related-panel"><div class="note-related-head"><strong>Похожие заметки</strong><span>По тегам, блокноту и связанным данным</span></div><div class="note-related-list">${related.map(item=>`<button type="button" class="note-related-item" data-related-note="${esc(item.note.uid)}"><strong>${esc(item.note.title||'Без названия')}</strong><span>${esc(item.reasons.join(' · ')||noteExcerpt(item.note.content)||'Связанная запись')}</span></button>`).join('')}</div></section>`;
  }

  function normalizeNoteTabs() {
    const existing=new Set((data.notes||[]).map(n=>n.uid));
    const tabs=Array.isArray(uiState.noteTabs)?uiState.noteTabs:[];
    uiState.noteTabs=[...new Set(tabs)].filter(uid=>existing.has(uid)).slice(-6);
    if(uiState.selectedNoteId&&existing.has(uiState.selectedNoteId)&&!uiState.noteTabs.includes(uiState.selectedNoteId)) uiState.noteTabs.push(uiState.selectedNoteId);
    if(uiState.noteTabs.length>6) uiState.noteTabs=uiState.noteTabs.slice(-6);
  }
  function openNoteTab(uid) {
    if(!(data.notes||[]).some(n=>n.uid===uid)) return;
    normalizeNoteTabs();
    if(!uiState.noteTabs.includes(uid)) uiState.noteTabs.push(uid);
    if(uiState.noteTabs.length>6)uiState.noteTabs=uiState.noteTabs.slice(-6);
  }
  function closeNoteTab(uid) {
    normalizeNoteTabs();
    const wasActive=uiState.selectedNoteId===uid;
    uiState.noteTabs=uiState.noteTabs.filter(id=>id!==uid);
    if(wasActive){const next=uiState.noteTabs.at(-1)||getVisibleNotes()[0]?.uid||'';uiState.selectedNoteId=next;}
    if(!uiState.selectedNoteId)uiState.noteFocus=false;
    saveUiState();renderNotes();
  }
  function renderNoteTabs() {
    normalizeNoteTabs();
    const tabs=uiState.noteTabs.map(uid=>(data.notes||[]).find(n=>n.uid===uid)).filter(Boolean);
    if(tabs.length<2) return '';
    return `<div class="note-tabs-bar" aria-label="Открытые заметки">${tabs.map(note=>`<div class="note-tab-wrap ${note.uid===uiState.selectedNoteId?'active':''}"><button type="button" class="note-tab" data-note-tab="${esc(note.uid)}" title="${esc(note.title||'Без названия')}"><span>${note.pinned?'◆ ':''}${esc(note.title||'Без названия')}</span></button><button type="button" class="note-tab-close" data-close-note-tab="${esc(note.uid)}" title="Закрыть вкладку">×</button></div>`).join('')}</div>`;
  }

  function renderNoteEditor() {
    const host = $('#noteEditor'); if (!host) return;
    const note = (data.notes || []).find(n => n.uid === uiState.selectedNoteId);
    if (!note) {
      host.innerHTML = `<div class="note-editor-empty"><div class="note-empty-icon">▧</div><h3>Место для всего важного</h3><p>Записывайте идеи, договорённости, инструкции и мысли, которые не должны потеряться. Для важных записей можно поставить напоминание и связать их с клиентом, заказом, счётом или событием.</p><div class="note-empty-actions"><button type="button" class="btn btn-primary" data-create-note="empty">Новая заметка</button><button type="button" class="btn btn-secondary" data-create-note="meeting">Итоги встречи</button></div><div class="note-template-hints"><span>Шаблоны:</span><button type="button" data-create-note="sales">Продажный созвон</button><button type="button" data-create-note="sop">Инструкция</button><button type="button" data-create-note="idea">Бизнес-идея</button><button type="button" data-create-note="weekly">План недели</button></div></div>`;
      return;
    }
    const trashed = !!note.trashedAt;
    const archived = !!note.archivedAt && !trashed;
    const bookOptions = `<option value="">Без блокнота</option>${(data.notebooks || []).map(book => `<option value="${esc(book.uid)}" ${book.uid===note.notebookId?'selected':''}>${esc(book.name)}</option>`).join('')}`;
    const updated = noteDateLabel(note.updatedAt); const reminder=noteReminderMeta(note); const linked=noteLinkedEntity(note); const tasks=noteChecklistStats(note.content);
    const preview=!!uiState.notePreview;
    host.innerHTML = `${renderNoteTabs()}<div class="note-editor-head"><div class="note-status-line"><span class="note-save-dot"></span><strong id="noteSaveStatus">Сохранено автоматически</strong><span>· ${esc(updated)}</span>${archived?'<span class="pill neutral">В архиве</span>':''}${trashed?'<span class="pill danger">В корзине</span>':''}${reminder.due?'<span class="pill danger">Есть напоминание</span>':''}</div><div class="note-editor-actions">${trashed?`<button type="button" class="btn btn-secondary btn-small" data-restore-note="${esc(note.uid)}">Восстановить</button><button type="button" class="btn btn-danger btn-small" data-delete-note-permanent="${esc(note.uid)}">Удалить навсегда</button>`:`<button type="button" class="icon-btn ${note.pinned?'note-action-active':''}" data-toggle-note-pin="${esc(note.uid)}" title="${note.pinned?'Открепить':'Закрепить'}">◆</button><button type="button" class="btn btn-secondary btn-small ${uiState.noteFocus?'note-action-active':''}" data-toggle-note-focus title="Скрыть боковые панели и сосредоточиться на заметке">${uiState.noteFocus?'Обычный вид':'Фокус'}</button><button type="button" class="btn btn-secondary btn-small ${preview?'note-action-active':''}" data-toggle-note-preview>${preview?'Редактировать':'Просмотр'}</button><button type="button" class="icon-btn" data-duplicate-note="${esc(note.uid)}" title="Создать копию">⧉</button><button type="button" class="icon-btn" data-export-note="${esc(note.uid)}" title="Скачать заметку в Markdown">↓</button><button type="button" class="icon-btn ${uiState.noteHistoryOpen?'note-action-active':''}" data-toggle-note-history title="История заметки">↶</button><button type="button" class="btn btn-secondary btn-small" data-toggle-note-archive="${esc(note.uid)}">${archived?'Вернуть из архива':'В архив'}</button><button type="button" class="icon-btn danger-action" data-trash-note="${esc(note.uid)}" title="В корзину">×</button>`}</div></div>
      <input class="note-title-input" data-note-field="title" value="${esc(note.title)}" placeholder="Название заметки" ${trashed?'disabled':''}>
      <div class="note-meta-row note-meta-grid"><label><span>Блокнот</span><select class="select" data-note-field="notebookId" ${trashed?'disabled':''}>${bookOptions}</select></label><label><span>Теги через запятую</span><input data-note-field="tags" value="${esc((note.tags || []).join(', '))}" placeholder="клиент, идея, важно" ${trashed?'disabled':''}></label><label><span>Связать с данными бизнеса</span><select class="select" data-note-field="linkedRef" ${trashed?'disabled':''}>${noteLinkOptions(note)}</select></label><label><span>Напомнить</span><input type="datetime-local" data-note-field="reminderAt" value="${esc(note.reminderAt||'')}" ${trashed?'disabled':''}></label></div>
      ${linked?`<div class="note-context-bar ${linked.type==='missing'?'is-missing':''}"><span>↗ ${esc(linked.label)}</span>${linked.type!=='missing'?`<button type="button" class="btn btn-secondary btn-small" data-open-note-link="${esc(note.uid)}">Открыть</button>`:''}</div>`:''}
      ${note.reminderAt?`<div class="note-reminder-bar ${reminder.cls}"><div><strong>⏰ ${esc(reminder.label)}</strong><span>${note.reminderDoneAt?'Напоминание уже обработано.':'BizPilot сохранит уведомление в центре и не потеряет его, пока вы сами не обработаете.'}</span></div><div>${!note.reminderDoneAt?`<button type="button" class="btn btn-secondary btn-small" data-complete-note-reminder="${esc(note.uid)}">Обработано</button>`:''}<button type="button" class="btn btn-secondary btn-small" data-clear-note-reminder="${esc(note.uid)}">Убрать</button></div></div>`:''}
      ${preview?`<div class="note-preview-toolbar"><span>Предпросмотр заметки</span>${tasks.total?`<strong>Чек-лист: ${tasks.done}/${tasks.total} · ${tasks.percent}%</strong>`:''}</div>${renderNotePreview(note.content,note.uid)}`:`<div class="note-format-toolbar" aria-label="Инструменты заметки">${trashed?'':`<button type="button" data-note-format="heading" title="Заголовок">H2</button><button type="button" data-note-format="bold" title="Жирный">B</button><button type="button" data-note-format="italic" title="Курсив"><i>I</i></button><button type="button" data-note-format="bullet" title="Маркированный список">• Список</button><button type="button" data-note-format="number" title="Нумерованный список">1. Список</button><button type="button" data-note-format="check" title="Чек-лист">☐ Чек-лист</button><button type="button" data-note-format="divider" title="Разделитель">—</button><button type="button" data-note-format="date" title="Вставить дату">Дата</button>`}</div><textarea class="note-content-input" data-note-field="content" id="noteContentInput" placeholder="Начните писать…" ${trashed?'disabled':''}>${esc(note.content)}</textarea>`}
      ${renderNoteHistory(note)}
      ${!trashed?renderRelatedNotes(note):''}
      <div class="note-editor-footer"><span id="noteEditorStats">${noteWordCount(note.content)} слов · ${String(note.content || '').length} символов${tasks.total?` · задач ${tasks.done}/${tasks.total}`:''}</span><span>${uiState.noteFocus?'<span class="note-focus-hint">Режим фокуса · <kbd>Esc</kbd> выйти</span>':(trashed?'Заметка хранится в корзине до ручного удаления':'Автосохранение + история изменений')}</span></div>`;
  }
  function renderNotes() {
    if (!$('#notesPanel')) return;
    renderNotesSidebar(); renderNotesList(); renderNoteEditor();
    const workspace=$('#notesWorkspace');
    const hasSelected=(data.notes||[]).some(n=>n.uid===uiState.selectedNoteId);
    if(!hasSelected&&uiState.noteFocus){uiState.noteFocus=false;saveUiState();}
    workspace?.classList.toggle('note-focus',!!uiState.noteFocus&&hasSelected);
  }
  function selectNote(uid) {
    if (!(data.notes || []).some(n => n.uid === uid)) return;
    uiState.selectedNoteId = uid; openNoteTab(uid); uiState.notePreview=false; uiState.noteHistoryOpen=false; saveUiState(); renderNotesList(); renderNoteEditor();
    if (window.innerWidth < 980) $('#noteEditorPanel')?.scrollIntoView({ behavior:'smooth', block:'start' });
  }
  function createNote(templateKey = 'empty') {
    data.notes = data.notes || [];
    const tpl = NOTE_TEMPLATES[templateKey] || NOTE_TEMPLATES.empty;
    const now = new Date().toISOString();
    const selectedNotebook = uiState.notesNotebook !== 'all' && (data.notebooks || []).some(b => b.uid === uiState.notesNotebook) ? uiState.notesNotebook : ((data.notebooks || [])[0]?.uid || '');
    const note = { uid: makeId('note'), title: tpl.title, content: tpl.content, notebookId: selectedNotebook, tags: [...(tpl.tags || [])], pinned:false, reminderAt:'', reminderDoneAt:null, linkedType:'', linkedId:'', history:[], archivedAt:null, trashedAt:null, createdAt:now, updatedAt:now };
    data.notes.unshift(note); uiState.notesFilter='all'; uiState.notesTag=''; uiState.selectedNoteId=note.uid; openNoteTab(note.uid); uiState.notePreview=false; uiState.noteHistoryOpen=false; saveUiState(); saveData(); renderNotes(); renderProfile();
    setTimeout(()=>{ const title=$('[data-note-field="title"]'); if(title){title.focus();title.setSelectionRange(title.value.length,title.value.length);} },30);
    toast(templateKey==='empty'?'Заметка создана':'Заметка создана по шаблону');
  }
  function saveNoteField(target) {
    const note = (data.notes || []).find(n => n.uid === uiState.selectedNoteId); if (!note || note.trashedAt) return;
    const field = target.dataset.noteField; captureNoteHistory(note);
    if (field === 'tags') note.tags = [...new Set(String(target.value || '').split(',').map(x => x.trim().replace(/^#/, '')).filter(Boolean))].slice(0,20);
    else if(field==='linkedRef') { const [type,...rest]=String(target.value||'').split(':'); note.linkedType=['client','deal','order','invoice','event'].includes(type)?type:''; note.linkedId=note.linkedType?rest.join(':'):''; }
    else if(field==='reminderAt') { archiveNotificationsForSource('note',note.uid,true); note.reminderAt=String(target.value||''); note.reminderDoneAt=null; }
    else note[field] = target.value;
    note.updatedAt = new Date().toISOString();
    const status = $('#noteSaveStatus'); if (status) status.textContent = 'Сохраняем…';
    if ($('#noteEditorStats')) { const tasks=noteChecklistStats(note.content); $('#noteEditorStats').textContent = `${noteWordCount(note.content)} слов · ${String(note.content || '').length} символов${tasks.total?` · задач ${tasks.done}/${tasks.total}`:''}`; }
    clearTimeout(noteSaveTimer);
    noteSaveTimer = setTimeout(()=>{ saveData(); generateImportantNotifications(); renderNotesSidebar(); renderNotesList(); updateNotificationIndicator(); const st=$('#noteSaveStatus'); if(st) st.textContent='Сохранено автоматически'; }, 450);
  }
  function insertNoteFormat(type) {
    const area = $('#noteContentInput'); if (!area || area.disabled) return;
    const start = area.selectionStart ?? area.value.length, end = area.selectionEnd ?? start;
    const selected = area.value.slice(start,end);
    const formats = {
      heading: [`## ${selected || 'Заголовок'}`], bold: [`**${selected || 'важный текст'}**`], italic: [`_${selected || 'текст'}_`],
      bullet: [`${selected ? selected.split('\n').map(x=>`• ${x}`).join('\n') : '• '}`], number: [`${selected ? selected.split('\n').map((x,i)=>`${i+1}. ${x}`).join('\n') : '1. '}`],
      check: [`${selected ? selected.split('\n').map(x=>`☐ ${x}`).join('\n') : '☐ '}`], divider: ['\n────────────\n'], date: [new Date().toLocaleDateString('ru-RU')]
    };
    const [insert] = formats[type] || ['',0]; if (!insert) return;
    area.setRangeText(insert,start,end,'end'); area.dispatchEvent(new Event('input',{bubbles:true})); area.focus();
  }
  function toggleNoteChecklist(uid,index) {
    const note=(data.notes||[]).find(n=>n.uid===uid); if(!note||note.trashedAt)return;
    const lines=String(note.content||'').split('\n'); const i=Number(index); if(!Number.isInteger(i)||i<0||i>=lines.length)return;
    captureNoteHistory(note,true);
    if(/^☐\s+/.test(lines[i])) lines[i]=lines[i].replace(/^☐/,'☑'); else if(/^☑\s+/.test(lines[i])) lines[i]=lines[i].replace(/^☑/,'☐'); else return;
    note.content=lines.join('\n'); note.updatedAt=new Date().toISOString(); saveData(); renderNotes();
  }
  function duplicateNote(uid) {
    const src=(data.notes||[]).find(n=>n.uid===uid); if(!src)return;
    const now=new Date().toISOString(); const copy={...src,uid:makeId('note'),title:`Копия — ${src.title||'Без названия'}`,pinned:false,reminderAt:'',reminderDoneAt:null,history:[],archivedAt:null,trashedAt:null,createdAt:now,updatedAt:now};
    data.notes.unshift(copy);uiState.notesFilter='all';uiState.selectedNoteId=copy.uid;openNoteTab(copy.uid);uiState.notePreview=false;uiState.noteHistoryOpen=false;saveData();saveUiState();renderNotes();toast('Создана копия заметки');
  }
  function exportNoteMarkdown(uid) {
    const note=(data.notes||[]).find(n=>n.uid===uid);if(!note)return;const book=(data.notebooks||[]).find(b=>b.uid===note.notebookId);const linked=noteLinkedEntity(note);
    const header=[`# ${note.title||'Без названия'}`,book?`Блокнот: ${book.name}`:'',note.tags?.length?`Теги: ${note.tags.map(t=>`#${t}`).join(' ')}`:'',linked?`Связано: ${linked.label}`:'',note.reminderAt?`Напоминание: ${noteReminderMeta(note).label}`:''].filter(Boolean).join('\n');
    const filename=`${slug(note.title||'note')||'note'}.md`; downloadBlob(new Blob([`${header}\n\n${note.content||''}\n`],{type:'text/markdown;charset=utf-8'}),filename);toast('Заметка скачана в Markdown');
  }
  function openNoteLinkedEntity(uid) {
    const note=(data.notes||[]).find(n=>n.uid===uid);const linked=noteLinkedEntity(note);if(!linked||linked.type==='missing')return;
    if(linked.type==='client') openModal('clientEdit',linked.key); else if(linked.type==='order') openModal('orderEdit',linked.key); else if(linked.type==='invoice') openModal('invoiceEdit',linked.key); else if(linked.type==='event'){const e=(data.events||[]).find(x=>x.uid===linked.key);if(e){uiState.calendarMonth=e.date.slice(0,7);saveUiState();switchView('calendar');openModal('eventEdit',linked.key);}}
  }
  function completeNoteReminder(uid) {
    const note=(data.notes||[]).find(n=>n.uid===uid);if(!note)return;note.reminderDoneAt=new Date().toISOString();archiveNotificationsForSource('note',uid,false);note.updatedAt=new Date().toISOString();saveData();renderAll();toast('Напоминание по заметке обработано');
  }
  function clearNoteReminder(uid) {
    const note=(data.notes||[]).find(n=>n.uid===uid);if(!note)return;captureNoteHistory(note,true);archiveNotificationsForSource('note',uid,true);note.reminderAt='';note.reminderDoneAt=null;note.updatedAt=new Date().toISOString();saveData();renderAll();toast('Напоминание убрано');
  }
  function restoreNoteVersion(index) {
    const note=(data.notes||[]).find(n=>n.uid===uiState.selectedNoteId);const snap=note?.history?.[Number(index)];if(!note||!snap)return;
    captureNoteHistory(note,true); archiveNotificationsForSource('note',note.uid,true);
    Object.assign(note,{title:snap.title,content:snap.content,notebookId:snap.notebookId,tags:[...(snap.tags||[])],reminderAt:snap.reminderAt||'',reminderDoneAt:null,linkedType:snap.linkedType||'',linkedId:snap.linkedId||'',updatedAt:new Date().toISOString()});
    saveData();uiState.noteHistoryOpen=false;saveUiState();renderNotes();toast('Предыдущая версия заметки восстановлена');
  }
  function trashNote(uid) {
    const note=(data.notes||[]).find(n=>n.uid===uid); if(!note)return;
    snapshotForUndo(`заметка ${note.title || 'Без названия'}`); archiveNotificationsForSource('note',uid,false); note.trashedAt=new Date().toISOString(); note.archivedAt=null; note.pinned=false; saveData();
    uiState.noteTabs=(uiState.noteTabs||[]).filter(id=>id!==uid); const next=getVisibleNotes().find(n=>n.uid!==uid); uiState.selectedNoteId=next?.uid||''; if(uiState.selectedNoteId)openNoteTab(uiState.selectedNoteId); else uiState.noteFocus=false; uiState.notePreview=false;uiState.noteHistoryOpen=false;saveUiState(); renderNotes(); renderProfile(); offerUndo('Заметка перемещена в корзину');
  }
  function restoreNote(uid) {
    const note=(data.notes||[]).find(n=>n.uid===uid); if(!note)return;
    note.trashedAt=null; note.archivedAt=null; note.updatedAt=new Date().toISOString(); archiveNotificationsForSource('note',uid,true); uiState.notesFilter='all'; uiState.selectedNoteId=uid; openNoteTab(uid); saveData();saveUiState();renderNotes();toast('Заметка восстановлена');
  }

  function renderAnalytics() {
    const liveMonth=monthlyTransactionSeries(1);
    const revenue = demoMode ? Number(data.chart?.revenue12?.at(-1) || 0) : Number(liveMonth.revenue[0]||0);
    const expenses = demoMode ? Number(data.chart?.expense12?.at(-1) || 0) : Number(liveMonth.expense[0]||0);
    const margin = revenue > 0 ? Math.round((revenue-expenses)/revenue*100) : 0;
    const outstanding = outstandingInvoices();
    const outstandingTotal = outstanding.reduce((sum,x)=>sum+Number(x.amount||0),0);
    const overdueAmount = outstanding.filter(x=>toIsoDate(x.due)<todayIso()).reduce((sum,x)=>sum+Number(x.amount||0),0);
    const overdueShare = outstandingTotal > 0 ? Math.round(overdueAmount/outstandingTotal*100) : 0;
    const clientRevenue = data.clients.reduce((sum,c)=>sum+Number(c.revenue||0),0);
    const topClient = [...data.clients].sort((a,b)=>Number(b.revenue||0)-Number(a.revenue||0))[0];
    const concentration = clientRevenue > 0 && topClient ? Math.round(Number(topClient.revenue||0)/clientRevenue*100) : 0;
    const expenseSeries = demoMode ? (data.chart?.expense12||[]).slice(-3) : monthlyTransactionSeries(3).expense;
    const nonZeroExpenses = expenseSeries.map(Number).filter(v=>v>0);
    const avgMonthlyExpense = nonZeroExpenses.length ? nonZeroExpenses.reduce((a,b)=>a+b,0)/nonZeroExpenses.length : 0;
    const cashBalance = Number(data.business?.cashBalance||0);
    const runway = avgMonthlyExpense > 0 ? cashBalance/avgMonthlyExpense : null;
    const runwayText = runway == null ? '—' : `${runway.toLocaleString('ru-RU',{maximumFractionDigits:1})} мес.`;
    $('#analyticsMetrics').innerHTML = [
      ['Маржинальность', `${margin}%`, revenue ? 'по факту' : '—', revenue ? 'выручка минус расходы' : 'нет выручки', '↗', margin>=20?'up':'down'],
      ['Просроченная дебиторка', `${overdueShare}%`, outstandingTotal ? formatMoney(overdueAmount) : '—', outstandingTotal ? 'от неоплаченных счетов' : 'нет дебиторки', '▤', overdueShare>25?'down':'up'],
      ['Запас денег', runwayText, avgMonthlyExpense ? formatMoney(cashBalance) : '—', avgMonthlyExpense ? 'при среднем темпе расходов' : 'нужны расходы', '≈', runway!=null&&runway<2?'down':'up'],
      ['Крупнейший клиент', `${concentration}%`, topClient?.name || '—', clientRevenue ? 'доля в оплаченной выручке' : 'нет оплат', '◎', concentration>40?'down':'up']
    ].map(m=>metricCard(...m)).join('');
    const topC = [...data.clients].sort((a,b)=>b.revenue-a.revenue).slice(0,5);
    $('#topClients').innerHTML = topC.length ? topC.map((c,i)=>rankRow(i+1,c.name,`${c.orders} заказов`,formatMoney(c.revenue))).join('') : '<div class="empty-rank">Добавьте клиентов, чтобы увидеть рейтинг.</div>';
    const topS = [...data.services].sort((a,b)=>b.sold-a.sold).slice(0,5);
    $('#topServices').innerHTML = topS.length ? topS.map((service,i)=>rankRow(i+1,service.name,`от ${formatMoney(service.price)}`,`${service.sold} продаж`)).join('') : '<div class="empty-rank">Добавьте услуги, чтобы увидеть рейтинг.</div>';
    const profitableOrders=(data.orders||[]).filter(o=>orderProfit(o)!=null).sort((a,b)=>orderProfit(b)-orderProfit(a)).slice(0,5);
    if($('#topOrdersProfit')) $('#topOrdersProfit').innerHTML=profitableOrders.length?profitableOrders.map((o,i)=>rankRow(i+1,`${o.id} · ${o.client}`,`${o.service} · маржа ${orderMargin(o)?.toLocaleString('ru-RU',{maximumFractionDigits:0})||0}%`,formatMoney(orderProfit(o)))).join(''):'<div class="empty-rank">Укажите прямые затраты по заказам, чтобы увидеть реальную прибыльность.</div>';
    const insights = [];
    if (overdueAmount > 0) insights.push({kind:overdueShare>25?'danger':'warning', title:'Деньги зависли в дебиторке', text:`Просрочено ${formatMoney(overdueAmount)} (${overdueShare}% всей неоплаченной суммы). Сначала разберите самые старые и крупные счета.`, go:'cashflow', action:'Разобрать дебиторку'});
    if (runway != null && runway < 2) insights.push({kind:'danger', title:'Небольшой запас денег', text:`Текущего остатка хватит примерно на ${runway.toLocaleString('ru-RU',{maximumFractionDigits:1})} мес. при текущем темпе расходов. Проверьте ближайшие платежи и сроки поступлений.`, go:'cashflow', action:'Открыть прогноз'});
    else if (runway != null) insights.push({kind:'success', title:'Запас денег под контролем', text:`Оценочный запас: ${runway.toLocaleString('ru-RU',{maximumFractionDigits:1})} мес. Регулярно обновляйте текущий остаток, чтобы показатель оставался полезным.`, go:'cashflow', action:'Проверить прогноз'});
    if (concentration > 40 && topClient) insights.push({kind:'warning', title:'Высокая зависимость от одного клиента', text:`${topClient.name} даёт около ${concentration}% оплаченной выручки. Потеря такого клиента заметно повлияет на бизнес — полезно развивать другие продажи.`, go:'clients', action:'Посмотреть клиентов'});
    if (margin && margin < 20) insights.push({kind:'warning', title:'Низкая маржинальность', text:`Операционная маржинальность около ${margin}%. Проверьте цены и самые крупные категории расходов.`, go:'finance', action:'Разобрать расходы'});
    const activePipeline=activeDeals().reduce((s,d)=>s+Number(d.value||0),0); const overdueDeals=activeDeals().filter(d=>dealNextActionState(d).overdue).length;
    if(overdueDeals) insights.push({kind:'warning',title:'Продажи требуют follow-up',text:`Просрочено следующих действий: ${overdueDeals}. Активная воронка — ${formatMoney(activePipeline)}. Сначала обработайте сделки с уже прошедшей датой следующего шага.`,go:'sales',action:'Открыть продажи'});
    else if(activePipeline>0) insights.push({kind:'info',title:'Есть будущая выручка в воронке',text:`Активная воронка: ${formatMoney(activePipeline)}. Проверяйте не только сумму, но и чтобы у каждой сделки был конкретный следующий шаг и дата.`,go:'sales',action:'Посмотреть воронку'});
    if (data.services.length) { const top=[...data.services].sort((a,b)=>b.sold-a.sold)[0]; insights.push({kind:'info', title:'Самая продаваемая услуга', text:`${top.name}: ${top.sold} продаж. Сравните её цену и загрузку с другими услугами — это кандидат для усиления предложения.`, go:'services', action:'Открыть услуги'}); }
    if (!insights.length) insights.push({kind:'info', title:'Недостаточно данных', text:'Добавьте сделки, заказы, счета, клиентов и операции — здесь появятся автоматические выводы и следующие действия.', go:'dashboard', action:'Вернуться к обзору'});
    $('#insights').innerHTML = insights.slice(0,4).map(item=>`<div class="insight ${esc(item.kind)}"><b>${esc(item.title)}</b><p>${esc(item.text)}</p><button type="button" class="text-btn insight-action" data-go="${esc(item.go)}">${esc(item.action)} →</button></div>`).join('');
  }

  function setFormValues(form, values) {
    if (!form || !values) return;
    Object.entries(values).forEach(([key, value]) => {
      const field = form.elements.namedItem(key);
      if (field) field.value = value ?? '';
    });
  }

  function formToObject(form) {
    return Object.fromEntries(new FormData(form).entries());
  }

  function renderIdentity() {
    const profile = data.profile || seed.profile;
    const fullName = String(profile.fullName || 'Пользователь').trim();
    const role = String(profile.role || 'Владелец').trim();
    $('#sidebarProfileName').textContent = fullName.split(/\s+/)[0] || 'Пользователь';
    $('#sidebarProfileRole').textContent = role || 'Владелец';
    $('#sidebarAvatar').textContent = initials(fullName) || 'BP';
  }

  function normalizeBankText(value) { return String(value || '').toLowerCase().replace(/[«»"'().,]/g,' ').replace(/[-–—]/g,' ').replace(/\s+/g,' ').trim(); }
  function bankByName(value) {
    const q = normalizeBankText(value); if (q.length < 4) return null;
    return BELARUS_BANKS.find(bank => {
      const variants = [bank.name, ...(bank.aliases || [])].map(normalizeBankText);
      return variants.some(v => q === v || (q.length >= 6 && (v.includes(q) || q.includes(v))));
    }) || null;
  }
  function bankByIban(value) {
    const compact = String(value || '').toUpperCase().replace(/[^A-Z0-9]/g,'');
    const match = compact.match(/BY\d{2}([A-Z0-9]{4})/);
    return match ? BELARUS_BANKS.find(bank => bank.bic.startsWith(match[1])) || null : null;
  }
  function applyBankAutofill(source) {
    const root = source?.form || source?.closest?.('form'); if (!root) return false;
    let bank = null;
    if (source.name === 'bankName') bank = bankByName(source.value);
    if (['iban','bankAccounts'].includes(source.name)) bank = bankByIban(source.value);
    if (!bank) return false;
    const nameField = root.elements.namedItem('bankName');
    const bicField = root.elements.namedItem('bic');
    const codeField = root.elements.namedItem('bankCode');
    const swiftField = root.elements.namedItem('swift');
    if (nameField && source.name !== 'bankName') nameField.value = bank.name;
    if (bicField) bicField.value = bank.bic;
    if (codeField) codeField.value = bank.bic;
    if (swiftField && (!swiftField.value || swiftField.value.toUpperCase().startsWith(bank.bic.slice(0,4)))) swiftField.value = bank.bic;
    return true;
  }
  function initBelarusBankDatalist() {
    const list = $('#belarusBankList'); if (!list) return;
    list.innerHTML = BELARUS_BANKS.map(bank => `<option value="${esc(bank.name)}">${esc(bank.bic)}</option>`).join('');
  }

  function renderSettings() {
    setFormValues($('#businessForm'), data.business || seed.business);
    setFormValues($('#profileForm'), data.profile || seed.profile);
    setFormValues($('#requisitesForm'), data.profile || seed.profile);
  }

  function renderProfile() {
    const stats = [
      ['Заказы', data.orders.length, '▦'],
      ['Клиенты', data.clients.length, '◎'],
      ['Сделки', (data.deals || []).length, '↗'],
      ['Счета', data.invoices.length, '▤'],
      ['Операции', data.transactions.length, '₽'],
      ['Плановые платежи', (data.plannedPayments || []).length, '≈'],
      ['Услуги', data.services.length, '◇'],
      ['Блокноты', (data.notebooks || []).length, '▧'],
      ['Заметки', (data.notes || []).length, '✎'],
      ['События', (data.events || []).length, '□']
    ];
    if ($('#backupSummary')) $('#backupSummary').innerHTML = stats.map(([label, value, icon]) => `<div class="backup-summary-item"><span>${esc(icon)}</span><div><small>${esc(label)}</small><strong>${number.format(value)}</strong></div></div>`).join('');
    if ($('#backupSize')) {
      const bytes = new Blob([JSON.stringify(buildBackupPayload())]).size;
      $('#backupSize').textContent = formatBytes(bytes);
    }
    if ($('#backupImportStatus') && uiState.lastImportAt) $('#backupImportStatus').textContent = `Последнее восстановление: ${new Date(uiState.lastImportAt).toLocaleString('ru-RU')}`;
    const issues = collectDataHealthIssues();
    const health = $('#dataHealthStatus');
    const list = $('#dataHealthList');
    const repair = $('#repairDataBtn');
    if (health) {
      health.textContent = issues.length ? `${issues.length} проблем требуют внимания` : 'Все данные согласованы';
      health.className = `pill ${issues.some(x=>x.kind==='danger') ? 'danger' : issues.length ? 'warning' : 'success'}`;
    }
    if (list) list.innerHTML = issues.length ? issues.map(x=>`<div class="data-health-row ${esc(x.kind)}"><span>${x.kind==='danger'?'!':'•'}</span><strong>${esc(x.text)}</strong></div>`).join('') : '<div class="data-health-empty"><span>✓</span><div><strong>Проверка пройдена</strong><p>Связи сделок, счетов, операций, блокнотов и служебных данных выглядят корректно.</p></div></div>';
    if (repair) repair.hidden = !issues.some(x => x.fixable);
  }

  function numValue(id) {
    const value = Number($(id)?.value);
    return Number.isFinite(value) ? value : 0;
  }

  function formatPercent(value) {
    return Number.isFinite(value) ? `${value.toLocaleString('ru-RU', { maximumFractionDigits: 1 })}%` : '—';
  }

  function renderCalculators() {
    if (!$('#calculationsPanel')) return;
    const cost = numValue('#marginCost');
    const price = numValue('#marginPrice');
    const profit = price - cost;
    $('#marginProfit').textContent = formatMoney(profit);
    $('#marginPercent').textContent = price > 0 ? formatPercent(profit / price * 100) : '—';
    $('#markupPercent').textContent = cost > 0 ? formatPercent(profit / cost * 100) : '—';

    const fixed = numValue('#beFixed');
    const unitPrice = numValue('#bePrice');
    const variable = numValue('#beVariable');
    const contribution = unitPrice - variable;
    const units = contribution > 0 ? Math.ceil(fixed / contribution) : 0;
    $('#beUnits').textContent = contribution > 0 ? `${number.format(units)} шт.` : '—';
    $('#beRevenue').textContent = contribution > 0 ? formatMoney(units * unitPrice) : '—';
    $('#beContribution').textContent = contribution > 0 ? formatMoney(contribution) : '—';

    const desiredIncome = numValue('#rateIncome');
    const monthlyCosts = numValue('#rateCosts');
    const reserveRate = Math.min(0.99, Math.max(0, numValue('#rateTax') / 100));
    const hours = Math.max(0, numValue('#rateHours'));
    const requiredRevenue = (desiredIncome + monthlyCosts) / Math.max(0.01, 1 - reserveRate);
    const hourly = hours > 0 ? requiredRevenue / hours : 0;
    $('#rateRevenue').textContent = formatMoney(requiredRevenue);
    $('#rateHourly').textContent = hours > 0 ? formatMoney(hourly) : '—';
    $('#rateSafe').textContent = hours > 0 ? formatMoney(hourly * 1.2) : '—';

    const discountPrice = numValue('#discountPrice');
    const discountRate = Math.min(100, Math.max(0, numValue('#discountRate'))) / 100;
    const discountCost = numValue('#discountCost');
    const discountAmount = discountPrice * discountRate;
    const discountFinal = discountPrice - discountAmount;
    $('#discountAmount').textContent = formatMoney(discountAmount);
    $('#discountFinal').textContent = formatMoney(discountFinal);
    $('#discountProfit').textContent = formatMoney(discountFinal - discountCost);

    const roiSpend = numValue('#roiSpend');
    const roiRevenue = numValue('#roiRevenue');
    const roiCost = numValue('#roiCost');
    const roiGross = roiRevenue - roiCost;
    const roiNet = roiGross - roiSpend;
    $('#roiGross').textContent = formatMoney(roiGross);
    $('#roiNet').textContent = formatMoney(roiNet);
    $('#roiPercent').textContent = roiSpend > 0 ? formatPercent(roiNet / roiSpend * 100) : '—';

    const marketing = numValue('#ltvMarketing');
    const newClients = numValue('#ltvNewClients');
    const avgCheck = numValue('#ltvAverage');
    const purchases = numValue('#ltvPurchases');
    const cac = newClients > 0 ? marketing / newClients : 0;
    const ltv = avgCheck * purchases;
    $('#ltvCac').textContent = newClients > 0 ? formatMoney(cac) : '—';
    $('#ltvValue').textContent = formatMoney(ltv);
    $('#ltvRatio').textContent = cac > 0 ? `${(ltv / cac).toLocaleString('ru-RU', { maximumFractionDigits: 1 })}×` : '—';

    const planRevenue = numValue('#planRevenue');
    const planAverage = numValue('#planAverage');
    const planDays = numValue('#planDays');
    const planOrders = planAverage > 0 ? Math.ceil(planRevenue / planAverage) : 0;
    $('#planOrders').textContent = planAverage > 0 ? `${number.format(planOrders)} шт.` : '—';
    $('#planDailyRevenue').textContent = planDays > 0 ? formatMoney(planRevenue / planDays) : '—';
    $('#planWeeklyOrders').textContent = planAverage > 0 ? `${(planOrders / 4.33).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} шт.` : '—';

    const runwayCash = numValue('#runwayCash');
    const runwayCosts = numValue('#runwayCosts');
    const runwayTarget = numValue('#runwayTarget');
    const runwayMonths = runwayCosts > 0 ? runwayCash / runwayCosts : 0;
    const runwayNeeded = runwayCosts * runwayTarget;
    const runwayGap = runwayCash - runwayNeeded;
    $('#runwayMonths').textContent = runwayCosts > 0 ? `${runwayMonths.toLocaleString('ru-RU', { maximumFractionDigits: 1 })} мес.` : '—';
    $('#runwayNeeded').textContent = formatMoney(runwayNeeded);
    $('#runwayGap').textContent = `${runwayGap >= 0 ? '+' : '−'} ${formatMoney(Math.abs(runwayGap))}`;

    const acqAmount = numValue('#acqAmount');
    const acqRate = Math.max(0, numValue('#acqRate')) / 100;
    const acqFixed = numValue('#acqFixed');
    const acqFee = acqAmount * acqRate + acqFixed;
    $('#acqFee').textContent = formatMoney(acqFee);
    $('#acqNet').textContent = formatMoney(Math.max(0, acqAmount - acqFee));
    $('#acqEffective').textContent = acqAmount > 0 ? formatPercent(acqFee / acqAmount * 100) : '—';

    const rkoTurnover = numValue('#rkoTurnover');
    const rkoMonthlyFee = numValue('#rkoMonthlyFee');
    const rkoPayments = numValue('#rkoPayments');
    const rkoPaymentFee = numValue('#rkoPaymentFee');
    const rkoOtherFees = numValue('#rkoOtherFees');
    const rkoMonthly = rkoMonthlyFee + rkoPayments * rkoPaymentFee + rkoOtherFees;
    $('#rkoMonthly').textContent = formatMoney(rkoMonthly);
    $('#rkoYearly').textContent = formatMoney(rkoMonthly * 12);
    $('#rkoShare').textContent = rkoTurnover > 0 ? formatPercent(rkoMonthly / rkoTurnover * 100) : '—';

    const setBar = (id, value, max, negative=false) => {
      const el=$(id); if(!el)return;
      const width=max>0?Math.min(100,Math.abs(Number(value||0))/max*100):0;
      el.style.width=`${width}%`;
      el.closest('.calc-bar-row')?.classList.toggle('negative',!!negative);
    };
    const marginMax=Math.max(1,price,cost,Math.abs(profit));
    setBar('#calcBarMarginPrice',price,marginMax);setBar('#calcBarMarginCost',cost,marginMax);setBar('#calcBarMarginProfit',profit,marginMax,profit<0);
    $('#calcBarMarginPriceValue').textContent=formatMoney(price);$('#calcBarMarginCostValue').textContent=formatMoney(cost);$('#calcBarMarginProfitValue').textContent=formatMoney(profit);
    $('#calcMarginChartCaption').textContent=price>0?`маржа ${formatPercent(profit/price*100)}`:'—';
    const discountMax=Math.max(1,discountPrice,discountFinal,discountCost);
    setBar('#calcBarDiscountPrice',discountPrice,discountMax);setBar('#calcBarDiscountFinal',discountFinal,discountMax);setBar('#calcBarDiscountCost',discountCost,discountMax);
    $('#calcBarDiscountPriceValue').textContent=formatMoney(discountPrice);$('#calcBarDiscountFinalValue').textContent=formatMoney(discountFinal);$('#calcBarDiscountCostValue').textContent=formatMoney(discountCost);
    $('#calcDiscountChartCaption').textContent=`скидка ${formatPercent(discountRate*100)}`;
    const beRevenueValue=contribution>0?units*unitPrice:0, beMax=Math.max(1,fixed,beRevenueValue);
    setBar('#calcBarBeFixed',fixed,beMax);setBar('#calcBarBeRevenue',beRevenueValue,beMax);
    $('#calcBarBeFixedValue').textContent=formatMoney(fixed);$('#calcBarBeRevenueValue').textContent=contribution>0?formatMoney(beRevenueValue):'—';
    $('#calcBreakEvenChartCaption').textContent=contribution>0?`${number.format(units)} продаж`:'нет маржи';
  }

  function resetCalculators() {
    calculatorState = Object.fromEntries(Object.keys(CALCULATOR_DEFAULTS).map(key => [key, null]));
    Object.keys(CALCULATOR_DEFAULTS).forEach(id => { const el = $(`#${id}`); if (el) el.value = ''; });
    safeStorageSet(CALC_KEY, JSON.stringify(calculatorState), 'подсчёты');
    renderCalculators();
  }

  function snapshotCurrentWorkspace() {
    const snapshot = {
      savedAt: new Date().toISOString(),
      data,
      prefs,
      calculators: collectCalculatorState(),
      ui: uiState
    };
    if (!safeStorageSet(LIVE_SNAPSHOT_KEY, JSON.stringify(snapshot), 'рабочую область перед демо')) {
      throw new Error('Не удалось сохранить рабочую область перед запуском демо');
    }
  }

  function persistWorkspaceState() {
    safeStorageSet(STORAGE_KEY, JSON.stringify(data), demoMode ? 'учебные данные' : 'бизнес-данные');
    safeStorageSet(PREFS_KEY, JSON.stringify(prefs), 'настройки');
    safeStorageSet(CALC_KEY, JSON.stringify(calculatorState), 'подсчёты');
    safeStorageSet(UI_KEY, JSON.stringify(uiState), 'состояние интерфейса');
    saveDemoMode();
  }

  function startTrainingDemo() {
    if (demoMode) return;
    if (!confirm('Запустить учебный демо-режим? Текущие данные будут временно сохранены отдельно в этом браузере. После выхода из демо BizPilot восстановит их обратно.')) return;
    try {
      snapshotCurrentWorkspace();
      demoMode = true;
      data = normalizeData(cloneSeed(), true);
      calculatorState = { ...CALCULATOR_DEFAULTS };
      uiState = { ...uiState, focusDone: {}, chartPeriod: 6, cashflowHorizon: 30, selectedNoteId: '', noteTabs: [] };
      persistWorkspaceState();
      safeSessionSet('bizpilot-demo-started-v2', '1');
      location.hash = '#learning';
      location.reload();
    } catch (error) {
      console.error(error);
      toast('Не удалось безопасно запустить демо. Сделайте ZIP-копию и попробуйте ещё раз.');
    }
  }

  function resetTrainingDemo() {
    if (!demoMode) return;
    if (!confirm('Вернуть учебные данные демо к исходному состоянию? Ваши сохранённые рабочие данные это не затронет.')) return;
    data = normalizeData(cloneSeed(), true);
    calculatorState = { ...CALCULATOR_DEFAULTS };
    uiState = { ...uiState, focusDone: {}, chartPeriod: 6, cashflowHorizon: 30, selectedNoteId: '', noteTabs: [] };
    persistWorkspaceState();
    restoreCalculatorInputs();
    renderAll();
    toast('Учебные примеры восстановлены');
  }

  function exitTrainingDemo() {
    if (!demoMode) return;
    const hasSnapshot = hasLiveWorkspaceSnapshot();
    const message = hasSnapshot
      ? 'Выйти из демо и восстановить рабочие данные, которые были сохранены перед запуском?'
      : 'Выйти из демо? Сохранённая рабочая область не найдена, поэтому BizPilot откроет чистое рабочее пространство.';
    if (!confirm(message)) return;
    try {
      let snapshot = null;
      if (hasSnapshot) snapshot = JSON.parse(safeStorageGet(LIVE_SNAPSHOT_KEY));
      demoMode = false;
      if (snapshot?.data) {
        data = normalizeData(snapshot.data, false);
        prefs = {
          theme: ['light','dark','auto'].includes(snapshot.prefs?.theme) ? snapshot.prefs.theme : 'light',
          compact: !!snapshot.prefs?.compact,
          autoLocation: snapshot.prefs?.autoLocation || null
        };
        calculatorState = { ...CALCULATOR_DEFAULTS, ...(snapshot.calculators || {}) };
        uiState = { ...loadUiState(), ...(snapshot.ui || {}) };
      } else {
        data = makeCleanState();
        calculatorState = { ...CALCULATOR_DEFAULTS };
        uiState = { focusDone: {}, chartPeriod: 6, calendarMonth: '', cashflowHorizon: 30, notesFilter:'all', notesNotebook:'all', notesTag:'', notesSort:'updated', selectedNoteId:'', notePreview:false, noteHistoryOpen:false, noteFocus:false, noteTabs:[], lastImportAt: '' };
      }
      persistWorkspaceState();
      safeStorageRemove(LIVE_SNAPSHOT_KEY);
      safeSessionSet('bizpilot-demo-ended-v2', '1');
      location.hash = '#learning';
      location.reload();
    } catch (error) {
      console.error(error);
      toast('Не удалось восстановить рабочую область. Не очищайте данные браузера и попробуйте ещё раз.');
    }
  }

  function nowRuDate() { return toRuDate(todayIso()); }
  function addDaysIso(days) {
    const d = new Date(); d.setHours(12,0,0,0); d.setDate(d.getDate()+Number(days||0));
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function ruDateParts(value) {
    const m=String(value||'').match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
    return m ? {d:Number(m[1]),m:Number(m[2]),y:Number(m[3])} : null;
  }
  function isCurrentMonthRu(value) {
    const p=ruDateParts(value); if(!p) return false; const n=new Date();
    return p.y===n.getFullYear() && p.m===n.getMonth()+1;
  }
  function touchClient(name) {
    const c=data.clients.find(x=>x.name===name); if(!c)return;
    c.activity=`Сегодня, ${new Date().toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})}`;
  }
  function adjustClientOrders(name, delta) {
    const c=data.clients.find(x=>x.name===name); if(!c)return; c.orders=Math.max(0,Number(c.orders||0)+Number(delta||0)); touchClient(name);
  }
  function adjustClientRevenue(name, delta) {
    const c=data.clients.find(x=>x.name===name); if(!c)return; c.revenue=Math.max(0,Number(c.revenue||0)+Number(delta||0)); touchClient(name);
  }
  function nextEntityNumber(items, idKey='id') {
    const nums=items.map(item=>Number(String(item?.[idKey]||'').replace(/\D/g,''))||0);
    return (nums.length ? Math.max(...nums) : 0)+1;
  }
  function archiveNotificationsForSource(sourceType, sourceId, resetLedger=false) {
    const now=new Date().toISOString();
    (data.notifications||[]).forEach(n=>{ if(n.sourceType===sourceType && n.sourceId===sourceId){ n.archivedAt=n.archivedAt||now; n.popupDismissedAt=n.popupDismissedAt||now; } });
    if(resetLedger) data.notificationLedger=(data.notificationLedger||[]).filter(fp=>!String(fp).includes(`|${sourceId}|`));
  }
  function syncInvoiceStatuses() {
    let changed=false; const now=Date.now();
    data.invoices.forEach(inv=>{
      if(inv.status==='paid') return;
      const due=ruDateToTimestamp(inv.due,true); if(!due)return;
      const next=due<now?'overdue':'waiting';
      if(inv.status!==next){inv.status=next; changed=true;}
    });
    return changed;
  }
  function monthlyTransactionSeries(period=12) {
    const months=[]; const now=new Date();
    for(let i=period-1;i>=0;i--){
      const d=new Date(now.getFullYear(),now.getMonth()-i,1);
      months.push({y:d.getFullYear(),m:d.getMonth()+1,label:d.toLocaleString('ru-RU',{month:'short'}).replace('.',''),income:0,expense:0});
    }
    data.transactions.forEach(t=>{ const p=ruDateParts(t.date); if(!p)return; const slot=months.find(x=>x.y===p.y&&x.m===p.m); if(slot) slot[t.type==='income'?'income':'expense']+=Number(t.amount||0); });
    return {labels:months.map(x=>x.label), revenue:months.map(x=>x.income), expense:months.map(x=>x.expense)};
  }

  function todayIso() {
    const d = new Date();
    const y = d.getFullYear(), m = String(d.getMonth()+1).padStart(2,'0'), day = String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
  }
  function eventDateTime(event) {
    const time = event.time || '00:00';
    const date = new Date(`${event.date}T${time}:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  function formatEventDateTime(event) {
    const dt = eventDateTime(event);
    if (!dt) return `${event.date || ''} ${event.time || ''}`.trim();
    return dt.toLocaleString('ru-RU', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' });
  }
  function getUpcomingEvents(minutes = 72 * 60) {
    const now = Date.now();
    const max = now + minutes * 60 * 1000;
    return (data.events || []).filter(e=>!e.completedAt).map(e=>({e,dt:eventDateTime(e)})).filter(x=>x.dt && x.dt.getTime() >= now && x.dt.getTime() <= max).sort((a,b)=>a.dt-b.dt).map(x=>x.e);
  }
  function eventTypeMeta(type) {
    return ({meeting:['Встреча','info'],payment:['Оплата','warning'],deadline:['Дедлайн','danger'],task:['Задача','success'],other:['Событие','neutral']})[type] || ['Событие','neutral'];
  }
  function reminderLabel(minutes) {
    const n = Number(minutes || 0);
    if (n === 0) return 'В момент события';
    if (n < 60) return `За ${n} мин.`;
    if (n < 1440) return `За ${n/60} ч.`;
    return `За ${n/1440} дн.`;
  }
  function eventTimingMeta(event) {
    const dt=eventDateTime(event); if(!dt) return {label:'Дата не указана', cls:'neutral', past:false};
    const diff=dt.getTime()-Date.now();
    if(diff < 0) return {label:'Событие прошло', cls:'danger', past:true};
    if(diff <= 60*60*1000) return {label:'Скоро', cls:'danger', past:false};
    if(diff <= 24*60*60*1000) return {label:'Сегодня / в течение суток', cls:'warning', past:false};
    return {label:'Запланировано', cls:'info', past:false};
  }
  function currentCalendarDate() {
    const current = /^\d{4}-\d{2}$/.test(uiState.calendarMonth || '') ? uiState.calendarMonth : todayIso().slice(0,7);
    const [y,m]=current.split('-').map(Number);
    return new Date(y,m-1,1);
  }
  function setCalendarMonth(delta) {
    const d=currentCalendarDate(); d.setMonth(d.getMonth()+delta);
    uiState.calendarMonth=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    saveUiState(); renderCalendar();
  }
  function sortEventsForSidebar(events) {
    const now=Date.now();
    return events.map(e=>({e,dt:eventDateTime(e)?.getTime() ?? 0})).sort((a,b)=>{
      if(!!a.e.completedAt!==!!b.e.completedAt) return a.e.completedAt?1:-1;
      const af=a.dt>=now, bf=b.dt>=now;
      if(af!==bf) return af?-1:1;
      return af ? a.dt-b.dt : b.dt-a.dt;
    }).map(x=>x.e);
  }
  function renderCalendar() {
    if (!$('#calendarGrid')) return;
    const monthDate=currentCalendarDate();
    const y=monthDate.getFullYear(), m=monthDate.getMonth();
    $('#calendarMonthTitle').textContent=monthDate.toLocaleString('ru-RU',{month:'long',year:'numeric'}).replace(/^./,c=>c.toUpperCase());
    const firstWeekday=(new Date(y,m,1).getDay()+6)%7;
    const daysInMonth=new Date(y,m+1,0).getDate();
    const cells=[];
    for(let i=0;i<firstWeekday;i++) cells.push('<div class="calendar-day outside"></div>');
    for(let day=1;day<=daysInMonth;day++){
      const iso=`${y}-${String(m+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
      const events=(data.events||[]).filter(e=>e.date===iso).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
      const isToday=iso===todayIso();
      cells.push(`<div class="calendar-day ${isToday?'today':''}" data-calendar-date="${iso}" title="Нажмите на свободное место, чтобы добавить событие"><div class="calendar-day-number">${day}</div><div class="calendar-day-events">${events.slice(0,3).map(e=>{const meta=eventTypeMeta(e.type);const timing=eventTimingMeta(e);return `<button class="calendar-event-chip ${meta[1]} ${timing.past?'past':''} ${e.completedAt?'completed':''}" data-edit-event="${esc(e.uid)}" title="${esc(e.title)}${e.completedAt?' · выполнено':''}"><strong>${esc(e.time||'')}</strong> ${esc(e.title)}</button>`}).join('')}${events.length>3?`<span class="calendar-more">+${events.length-3} ещё</span>`:''}</div></div>`);
    }
    const total=firstWeekday+daysInMonth; for(let i=total;i%7!==0;i++) cells.push('<div class="calendar-day outside"></div>');
    $('#calendarGrid').innerHTML=cells.join('');
    const allEvents=sortEventsForSidebar(data.events||[]);
    $('#upcomingCount').textContent=String(allEvents.length);
    $('#upcomingEvents').innerHTML=allEvents.length?allEvents.map(e=>{const meta=eventTypeMeta(e.type);const timing=eventTimingMeta(e);const done=!!e.completedAt;return `<div class="upcoming-event ${timing.past?'event-past':''} ${done?'event-completed':''}"><div class="event-date-box"><strong>${esc(new Date(`${e.date}T00:00:00`).toLocaleDateString('ru-RU',{day:'2-digit'}))}</strong><span>${esc(new Date(`${e.date}T00:00:00`).toLocaleDateString('ru-RU',{month:'short'}))}</span></div><div class="upcoming-copy"><div><span class="pill ${meta[1]}">${meta[0]}</span>${done?'<span class="pill success">Выполнено</span>':`<span class="pill ${timing.cls}">${timing.label}</span>`}<strong>${esc(e.title)}</strong></div><small>${esc(formatEventDateTime(e))} · ${done?'событие обработано':`напомнить ${esc(reminderLabel(e.reminder).toLowerCase())}`}</small>${e.note?`<p>${esc(e.note)}</p>`:''}</div><div class="row-actions"><button class="row-action success-action" data-toggle-event-complete="${esc(e.uid)}" title="${done?'Вернуть в работу':'Отметить выполненным'}">${done?'↺':'✓'}</button><button class="row-action" data-edit-event="${esc(e.uid)}" title="Редактировать">✎</button><button class="row-action danger-action" data-delete-event="${esc(e.uid)}" title="Удалить">×</button></div></div>`}).join(''):'<div class="calendar-empty"><strong>Событий пока нет</strong><span>Добавьте встречу, оплату, дедлайн или задачу.</span><button class="btn btn-primary btn-small" data-open-modal="event">+ Добавить событие</button></div>';
    renderNotificationPermissionStatus();
    updateNotificationIndicator();
  }
  function renderNotificationPermissionStatus() {
    if (!$('#calendarNotificationStatus')) return;
    if (!('Notification' in window)) {
      $('#calendarNotificationStatus').innerHTML='<strong>Внутренние напоминания включены</strong><span>Системные уведомления браузера недоступны, но центр уведомлений и большие напоминания BizPilot продолжают работать.</span>';
      if ($('#enableCalendarNotifications')) $('#enableCalendarNotifications').hidden=true;
      return;
    }
    const p=Notification.permission;
    $('#enableCalendarNotifications').hidden=p==='granted';
    $('#calendarNotificationStatus').innerHTML=p==='granted'?'<strong>Системные уведомления включены</strong><span>Плюс все напоминания сохраняются внутри BizPilot, пока вы сами их не обработаете.</span>':p==='denied'?'<strong>Системные уведомления заблокированы браузером</strong><span>Внутренние уведомления BizPilot всё равно сохраняются и не пропадают.</span>':'<strong>Включите системные уведомления</strong><span>Это дополнительный канал. Даже без него важные уведомления сохраняются в центре BizPilot.</span>';
  }
  async function requestCalendarNotifications() {
    if (!('Notification' in window)) { toast('Браузер не поддерживает системные уведомления'); return; }
    try { const result=await Notification.requestPermission(); renderNotificationPermissionStatus(); toast(result==='granted'?'Системные уведомления включены':'Разрешение на уведомления не выдано'); }
    catch { toast('Не удалось запросить разрешение'); }
  }

  function ruDateToTimestamp(value, endOfDay=false) {
    const m=String(value||'').match(/^(\d{2})\.(\d{2})\.(\d{4})$/); if(!m)return null;
    const d=new Date(Number(m[3]),Number(m[2])-1,Number(m[1]),endOfDay?23:0,endOfDay?59:0,endOfDay?59:0);
    return Number.isNaN(d.getTime())?null:d.getTime();
  }
  function notificationFingerprint(parts) { return parts.map(x=>String(x??'')).join('|'); }
  function hasNotificationFingerprint(fp) { return (data.notificationLedger||[]).includes(fp); }
  function createPersistentNotification({fingerprint, sourceType, sourceId, kind='info', title, message, target='notifications', eventDate=''}) {
    data.notifications=data.notifications||[]; data.notificationLedger=data.notificationLedger||[];
    if(hasNotificationFingerprint(fingerprint)) return false;
    const item={uid:makeId('notification'),fingerprint,sourceType,sourceId,kind,title,message,target,eventDate,createdAt:new Date().toISOString(),readAt:null,archivedAt:null,popupDismissedAt:null};
    data.notifications.unshift(item); data.notificationLedger.push(fingerprint); return true;
  }
  function generateImportantNotifications() {
    let changed=false; const now=Date.now();
    (data.events||[]).forEach(event=>{
      if(event.completedAt) return;
      const dt=eventDateTime(event); if(!dt)return;
      const reminderMs=Math.max(0,Number(event.reminder||0))*60*1000;
      const trigger=dt.getTime()-reminderMs;
      if(now < trigger) return;
      const fp=notificationFingerprint(['event',event.uid,event.date,event.time,event.reminder]);
      const past=dt.getTime()<now; const meta=eventTypeMeta(event.type);
      changed=createPersistentNotification({fingerprint:fp,sourceType:'event',sourceId:event.uid,kind:past?'danger':'warning',title:`${past?'Событие наступило':'Напоминание'}: ${event.title}`,message:`${formatEventDateTime(event)} · ${meta[0]} · ${reminderLabel(event.reminder)}${event.note?` · ${event.note}`:''}`,target:'calendar',eventDate:event.date})||changed;
    });
    (data.notes||[]).forEach(note=>{
      if(note.trashedAt || note.archivedAt || !note.reminderAt || note.reminderDoneAt) return;
      const trigger=noteReminderTimestamp(note); if(!trigger || now<trigger) return;
      const fp=notificationFingerprint(['note-reminder',note.uid,note.reminderAt]);
      const linked=noteLinkedEntity(note); const overdueBy=now-trigger;
      changed=createPersistentNotification({fingerprint:fp,sourceType:'note',sourceId:note.uid,kind:overdueBy>24*60*60*1000?'danger':'warning',title:`Напоминание по заметке: ${note.title||'Без названия'}`,message:`${noteReminderMeta(note).label}${linked?` · ${linked.label}`:''}${note.content?` · ${noteExcerpt(note.content).slice(0,90)}`:''}`,target:'notes',eventDate:note.reminderAt})||changed;
    });
    (data.invoices||[]).forEach(inv=>{
      if(inv.status==='paid') return;
      const due=ruDateToTimestamp(inv.due,true); if(!due)return;
      const dueIso=toIsoDate(inv.due); const dayDiff=daysBetweenIso(todayIso(),dueIso);
      const daysToDue=Math.max(0,dayDiff); const daysOverdue=Math.max(0,-dayDiff);
      let stage='',kind='warning',title='',message='';
      if(dayDiff<0){
        kind='danger';
        if(daysOverdue>=30) stage='overdue-30'; else if(daysOverdue>=14) stage='overdue-14'; else if(daysOverdue>=7) stage='overdue-7'; else stage='overdue-1';
        title=`Просрочен счёт ${inv.id}`;
        message=`${inv.client} · ${formatMoney(inv.amount)} · просрочка ${Math.max(1,daysOverdue)} дн. · срок был ${inv.due}`;
      } else if(dayDiff===0){
        stage='due-today'; title=`Сегодня срок оплаты ${inv.id}`; message=`${inv.client} · ${formatMoney(inv.amount)} · срок оплаты сегодня`;
      } else if(daysToDue<=3){
        stage='due-3'; title=`Скоро срок оплаты ${inv.id}`; message=`${inv.client} · ${formatMoney(inv.amount)} · до срока ${daysToDue} дн. · ${inv.due}`;
      }
      if(stage){
        const fp=notificationFingerprint(['invoice',stage,inv.id,inv.due]);
        changed=createPersistentNotification({fingerprint:fp,sourceType:'invoice',sourceId:inv.id,kind,title,message,target:'invoices',eventDate:inv.due})||changed;
      }
    });
    (data.orders||[]).forEach(order=>{
      if(['paid','done'].includes(order.status)) return;
      const due=ruDateToTimestamp(order.due,true); if(!due||due>=now)return;
      const fp=notificationFingerprint(['order-overdue',order.id,order.due]);
      changed=createPersistentNotification({fingerprint:fp,sourceType:'order',sourceId:order.id,kind:'danger',title:`Просрочен заказ ${order.id}`,message:`${order.client} · ${order.service} · срок ${order.due}`,target:'orders',eventDate:order.due})||changed;
    });

    activeDeals().forEach(deal=>{
      if(!deal.nextAction || !deal.nextActionDate) return;
      const diff=daysBetweenIso(todayIso(),deal.nextActionDate); if(diff>0)return;
      const fp=notificationFingerprint(['deal-followup',deal.uid,deal.stage,deal.nextActionDate]);
      changed=createPersistentNotification({fingerprint:fp,sourceType:'deal',sourceId:deal.uid,kind:diff<0?'danger':'warning',title:`${diff<0?'Просрочен':'Сегодня'} следующий шаг: ${deal.company}`,message:`${deal.nextAction} · ${toRuDate(deal.nextActionDate)} · ${formatMoney(deal.value)} · ${dealStageMeta[deal.stage].label}`,target:'sales',eventDate:toRuDate(deal.nextActionDate)})||changed;
    });
    (data.plannedPayments||[]).forEach(item=>{
      if(item.completedAt || !item.date) return;
      const dayDiff=daysBetweenIso(todayIso(),item.date); if(dayDiff>3)return;
      const overdue=dayDiff<0; const today=dayDiff===0;
      const fp=notificationFingerprint(['planned-payment',item.uid,item.date,item.amount,item.type]);
      const prefix=overdue?'Просрочен':today?'Сегодня':'Скоро';
      changed=createPersistentNotification({fingerprint:fp,sourceType:'plannedPayment',sourceId:item.uid,kind:overdue?'danger':'warning',title:`${prefix} плановый ${item.type==='income'?'доход':'расход'}: ${item.title}`,message:`${formatMoney(item.amount)} · ${toRuDate(item.date)} · ${item.category||'Без категории'}`,target:'cashflow',eventDate:toRuDate(item.date)})||changed;
    });
    if(changed) saveData();
    return changed;
  }
  function activeNotifications() { return (data.notifications||[]).filter(n=>!n.archivedAt); }
  function unreadNotifications() { return activeNotifications().filter(n=>!n.readAt); }
  function calendarUnreadNotifications() { return unreadNotifications().filter(n=>['event','note'].includes(n.sourceType)); }
  function updateNotificationIndicator() {
    const unread=unreadNotifications();
    const calendar=calendarUnreadNotifications();
    const calBadge=$('#navCalendarBadge'); if(calBadge){calBadge.textContent=String(calendar.length);calBadge.hidden=calendar.length===0;}
    const navBadge=$('#navNotificationsBadge'); if(navBadge){navBadge.textContent=String(unread.length);navBadge.hidden=unread.length===0;}
    const top=$('#topNotificationBadge'); if(top){top.textContent=unread.length>99?'99+':String(unread.length);top.hidden=unread.length===0;}
    const btn=$('#notifyBtn'); if(btn) btn.classList.toggle('has-unread',unread.length>0);
  }
  function notificationSourceLabel(n) { return n.sourceType==='event'?'Календарь':n.sourceType==='note'?'Блокноты':n.sourceType==='invoice'?'Счета':n.sourceType==='order'?'Заказы':n.sourceType==='deal'?'Продажи':n.sourceType==='plannedPayment'?'Денежный поток':n.sourceType==='cashflow'?'Денежный поток':'BizPilot'; }
  function formatNotificationTime(iso) { const d=new Date(iso); return Number.isNaN(d.getTime())?'':d.toLocaleString('ru-RU',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}); }
  function renderNotifications() {
    if(!$('#notificationList')) return;
    generateImportantNotifications();
    const all=[...(data.notifications||[])].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
    const unread=all.filter(n=>!n.archivedAt&&!n.readAt);
    const calendar=all.filter(n=>!n.archivedAt&&n.sourceType==='event');
    const business=all.filter(n=>!n.archivedAt&&['invoice','order','deal','plannedPayment'].includes(n.sourceType));
    const notes=all.filter(n=>!n.archivedAt&&n.sourceType==='note');
    $('#notificationUnreadCount').textContent=String(unread.length);
    $('#notificationCalendarCount').textContent=String(calendar.length);
    $('#notificationBusinessCount').textContent=String(business.length);
    if($('#notificationNotesCount')) $('#notificationNotesCount').textContent=String(notes.length);
    let list=all;
    if(notificationFilter==='unread') list=all.filter(n=>!n.archivedAt&&!n.readAt);
    if(notificationFilter==='calendar') list=all.filter(n=>!n.archivedAt&&n.sourceType==='event');
    if(notificationFilter==='money') list=all.filter(n=>!n.archivedAt&&['invoice','plannedPayment','cashflow'].includes(n.sourceType));
    if(notificationFilter==='notes') list=all.filter(n=>!n.archivedAt&&n.sourceType==='note');
    if(notificationFilter==='archived') list=all.filter(n=>!!n.archivedAt);
    if(notificationFilter==='all') list=all.filter(n=>!n.archivedAt);
    $('#notificationListCount').textContent=`${list.length} уведомл.`;
    $$('#notificationFilters [data-notification-filter]').forEach(b=>b.classList.toggle('active',b.dataset.notificationFilter===notificationFilter));
    $('#notificationList').innerHTML=list.length?list.map(n=>`<article class="notification-item ${n.readAt?'is-read':'is-unread'} ${n.kind||'info'}"><div class="notification-item-icon">${n.sourceType==='event'?'□':n.sourceType==='note'?'✎':n.sourceType==='invoice'?'▤':n.sourceType==='deal'?'↗':n.sourceType==='plannedPayment'?'≈':'!'}</div><div class="notification-item-copy"><div class="notification-item-top"><span class="pill ${n.kind==='danger'?'danger':n.kind==='warning'?'warning':'info'}">${esc(notificationSourceLabel(n))}</span>${!n.readAt?'<span class="unread-marker">Новое</span>':''}</div><h3>${esc(n.title)}</h3><p>${esc(n.message)}</p><small>${esc(formatNotificationTime(n.createdAt))}</small></div><div class="notification-item-actions"><button class="btn btn-secondary btn-small" data-open-notification="${esc(n.uid)}">Открыть</button><button class="btn btn-secondary btn-small" data-toggle-notification-read="${esc(n.uid)}">${n.readAt?'Непрочитанное':'Прочитано'}</button><button class="btn btn-secondary btn-small" data-archive-notification="${esc(n.uid)}">Закрыть</button><button class="row-action danger-action" data-delete-notification="${esc(n.uid)}" title="Удалить уведомление">×</button></div></article>`).join(''):'<div class="notification-empty"><span class="summary-icon success">✓</span><strong>Здесь всё обработано</strong><p>Новые напоминания и важные события появятся здесь и будут храниться, пока вы сами их не обработаете.</p></div>';
    updateNotificationIndicator();
  }
  function openNotification(uid) {
    const n=(data.notifications||[]).find(x=>x.uid===uid); if(!n)return;
    if(!n.readAt) n.readAt=new Date().toISOString();
    n.popupDismissedAt=n.popupDismissedAt||new Date().toISOString();
    saveData(); renderNotifications(); renderPersistentReminders(); updateNotificationIndicator();
    switchView(n.target||'notifications');
    if(n.sourceType==='event') { const event=(data.events||[]).find(e=>e.uid===n.sourceId); if(event){uiState.calendarMonth=event.date.slice(0,7);saveUiState();renderCalendar();} }
    if(n.sourceType==='note') { uiState.notesFilter='all';uiState.notesNotebook='all';uiState.notesTag='';saveUiState();selectNote(n.sourceId); }
    if(n.sourceType==='deal') openModal('dealEdit',n.sourceId);
  }
  function setNotificationRead(uid, read) { const n=(data.notifications||[]).find(x=>x.uid===uid); if(!n)return; n.readAt=read?new Date().toISOString():null; if(read)n.popupDismissedAt=n.popupDismissedAt||new Date().toISOString(); saveData(); renderNotifications(); renderPersistentReminders(); updateNotificationIndicator(); }
  function archiveNotification(uid) { const n=(data.notifications||[]).find(x=>x.uid===uid); if(!n)return; n.archivedAt=new Date().toISOString(); n.popupDismissedAt=n.popupDismissedAt||new Date().toISOString(); saveData(); renderNotifications(); renderPersistentReminders(); updateNotificationIndicator(); }
  function deleteNotification(uid) { data.notifications=(data.notifications||[]).filter(x=>x.uid!==uid); saveData(); renderNotifications(); renderPersistentReminders(); updateNotificationIndicator(); }
  function dismissReminderPopup(uid) { const n=(data.notifications||[]).find(x=>x.uid===uid); if(!n)return; n.popupDismissedAt=new Date().toISOString(); saveData(); renderPersistentReminders(); }
  function renderPersistentReminders() {
    const stack=$('#reminderStack'); if(!stack)return;
    const reminders=unreadNotifications().filter(n=>['event','note'].includes(n.sourceType)&&!n.popupDismissedAt).sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));
    const shown=reminders.slice(0,3);
    const extra=Math.max(0,reminders.length-shown.length);
    stack.innerHTML=shown.map(n=>`<article class="persistent-reminder ${n.kind||'warning'}"><button class="reminder-close" data-dismiss-reminder="${esc(n.uid)}" aria-label="Скрыть это всплывающее напоминание">×</button><div class="reminder-kicker"><span class="reminder-pulse"></span> Важное напоминание</div><h3>${esc(n.title)}</h3><p>${esc(n.message)}</p><div class="reminder-actions"><button class="btn btn-primary btn-small" data-open-notification="${esc(n.uid)}">${n.sourceType==='note'?'Открыть заметку':'Открыть событие'}</button><button class="btn btn-secondary btn-small" data-read-reminder="${esc(n.uid)}">Прочитано</button></div></article>`).join('')+(extra?`<button class="reminder-more" data-go="notifications">Ещё ${extra} непрочитанных напоминаний →</button>`:'');
  }
  function checkEventNotifications() {
    const before=(data.notifications||[]).length;
    generateImportantNotifications();
    const after=(data.notifications||[]).length;
    if(after>before){
      const fresh=(data.notifications||[]).slice(0,after-before).filter(n=>n.sourceType==='event');
      fresh.forEach(n=>{
        if('Notification' in window && Notification.permission==='granted') {
          try { new Notification(`BizPilot · ${n.title}`, { body:n.message, tag:n.fingerprint, requireInteraction:true }); } catch {}
        }
      });
    }
    renderNotifications(); renderPersistentReminders(); updateNotificationIndicator();
  }
  function startNotificationWatcher() {
    checkEventNotifications();
    clearInterval(notificationTimer);
    notificationTimer=setInterval(checkEventNotifications,30000);
  }

  function rankRow(n,title,sub,value) { return `<div class="rank-row"><span class="rank-num">${n}</span><div class="rank-copy"><strong>${esc(title)}</strong><small>${esc(sub)}</small></div><span class="rank-value">${esc(value)}</span></div>`; }
  function emptyRow(message, cols) { return `<tr><td colspan="${cols}" style="padding:30px;text-align:center;color:var(--muted)">${esc(message)}</td></tr>`; }

  function openModal(type, key = '') {
    lastFocusedBeforeModal = document.activeElement;
    const cfg = modalConfig(type, key);
    if (!cfg) return;
    $('#modalTitle').textContent = cfg.title;
    $('#modalBackdrop .modal')?.classList.toggle('client-profile-modal', ['client','clientEdit'].includes(type));
    $('#dynamicForm').dataset.type = type;
    $('#dynamicForm').dataset.key = key || '';
    delete $('#dynamicForm').dataset.dealUid;
    $('#dynamicForm').innerHTML = cfg.html;
    $('#modalBackdrop').classList.add('open');
    $('#modalBackdrop').setAttribute('aria-hidden','false');
    setTimeout(()=>$('#dynamicForm input, #dynamicForm select')?.focus(), 30);
  }
  function closeModal() { const wasOpen=$('#modalBackdrop').classList.contains('open'); $('#modalBackdrop').classList.remove('open'); $('#modalBackdrop').setAttribute('aria-hidden','true'); if(wasOpen && lastFocusedBeforeModal?.focus) setTimeout(()=>lastFocusedBeforeModal.focus(),10); }

  function modalConfig(type, key = '') {
    const serviceOptions = data.services.map(item=>`<option value="${esc(item.name)}">${esc(item.name)}</option>`).join('');
    const moneyUnit = currencyLabel();
    const clientOptions = data.clients.map(c=>`<option value="${esc(c.name)}">${esc(c.name)}</option>`).join('');
    const actions = `<div class="modal-actions"><button type="button" class="btn btn-secondary" data-modal-cancel>Отмена</button><button class="btn btn-primary" type="submit">Сохранить</button></div>`;
    const input = (name, value = '', attrs = '') => `<input name="${name}" value="${esc(value)}" ${attrs}>`;
    const clientProfileHtml = (c = {}) => {
      const isEdit=!!c.uid;
      const invoices=isEdit?data.invoices.filter(i=>i.client===c.name):[];
      const unpaid=invoices.filter(i=>i.status!=='paid').reduce((s,i)=>s+Number(i.amount||0),0);
      const preferred=['BYN','RUB','USD','EUR'].includes(c.preferredCurrency)?c.preferredCurrency:currencyCode();
      const currencyOptions=['BYN','RUB','USD','EUR'].map(code=>`<option value="${code}" ${preferred===code?'selected':''}>${code}</option>`).join('');
      const typeOptions=[['company','Компания'],['entrepreneur','ИП / предприниматель'],['person','Физическое лицо']].map(([v,l])=>`<option value="${v}" ${(c.clientType||'company')===v?'selected':''}>${l}</option>`).join('');
      const relationOptions=[['active','Активный'],['regular','Постоянный'],['paused','Пауза'],['archived','Архив']].map(([v,l])=>`<option value="${v}" ${(c.relationshipStatus||'active')===v?'selected':''}>${l}</option>`).join('');
      const summary=isEdit?`<div class="client-profile-summary span-2">
        <div class="client-profile-stat"><span>Заказы</span><strong>${number.format(c.orders||0)}</strong></div>
        <div class="client-profile-stat"><span>Счета</span><strong>${number.format(invoices.length)}</strong></div>
        <div class="client-profile-stat ${unpaid>0?'attention':''}"><span>Не оплачено</span><strong>${formatMoney(unpaid)}</strong></div>
        <div class="client-profile-stat"><span>Оплаченная выручка</span><strong>${formatMoney(c.revenue||0)}</strong></div>
      </div>`:`<div class="client-profile-hint span-2"><strong>Карточка контрагента</strong><span>Обязательным остаётся только название. Остальные данные можно заполнить сейчас или добавить позже.</span></div>`;
      return `${summary}
        <div class="client-profile-tabs span-2" role="tablist" aria-label="Разделы карточки клиента">
          <button type="button" class="client-profile-tab active" data-client-tab="main">Основное</button>
          <button type="button" class="client-profile-tab" data-client-tab="contacts">Контакты</button>
          <button type="button" class="client-profile-tab" data-client-tab="legal">Реквизиты</button>
          <button type="button" class="client-profile-tab" data-client-tab="bank">Банк</button>
          <button type="button" class="client-profile-tab" data-client-tab="terms">Условия</button>
        </div>
        <section class="client-tab-panel span-2 active" data-client-panel="main">
          <div class="client-fields-grid">
            <label><span>Компания / название клиента *</span>${input('name',c.name||'','required placeholder="Название компании или клиента"')}</label>
            <label><span>Тип клиента</span><select name="clientType">${typeOptions}</select></label>
            <label><span>Сфера деятельности</span>${input('industry',c.industry||'','placeholder="Например: логистика, медицина, retail"')}</label>
            <label><span>Сайт</span>${input('website',c.website||'','type="url" placeholder="https://example.com"')}</label>
            <label><span>Источник клиента</span>${input('source',c.source||'','placeholder="Рекомендация, сайт, Telegram..."')}</label>
            <label><span>Статус отношений</span><select name="relationshipStatus">${relationOptions}</select></label>
            <label class="span-2"><span>Описание компании / клиента</span><textarea name="description" rows="5" placeholder="Чем занимается компания, масштаб, продукты, особенности, что важно знать">${esc(c.description||'')}</textarea></label>
            <label class="span-2"><span>Теги</span>${input('tags',c.tags||'','placeholder="Например: VIP, опт, повторный клиент, Беларусь"')}</label>
          </div>
        </section>
        <section class="client-tab-panel span-2" data-client-panel="contacts">
          <div class="client-fields-grid">
            <label><span>Контактное лицо</span>${input('person',c.person||'','placeholder="Имя и фамилия"')}</label>
            <label><span>Должность</span>${input('position',c.position||'','placeholder="Директор, бухгалтер, менеджер..."')}</label>
            <label><span>Email</span>${input('email',c.email||'','type="email" placeholder="mail@example.com"')}</label>
            <label><span>Телефон</span>${input('phone',c.phone||'','placeholder="+375 / +7 ..."')}</label>
            <label><span>Дополнительный телефон</span>${input('altPhone',c.altPhone||'','placeholder="Необязательно"')}</label>
            <label><span>Telegram / мессенджер</span>${input('telegram',c.telegram||'','placeholder="@username или номер"')}</label>
            <label class="span-2"><span>Фактический / почтовый адрес</span><textarea name="actualAddress" rows="3" placeholder="Куда отправлять документы, товары или корреспонденцию">${esc(c.actualAddress||'')}</textarea></label>
          </div>
        </section>
        <section class="client-tab-panel span-2" data-client-panel="legal">
          <div class="client-fields-grid">
            <label class="span-2"><span>Полное юридическое наименование</span>${input('legalName',c.legalName||'','placeholder="ООО «Компания», ИП Иванов И.И. и т. п."')}</label>
            <label><span>УНП / ИНН</span>${input('taxId',c.taxId||'','placeholder="Налоговый номер"')}</label>
            <label><span>КПП</span>${input('kpp',c.kpp||'','placeholder="Для РФ, если применимо"')}</label>
            <label><span>ОГРН / регистрационный номер</span>${input('registrationNumber',c.registrationNumber||'','placeholder="Регистрационный номер"')}</label>
            <label><span>Страна регистрации</span>${input('country',c.country||'','placeholder="Беларусь, Россия..."')}</label>
            <label class="span-2"><span>Юридический адрес</span><textarea name="legalAddress" rows="3" placeholder="Адрес из регистрационных документов">${esc(c.legalAddress||'')}</textarea></label>
          </div>
        </section>
        <section class="client-tab-panel span-2" data-client-panel="bank">
          <div class="client-fields-grid">
            <label class="span-2"><span>Банк</span>${input('bankName',c.bankName||'','list="belarusBankList" autocomplete="off" placeholder="Название банка и при необходимости отделение"')}</label>
            <label><span>БИК / BIC</span>${input('bankCode',c.bankCode||'','placeholder="Например: AKBBBY2X"')}</label>
            <label><span>SWIFT</span>${input('swift',c.swift||'','placeholder="Для международных платежей"')}</label>
            <label class="span-2"><span>Корреспондентский счёт</span>${input('correspondentAccount',c.correspondentAccount||'','placeholder="Если используется"')}</label>
            <label class="span-2"><span>Расчётные счета</span><textarea name="bankAccounts" rows="6" placeholder="Можно указать несколько счетов — по одному на строке. Например:&#10;BYN — BY00 XXXX ...&#10;RUB — 40702...">${esc(c.bankAccounts||'')}</textarea><small class="field-help">Можно хранить несколько счетов и подписывать валюту каждого.</small></label>
            <p class="bank-autofill-note">Для белорусского IBAN BizPilot определяет банк по 4-символьному банковскому коду после BYxx и автоматически подставляет BIC, если банк есть во встроенном справочнике.</p>
          </div>
        </section>
        <section class="client-tab-panel span-2" data-client-panel="terms">
          <div class="client-fields-grid">
            <label><span>Номер договора</span>${input('contractNumber',c.contractNumber||'','placeholder="Например: № 15/2026"')}</label>
            <label><span>Дата договора</span>${input('contractDate',c.contractDate||'','type="date"')}</label>
            <label><span>Предпочитаемая валюта</span><select name="preferredCurrency">${currencyOptions}</select></label>
            <label><span>Условия оплаты</span>${input('paymentTerms',c.paymentTerms||'','placeholder="50% предоплата, 10 дней, постоплата..."')}</label>
            <label class="span-2"><span>Важные внутренние заметки</span><textarea name="importantNotes" rows="6" placeholder="Особые условия, предпочтения клиента, риски, договорённости, что нельзя забыть">${esc(c.importantNotes||'')}</textarea></label>
          </div>
        </section>
        ${actions}`;
    };
    const maps = {
      order: { title: 'Новый заказ', html: `<label><span>Клиент</span><select name="client" required><option value="">Выберите клиента</option>${clientOptions}</select></label><label><span>Услуга</span><select name="service" required>${serviceOptions}</select></label><label><span>Сумма, ${moneyUnit}</span><input name="amount" type="number" min="1" value="1500" required></label><label><span>Прямые затраты, ${moneyUnit}</span><input name="cost" type="number" min="0" step="0.01" placeholder="Необязательно"></label><label><span>План человеко-часов</span><input name="plannedHours" type="number" min="0" step="0.25" placeholder="Например: 12"></label><label><span>Уже учтено, часов</span><input name="trackedHours" type="number" min="0" step="0.25" value="0"></label><label><span>Срок</span><input name="due" type="date" value="${addDaysIso(7)}" required></label><div class="modal-note"><strong>Затраты и время</strong><p>Прямые затраты помогают считать прибыль и маржу, а план и фактические часы — контролировать трудоёмкость заказа. После создания таймер можно запускать прямо в таблице заказов.</p></div>${actions}` },
      deal: { title: 'Новая сделка', html: `<label><span>Компания / клиент</span><input name="company" required placeholder="Название компании"></label><label><span>Контактное лицо</span><input name="contact" placeholder="Имя и фамилия"></label><label><span>Email</span><input name="email" type="email" placeholder="mail@example.com"></label><label><span>Телефон</span><input name="phone" placeholder="+375 29 000-00-00"></label><label><span>Сумма сделки, ${moneyUnit}</span><input name="value" type="number" min="0" step="0.01" value="1000" required></label><label><span>Этап</span><select name="stage">${Object.entries(dealStageMeta).map(([v,m])=>`<option value="${v}" ${v==='lead'?'selected':''}>${esc(m.label)}</option>`).join('')}</select></label><label class="span-2"><span>Следующий шаг</span><input name="nextAction" placeholder="Например: отправить предложение"></label><label><span>Дата следующего шага</span><input name="nextActionDate" type="date" value="${addDaysIso(1)}"></label><label><span>Источник</span><input name="source" placeholder="Сайт, рекомендация, Telegram..."></label><label class="span-2"><span>Комментарий</span><textarea name="notes" rows="3" placeholder="Что важно знать о сделке"></textarea></label>${actions}` },
      client: { title: 'Новый клиент', html: clientProfileHtml({}) },
      invoice: { title: 'Выставить счёт', html: `<label><span>Клиент</span><select name="client" required><option value="">Выберите клиента</option>${clientOptions}</select></label><label><span>Сумма, ${moneyUnit}</span><input name="amount" type="number" min="1" value="1000" required></label><label><span>Срок оплаты</span><input name="due" type="date" value="${addDaysIso(10)}" required></label><label><span>Комментарий</span><input name="comment" placeholder="Например: этап 1"></label>${actions}` },
      transaction: { title: 'Новая операция', html: `<label><span>Тип</span><select name="type"><option value="income">Поступление</option><option value="expense">Расход</option></select></label><label><span>Сумма, ${moneyUnit}</span><input name="amount" type="number" min="0.01" step="0.01" value="100" required></label><label><span>Дата</span><input name="date" type="date" value="${todayIso()}" required></label><label><span>Название</span><input name="title" required placeholder="Описание операции"></label><label class="span-2"><span>Категория</span><input name="category" required placeholder="Продажи, маркетинг..."></label>${actions}` },
      service: { title: 'Новая услуга', html: `<label class="span-2"><span>Название</span><input name="name" required placeholder="Название услуги"></label><label><span>Цена от, ${moneyUnit}</span><input name="price" type="number" min="1" value="500" required></label><label><span>Иконка / буква</span><input name="icon" maxlength="2" value="N"></label><label class="span-2"><span>Описание</span><textarea name="description" rows="3" required placeholder="Коротко опишите услугу"></textarea></label>${actions}` },
      notebook: { title: 'Новый блокнот', html: `<label class="span-2"><span>Название блокнота</span><input name="name" required maxlength="80" placeholder="Например: Клиенты, Идеи, Инструкции"></label>${actions}` },
      plannedPayment: { title: 'Плановый платёж', html: `<label><span>Тип</span><select name="type"><option value="expense">Расход</option><option value="income">Поступление</option></select></label><label><span>Сумма, ${moneyUnit}</span><input name="amount" type="number" min="0.01" step="0.01" value="100" required></label><label><span>Дата</span><input name="date" type="date" value="${addDaysIso(7)}" required></label><label><span>Категория</span><input name="category" required placeholder="Аренда, налоги, продажи..."></label><label class="span-2"><span>Название</span><input name="title" required placeholder="Что ожидается оплатить или получить"></label><label class="span-2"><span>Заметка</span><textarea name="note" rows="3" placeholder="Дополнительная информация"></textarea></label>${actions}` },
      event: { title: 'Новое событие', html: `<label class="span-2"><span>Название</span><input name="title" required placeholder="Например: встреча с клиентом"></label><label><span>Дата</span><input name="date" type="date" value="${todayIso()}" required></label><label><span>Время</span><input name="time" type="time" value="09:00" required></label><label><span>Тип</span><select name="eventType"><option value="meeting">Встреча</option><option value="payment">Оплата</option><option value="deadline">Дедлайн</option><option value="task">Задача</option><option value="other">Другое</option></select></label><label><span>Напомнить</span><select name="reminder"><option value="0">В момент события</option><option value="15">За 15 минут</option><option value="30">За 30 минут</option><option value="60" selected>За 1 час</option><option value="180">За 3 часа</option><option value="1440">За 1 день</option><option value="2880">За 2 дня</option><option value="10080">За неделю</option></select></label><label class="span-2"><span>Заметка</span><textarea name="note" rows="3" placeholder="Что нужно сделать или подготовить"></textarea></label>${actions}` }
    };
    if (maps[type]) return maps[type];

    if (type === 'notebookEdit') {
      const book=(data.notebooks||[]).find(x=>x.uid===key); if(!book)return null;
      return { title:'Переименовать блокнот', html:`<label class="span-2"><span>Название блокнота</span>${input('name',book.name,'required maxlength="80"')}</label>${actions}` };
    }
    if (type === 'orderEdit') {
      const o=data.orders.find(x=>x.id===key); if(!o)return null;
      const clients=data.clients.map(c=>`<option value="${esc(c.name)}" ${c.name===o.client?'selected':''}>${esc(c.name)}</option>`).join('');
      const services=data.services.map(s=>`<option value="${esc(s.name)}" ${s.name===o.service?'selected':''}>${esc(s.name)}</option>`).join('');
      return { title:`Редактировать ${o.id}`, html:`<label><span>Клиент</span><select name="client" required>${clients}</select></label><label><span>Услуга</span><select name="service" required>${services}</select></label><label><span>Сумма, ${moneyUnit}</span>${input('amount',o.amount,'type="number" min="0.01" step="0.01" required')}</label><label><span>Прямые затраты, ${moneyUnit}</span>${input('cost',o.cost??'','type="number" min="0" step="0.01" placeholder="Необязательно"')}</label><label><span>План человеко-часов</span>${input('plannedHours',o.plannedHours||'','type="number" min="0" step="0.25" placeholder="Необязательно"')}</label><label><span>Учтено, часов</span>${input('trackedHours',(orderTrackedMinutes(o)/60).toFixed(2),'type="number" min="0" step="0.25"')}</label><label><span>Срок</span>${input('due',toIsoDate(o.due),'type="date" required')}</label><label><span>Статус</span><select name="status">${['new','work','done','paid'].map(st=>`<option value="${st}" ${st===o.status?'selected':''}>${statusMeta[st].label}</option>`).join('')}</select></label><div class="modal-note span-2"><strong>Трекинг времени</strong><p>${o.timerStartedAt?'Таймер сейчас запущен. После сохранения он продолжит работу с текущего момента.':'Таймер остановлен. Его можно запустить из таблицы заказов.'}</p></div>${actions}` };
    }
    if (type === 'dealEdit') {
      const d=(data.deals||[]).find(x=>x.uid===key); if(!d)return null;
      return { title:'Редактировать сделку', html:`<label><span>Компания / клиент</span>${input('company',d.company,'required')}</label><label><span>Контактное лицо</span>${input('contact',d.contact||'')}</label><label><span>Email</span>${input('email',d.email||'','type="email"')}</label><label><span>Телефон</span>${input('phone',d.phone||'')}</label><label><span>Сумма сделки, ${moneyUnit}</span>${input('value',d.value,'type="number" min="0" step="0.01" required')}</label><label><span>Этап</span><select name="stage">${Object.entries(dealStageMeta).map(([v,m])=>`<option value="${v}" ${d.stage===v?'selected':''}>${esc(m.label)}</option>`).join('')}</select></label><label class="span-2"><span>Следующий шаг</span>${input('nextAction',d.nextAction||'','placeholder="Конкретное действие после текущего контакта"')}</label><label><span>Дата следующего шага</span>${input('nextActionDate',d.nextActionDate||'','type="date"')}</label><label><span>Источник</span>${input('source',d.source||'')}</label><label class="span-2"><span>Комментарий</span><textarea name="notes" rows="3">${esc(d.notes||'')}</textarea></label><div class="modal-note span-2"><strong>Правило воронки</strong><p>У активной сделки должен быть один конкретный следующий шаг и дата. Если сделка выиграна или проиграна, следующий шаг очищается автоматически.</p></div>${actions}` };
    }
    if (type === 'transactionEdit') {
      const t=data.transactions.find(x=>String(x.id)===String(key)); if(!t)return null;
      if (t.invoiceId) {
        return { title:`Оплата по счёту ${t.invoiceId}`, html:`<div class="modal-note span-2"><strong>Связанная операция</strong><p>Эта операция создана оплатой счёта ${esc(t.invoiceId)}. Изменение суммы синхронно обновит сумму оплаченного счёта.</p></div><label><span>Сумма, ${moneyUnit}</span>${input('amount',t.amount,'type="number" min="0.01" step="0.01" required')}</label><label><span>Дата оплаты</span>${input('date',toIsoDate(t.date),'type="date" required')}</label>${actions}` };
      }
      return { title:'Редактировать операцию', html:`<label><span>Тип</span><select name="type"><option value="income" ${t.type==='income'?'selected':''}>Поступление</option><option value="expense" ${t.type==='expense'?'selected':''}>Расход</option></select></label><label><span>Сумма, ${moneyUnit}</span>${input('amount',t.amount,'type="number" min="0.01" step="0.01" required')}</label><label><span>Дата</span>${input('date',toIsoDate(t.date),'type="date" required')}</label><label><span>Название</span>${input('title',t.title,'required')}</label><label class="span-2"><span>Категория</span>${input('category',t.category,'required')}</label>${actions}` };
    }
    if (type === 'eventEdit') {
      const item=(data.events||[]).find(x=>x.uid===key); if(!item)return null;
      return { title:'Редактировать событие', html:`<label class="span-2"><span>Название</span>${input('title',item.title,'required')}</label><label><span>Дата</span>${input('date',item.date,'type="date" required')}</label><label><span>Время</span>${input('time',item.time||'09:00','type="time" required')}</label><label><span>Тип</span><select name="eventType">${[['meeting','Встреча'],['payment','Оплата'],['deadline','Дедлайн'],['task','Задача'],['other','Другое']].map(([v,l])=>`<option value="${v}" ${item.type===v?'selected':''}>${l}</option>`).join('')}</select></label><label><span>Напомнить</span><select name="reminder">${[[0,'В момент события'],[15,'За 15 минут'],[30,'За 30 минут'],[60,'За 1 час'],[180,'За 3 часа'],[1440,'За 1 день'],[2880,'За 2 дня'],[10080,'За неделю']].map(([v,l])=>`<option value="${v}" ${Number(item.reminder)===v?'selected':''}>${l}</option>`).join('')}</select></label><label class="span-2"><span>Заметка</span><textarea name="note" rows="3">${esc(item.note||'')}</textarea></label>${actions}` };
    }
    if (type === 'clientEdit') {
      const c = data.clients.find(x => x.uid === key); if (!c) return null;
      return { title: 'Карточка клиента', html: clientProfileHtml(c) };
    }
    if (type === 'invoiceEdit') {
      const i = data.invoices.find(x => x.id === key); if (!i) return null;
      const options = data.clients.map(c=>`<option value="${esc(c.name)}" ${c.name===i.client?'selected':''}>${esc(c.name)}</option>`).join('');
      return { title: `Редактировать ${i.id}`, html: `<label><span>Клиент</span><select name="client" required>${options}</select></label><label><span>Сумма, ${moneyUnit}</span>${input('amount', i.amount, 'type="number" min="1" required')}</label><label><span>Дата выставления</span>${input('issued', toIsoDate(i.issued), 'type="date" required')}</label><label><span>Срок оплаты</span>${input('due', toIsoDate(i.due), 'type="date" required')}</label><label><span>Статус</span><select name="status">${['waiting','overdue','paid'].map(st=>`<option value="${st}" ${st===i.status?'selected':''}>${statusMeta[st].label}</option>`).join('')}</select></label><label><span>Ожидаемая дата оплаты</span>${input('expectedPaymentDate', invoiceExpectedDate(i), 'type="date"')}</label><label class="span-2"><span>Комментарий</span>${input('comment', i.comment || '', 'placeholder="Комментарий"')}</label><div class="modal-note span-2"><strong>Для точного прогноза денег</strong><p>Если счёт просрочен, укажите реалистичную дату, которую подтвердил клиент. Без неё BizPilot не будет считать просроченную сумму поступлением «сегодня».</p></div>${actions}` };
    }
    if (type === 'serviceEdit') {
      const item = data.services.find(x => x.uid === key); if (!item) return null;
      return { title: 'Редактировать услугу', html: `<label class="span-2"><span>Название</span>${input('name', item.name, 'required')}</label><label><span>Цена от, ${moneyUnit}</span>${input('price', item.price, 'type="number" min="1" required')}</label><label><span>Иконка / буква</span>${input('icon', item.icon || '', 'maxlength="2"')}</label><label class="span-2"><span>Описание</span><textarea name="description" rows="3" required>${esc(item.description)}</textarea></label>${actions}` };
    }
    if (type === 'plannedPaymentEdit') {
      const item=(data.plannedPayments||[]).find(x=>x.uid===key); if(!item)return null;
      return { title:'Редактировать плановый платёж', html:`<label><span>Тип</span><select name="type"><option value="expense" ${item.type==='expense'?'selected':''}>Расход</option><option value="income" ${item.type==='income'?'selected':''}>Поступление</option></select></label><label><span>Сумма, ${moneyUnit}</span>${input('amount',item.amount,'type="number" min="0.01" step="0.01" required')}</label><label><span>Дата</span>${input('date',item.date,'type="date" required')}</label><label><span>Категория</span>${input('category',item.category||'','required')}</label><label class="span-2"><span>Название</span>${input('title',item.title,'required')}</label><label class="span-2"><span>Заметка</span><textarea name="note" rows="3">${esc(item.note||'')}</textarea></label>${actions}` };
    }
    return null;
  }

  function hasDuplicateName(items, value, excludeUid='') {
    const normalized = String(value || '').trim().toLowerCase();
    return items.some(item => item.uid !== excludeUid && String(item.name || '').trim().toLowerCase() === normalized);
  }

  function clientProfileValues(v) {
    return {
      name:v.name,
      clientType:['company','entrepreneur','person'].includes(v.clientType)?v.clientType:'company',
      relationshipStatus:['active','regular','paused','archived'].includes(v.relationshipStatus)?v.relationshipStatus:'active',
      industry:v.industry||'', website:v.website||'', source:v.source||'', description:v.description||'', tags:v.tags||'',
      person:v.person||'', position:v.position||'', email:v.email||'', phone:v.phone||'', altPhone:v.altPhone||'', telegram:v.telegram||'', actualAddress:v.actualAddress||'',
      legalName:v.legalName||'', taxId:v.taxId||'', kpp:v.kpp||'', registrationNumber:v.registrationNumber||'', country:v.country||'', legalAddress:v.legalAddress||'',
      bankName:v.bankName||'', bankCode:v.bankCode||'', swift:v.swift||'', correspondentAccount:v.correspondentAccount||'', bankAccounts:v.bankAccounts||'',
      contractNumber:v.contractNumber||'', contractDate:v.contractDate||'', preferredCurrency:['BYN','RUB','USD','EUR'].includes(v.preferredCurrency)?v.preferredCurrency:currencyCode(),
      paymentTerms:v.paymentTerms||'', importantNotes:v.importantNotes||''
    };
  }

  function submitDynamicForm(e) {
    e.preventDefault();
    const type = e.currentTarget.dataset.type;
    const key = e.currentTarget.dataset.key || '';
    const v = Object.fromEntries([...new FormData(e.currentTarget).entries()].map(([k,val]) => [k, typeof val === 'string' ? val.trim() : val]));
    if ((type === 'client' || type === 'clientEdit') && hasDuplicateName(data.clients, v.name, type === 'clientEdit' ? key : '')) { toast('Клиент с таким названием уже существует'); return; }
    if ((type === 'notebook' || type === 'notebookEdit') && hasDuplicateName(data.notebooks || [], v.name, type === 'notebookEdit' ? key : '')) { toast('Блокнот с таким названием уже существует'); return; }
    if ((type === 'service' || type === 'serviceEdit') && hasDuplicateName(data.services, v.name, type === 'serviceEdit' ? key : '')) { toast('Услуга с таким названием уже существует'); return; }
    if (['invoice','invoiceEdit'].includes(type)) {
      const issuedIso = type === 'invoiceEdit' ? v.issued : todayIso();
      if (v.due && issuedIso && v.due < issuedIso) { toast('Срок оплаты не может быть раньше даты выставления'); return; }
      if (type === 'invoiceEdit' && v.expectedPaymentDate && v.status !== 'paid' && v.expectedPaymentDate < todayIso()) { toast('Ожидаемая дата оплаты должна быть сегодня или позже'); return; }
    }
    if (['deal','dealEdit'].includes(type) && activeDealStages.includes(v.stage) && (!v.nextAction || !v.nextActionDate)) {
      toast('Для активной сделки укажите следующий шаг и его дату'); return;
    }
    if (type === 'order') {
      const max = nextEntityNumber(data.orders); const orderId=`BP-${String(max).padStart(4,'0')}`;
      data.orders.unshift({ id: orderId, client: v.client, service: v.service, due: toRuDate(v.due), amount: Number(v.amount), cost: v.cost===''?null:Number(v.cost), plannedHours: Math.max(0,Number(v.plannedHours||0)), trackedMinutes: Math.max(0,Number(v.trackedHours||0))*60, timerStartedAt:null, status: 'new' });
      const sourceDealUid=e.currentTarget.dataset.dealUid||''; const sourceDeal=(data.deals||[]).find(d=>d.uid===sourceDealUid);
      if(sourceDeal){sourceDeal.orderId=orderId;sourceDeal.updatedAt=new Date().toISOString();if(sourceDeal.stage!=='won')setDealStage(sourceDeal,'won');}
      adjustClientOrders(v.client,1);
      toast(sourceDeal?'Заказ создан и связан со сделкой':'Заказ создан');
    } else if (type === 'deal') {
      const now=new Date().toISOString(); const stage=dealStageMeta[v.stage]?v.stage:'lead'; data.deals=data.deals||[]; data.deals.unshift({uid:makeId('deal'),company:v.company,contact:v.contact||'',email:v.email||'',phone:v.phone||'',value:Number(v.value||0),stage,nextAction:['won','lost'].includes(stage)?'':(v.nextAction||''),nextActionDate:['won','lost'].includes(stage)?'':(v.nextActionDate||''),source:v.source||'',notes:v.notes||'',orderId:'',createdAt:now,updatedAt:now,stageChangedAt:now,wonAt:stage==='won'?now:null,lostAt:stage==='lost'?now:null});
      toast('Сделка добавлена');
    } else if (type === 'client') {
      data.clients.unshift({ uid: makeId('client'), ...clientProfileValues(v), orders: 0, revenue: 0, activity: 'Только что' });
      toast('Клиент добавлен');
    } else if (type === 'invoice') {
      const max = nextEntityNumber(data.invoices);
      data.invoices.unshift({ id: `INV-${String(max).padStart(4,'0')}`, client: v.client, amount: Number(v.amount), issued: nowRuDate(), due: toRuDate(v.due), status: 'waiting', comment: v.comment || '' });
      touchClient(v.client);
      toast('Счёт выставлен');
    } else if (type === 'transaction') {
      data.transactions.unshift({ id: Date.now(), type: v.type, title: v.title, category: v.category, date: toRuDate(v.date||todayIso()), amount: Number(v.amount) });
      toast('Операция добавлена');
    } else if (type === 'service') {
      data.services.unshift({ uid: makeId('service'), name: v.name, description: v.description, price: Number(v.price), sold: 0, icon: v.icon || initials(v.name) });
      toast('Услуга добавлена');
    } else if (type === 'notebook') {
      data.notebooks=data.notebooks||[]; const book={uid:makeId('notebook'),name:v.name,createdAt:new Date().toISOString()};data.notebooks.unshift(book);uiState.notesNotebook=book.uid;saveUiState();toast('Блокнот создан');
    } else if (type === 'plannedPayment') {
      data.plannedPayments=data.plannedPayments||[];
      data.plannedPayments.push({uid:makeId('planned'),type:v.type==='income'?'income':'expense',amount:Number(v.amount),date:v.date,title:v.title,category:v.category,note:v.note||'',completedAt:null});
      toast('Плановый платёж добавлен');
    } else if (type === 'event') {
      data.events = data.events || [];
      data.events.push({ uid: makeId('event'), title: v.title, date: v.date, time: v.time, type: v.eventType, reminder: Number(v.reminder || 0), note: v.note || '', completedAt: null });
      uiState.calendarMonth = v.date.slice(0,7); saveUiState();
      toast('Событие добавлено');
    } else if (type === 'notebookEdit') {
      const book=(data.notebooks||[]).find(x=>x.uid===key);if(!book)return;book.name=v.name;toast('Блокнот переименован');
    } else if (type === 'orderEdit') {
      const o=data.orders.find(x=>x.id===key); if(!o)return;
      const oldClient=o.client, oldStatus=o.status;
      const timerWasRunning=!!o.timerStartedAt;
      Object.assign(o,{client:v.client,service:v.service,due:toRuDate(v.due),amount:Number(v.amount),cost:v.cost===''?null:Number(v.cost),plannedHours:Math.max(0,Number(v.plannedHours||0)),trackedMinutes:Math.max(0,Number(v.trackedHours||0))*60,timerStartedAt:timerWasRunning?new Date().toISOString():null,status:v.status});
      if(['done','paid'].includes(v.status) && o.timerStartedAt) settleOrderTimer(o);
      if(oldClient!==v.client){adjustClientOrders(oldClient,-1);adjustClientOrders(v.client,1);} else touchClient(v.client);
      if(['done','paid'].includes(v.status)) archiveNotificationsForSource('order',o.id,false);
      else if(oldStatus!==v.status) archiveNotificationsForSource('order',o.id,true);
      toast('Заказ обновлён');
    } else if (type === 'dealEdit') {
      const d=(data.deals||[]).find(x=>x.uid===key); if(!d)return; const oldStage=d.stage; const stage=dealStageMeta[v.stage]?v.stage:'lead'; Object.assign(d,{company:v.company,contact:v.contact||'',email:v.email||'',phone:v.phone||'',value:Number(v.value||0),source:v.source||'',notes:v.notes||'',updatedAt:new Date().toISOString()}); if(oldStage!==stage)setDealStage(d,stage); if(activeDealStages.includes(stage)){d.nextAction=v.nextAction||'';d.nextActionDate=v.nextActionDate||'';} else {d.nextAction='';d.nextActionDate='';} archiveNotificationsForSource('deal',d.uid,true); toast('Сделка обновлена');
    } else if (type === 'transactionEdit') {
      const t=data.transactions.find(x=>String(x.id)===String(key)); if(!t)return;
      if (t.invoiceId) {
        const inv=data.invoices.find(i=>i.id===t.invoiceId);
        const oldAmount=Number(t.amount||0), nextAmount=Number(v.amount||0);
        t.type='income'; t.amount=nextAmount; t.date=toRuDate(v.date); t.title=`Оплата ${t.invoiceId}`; t.category='Продажи';
        if (inv) {
          if (inv.status!=='paid') inv.status='paid';
          inv.amount=nextAmount;
          if (oldAmount!==nextAmount) adjustClientRevenue(inv.client,nextAmount-oldAmount);
          archiveNotificationsForSource('invoice',inv.id,false);
        }
      } else {
        Object.assign(t,{type:v.type,amount:Number(v.amount),date:toRuDate(v.date),title:v.title,category:v.category});
      }
      toast('Операция обновлена');
    } else if (type === 'eventEdit') {
      const item=(data.events||[]).find(x=>x.uid===key); if(!item)return;
      archiveNotificationsForSource('event',item.uid,true);
      Object.assign(item,{ title:v.title, date:v.date, time:v.time, type:v.eventType, reminder:Number(v.reminder||0), note:v.note||'' });
      uiState.calendarMonth = v.date.slice(0,7); saveUiState();
      toast('Событие обновлено');
    } else if (type === 'clientEdit') {
      const c = data.clients.find(x => x.uid === key); if (!c) return;
      const oldName = c.name;
      Object.assign(c, { ...clientProfileValues(v), activity: 'Только что' });
      if (oldName !== v.name) {
        data.orders.forEach(o => { if (o.client === oldName) o.client = v.name; });
        data.invoices.forEach(i => { if (i.client === oldName) i.client = v.name; });
      }
      toast('Клиент обновлён');
    } else if (type === 'invoiceEdit') {
      const i = data.invoices.find(x => x.id === key); if (!i) return;
      const wasPaid = i.status === 'paid', oldClient=i.client, oldAmount=Number(i.amount||0), oldDue=i.due;
      Object.assign(i, { client: v.client, amount: Number(v.amount), issued: toRuDate(v.issued), due: toRuDate(v.due), expectedPaymentDate: v.status === 'paid' ? '' : (v.expectedPaymentDate || ''), status: v.status, comment: v.comment || '' });
      if (wasPaid && v.status !== 'paid') { data.transactions = data.transactions.filter(t => t.invoiceId !== i.id); adjustClientRevenue(oldClient,-oldAmount); }
      else if (!wasPaid && v.status === 'paid') ensureInvoicePayment(i);
      else if (wasPaid && v.status==='paid') {
        if(oldClient!==i.client){adjustClientRevenue(oldClient,-oldAmount);adjustClientRevenue(i.client,Number(i.amount||0));}
        else if(oldAmount!==Number(i.amount||0)) adjustClientRevenue(i.client,Number(i.amount||0)-oldAmount);
        const payment=data.transactions.find(t=>t.invoiceId===i.id); if(payment){payment.amount=Number(i.amount||0);payment.title=`Оплата ${i.id}`;}
      }
      if(oldDue!==i.due || v.status!=='paid') archiveNotificationsForSource('invoice',i.id,true);
      toast('Счёт обновлён');
    } else if (type === 'plannedPaymentEdit') {
      const item=(data.plannedPayments||[]).find(x=>x.uid===key); if(!item)return;
      archiveNotificationsForSource('plannedPayment',item.uid,true);
      Object.assign(item,{type:v.type==='income'?'income':'expense',amount:Number(v.amount),date:v.date,title:v.title,category:v.category,note:v.note||''});
      toast('Плановый платёж обновлён');
    } else if (type === 'serviceEdit') {
      const item = data.services.find(x => x.uid === key); if (!item) return;
      const oldName = item.name;
      Object.assign(item, { name: v.name, description: v.description, price: Number(v.price), icon: v.icon || initials(v.name) });
      if (oldName !== v.name) data.orders.forEach(o => { if (o.service === oldName) o.service = v.name; });
      toast('Услуга обновлена');
    }
    saveData(); renderAll(); closeModal();
  }

  function toRuDate(iso) { if (!iso) return ''; const [y,m,d] = iso.split('-'); return `${d}.${m}.${y}`; }
  function toIsoDate(ru) { if (!ru) return ''; const [d,m,y] = String(ru).split('.'); return y && m && d ? `${y}-${m}-${d}` : ru; }
  function ensureInvoicePayment(inv) {
    if (data.transactions.some(t => t.invoiceId === inv.id)) return false;
    data.transactions.unshift({ id: Date.now(), invoiceId: inv.id, type: 'income', title: `Оплата ${inv.id}`, category: 'Продажи', date: nowRuDate(), amount: Number(inv.amount||0) });
    adjustClientRevenue(inv.client,Number(inv.amount||0));
    archiveNotificationsForSource('invoice',inv.id,false);
    return true;
  }


  function contractDateLabel(iso) {
    const value = /^\d{4}-\d{2}-\d{2}$/.test(String(iso||'')) ? iso : todayIso();
    const d = new Date(`${value}T12:00:00`);
    return d.toLocaleDateString('ru-RU',{day:'2-digit',month:'long',year:'numeric'});
  }
  function generateClientContract(uid) {
    const client=data.clients.find(c=>c.uid===uid); if(!client)return;
    const providerName=data.profile?.legalName||data.business?.businessName||data.profile?.fullName||'Исполнитель';
    const customerName=client.legalName||client.name||'Заказчик';
    const index=Math.max(1,data.clients.findIndex(c=>c.uid===uid)+1);
    const contractNumber=client.contractNumber||`BP-${new Date().getFullYear()}-${String(index).padStart(3,'0')}`;
    const contractDate=client.contractDate||todayIso();
    const providerReq=[data.profile?.unp?`УНП: ${esc(data.profile.unp)}`:'',data.profile?.legalAddress?`Адрес: ${esc(data.profile.legalAddress)}`:'',data.profile?.iban?`IBAN: ${esc(data.profile.iban)}`:'',data.profile?.bankName?`Банк: ${esc(data.profile.bankName)}`:'',data.profile?.bic?`BIC: ${esc(data.profile.bic)}`:''].filter(Boolean).join('<br>');
    const clientReq=[client.taxId?`УНП / ИНН: ${esc(client.taxId)}`:'',client.legalAddress?`Адрес: ${esc(client.legalAddress)}`:'',client.bankAccounts?`Счёт: ${esc(client.bankAccounts).replace(/\n/g,'<br>')}`:'',client.bankName?`Банк: ${esc(client.bankName)}`:'',client.bankCode?`BIC: ${esc(client.bankCode)}`:''].filter(Boolean).join('<br>');
    const paymentTerms=client.paymentTerms||'Сроки и порядок оплаты определяются счётом, заказом или приложением к настоящему договору.';
    const popup=window.open('','_blank'); if(!popup){toast('Браузер заблокировал окно договора. Разрешите всплывающие окна для BizPilot.');return;}
    popup.document.write(`<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Договор ${esc(contractNumber)}</title><style>body{font-family:Arial,sans-serif;color:#161616;max-width:840px;margin:0 auto;padding:42px 48px;line-height:1.55;font-size:14px}h1{text-align:center;font-size:20px;margin:0 0 4px}h2{font-size:15px;margin:24px 0 8px}.meta{display:flex;justify-content:space-between;gap:20px;margin:18px 0 28px}.muted{color:#666}.clause{margin:7px 0}.req{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:28px}.box{border-top:1px solid #bbb;padding-top:12px}.sign{margin-top:34px;display:grid;grid-template-columns:1fr 1fr;gap:40px}.notice{margin:0 0 22px;padding:10px 12px;background:#f4f4f4;border:1px solid #ddd;font-size:12px}.print{position:fixed;right:20px;top:20px;border:0;border-radius:8px;padding:10px 14px;background:#111;color:#fff;cursor:pointer}@media print{.print,.notice{display:none}body{padding:0}}</style></head><body><button class="print" onclick="window.print()">Печать / PDF</button><div class="notice">Автоматически сформированный шаблон. Перед подписанием проверьте условия договора и соответствие требованиям законодательства.</div><h1>ДОГОВОР ОКАЗАНИЯ УСЛУГ № ${esc(contractNumber)}</h1><div class="meta"><span>${esc(data.profile?.city||data.business?.city||'г. Минск')}</span><span>${esc(contractDateLabel(contractDate))}</span></div><p><strong>${esc(providerName)}</strong>, именуемый далее «Исполнитель», с одной стороны, и <strong>${esc(customerName)}</strong>, именуемый далее «Заказчик», с другой стороны, совместно именуемые «Стороны», заключили настоящий договор о нижеследующем.</p><h2>1. Предмет договора</h2><p class="clause">1.1. Исполнитель обязуется оказывать Заказчику услуги по отдельным заказам, заданиям, счетам или приложениям, а Заказчик обязуется принимать результат и оплачивать услуги на согласованных условиях.</p><p class="clause">1.2. Состав работ, сроки, стоимость и результат конкретного заказа могут уточняться в счёте, переписке, техническом задании или приложении к договору.</p><h2>2. Стоимость и порядок расчётов</h2><p class="clause">2.1. Стоимость услуг определяется по каждому заказу отдельно.</p><p class="clause">2.2. ${esc(paymentTerms)}</p><h2>3. Порядок выполнения и приёмки</h2><p class="clause">3.1. Заказчик своевременно предоставляет материалы и информацию, необходимые для выполнения работ.</p><p class="clause">3.2. Результат считается переданным после направления Заказчику согласованным способом. Замечания направляются в разумный срок после получения результата.</p><h2>4. Ответственность сторон</h2><p class="clause">4.1. Стороны несут ответственность за нарушение обязательств в соответствии с настоящим договором и применимым законодательством.</p><h2>5. Срок действия и прекращение</h2><p class="clause">5.1. Договор действует с даты подписания и до полного исполнения обязательств Сторонами, если иное не согласовано письменно.</p><h2>6. Прочие условия</h2><p class="clause">6.1. Изменения и дополнения могут согласовываться в письменной форме, включая электронную переписку, если это допускается применимым законодательством.</p><p class="clause">6.2. Споры Стороны стремятся урегулировать переговорами.</p><h2>7. Реквизиты сторон</h2><div class="req"><div class="box"><strong>Исполнитель</strong><p>${esc(providerName)}<br>${providerReq||'<span class="muted">Реквизиты не заполнены в BizPilot</span>'}</p></div><div class="box"><strong>Заказчик</strong><p>${esc(customerName)}<br>${clientReq||'<span class="muted">Реквизиты не заполнены в карточке клиента</span>'}</p></div></div><div class="sign"><div>Исполнитель: ____________________</div><div>Заказчик: ____________________</div></div></body></html>`);
    popup.document.close();
  }

  function paymentReminderText(inv) {
    const client=data.clients.find(c=>c.name===inv.client); const person=client?.person?.trim();
    const overdue=ruDateToTimestamp(inv.due,true)<Date.now();
    const greeting=person?`Здравствуйте, ${person}!`:`Здравствуйте!`;
    const status=overdue?`Срок оплаты по счёту уже прошёл (${inv.due}).`:`Срок оплаты — ${inv.due}.`;
    const requisites=[data.profile?.legalName,data.profile?.iban?`IBAN: ${data.profile.iban}`:'',data.profile?.bankName?`Банк: ${data.profile.bankName}`:''].filter(Boolean).join('\n');
    return `${greeting}\n\nНапоминаю о счёте ${inv.id} от ${inv.issued} на сумму ${formatMoney(inv.amount)}. ${status}\n\nЕсли оплата уже отправлена, пожалуйста, сообщите — я отмечу её в системе. Если есть вопросы по счёту, напишите, всё уточним.${requisites?`\n\nРеквизиты:\n${requisites}`:''}\n\nСпасибо!`;
  }
  async function copyText(text) {
    try { if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);return true;} } catch {}
    const ta=document.createElement('textarea'); ta.value=text; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select();
    let ok=false; try{ok=document.execCommand('copy');}catch{} ta.remove(); return ok;
  }
  async function copyInvoiceReminder(id) {
    const inv=data.invoices.find(x=>x.id===id); if(!inv)return;
    const ok=await copyText(paymentReminderText(inv));
    toast(ok?'Напоминание клиенту скопировано':'Не удалось скопировать текст');
  }

  function buildBackupPayload() {
    return {
      app: 'BizPilot',
      formatVersion: 9,
      appVersion: APP_VERSION,
      exportedAt: new Date().toISOString(),
      data,
      prefs,
      calculators: collectCalculatorState(),
      demoMode,
      ui: { ...uiState, focusDone: { ...(uiState.focusDone || {}) }, chartPeriod: Number($('#chartPeriod')?.value || 6) }
    };
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} Б`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} КБ`;
    return `${(bytes / 1024 / 1024).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} МБ`;
  }

  function crc32(bytes) {
    let crc = 0 ^ (-1);
    for (let i = 0; i < bytes.length; i++) {
      crc ^= bytes[i];
      for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xEDB88320 : 0);
    }
    return (crc ^ (-1)) >>> 0;
  }
  function u16(value) { const b = new Uint8Array(2); new DataView(b.buffer).setUint16(0, value, true); return b; }
  function u32(value) { const b = new Uint8Array(4); new DataView(b.buffer).setUint32(0, value >>> 0, true); return b; }
  function concatBytes(parts) {
    const total = parts.reduce((sum, part) => sum + part.length, 0);
    const out = new Uint8Array(total); let offset = 0;
    parts.forEach(part => { out.set(part, offset); offset += part.length; });
    return out;
  }
  function createZip(files) {
    const encoder = new TextEncoder();
    const locals = [], centrals = [];
    let offset = 0;
    Object.entries(files).forEach(([name, content]) => {
      const nameBytes = encoder.encode(name);
      const dataBytes = encoder.encode(content);
      const crc = crc32(dataBytes);
      const local = concatBytes([u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(0), u16(0), u32(crc), u32(dataBytes.length), u32(dataBytes.length), u16(nameBytes.length), u16(0), nameBytes, dataBytes]);
      locals.push(local);
      const central = concatBytes([u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0), u32(crc), u32(dataBytes.length), u32(dataBytes.length), u16(nameBytes.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), nameBytes]);
      centrals.push(central);
      offset += local.length;
    });
    const centralBytes = concatBytes(centrals);
    const localBytes = concatBytes(locals);
    const end = concatBytes([u32(0x06054b50), u16(0), u16(0), u16(centrals.length), u16(centrals.length), u32(centralBytes.length), u32(localBytes.length), u16(0)]);
    return concatBytes([localBytes, centralBytes, end]);
  }
  function parseZip(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    const view = new DataView(arrayBuffer);
    let eocd = -1;
    for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
      if (view.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
    }
    if (eocd < 0) throw new Error('Не найден каталог ZIP');
    const total = view.getUint16(eocd + 10, true);
    if (total < 1 || total > 200) throw new Error('В резервной копии некорректное количество файлов');
    let pos = view.getUint32(eocd + 16, true);
    const decoder = new TextDecoder('utf-8');
    const files = {};
    for (let n = 0; n < total; n++) {
      if (pos < 0 || pos + 46 > bytes.length || view.getUint32(pos, true) !== 0x02014b50) throw new Error('Повреждён ZIP-каталог');
      const method = view.getUint16(pos + 10, true);
      const expectedCrc = view.getUint32(pos + 16, true);
      const compSize = view.getUint32(pos + 20, true);
      const nameLen = view.getUint16(pos + 28, true);
      const extraLen = view.getUint16(pos + 30, true);
      const commentLen = view.getUint16(pos + 32, true);
      const localOffset = view.getUint32(pos + 42, true);
      const name = decoder.decode(bytes.slice(pos + 46, pos + 46 + nameLen));
      if (method !== 0) throw new Error('Этот ZIP использует сжатие, которое не поддерживается импортом BizPilot. Используйте архив, экспортированный самим BizPilot.');
      if (view.getUint32(localOffset, true) !== 0x04034b50) throw new Error('Повреждена запись ZIP');
      const localNameLen = view.getUint16(localOffset + 26, true);
      const localExtraLen = view.getUint16(localOffset + 28, true);
      const dataStart = localOffset + 30 + localNameLen + localExtraLen;
      const dataEnd = dataStart + compSize;
      if (dataStart < 0 || dataEnd > bytes.length) throw new Error(`Повреждён файл в ZIP: ${name}`);
      const fileBytes = bytes.slice(dataStart, dataEnd);
      if (crc32(fileBytes) !== expectedCrc) throw new Error(`Контрольная сумма не совпала: ${name}. Архив повреждён.`);
      files[name] = decoder.decode(fileBytes);
      pos += 46 + nameLen + extraLen + commentLen;
    }
    return files;
  }
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
  function exportBizPilotData() {
    try {
      const payload = buildBackupPayload();
      const files = {
        'bizpilot-backup.json': JSON.stringify(payload, null, 2),
        'data/orders.json': JSON.stringify(data.orders, null, 2),
        'data/clients.json': JSON.stringify(data.clients, null, 2),
        'data/deals.json': JSON.stringify(data.deals || [], null, 2),
        'data/invoices.json': JSON.stringify(data.invoices, null, 2),
        'data/transactions.json': JSON.stringify(data.transactions, null, 2),
        'data/planned-payments.json': JSON.stringify(data.plannedPayments || [], null, 2),
        'data/services.json': JSON.stringify(data.services, null, 2),
        'data/notebooks.json': JSON.stringify(data.notebooks || [], null, 2),
        'data/notes.json': JSON.stringify(data.notes || [], null, 2),
        'data/events.json': JSON.stringify(data.events || [], null, 2),
        'data/notifications.json': JSON.stringify(data.notifications || [], null, 2),
        'data/notification-ledger.json': JSON.stringify(data.notificationLedger || [], null, 2),
        'data/settings.json': JSON.stringify({ business: data.business, profile: data.profile, prefs }, null, 2),
        'README.txt': 'BizPilot backup. Для восстановления откройте раздел «Ваши данные» в BizPilot и загрузите этот ZIP-архив. Не редактируйте bizpilot-backup.json, если не уверены в формате данных.'
      };
      const zipBytes = createZip(files);
      const stamp = new Date().toISOString().slice(0, 10);
      downloadBlob(new Blob([zipBytes], { type: 'application/zip' }), `BizPilot-backup-${stamp}.zip`);
      toast('Все данные экспортированы в ZIP');
    } catch (error) { console.error(error); toast('Не удалось создать резервную копию'); }
  }
  async function importBizPilotData(file) {
    if (!file) return;
    try {
      if (file.size > 20 * 1024 * 1024) throw new Error('Архив слишком большой. Максимум 20 МБ.');
      $('#backupImportStatus').textContent = `Проверяем ${file.name}…`;
      const files = parseZip(await file.arrayBuffer());
      if (!files['bizpilot-backup.json']) throw new Error('В архиве нет bizpilot-backup.json');
      const payload = JSON.parse(files['bizpilot-backup.json']);
      if (payload.app !== 'BizPilot' || !payload.data) throw new Error('Это не резервная копия BizPilot');
      if (Number(payload.formatVersion || 1) > 9) throw new Error('Архив создан более новой версией BizPilot');
      if (!confirm('Восстановить данные из этого архива? Текущие данные BizPilot на этом устройстве будут заменены.')) { $('#backupImportStatus').textContent = 'Импорт отменён.'; return; }
      const importedDemoMode = payload.demoMode === true;
      data = normalizeData(payload.data, importedDemoMode);
      prefs = { theme: ['light','dark','auto'].includes(payload.prefs?.theme) ? payload.prefs.theme : 'light', compact: !!payload.prefs?.compact, autoLocation: payload.prefs?.autoLocation && Number.isFinite(Number(payload.prefs.autoLocation.lat)) && Number.isFinite(Number(payload.prefs.autoLocation.lon)) ? {lat:Number(payload.prefs.autoLocation.lat),lon:Number(payload.prefs.autoLocation.lon)} : null };
      calculatorState = { ...CALCULATOR_DEFAULTS, ...(payload.calculators || {}) };
      demoMode = importedDemoMode; saveDemoMode();
      uiState = { focusDone: {}, chartPeriod: 6, cashflowHorizon: 30, notesFilter:'all', notesNotebook:'all', notesTag:'', notesSort:'updated', selectedNoteId:'', notePreview:false, noteHistoryOpen:false, noteFocus:false, noteTabs:[], ...(payload.ui || {}), lastImportAt: new Date().toISOString() };
      saveData(); savePrefs(); safeStorageSet(CALC_KEY, JSON.stringify(calculatorState), 'подсчёты'); saveUiState();
      safeSessionSet('bizpilot-import-notice-v1', '1');
      location.hash = '#profile';
      location.reload();
    } catch (error) {
      console.error(error);
      $('#backupImportStatus').textContent = `Ошибка: ${error.message}`;
      toast('Не удалось импортировать ZIP');
    } finally {
      if ($('#importDataInput')) $('#importDataInput').value = '';
    }
  }

  function openCommand(query = '') {
    $('#commandPalette').classList.add('open');
    $('#commandPalette').setAttribute('aria-hidden','false');
    $('#commandInput').value = query;
    renderCommands(query);
    setTimeout(()=>$('#commandInput').focus(), 20);
  }
  function closeCommand() { $('#commandPalette').classList.remove('open'); $('#commandPalette').setAttribute('aria-hidden','true'); }
  function renderCommands(query='') {
    const q=String(query||'').trim().toLowerCase();
    const staticCommands = [
      ['Обзор бизнеса','dashboard','Раздел'],['Заказы','orders','Раздел'],['Клиенты','clients','Раздел'],['Продажи и сделки','sales','Раздел'],['Финансы','finance','Раздел'],['Денежный поток и прогноз','cashflow','Раздел'],['Счета','invoices','Раздел'],['Услуги','services','Раздел'],['Блокноты и заметки','notes','Раздел'],['Аналитика','analytics','Раздел'],['Календарь','calendar','Раздел'],['Уведомления','notifications','Раздел'],['Подсчёты','calculations','Раздел'],['Ваши данные · экспорт и импорт','profile','Раздел'],['Обучение и быстрый старт','learning','Раздел'],['Учебный демо-режим','learning','Раздел'],['Настройки','settings','Раздел'],['Обновления BizPilot · версия '+APP_VERSION,'updates','Раздел'],['Настроить профиль владельца','settings','Действие'],
      ['Создать новую сделку','modal:deal','Действие'],['Создать новый заказ','modal:order','Действие'],['Добавить клиента','modal:client','Действие'],['Выставить счёт','modal:invoice','Действие'],['Создать событие','modal:event','Действие'],['Добавить финансовую операцию','modal:transaction','Действие'],['Добавить плановый платёж','modal:plannedPayment','Действие'],['Добавить услугу','modal:service','Действие'],['Создать заметку','note:new','Действие'],['Создать блокнот','modal:notebook','Действие']
    ];
    const entityCommands=[];
    if(q){
      data.orders.filter(o=>`${o.id} ${o.client} ${o.service} ${o.due}`.toLowerCase().includes(q)).slice(0,6).forEach(o=>entityCommands.push([`${o.id} · ${o.client}`,`entity:order:${o.id}`,`Заказ · ${o.service} · ${formatMoney(o.amount)}`]));
      data.clients.filter(c=>[c.name,c.legalName,c.person,c.position,c.email,c.phone,c.altPhone,c.telegram,c.website,c.industry,c.source,c.description,c.tags,c.taxId,c.kpp,c.registrationNumber,c.country,c.legalAddress,c.actualAddress,c.bankName,c.bankCode,c.swift,c.bankAccounts,c.contractNumber,c.paymentTerms,c.importantNotes].join(' ').toLowerCase().includes(q)).slice(0,6).forEach(c=>entityCommands.push([c.name,`entity:client:${c.uid}`,`Клиент · ${c.person || c.legalName || c.email || ''}`]));
      (data.deals||[]).filter(d=>`${d.company} ${d.contact} ${d.email} ${d.phone} ${d.source} ${d.nextAction}`.toLowerCase().includes(q)).slice(0,6).forEach(d=>entityCommands.push([d.company||'Сделка',`entity:deal:${d.uid}`,`Сделка · ${dealStageMeta[d.stage]?.label||d.stage} · ${formatMoney(d.value)}`]));
      data.invoices.filter(i=>`${i.id} ${i.client} ${i.comment||''}`.toLowerCase().includes(q)).slice(0,6).forEach(i=>entityCommands.push([`${i.id} · ${i.client}`,`entity:invoice:${i.id}`,`Счёт · ${formatMoney(i.amount)} · ${statusMeta[i.status]?.label||i.status}`]));
      data.services.filter(item=>`${item.name} ${item.description}`.toLowerCase().includes(q)).slice(0,6).forEach(item=>entityCommands.push([item.name,`entity:service:${item.uid}`,`Услуга · от ${formatMoney(item.price)}`]));
      (data.notes||[]).filter(note=>`${note.title} ${note.content} ${(note.tags||[]).join(' ')} ${noteLinkedEntity(note)?.label||''}`.toLowerCase().includes(q)).slice(0,8).forEach(note=>entityCommands.push([note.title||'Без названия',`entity:note:${note.uid}`,`Заметка · ${noteReminderMeta(note).due?'требует внимания · ':''}${noteExcerpt(note.content)||'без текста'}`]));
      (data.notebooks||[]).filter(book=>book.name.toLowerCase().includes(q)).slice(0,4).forEach(book=>entityCommands.push([book.name,`entity:notebook:${book.uid}`,`Блокнот · ${(data.notes||[]).filter(n=>n.notebookId===book.uid&&!n.trashedAt).length} заметок`]));
      (data.events||[]).filter(ev=>`${ev.title} ${ev.note||''} ${ev.date}`.toLowerCase().includes(q)).slice(0,6).forEach(ev=>entityCommands.push([ev.title,`entity:event:${ev.uid}`,`Календарь · ${formatEventDateTime(ev)}`]));
      data.transactions.filter(t=>`${t.title} ${t.category} ${t.date}`.toLowerCase().includes(q)).slice(0,6).forEach(t=>entityCommands.push([t.title,`entity:transaction:${t.id}`,`Финансы · ${t.type==='income'?'+':'−'} ${formatMoney(t.amount)}`]));
      (data.plannedPayments||[]).filter(t=>`${t.title} ${t.category} ${t.date}`.toLowerCase().includes(q)).slice(0,6).forEach(t=>entityCommands.push([t.title,`entity:planned:${t.uid}`,`Плановый ${t.type==='income'?'доход':'расход'} · ${formatMoney(t.amount)}`]));
    }
    const cmds=[...entityCommands,...staticCommands.filter(c=>!q||`${c[0]} ${c[2]}`.toLowerCase().includes(q))].slice(0,24);
    $('#commandList').innerHTML = cmds.map((c,i)=>`<button class="command-item ${i===0?'active':''}" data-command="${esc(c[1])}"><span class="avatar">${c[2]==='Раздел'?'↗':c[1].startsWith('entity:')?'⌕':'+'}</span><span><strong>${esc(c[0])}</strong><span class="cell-sub">${esc(c[2])}</span></span><span class="command-key">Enter</span></button>`).join('') || `<div class="command-empty"><strong>Ничего не найдено</strong><span>Попробуйте сделку, номер счёта, имя клиента, заметку, услугу или событие.</span></div>`;
  }
  function runCommand(cmd) {
    closeCommand();
    if (cmd === 'note:new') { switchView('notes'); createNote('empty'); return; }
    if (cmd.startsWith('modal:')) { openModal(cmd.split(':')[1]); return; }
    if (cmd.startsWith('entity:')) {
      const [,type,...rest]=cmd.split(':'); const key=rest.join(':');
      if(type==='deal'){switchView('sales');openModal('dealEdit',key);}
      else if(type==='order') openModal('orderEdit',key);
      else if(type==='client') openModal('clientEdit',key);
      else if(type==='invoice') openModal('invoiceEdit',key);
      else if(type==='service') openModal('serviceEdit',key);
      else if(type==='transaction') openModal('transactionEdit',key);
      else if(type==='planned'){switchView('cashflow');openModal('plannedPaymentEdit',key);}
      else if(type==='note'){switchView('notes');uiState.notesFilter='all';uiState.notesNotebook='all';uiState.notesTag='';selectNote(key);}
      else if(type==='notebook'){switchView('notes');uiState.notesFilter='all';uiState.notesNotebook=key;saveUiState();renderNotes();}
      else if(type==='event'){ const event=(data.events||[]).find(e=>e.uid===key); if(event){uiState.calendarMonth=event.date.slice(0,7);saveUiState();switchView('calendar');openModal('eventEdit',key);} }
      return;
    }
    switchView(cmd);
  }

  function printInvoice(id) {
    const i = data.invoices.find(x=>x.id===id); if (!i) return;
    const popup = window.open('', '_blank', 'width=760,height=900');
    if (!popup) { toast('Разрешите всплывающие окна для печати'); return; }
    popup.document.write(`<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>${esc(i.id)}</title><style>body{font-family:Arial,sans-serif;color:#101828;padding:50px;max-width:760px;margin:auto}.head{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #101828;padding-bottom:25px}.brand{font-size:26px;font-weight:800}.muted{color:#667085}.box{margin-top:35px;padding:22px;border:1px solid #d0d5dd;border-radius:14px}.sum{font-size:36px;font-weight:800;margin:16px 0}table{width:100%;border-collapse:collapse;margin-top:20px}td{padding:12px 0;border-bottom:1px solid #eaecf0}.right{text-align:right}@media print{body{padding:0}}</style></head><body><div class="head"><div><div class="brand">BizPilot</div><div class="muted">${esc(data.business?.businessName || 'Компания')}</div></div><div class="right"><b>СЧЁТ ${esc(i.id)}</b><div class="muted">от ${esc(i.issued)}</div></div></div><div class="box"><div class="muted">Клиент</div><h2>${esc(i.client)}</h2><table><tr><td>Услуги по договорённости</td><td class="right">${formatMoney(i.amount)}</td></tr></table><div class="sum">${formatMoney(i.amount)}</div><div class="muted">Оплатить до ${esc(i.due)}</div></div><div class="box"><div class="muted">Реквизиты исполнителя</div><p>${esc(data.profile?.legalName || data.business?.businessName || 'Не указано')}</p><p class="muted">${data.profile?.unp ? `УНП: ${esc(data.profile.unp)}<br>` : ''}${data.profile?.iban ? `IBAN: ${esc(data.profile.iban)}<br>` : ''}${data.profile?.bankName ? `Банк: ${esc(data.profile.bankName)}` : ''}</p></div><p class="muted" style="margin-top:40px">Сформировано в BizPilot.</p><script>window.onload=()=>window.print()<\/script></body></html>`);
    popup.document.close();
  }

  function closeSidebar(){ $('#sidebar').classList.remove('open'); $('#sidebarOverlay').classList.remove('open'); }

  function bind() {
    $('#navList').addEventListener('click', e => { const b=e.target.closest('[data-view]'); if (b) switchView(b.dataset.view); });
    document.addEventListener('click', e => {
      const go=e.target.closest('[data-go]'); if(go) switchView(go.dataset.go);
      const learningScroll=e.target.closest('[data-learning-scroll]'); if(learningScroll){document.getElementById(learningScroll.dataset.learningScroll)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
      const learningNext=e.target.closest('[data-learning-next]'); if(learningNext){runLearningRecommendation();return;}
      const learningComplete=e.target.closest('[data-learning-complete]'); if(learningComplete){uiState.learningDone=uiState.learningDone&&typeof uiState.learningDone==='object'?uiState.learningDone:{};const key=learningComplete.dataset.learningComplete;if(uiState.learningDone[key])delete uiState.learningDone[key];else uiState.learningDone[key]=true;saveUiState();renderLearning();return;}
      const focusAction=e.target.closest('[data-focus-action]'); if(focusAction){runPriorityAction(focusAction.dataset.focusAction);return;}
      const open=e.target.closest('[data-open-modal]'); if(open) openModal(open.dataset.openModal);
      if(e.target.closest('[data-modal-cancel]')) closeModal();
      const notesFilter=e.target.closest('[data-notebook-filter]'); if(notesFilter){uiState.notesNotebook=notesFilter.dataset.notebookFilter;uiState.notesFilter='all';uiState.notesTag='';saveUiState();renderNotes();}
      const noteTag=e.target.closest('[data-note-tag-filter],[data-note-tag]'); if(noteTag){uiState.notesTag=noteTag.dataset.noteTagFilter||noteTag.dataset.noteTag||'';uiState.notesFilter='all';saveUiState();renderNotes();return;}
      if(e.target.closest('#clearNoteTagFilter')){uiState.notesTag='';saveUiState();renderNotes();return;}
      const relatedNote=e.target.closest('[data-related-note]'); if(relatedNote){selectNote(relatedNote.dataset.relatedNote);return;}
      const closeTab=e.target.closest('[data-close-note-tab]'); if(closeTab){closeNoteTab(closeTab.dataset.closeNoteTab);return;}
      const openTab=e.target.closest('[data-note-tab]'); if(openTab){selectNote(openTab.dataset.noteTab);return;}
      const selectNoteBtn=e.target.closest('[data-select-note]'); if(selectNoteBtn) selectNote(selectNoteBtn.dataset.selectNote);
      const createNoteBtn=e.target.closest('[data-create-note]'); if(createNoteBtn) createNote(createNoteBtn.dataset.createNote||'empty');
      const toggleFocus=e.target.closest('[data-toggle-note-focus]'); if(toggleFocus){uiState.noteFocus=!uiState.noteFocus;saveUiState();renderNotes();return;}
      const togglePreview=e.target.closest('[data-toggle-note-preview]'); if(togglePreview){uiState.notePreview=!uiState.notePreview;saveUiState();renderNoteEditor();}
      const toggleHistory=e.target.closest('[data-toggle-note-history]'); if(toggleHistory){uiState.noteHistoryOpen=!uiState.noteHistoryOpen;saveUiState();renderNoteEditor();}
      const restoreVersion=e.target.closest('[data-restore-note-version]'); if(restoreVersion) restoreNoteVersion(restoreVersion.dataset.restoreNoteVersion);
      const duplicateBtn=e.target.closest('[data-duplicate-note]'); if(duplicateBtn) duplicateNote(duplicateBtn.dataset.duplicateNote);
      const exportNoteBtn=e.target.closest('[data-export-note]'); if(exportNoteBtn) exportNoteMarkdown(exportNoteBtn.dataset.exportNote);
      const openNoteLink=e.target.closest('[data-open-note-link]'); if(openNoteLink) openNoteLinkedEntity(openNoteLink.dataset.openNoteLink);
      const completeReminder=e.target.closest('[data-complete-note-reminder]'); if(completeReminder) completeNoteReminder(completeReminder.dataset.completeNoteReminder);
      const clearReminder=e.target.closest('[data-clear-note-reminder]'); if(clearReminder) clearNoteReminder(clearReminder.dataset.clearNoteReminder);
      const toggleCheck=e.target.closest('[data-toggle-note-check]'); if(toggleCheck){const [uid,index]=toggleCheck.dataset.toggleNoteCheck.split(':');toggleNoteChecklist(uid,index);}
      const editNotebook=e.target.closest('[data-edit-notebook]'); if(editNotebook) openModal('notebookEdit',editNotebook.dataset.editNotebook);
      const deleteNotebook=e.target.closest('[data-delete-notebook]'); if(deleteNotebook){const book=(data.notebooks||[]).find(x=>x.uid===deleteNotebook.dataset.deleteNotebook);if(book&&confirm(`Удалить блокнот «${book.name}»? Заметки останутся и будут перемещены в «Без блокнота».`)){snapshotForUndo(`блокнот ${book.name}`);(data.notes||[]).forEach(n=>{if(n.notebookId===book.uid)n.notebookId='';});data.notebooks=data.notebooks.filter(x=>x.uid!==book.uid);if(uiState.notesNotebook===book.uid)uiState.notesNotebook='all';saveUiState();saveData();renderAll();offerUndo('Блокнот удалён');}}
      const toggleNotePin=e.target.closest('[data-toggle-note-pin]'); if(toggleNotePin){const note=(data.notes||[]).find(n=>n.uid===toggleNotePin.dataset.toggleNotePin);if(note){note.pinned=!note.pinned;note.updatedAt=new Date().toISOString();saveData();renderNotes();toast(note.pinned?'Заметка закреплена':'Заметка откреплена');}}
      const toggleNoteArchive=e.target.closest('[data-toggle-note-archive]'); if(toggleNoteArchive){const note=(data.notes||[]).find(n=>n.uid===toggleNoteArchive.dataset.toggleNoteArchive);if(note){note.archivedAt=note.archivedAt?null:new Date().toISOString();note.updatedAt=new Date().toISOString();if(note.archivedAt){note.pinned=false;archiveNotificationsForSource('note',note.uid,false);}else archiveNotificationsForSource('note',note.uid,true);saveData();renderAll();toast(note.archivedAt?'Заметка перемещена в архив':'Заметка возвращена из архива');}}
      const trashNoteBtn=e.target.closest('[data-trash-note]'); if(trashNoteBtn) trashNote(trashNoteBtn.dataset.trashNote);
      const restoreNoteBtn=e.target.closest('[data-restore-note]'); if(restoreNoteBtn) restoreNote(restoreNoteBtn.dataset.restoreNote);
      const deleteNotePermanent=e.target.closest('[data-delete-note-permanent]'); if(deleteNotePermanent){const note=(data.notes||[]).find(n=>n.uid===deleteNotePermanent.dataset.deleteNotePermanent);if(note&&confirm(`Удалить заметку «${note.title||'Без названия'}» навсегда?`)){snapshotForUndo(`заметка ${note.title||'Без названия'}`);archiveNotificationsForSource('note',note.uid,false);data.notes=data.notes.filter(n=>n.uid!==note.uid);uiState.noteTabs=(uiState.noteTabs||[]).filter(id=>id!==note.uid);uiState.selectedNoteId=uiState.noteTabs.at(-1)||'';if(!uiState.selectedNoteId)uiState.noteFocus=false;saveUiState();saveData();renderAll();offerUndo('Заметка удалена навсегда');}}
      const noteFormat=e.target.closest('[data-note-format]'); if(noteFormat) insertNoteFormat(noteFormat.dataset.noteFormat);
      const editOrder=e.target.closest('[data-edit-order]'); if(editOrder) openModal('orderEdit',editOrder.dataset.editOrder);
      const orderTimer=e.target.closest('[data-toggle-order-timer]'); if(orderTimer){toggleOrderTimer(orderTimer.dataset.toggleOrderTimer);return;}
      const del=e.target.closest('[data-delete-order]'); if(del){ const order=data.orders.find(x=>x.id===del.dataset.deleteOrder); if(order&&confirm(`Удалить заказ ${del.dataset.deleteOrder}?`)){ snapshotForUndo(`заказ ${order.id}`); adjustClientOrders(order.client,-1); archiveNotificationsForSource('order',order.id,false); data.orders=data.orders.filter(x=>x.id!==order.id); saveData(); renderAll(); offerUndo('Заказ удалён'); } }
      const pay=e.target.closest('[data-pay-invoice]'); if(pay){ const inv=data.invoices.find(x=>x.id===pay.dataset.payInvoice); if(inv){ inv.status='paid'; ensureInvoicePayment(inv); saveData();renderAll();toast('Оплата отмечена'); } }
      const editTransaction=e.target.closest('[data-edit-transaction]'); if(editTransaction) openModal('transactionEdit',editTransaction.dataset.editTransaction);
      const deleteTransaction=e.target.closest('[data-delete-transaction]'); if(deleteTransaction){ const t=data.transactions.find(x=>String(x.id)===String(deleteTransaction.dataset.deleteTransaction)); if(t&&confirm(`Удалить операцию «${t.title}»?`)){ snapshotForUndo(`операция ${t.title}`); if(t.invoiceId){const inv=data.invoices.find(i=>i.id===t.invoiceId);if(inv&&inv.status==='paid'){inv.status=ruDateToTimestamp(inv.due,true)<Date.now()?'overdue':'waiting';adjustClientRevenue(inv.client,-Number(t.amount||0));archiveNotificationsForSource('invoice',inv.id,true);}} data.transactions=data.transactions.filter(x=>String(x.id)!==String(t.id)); saveData();renderAll();offerUndo('Операция удалена'); } }
      const editDeal=e.target.closest('[data-edit-deal]'); if(editDeal) openModal('dealEdit',editDeal.dataset.editDeal);
      const deleteDeal=e.target.closest('[data-delete-deal]'); if(deleteDeal){const d=(data.deals||[]).find(x=>x.uid===deleteDeal.dataset.deleteDeal);if(d&&confirm(`Удалить сделку «${d.company}»?`)){snapshotForUndo(`сделка ${d.company}`);archiveNotificationsForSource('deal',d.uid,false);data.deals=data.deals.filter(x=>x.uid!==d.uid);saveData();renderAll();offerUndo('Сделка удалена');}}
      const dealToOrder=e.target.closest('[data-deal-to-order]'); if(dealToOrder) convertDealToOrder(dealToOrder.dataset.dealToOrder);
      const openDealOrder=e.target.closest('[data-open-deal-order]'); if(openDealOrder){switchView('orders');openModal('orderEdit',openDealOrder.dataset.openDealOrder);}
      const clientTab=e.target.closest('[data-client-tab]'); if(clientTab){const form=clientTab.closest('form');if(form){form.querySelectorAll('[data-client-tab]').forEach(b=>b.classList.toggle('active',b===clientTab));form.querySelectorAll('[data-client-panel]').forEach(p=>p.classList.toggle('active',p.dataset.clientPanel===clientTab.dataset.clientTab));}return;}
      const contractBtn=e.target.closest('[data-client-contract]'); if(contractBtn){generateClientContract(contractBtn.dataset.clientContract);return;}
      const editClient=e.target.closest('[data-edit-client]'); if(editClient) openModal('clientEdit', editClient.dataset.editClient);
      const deleteClient=e.target.closest('[data-delete-client]'); if(deleteClient){ const c=data.clients.find(x=>x.uid===deleteClient.dataset.deleteClient); if(c && confirm(`Удалить клиента «${c.name}»? Исторические заказы и счета останутся в системе.`)){ snapshotForUndo(`клиент ${c.name}`); data.clients=data.clients.filter(x=>x.uid!==c.uid); saveData(); renderAll(); offerUndo('Клиент удалён'); } }
      const editInvoice=e.target.closest('[data-edit-invoice]'); if(editInvoice) openModal('invoiceEdit', editInvoice.dataset.editInvoice);
      const deleteInvoice=e.target.closest('[data-delete-invoice]'); if(deleteInvoice){ const id=deleteInvoice.dataset.deleteInvoice; const inv=data.invoices.find(x=>x.id===id); if(inv&&confirm(`Удалить счёт ${id}?`)){ snapshotForUndo(`счёт ${id}`); if(inv.status==='paid') adjustClientRevenue(inv.client,-Number(inv.amount||0)); archiveNotificationsForSource('invoice',id,false); data.invoices=data.invoices.filter(x=>x.id!==id); data.transactions=data.transactions.filter(t=>t.invoiceId!==id); saveData(); renderAll(); offerUndo('Счёт удалён'); } }
      const editService=e.target.closest('[data-edit-service]'); if(editService) openModal('serviceEdit', editService.dataset.editService);
      const deleteService=e.target.closest('[data-delete-service]'); if(deleteService){ const item=data.services.find(x=>x.uid===deleteService.dataset.deleteService); if(item && confirm(`Удалить услугу «${item.name}»? Уже созданные заказы сохранят название услуги.`)){ snapshotForUndo(`услуга ${item.name}`); data.services=data.services.filter(x=>x.uid!==item.uid); saveData(); renderAll(); offerUndo('Услуга удалена'); } }
      const editEvent=e.target.closest('[data-edit-event]'); if(editEvent) openModal('eventEdit',editEvent.dataset.editEvent);
      const toggleEvent=e.target.closest('[data-toggle-event-complete]'); if(toggleEvent){ const item=(data.events||[]).find(x=>x.uid===toggleEvent.dataset.toggleEventComplete); if(item){ item.completedAt=item.completedAt?null:new Date().toISOString(); if(item.completedAt) archiveNotificationsForSource('event',item.uid,false); else archiveNotificationsForSource('event',item.uid,true); saveData();renderAll();toast(item.completedAt?'Событие отмечено выполненным':'Событие возвращено в работу'); } }
      const calendarDay=e.target.closest('[data-calendar-date]'); if(calendarDay&&!e.target.closest('[data-edit-event]')&&!e.target.closest('[data-toggle-event-complete]')){ openModal('event'); const dateField=$('#dynamicForm [name=\"date\"]'); if(dateField)dateField.value=calendarDay.dataset.calendarDate; }
      const deleteEvent=e.target.closest('[data-delete-event]'); if(deleteEvent){ const item=(data.events||[]).find(x=>x.uid===deleteEvent.dataset.deleteEvent); if(item&&confirm(`Удалить событие «${item.title}»?`)){ snapshotForUndo(`событие ${item.title}`); data.events=data.events.filter(x=>x.uid!==item.uid); (data.notifications||[]).forEach(n=>{if(n.sourceType==='event'&&n.sourceId===item.uid){n.archivedAt=n.archivedAt||new Date().toISOString();n.popupDismissedAt=n.popupDismissedAt||new Date().toISOString();}}); saveData(); renderAll(); offerUndo('Событие удалено'); } }
      const editPlanned=e.target.closest('[data-edit-planned]'); if(editPlanned) openModal('plannedPaymentEdit',editPlanned.dataset.editPlanned);
      const deletePlanned=e.target.closest('[data-delete-planned]'); if(deletePlanned){const item=(data.plannedPayments||[]).find(x=>x.uid===deletePlanned.dataset.deletePlanned);if(item&&confirm(`Удалить плановый платёж «${item.title}»?`)){snapshotForUndo(`плановый платёж ${item.title}`);archiveNotificationsForSource('plannedPayment',item.uid,false);data.plannedPayments=data.plannedPayments.filter(x=>x.uid!==item.uid);saveData();renderAll();offerUndo('Плановый платёж удалён');}}
      const completePlanned=e.target.closest('[data-complete-planned]'); if(completePlanned){const item=(data.plannedPayments||[]).find(x=>x.uid===completePlanned.dataset.completePlanned);if(item){data.transactions.unshift({id:Date.now(),type:item.type,title:item.title,category:item.category||'План',date:nowRuDate(),amount:Number(item.amount||0)});item.completedAt=new Date().toISOString();archiveNotificationsForSource('plannedPayment',item.uid,false);saveData();renderAll();toast('Плановый платёж проведён в фактические операции');}}
      const copyReminder=e.target.closest('[data-copy-reminder]'); if(copyReminder) copyInvoiceReminder(copyReminder.dataset.copyReminder);
      const pr=e.target.closest('[data-print-invoice]'); if(pr) printInvoice(pr.dataset.printInvoice);
      const cmd=e.target.closest('[data-command]'); if(cmd) runCommand(cmd.dataset.command);
      const openNotificationBtn=e.target.closest('[data-open-notification]'); if(openNotificationBtn) openNotification(openNotificationBtn.dataset.openNotification);
      const toggleRead=e.target.closest('[data-toggle-notification-read]'); if(toggleRead){const n=(data.notifications||[]).find(x=>x.uid===toggleRead.dataset.toggleNotificationRead); if(n)setNotificationRead(n.uid,!n.readAt);}
      const archiveBtn=e.target.closest('[data-archive-notification]'); if(archiveBtn) archiveNotification(archiveBtn.dataset.archiveNotification);
      const deleteNotificationBtn=e.target.closest('[data-delete-notification]'); if(deleteNotificationBtn&&confirm('Удалить это уведомление?')) deleteNotification(deleteNotificationBtn.dataset.deleteNotification);
      const dismissReminder=e.target.closest('[data-dismiss-reminder]'); if(dismissReminder) dismissReminderPopup(dismissReminder.dataset.dismissReminder);
      const readReminder=e.target.closest('[data-read-reminder]'); if(readReminder) setNotificationRead(readReminder.dataset.readReminder,true);
    });
    document.addEventListener('change', e => {
      if(e.target.matches('[data-focus-key]')) { uiState.focusDone=uiState.focusDone&&typeof uiState.focusDone==='object'?uiState.focusDone:{}; if(e.target.checked)uiState.focusDone[e.target.dataset.focusKey]=true; else delete uiState.focusDone[e.target.dataset.focusKey]; saveUiState(); renderDashboard(); }
      if(e.target.matches('[data-order-status]')){ const o=data.orders.find(x=>x.id===e.target.dataset.orderStatus); if(o){ o.status=e.target.value; if(['done','paid'].includes(o.status) && o.timerStartedAt) settleOrderTimer(o); touchClient(o.client); if(['done','paid'].includes(o.status))archiveNotificationsForSource('order',o.id,false); else archiveNotificationsForSource('order',o.id,true); saveData(); renderAll(); toast('Статус заказа обновлён'); } }
      if(e.target.matches('[data-deal-stage]')){const d=(data.deals||[]).find(x=>x.uid===e.target.dataset.dealStage);if(d){setDealStage(d,e.target.value);saveData();renderAll();toast('Этап сделки обновлён');}}
    });
    document.addEventListener('input', e=>{
      if(e.target.matches('input[name="iban"], textarea[name="bankAccounts"]')) applyBankAutofill(e.target);
    });
    document.addEventListener('change', e=>{
      if(e.target.matches('input[name="bankName"]')) {
        const changed=applyBankAutofill(e.target);
        if(changed) toast('Банк и BIC заполнены автоматически');
      }
    });
    $('#notesSearch')?.addEventListener('input', ()=>{renderNotesList();renderNoteEditor();});
    $('#notesSort')?.addEventListener('change', e=>{uiState.notesSort=e.target.value;saveUiState();renderNotesList();});
    $('#notesSmartFilters')?.addEventListener('click', e=>{const b=e.target.closest('[data-notes-filter]');if(!b)return;uiState.notesFilter=b.dataset.notesFilter;uiState.notesTag='';saveUiState();renderNotes();});
    $('#newNoteBtn')?.addEventListener('click', ()=>createNote('empty'));
    $('#newNotebookBtn')?.addEventListener('click', ()=>openModal('notebook'));
    $('#newNotebookInlineBtn')?.addEventListener('click', ()=>openModal('notebook'));
    $('#createNoteFromTemplateBtn')?.addEventListener('click', ()=>createNote($('#noteTemplateSelect')?.value || 'empty'));
    document.addEventListener('keydown', e=>{
      if(e.key==='Escape'&&activeView==='notes'&&uiState.noteFocus){uiState.noteFocus=false;saveUiState();renderNotes();return;}
      if((e.ctrlKey||e.metaKey)&&e.altKey&&e.key.toLowerCase()==='n'){e.preventDefault();switchView('notes');createNote('empty');}
      if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='s'&&activeView==='notes'){e.preventDefault();clearTimeout(noteSaveTimer);saveData();const st=$('#noteSaveStatus');if(st)st.textContent='Сохранено';toast('Заметка сохранена');}
    });
    $('#notesPanel')?.addEventListener('input', e=>{if(e.target.matches('[data-note-field="title"],[data-note-field="content"],[data-note-field="tags"],[data-note-field="reminderAt"]'))saveNoteField(e.target);});
    $('#notesPanel')?.addEventListener('change', e=>{if(e.target.matches('[data-note-field="notebookId"],[data-note-field="linkedRef"],[data-note-field="reminderAt"]')){saveNoteField(e.target);renderNotesSidebar();setTimeout(renderNoteEditor,10);}});
    $('#ordersSearch').addEventListener('input', renderOrders);
    $('#clientsSearch').addEventListener('input', renderClients);
    $('#salesSearch')?.addEventListener('input', renderSales);
    $('#financeSearch').addEventListener('input', renderFinance);
    $('#financeFilters').addEventListener('click', e=>{const b=e.target.closest('button[data-filter]');if(!b)return;financeFilter=b.dataset.filter;$$('#financeFilters button').forEach(x=>x.classList.toggle('active',x===b));renderFinance();});
    $('#financePeriod').addEventListener('change', e=>{financePeriod=e.target.value;renderFinance();});
    $('#cashflowHorizon')?.addEventListener('change', e=>{uiState.cashflowHorizon=Number(e.target.value);cashflowHorizon=Number(e.target.value);saveUiState();renderCashflow();});
    $('#cashBalanceForm')?.addEventListener('submit', e=>{e.preventDefault();const value=Math.max(0,Number($('#cashBalanceInput')?.value||0));data.business.cashBalance=value;data.business.cashBalanceUpdatedAt=new Date().toISOString();saveData();renderAll();toast('Текущий остаток сохранён');});
    $('#orderFilters').addEventListener('click', e=>{ const b=e.target.closest('button[data-filter]'); if(!b)return; $$('#orderFilters button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); orderFilter=b.dataset.filter; renderOrders(); });
    $('#invoiceFilters').addEventListener('click', e=>{ const b=e.target.closest('button[data-filter]'); if(!b)return; $$('#invoiceFilters button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); invoiceFilter=b.dataset.filter; renderInvoices(); });
    $('#chartPeriod').addEventListener('change', e=>{ uiState.chartPeriod=Number(e.target.value); saveUiState(); renderChart(Number(e.target.value)); });
    $('#dynamicForm').addEventListener('submit', submitDynamicForm);
    $('#modalClose').addEventListener('click', closeModal);
    $('#modalBackdrop').addEventListener('click', e=>{ if(e.target===e.currentTarget) closeModal(); });
    $('#quickAddBtn').addEventListener('click', ()=>openCommand('Создать'));
    $('#globalSearch').addEventListener('focus', e=>{ e.target.blur(); openCommand(); });
    $('#commandInput').addEventListener('input', e=>renderCommands(e.target.value));
    $('#commandPalette').addEventListener('click', e=>{ if(e.target===e.currentTarget) closeCommand(); });
    $('#menuBtn').addEventListener('click', ()=>{ $('#sidebar').classList.add('open'); $('#sidebarOverlay').classList.add('open'); });
    $('#sidebarOverlay').addEventListener('click', closeSidebar);
    $('#themeBtn').addEventListener('click', toggleTheme);
    $('#themeSetting').addEventListener('click', toggleTheme);
    $('#densitySetting').addEventListener('click', ()=>{ prefs.compact=!prefs.compact; savePrefs(); applyPrefs(); toast(prefs.compact?'Компактный режим включён':'Компактный режим выключен'); });
    $('#notifyBtn').addEventListener('click', ()=>switchView('notifications'));
    $('#notificationFilters').addEventListener('click', e=>{ const b=e.target.closest('[data-notification-filter]'); if(!b)return; notificationFilter=b.dataset.notificationFilter; renderNotifications(); });
    $('#markAllNotificationsReadBtn').addEventListener('click', ()=>{ const now=new Date().toISOString(); (data.notifications||[]).filter(n=>!n.archivedAt).forEach(n=>{n.readAt=n.readAt||now;n.popupDismissedAt=n.popupDismissedAt||now;}); saveData(); renderNotifications(); renderPersistentReminders(); toast('Все уведомления отмечены прочитанными'); });
    $('#clearArchivedNotificationsBtn').addEventListener('click', ()=>{ const count=(data.notifications||[]).filter(n=>n.archivedAt).length; if(!count){toast('Закрытых уведомлений нет');return;} if(confirm(`Удалить закрытые уведомления (${count})?`)){data.notifications=(data.notifications||[]).filter(n=>!n.archivedAt); saveData(); renderNotifications(); toast('Закрытые уведомления удалены');} });
    $('#startDemoModeBtn')?.addEventListener('click', startTrainingDemo);
    $('#resetTrainingDemoBtn')?.addEventListener('click', resetTrainingDemo);
    $('#exitDemoModeBtn')?.addEventListener('click', exitTrainingDemo);
    $('#resetCalculatorsBtn').addEventListener('click', ()=>{ resetCalculators(); toast('Подсчёты очищены'); });
    $('#calendarPrevBtn').addEventListener('click', ()=>setCalendarMonth(-1));
    $('#calendarNextBtn').addEventListener('click', ()=>setCalendarMonth(1));
    $('#calendarTodayBtn').addEventListener('click', ()=>{uiState.calendarMonth=todayIso().slice(0,7);saveUiState();renderCalendar();});
    $('#enableCalendarNotifications').addEventListener('click', requestCalendarNotifications);
    $('#exportDataBtn').addEventListener('click', exportBizPilotData);
    $('#exportDataBtnSecondary').addEventListener('click', exportBizPilotData);
    $('#repairDataBtn')?.addEventListener('click', repairDataIntegrity);
    $('#importDataInput').addEventListener('change', e=>importBizPilotData(e.target.files?.[0]));
    $('#backupDropzone').addEventListener('dragover', e=>{ e.preventDefault(); e.currentTarget.classList.add('dragover'); });
    $('#backupDropzone').addEventListener('dragleave', e=>e.currentTarget.classList.remove('dragover'));
    $('#backupDropzone').addEventListener('drop', e=>{ e.preventDefault(); e.currentTarget.classList.remove('dragover'); importBizPilotData(e.dataTransfer.files?.[0]); });
    $('#calculationsPanel').addEventListener('input', e=>{ if(e.target.matches('input[type="number"]')){ renderCalculators(); saveCalculatorState(); } });
    $('#businessForm').addEventListener('submit', e=>{
      e.preventDefault();
      data.business = { ...data.business, ...formToObject(e.currentTarget) };
      saveData(); renderAll();
      $('#saveStatus').textContent='Настройки сохранены'; toast('Настройки бизнеса сохранены'); setTimeout(()=>$('#saveStatus').textContent='',2200);
    });
    $('#profileForm').addEventListener('submit', e=>{
      e.preventDefault();
      data.profile = { ...data.profile, ...formToObject(e.currentTarget) };
      saveData(); renderAll();
      $('#profileSaveStatus').textContent='Данные сохранены'; toast('Ваши данные сохранены'); setTimeout(()=>$('#profileSaveStatus').textContent='',2200);
    });
    $('#requisitesForm').addEventListener('submit', e=>{
      e.preventDefault();
      data.profile = { ...data.profile, ...formToObject(e.currentTarget) };
      saveData(); renderAll();
      $('#requisitesSaveStatus').textContent='Реквизиты сохранены'; toast('Реквизиты сохранены'); setTimeout(()=>$('#requisitesSaveStatus').textContent='',2200);
    });
    document.addEventListener('keydown', e=>{
      if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); openCommand(); }
      if(e.key==='Escape'){ closeModal(); closeCommand(); closeSidebar(); }
      if($('#commandPalette').classList.contains('open') && ['ArrowDown','ArrowUp','Enter'].includes(e.key)){
        const items=$$('#commandList .command-item'); if(!items.length)return;
        let idx=items.findIndex(x=>x.classList.contains('active')); if(idx<0)idx=0;
        if(e.key==='ArrowDown') idx=(idx+1)%items.length;
        if(e.key==='ArrowUp') idx=(idx-1+items.length)%items.length;
        if(e.key==='Enter'){ e.preventDefault(); runCommand(items[idx].dataset.command); return; }
        items.forEach((x,i)=>x.classList.toggle('active',i===idx)); e.preventDefault();
      }
    });
  }

  function toggleTheme(){ const order=['light','dark','auto']; prefs.theme=order[(order.indexOf(prefs.theme)+1)%order.length]; savePrefs(); applyPrefs(); renderChart(Number($('#chartPeriod').value||6)); if(prefs.theme==='auto')requestAutoThemeLocation(); else toast(prefs.theme==='dark'?'Тёмная тема включена':'Светлая тема включена'); }

  markBootStage('banks');
  initBelarusBankDatalist();
  markBootStage('prefs');
  applyPrefs();
  markBootStage('theme-watcher');
  startAutoThemeWatcher();
  markBootStage('calculator-state');
  restoreCalculatorInputs();
  markBootStage('ui-state');
  restoreUiState();
  markBootStage('bind');
  bind();
  markBootStage('render');
  renderAll();
  markBootStage('notifications');
  startNotificationWatcher();
  setInterval(()=>{ if(activeView==='orders' && data.orders.some(o=>o.timerStartedAt)) renderOrders(); },60000);
  document.addEventListener('visibilitychange', ()=>{ if(!document.hidden){ checkEventNotifications(); if(prefs.theme==='auto')applyPrefs(); } });
  window.addEventListener('focus', checkEventNotifications);
  const initial = location.hash.replace('#','');
  if (viewTitles[initial]) switchView(initial);
  if (safeSessionGet(RESET_NOTICE_KEY)) { safeSessionRemove(RESET_NOTICE_KEY); toast('BizPilot очищен — можно начинать с нуля'); }
  if (safeSessionGet('bizpilot-demo-started-v2')) { safeSessionRemove('bizpilot-demo-started-v2'); toast('Учебный демо-режим запущен. Рабочие данные сохранены отдельно.'); }
  if (safeSessionGet('bizpilot-demo-ended-v2')) { safeSessionRemove('bizpilot-demo-ended-v2'); toast('Демо завершено. Рабочая область восстановлена.'); }
  if (safeSessionGet('bizpilot-import-notice-v1')) { safeSessionRemove('bizpilot-import-notice-v1'); toast('Все данные восстановлены из ZIP'); }
  markBootStage('ready');
  document.documentElement.dataset.bizpilotBoot='ready';
})();
