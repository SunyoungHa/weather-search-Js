function myFunction() {
  var x = document.getElementById("hide");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
let weather = {
  apiKey: "05248674f7f142f79a5131928232409",
  fetchWeather: function (city) {
    fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=05248674f7f142f79a5131928232409&q=" +
        city +
        "&days=7&aqi=no&alerts=no",
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    console.log(data, "all data from api");
    const daysOfWeek = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    // Calculate the weekdays for today, tomorrow, and the day after tomorrow
    const todayWeekday =
      daysOfWeek[new Date(data.forecast.forecastday[0].date).getDay()];
    const tomorrowWeekday =
      daysOfWeek[new Date(data.forecast.forecastday[1].date).getDay()];
    const dayAfterTomorrowWeekday =
      daysOfWeek[new Date(data.forecast.forecastday[2].date).getDay()];

    // Update the corresponding elements in the HTML
    document.querySelector("#today").innerText = todayWeekday;
    document.querySelector("#tomorrow").innerText = tomorrowWeekday;
    document.querySelector("#day_after_tomorrow").innerText =
      dayAfterTomorrowWeekday;

    let hottestDayOfWeek = "";
    let hottestTemp = -Infinity;
    const { name, region, country } = data.location;
    const { temp_f } = data.current;
    const { src } = data.current.condition.icon;
    const { mintemp_f, maxtemp_f, daily_chance_of_rain } =
      data.forecast.forecastday[0].day;
    console.log(data.current, "current data for today");

    const tomorrowDataTemp = data.forecast.forecastday[1].day;
    console.log(tomorrowDataTemp, "tomorrowDataTemp");
    const tomorrowTemp = tomorrowDataTemp.avgtemp_f;
    const tomorrowMinTempF = tomorrowDataTemp.mintemp_f;
    const tomorrowMaxTempF = tomorrowDataTemp.maxtemp_f;
    const tomorrowChanceOfRain = tomorrowDataTemp.daily_chance_of_rain;
    const dayAfterTomorrowDataTemp = data.forecast.forecastday[2].day;
    console.log(dayAfterTomorrowDataTemp, "dayAfterTomorrowDataTemp");
    const dayAfterTomorrowTemp = dayAfterTomorrowDataTemp.avgtemp_f;
    const dayAfterTomorrowMinTempF = dayAfterTomorrowDataTemp.mintemp_f;
    const dayAfterTomorrowMaxTempF = dayAfterTomorrowDataTemp.maxtemp_f;
    const dayAfterTomorrowChanceOfRain =
      dayAfterTomorrowDataTemp.daily_chance_of_rain;

    document.querySelector("#mintemp_t").innerText = tomorrowMinTempF + "°F";
    document.querySelector("#maxtemp_t").innerText =
      "Tomorrow's High: " + tomorrowMaxTempF + "°F";
    document.querySelector("#daily_chance_of_rain_t").innerText =
      "Chance of Precipitation: " + tomorrowChanceOfRain + "%";
    document.querySelector("#mintemp_t").innerText =
      "Tomorrow's Low: " + mintemp_f + "°F";
    document.querySelector("#maxtemp_t").innerText =
      "Tomorrow's High: " + maxtemp_f + "°F";

    document.querySelector(".city").innerText = name;
    document.querySelector(".region").innerText = "," + region;
    document.querySelector(".country").innerText = ", " + country;
    document.querySelector("#temp").innerText = temp_f + "°F";
    document.querySelector("#temp_t").innerText = temp_f + "°F";

    document.querySelector("#mintemp").innerText =
      "Today's Low: " + mintemp_f + "°F";
    document.querySelector("#maxtemp").innerText =
      "Today's high: " + maxtemp_f + "°F";
    document.querySelector("#mintemp_t").innerText =
      "Today's Low: " + mintemp_f + "°F";
    document.querySelector("#maxtemp_t").innerText =
      "Today's high: " + maxtemp_f + "°F";
    document.querySelector("#daily_chance_of_rain").innerText =
      "Chance of Precipitation:" + daily_chance_of_rain + "%";

      for (let i = 0; i < 7; i++) {
        const dayData = data.forecast.forecastday[i].day;
        const maxTemp = dayData.maxtemp_f;
  
        // Check if the current day's max temperature is higher than the previous hottest day
        if (maxTemp > hottestTemp) {
          hottestTemp = maxTemp;
  
          // Parse the raw date to get the day of the week
          const date = new Date(data.forecast.forecastday[i].date); // Use the raw date
          hottestDayOfWeek = daysOfWeek[date.getDay()];
        }
      }
      // Display the hottest day
      document.querySelector("#hottest_day").innerText = "The hottest day this week will be " + hottestDayOfWeek ;
      "The hottest day this week will be " + hottestDayOfWeek;
console.log(hottestDayOfWeek,'hottestDayOfWeek')

    if (data.current.temp_f > 75) {
      document.querySelector(".desc").innerText = "It's Hot Today!";
    } else if (data.current.temp_f <= 45) {
      document.querySelector(".desc").innerText = "It's Cold Today!";
    } else {
      document.querySelector(".desc").innerText = "It's mild Today!";
    }

    // Display tomorrow's weather information
    document.querySelector("#mintemp_d2").innerText =
      "Tomorrow's Low: " + tomorrowMinTempF + "°F";
    document.querySelector("#maxtemp_d2").innerText =
      "Tomorrow's High: " + tomorrowMaxTempF + "°F";
    document.querySelector("#daily_chance_of_rain_d2").innerText =
      "Chance of Precipitation: " + tomorrowChanceOfRain + "%";
    document.querySelector("#temp2").innerText = tomorrowTemp + "°F";

    // Display the day after tomorrow's weather information
    document.querySelector("#mintemp_d3").innerText =
      "Day After Tomorrow's Low: " + dayAfterTomorrowMinTempF + "°F";
    document.querySelector("#maxtemp_d3").innerText =
      "Day After Tomorrow's High: " + dayAfterTomorrowMaxTempF + "°F";
    document.querySelector("#daily_chance_of_rain_d3").innerText =
      "Chance of Precipitation: " + dayAfterTomorrowChanceOfRain + "%";
    document.querySelector("#temp3").innerText = dayAfterTomorrowTemp + "°F";
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      weather.search();
      // alert("search btn working");
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  // Get references to the button and result div
  const searchButton = document.getElementById("searchButton");
  const resultDiv = document.getElementById("resultDiv");

  searchButton.addEventListener("click", function () {
    if (resultDiv.style.display === "none" || resultDiv.style.display === "") {
      resultDiv.style.display = "block";
    } else {
      resultDiv.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const resultDiv = document.getElementById("resultDiv");

  searchInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      // Check if the input has text in it
      if (searchInput.value.trim() !== "") {
        resultDiv.style.display = "block"; 
      } else {
        resultDiv.style.display = "none"; // Hide the result div
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  // Function to change the layout
  function changeLayout() {
    const searchContainer1 = document.querySelector(".startSearch");
    const searchContainer = document.querySelector(".search");
    if (searchContainer1.classList.contains("side-by-side")) {
      searchContainer1.classList.remove("side-by-side");
    } else {
      searchContainer1.classList.add("side-by-side");
    }
  
    if (searchContainer.classList.contains("side-by-side")) {
      searchContainer.classList.remove("side-by-side");
    } else {
      searchContainer.classList.add("side-by-side");
    }
  }

  searchButton.addEventListener("click", changeLayout);
  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      changeLayout();
    }
  });
});
