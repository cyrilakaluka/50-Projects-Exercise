const button = document.getElementById('button');
const notificationBox = document.getElementById('notification-box');

const notificationsTypes = ['success', 'error', 'warning', 'info'];
const messages = [
  'Message One',
  'Message Two',
  'Message Three',
  'Message Four',
];

// Clear notification box
notificationBox.innerHTML = '';

button.addEventListener('click', () => {
  let type =
    notificationsTypes[getRandomNumber(0, notificationsTypes.length - 1)];
  let message = messages[getRandomNumber(0, messages.length - 1)];

  const notification = document.createElement('div');
  notification.classList.add('notification', `notification--${type}`);
  notification.innerText = message;
  notification.style.transition = `opacity 3s linear`;
  notificationBox.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = 0;
  }, 3000);

  setTimeout(() => {
    notification.remove();
  }, 6000);
});

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
