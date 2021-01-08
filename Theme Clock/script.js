const themeSwitch = document.getElementById('theme-switch');
const analogClock = document.getElementById('analog-clock');
const digitalClock = document.getElementById('digital-clock');
const date = document.getElementById('date');
const domElements = [
  document.body,
  themeSwitch,
  analogClock,
  digitalClock,
  date,
];

const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

themeSwitch.addEventListener('click', (event) => {
  let themeToSwitch;

  if (themeSwitch.getAttribute('data-theme') === 'dark') {
    themeToSwitch = 'light';
    event.target.innerText = 'Dark mode';
  } else {
    themeToSwitch = 'dark';
    event.target.innerText = 'Light mode';
  }

  domElements.forEach((element) => {
    element.setAttribute('data-theme', themeToSwitch);
  });
});

function getDateData() {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const date = new Date();

  const dayMinPeriod = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const month = date.toLocaleString('en-US', { month: 'short' });

  const hour = date
    .toLocaleString('en-US', { hour: 'numeric', hour12: true })
    .split(' ')[0];

  return {
    dayName: days[date.getDay()],
    dayNum: date.getDay(),
    month: month,
    dayMinPeriod: dayMinPeriod,
    hour: hour,
    minute: date.getMinutes(),
    second: date.getSeconds(),
  };
}

function updateTimeClock() {
  let {
    dayName,
    dayNum,
    month,
    dayMinPeriod,
    hour,
    minute,
    second,
  } = getDateData();

  secondRotation = second * 6; // 6 degree per second
  minuteRotation = minute * 6 + 0.1 * second; // 6deg per minute plus 6/60 deg per second
  hourRotation = hour * 30 + minute * 0.5; // 30deg per hour, 30/60 deg per minute

  hourHand.style.transform = `rotateZ(${hourRotation}deg)`;
  minuteHand.style.transform = `rotateZ(${minuteRotation}deg)`;
  secondHand.style.transform = `rotateZ(${secondRotation}deg)`;
  digitalClock.innerText = dayMinPeriod;
  date.children[0].innerText = dayName;
  date.children[1].innerText = month;
  date.children[2].innerText = dayNum;
}

setInterval(updateTimeClock, 1000);
