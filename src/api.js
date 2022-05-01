const url = "https://api.allorigins.win/get?url=https://www.metaweather.com/api/location/";
const place = 44418;
let icon, firstIcon;
let counter = 0;

const addDay = (date,icon,max_temp,min_temp,place = document.getElementById("days")) => {
  const div = document.createElement("div");
  div.setAttribute("class", "each_day");

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

const highlights = (wind, hummidity, visibility, pressure) => {
  const article1 = document.createElement("article");
  article1.setAttribute("class", "wind");
  article1.innerHTML = `
  <p>Wind Status</p>
  <p><big>${Math.round(wind)}</big>mph</p>
  `;
  document.getElementById("atm").appendChild(article1);

  const article2 = document.createElement("article");
  article2.setAttribute("class", "hummidity");
  article2.innerHTML = `
  <p>Hummidity</p>
  <p><big>${Math.round(hummidity)}</big>%</p>
  `;
  document.getElementById("atm").appendChild(article2);

  const article3 = document.createElement("article");
  article3.setAttribute("class", "visibility");
  article3.innerHTML = `
  <p>Visibility</p>
  <p><big>${visibility.toFixed(1)}</big>miles</p>
  `;
  document.getElementById("atm").appendChild(article3);

  const article4 = document.createElement("article");
  article4.setAttribute("class", "pressure");
  article4.innerHTML = `
  <p>Pressure</p>
  <p><big>${Math.round(pressure)}</big>mb</p>
  `;
  document.getElementById("atm").appendChild(article4);
}

fetch(`${url}${place}`)
  .then((res) => res.json())
  .then((data) => {
    let content = JSON.parse(data["contents"]);
    return (content = content.consolidated_weather);
  })
  .then((content) => {
    content.forEach((element) => {
      switch (element.weather_state_abbr) {
        case "sn":
          icon = "../assets/Snow.svg";
          break;
        case "sl":
          icon = "../assets/Sleet.svg";
          break;
        case "h":
          icon = "../assets/Hail.svg";
          break;
        case "t":
          icon = "../assets/ThunderStorm.svg";
          break;
        case "hr":
          icon = "../assets/HeavyRain.svg";
          break;
        case "lr":
          icon = "../assets/LightRain.svg";
          break;
        case "s":
          icon = "../assets/Showers.svg";
          break;
        case "hc":
          icon = "../assets/HeavyCloud.svg";
          break;
        case "lc":
          icon = "../assets/LightCloud.svg";
          break;
        case "c":
          icon = "../assets/Clear.svg";
          break;
      }

      if (counter === 0) firstIcon = icon;
      counter++;

      let date = new Date(element.applicable_date);
      date = date.toDateString("es-ES");

      addDay(
        date,
        icon,
        Math.round(element.max_temp),
        Math.round(element.min_temp)
      );
    });
    return content;
  })
  .then((content) => {
    highlights(
      content[0].wind_speed,
      content[0].humidity,
      content[0].visibility,
      content[0].air_pressure
    );
  })
