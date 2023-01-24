const https = require("https");
const http = require("http");

const options = {
  hostname: "api.met.no",
  path: "/weatherapi/locationforecast/2.0/?lat=59.71&lon=10.86",
  method: "GET",
  headers: {
    "User-Agent": "dromtorp vgs",
    "Accept": "application/json"
  }
};

const req = https.request(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    const response = JSON.parse(data);
    const temperature = response.properties.timeseries[0].data.instant.details.air_temperature;
    const clouds = response.properties.timeseries[0].data.instant.details.cloud_area_fraction;
    const windSpeed = response.properties.timeseries[0].data.instant.details.wind_speed;

    const temperatureTomorow = response.properties.timeseries[24].data.instant.details.air_temperature;
    const cloudsTomorow = response.properties.timeseries[24].data.instant.details.cloud_area_fraction;
    const windSpeedTomorow = response.properties.timeseries[24].data.instant.details.wind_speed;

    console.log("Temperature: " + temperature + "°C");
    console.log("Cloud coverage: " + clouds + "%");
    console.log("Wind: " + windSpeed + "m/s");

    console.log("Temperature tomorow: " + temperatureTomorow + "°C");
    console.log("Cloud coverage tomorow: " + cloudsTomorow + "%");
    console.log("Wind tomorow: " + windSpeedTomorow + "m/s");
  });
});

req.end();