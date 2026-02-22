# Whispers Inside Landing

Лендинг психологических консультаций и услуг Таро на базе шаблона FLS (Vite + Nunjucks + SCSS + JS + PHP mail handler).

## Что реализовано

- Главный экран с CTA и плавным скроллом к форме.
- Секции: `О психологе`, `Пространство работы`, `Услуги`, `Форма записи`, `Отзывы`, `FAQ`, `Footer`.
- Светлая и темная темы.
- Адаптив под desktop / tablet / mobile.
- Валидация формы (имя, телефон по коду страны, email, дата не в прошлом).
- Отправка формы через PHP + PHPMailer (SMTP).
- Попапы успешной/ошибочной отправки.
- SEO-база:
  - meta title/description,
  - Open Graph / Twitter,
  - canonical,
  - `robots.txt`, `sitemap.xml`,
  - Schema.org (`WebSite`, `ProfessionalService`, `FAQPage`).
- Технические улучшения для Core Web Vitals:
  - preload hero image,
  - фикс размеров ключевых изображений (снижение CLS),
  - reduced-motion fallback.

## Стек

- FLS template (Vite build pipeline)
- HTML (Nunjucks templates)
- SCSS
- Vanilla JS
- PHP (PHPMailer)

## Основные команды

```bash
npm install
npm run dev
npm run build
npm run preview
```

Дополнительно (FLS):

- `npm run zip` — сборка + архив
- `npm run deploy` — FTP деплой (при настройке)
- `npm run wp` / `npm run wpbuild` — режим WordPress

## Структура (основное)

- `src/index.html` — входная страница лендинга
- `src/components/pages/index/index.html` — контент главной
- `src/components/pages/index/index.scss` — стили секций главной
- `src/components/layout/head/head.html` — head/meta/preload
- `src/components/layout/header/header.html` — шапка
- `src/components/layout/footer/footer.html` — футер и контакты
- `src/components/forms/form/*` — форма и логика
- `src/php/sendmail/index.php` — обработчик формы
- `src/php/sendmail/config.php` — SMTP-конфигурация PHPMailer

## Настройка отправки формы (SMTP)

Проект читает переменные из `.env` (в корне). Пример:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_ENCRYPTION=starttls
SMTP_USERNAME=your_email@example.com
SMTP_PASSWORD=your_app_password

SMTP_FROM_NAME=Шепот внутри
SMTP_TO=your_email@example.com
SMTP_SUBJECT=Новая заявка на консультацию
```

Без корректных SMTP-переменных форма не отправит письмо.

## Контент и ссылки

- Основной домен: `https://whispersinside.com/`
- Политика конфиденциальности: `privacy.html`
- Контакты и соцсети находятся в футере.

## Примечание

`README.TXT` в корне — служебный файл от исходного FLS-шаблона.  
Актуальное описание этого проекта находится в `README.md`.

