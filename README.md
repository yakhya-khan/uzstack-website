# UzStack

Корпоративный сайт: Astro + TypeScript, статическая сборка без backend, UI-фреймворков, внешних шрифтов и аналитики. Основной язык — русский. Подготовлен для Cloudflare Pages, но не опубликован.

## Установка и запуск

Требуется Node.js **24.19.0** (зафиксирован в `.node-version`) с npm. Минимальная версия Node.js для выбранной версии Astro — 22.22.0.

```sh
npm ci
npm run dev
```

Откройте `http://localhost:4321`. Если порт занят, Astro выведет фактический адрес в терминале.

```sh
npm run check    # Проверка Astro и TypeScript
npm run build    # Статический сайт в dist/
npm run preview  # Просмотр собранного сайта
```

`package-lock.json` фиксирует зависимости. В среде Codex Desktop этой сессии npm отсутствовал в PATH, поэтому использовалась временная копия: `node "$env:TEMP/uzstack-npm/package/bin/npm-cli.js" run build` (PowerShell). Обычной установке Node.js этот обход не нужен.

## Структура

```text
src/
  components/Icon.astro       — SVG-иконки
  data/site.ts                — бренд, контакты, русские тексты
  layouts/Layout.astro        — HTML, метаданные, ранняя установка темы
  pages/index.astro           — лендинг
  pages/robots.txt.ts         — robots.txt
  pages/sitemap.xml.ts        — sitemap.xml
  scripts/navigation.ts       — темы и мобильное меню
  styles/global.css           — токены, компоненты, адаптивные стили
public/
  favicon.svg                 — оригинальный знак из трёх слоёв
  brand/stack-architecture.svg — авторская иллюстрация
  brand/og-image.svg           — исходник социального превью
  brand/og-image.png           — социальное превью 1200 × 630
  _headers                    — заголовки Cloudflare Pages
docs/
  PROJECT_BRIEF.md            — техническое задание
  CONTENT_NOTES.md            — источники текста и открытые вопросы
```

Тексты меняйте в `src/data/site.ts`. Объект `site` содержит общие данные, `ru` — локализованный контент. Для узбекского (латиница) и английского можно добавить словари и языковые маршруты; текущий сайт русскоязычный. При добавлении маршрутов обновите sitemap, canonical и hreflang.

Тема следует настройке ОС. Кнопка сохраняет выбор в `localStorage`; без доступа к хранилищу переключение продолжает работать. Без JavaScript разделы и навигация доступны, а тема определяется CSS-настройкой ОС. Поддерживаются клавиатурная навигация, Escape для закрытия меню, ссылка пропуска навигации и `prefers-reduced-motion`.

## Cloudflare Pages — после разрешения на публикацию

Настройки сверены с [инструкцией Astro для Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) и [документацией build image](https://developers.cloudflare.com/pages/configuration/build-image/).

1. После проверки изменений отправьте согласованный код в `yakhya-khan/uzstack-website`.
2. В Cloudflare откройте **Workers & Pages → Create application → Pages → Connect to Git** и выберите репозиторий.
3. Укажите параметры:

   | Параметр | Значение |
   | --- | --- |
   | Production branch | `main` |
   | Framework preset | `Astro` |
   | Root directory | корень репозитория, поле оставить пустым |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Environment variable | `NODE_VERSION=24.19.0` |

4. **Save and Deploy публикует сайт** и включает последующие сборки при push. Выполняйте этот шаг только после явного согласования публикации.
5. Проверьте адрес `*.pages.dev`: разделы, мобильное меню, темы, GitHub-ссылку, `/robots.txt`, `/sitemap.xml`, `/brand/og-image.png`.
6. Подключайте `uzstack.uz` через **Custom domains** только после отдельного согласования. DNS в этой работе не изменялся.

Не нужны адаптер Cloudflare, Worker, база данных, секреты или Wrangler. Canonical и sitemap указывают будущий основной домен `https://uzstack.uz/`. Для предварительных развёртываний проверьте доступ и индексацию в Cloudflare перед публикацией; `robots.txt` основного сайта разрешает индексацию.

## Проверки первой версии

- `npm run check` и `npm run build`.
- Chromium/Edge: ширины 320, 375, 390, 650, 768, 900, 1024 и 1440 px, отсутствие горизонтальной прокрутки.
- Обе темы, сохранение выбора, системная тема, мобильное меню, Escape, якоря, навигация без JavaScript.
- Проверка axe-core по WCAG A/AA в обеих темах; она не заменяет полноценный ручной аудит.
- Загрузка SVG, PNG, robots и sitemap; отсутствие браузерных ошибок.

Временные QA-скрипты и скриншоты находятся в игнорируемом `.qa/`; используют инструменты рабочей среды и не входят в зависимости сайта. Числовые оценки Lighthouse не заявляются: Lighthouse не запускался.

## Перед запуском

Согласовать логотип и тексты; предоставить действующий канал обращений; подтвердить публичные описания и статусы продуктов; решить вопрос языков; отдельно разрешить подключение Pages, публикацию и домен. Планируемый `info@uzstack.uz` не отображается. Неработающих форм и кнопок скачивания нет.
