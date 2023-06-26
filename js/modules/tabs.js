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

export default tabs;