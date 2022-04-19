const url = "https://api.allorigins.win/get?url=https://www.metaweather.com/api/location/search/?query=";
let lon, lat;
/*
let geo = navigator.geolocation.getCurrentPosition((data) => {
  lat = data.coords.latitude;
  lon = data.coords.longitude;
});
/*
const getWhoeid = () => new Promise( (reject, received) => {
  request({uri: `${url}lon`}, (err, res, body ) => {
    if (err) {
      reject(err);
    }else{
      received(JSON.parse(body));
    }
  })
})*/

document.getElementById('btn').onclick = request({uri: `${url}lon`}, (err, res, body ) => {
  if (err) {
    console,log(err);
  }else{
    console.log(JSON.parse(body));
  }

});