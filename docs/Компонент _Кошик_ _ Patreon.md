# Компонент _Кошик_

Компонент Кошик
Фрілансер по життю

23 . 2025 .
апр г

Документація ЧФ

публикация Посмотреть коллекцию
" " 4 ( 4)
В стартовому шаблоні Чертоги Фрілансера ЧФ реалізований функціонал
о о е до що б
, 20 апр . 2025 г. 
додавання товарів в кошик з можливістю анімації зображення товару
Компонент Хедер
Розташування компоненту
Файли компоненту знаходяться в папці
src/comКоpмoпnоeнеnнtтs "/Дfеoнrьm/ Нsіч/a" ddtocart,
тут ви
JS- , HTML- , SCSS-
знайдете файл компоненту файл з прикладом коду а також файл
для стилізації компоненту " "
Компонент Кошик
Використання компоненту

HTML '
В беспосередньо до об єкту який виводить кількість товарів в кошику
- data-fls-addtocart:
додайте дата атрибут
<div class="cart">
<span class="cart__quantity" data-fls-addtocart>0</span>
</div>
" ", " " - data-fls-
Для кнопки Купити Додати у кошик тощо додайте дата атрибут
addtocart-button:
<button data-fls-addtocart-button> </button>
Додати у кошик
Для використання додаткового функціоналу додаємо обгортку товару що
, - data-fls-addtocart-product:
додається в кошик з дата атрибутом
<div data-fls-addtocart-product class="product">
<button data-fls-addtocart-button> </button>
Додати в кошик
</div>
Тепер ми маємо можливість додати керування кількістю товарів які будуть додані у
. - data-fls-addtocart-quantity
кошик Для цього необхідно додати дата атрибут для
<input> , " " 4
тегу який керує кількістю або використати компонент Кількість ЧФ теж
data-fls-addtocart-quantity:
з додаванням
<div data-fls-addtocart-product class="product">
<input data-fls-addtocart-quantity autocomplete="off" type="text"

публикация
name="form[]" value="1">
о о е до що б
<button data-fls-addtocart-button> 20 апр. 2025 г<. /button> 
Додати у кошик
</div>
Компонент Хедер
Або
" / "
Компонент День Ніч
<div data-fls-addtocart-product class="pro2d2 u ап c р. t2"0>25 г.

Компонент Кошик
<div data-fls-quantity class="quantity">
<button data-fls-quantity-minus type="button" class="quantity__button
quantity__button--minus"></button>

<div class="quantity__input">
<input data-fls-addtocart-quantity data-fls-quantity-value
autocomplete="off" type="text" name="form[]" value="1">
</div>
<button data-fls-quantity-plus type="button" class="quantity__button
quantity__button--plus"></button>
</div>
<button data-fls-addtocart-button> </button>
Додати у кошик
</div>
Також є можливість анімувати зображення товару створюючи політ у кошик Для
<img> - data-fls-addtocart-image:
цього тегу товару додайте дата трибут
<div data-fls-addtocart-product class="product">
<img src="..." data-fls-addtocart-image alt="Image">
<button data-fls-addtocart-button> </button>
Додати у кошик
</div>
data-fls-
Для керуванням швидкістю анімації додайте значення атрибуту
addtocart-image ( 500ms):
у мілісекундах за замовченням
<div data-fls-addtocart-product class="product">
<img src="..." data-fls-addtocart-image="1000" alt="Image">
<button data-fls-addtocart-button> </button>
Додати у кошик
</div>

публикация
о о е до що б
Компонент Хедер
Комментарии
" / "
Компонент День Ніч
Начните разговор ... 22 апр. 2025 г.

Компонент Кошик

Похожие публикации
DevTools "Debonaire"
Як економить нам години Макет для тренувань
(DevTools) Chrome "Hairstylist"
Інструменти розробника у Макет для тренувань Можливо
- … - !
чи іншому браузері це реальний зверстаю під час майстер класу
22 . 2025 . 10 0 13 . 2024 . 20 3
дек г июн г
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
о о е до що б
Компонент Хедер
" / "
Компонент День Ніч

Компонент Кошик

