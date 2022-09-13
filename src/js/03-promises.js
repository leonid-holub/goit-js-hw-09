import { Notify } from 'notiflix/build/notiflix-notify-aio';
const controlPanel = document.querySelector('form.form');
const delayPanel = document.querySelector('input[name="delay"]');
const stepPanel = document.querySelector('input[name="step"]');
const amountPanel = document.querySelector('input[name="amount"]');
const submitBtn = document.querySelector('button[type="submit"]');

submitBtn.addEventListener('click', event => {
  event.preventDefault();
  setTimeout(() => {
    for (let i = 0; i < amountPanel.value; i++) {
      const currentDelay =
        Number(delayPanel.value) + Number(stepPanel.value) * i;
      const position = i + 1;
      createPromise(position, currentDelay)
        .then(result => Notify.success(result))
        .catch(error => Notify.failure(error));
    }
  }, delayPanel.value);

  const overageDelay =
    (Number(amountPanel.value) - 1) * Number(stepPanel.value) +
    Number(delayPanel.value);
  function disabledBtn() {
    if (overageDelay > 0) {
      submitBtn.setAttribute('disabled', '');
      setTimeout(() => {
        submitBtn.removeAttribute('disabled');
      }, overageDelay);
    } else {
      return;
    }
  }
  disabledBtn();
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
        // Fulfill
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
        // Reject
      }
    }, delay - delayPanel.value);
  });
}

// Стилізація
controlPanel.style.fontFamily = 'montsserat';
controlPanel.style.fontSize = '24px';
controlPanel.style.display = 'flex';
controlPanel.style.direction = 'column';
controlPanel.style.width = '800px';
submitBtn.style.width = '200px';
submitBtn.style.marginLeft = '50px';
submitBtn.style.fontSize = '20px';
