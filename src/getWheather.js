const url = "https://api.allorigins.win/get?url=https://www.metaweather.com/api/location/search/?query=";
const url_woeid = "https://api.allorigins.win/get?url=https://www.metaweather.com/api/location/";
let id = [];
let icon;
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

class representData {
  constructor() {
    this.place = document.getElementById('days');
  }

  create(date, icon, max_temp, min_temp) {
    let div = document.createElement('div');
    div.setAttribute('class', 'each_day')
    div.innerHTML = (`
    <p>${date}</p>
    <img src="${icon}" class="img">
    <div class="min_max">
      <p>${max_temp}º</p>
      <p>${min_temp}º</p>
    </div>
    `);
    this.place.appendChild(div);
  }
}

const RepresentData = new representData();

const getWoeid = (place) => new Promise((resolve, reject) => {
  request({ uri: `${url}${place}` }, (err, res, body) => {
    if (err) {
      reject(err)
    } else {
      let data = JSON.parse(body);
      let contents = data['contents'];
      let jsonData = JSON.parse(contents);
      resolve(jsonData[0].woeid);
    }
  })
});

const getWheather = woeid => new Promise((resolve, reject) => {
  request({ uri: `${url_woeid}${woeid}` }, (err, res, body) => {
    if (err) {
      reject(err)
    } else {
      let data = JSON.parse(body);
      let contents = data['contents'];
      let jsonData = JSON.parse(contents);
      resolve(jsonData[0].woeid);
    }
  })
});


function wheather(woeid) {
  request({ uri: `${url_woeid}${woeid}` }, (err, res, body) => {
    if (err) {
      new Error(err)
    } else {
      let data = JSON.parse(body);
      data = data['contents'];
      data = JSON.parse(data);
      data = data["consolidated_weather"];
      data.forEach(element => {
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
        }
        let date = new Date(element.applicable_date);

        date = date.toDateString('es-ES', options)
        RepresentData.create(date, icon, Math.round( element.max_temp), Math.round(element.min_temp));
      });
      
    }
  })

}

wheather(44418);
