const url_woeid = "https://api.allorigins.win/get?url=https://www.metaweather.com/api/location/search/?lattlong=";
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
let lat, lon, woeids;

const asideContent = (icon, temp, date, place) => {
    const content_place = document.getElementById("aside");
    const div = document.createElement("div");
    div.setAttribute("class", "aside_content");

    div.innerHTML = `
    <img src="${icon}" class="img_aside">
    <p class="temp"><font size="7">${temp}</font>Cº</p>
    <p class="date">${date}</p>
    <div>
        <img class="place_svg" src="../assets/location2.svg">
        <p class="place">${place}</p>
    </div>
    `;

    content_place.appendChild(div);
}

const success = (pos) => {
  lat = pos.coords.latitude;
  lon = pos.coords.longitude;
  fetch(`${url_woeid}${lat},${lon}`)
    .then((res) => res.json())
    .then((data) => {
      let content = JSON.parse(data["contents"]);
      woeid = content[0].woeid;
    })
    .then(() => {
      fetch(`${url}${woeid}`)
        .then((res) => res.json())
        .then((data) => {
            let content = JSON.parse(data["contents"]);
            getIcon(content.consolidated_weather[0]);
            asideContent(icon,Math.round(content.consolidated_weather[0].the_temp), new Date(content.consolidated_weather[0].applicable_date).toDateString("es-ES"), content.title);
        });
    })
    .catch((err) => error(err));
};

const error = (err) => {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);
