const timeEl = document.querySelector('.time')
const dateEl = document.querySelector('.date')

// Wed Apr 16 2025 21:37:32 GMT-0400 (Eastern Daylight Time)

function updateClock(){
  const today = new Date();
  const day = today.toLocaleDateString('en-US', {weekday : 'long'});
  const dayNumber = today.getDate()
  const month = today.toLocaleDateString('en-US', {month : 'long'});
  const year = today.getFullYear()

  const seconds = today.getSeconds().toString().padStart(2, '0');
  const minutes = today.getMinutes().toString().padStart(2, '0');
  const hours = today.getHours().toString().padStart(2, '0');

  dateEl.innerHTML = `${day}, ${month} ${dayNumber}, ${year}`
  timeEl.innerHTML = `${hours}:${minutes}:${seconds}`
}

setInterval(updateClock, 1000)

updateClock();