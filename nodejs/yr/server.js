const http = require("http");
const https = require("https");

const options = {
    hostname: "api.met.no",
    path: "/weatherapi/locationforecast/2.0/?lat=59.71&lon=10.86",
    method: "GET",
    headers: {
      "User-Agent": "dromtorp vgs",
      "Accept": "application/json"
    }
};

http.createServer((req, res) => {
    https.get(options, (apiRes) => {
        let data = "";

        apiRes.on("data", (chunk) => {
            data += chunk;
        });

        apiRes.on("end", () => {
            const response = JSON.parse(data);
            const temperature = response.properties.timeseries[0].data.instant.details.air_temperature;
            const clouds = response.properties.timeseries[0].data.instant.details.cloud_area_fraction;
            const windSpeed = response.properties.timeseries[0].data.instant.details.wind_speed;

            const temperatureTomorow = response.properties.timeseries[24].data.instant.details.air_temperature;
            const cloudsTomorow = response.properties.timeseries[24].data.instant.details.cloud_area_fraction;
            const windSpeedTomorow = response.properties.timeseries[24].data.instant.details.wind_speed;

            const today = {
                Temperature: temperature,
                Cloud_coverage: clouds,
                Wind: windSpeed
            };
            const tomorow = {
                Temperature_tomorow: temperatureTomorow,
                Cloud_coverage_tomorow: cloudsTomorow,
                Wind_tomorow: windSpeedTomorow
            };

            res.writeHead(200, {'Content-Type': 'html'});
            res.write(
                JSON.stringify(today) + 
                JSON.stringify(tomorow)
            );
            res.end();
        });
    });
}).listen(8080);