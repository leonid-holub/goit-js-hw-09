import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Підключення та налаштування флетпікера
import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';

let endTime;
let startTime;
let timeDiference;
let convertedMs;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    goalDate = selectedDates[0];
    endTime = goalDate.getTime();
    startTime = Date.now();
    timeDiference = endTime - startTime;
    convertedMs = convertMs(timeDiference);
    if (timeDiference > 0) {
      startBtn.removeAttribute('disabled');
    } else {
      startBtn.classList.remove('stop');
      startBtn.textContent = 'Start';
      Notify.failure('Please choose a date in the future');
      daysDiference.textContent = '00';
      hoursDiference.textContent = '00';
      minutesDiference.textContent = '00';
      secondsDiference.textContent = '00';
    }
  },
  onOpen() {
    startBtn.setAttribute('disabled', '');
  },
};
flatpickr('#datetime-picker', options);

// Присвоєння змінних кожному елементу-учаснику
const startBtn = document.querySelector('button[data-start]');
const daysDiference = document.querySelector('[data-days]');
const hoursDiference = document.querySelector('[data-hours]');
const minutesDiference = document.querySelector('[data-minutes]');
const secondsDiference = document.querySelector('[data-seconds]');

// Функція конвертування часу в (DD, HH, MM, SS)
function pad(value) {
  return String(value).padStart(2, '0');
}
// Реалізація завдання
let timeInterval;
const stopTimeInterval = () => {
  clearInterval(timeInterval);
};
startBtn.setAttribute('disabled', '');
startBtn.addEventListener('click', () => {
  if (!startBtn.classList.contains('stop')) {
    startBtn.classList.toggle('stop');
    startBtn.textContent = 'Stop';
    startBtn.style.backgroundColor = 'rgb(255, 127, 85)';
    const comparingTime = () => {
      endTime = goalDate.getTime();
      startTime = Date.now();
      timeDiference = endTime - startTime;
      convertedMs = convertMs(timeDiference);
      console.log(
        'Цей лог показує, що при 00:00:00:00 інтервал зупиняється і не виконується'
      );
      if (timeDiference > 0) {
        daysDiference.textContent = pad(convertedMs.days);
        hoursDiference.textContent = pad(convertedMs.hours);
        minutesDiference.textContent = pad(convertedMs.minutes);
        secondsDiference.textContent = pad(convertedMs.seconds);
      } else {
        stopTimeInterval();
      }
    };
    comparingTime();
    timeInterval = setInterval(comparingTime, 1000);
  } else {
    startBtn.classList.toggle('stop');
    startBtn.textContent = 'Start';
    startBtn.style.backgroundColor = 'rgb(178, 253, 35)';
    stopTimeInterval();
  }
});

// Функція конвертування часу в (D, H, M, S)
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Стилізація
const body = document.querySelector('body');
const timeWrapper = document.querySelector('div.timer');
body.style.fontFamily = 'montserrat';
startBtn.style.fontFamily = 'inherit';
startBtn.style.width = '150px';
startBtn.style.backgroundColor = 'rgb(178, 253, 35)';
startBtn.style.borderWidth = '2px';
startBtn.style.borderRadius = '5px';
startBtn.style.borderColor = 'silver';
timeWrapper.style.display = 'flex';
timeWrapper.style.flexDirection = 'row';
timeWrapper.style.gap = '18px';
timeWrapper.style.fontSize = '20px';
daysDiference.style.display = 'block';
daysDiference.style.textAlign = 'center';
daysDiference.style.fontSize = '30px';
hoursDiference.style.display = 'block';
hoursDiference.style.textAlign = 'center';
hoursDiference.style.fontSize = '30px';
minutesDiference.style.display = 'block';
minutesDiference.style.textAlign = 'center';
minutesDiference.style.fontSize = '30px';
secondsDiference.style.display = 'block';
secondsDiference.style.textAlign = 'center';
secondsDiference.style.fontSize = '30px';
