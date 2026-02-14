# Робота з HTML. Огляд функціоналу.

HTML. .
Робота з Огляд функціоналу
Фрілансер по життю
22 1
10 . 2025 .
апр г

Документація ЧФ

публикация Посмотреть коллекцию
" " 4 HTML-
В збірці Чертоги Фрілансера інтегровані широкі можливості роботи з
файлами які за бажанням можна використовувати під час розробки того чи
. ,…
Робота зі шрифтами Локальні
іншого проєкту
HTML-
Підключення окремих файлів . …
Робота зі стилями Файли
HTML-
В процесі розробки конструкцій часто виникають ситуації коли є потреба
HTML. …
Робота з Огляд
перевикористати той чи інший відрізок коду в різних місцях особливо
4.
враховуючи компонентний підхід ЧФ
" " (include).
Для вирішення цих задач інтегрований функціонал Вставка

<include src=" HTML- "></include>
шлях до файлу
<head>,
Давайте розглянемо цей функціонал на простому прикладі блоків
<header> <footer> , HTML- :
та проєкту які мають бути підключені на усіх сторінках
<!doctype html>
<html lang="en">
<!-- head -->
підключення
<include src="@components/layout/head/head.html"></include>
<body>
<div class="wrapper">
<!-- header -->
підключення
<include src="@components/layout/header/header.html"></include>
<main class="page"> <!-- --> </main>
контент сторінки
<!-- footer -->
підключення
<include src="@components/layout/footer/footer.html"></include>
</div>
<script type="module" src="@js/app.js"></script>
</body>
</html>
, , header.html,
Таким чином редагуючи файл компонента наприклад зміни
відбудуться по всьому сайту де цей компонент підключений
HTML-
Використання шаблонів
, HTML-
Для більш складних та великих проєктів буде зручно використовувати
шаблони (templates). Зберігаються шабло 4 н 1 и п увб плиакпацциі яsrc/components/templates.
Звісно можна додавати свої

. ,…
Робота зі шрифтами Локальні
Давайте розглянемо приклад коли на сайті є різ 10 н апі рс . 2 т 0 р 2 у 5 кг. тури - на головній сторінці
і ще декількох немає бокової панелі а ще на декількох є Відповідно ми можемо
. …
Робота зі стилями Файли
підготувати і потім використовувати різні ст
а
р
пр
н. 225а г.блони
main.html:
Ось приклад шаблону HTML. …
Робота з Огляд
<!doctype html>
<html lang="en">

<include src="@components/layout/head/head.html"></include>
<link rel="stylesheet" href="@components/templates/main/main.scss">
<body>
<div class="wrapper">
<block name="header"></block>
<block name="main"></block>
<block name="footer"></block> </div> <block name="popup"></block>
<script type="module" src="@js/app.js"></script>
</body>
</html>
inner.html:
Ось приклад шаблону
<!doctype html>
<html lang="en">
<include src="@components/layout/head/head.html"></include>
<link rel="stylesheet" href="@components/templates/inner/inner.scss">
<body>
<div class="wrapper">
<block name="header"></block>
<div class="inner">
<block name="main"></block>
<block name="aside"></block>
</div>
<block name="footer"></block>
</div>
<block name="popup"></block> 41
публикация
<script type="module" src="@js/app.js"></script>

</body>
. ,…
Робота зі шрифтами Локальні
</html>
. …
Робота зі стилями Файли
Ми бачемо що структура цих шаблонів відрізняється та до кожного підключений
свій унікальний файл стилів
HTML. …
Робота з Огляд
<block name=" ' "> - 10 апр . 2025 г. " " 
ім я блоку це комірка в яку ми можемо вкладати потрібний
контент

(index.html)
Ось приклад головной сторінки яка використовує шаблон
"main.html":
<template src="@components/templates/main/main.html">
<block name="header">
<include src="@components/layout/header/header.html"></include>
</block>
<block name="main">
<include src="@components/pages/home/home.html"></include>
</block>
<block name="footer">
<include src="@components/layout/footer/footer.html"></include>
</block>
<block name="popup"></block>
</template>
(contacts.html)
А ось приклад внутрішньої сторінки яка будується по шаблону
"inner.html":
<template src="@components/templates/inner/inner.html">
<block name="header">
<include src="@components/layout/header/header.html"></include>
</block>
<div class="inner">
<block name="main">
<include src="@components/pages/contacts/contacts.html"></include>
</block>

публикация
<block name="aside">

<include src="@components/layout/aside/aside.html"></include>
. ,…
Робота зі шрифтами Локальні
</block>
</div>
. …
Робота зі стилями Файли
<block name="footer">
<include src="@components/layout/footer/footer.html"></include>
</block> Робота з HTML. Огляд …
<block name="popup"></block>
</template>

Як ми бачимо в комірки шаблону вставлені різні компоненти в тому числі
- @components/pages/home/home.html
головний контент конкретної сторінки
@components/pages/contacts/contacts.html
та
HTML-
Використання елементів програмування в файлах
include template HTML- ,
Використання та дуже допомагають в роботі з файлами а
щоб можливості були ще ширші я додав елементи програмування
Використання змінних
4 HTML- ,
В ЧФ є можливість передавати дані в окремі файли підключені через
include template, locals ( )
та за допомогою змінних
head include
Наприклад ми підключаємо сайту за допомогою і на тій чи іншій
( " "), <title>.
сторінці наприклад Контакти хочемо вивести відповідний текст у тег
JSON:
Для цього передаємо дані у форматі
<!DOCTYPE html>
<html lang="uk">
<include src="@components/layout/head/head.html"
locals='{"title":" "}'></include>
Контакти
<body>
<div class="wrapper">
<include src="@components/layout/header/header.html"></include>
<include src="@components/pages/home/home.html"></include>
<include src="@components/layout/footer/footer.html"></include>

</div> публикация
</body>

</html> Робота зі шрифтами . Локальні ,…
head.html <title>
А у файлі у тегу виводимо змінну у подвійних квадратних дужках
. …
Робота зі стилями Файли
[[...]]:
<head> HTML. …
Робота з Огляд
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="@styles/style.scss">

<title>[[title]]</title>
</head>
Результат
Таким чином можна передавати і виводити безліч інформації
<!DOCTYPE html>
<html lang="uk">
<include src="@components/layout/head/head.html" locals='{
"title":" ",
Контакти
"keywords":" , , ...",
ключове слово ключове слово ключове слово
"description":" ..."
опис сторінки
}'></include>
<body>
<div class="wrapper">
<include src="@components/layout/header/header.html"></include>
<include src="@components/pages/home/home.html"></include>
<include src="@components/layout/footer/footer.html"></include>
</div>
</body>
</html>

публикация
Використання умов

. ,…
Робота зі шрифтами Локальні
(locals)
Передача інформації за допомогою змінних відкриває ще ширші
<if> <elseif> <else>
можливості разом з умовним вітвленням
. …
Робота зі стилями Файли
Наприклад нам необхідно додати клас пункту меню який відповідає сторінці
. Р оhбeотaаd зe HrT.hMtLm. Оl гля д … locals:
сайту Для цього передаємо інформацію у файл за допомогою
<!DOCTYPE html>
<html lang="en">

<include src="@components/layout/head/head.html" locals='{"title":"Home
Page"}'></include>
<body>
<div class="wrapper">
<include src="@components/layout/header/header.html"
locals='{"active":"Home"}'></include>
<include src="@components/pages/home/home.html"></include>
<include src="@components/layout/footer/footer.html"></include>
</div>
</body>
</html>
header.html, , :
У файлі при побудові меню використовуємо умову
<div class="header__menu menu">
<button type="button" data-fls-menu class="menu__icon icon-menu">
<span></span></button>
<nav class="menu__body">
<ul class="menu__list">
<if condition="'[[active]]' === 'Home'">
<li class="menu__item"><a href="#" class="menu__link menu__link--
active">Home</a></li>
</if>
<else>
<li class="menu__item"><a href="[[item.href]]"
class="menu__link">Home</a></li>
</else> 41
публикация

</ul>
. ,…
Робота зі шрифтами Локальні
</nav>
</div>
. …
Робота зі стилями Файли
Використання циклів
HTML. …
Робота з Огляд
Для додаткової оптимізації побудов конструкцій додана можливість використання
<each>.
циклів

Ост приклад побудови меню за допомогою циклу на основі певного масиву
даних
<div class="header__menu menu">
<button type="button" data-fls-menu class="menu__icon icon-menu">
<span></span></button>
<nav class="menu__body">
<ul class="menu__list">
<each loop='item in [
{"href": "#","ancor": "Home"},
{"href": "#","ancor": "About"},
{"href": "#","ancor": "Blog"},
{"href": "#","ancor": "Contacts"}
]'>
<if condition="'[[active]]' === '[[item.ancor]]'">
<li class="menu__item">
<a href="[[item.href]]" class="menu__link menu__link--active">
[[item.ancor]]</a>
</li>
</if>
<else>
<li class="menu__item">
<a href="[[item.href]]" class="menu__link">[[item.ancor]]</a>
</li>
</else>
</each>

публикация
</ul>
</nav>

. ,…
</div> Робота зі шрифтами Локальні
4 HTML
Налаштування ЧФ для роботи з . …
Робота зі стилями Файли
4 html :
У файлі налаштувань ЧФ в розділі ви знайдете
HTML. …
Робота з Огляд
beautify -
налаштування форматування в режимі продакшн
enable -
вмикач

indent -
тип відступів

комментарий
Присоединиться к обсуждению
Misha · 9 .
мес
" " 3
Фрілансер по життю
Похожие публикации
GitHub
Завантаження на Як боротися з синдромом самозванця
" " 4 - ,
В стартовому шаблоні Чертоги Фрілансера Якщо ви коли небудь ловили себе на думці що
( 4) … « », « »…
ЧФ є можливість автоматичного я тут випадково я недостатньо розумний
12 . 2025 . 9 0 15 . 2025 . 15 0
апр г 41 дек г
публикация

. ,…
Робота зі шрифтами Локальні
Популярные публикации
. …
Робота зі стилями Файли
HTML. …
Робота з Огляд
YouTube

#51 ,
Стрім для патронів Друзі щиро вітаю вас з Новим Роком
2026!
04/02/2026
Черговий стрім заплановано о
10:30 ( Київ ) Посилання :… 🎅 Друзі , щиро вітаю вас з Новим Роком 2026!
, …
3 14 7 Хочу нагадати вам що якщо ви сьогодні трохи
февраля
31 . 2025 . 25 2
дек г

публикация

. ,…
Робота зі шрифтами Локальні
. …
Робота зі стилями Файли
HTML. …
Робота з Огляд

