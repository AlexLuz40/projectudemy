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

export default slides;