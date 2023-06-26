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

export default timer;