const url = "https://api.allorigins.win/get?url=https://www.metaweather.com/api/location/search/?query=";
const url_woeid = "https://api.allorigins.win/get?url=https://www.metaweather.com/api/location/";
let id = [];
let daysPlace = document.getElementById(days);
let icon;

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
      let contents = data['contents'];
      let jsonData = JSON.parse(contents);
      let days = jsonData["consolidated_weather"];
      days.forEach(element => {
        switch (element.weather_state_abbr) {
          case 'sn':
            icon = 'assets/Snow.svg';
            break;
          case 'sl':
            icon = 'assets/Sleet.svg';
            break;
          case 'h':
            icon = 'assets/Hail.svg';
            break;
          case 't':
            icon = 'assets/ThunderStorm.svg';
            break;
          case 'hr':
            icon = 'assets/HeavyRain.svg';
            break;
          case 'lr':
            icon = 'assets/LightRain.svg';
            break;
          case 's':
            icon = 'assets/Showers.svg';
            break;
          case 'hc':
            icon = 'assets/HeavyCloud.svg';
            break;
          case 'lc':
            icon = 'assets/LightCloud.svg';
            break;
          case 'c':
            icon = 'assets/Clear.svg';
            break;
        }
        document.getElementById(days).innerHTML =
        `<div>
          <p>${element.applicable_date}</p>
          <img src="${icon}>
          <div>
            <p>${element.max_temp}</p>
            <p>${element.min_temp}</p>
          </div>
        </div>`
      });
    }
  })
}

wheather(44418);