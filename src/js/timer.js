// Таймер обратного отсчета
// Создай плагин настраиваемого таймера, который ведет обратный отсчет до предварительно определенной даты. Такой плагин может использоваться в блогах и интернет-магазинах, страницах регистрации событий, во время технического обслуживания и т. д.

// Плагин ожидает следующую HTML-разметку и показывает четыре цифры: дни, часы, минуты и секунды в формате XX:XX:XX:XX. Количество дней может состоять из более чем двух цифр.

// Для подсчета значений используй следующие готовые формулы, где time - разница между targetDate и текущей датой.

// Доступы к элементам:
const refs = {
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"]'),
};

const targetDate = new Date(2020, 11, 31, 23, 59, 59); //дата окончания
// console.log(targetDate); //1609451999000

// создаем объект timer с методам start() для запуска таймера:
const timer = {
  intervalId: null, //для остановки интервала сперва нужно получить его Id, затем повесить это свойство на setInterval

  start() {
    updateClock(); //переиспользуем функцию для того, чтобы после запуска страницы сразу запускался таймер, чтобы не видеть в течение 1сек 00:00:00:00

    this.intervalId = setInterval(() => {
      updateClock();
    }, 1000);
  },
};
timer.start();

// для удобства переиспользования выведем данные, которые используются в setInterval в отдельную функцию:
function updateClock() {
  const currentDate = Date.now(); //текущая дата
  // console.log(currentDate);

  const time = targetDate - currentDate;
  // console.log(time);

  setTime(time);

  //когда targetDate достигнут - останавливаем действие setInterval:
  if (time <= 0) {
    console.log('clear');
    clearInterval(this.intervalId);
    this.intervalId = null;
    setTime(0);
  }
}

// Функция для того чтобы формат таймера состоял из указанного количества цифр и каких именно. метод padStart приводит число к строке и изменяет формат:
function pad(value) {
  return String(value).padStart(2, '0');
}

// Функция расчета времени, обурнутая в функцию pad для приведения числа к строке и изменения формата таймера; вызывается в setInterval:
function setTime(time) {
  // оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

  //   оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора остатка % и делим его на количество миллисекунд в одном часе (1000 * 60 * 60 = миллисекунды * минуты * секунды)
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );

  //  оставшиеся минуты: получаем оставшиеся минуты и делим их на количество миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

  //  оставшиеся секунды: получаем оставшиеся секунды и делим их на количество миллисекунд в одной секунде (1000)
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  // привязываем данные к интерфейсу:
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}
