import { closeModal, openModal } from "./modal";

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
		openModal(); //??

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
			closeModal();
		}, 2000);
	}

}

export default forms;