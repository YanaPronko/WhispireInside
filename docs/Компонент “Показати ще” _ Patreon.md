# Компонент “Показати ще”

“ ”
Компонент Показати ще
Фрілансер по життю

15 . 2025 .
апр г

Документація ЧФ

публикация Посмотреть коллекцию
“ ”
Компонент Показати ще дозволяє спочатку приховати частину тексту або
елементів списку показуючи тільки вказану висоту або кількість елементів Є
можливість включати функціонал на певній ширині екра "ну брейкп" оінті
Компонент Спостерігач
Розташування компоненту
" ". …
Компонент СкролДо Плавна
src/components/layout/showmore,
Файли компоненту знаходяться в папці тут ви
“ ”
JS- , HTML- Компонент Показ , а ти ще SCSS-
знайдете файл компоненту файл з прикладом коду а також файл
15 2025
для стилізації компоненту

Використання компоненту
showmore ( ).
У потрібному місці викликати сніпет класи замінити на потрібні Або
data-fls-showmore,
вручну створити структуру де для оболонки доданий атрибут
data-fls-showmore-content data-fls-
для дочірнього елемента і кнопки
showmore-button. hidden
Кнопку спочатку потрібно приховати додавши атрибут
<span> :
і додати два теги з текстом показу та приховування контенту
<div data-fls-showmore class="block">
<div data-fls-showmore-content class="block__content"></div>
<button hidden data-fls-showmore-button type="button"
class="block__more"> <span> </span>
Показати ще
<span> </span> </button>
Приховати
</div>
data-fls-showmore-content
До елемента з атрибутом додаємо текст та інший
, (UL/OL) (LI).
контент або якщо це список елементи списку
Залежно від того який контент використовується текст або елементи списку
data-fls-showmore:
вказуємо значення для атрибута
size – ( )
обмеження по висоті блоку за замовчуванням
items –
обмеження кількості виведених елементів списку
<div data-fls-showmore="items" class="block">
<ul data-fls-showmore-content class="block__content">
<li> №1</li>
Пункт

публикация
<li> №2</li>
Пункт

<li> №3</li>
Пункт
<li> Пункт №4</li> Компонент " Спостерігач "
<li> №5</li>
Пункт
</ul>
" ". …
Компонент СкролДо Плавна
<button hidden data-fls-showmore-button 1 t 3 y аpпрe . 2 = 02 " 5 b г. utton"
class="block__more"> <span> </span>
Показати ще
“ ”
Компонент Показати ще 
<span> </span> </button>
Приховати 15 2025
</div>

, , data-fls-
Залежно від того який тип обрано вказуємо значення для атрибуту
showmore-content :
( px, 150)
Висота блоку у пікселях число без за замовчуванням
( , 3 )
Кількість виведених елементів списку число за замовчуванням
<div data-fls-showmore class="block">
<div data-fls-showmore-content="200" class="block__content"> Lorem
ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis explicabo
voluptates magni culpa, perferendis vel quam consequuntur possimus,
vero placeat quo enim obcaecati quas, veritatis magnam non. Architecto,
porro voluptatum?
</div>
<button hidden data-fls-showmore-button type="button"
class="block__more"> <span> </span>
Показати ще
<span> </span> </button>
Приховати
</div>
, , “ ”
Якщо контент буде меншим ніж зазначене обмеження кнопка Показати ще не
буде показана В іншому випадку контент обмежиться за висотою або за
кількістю елементів і при натисканні на кнопку буде показаний повністю також до
data-fls-showmore --showmore-active
елемента з атрибутом додасться клас
перший спан в кнопці буде прихований а другий показаний Повторний клік
поверне обмеження
Є можливість керувати швидкістю розгортання контенту для цього слід вказати
data-fls-showmore-button (
значення атрибуту у мілісекундах за замовчуванням

публикация
500):

<div data-fls-showmore class="block">
Компонент Спостерігач
<div data-fls-showmore-content="200" clas 13 s ап=р. " 2 b 02 lo 5 гc . k__content"> Lorem
ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis explicabo
" ". …
Компонент СкролДо Плавна
voluptates magni culpa, perferendis vel qua13m
апр
c. 2o02n5 s г.equuntur possimus,
vero placeat quo enim obcaecati quas, veritatis magnam non. Architecto,
“ ”
Компонент Показати ще 
porro voluptatum?
15 2025
</div>
<button hidden data-fls-showmore-button="1000" type="button"

class="block__more"> <span> </span>
Показати ще
<span> </span> </button>
Приховати
</div>
Увімкнення функціоналу на певній ширині екрану
, ’
Для того щоб використовувати функціонал на певній ширині екрана до об єкта з
data-fls-showmore data-fls-showmore-media ,
атрибутом додаємо атрибут де
через кому вказуємо потрібну ширину а також тип
max ( ) –
за замовчуванням функціонал увімкнеться на ширині меншій ніж
зазначена
min –
функціонал увімкнеться на ширині більшій ніж зазначена
<div data-fls-showmore data-fls-showmore-media="768,min"
class="block">
<div data-fls-showmore-content="200" class="block__content"> Lorem
ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis explicabo
voluptates magni culpa, perferendis vel quam consequuntur possimus,
vero placeat quo enim obcaecati quas, veritatis magnam non. Architecto,
porro voluptatum?
</div>
<button hidden data-fls-showmore-button="1000" type="button"
class="block__more"> <span> </span>
Показати ще
<span> </span> </button>
Приховати
</div>

публикация

Комментарии
Компонент Спостерігач
Начните разговор
" ". …
Компонент СкролДо Плавна
“ ”
Компонент Показати ще 
15 2025
Похожие публикации

Макет для тренувань та портфоліо Макет для тренувань та портфоліо
Додаю цікавий макет для тренувань та Додаю цікавий макет для тренувань та
❤ ! ❤ !
портфоліо Дякую за пдтримку каналу портфоліо Дякую за пдтримку каналу
7 . 2025 . 17 0 1 12 0
нояб г января
Популярные публикации
YouTube
#51 ,
Стрім для патронів Друзі щиро вітаю вас з Новим Роком
2026!
04/02/2026
Черговий стрім заплановано о
10:30 ( Київ ) Посилання :… 🎅 Друзі , щиро вітаю вас з Новим Роком 2026!
, …
Хочу нагадати вам що якщо ви сьогодні трохи
3 14 7
февраля
31 . 2025 . 25 2
дек г

публикация

Компонент Спостерігач
" ". …
Компонент СкролДо Плавна
“ ”
Компонент Показати ще 
15 2025

