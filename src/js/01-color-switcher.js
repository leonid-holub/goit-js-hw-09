const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
startBtn.style.width = '100px';
stopBtn.style.width = '100px';
startBtn.style.height = '50px';
stopBtn.style.height = '50px';
startBtn.style.marginTop = '500px';
startBtn.style.marginLeft = 'calc(50% - 125px)';
startBtn.style.marginRight = '50px';

let randomHexColor;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const chengBodyColor = () => {
  randomHexColor = getRandomHexColor();
  body.style.backgroundColor = randomHexColor;
};

let intervalOfChenging;

const chengingBodyColors = () => {
  chengBodyColor();
  intervalOfChenging = setInterval(chengBodyColor, 1000);
};

startBtn.addEventListener('click', event => {
  event.currentTarget.setAttribute('disabled', '');
  chengingBodyColors();
});

const stopChangingBodyColors = () => {
  clearInterval(intervalOfChenging);
};

stopBtn.addEventListener('click', () => {
  startBtn.removeAttribute('disabled');
  stopChangingBodyColors();
});
