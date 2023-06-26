import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slides from './modules/slides';
import { openModal } from './modules/modal';

// const { from } = require("webpack-sources/lib/compatsource");

window.addEventListener('DOMContentLoaded', () => {
	const modalTimerId = setInterval(() => openModal('.modal', modalTimerId), 30000); // включаем сет интервал, который будет вызывать модальное окно через 5сек(в нашем примере), но т.к. мы указываем выше clearInterval  при вызове модального окна, то оно сработает 1 раз (либо через 5 секунд если клиент сам не вызовет это модальное окно)

	tabs();
	modal('[data-modal]', '.modal', modalTimerId);
	timer();
	cards();
	calc();
	forms();
	slides();

});

//***
// fetch('http://localhost:3000/menu') // тут было снчачало 'db.json' но потом мы скопировали с терминала http://localhost:3000/menu адресс после ввода  npx json-server JSONUdemy/db.json
// 	.then(data => data.json())
// 	.then(res => console.log(res));




