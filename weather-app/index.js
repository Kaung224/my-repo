const iconEl = document.querySelector('.icon')
const cityEl = document.querySelector('.city')
const tempEl = document.querySelector('.temp')
const weatherConditionEl = document.querySelector('.weather-condition')
const weatherConatinerEl = document.querySelectorAll('.furture')
const invalidEl = document.querySelector('.invalid')

const searchBtnEl = document.querySelector('.search-button');

const inputEl = document.querySelector('.input')

const apiKey = '3a7b88e1ecf36f7fc8cb8056e0790608';
const url = 'https://api.openweathermap.org/data/2.5/weather?'

fetchWeatherData('Toronto');

async function fetchWeatherData(value){
  try{
    const response = await fetch(url + `q=${value}&units=metric&` + `appid=${apiKey}`)
    const data = await response.json();
    cityEl.innerHTML = data.name;
    tempEl.innerHTML = `Temperature: ${Math.round(data.main.temp)}°C`
    weatherConditionEl.innerHTML = data.weather[0].description;
    iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`

    console.log(data)
    changeBackground(data.weather[0].main);
    console.log(data.weather[0].main)
    
    const furtureResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&units=metric&appid=3a7b88e1ecf36f7fc8cb8056e0790608`)
    const furturedata = await furtureResponse.json();

    weatherConatinerEl.forEach((day, index) => {
      const forecast = furturedata.list[(index) * 8]
      const dayTime = new Date(forecast.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
      day.querySelector('.day').innerHTML = dayTime;
      day.querySelector('.upcoming-temp').innerHTML = `${Math.round(forecast.main.temp)}°C`
      day.querySelector('.f-icon').src = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`
      day.querySelector('.f-icon').style.height = '50px';
      day.querySelector('.f-icon').style.width = '50px';
    })

    inputEl.value = '';
    invalidEl.innerHTML = ''
    document.querySelector('.today').style.display = 'flex';
    document.querySelector('.upcoming').style.display = 'flex';
  } catch(error){
    inputEl.value = '';
    invalidEl.innerHTML = 'Please Enter A Valid City'
    document.querySelector('.today').style.display = 'none';
    document.querySelector('.upcoming').style.display = 'none';
    return;
  }
}

searchBtnEl.addEventListener('click', () => {
  fetchWeatherData(inputEl.value);
})

window.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    fetchWeatherData(inputEl.value);
  }
})

function changeBackground(condition) {
  const body = document.body;
  body.className = '';

  switch (condition) {
      case 'Clear':
          body.classList.add('clear');
          break;
      case 'Clouds':
          body.classList.add('clouds');
          break;
      case 'Rain':
          body.classList.add('rain');
          break;
      case 'Snow':
          body.classList.add('snow');
          break;
      default:
          body.classList.add('default');
          break;
  }
}