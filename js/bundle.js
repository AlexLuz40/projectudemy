/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./JSONUdemy/js/modules/calc.js":
/*!**************************************!*\
  !*** ./JSONUdemy/js/modules/calc.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
	//--------------------------------------Calc-------------------------
	const result = document.querySelector('.calculating__result span');

	let sex, height, weight, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('ratio', '1.375');
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		});
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = '____';
			return; //  если хотя бы одного параметра не будет то у мы увидим "____"  а return  рросто остановит функцию и пока она не будет введена полностью дальше она не пройдет
		}

		if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}

	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {
				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}

				elements.forEach(elem => {
					elem.classList.remove(activeClass);
				});
				e.target.classList.add(activeClass);

				calcTotal();
			});
		});
	}

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			if (input.value.match(/\D/g)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}

			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			calcTotal();
		});
	}

	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./JSONUdemy/js/modules/cards.js":
/*!***************************************!*\
  !*** ./JSONUdemy/js/modules/cards.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./JSONUdemy/js/modules/forms.js":
/*!***************************************!*\
  !*** ./JSONUdemy/js/modules/forms.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./JSONUdemy/js/modules/modal.js");


function forms() {
	// Forms

	const forms = document.querySelectorAll('form');

	const message = { //  сoздаем себе список ответов сервера клиенту для того чтобы ему было понятно что происходит
		loading: 'img/form/spinner.svg', // перевод 'загрузка'
		success: 'Thank you! We will contact you soon', // успех: Спасибо мы с вами свяжимся в ближайшее время
		failure: 'Something went wrong...' // сбой: что то пошло ни так...
	};
	forms.forEach(item => { // т.к. у нас в проекте форм много(больше одной), то мы должны подвезять нашу ф-цию postData() для каждой из них
		bindPostData(item);
	});

	const postData = async (url, data) => {  //async и await работают в паре(если мы их не укажем то пока сервер будет нам отправлять ответ переменная  res  получит  underfined, а await не дает res  принять ответ пока он не придет от сервера)
		const res = await fetch(url, {
			method: 'POST',       //  сбор и подгодовка данных для отправки на сервер
			headers: {           //   когда мы используем JSON используется заголовок
				'Content-type': 'application/json'
			},
			body: data
		});

		return await res.json(); //  то же ждет пока обработается метод json 
	};

	function bindPostData(form) {   // form - данные от пользователя(если я правильно понял)
		form.addEventListener('submit', (e) => {  // событие submit будет срабатывать тогда, когда мы будем пытаться отрправить форму
			e.preventDefault();   //  отменяем стандартное пведение браузера(т.е. он не будет перегружаться)

			//*  добавляем спинер к нашей форме в конце блока формы внизу в центре
			const statusMessage = document.createElement('img');//  создаем блок который будет появляться динамически(т.е. будет окно например с сообщением или картинка да что угодно)
			statusMessage.src = message.loading; // добавляем нашу картинку пока сервер грузится
			statusMessage.style.cssText = `  
				display: block;
				margin: 0 auto;
      		`; // пока сервер будет грузит данные мы просто выведим на экран  спинер к нашей форме в конце блока формы внизу в центре
			//form.append(statusMessage); //  добавляем наше сообщение к форме для того чтобы пользователь его увидел(т.е. при сборе данных создасться новый блок с текстом loading, но так как мы изменили и поставили заместо loadind  картинку то будет картинка)
			form.insertAdjacentElement('afterend', statusMessage); // а с помощью этой команды мы спинер(картинку) или текст добавляем к нашей форме(форма с данными)
			//*

			//** собираем данные от пользователя(которые он ввел) переводим их в JSON формат, отправляем и принимаем ответ
			const formData = new FormData(form); //  FormData(form)- это специальный объект, который позволяет нам с определенной формы быстро сформировать все данные которые заполнил пользователь     обязательно в HTML  верстке ДОЛЖЕН БЫТЬ атрибут name
			// const object = {}; // -- это старая запись(начало)
			// formData.forEach(function (value, key) {
			// 	object[key] = value;
			// });// -- это старая запись(конец)
			const json = JSON.stringify(Object.fromEntries(formData.entries())); //Object.fromEntries()- превращает массив массивов в классический объект -  метод обратный entries() (entries - метод который превращает объект в массив массивов) 
			//                     это была старая запись
			// fetch('server.php', {   //  сбор и подгодовка данных для отправки на сервер
			// 	method: 'POST',       //  сбор и подгодовка данных для отправки на сервер
			// 	headers: {           //   когда мы используем JSON используется заголовок
			// 		'Content-type': 'application/json'
			// 	},
			// 	body: JSON.stringify(object) // превращает обычный объект в объект JSON формата
			// })
			//                       это новая с использованием новой функции postData
			postData(' http://localhost:3000/requests', json) //  и заместо server.php записали  http://localhost:3000/requests, а заместо JSON.stringify(object) у нас  json
				// .then(data => data.text()) // чтобы понять какой ответ приходит от сервера нам нужно этот ответ модифицировать (т.к. это ни JSON, то мы используем - data => data.text()- превращаем ответ сервера в текст)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);//  получили ответ от сервера(пользователь видет сообщение 'Thank you! We will contact you soon')        
					statusMessage.remove(); // удаляем наш спинер, т.к. все загрузилось
				}).catch(() => {
					showThanksModal(message.failure); // если была ошибка то сработает этот блок
				}).finally(() => {
					form.reset();// очищает форму(от введенных данных)
				});
			//**
		});
	}
	//***  создаем функцию по созданию модального окна для ответа пользователю
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(); //??

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
			<div class="modal__close" data-close>×</div>
			<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove(); //  через 2000мсек будем удалять thanksModal
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
		}, 2000);
	}

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./JSONUdemy/js/modules/modal.js":
/*!***************************************!*\
  !*** ./JSONUdemy/js/modules/modal.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
// функция которая закрывает модальное окно
function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('hide');
	modal.classList.remove('show');
	document.body.style.overflow = '';
}

// функция которая вызывает модальное окно
function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);

	modal.classList.add('show');
	modal.classList.remove('hide');
	document.body.style.overflow = 'hidden';//это свойство запрещает прокручивать страницу

	console.log(modalTimerId);
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}

}

function modal(triggerSelector, modalSelector, modalTimerId) {
	// Modal(модальное окно)

	const modalTrigger = document.querySelectorAll(triggerSelector),// элементы(кнопки в нашем примере) с дата атрибутом, создаем псевдомассив
		modal = document.querySelector(modalSelector),
		modalCloseBtn = document.querySelector('[data-close]');

	//а это событие которое вызывает модальное окно
	modalTrigger.forEach(elem => {
		elem.addEventListener('click', () => openModal(modalSelector, modalTimerId));// навешиваем событие на каждую кнопку
	});

	modalCloseBtn.addEventListener('click', closeModal);
	// при нажатии на область вне модального окна , оно(модальное окно) будет закрыто
	modal.addEventListener('click', (event) => {
		if (event.target === modal) { //????
			closeModal(modalSelector);
		}
	});
	//  при нажатии кнопки escape  мы закроем модальное окно при условии(что будет нажата кнопка escape и модальное окно имеет класс show(т.е. будет вызвано модальное окно))
	document.addEventListener('keydown', (event) => {
		if (event.code === 'Escape' && modal.classList.contains('show')) { //????
			closeModal(modalSelector);
		}
	});


	// при прокрутки страницы вниз до самого конца будет вызвана модальное окно
	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./JSONUdemy/js/modules/slides.js":
/*!****************************************!*\
  !*** ./JSONUdemy/js/modules/slides.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slides() {
	// -----------------------------slider-----------------------------
	const slides = document.querySelectorAll('.offer__slide'),
		slider = document.querySelector('.offer__slider'),
		prev = document.querySelector('.offer__slider-prev'),
		next = document.querySelector('.offer__slider-next'),
		total = document.querySelector('#total'),
		current = document.querySelector('#current'),
		slidesWrapper = document.querySelector('.offer__slider-wrapper'),
		slidesField = document.querySelector('.offer__slider-inner'),
		width = window.getComputedStyle(slidesWrapper).width;

	let slideIndex = 1,
		offset = 0;

	// ----------------------------------------- 2. вариант()

	if (slides.length < 10) { //  общее число т.е. мы видим общее число слайдов которое расположено над ними (написано 04)
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}


	slidesField.style.width = 100 * slides.length + '%'; // устанавливаем длину нашей невидомой "карусели" - 400%(т.к. у нас 4 слайда)

	slidesField.style.display = 'flex'; // уствнавливаем наши слайды один за одним
	slidesField.style.transition = '0.5s all';

	slidesWrapper.style.overflow = 'hidden'; // скрываем все элементы которые не попадают в зону видимости

	slides.forEach(slide => {
		slide.style.width = width; // делаем наши слайды одинаковой ширины
	});
	// ---------------- создаем навигацию(т.е. будут черточки внизу слайда)
	slider.style.position = 'relative';
	const indicators = document.createElement('ol'),
		dots = [];
	// indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 15;
		display: flex;
		justify-content: center;
		margin-right: 15%;
		margin-left: 15%;
		list-style: none;
		padding-bottom: 8px;
	`;
	slider.append(indicators);
	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
			box-sizing: content-box;
			flex: 0 1 auto;
			width: 30px;
			height: 6px;
			margin-right: 3px;
			margin-left: 3px;
			cursor: pointer;
			background-color: #fff;
			background-clip: padding-box;
			border-top: 10px solid transparent;
			opacity: 0.25;
			transition: opacity .6s ease;
		`;
		if (i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}
	function dotsOppasity() { // моя функция
		dots.forEach(dot => dot.style.opacity = '.25');
		dots[slideIndex - 1].style.opacity = '1';
	}
	//-----------------------------------------
	function valueCurrent() { // и это моя функция 
		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	function regFunc(str) {
		return +str.replace(/\D/g, '');//
	}

	next.addEventListener('click', () => {
		if (offset == regFunc(width) * (slides.length - 1)) { // т.к. в переменой width у нас имеется например  '500px',  то мы должны избавиться от px  и делаем это при помощи slice(), width.length - 2 -  отрезаем два последних элемента от этой строки
			offset = 0;
		} else {
			offset += regFunc(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}
		valueCurrent();
		// if (slides.length < 10) {
		// 	current.textContent = `0${slideIndex}`;
		// } else {
		// 	current.textContent = slideIndex;
		// }
		dotsOppasity();
		// dots.forEach(dot => dot.style.opacity = '.25');
		// dots[slideIndex - 1].style.opacity = '1';
	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = regFunc(width) * (slides.length - 1);
		} else {
			offset -= regFunc(width);
		}

		if (slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}
		valueCurrent();
		// if (slides.length < 10) {
		// 	current.textContent = `0${slideIndex}`;
		// } else {
		// 	current.textContent = slideIndex;
		// }
		slidesField.style.transform = `translateX(-${offset}px)`;
		dotsOppasity();
		// dots.forEach(dot => dot.style.opacity = '.25');
		// dots[slideIndex - 1].style.opacity = '1';
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = regFunc(width) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;
			valueCurrent();
			// if (slides.length < 10) {
			// 	current.textContent = `0${slideIndex}`;
			// } else {
			// 	current.textContent = slideIndex;
			// }
			dotsOppasity();
			// dots.forEach(dot => dot.style.opacity = '.25');
			// dots[slideIndex - 1].style.opacity = '1';
		});
	});

	// ----------------------------------------- 1. вариант(простой)
	// showSlides(slideIndex);

	// if (slides.length < 10) { //  общее число
	// 	total.textContent = `0${slides.length}`;
	// } else {
	// 	total.textContent = slides.length;
	// }

	// function showSlides(n) {
	// 	if (n > slides.length) { // условие если мы нажимаем на стрелку вправо а картинки закончились
	// 		slideIndex = 1;
	// 	}

	// 	if (n < 1) {  // условие если мы нажимаем на стрелку влево а картинки закончились
	// 		slideIndex = slides.length;
	// 	}

	// 	slides.forEach(item => item.style.display = 'none'); // скрываем все слайды

	// 	slides[slideIndex - 1].style.display = 'block'; //  показываем первый слайд

	// 	if (slides.length < 10) {  // индекс конкретного слайда
	// 		current.textContent = `0${slideIndex}`;
	// 	} 	else {
	// 		current.textContent = slideIndex;
	// 	}
	// }

	// function plusSlides(n) {
	// 	showSlides(slideIndex += n);
	// }

	// prev.addEventListener('click', () => {
	// 	plusSlides(-1);
	// });

	// next.addEventListener('click', () => {
	// 	plusSlides(1);
	// });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slides);

/***/ }),

/***/ "./JSONUdemy/js/modules/tabs.js":
/*!**************************************!*\
  !*** ./JSONUdemy/js/modules/tabs.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
	// Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabsContent() {

		tabsContent.forEach(item => {
			// item.style.display = 'none'; //  эта функция будет скрывать табы(вкладки) из  зоны видимости при помощи стилей
			item.classList.add('hide');//  при помощи класса
			item.classList.remove('show', 'fade'); //  при помощи класса 
		});

		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active'); // 
		});
	}

	// function showTabsContent(i) {  // это  первый способ ни много устарел но актуален(т.е. простой способ без параметра по умолчанию)
	//   tabsContent[i].style.display = 'block';
	//   tabs[i].classList.add('tabheader__item_active');
	// }

	// hideTabsContent();
	// showTabsContent(0);

	function showTabsContent(i = 0) { // новая возможности давать значение по умолчанию(т.е. если мы в вызове функции не укажем параметр то по умолчанию будет равен 0 (i = 0))
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');

		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabsContent();
	showTabsContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target; // чтобы часто не писать эту конструкцию

		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) { // target - элемент на который кликнул пользователь, и если этот эелемент совпал с item  нашего перебераемого спискаб то вызываются 2 функци
					hideTabsContent();
					showTabsContent(i);
				}
			});
		}
	});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./JSONUdemy/js/modules/timer.js":
/*!***************************************!*\
  !*** ./JSONUdemy/js/modules/timer.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
	// Timer создание обратного счетчика

	const deadLine = '2023-08-01';

	function getTimeRemaining(endTime) {
		let days, hours, minutes, seconds;
		const dayOff = Date.parse(endTime) - Date.parse(new Date());

		if (dayOff < 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor(dayOff / (1000 * 60 * 60 * 24)),
				hours = Math.floor((dayOff / (1000 * 60 * 60) % 24)),
				minutes = Math.floor((dayOff / 1000 / 60) % 60),
				seconds = Math.floor((dayOff / 1000) % 60);
		}


		return {
			'total': dayOff,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}
	function setClock(selector, endTime) {
		const timer = document.querySelector(selector),
			// eslint-disable-next-line no-undef
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();
		function updateClock() {
			const dayOff = getTimeRemaining(endTime);

			days.innerHTML = getZero(dayOff.days);
			hours.innerHTML = getZero(dayOff.hours);
			minutes.innerHTML = getZero(dayOff.minutes);
			seconds.innerHTML = getZero(dayOff.seconds);

			if (dayOff.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', deadLine);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./JSONUdemy/js/script.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./JSONUdemy/js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./JSONUdemy/js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./JSONUdemy/js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./JSONUdemy/js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./JSONUdemy/js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./JSONUdemy/js/modules/forms.js");
/* harmony import */ var _modules_slides__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slides */ "./JSONUdemy/js/modules/slides.js");









// const { from } = require("webpack-sources/lib/compatsource");

window.addEventListener('DOMContentLoaded', () => {
	const modalTimerId = setInterval(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 30000); // включаем сет интервал, который будет вызывать модальное окно через 5сек(в нашем примере), но т.к. мы указываем выше clearInterval  при вызове модального окна, то оно сработает 1 раз (либо через 5 секунд если клиент сам не вызовет это модальное окно)

	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId);
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])();
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
	(0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])();
	(0,_modules_slides__WEBPACK_IMPORTED_MODULE_6__["default"])();

});

//***
// fetch('http://localhost:3000/menu') // тут было снчачало 'db.json' но потом мы скопировали с терминала http://localhost:3000/menu адресс после ввода  npx json-server JSONUdemy/db.json
// 	.then(data => data.json())
// 	.then(res => console.log(res));





})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map