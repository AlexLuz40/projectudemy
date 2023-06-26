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

export default modal;
export { closeModal };
export { openModal };