function cards() {
	// Используем классы для карточек  урок 79 и добавляем урок 80(который будет добавлять классы в виде rest оператора)
	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {  // ...classes - rest оператор (80 урок)
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;  //  цена в долларах например
			this.classes = classes; // урок 80  тут мы добавляем класс
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;  //  1$ =  27 укр.гривень
			this.changeToUAH(); // используем метод сразу
		}
		changeToUAH() {
			return this.price = this.transfer * this.price; // полчучаем цену в гривнах, которая потом перезаписывается уже в this.price = price; 
		}
		render() {
			const element = document.createElement('div');
			if (this.classes.length == 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				// this.classes.forEach((className) => {  // это длинная запись
				//   element.classList.add(className);
				// });
				this.classes.forEach(className => element.classList.add(className));
			}
			element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
      `;
			this.parent.append(element);
		}
	}

	// const getResource = async (url) => {  //async и await работают в паре(если мы их не укажем то пока сервер будет нам отправлять ответ переменная  res  получит  underfined, а await не дает res  принять ответ пока он не придет от сервера), data в Get запросах нам не нужна так как мы тольок поучаем данные с сервера
	// 	const res = await fetch(url);

	// 	if (!res.ok) {
	// 		throw new Error(`Could not fetch${url}, status${res.status}`);// вручную создаем ошибку
	// 	}

	// 	return await res.json(); //  то же ждет пока обработается метод json 
	// };
	//  ------------------------ это решение Ивана
	// getResource('http://localhost:3000/menu') // эта функция заменила строки 216-245
	// 	.then(data => {
	// 		data.forEach(({img, altimg, title, descr, price}) => {
	// 			new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
	// 		});
	// 	});
	//  ------------------------это при подключении библиотеки (смотри  html  верстку 274 строка)
	axios.get('http://localhost:3000/menu')
		.then(data => {
			data.data.forEach(({ img, altimg, title, descr, price }) => { // почему 2 data? первая это из нашего условия а вторая из возврата данных библиотеки
				new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
			});
		});

	//если нам надо один раз только создать динамически то делаем так:
	// getResource('http://localhost:3000/menu')
	// 	.then(data => creatCard(data));

	// function creatCard(data) {
	// 	data.forEach(({ img, altimg, title, descr, price }) => {
	// 		const element = document.createElement('div');

	// 		element.classList.add('menu__item');
	// 		price = price * 27;
	// 		element.innerHTML = `
	// 			<img src=${img} alt=${altimg}>
	// 			<h3 class="menu__item-subtitle">${title}</h3>
	// 			<div class="menu__item-descr">${descr}</div>
	// 			<div class="menu__item-divider"></div>
	// 			<div class="menu__item-price">
	// 				<div class="menu__item-cost">Цена:</div>
	// 				<div class="menu__item-total"><span>${price}</span> грн/день</div>
	// 			</div>
	// 		`;

	// 		document.querySelector('.menu .container').append(element);
	// 	});
	// }
	// new MenuCard(
	// 	'img/tabs/vegy.jpg', //  src
	// 	'vegy',              //  alt
	// 	'Меню "Фитнес"',     //  title
	// 	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', //  descr
	// 	9,                   //  price 
	// 	'.menu .container',  //  parentSelector
	// 	'menu__item',        //  ...classes (rest оператор)
	// 	'newClass'           //  ...classes (rest оператор)
	// ).render(); // это сокращенная форма, можно было так  const div = new MenuCard(); div.render();

	// new MenuCard(
	// 	'img/tabs/elite.jpg',  //  src
	// 	'elite',               //  alt
	// 	'Меню “Премиум”',      //  title
	// 	'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',  //  descr
	// 	14,                    //  price
	// 	'.menu .container',    //  parentSelector
	// 	//тут я удалил класс для того чтобы увидеть как сработало наше условие если класс не был добавлен(условие строка 280 - 288)          //  ...classes (rest оператор)

	// ).render();
	// new MenuCard(
	// 	'img/tabs/post.jpg',   //  src
	// 	'post',                //  alt
	// 	'Меню "Постное"',      //  title
	// 	'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',  //  descr
	// 	21,                    //  price
	// 	'.menu .container',    //  parentSelector
	// 	'menu__item'           //  ...classes (rest оператор)
	// ).render();
}

export default cards;