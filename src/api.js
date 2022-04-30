const url_woeid = "https://api.allorigins.win/get?url=https://www.metaweather.com/api/location/search/?query=";
const url = "https://api.allorigins.win/get?url=https://www.metaweather.com/api/location/";
const place = 44418;
let icon;
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const addDay = (date, icon, max_temp, min_temp, place = document.getElementById('days')) => {
  const div = document.createElement('div');
  div.setAttribute('class', 'each_day');

  div.innerHTML = `
  <p>${date}</p>
  <img src="${icon}" class="img">
  <div class="min_max">
    <p>${max_temp}º</p>
    <p>${min_temp}º</p>
  </div>
  `;

  place.appendChild(div);
};

fetch(`${url}${place}`)
  .then(res => res.json())
  .then(data => {
    let content = JSON.parse(data['contents']);
    return content = content.consolidated_weather;
  })
  .then(content => {
    content.forEach(element => {
      switch (element.weather_state_abbr) {
        case 'sn':
          icon = '../assets/Snow.svg';
          break;
        case 'sl':
          icon = '../assets/Sleet.svg';
          break;
        case 'h':
          icon = '../assets/Hail.svg';
          break;
        case 't':
          icon = '../assets/ThunderStorm.svg';
          break;
        case 'hr':
          icon = '../assets/HeavyRain.svg';
          break;
        case 'lr':
          icon = '../assets/LightRain.svg';
          break;
        case 's':
          icon = '../assets/Showers.svg';
          break;
        case 'hc':
          icon = '../assets/HeavyCloud.svg';
          break;
        case 'lc':
          icon = '../assets/LightCloud.svg';
          break;
        case 'c':
          icon = '../assets/Clear.svg';
          break;
      };

      let date = new Date(element.applicable_date);
      date = date.toDateString('es-ES', options);
      
      addDay(date, icon, Math.round(element.max_temp), Math.round(element.min_temp));
    });
  });

