# TumarSystem — дизайн-система

Источник: [Figma · UI Kit/Tokens](https://www.figma.com/design/iYJvQoLZenPc2LoUZdNd1u/TumarSystem-%E2%80%94-Billiards-Club-OS?node-id=7-38247), а также фреймы `UI Kit/States` (`7:37982`) и `UI Kit/Components` (`7:37457`). Значения ниже считаны из фреймов, локальных переменных и компонентов Figma. Единица размеров — CSS px. Тёмная тема основная; светлая присутствует как отдельная коллекция переменных.

## 1. CSS Variables и Tailwind CSS v4

В проекте используется Tailwind CSS v4 (`@import "tailwindcss"`). Семантические цвета следует определять один раз и переключать темой. Значения `@theme inline` дают классы `bg-bg`, `bg-surface`, `text-text`, `text-muted`, `border-border`, `bg-accent` и т. д. Для `dark` класс не нужен: тёмная палитра задана по умолчанию; светлую включает `[data-theme="light"]`.

```css
@import "tailwindcss";

:root, [data-theme="dark"] {
  color-scheme: dark;
  --bg: #0A0F0D;
  --secondary: #0D1511;
  --surface: #111C17;
  --hover: #16251E;
  --border: #25312B;
  --accent: #2FE09B;
  --deep: #1F6B4F;
  --active: #159568;
  --text: #F4F7F5;
  --muted: #96A39C;
  --disabled: #66736C;
  --amber: #E4A72C;
  --red: #D94D45;
  --blue: #438FD1;
  --purple: #8B6CE7;
}

[data-theme="light"] {
  color-scheme: light;
  --bg: #F1F5F2;
  --secondary: #E8EEEA;
  --surface: #FFFFFF;
  --hover: #E7F1EB;
  --border: #CBD7CF;
  --accent: #087B51;
  --deep: #D9F3E5;
  --active: #087B51;
  --text: #15251C;
  --muted: #52645A;
  --disabled: #7B8B80;
  --amber: #936400;
  --red: #BD3F38;
  --blue: #246C9C;
  --purple: #7450BD;
}

@theme inline {
  --color-bg: var(--bg);
  --color-secondary: var(--secondary);
  --color-surface: var(--surface);
  --color-hover: var(--hover);
  --color-border: var(--border);
  --color-accent: var(--accent);
  --color-deep: var(--deep);
  --color-active: var(--active);
  --color-text: var(--text);
  --color-muted: var(--muted);
  --color-disabled: var(--disabled);
  --color-amber: var(--amber);
  --color-red: var(--red);
  --color-blue: var(--blue);
  --color-purple: var(--purple);
  --font-sans: Inter, system-ui, sans-serif;
  --shadow-panel: 0 8px 24px rgb(0 0 0 / 24%);
}
```

В Figma семантические цвета — алиасы коллекций `TumarSystem/Color` и `TumarSystem/Color Light` на коллекцию `TumarSystem/Primitives`. Для интерфейсов используйте семантическое имя; примитивы ниже нужны для точного воспроизведения специальных состояний и составных карточек. Палитра светлой темы считана из переменных, хотя показанные фреймы UI Kit оформлены преимущественно в тёмной теме.

### Примитивы цвета

Имена Figma имеют формат `color/HEX` или `color/HEXA`; последние две цифры у `HEXA` — альфа. В CSS это `#RRGGBBAA`.

```css
:root {
/* Непрозрачные примитивы TumarSystem/Primitives */
--p-0A0F0D: #0A0F0D; --p-F1F5F2: #F1F5F2;
--p-0D1511: #0D1511; --p-E8EEEA: #E8EEEA;
--p-111C17: #111C17; --p-FFFFFF: #FFFFFF;
--p-16251E: #16251E; --p-E7F1EB: #E7F1EB;
--p-25312B: #25312B; --p-CBD7CF: #CBD7CF;
--p-2FE09B: #2FE09B; --p-087B51: #087B51;
--p-1F6B4F: #1F6B4F; --p-D9F3E5: #D9F3E5;
--p-159568: #159568; --p-F4F7F5: #F4F7F5;
--p-15251C: #15251C; --p-96A39C: #96A39C;
--p-52645A: #52645A; --p-66736C: #66736C;
--p-7B8B80: #7B8B80; --p-E4A72C: #E4A72C;
--p-936400: #936400; --p-D94D45: #D94D45;
--p-BD3F38: #BD3F38; --p-438FD1: #438FD1;
--p-246C9C: #246C9C; --p-8B6CE7: #8B6CE7;
--p-7450BD: #7450BD; --p-071B11: #071B11;
--p-1E3529: #1E3529; --p-365D45: #365D45;
--p-244936: #244936; --p-64816B: #64816B;
--p-0A1510: #0A1510; --p-E9ECDD: #E9ECDD;
--p-CBCEA9: #CBCEA9; --p-CED3B0: #CED3B0;
--p-DDE0C4: #DDE0C4; --p-B7AB80: #B7AB80;
--p-26322B: #26322B; --p-3D493F: #3D493F;
--p-30382D: #30382D; --p-29221D: #29221D;
--p-6D3C35: #6D3C35; --p-071A11: #071A11;
--p-94C4AC: #94C4AC; --p-719B83: #719B83;
--p-23372D: #23372D; --p-405548: #405548;
--p-000000: #000000; --p-A4C5B1: #A4C5B1;
--p-E4EBE6: #E4EBE6; --p-E07873: #E07873;
--p-CBA552: #CBA552; --p-1E2418: #1E2418;
--p-4B492B: #4B492B; --p-25211C: #25211C;
--p-222719: #222719; --p-5B8E72: #5B8E72;
--p-1B4433: #1B4433; --p-65A5DB: #65A5DB;
--p-2E4B3C: #2E4B3C; --p-80BCA0: #80BCA0;
--p-34463B: #34463B; --p-324037: #324037;
--p-E77770: #E77770; --p-213128: #213128;
--p-596D61: #596D61; --p-17271E: #17271E;
--p-D9E3DC: #D9E3DC; --p-087A50: #087A50;
--p-819087: #819087;

/* Полупрозрачные примитивы TumarSystem/Primitives */
--p-33E69914: #33E69914; --p-E2A7271A: #E2A7271A;
--p-D84E451A: #D84E451A; --p-4593CE1A: #4593CE1A;
--p-896CEB1A: #896CEB1A; --p-2AD4AA06: #2AD4AA06;
--p-2FDD9A26: #2FDD9A26; --p-D5474712: #D5474712;
--p-E3AA3909: #E3AA3909; --p-DFAA2A18: #DFAA2A18;
--p-33DD990F: #33DD990F; --p-FFFFFF03: #FFFFFF03;
--p-27D89D0D: #27D89D0D; --p-EAAA2A0C: #EAAA2A0C;
--p-E3A52925: #E3A52925; --p-1E695033: #1E695033;
--p-31E19A44: #31E19A44; --p-FFFFFF05: #FFFFFF05;
--p-E3AA2A12: #E3AA2A12; --p-4394D713: #4394D713;
--p-1C6A4E24: #1C6A4E24; --p-206C5040: #206C5040;
--p-2FE19A77: #2FE19A77; --p-1C6E4C25: #1C6E4C25;
--p-1E6B5066: #1E6B5066; --p-30E19C55: #30E19C55;
--p-D146460B: #D146460B; --p-DA4F4344: #DA4F4344;
--p-111B1666: #111B1666; --p-478ED512: #478ED512;
--p-DDAA330F: #DDAA330F; --p-9362001A: #9362001A;
}
```

### Отступы, радиусы, тени

На фрейме `Tokens` показана основная шкала отступов **4, 8, 12, 16, 20, 24, 32, 48** px и радиусы **8, 12, 16** px. Локальная коллекция `TumarSystem/Spacing & Radius` содержит более подробные значения для точного повторения элементов:

```css
:root {
/* spacing/N = N px */
--space-0: 0px; --space-1: 1px; --space-2: 2px; --space-3: 3px;
--space-4: 4px; --space-5: 5px; --space-6: 6px; --space-7: 7px;
--space-8: 8px; --space-9: 9px; --space-10: 10px; --space-11: 11px;
--space-12: 12px; --space-13: 13px; --space-14: 14px; --space-15: 15px;
--space-16: 16px; --space-17: 17px; --space-18: 18px;
--space-20: 20px; --space-22: 22px; --space-24: 24px;
--space-25: 25px; --space-28: 28px; --space-32: 32px;
--space-40: 40px; --space-48: 48px; --space-64: 64px;

/* radius/N = N px */
--radius-0: 0px; --radius-2: 2px; --radius-3: 3px;
--radius-4: 4px; --radius-5: 5px; --radius-6: 6px;
--radius-7: 7px; --radius-8: 8px; --radius-9: 9px;
--radius-10: 10px; --radius-11: 11px; --radius-12: 12px;
--radius-13: 13px; --radius-14: 14px; --radius-15: 15px;
--radius-16: 16px; --radius-20: 20px; --radius-22: 22px;
--radius-24: 24px; --radius-50: 50px; --radius-pill: 999px;
--shadow-panel: 0 8px 24px rgb(0 0 0 / 24%);
}
```

Числовые имена Tailwind уже используют шаги собственной шкалы; для точного пиксельного значения берите arbitrary value (`gap-[20px]`, `rounded-[12px]`) или собственные CSS Variables. `--radius-pill` соответствует переменной Figma `radius/999`.

### Типографика

Шрифт — **Inter**. В образцах `Tokens` трекинг равен 0. Размеры/интерлиньяж ниже взяты с текстовых слоёв; надпись Body в макете округляет 22,5 до 23.

| Роль | Размер / line-height | Вес | Пример Tailwind |
| --- | --- | --- | --- |
| Display | 36 / 54 | 500 | `text-[36px]/[54px] font-medium` |
| Heading | 28 / 42 | 500 | `text-[28px]/[42px] font-medium` |
| Title | 20 / 30 | 500 | `text-[20px]/[30px] font-medium` |
| Body | 15 / 22.5 | 400 | `text-[15px]/[22.5px] font-normal` |
| Caption | 12 / 18 | 400 | `text-[12px]/[18px] font-normal` |
| Label | 10 / 15 | 400 | `text-[10px]/[15px] font-normal uppercase` |

В файле также существуют локальные `TumarSystem/Type/*` для размеров **7–54 px** и весов Regular/Medium/SemiBold/Bold. Это стили конкретных экранов, тогда как таблица выше — шесть явно показанных ролей UI Kit.

### Сетка, оболочка, движение

- Контрольные размеры: desktop **1440 × 900** и **1280 × 720**, mobile **390 × 844**. Фреймы UI Kit имеют ширину 1440; боковая панель 232 px, верхняя панель 76 px.
- Фон приложения — `--bg`; вторичный слой — `--secondary`; панели/карточки — `--surface` с рамкой `--border`. При наведении используется `--hover`, активные действия — `--accent`/`--active`.
- Переходы интерактивных состояний: **160–240 мс**, `ease-out`; при `prefers-reduced-motion: reduce` отключать необязательную анимацию.
- Числа времени, суммы и статусы должны оставаться читаемыми в узких карточках; сохраняйте контраст текста и фонового статуса в обеих темах.
- Знак бренда: геометрия тумара, абстрактная «T», ассоциации с сукном, кием и шаром. Использовать исходный вектор `Brand/Logo`, не заменять текстовым символом.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { scroll-behavior: auto !important; animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

## 2. Компоненты

Названия соответствуют наборам компонентов на странице Figma `UI Kit`. Размеры — размеры исходных вариантов, не обязательная фиксированная ширина при использовании в продукте.

| Компонент | Варианты и спецификация |
| --- | --- |
| `Brand/Logo` | Default; векторный знак + `TumarSystem` + подпись `BILLIARDS CLUB OS`; горизонтальный gap 10 px. |
| `Button/Primary` | 9 общих состояний; 40 px высота, радиус 8, padding 10/15 px, gap 8; default `--accent` и тёмный текст `#071B11`. |
| `Button/Secondary` | 9 состояний; 40 px, радиус 8; `--surface`, рамка `--border`, текст `--text`. |
| `Button/Icon` | 9 состояний; геометрия 40 px и вторичная палитра, иконка вместе с текстом в исходном варианте. |
| `Button/Destructive` | 9 состояний; 40 px, радиус 8; `#29221D`, рамка `#6D3C35`, текст `--red`. |
| `Mobile/Button` | Default; 350 × 47, радиус 10, `--accent`, padding 10/14. |
| `Input/Field` | 9 состояний; 250 × 64 включая label; gap 6; поле 41 px, `--secondary`, рамка `--border`, радиус 8. |
| `Input/Search` | 9 состояний; 250 × 36; поле 36 px, радиус 7, иконка поиска 16 px. |
| `Input/Select` | 9 состояний; 250 × 64; label + выбор стола, структура как у Field. |
| `Input/DatePicker` | 9 состояний; 250 × 65; label + дата. |
| `Input/TimePicker` | 9 состояний; 250 × 65; label + время. |
| `Control/Checkbox` | 9 состояний; контроль 13 × 13, радиус 3, строка 20 px, gap 12. Selected — `--accent`. |
| `Control/Radio` | 9 состояний; контроль 13 × 13, круглый, строка 20 px, gap 12. Selected — `--accent`. |
| `Control/Toggle` | 9 состояний; трек 32 × 19, круглый, ручка 13 × 13; Off — `--border`, On — `--active`. |
| `Navigation/Tab` | 9 состояний; образец 84 × 29, радиус 5; выбранная вкладка `--hover` + `--text`. |
| `Badge/green`, `Badge/amber`, `Badge/red`, `Badge/blue`, `Badge/gray`, `Badge/purple` | Default; высота 22, радиус 5. Подложки соответственно `#33E69914`, `#E2A7271A`, `#D84E451A`, `#4593CE1A`, `--hover`, `#896CEB1A`. Цвет текста — соответствующий семантический акцент. |
| `KPI/Card` | Default; 276 × 128, `--surface`, рамка `--border`, радиус 12; заголовок, крупное значение, изменение. |
| `Mobile/KPI` | Default; 170 × 105, рамка, радиус 12; компактное значение/доля. |
| `Panel/Header` | Default; заголовок и действия/переключатели, горизонтальный gap 12. |
| `Table/Card` | `busy`, `free`, `reserved`, `service`; 278 × 181, рамка, радиус 12; номер и вид стола, badge, таймер/цена/управление. |
| `Mobile/TableCard` | Default; 170 × 226, рамка, радиус 12; вертикальная карточка стола. |
| `Table/Details` | Default; 302 × 735, рамка, радиус 14; подробности стола и управление сессией. |
| `Table/Row` | Default; 1110 × 53, строка журнала/таблицы. |
| `POS/Product` | Default; 252 × 164, рамка, радиус 12; название, цена, остаток. |
| `POS/Receipt` | Default; 350 × 688, рамка, радиус 14; номер чека, клиент, позиции, итог и оплата. |
| `Kitchen/Order` | Default; 160 × 278, рамка, радиус 9; номер, стол, время, позиции и статус приготовления. |
| `Lighting/Zone` | `Active`, `Off`; 373 × 211, рамка, радиус 13; число включённых ламп и управление зоной. |
| `Booking/Card` | Default; 350 × 237, рамка, радиус 12; время, длительность, подтверждение, гость и действия. |
| `Menu/Dropdown` | Default; 373 × 128, рамка, радиус 14; список контекстных действий. |
| `Notice/Banner` | Default; 350 × 70, радиус 10, padding 12, gap 9; подложка `#2AD4AA06`, рамка `#2FDD9A26`. |
| `System/State` | 12 вариантов: `loading`, `empty`, `error`, `offline`, `controller`, `permission`, `shift`, `printer`, `booking`, `payment`, `success`, `pending`; образец 373 × 253, рамка, радиус 12, padding 22, вертикальный gap 12. |

**Общая модель 9 интерактивных состояний:** `Default`, `Hover`, `Pressed`, `Focus`, `Selected`, `Disabled`, `Loading`, `Error`, `Success`. Она применяется к кнопкам, вводам, вкладке, toggle, checkbox и radio. Варианты `Disabled` и `Loading` должны блокировать повторное действие, а `Focus` должен быть доступен с клавиатуры. Фрейм показывает `Hover` как `--hover`, `Pressed` как `--deep`, `Focus`/`Success` как акцентную рамку, `Error` как красную рамку. Для `Navigation/Tab` в выбранном состоянии текст `--text`, в обычном — `--muted`. У `Input/Field` фокус/успех обводятся акцентом, ошибка — красным; внутреннее поле остаётся `--secondary`.

```css
.ui-button { min-height: 40px; padding: 10px 15px; border: 1px solid; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; transition: background-color 200ms ease-out, border-color 200ms ease-out; }
.ui-button--primary { background: var(--accent); border-color: var(--accent); color: #071B11; }
.ui-button--secondary { background: var(--surface); border-color: var(--border); color: var(--text); }
.ui-button--destructive { background: #29221D; border-color: #6D3C35; color: var(--red); }
.ui-button:hover:not(:disabled) { background: var(--hover); }
.ui-button:active:not(:disabled) { background: var(--deep); }
.ui-button:focus-visible, .ui-field:focus-within { outline: 2px solid var(--accent); outline-offset: 2px; }
.ui-button:disabled { cursor: not-allowed; opacity: .5; }
.ui-button[aria-busy="true"] { cursor: progress; }
.ui-button[data-state="error"], .ui-field[aria-invalid="true"] { border-color: var(--red); }
.ui-button[data-state="success"] { border-color: var(--accent); }
.ui-card { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; }
```

Этот CSS — отправная точка. В Figma `Button/Primary` при Hover получает тёмную заливку `#16251E`, но текст остаётся `#071B11`; перед буквальным переносом проверьте контраст и при необходимости задайте `--text` для hover. Некоторые Figma-варианты `Disabled` и `Loading` повторяют базовые цвета, поэтому поведение, курсор, доступность и индикатор ожидания здесь заданы как правила реализации.

### Статусы предметной области

- Стол: **Занят** (red), **Свободен** (green), **Бронь** (amber), **Обслуживание** (blue), **Нет ответа** (ошибка/связь). Не выводить «выключен» по отсутствию ответа контроллера.
- Лампа/сессия: `OFF`, `STANDBY`, `RESERVED`, `ACTIVE`, `PAUSED`, `CLEANING`, `SERVICE`, `ERROR`. Цвет показывает состояние, текст остаётся обязательным.
- Для карточек столов показывать номер, тип/размер, статус и применимые действия; для занятого — таймер, сумму, гостя и состояние света; для свободного — тариф и «Начать игру».
- В составных компонентах использовать статусный badge, а не одну только цветную рамку. Суммы — в сомах, время с ведущими нулями (`01:36:00`, `21:00`).

## 3. Состояния системы и тексты действий

`System/State` строится как **заголовок → объяснение причины и последствий → одно конкретное действие**. Сохраняйте смысл сообщений из `UI Kit/States`:

| Вариант | Заголовок / ключевое правило | Действие |
| --- | --- | --- |
| `loading` | Загрузка зала; ожидание подтверждённых состояний 12 столов. | Дождаться ответа |
| `empty` | На сегодня броней нет; свободные столы доступны. | Создать бронь |
| `error` | Сервер клуба недоступен; локальный адрес не ответил за 5 секунд. | Повторить запрос |
| `offline` | Нет интернета; клуб работает в локальной сети, чек сохраняется на устройстве. | Проверить соединение |
| `controller` | Контроллер не отвечает; показывать последнее известное состояние лампы и время ответа. | Повторить команду |
| `permission` | Недостаточно прав; возврат доступен владельцу и администратору. | Сменить роль |
| `shift` | Смена закрыта; перед игрой/оплатой открыть смену и указать разменный фонд. | Открыть смену |
| `printer` | Принтер не подключён; оплата сохранена, электронный чек доступен. | Повторить печать |
| `booking` | Время занято; назвать конфликтующий стол/интервал и доступную альтернативу. | Выбрать другой стол |
| `payment` | Оплата не подтверждена; чек открыт, свет остаётся включённым. | Проверить статус |
| `success` | Оплата прошла; показать номер чека, сумму и задержку отключения света (в макете 25 секунд). | Вернуться в зал |
| `pending` | Чек ожидает синхронизации; локальную оплату отправить один раз после подключения. | Проверить очередь |

Для сетевых и аппаратных ошибок показывайте фактическую причину, последнее достоверное состояние и безопасное следующее действие. Для платежа и синхронизации не сообщайте об успехе до подтверждения, не создавайте повторный чек при повторах.

## 4. Соответствие текущему проекту

Текущий [`frontend/src/app/globals.css`](frontend/src/app/globals.css) уже использует Tailwind v4 и тёмный интерфейс страницы входа, но часть его цветов (`#0B1310`, `#00A86B` и др.) отличается от коллекции Figma. При расширении приложения подключайте семантические переменные из раздела 1 и мигрируйте существующие значения осознанно: `DESIGN.md` фиксирует макет, а не утверждает, что код уже приведён к нему.
