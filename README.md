# UzStack

Корпоративный сайт: Astro + TypeScript, статическая сборка без backend, UI-фреймворков, внешних шрифтов и аналитики. Основной язык — русский. Опубликован через Cloudflare Pages.

- Проект Pages: `uzstack-website`.
- Адрес Pages: https://uzstack-website.pages.dev/
- Основной домен: https://uzstack.uz/
- Репозиторий: https://github.com/yakhya-khan/uzstack-website
- Push в `main` автоматически запускает production-сборку и публикацию. Проверяйте изменения локально до отправки.

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

## Cloudflare Pages

Настройки сверены с [инструкцией Astro для Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) и [документацией build image](https://developers.cloudflare.com/pages/configuration/build-image/).

1. После проверки изменений отправьте согласованный код в `yakhya-khan/uzstack-website`.
2. Для повторной настройки откройте **Workers & Pages → Create application → Continue to Pages**, выберите импорт Git-репозитория и `yakhya-khan/uzstack-website`. Доступ GitHub-приложения Cloudflare должен быть ограничен нужным репозиторием.
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
6. Домен `uzstack.uz` добавлен через **Custom domains**. Cloudflare создал запись `CNAME @ → uzstack-website.pages.dev`, Proxy status **Proxied**, TTL **Auto**. При повторной настройке сначала проверьте существующие записи; не создавайте дубликаты.

Не нужны адаптер Cloudflare, Worker, база данных, секреты или Wrangler. Canonical и sitemap указывают основной домен `https://uzstack.uz/`. Для предварительных развёртываний проверьте доступ и индексацию в Cloudflare перед публикацией; `robots.txt` основного сайта разрешает индексацию.

### Перенаправление www

В DNS-зоне настроена запись `A www → 192.0.2.1`, **Proxied**, TTL **Auto**. Это служебный адрес для редиректа на стороне Cloudflare, а не адрес сервера сайта; проксирование должно оставаться включённым.

В **Rules → Redirect Rules** включён Single Redirect `WWW to uzstack.uz`:

- Request URL: `http*://www.uzstack.uz/*`.
- Target URL: `https://uzstack.uz/${2}`.
- Status code: `301 — Permanent Redirect`.
- Preserve query string: включено.

Правило охватывает HTTP и HTTPS, сохраняет путь и параметры запроса. `www` не требуется добавлять как второй сайт в Pages. Проверены переходы с главной страницы, `/sitemap.xml?source=www-check&value=a%20b` по HTTPS и `/robots.txt?source=www-check` по HTTP на соответствующие адреса `https://uzstack.uz/`. Настройка следует [документации Cloudflare по перенаправлению доменов](https://developers.cloudflare.com/fundamentals/manage-domains/redirect-domain/).

## Проверки первой версии

- `npm run check` и `npm run build`.
- Chromium/Edge: ширины 320, 375, 390, 650, 768, 900, 1024 и 1440 px, отсутствие горизонтальной прокрутки.
- Обе темы, сохранение выбора, системная тема, мобильное меню, Escape, якоря, навигация без JavaScript.
- Проверка axe-core по WCAG A/AA в обеих темах; она не заменяет полноценный ручной аудит.
- Загрузка SVG, PNG, robots и sitemap; отсутствие браузерных ошибок.

Временные QA-скрипты и скриншоты находятся в игнорируемом `.qa/`; используют инструменты рабочей среды и не входят в зависимости сайта. Числовые оценки Lighthouse не заявляются: Lighthouse не запускался.

## Контент для дальнейшего уточнения

Предоставить действующий канал обращений; обновлять публичные описания и статусы продуктов по мере готовности; решить вопрос дополнительных языков. Планируемый `info@uzstack.uz` не отображается. Неработающих форм и кнопок скачивания нет. Первая публикация через Pages и подключение домена выполнены по явному запросу владельца.
